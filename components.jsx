/* BeefYield Capital — Shared mobile components & icons */
/* eslint-disable */

// ============ ICON SET (stroke 1.6, lucide-flavor) ============
const I = {
  arrowRight: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  arrowUpRight: (p={}) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 17L17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevR: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevD: (p={}) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevL: (p={}) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  search: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  bell: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  eye: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>),
  eyeOff: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 3l18 18M10.6 6.1a10 10 0 0111.4 5.9 18 18 0 01-3 4M6.7 7.3A18 18 0 002 12s3.5 7 10 7a10 10 0 005-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  home: (p={}) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>),
  spark: (p={}) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/></svg>),
  wallet: (p={}) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M3 10h18M16 15h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>),
  pin: (p={}) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7"/></svg>),
  bot: (p={}) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="8" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M12 4v4M9 14h.01M15 14h.01M2 14v2M22 14v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>),
  shield: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  trend: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 17l6-6 4 4 8-9M14 6h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  trendDn: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 7l6 6 4-4 8 9M14 18h7v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  calc: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.7"/><rect x="7" y="6" width="10" height="3" rx="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="12" cy="13" r="1" fill="currentColor"/><circle cx="16" cy="13" r="1" fill="currentColor"/><circle cx="8" cy="17" r="1" fill="currentColor"/><circle cx="12" cy="17" r="1" fill="currentColor"/><circle cx="16" cy="17" r="1" fill="currentColor"/></svg>),
  file: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M14 3v5h5M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  qr: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6"/><path d="M14 14h2v2h-2zM18 14h3M14 18h3v3M21 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  coin: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><ellipse cx="12" cy="6" rx="9" ry="3" stroke="currentColor" strokeWidth="1.6"/><path d="M3 6v6c0 1.7 4 3 9 3s9-1.3 9-3V6M3 12v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" stroke="currentColor" strokeWidth="1.6"/></svg>),
  badge: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 2l2.4 2.6 3.5-.6.7 3.4 3.2 1.5L20.5 12l1.3 3.1-3.2 1.5-.7 3.4-3.5-.6L12 22l-2.4-2.6-3.5.6-.7-3.4L2.2 15.1 3.5 12 2.2 8.9l3.2-1.5.7-3.4 3.5.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8.5 12.5L11 15l4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  globe: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6"/></svg>),
  truck: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/></svg>),
  heart: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11h3l2-4 4 8 2-4h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  bone: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 7a3 3 0 015-2 3 3 0 014 0l5 5a3 3 0 010 4 3 3 0 01-2 5 3 3 0 01-4 0l-5-5a3 3 0 01-4 0 3 3 0 01-3-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  trophy: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 4h10v4a5 5 0 01-10 0V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6l-1 4H10z M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  gift: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="8" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.6"/><path d="M5 13v8h14v-8M12 8v13M12 8c-2 0-4-1-4-3s2-3 4 0c2-3 4-2 4 0s-2 3-4 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  download: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  share: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v5a2 2 0 002 2h12a2 2 0 002-2v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  filter: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 5h18l-7 9v5l-4 2v-7L3 5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>),
  finger: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M8 11a4 4 0 018 0v3M6 14c0-4 2-8 6-8 3 0 5 2 5 5M9 14v3a3 3 0 006 0M5 18a8 8 0 01-1-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  plus: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  check: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  x: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  send: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11l18-8-7 18-3-7-8-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>),
  mic: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>),
  cow: (p={}) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 9c-1 0-2-2 0-3 .5 2 2 2 2 2M19 9c1 0 2-2 0-3-.5 2-2 2-2 2M6 11c0-3 3-5 6-5s6 2 6 5v3a4 4 0 01-4 4h-4a4 4 0 01-4-4v-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="10" cy="12" r="0.8" fill="currentColor"/><circle cx="14" cy="12" r="0.8" fill="currentColor"/><path d="M10 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  layer: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  google: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" {...p}><path d="M22 12.2c0-.8-.07-1.5-.2-2.2H12v4.2h5.6c-.24 1.3-.97 2.4-2.07 3.13v2.6h3.34C20.8 18.13 22 15.4 22 12.2z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.66-2.43L15.4 17.3c-.9.6-2.04.94-3.4.94-2.6 0-4.8-1.76-5.6-4.13H2.95v2.6A10 10 0 0012 22z" fill="#34A853"/><path d="M6.4 14.1A6 6 0 016.08 12c0-.74.13-1.45.32-2.12V7.28H2.95A10 10 0 002 12c0 1.6.38 3.13 1.05 4.5l3.35-2.4z" fill="#FBBC05"/><path d="M12 5.88c1.47 0 2.78.5 3.82 1.5l2.85-2.85A10 10 0 0012 2 10 10 0 002.95 7.5l3.45 2.6C7.2 7.64 9.4 5.88 12 5.88z" fill="#EA4335"/></svg>),
  apple: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.4 12.6c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.8-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9c1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3-.1-.1-2.9-1.1-2.9-4.6zM13.6 4.5c.8-1 1.3-2.3 1.2-3.6-1.1.04-2.4.7-3.2 1.7-.7.8-1.4 2.1-1.2 3.4 1.2.1 2.4-.6 3.2-1.5z"/></svg>),
  ms: (p={}) => (<svg width="18" height="18" viewBox="0 0 24 24" {...p}><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>),
};

