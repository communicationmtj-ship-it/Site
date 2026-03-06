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

      {/* South departments - amber/gold */}
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

      {/* "GRAND DÉPLACEMENT" bordered banner */}
      <g transform="translate(300, 185)">
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

      {/* "NOTRE SECTEUR" bordered banner */}
      <g transform="translate(300, 385)">
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
