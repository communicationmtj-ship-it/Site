"""Essais hors ligne des retours de Mathilde sur le site vitrine (13/11/2026).

Aucun serveur, aucune base, aucun envoi : la base est remplacée par une fausse base en
mémoire et l'envoi de mail par une fonction qui répond « parti » ou « pas parti ».
Les noms et adresses de visiteurs sont fictifs.

Lancement (depuis backend/) :
    python -m pytest -x -q -p no:cacheprovider tests/test_site_retours_13_11.py
"""
import asyncio
import json
import logging
import os
import re
import sys
import time
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parent.parent
REPO = BACKEND.parent
FRONT = REPO / "frontend"
SRC = FRONT / "src"

if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

# database.py lit ces deux variables à l'import ; aucune connexion n'est ouverte par les essais.
os.environ.setdefault("MONGO_URL", "mongodb://127.0.0.1:1")
os.environ.setdefault("DB_NAME", "essai_site_13_11")

VISITEUR_NOM = "Visiteur Fictif"
VISITEUR_MAIL = "visiteur.fictif@example.com"


def _lire(path: Path) -> str:
    return path.read_text(encoding="utf-8")


# ─── Listes des pages : application, serveur web, plan du site ──────────────

def _routes_app() -> set:
    routes = set(re.findall(r'<Route\s+path="([^"]+)"', _lire(SRC / "App.js")))
    routes.discard("*")
    return routes


def _routes_nginx() -> set:
    conf = _lire(REPO / "nginx-site.conf")
    assert "location = / {" in conf, "l'accueil doit avoir sa règle exacte"
    m = re.search(r"location ~\*? \^/\(([^)]*)\)/\?\$", conf)
    assert m, "règle des pages connues introuvable dans nginx-site.conf"
    return {"/"} | {"/" + p for p in m.group(1).split("|")}


def _pages_generateur() -> tuple:
    # 15/11/2026 : la liste unique des pages publiques (plan du site = pages pré-rendues) vit dans
    # scripts/pages-publiques.js, lue par generate-public-files.js et par prerender.js.
    js = _lire(FRONT / "scripts" / "pages-publiques.js")
    for script in ("generate-public-files.js", "prerender.js"):
        assert 'require("./pages-publiques")' in _lire(FRONT / "scripts" / script), f"{script} doit lire pages-publiques.js"
    pages = re.findall(r'\["(/[^"]*)",\s*"[0-9.]+",\s*"\w+"\]', js)
    extra = re.search(r"EXTRA_ROUTES\s*=\s*\[([^\]]*)\]", js).group(1)
    return set(pages), set(re.findall(r'"(/[^"]*)"', extra))


def _pages_sitemap_serveur() -> set:
    return set(re.findall(r'\{"loc": "(/[^"]*)"', _lire(BACKEND / "server.py")))


def test_les_listes_de_pages_concordent():
    app = _routes_app()
    nginx = _routes_nginx()
    pages, extra = _pages_generateur()
    routes_json = set(json.loads(_lire(FRONT / "public" / "routes.json"))["routes"])
    assert app == nginx, f"App.js et nginx-site.conf divergent : {sorted(app ^ nginx)}"
    assert app == pages | extra, f"App.js et le plan du site divergent : {sorted(app ^ (pages | extra))}"
    assert routes_json == app, f"routes.json est en retard : {sorted(routes_json ^ app)}"
    assert _pages_sitemap_serveur() == pages, (
        f"plan du site du serveur et plan public divergent : {sorted(_pages_sitemap_serveur() ^ pages)}"
    )


def test_regle_404_du_serveur_web():
    conf = _lire(REPO / "nginx-site.conf")
    m = re.search(r"location ~\*? (\^/\([^)]*\)/\?\$)", conf)
    connue = re.compile(m.group(1), re.IGNORECASE)
    for chemin in ("/contact", "/contact/", "/devis", "/securite-privee-bordeaux", "/Contact"):
        assert connue.match(chemin), chemin
    for chemin in ("/page-inexistante-test", "/cgv", "/contact-x", "/index.html", "/static/js/main.js.map"):
        assert not connue.match(chemin), chemin
    assert "error_page 404 /index.html;" in conf
    assert re.search(r"location ~ \\\.map\$ \{\s*return 404;", conf)
    repli = re.search(r"\n    location / \{([^}]*)\}", conf)
    assert repli, "bloc « location / » introuvable"
    assert repli.group(1).split() == ["try_files", "$uri", "=404;"], (
        "le repli général ne doit plus renvoyer index.html en 200"
    )


