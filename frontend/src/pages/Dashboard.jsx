import React, { useEffect, useState, useCallback } from 'react';
import { Eye, Users, Globe, MapPin, Clock, FileText, ArrowLeft, RefreshCw, Send, Lock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-neutral-900 border border-amber-400/15 p-5" data-testid={`stat-${label}`}>
    <div className="flex items-center gap-3 mb-2">
      <Icon size={20} className="text-amber-400" />
      <span className="text-gray-500 text-sm uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-3xl font-black text-white">{value}</p>
    {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
  </div>
);

const BarRow = ({ label, value, max }) => (
  <div className="flex items-center gap-3 py-1.5">
    <span className="text-gray-400 text-sm w-40 truncate shrink-0">{label}</span>
    <div className="flex-1 bg-neutral-800 h-5 overflow-hidden">
      <div
        className="bg-amber-400/80 h-full transition-all duration-500"
        style={{ width: `${Math.max((value / max) * 100, 2)}%` }}
      />
    </div>
    <span className="text-white text-sm font-semibold w-12 text-right">{value}</span>
  </div>
);

export default function Dashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('dashboard_token') || '');
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!token) { setAuthLoading(false); return; }
    fetch(`${API_URL}/api/dashboard/verify?token=${token}`)
      .then(r => r.json())
      .then(d => { if (d.status === 'ok') setAuthed(true); else { sessionStorage.removeItem('dashboard_token'); setToken(''); } })
      .catch(() => { sessionStorage.removeItem('dashboard_token'); setToken(''); })
      .finally(() => setAuthLoading(false));
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_URL}/api/dashboard/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        sessionStorage.setItem('dashboard_token', data.token);
        setToken(data.token);
        setAuthed(true);
      } else {
        setAuthError(data.message || 'Mot de passe incorrect.');
      }
    } catch { setAuthError('Erreur de connexion.'); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_token');
    setToken('');
    setAuthed(false);
    setStats(null);
  };

  const authHeaders = { 'X-Dashboard-Token': token };

  const fetchStats = useCallback(async () => {
    if (!authed) return;
    try {
      const res = await fetch(`${API_URL}/api/stats?days=${days}`, { headers: authHeaders });
      const data = await res.json();
      if (data.status === 'error') { handleLogout(); return; }
      setStats(data);
      setLastUpdate(new Date());
    } catch (e) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [days, authed, token]);

  useEffect(() => {
    if (!authed) return;
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [fetchStats, authed]);

  const sendReport = async () => {
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/send-monthly-report`, { method: 'POST', headers: authHeaders });
      const data = await res.json();
      alert(data.status === 'success' ? 'Rapport envoyé par email !' : 'Erreur lors de l\'envoi');
    } catch (e) {
      alert('Erreur réseau');
    } finally {
      setSending(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <RefreshCw size={32} className="text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center" data-testid="dashboard-login">
        <div className="w-full max-w-sm">
          <div className="bg-neutral-900 border border-amber-400/20 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-full">
                <Lock size={28} className="text-amber-400" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-amber-400 text-center uppercase tracking-wider mb-6">Dashboard Admin</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full bg-black border border-amber-400/30 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                data-testid="dashboard-password-input"
              />
              {authError && <p className="text-red-400 text-sm" data-testid="dashboard-auth-error">{authError}</p>}
              <button
                type="submit"
                className="w-full bg-amber-400 text-black font-bold py-3 uppercase tracking-wider hover:bg-amber-300 transition-colors"
                data-testid="dashboard-login-btn"
              >
                Connexion
              </button>
            </form>
            <Link to="/" className="block text-center text-gray-500 hover:text-amber-400 text-sm mt-4 transition-colors">
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <RefreshCw size={32} className="text-amber-400 animate-spin" />
      </div>
    );
  }

  const maxDaily = Math.max(...(stats?.daily?.map(d => d.visits) || [1]));
  const maxPage = Math.max(...(stats?.pages?.map(p => p.visits) || [1]));
  const maxCountry = Math.max(...(stats?.countries?.map(c => c.visits) || [1]));
  const maxCity = Math.max(...(stats?.cities?.map(c => c.visits) || [1]));

  return (
    <div className="min-h-screen bg-black text-white" data-testid="analytics-dashboard">
      {/* Header */}
      <div className="border-b border-amber-400/15 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-amber-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-amber-400 uppercase tracking-wider">Analytics</h1>
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Temps réel
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="bg-neutral-900 border border-amber-400/20 text-gray-300 text-sm px-3 py-1.5 focus:outline-none"
            data-testid="period-select"
          >
            <option value={7}>7 jours</option>
            <option value={14}>14 jours</option>
            <option value={30}>30 jours</option>
            <option value={90}>90 jours</option>
          </select>
          <button onClick={fetchStats} className="text-gray-500 hover:text-amber-400 transition-colors" data-testid="refresh-btn">
            <RefreshCw size={18} />
          </button>
          <button
            onClick={sendReport}
            disabled={sending}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50"
            data-testid="send-report-btn"
          >
            <Send size={14} />
            {sending ? 'Envoi...' : 'Envoyer rapport'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            data-testid="dashboard-logout-btn"
          >
            <LogOut size={14} />
          </button>
          {lastUpdate && (
            <span className="text-gray-600 text-xs">
              {lastUpdate.toLocaleTimeString('fr-FR')}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Eye} label="Visites totales" value={stats?.total?.total || 0} sub={`${days} derniers jours`} />
          <StatCard icon={Users} label="Visiteurs uniques" value={stats?.total?.unique || 0} sub={`${days} derniers jours`} />
          <StatCard icon={Eye} label="Aujourd'hui" value={stats?.today?.total || 0} sub="visites" />
          <StatCard icon={Users} label="Uniques aujourd'hui" value={stats?.today?.unique || 0} sub="visiteurs" />
        </div>

        {/* Daily chart + Pages */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily visits */}
          <div className="bg-neutral-900 border border-amber-400/15 p-5">
            <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Clock size={16} /> Visites par jour
            </h2>
            <div className="space-y-0.5 max-h-80 overflow-y-auto">
              {stats?.daily?.length > 0 ? stats.daily.map(d => (
                <BarRow key={d.date} label={d.date} value={d.visits} max={maxDaily} />
              )) : <p className="text-gray-600 text-sm">Aucune donnée</p>}
            </div>
          </div>

          {/* Top pages */}
          <div className="bg-neutral-900 border border-amber-400/15 p-5">
            <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <FileText size={16} /> Pages les plus visitées
            </h2>
            <div className="space-y-0.5 max-h-80 overflow-y-auto">
              {stats?.pages?.length > 0 ? stats.pages.map(p => (
                <BarRow key={p.page} label={p.page} value={p.visits} max={maxPage} />
              )) : <p className="text-gray-600 text-sm">Aucune donnée</p>}
            </div>
          </div>
        </div>

        {/* Geo: Countries + Cities */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-amber-400/15 p-5">
            <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Globe size={16} /> Pays
            </h2>
            <div className="space-y-0.5 max-h-64 overflow-y-auto">
              {stats?.countries?.length > 0 ? stats.countries.map(c => (
                <BarRow key={c.country} label={c.country} value={c.visits} max={maxCountry} />
              )) : <p className="text-gray-600 text-sm">Aucune donnée</p>}
            </div>
          </div>

          <div className="bg-neutral-900 border border-amber-400/15 p-5">
            <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <MapPin size={16} /> Villes
            </h2>
            <div className="space-y-0.5 max-h-64 overflow-y-auto">
              {stats?.cities?.length > 0 ? stats.cities.map(c => (
                <BarRow key={c.city} label={c.city} value={c.visits} max={maxCity} />
              )) : <p className="text-gray-600 text-sm">Aucune donnée</p>}
            </div>
          </div>
        </div>

        {/* Recent visits */}
        <div className="bg-neutral-900 border border-amber-400/15 p-5">
          <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4">
            Visites récentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="recent-visits-table">
              <thead>
                <tr className="text-gray-500 border-b border-neutral-800">
                  <th className="text-left py-2 pr-4 font-medium">Heure</th>
                  <th className="text-left py-2 pr-4 font-medium">Page</th>
                  <th className="text-left py-2 pr-4 font-medium">Pays</th>
                  <th className="text-left py-2 pr-4 font-medium">Ville</th>
                  <th className="text-left py-2 font-medium">Visiteur</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recent?.map((v, i) => (
                  <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                    <td className="py-2 pr-4 text-gray-400">{new Date(v.timestamp).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</td>
                    <td className="py-2 pr-4 text-white font-medium">{v.page}</td>
                    <td className="py-2 pr-4 text-gray-400">{v.country}</td>
                    <td className="py-2 pr-4 text-gray-400">{v.city}</td>
                    <td className="py-2 text-gray-600 font-mono text-xs">{v.visitor_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!stats?.recent?.length && <p className="text-gray-600 text-sm py-4 text-center">Aucune visite enregistrée</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
