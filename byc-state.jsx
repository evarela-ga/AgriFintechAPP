/* BeefYield Capital — Global state, router, navigation primitives */
/* eslint-disable */

// Initial seed data
const SEED_OPPS = [
  { id: 'angus-001', name: 'Lote Angus 001', sub: 'Exportación · Chile', tone: 'emerald', ret: 18.4, days: 150, risk: 'Moderado', riskN: 75, funding: 64, ticket: 250, conf: 92, target: 145000, traceable: true, tokenized: true, exportReady: true, feedlot: 'Campo Amigo Córdoba', location: 'Villa María, Córdoba', animals: 128, weightIn: 280, weightTarget: 430, gdp: 1.05, status: 'En fondeo', sanit: 91, well: 88, trace: 87 },
  { id: 'brangus-002', name: 'Brangus Premium 002', sub: 'Mercado interno premium', tone: 'navy', ret: 21.2, days: 180, risk: 'Medio/Alto', riskN: 60, funding: 48, ticket: 500, conf: 89, target: 220000, traceable: true, tokenized: true, exportReady: false, feedlot: 'AgroComex Santa Fe', location: 'Rafaela, Santa Fe', animals: 180, weightIn: 310, weightTarget: 480, gdp: 1.12, status: 'En fondeo', sanit: 88, well: 86, trace: 84 },
  { id: 'novillito-003', name: 'Novillito Export 003', sub: 'Exportación · UE', tone: 'cyan', ret: 16.8, days: 120, risk: 'Moderado/Bajo', riskN: 82, funding: 82, ticket: 100, conf: 94, target: 95000, traceable: true, tokenized: true, exportReady: true, feedlot: 'Asociado BA Oeste', location: 'Pergamino, BA', animals: 96, weightIn: 290, weightTarget: 420, gdp: 1.08, status: 'Próximo a cerrar', sanit: 93, well: 90, trace: 92 },
  { id: 'hereford-004', name: 'Lote Hereford 004', sub: 'Cuota Hilton', tone: 'earth', ret: 14.6, days: 110, risk: 'Bajo', riskN: 90, funding: 91, ticket: 100, conf: 96, target: 80000, traceable: true, tokenized: true, exportReady: true, feedlot: 'Campo Amigo Córdoba', location: 'Río Cuarto, Córdoba', animals: 84, weightIn: 295, weightTarget: 440, gdp: 1.04, status: 'Últimos cupos', sanit: 94, well: 91, trace: 89 },
];

const SEED_ASSETS = [
  { id: 'a-angus', oppId: 'angus-001', name: 'Lote Angus 001', sub: 'Exp. Chile · Campo Amigo Cba.', tone: 'emerald', invested: 5000, value: 5230, ret: 18.4, partial: 4.6, progress: 32, daysLeft: 102, conf: 92, status: 'En engorde', risk: 'Moderado', tokens: 50000 },
  { id: 'a-brangus', oppId: 'brangus-002', name: 'Brangus Premium 002', sub: 'Mercado interno · Santa Fe', tone: 'navy', invested: 3000, value: 3150, ret: 21.2, partial: 5.0, progress: 18, daysLeft: 148, conf: 89, status: 'En engorde', risk: 'Medio/Alto', tokens: 30000 },
  { id: 'a-novillito', oppId: 'novillito-003', name: 'Novillito Export 003', sub: 'UE · Pergamino, BA', tone: 'cyan', invested: 2500, value: 2890, ret: 16.8, partial: 15.6, progress: 88, daysLeft: 14, conf: 94, status: 'Pre-liquidación', risk: 'Moderado/Bajo', tokens: 25000 },
  { id: 'a-hereford', oppId: 'hereford-004', name: 'Lote Hereford 004', sub: 'Cuota Hilton · Tandil', tone: 'earth', invested: 2000, value: 2550, ret: 14.6, partial: 27.5, progress: 100, daysLeft: 0, conf: 96, status: 'Liquidado', risk: 'Bajo', tokens: 20000 },
];

const SEED_NOTIFS = [
  { id: 1, t: 'now', ico: 'bot', tone: '#38BDF8', title: 'AgroAI preparó un resumen', body: 'Tu portafolio rinde +12,7% acumulado. Tenés una liquidación en 18 días.', read: false },
  { id: 2, t: '2h', ico: 'spark', tone: '#F5A524', title: 'Nueva oportunidad premium', body: 'Brangus Premium 002 abrió fondeo. Confianza 89/100.', read: false },
  { id: 3, t: '4h', ico: 'file', tone: '#00A878', title: 'Nuevo reporte disponible', body: 'Reporte mensual · Lote Angus 001.', read: false },
  { id: 4, t: '1d', ico: 'trend', tone: '#00C896', title: 'Tu lote alcanzó 65% del ciclo', body: 'Novillito Export 003 avanza según proyección.', read: true },
  { id: 5, t: '2d', ico: 'coin', tone: '#F5A524', title: 'Liquidación próxima', body: 'Lote Novillito Export 003 cierra en 14 días.', read: true },
  { id: 6, t: '3d', ico: 'gift', tone: '#7C3AED', title: 'Beneficio desbloqueado', body: 'Acceso anticipado a 3 nuevos lotes premium.', read: true },
];