// ============ BRAND LOGOS ============
function LogoBYC({ size = 22, dark = false }) {
  const c1 = '#00C896', c2 = '#38BDF8';
  const fg = dark ? '#F8FAFC' : '#0B1F33';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: fg, fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800, letterSpacing: -0.4 }}>
      <svg width={size} height={size} viewBox="0 0 32 32">
        <defs>
          <linearGradient id="byc-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1}/>
            <stop offset="1" stopColor={c2}/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#byc-g)"/>
        <path d="M9 22V10h6c2.2 0 3.6 1.2 3.6 3 0 1.4-.8 2.4-2 2.7v.1c1.5.3 2.5 1.4 2.5 3 0 2-1.6 3.2-4 3.2H9zm3-7h2.2c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3H12V15zm0 4.7h2.5c1.1 0 1.8-.5 1.8-1.4s-.7-1.4-1.8-1.4H12v2.8z" fill="#06121F"/>
        <circle cx="23" cy="11" r="2" fill="#FFB020"/>
      </svg>
      <span style={{ fontSize: size * 0.7 }}>BeefYield <span style={{ fontWeight: 500, opacity: 0.7 }}>Capital</span></span>
    </div>
  );
}

function PartnerLogos({ dark = false, size = 11 }) {
  const c = dark ? 'rgba(248,250,252,0.6)' : 'rgba(11,31,51,0.55)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Inter, sans-serif', fontSize: size, color: c, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, background: '#00C896', borderRadius: 2 }}/>AgroComex</span>
      <span style={{ width: 1, height: 10, background: c, opacity: 0.4 }}/>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, background: '#F5A524', borderRadius: 999 }}/>Campo Amigo</span>
      <span style={{ width: 1, height: 10, background: c, opacity: 0.4 }}/>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, background: '#38BDF8', transform: 'rotate(45deg)' }}/>GoodApps</span>
    </div>
  );
}

// ============ BASIC PIECES ============
function Badge({ children, tone = 'navy', soft = true, style }) {
  const tones = {
    navy:   ['#0B1F33', '#E4ECF3'],
    emerald:['#00A878', '#DCFCE7'],
    cyan:   ['#0284C7', '#DBF4FF'],
    gold:   ['#A87514', '#FEF3C7'],
    danger: ['#B91C1C', '#FEE2E2'],
    violet: ['#6D28D9', '#EDE9FE'],
    neutral:['#475569', '#F1F5F9'],
  };
  const [fg, bg] = tones[tone] || tones.navy;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      background: soft ? bg : fg, color: soft ? fg : '#fff',
      fontSize: 11, fontWeight: 600, lineHeight: 1.2,
      letterSpacing: 0.1, fontFamily: 'Inter, sans-serif',
      ...style,
    }}>{children}</span>
  );
}

function Chip({ children, active = false, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      border: 'none', cursor: 'pointer',
      padding: '8px 14px', borderRadius: 999,
      background: active ? '#0B1F33' : '#fff',
      color: active ? '#fff' : '#51637A',
      fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
      boxShadow: active ? 'none' : '0 1px 2px rgba(11,31,51,0.05)',
      border: active ? 'none' : '1px solid #E4ECF3',
      whiteSpace: 'nowrap', flexShrink: 0,
      ...style,
    }}>{children}</button>
  );
}