def test_plan_du_site_du_serveur_repond():
    import server

    reponse = asyncio.run(server.sitemap())
    assert reponse.status_code == 200
    corps = reponse.body.decode("utf-8")
    assert f"<lastmod>{server.SITEMAP_LASTMOD}</lastmod>" in corps
    assert re.fullmatch(r"\d{4}-\d{2}-\d{2}", server.SITEMAP_LASTMOD)
    assert "/securite-privee-bordeaux</loc>" in corps


# ─── Mail de devis : voie rapide, date française, société de la protection rapprochée ──

def test_objet_et_corps_du_mail_de_devis():
    from email_service import quote_email_subject, quote_email_body, format_date_fr

    assert format_date_fr("2026-11-20") == "20/11/2026"
    assert format_date_fr("") is None
    assert format_date_fr("dès que possible") == "dès que possible"
    assert quote_email_subject("SSIAP", "Urgent (sous 24 h)").startswith("URGENT - ")
    assert not quote_email_subject("SSIAP", "Cette semaine").startswith("URGENT")
    assert "MTJ Sécurité Rapprochée" in quote_email_subject("Protection rapprochée")
    corps = quote_email_body(VISITEUR_NOM, None, VISITEUR_MAIL, "00 00 00 00 00", "Protection rapprochée",
                             "Besoin fictif", None, "2026-12-01", "Cette semaine")
    assert "Date de début souhaitée : 01/12/2026" in corps
    assert "Urgence : Cette semaine" in corps
    assert "Société concernée : MTJ Sécurité Rapprochée" in corps
    sans = quote_email_body(VISITEUR_NOM, None, VISITEUR_MAIL, "00 00 00 00 00", "SSIAP", "Besoin fictif")
    # 15/11/2026 : le formulaire du site ne demande plus ni date ni urgence (retour au formulaire en ligne,
    # règle de Théo) ; une demande qui ne les porte pas n'a pas ces lignes dans son mail.
    assert "Date de début souhaitée" not in sans and "Urgence" not in sans
    assert "Service demandé : SSIAP\n\nMessage :" in sans
    assert "Société concernée" not in sans


def test_journaux_des_mails_sans_donnee_du_visiteur(monkeypatch, caplog):
    import email_service

    monkeypatch.setattr(email_service, "send_email_smtp", lambda **kwargs: True)
    with caplog.at_level(logging.INFO):
        assert email_service.send_quote_email(VISITEUR_NOM, None, VISITEUR_MAIL, "0000000000", "SSIAP", "x")
        assert email_service.send_contact_email(VISITEUR_NOM, VISITEUR_MAIL, None, "Sujet", "x")
        assert email_service.send_recruitment_email("Visiteur", "Fictif", VISITEUR_MAIL, "0000000000", "x", [])
    journal = caplog.text
    assert "Fictif" not in journal and VISITEUR_MAIL not in journal


# ─── Formulaires : l'échec d'envoi du mail se voit ─────────────────────────

class _FausseCollection:
    def __init__(self):
        self.docs = []

    async def insert_one(self, doc):
        self.docs.append(dict(doc))

    async def update_one(self, filtre, maj):
        for doc in self.docs:
            if all(doc.get(k) == v for k, v in filtre.items()):
                doc.update(maj.get("$set", {}))


class _FausseBase:
    def __init__(self):
        self.quotes = _FausseCollection()
        self.contacts = _FausseCollection()
        self.recruitments = _FausseCollection()


@pytest.fixture()
def client_site(monkeypatch, tmp_path):
    from fastapi.testclient import TestClient
    import server
    from routers import forms

    base = _FausseBase()
    monkeypatch.setattr(forms, "_get_db", lambda: base)
    monkeypatch.setattr(forms, "UPLOAD_DIR", tmp_path)
    return TestClient(server.app), base, forms