const SEED_MISSIONS = [
  { id: 'm-profile', title: 'Completar perfil', sub: 'Datos personales + foto', pts: 60, done: true, cat: 'Inicio' },
  { id: 'm-kyc', title: 'Completar KYC', sub: 'Verificación de identidad', pts: 200, done: true, cat: 'Inicio' },
  { id: 'm-simulator', title: 'Usar simulador', sub: 'Compará escenarios antes de invertir', pts: 80, done: true, cat: 'Inicio' },
  { id: 'm-risk', title: 'Leer riesgos principales', sub: 'En cualquier oportunidad', pts: 40, done: false, cat: 'Educación' },
  { id: 'm-trace', title: 'Revisar trazabilidad', sub: 'Abrí un pasaporte digital', pts: 120, done: false, cat: 'Seguimiento' },
  { id: 'm-ai', title: 'Consultar AgroAI', sub: 'Hacé 3 preguntas a tu coach', pts: 50, done: false, cat: 'Seguimiento' },
  { id: 'm-report', title: 'Descargar reporte', sub: 'Mensual o sanitario', pts: 40, done: false, cat: 'Seguimiento' },
  { id: 'm-map', title: 'Revisar el mapa', sub: 'Visualizá dónde están tus activos', pts: 30, done: false, cat: 'Seguimiento' },
  { id: 'm-compare', title: 'Comparar 2 oportunidades', sub: 'Usá AgroAI o el simulador', pts: 100, done: false, cat: 'Diversificación' },
  { id: 'm-reinvest', title: 'Reinvertir con simulador', sub: 'Probá un escenario base', pts: 80, done: false, cat: 'Diversificación' },
];

const REPORTS = [
  { id: 'r1', title: 'Reporte mensual · Agosto', lot: 'Lote Angus 001', date: '01 sep 2025', isNew: true, type: 'Mensual', tone: 'emerald', body: 'El lote avanzó 32% del ciclo con GDP 1,08 kg/d. Índice sanitario 91/100. Sin eventos críticos. Proyección base: +18,4% al cierre.' },
  { id: 'r2', title: 'Pesada intermedia', lot: 'Brangus Premium 002', date: '28 ago 2025', isNew: true, type: 'Productivo', tone: 'cyan', body: 'Pesada al día 30. Peso medio 332 kg vs proyectado 328 kg. Conversión 6,1:1.' },
  { id: 'r3', title: 'Control sanitario', lot: 'Lote Angus 001', date: '25 ago 2025', isNew: false, type: 'Sanitario', tone: 'emerald', body: '128/128 animales con plan vacunal completo. 2 animales en observación por respiratorio leve, recuperación esperada en 5 días.' },
  { id: 'r4', title: 'Trazabilidad validada', lot: 'Novillito Export 003', date: '21 ago 2025', isNew: false, type: 'Trazabilidad', tone: 'violet', body: '18 eventos validados con hash blockchain. Auditoría externa aprobada.' },
  { id: 'r5', title: 'Cierre de ciclo', lot: 'Lote Hereford 004', date: '12 ago 2025', isNew: false, type: 'Liquidación', tone: 'gold', body: 'Resultado neto USD 2.550 (+27,5%) vs proyectado +14,6%. Mejor precio de exportación.' },
  { id: 'r6', title: 'Reporte para contador', lot: 'Portafolio Q2', date: '01 jul 2025', isNew: false, type: 'Financiero', tone: 'navy', body: 'Estado consolidado Q2 con detalle por lote, comisiones, costos y resultado.' },
];

// ============ STORE ============
const Store = React.createContext(null);

const initialState = {
  // routing
  view: 'splash',         // splash | login | onb | kyc | risk | app | empty-home
  tab: 'home',            // when view === 'app'
  stack: [],              // [{name, params}] on top of current tab
  modal: null,            // { name, props }
  sheet: null,            // { name, props }
  toast: null,            // { msg, tone }
  drawer: false,          // side drawer open

  // appearance
  theme: 'light',         // 'light' | 'dark'
  hideAmounts: false,

  // user
  user: { name: 'Enzo', surname: 'Martínez', email: 'enzo@beefyield.io', avatar: 'EM', level: 3, levelName: 'Inversor Ganadero', agropoints: 2840, kyc: 'pending' },
  riskProfile: null,      // 'Conservador' | 'Moderado' | 'Dinámico' | ...
  onboardingIndex: 0,
  kyc: { dni: false, selfie: false, address: false, funds: false, declaration: false },

  // data
  opportunities: SEED_OPPS,
  assets: [],             // starts empty for new investors; pre-seed if demo
  notifications: SEED_NOTIFS,
  missions: SEED_MISSIONS,
  reports: REPORTS,

  // AgroAI chat
  aiHistory: [{ role: 'ai', text: '¡Hola Enzo! 👋 Acabás de crear tu cuenta. Cuando hagas tu primera inversión, te ayudo a seguir el portafolio. ¿Querés que te explique cómo funciona BeefYield?' }],
};