function Btn({ children, kind = 'primary', size = 'md', full, onClick, style, icon }) {
  const sizes = {
    sm: { p: '10px 14px', fs: 13, r: 12 },
    md: { p: '14px 18px', fs: 15, r: 14 },
    lg: { p: '16px 20px', fs: 16, r: 16 },
  };
  const s = sizes[size];
  const kinds = {
    primary: { bg: '#0B1F33', fg: '#fff', bd: 'none' },
    emerald: { bg: 'linear-gradient(135deg, #00A878, #00C896)', fg: '#fff', bd: 'none' },
    gold:    { bg: 'linear-gradient(135deg, #F5A524, #FFB020)', fg: '#0B1F33', bd: 'none' },
    ghost:   { bg: 'transparent', fg: '#0B1F33', bd: '1px solid #E4ECF3' },
    soft:    { bg: '#F2F6F9', fg: '#0B1F33', bd: 'none' },
  };
  const k = kinds[kind];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: s.p, borderRadius: s.r,
      background: k.bg, color: k.fg, border: k.bd,
      fontSize: s.fs, fontWeight: 700, fontFamily: 'Inter, sans-serif',
      cursor: 'pointer', width: full ? '100%' : 'auto',
      letterSpacing: -0.1,
      ...style,
    }}>{icon}{children}</button>
  );
}

// ============ KPI / Cards ============
function MoneyBig({ value, currency = 'USD', size = 32, weight = 700, dim, prefix }) {
  return (
    <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: weight, fontSize: size, letterSpacing: -1.2, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      <span style={{ fontSize: size * 0.55, opacity: 0.6, marginRight: 4, fontWeight: 600 }}>{currency}</span>
      {value}
    </div>
  );
}