def _formulaire_devis(**extra):
    data = {
        "name": VISITEUR_NOM, "email": VISITEUR_MAIL, "phone": "00 00 00 00 00",
        "serviceType": "SSIAP", "message": "Besoin fictif", "consent": "true",
        "ts": str(time.time() - 30), "startDate": "2026-12-01", "urgency": "Urgent (sous 24 h)",
    }
    data.update(extra)
    return data


def test_devis_mail_parti_enregistre_la_date_et_l_urgence(client_site, monkeypatch):
    client, base, forms = client_site
    vu = {}

    def faux_envoi(**kwargs):
        vu.update(kwargs)
        return True

    monkeypatch.setattr(forms, "send_quote_email", faux_envoi)
    r = client.post("/api/quote", data=_formulaire_devis(), headers={"X-Forwarded-For": "10.13.11.1"})
    assert r.status_code == 200 and r.json()["status"] == "success"
    doc = base.quotes.docs[-1]
    assert doc["email_sent"] is True and doc["consent"] is True
    assert doc["start_date"] == "2026-12-01" and doc["urgency"] == "Urgent (sous 24 h)"
    assert vu["start_date"] == "2026-12-01" and vu["urgency"] == "Urgent (sous 24 h)"


def test_devis_mail_pas_parti_reste_visible(client_site, monkeypatch, caplog):
    client, base, forms = client_site
    monkeypatch.setattr(forms, "send_quote_email", lambda **kwargs: False)
    with caplog.at_level(logging.ERROR):
        r = client.post("/api/quote", data=_formulaire_devis(), headers={"X-Forwarded-For": "10.13.11.2"})
    assert r.json()["status"] == "success"  # la demande est gardée : le visiteur n'a pas à recommencer
    assert base.quotes.docs[-1]["email_sent"] is False
    assert "Mail NON envoyé" in caplog.text
    assert VISITEUR_MAIL not in caplog.text and "Fictif" not in caplog.text


def test_devis_sans_consentement_refuse(client_site, monkeypatch):
    client, base, forms = client_site
    monkeypatch.setattr(forms, "send_quote_email", lambda **kwargs: True)
    r = client.post("/api/quote", data=_formulaire_devis(consent="false"), headers={"X-Forwarded-For": "10.13.11.3"})
    assert r.json()["status"] == "error"
    assert base.quotes.docs == []


def test_champ_piege_rempli_rien_n_est_enregistre(client_site, monkeypatch):
    client, base, forms = client_site
    envois = []
    monkeypatch.setattr(forms, "send_quote_email", lambda **kwargs: envois.append(kwargs) or True)
    r = client.post("/api/quote", data=_formulaire_devis(hp="robot"), headers={"X-Forwarded-For": "10.13.11.6"})
    assert r.json()["status"] == "success"  # réponse silencieuse pour le robot
    assert base.quotes.docs == [] and envois == []


def test_les_trois_formulaires_envoient_le_champ_piege():
    for nom in ("Quote.jsx", "ContactPage.jsx", "Recrutement.jsx"):
        texte = _lire(SRC / "components" / nom)
        assert "submitData.append('hp'" in texte, f"{nom} n'envoie pas le champ piège"
        assert 'name="hp"' in texte


def test_contact_et_recrutement_gardent_l_etat_du_mail(client_site, monkeypatch):
    client, base, forms = client_site
    monkeypatch.setattr(forms, "send_contact_email", lambda **kwargs: False)
    monkeypatch.setattr(forms, "send_recruitment_email", lambda **kwargs: True)
    r = client.post("/api/contact", data={
        "name": VISITEUR_NOM, "email": VISITEUR_MAIL, "subject": "Sujet", "message": "x",
        "consent": "true", "ts": str(time.time() - 30),
    }, headers={"X-Forwarded-For": "10.13.11.4"})
    assert r.json()["status"] == "success"
    assert base.contacts.docs[-1]["email_sent"] is False
    r = client.post("/api/recrutement", data={
        "firstName": "Visiteur", "lastName": "Fictif", "email": VISITEUR_MAIL, "phone": "0000000000",
        "message": "x", "consent": "true", "ts": str(time.time() - 30),
    }, files={"attachments": ("cv.pdf", b"%PDF-1.4 essai", "application/pdf")},
        headers={"X-Forwarded-For": "10.13.11.5"})
    assert r.json()["status"] == "success"
    assert base.recruitments.docs[-1]["email_sent"] is True