function reducer(s, a) {
  switch (a.type) {
    case 'NAV': return { ...s, view: a.view, tab: a.tab ?? s.tab, stack: [] };
    case 'TAB': return { ...s, tab: a.tab, stack: [] };
    case 'PUSH': return { ...s, stack: [...s.stack, { name: a.name, params: a.params || {} }] };
    case 'POP': return { ...s, stack: s.stack.slice(0, -1) };
    case 'POP_TO': {
      const idx = s.stack.findIndex(x => x.name === a.name);
      return { ...s, stack: idx >= 0 ? s.stack.slice(0, idx + 1) : [] };
    }
    case 'RESET_STACK': return { ...s, stack: [] };
    case 'MODAL': return { ...s, modal: a.modal };
    case 'SHEET': return { ...s, sheet: a.sheet };
    case 'TOAST': return { ...s, toast: a.toast };
    case 'DRAWER': return { ...s, drawer: a.open };
    case 'THEME': return { ...s, theme: s.theme === 'light' ? 'dark' : 'light' };
    case 'HIDE_AMOUNTS': return { ...s, hideAmounts: !s.hideAmounts };

    case 'ONB_NEXT': return { ...s, onboardingIndex: s.onboardingIndex + 1 };
    case 'ONB_PREV': return { ...s, onboardingIndex: Math.max(0, s.onboardingIndex - 1) };
    case 'ONB_SET': return { ...s, onboardingIndex: a.index };

    case 'KYC_STEP': return { ...s, kyc: { ...s.kyc, [a.key]: true } };
    case 'KYC_DONE': return { ...s, user: { ...s.user, kyc: 'approved' } };

    case 'SET_RISK': return { ...s, riskProfile: a.profile };

    case 'ADD_ASSET': return { ...s, assets: [a.asset, ...s.assets] };
    case 'FUND_OPP': return {
      ...s,
      opportunities: s.opportunities.map(o => o.id === a.id ? { ...o, funding: Math.min(100, o.funding + a.delta) } : o),
    };

    case 'AI_MSG': return { ...s, aiHistory: [...s.aiHistory, a.msg] };

    case 'MISSION_DONE': return {
      ...s,
      missions: s.missions.map(m => m.id === a.id ? { ...m, done: true } : m),
      user: { ...s.user, agropoints: s.user.agropoints + (s.missions.find(m => m.id === a.id)?.pts || 0) },
    };

    case 'NOTIF_READ': return {
      ...s,
      notifications: s.notifications.map(n => n.id === a.id ? { ...n, read: true } : n),
    };

    case 'DEMO_SEED': return { ...s, assets: SEED_ASSETS, user: { ...s.user, kyc: 'approved' }, riskProfile: 'Moderado' };

    default: return s;
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // auto-clear toast
  React.useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: 'TOAST', toast: null }), state.toast.duration || 2400);
    return () => clearTimeout(t);
  }, [state.toast]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

function useStore() { return React.useContext(Store); }
function useNav() {
  const { state, dispatch } = useStore();
  return {
    view: state.view, tab: state.tab, stack: state.stack,
    go: (view, tab) => dispatch({ type: 'NAV', view, tab }),
    tabTo: (tab) => dispatch({ type: 'TAB', tab }),
    push: (name, params) => dispatch({ type: 'PUSH', name, params }),
    pop: () => dispatch({ type: 'POP' }),
    popTo: (name) => dispatch({ type: 'POP_TO', name }),
    resetStack: () => dispatch({ type: 'RESET_STACK' }),
    modal: (modal) => dispatch({ type: 'MODAL', modal }),
    sheet: (sheet) => dispatch({ type: 'SHEET', sheet }),
    toast: (msg, tone) => dispatch({ type: 'TOAST', toast: { msg, tone } }),
    drawer: (open) => dispatch({ type: 'DRAWER', open }),
  };
}

// Portfolio aggregates derived from assets[]
function usePortfolio() {
  const { state } = useStore();
  const assets = state.assets;
  const invested = assets.reduce((s, a) => s + a.invested, 0);
  const value = assets.reduce((s, a) => s + a.value, 0);
  const active = assets.filter(a => a.status !== 'Liquidado').length;
  const tokens = assets.reduce((s, a) => s + (a.tokens || 0), 0);
  const ret = invested > 0 ? ((value - invested) / invested) * 100 : 0;
  const projAvg = active > 0 ? assets.filter(a => a.status !== 'Liquidado').reduce((s, a) => s + a.ret, 0) / active : 0;
  return { invested, value, active, tokens, ret, projAvg, total: assets.length, hasInvestments: assets.length > 0 };
}

Object.assign(window, { Store, StoreProvider, useStore, useNav, usePortfolio, SEED_OPPS, SEED_ASSETS, SEED_NOTIFS, SEED_MISSIONS, REPORTS });
