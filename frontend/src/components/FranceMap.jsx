import React from 'react';
import franceData from '@svg-maps/france.departments';

const SOUTH_DEPARTMENTS = new Set([
  '04', '05', '06', '07', '09', '11', '12', '13', '15',
  '24', '26', '30', '31', '32', '33', '34', '40', '43',
  '46', '47', '48', '64', '65', '66', '81', '82', '83',
  '84', '2A', '2B'
]);

const CITIES = [
  { name: 'Bordeaux', x: 188, y: 400 },
  { name: 'Toulon', x: 458, y: 485 },
  { name: 'Nice', x: 520, y: 442 },
];

const FranceMap = () => {
  const northDepts = franceData.locations.filter(l => !SOUTH_DEPARTMENTS.has(l.id));
  const southDepts = franceData.locations.filter(l => SOUTH_DEPARTMENTS.has(l.id));

  return (
    <svg
      viewBox="0 0 613 600"
      className="w-full h-auto max-w-lg mx-auto"
      data-testid="france-map-svg"
    >
      <defs>
        {/* Green gradient for north */}
        <linearGradient id="northGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="50%" stopColor="#66BB6A" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>
        {/* Blue gradient for south */}
        <linearGradient id="southGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1976D2" />
          <stop offset="40%" stopColor="#42A5F5" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
        {/* Subtle texture filter */}
        <filter id="texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Drop shadow for departments */}
        <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
        {/* Pin marker */}
        <g id="pin">
          <path d="M0,-18 C-5,-18 -9,-14 -9,-9 C-9,-3 0,4 0,4 C0,4 9,-3 9,-9 C9,-14 5,-18 0,-18 Z" fill="#E53935" stroke="#fff" strokeWidth="1.5" />
          <circle cx="0" cy="-10" r="3.5" fill="#fff" />
        </g>
      </defs>

      {/* North departments - green */}
      <g filter="url(#texture)" style={{ cursor: 'default' }}>
        {northDepts.map(dept => (
          <path
            key={dept.id}
            d={dept.path}
            fill="url(#northGrad)"
            stroke="#2E7D32"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* South departments - blue */}
      <g filter="url(#texture)" style={{ cursor: 'default' }}>
        {southDepts.map(dept => (
          <path
            key={dept.id}
            d={dept.path}
            fill="url(#southGrad)"
            stroke="#1565C0"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* Dividing line highlight */}
      <line x1="130" y1="355" x2="520" y2="355" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />

      {/* "GRAND DÉPLACEMENT" text */}
      <text x="300" y="180" textAnchor="middle" className="font-black" style={{ fontSize: '28px', fill: '#000', fontWeight: 900, letterSpacing: '2px' }}>
        GRAND DÉPLACEMENT
      </text>
      <text x="300" y="208" textAnchor="middle" style={{ fontSize: '16px', fill: '#1a1a1a', fontWeight: 600, letterSpacing: '1px' }}>
        INTERVENTION SUR DEMANDE
      </text>

      {/* "NOTRE SECTEUR" banner */}
      <g transform="translate(300, 380)">
        {/* Banner background */}
        <rect x="-100" y="-16" width="200" height="32" rx="4" fill="rgba(25,118,210,0.85)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {/* Banner ribbon ends */}
        <polygon points="-110,-12 -100,-16 -100,16 -110,12" fill="rgba(13,71,161,0.9)" />
        <polygon points="110,-12 100,-16 100,16 110,12" fill="rgba(13,71,161,0.9)" />
        <text x="0" y="6" textAnchor="middle" style={{ fontSize: '20px', fill: '#fff', fontWeight: 900, letterSpacing: '3px' }}>
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
              fill: '#fff',
              fontWeight: 700,
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
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