# ─── Gardes du contenu (repli prudent du 13/11/2026) ───────────────────────

def _textes_du_site() -> dict:
    fichiers = [p for p in SRC.rglob("*") if p.suffix in (".js", ".jsx") and "components/ui" not in p.as_posix()]
    fichiers.append(FRONT / "public" / "index.html")
    return {p: _lire(p) for p in fichiers}


# 15/11/2026 (règle de Théo, 05:56 : « soit tu met pas soit tu laisse ce qui etait ») : le texte du site en
# ligne revient, mot pour mot (Monaco et délais : « garder les deux », formulaire 3/4 du 15/11/2026). Les
# phrases du site en ligne qui reviennent ne sont donc plus des phrases retirées (accords transfrontaliers,
# DOM-TOM et international, festival de Six-Fours, installations nucléaires, partenaire des autorités, effectif
# conséquent, relevé du courrier, main courante et photos géolocalisées, « Societe du groupe », « inégalé »,
# usines Airbus, conformité totale). Restent retirés, sur décision de Théo : les chiffres (13/11/2026, « Site
# chiffres: B aucun »), les implantations hors du siège de Toulon, les clients nommés (15/11/2026, pages de
# villes « sans preuve »), une certification ISO 9001 non obtenue, la faute « maïtre ».
PHRASES_RETIREES = [
    "certifiée ISO 9001", "certifié ISO 9001", "plus de 20 familles",
    "pôles opérationnels", "antenne toulousaine", "implantation multi-sites", "équipes opérationnelles sur",
    "multiplie par cinq", "plus de 90 %", "plus de 90%", "maïtre", "Nice Étoile", "Cap 3000",
]


def test_aucune_phrase_retiree_ne_revient():
    trouvees = [
        f"{p.relative_to(REPO)} : « {phrase} »"
        for p, texte in _textes_du_site().items()
        for phrase in PHRASES_RETIREES
        if phrase in texte
    ]
    assert not trouvees, "\n".join(trouvees)


def test_coordonnees_une_seule_source():
    mock = _lire(SRC / "data" / "mock.js")
    email = re.search(r'const EMAIL = "([^"]+)"', mock).group(1)
    for p, texte in _textes_du_site().items():
        if p.name in ("mock.js", "index.html", "Contact.jsx"):
            continue  # Contact.jsx : ancien composant que plus aucune page n'affiche
        assert email not in texte, f"adresse e-mail écrite en dur dans {p.relative_to(REPO)}"
        assert "tel:+33760738206" not in texte or p.name == "mock.js", f"téléphone en dur dans {p.relative_to(REPO)}"
    index = _lire(FRONT / "public" / "index.html")
    adresses = set(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", index))
    assert adresses == {email}, f"index.html doit afficher la même adresse que mock.js : {adresses}"


def test_aucune_note_ni_nombre_d_avis_ecrit_a_la_main():
    footer = _lire(SRC / "components" / "Footer.jsx")
    index = _lire(FRONT / "public" / "index.html")
    assert "reviews:" not in footer and "rating:" not in footer
    assert "aggregateRating" not in index and "reviewCount" not in index
    # 15/11/2026 : les adresses des fiches Google sont revenues à celles du site en ligne (règle de Théo) ;
    # seules les notes et les nombres d'avis écrits à la main restent retirés.
    assert "toFixed(1)" not in footer and "avis)" not in footer
    assert "fonts.googleapis.com" not in index


def test_images_servies_par_le_site():
    footer = _lire(SRC / "components" / "Footer.jsx")
    assert "/api/instagram/" not in footer
    for i in range(1, 7):
        for ext in ("webp", "jpg"):
            assert (FRONT / "public" / "images" / "instagram" / f"post{i}.{ext}").is_file()
    for nom in ("logo-mtj.webp", "about-team.webp", "contact-bg.webp"):
        assert (FRONT / "public" / "images" / nom).is_file()
