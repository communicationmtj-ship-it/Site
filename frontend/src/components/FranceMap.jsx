import React from 'react';
import franceData from '@svg-maps/france.departments';
import { CODES_CARTE, SECTEUR } from '../data/perimetre';

// 13/11/2026 (choix de Théo, « Site perimetre: A partout ») : la carte colorie exactement le
// périmètre validé le 11/10/2026 (data/perimetre.js : de Bordeaux à Nice en remontant jusqu'à
// Annecy), et non plus l'ancienne liste « sud », qui oubliait l'Isère, le Rhône, la Savoie,
// la Haute-Savoie et l'Ain.
const SECTOR_DEPARTMENTS = new Set(CODES_CARTE);

const CORSICA_DEPARTMENTS = new Set(['2A', '2B']);

// Boîte englobante d'un tracé SVG (commandes M L H V C S Q T A Z, absolues ou relatives).
// Les points de contrôle des courbes comptent : la boîte peut être un peu plus grande que le
// tracé, jamais plus petite. Tracé illisible : null (la ville prend alors sa position de repli).
export const boiteDuTrace = (d) => {
  const jetons = String(d || '').match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g);
  if (!jetons) return null;
  const estLettre = (t) => /^[a-zA-Z]$/.test(t);
  let i = 0;
  let cmd = null;
  let x = 0;
  let y = 0;
  let x0 = 0;
  let y0 = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const voir = (px, py) => {
    minX = Math.min(minX, px);
    maxX = Math.max(maxX, px);
    minY = Math.min(minY, py);
    maxY = Math.max(maxY, py);
  };
  const lire = (n) => {
    const v = [];
    for (let k = 0; k < n; k += 1) {
      if (i >= jetons.length || estLettre(jetons[i])) return null;
      v.push(parseFloat(jetons[i]));
      i += 1;
    }
    return v;
  };
  while (i < jetons.length) {
    if (estLettre(jetons[i])) {
      cmd = jetons[i];
      i += 1;
      if (cmd === 'z' || cmd === 'Z') {
        x = x0;
        y = y0;
        cmd = null;
        continue;
      }
    } else if (cmd === null) {
      return null;
    }
    const rel = cmd === cmd.toLowerCase();
    const bx = rel ? x : 0;
    const by = rel ? y : 0;
    let v;
    switch (cmd.toLowerCase()) {
      case 'm':
        v = lire(2);
        if (!v) return null;
        x = bx + v[0];
        y = by + v[1];
        x0 = x;
        y0 = y;
        voir(x, y);
        cmd = rel ? 'l' : 'L'; // les paires suivantes sont des segments
        break;
      case 'l':
      case 't':
        v = lire(2);
        if (!v) return null;
        x = bx + v[0];
        y = by + v[1];
        voir(x, y);
        break;
      case 'h':
        v = lire(1);
        if (!v) return null;
        x = bx + v[0];
        voir(x, y);
        break;
      case 'v':
        v = lire(1);
        if (!v) return null;
        y = by + v[0];
        voir(x, y);
        break;
      case 'c':
        v = lire(6);
        if (!v) return null;
        voir(bx + v[0], by + v[1]);
        voir(bx + v[2], by + v[3]);
        x = bx + v[4];
        y = by + v[5];
        voir(x, y);
        break;
      case 's':
      case 'q':
        v = lire(4);
        if (!v) return null;
        voir(bx + v[0], by + v[1]);
        x = bx + v[2];
        y = by + v[3];
        voir(x, y);
        break;
      case 'a':
        v = lire(7);
        if (!v) return null;
        x = bx + v[5];
        y = by + v[6];
        voir(x, y);
        break;
      default:
        return null;
    }
  }
  if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null;
  return { x: minX, y: minY, largeur: maxX - minX, hauteur: maxY - minY };
};

// Une ville placée dans la boîte de son département, aux fractions mesurées sur les limites du
// département (longitude depuis l'ouest, latitude depuis le nord). Repli sur une position
// estimée si le tracé est absent ou illisible.
const dansLeDepartement = (code, fx, fy, repli) => {
  const dep = franceData.locations.find((l) => l.id === code);
  const b = dep ? boiteDuTrace(dep.path) : null;
  if (!b || !(b.largeur > 2 && b.largeur < 200 && b.hauteur > 2 && b.hauteur < 200)) return repli;
  const p = { x: b.x + fx * b.largeur, y: b.y + fy * b.hauteur };
  return p.x > 0 && p.x < 613 && p.y > 0 && p.y < 600 ? p : repli;
};