function Stat({ label, value, sub, tone = '#0B1F33', align = 'left' }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ fontSize: 11, color: '#8497AE', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: 18, fontWeight: 700, color: tone, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#8497AE', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function ProgressRing({ value = 0, size = 56, stroke = 6, color = '#00C896', track = 'rgba(11,31,51,0.08)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

function ProgressBar({ value, color = '#00C896', height = 6, track = '#E4ECF3' }) {
  return (
    <div style={{ width: '100%', height, background: track, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 999, transition: 'width 0.6s ease' }}/>
    </div>
  );
}

// risk-score color
function riskColor(level) {
  if (typeof level === 'number') {
    if (level >= 90) return '#00A878';
    if (level >= 75) return '#00B8D9';
    if (level >= 60) return '#F5A524';
    return '#EF4444';
  }
  const m = { bajo: '#00A878', moderado: '#00B8D9', medio: '#F5A524', alto: '#EF4444' };
  return m[level?.toLowerCase()] || '#64748B';
}

// Card wrapper
function Card({ children, style, dark = false, pad = 16 }) {
  return (
    <div style={{
      background: dark ? '#0B1F33' : '#fff',
      borderRadius: 20,
      padding: pad,
      boxShadow: dark ? '0 1px 0 rgba(255,255,255,0.04) inset' : '0 1px 2px rgba(11,31,51,0.04), 0 8px 24px rgba(11,31,51,0.05)',
      border: dark ? '1px solid #16324A' : '1px solid #EEF3F8',
      ...style,
    }}>{children}</div>
  );
}

// Image placeholder w/ stripes (for lot/feedlot imagery)
function ImagePh({ label = 'lote · feedlot', tone = 'navy', height = 140, style }) {
  const palettes = {
    navy:    ['#0B1F33', '#102A43', '#00A878'],
    emerald: ['#064E3B', '#00A878', '#34D399'],
    cyan:    ['#0C4A6E', '#0284C7', '#38BDF8'],
    gold:    ['#78350F', '#D9A441', '#FCD34D'],
    earth:   ['#3F2A14', '#7A4F1E', '#C8A468'],
  };
  const p = palettes[tone] || palettes.navy;
  return (
    <div style={{
      height, borderRadius: 16, overflow: 'hidden', position: 'relative',
      background: `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 60%, ${p[2]} 100%)`,
      ...style,
    }}>
      {/* stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 8px, transparent 8px 22px)',
      }}/>
      {/* grain dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}/>
      {/* label */}
      <div style={{
        position: 'absolute', left: 12, bottom: 10,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 10, color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.4, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

// ============ TAB BAR ============
function TabBar({ active = 'home', onTab, dark = false }) {
  const items = [
    { id: 'home', icon: I.home, label: 'Inicio' },
    { id: 'opp',  icon: I.spark, label: 'Oportunidades' },
    { id: 'mine', icon: I.wallet, label: 'Mis Activos' },
    { id: 'map',  icon: I.pin, label: 'Mapa' },
    { id: 'ai',   icon: I.bot, label: 'AgroAI' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 8,
      background: dark
        ? 'linear-gradient(to top, #06121F 60%, rgba(6,18,31,0.7))'
        : 'linear-gradient(to top, #ffffff 60%, rgba(255,255,255,0.7))',
      borderTop: dark ? '1px solid #16324A' : '1px solid #EEF3F8',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 30,
    }}>
      {items.map(it => {
        const on = active === it.id;
        const c = on ? (it.id === 'ai' ? '#38BDF8' : '#00A878') : (dark ? '#94A3B8' : '#8497AE');
        return (
          <button key={it.id} onClick={() => onTab && onTab(it.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: c, padding: '4px 8px',
          }}>
            <it.icon style={{ width: 22, height: 22 }}/>
            <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Floating AI button
function AIFab({ onClick, dark = false, bottom = 100 }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute', right: 18, bottom, zIndex: 40,
      width: 54, height: 54, borderRadius: 27, border: 'none', cursor: 'pointer',
      background: 'linear-gradient(135deg, #2F80ED 0%, #38BDF8 100%)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(56,189,248,0.5), 0 0 0 4px rgba(56,189,248,0.15)',
    }}>
      <I.bot style={{ width: 26, height: 26 }}/>
    </button>
  );
}

// Sparkline svg
function Spark({ data = [], color = '#00C896', w = 80, h = 28, fill = true }) {
  if (!data.length) return null;
  const mn = Math.min(...data), mx = Math.max(...data);
  const r = mx - mn || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * (h - 4) - 2]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h}>
      {fill && <path d={area} fill={color} opacity="0.12"/>}
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Phone screen container (replaces IOSDevice when we want a clean canvas)
function PhoneScreen({ children, dark = false, title, statusDark, time = '9:41', noStatus = false, fixed }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 44, overflow: 'hidden',
      position: 'relative', background: dark ? '#06121F' : '#F7FAFC',
      boxShadow: '0 30px 70px rgba(11,31,51,0.18), 0 0 0 1px rgba(11,31,51,0.08), inset 0 0 0 4px #0B0B0E',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: dark ? '#F8FAFC' : '#0B1F33',
    }}>
      {/* dynamic island */}
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 120, height: 35, borderRadius: 22, background: '#000', zIndex: 50 }}/>
      {/* status bar */}
      {!noStatus && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, display: 'flex', justifyContent: 'space-between', padding: '18px 28px 0', fontSize: 14, fontWeight: 600, color: statusDark ?? dark ? '#fff' : '#0B1F33', fontFamily: '-apple-system, system-ui' }}>
          <span>{time}</span>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
            <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 8h2v3H1zM5 5h2v6H5zM9 2h2v9H9zM13 0h2v11h-2z" fill="currentColor"/></svg>
            <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.5a8 8 0 015.7 2.3l1-1A9.5 9.5 0 008 1a9.5 9.5 0 00-6.7 2.8l1 1A8 8 0 018 2.5z" fill="currentColor"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="21" height="10" rx="3" stroke="currentColor" fill="none" opacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor"/></svg>
          </span>
        </div>
      )}
      {/* home indicator */}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 130, height: 4, borderRadius: 99, background: dark ? 'rgba(255,255,255,0.5)' : 'rgba(11,31,51,0.35)', zIndex: 60 }}/>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

Object.assign(window, {
  I, LogoBYC, PartnerLogos, Badge, Chip, Btn, MoneyBig, Stat, ProgressRing, ProgressBar,
  riskColor, Card, ImagePh, TabBar, AIFab, Spark, PhoneScreen,
});