// Repères du secteur (pas des agences : la seule adresse de MTJ Sécurité Privée est le siège de Toulon).
// Bordeaux : 43 % de la largeur de la Gironde depuis l'ouest, 53 % de sa hauteur depuis le nord.
// Annecy : 26 % de la largeur de la Haute-Savoie depuis l'ouest, 70 % de sa hauteur depuis le nord.
const BORDEAUX = dansLeDepartement('33', 0.43, 0.53, { x: 166, y: 382 });
const ANNECY = dansLeDepartement('74', 0.26, 0.7, { x: 462, y: 316 });

export const CITIES = [
  { name: 'Bordeaux', x: Math.round(BORDEAUX.x), y: Math.round(BORDEAUX.y) },
  { name: 'Toulouse', x: 255, y: 475 },
  { name: 'Toulon (siège)', x: 458, y: 485 },
  { name: 'Nice', x: 520, y: 442 },
  { name: 'Annecy', x: Math.round(ANNECY.x), y: Math.round(ANNECY.y) },
];

const FranceMap = () => {
  const northDepts = franceData.locations.filter(l => !SECTOR_DEPARTMENTS.has(l.id) && !CORSICA_DEPARTMENTS.has(l.id));
  const southDepts = franceData.locations.filter(l => SECTOR_DEPARTMENTS.has(l.id));
  const corsicaDepts = franceData.locations.filter(l => CORSICA_DEPARTMENTS.has(l.id));

  return (
    <svg
      viewBox="0 0 613 600"
      className="w-full h-auto max-w-lg mx-auto"
      data-testid="france-map-svg"
      role="img"
      aria-labelledby="france-map-titre"
    >
      <title id="france-map-titre">
        {`Carte de France : notre secteur, ${SECTEUR}, en couleur ; siège à Toulon ; grand déplacement sur demande dans le reste de la France.`}
      </title>
      <defs>
        {/* Dark muted gradient for north */}
        <linearGradient id="northGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="50%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </linearGradient>
        {/* Amber/gold gradient for south */}
        <linearGradient id="southGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        {/* Subtle texture filter */}
        <filter id="texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Pin marker - amber themed */}
        <g id="pin">
          <path d="M0,-18 C-5,-18 -9,-14 -9,-9 C-9,-3 0,4 0,4 C0,4 9,-3 9,-9 C9,-14 5,-18 0,-18 Z" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
          <circle cx="0" cy="-10" r="3.5" fill="#000" />
        </g>
      </defs>

      {/* North departments - dark/muted */}
      <g filter="url(#texture)" style={{ cursor: 'default' }}>
        {northDepts.map(dept => (
          <path
            key={dept.id}
            d={dept.path}
            fill="url(#northGrad)"
            stroke="#555"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* Départements du secteur - ambre et or */}
      <g filter="url(#texture)" style={{ cursor: 'default' }}>
        {southDepts.map(dept => (
          <path
            key={dept.id}
            d={dept.path}
            fill="url(#southGrad)"
            stroke="#78350f"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* Corsica - gray */}
      <g filter="url(#texture)" style={{ cursor: 'default' }}>
        {corsicaDepts.map(dept => (
          <path
            key={dept.id}
            d={dept.path}
            fill="url(#northGrad)"
            stroke="#555"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* "GRAND DÉPLACEMENT" bordered banner - centered on north zone */}
      <g transform="translate(279, 190)">
        <rect x="-155" y="-30" width="310" height="60" rx="6"
          fill="rgba(0,0,0,0.65)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="0" y="-4" textAnchor="middle"
          style={{ fontSize: '22px', fill: '#fbbf24', fontWeight: 900, letterSpacing: '2px' }}>
          GRAND DÉPLACEMENT
        </text>
        <text x="0" y="20" textAnchor="middle"
          style={{ fontSize: '12px', fill: '#e5e5e5', fontWeight: 600, letterSpacing: '1.5px' }}>
          INTERVENTION SUR DEMANDE
        </text>
      </g>

      {/* "NOTRE SECTEUR" bordered banner - centered on south zone */}
      <g transform="translate(350, 390)">
        <rect x="-110" y="-18" width="220" height="36" rx="6"
          fill="rgba(0,0,0,0.7)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="0" y="7" textAnchor="middle"
          style={{ fontSize: '20px', fill: '#fbbf24', fontWeight: 900, letterSpacing: '3px' }}>
          NOTRE SECTEUR
        </text>
      </g>

      {/* City markers */}
      {CITIES.map(city => (
        <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
          <use href="#pin" />
          <text
            x="0"
            y="16"
            textAnchor="middle"
            style={{
              fontSize: '13px',
              fill: '#fbbf24',
              fontWeight: 700,
              paintOrder: 'stroke',
              stroke: '#000',
              strokeWidth: '3px',
              strokeLinejoin: 'round',
            }}
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default FranceMap;
