/* BeefYield Capital — Phone shell, router, transitions, common UI */
/* eslint-disable */

// ============ THEME HELPERS ============
function useTheme() {
  const { state } = useStore();
  const d = state.theme === 'dark';
  return {
    dark: d,
    bg: d ? '#06121F' : '#F7FAFC',
    card: d ? '#0B1F33' : '#FFFFFF',
    card2: d ? '#102A43' : '#F2F6F9',
    line: d ? '#16324A' : '#EEF3F8',
    line2: d ? '#16324A' : '#E4ECF3',
    text: d ? '#F8FAFC' : '#0B1F33',
    text2: d ? '#94A3B8' : '#51637A',
    text3: d ? '#64748B' : '#8497AE',
  };
}

// ============ ANIMATED SCREEN WRAPPER ============
function ScreenWrap({ children, slide = true, kind = 'right' }) {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setEnter(true), 10);
    return () => clearTimeout(t);
  }, []);
  const transforms = {
    right: enter ? 'translateX(0)' : 'translateX(100%)',
    up:    enter ? 'translateY(0)' : 'translateY(100%)',
    fade:  enter ? 'none' : 'none',
  };
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      transform: slide ? transforms[kind] : 'none',
      opacity: kind === 'fade' ? (enter ? 1 : 0) : 1,
      transition: 'transform 0.32s cubic-bezier(0.2,0.7,0.3,1), opacity 0.25s ease',
      willChange: 'transform',
    }}>{children}</div>
  );
}

// ============ STATUS BAR (visible inside phone frame) ============
function StatusBar({ darkText, time = '9:41' }) {
  const c = darkText ? '#fff' : '#0B1F33';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px 0', fontSize: 14, fontWeight: 600,
      color: c, zIndex: 100, pointerEvents: 'none',
      fontFamily: '-apple-system, "SF Pro", Inter, system-ui',
    }}>
      <span>{time}</span>
      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 8h2v3H1zM5 5h2v6H5zM9 2h2v9H9zM13 0h2v11h-2z" fill="currentColor"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.5a8 8 0 015.7 2.3l1-1A9.5 9.5 0 008 1a9.5 9.5 0 00-6.7 2.8l1 1A8 8 0 018 2.5z" fill="currentColor"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="21" height="10" rx="3" stroke="currentColor" fill="none" opacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// ============ TOAST ============
function Toast() {
  const { state, dispatch } = useStore();
  const t = state.toast;
  if (!t) return null;
  const tones = {
    success: { bg: '#0B1F33', fg: '#fff', dot: '#00C896' },
    warn:    { bg: '#0B1F33', fg: '#fff', dot: '#F5A524' },
    ai:      { bg: '#0B1F33', fg: '#fff', dot: '#38BDF8' },
    error:   { bg: '#0B1F33', fg: '#fff', dot: '#EF4444' },
  };
  const k = tones[t.tone || 'success'];
  return (
    <div style={{
      position: 'absolute', top: 70, left: 16, right: 16,
      background: k.bg, color: k.fg,
      padding: '12px 16px', borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
      zIndex: 250,
      animation: 'byc-toast-in 0.3s cubic-bezier(0.2,0.7,0.3,1)',
      fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: 99, background: k.dot, boxShadow: `0 0 0 4px ${k.dot}33` }}/>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{t.msg}</span>
      <button onClick={() => dispatch({ type: 'TOAST', toast: null })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 4 }}><I.x style={{ width: 14, height: 14 }}/></button>
    </div>
  );
}

// ============ BOTTOM SHEET ============
function Sheet() {
  const { state, dispatch } = useStore();
  const s = state.sheet;
  const T = useTheme();
  if (!s) return null;
  return (
    <>
      <div onClick={() => dispatch({ type: 'SHEET', sheet: null })} style={{
        position: 'absolute', inset: 0, background: 'rgba(6,18,31,0.5)', zIndex: 200,
        animation: 'byc-fade-in 0.2s ease',
      }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: T.bg, color: T.text,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '12px 0 30px',
        boxShadow: '0 -20px 50px rgba(11,31,51,0.4)',
        zIndex: 210, maxHeight: '88%', overflow: 'auto',
        animation: 'byc-sheet-up 0.3s cubic-bezier(0.2,0.7,0.3,1)',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: T.line2, margin: '0 auto 14px' }}/>
        <SheetContent name={s.name} props={s.props || {}}/>
      </div>
    </>
  );
}

// Sheet content registry — implementations live in screen files
const _sheetRegistry = {};
function registerSheet(name, Comp) { _sheetRegistry[name] = Comp; }
function SheetContent({ name, props }) {
  const C = _sheetRegistry[name];
  if (!C) return <div style={{ padding: 20 }}>Unknown sheet: {name}</div>;
  return <C {...props}/>;
}

// ============ MODAL ============
function Modal() {
  const { state, dispatch } = useStore();
  const m = state.modal;
  const T = useTheme();
  if (!m) return null;
  return (
    <>
      <div onClick={() => dispatch({ type: 'MODAL', modal: null })} style={{
        position: 'absolute', inset: 0, background: 'rgba(6,18,31,0.6)',
        backdropFilter: 'blur(4px)', zIndex: 230,
        animation: 'byc-fade-in 0.2s ease',
      }}/>
      <div style={{
        position: 'absolute', top: '50%', left: 24, right: 24,
        transform: 'translateY(-50%)', zIndex: 240,
        background: T.bg, color: T.text, borderRadius: 22,
        padding: 20, animation: 'byc-modal-in 0.25s cubic-bezier(0.2,0.7,0.3,1)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
      }}>
        <ModalContent name={m.name} props={m.props || {}}/>
      </div>
    </>
  );
}
const _modalRegistry = {};
function registerModal(name, Comp) { _modalRegistry[name] = Comp; }
function ModalContent({ name, props }) {
  const C = _modalRegistry[name];
  if (!C) return <div>Unknown modal: {name}</div>;
  return <C {...props}/>;
}

// ============ SIDE DRAWER ============
function Drawer() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();
  if (!state.drawer) return null;
  const items = [
    { label: 'Perfil', icon: I.badge, action: () => { nav.push('profile'); nav.drawer(false); } },
    { label: 'Notificaciones', icon: I.bell, action: () => { nav.push('notifications'); nav.drawer(false); }, badge: state.notifications.filter(n => !n.read).length },
    { label: 'Misiones', icon: I.trophy, action: () => { nav.push('missions'); nav.drawer(false); } },
    { label: 'BeefYield Club', icon: I.gift, action: () => { nav.push('club'); nav.drawer(false); } },
    { label: 'Reportes', icon: I.file, action: () => { nav.push('reports'); nav.drawer(false); } },
    { label: 'Liquidaciones', icon: I.coin, action: () => { nav.push('liquidations'); nav.drawer(false); } },
    { label: 'Documentos', icon: I.file, action: () => { nav.push('documents'); nav.drawer(false); } },
    { label: 'Centro de Aprendizaje', icon: I.spark, action: () => { nav.push('learn'); nav.drawer(false); } },
    { label: 'Seguridad', icon: I.shield, action: () => { nav.push('security'); nav.drawer(false); } },
    { label: 'Configuración', icon: I.layer, action: () => { nav.push('settings'); nav.drawer(false); } },
  ];
  return (
    <>
      <div onClick={() => nav.drawer(false)} style={{
        position: 'absolute', inset: 0, background: 'rgba(6,18,31,0.5)', zIndex: 180,
        animation: 'byc-fade-in 0.2s ease',
      }}/>
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: 320,
        background: T.bg, color: T.text, zIndex: 190,
        padding: '54px 0 30px',
        animation: 'byc-drawer-in 0.3s cubic-bezier(0.2,0.7,0.3,1)',
        boxShadow: '20px 0 50px rgba(11,31,51,0.3)',
        overflow: 'auto',
      }}>
        {/* user header */}
        <div style={{ padding: '14px 22px 18px', borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg, #FFB020, #F5A524)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, color: '#06121F' }}>{state.user.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>{state.user.name} {state.user.surname}</div>
              <div style={{ fontSize: 11, color: T.text2 }}>{state.user.email}</div>
            </div>
            <button onClick={() => nav.drawer(false)} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: T.card2, color: T.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.x/></button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {state.user.kyc === 'approved' && <Badge tone="emerald" soft={false}><I.check style={{ width: 10, height: 10 }}/>KYC</Badge>}
            <Badge tone="gold" soft={false}>Nivel {state.user.level}</Badge>
            <Badge tone="cyan" soft={false}>{state.user.agropoints} AP</Badge>
          </div>
        </div>

        <div style={{ padding: '10px 12px' }}>
          {items.map(it => (
            <button key={it.label} onClick={it.action} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 14px', borderRadius: 12, border: 'none',
              background: 'transparent', color: T.text, cursor: 'pointer',
              fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
              textAlign: 'left',
            }}>
              <it.icon style={{ width: 20, height: 20, color: T.text2 }}/>
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge ? <span style={{ background: '#EF4444', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 99, fontWeight: 800 }}>{it.badge}</span> : null}
              <I.chevR style={{ width: 14, height: 14, color: T.text3 }}/>
            </button>
          ))}
        </div>

        {/* theme toggle */}
        <div style={{ padding: '10px 22px', borderTop: `1px solid ${T.line}`, marginTop: 10 }}>
          <button onClick={() => dispatch({ type: 'THEME' })} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', background: 'none', border: 'none', color: T.text, cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <I.layer style={{ color: T.text2 }}/>Modo {T.dark ? 'claro' : 'oscuro'}
            </span>
            <div style={{ width: 44, height: 26, borderRadius: 99, background: T.dark ? '#38BDF8' : '#CBD5E1', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 2, left: T.dark ? 20 : 2, width: 22, height: 22, borderRadius: 99, background: '#fff', transition: 'left 0.2s' }}/>
            </div>
          </button>
        </div>

        <div style={{ padding: '4px 22px' }}>
          <button onClick={() => { nav.drawer(false); nav.go('login'); }} style={{
            width: '100%', padding: '12px 0', background: 'none', border: `1px solid ${T.line2}`, borderRadius: 12,
            color: '#EF4444', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 6,
          }}>Cerrar sesión</button>
        </div>
      </div>
    </>
  );
}

// ============ TAB BAR ============
function AppTabBar() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const items = [
    { id: 'home', icon: I.home, label: 'Inicio' },
    { id: 'opp', icon: I.spark, label: 'Oportunidades' },
    { id: 'mine', icon: I.wallet, label: 'Activos' },
    { id: 'map', icon: I.pin, label: 'Mapa' },
    { id: 'ai', icon: I.bot, label: 'AgroAI' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      paddingBottom: 24, paddingTop: 6,
      background: T.dark
        ? 'linear-gradient(to top, #06121F 70%, rgba(6,18,31,0.85) 95%, transparent)'
        : 'linear-gradient(to top, #ffffff 70%, rgba(255,255,255,0.85) 95%, transparent)',
      borderTop: `1px solid ${T.line}`,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => {
        const on = state.tab === it.id && state.stack.length === 0;
        const c = on ? (it.id === 'ai' ? '#38BDF8' : '#00A878') : T.text3;
        return (
          <button key={it.id} onClick={() => nav.tabTo(it.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: c, padding: '6px 8px', minWidth: 60,
          }}>
            <it.icon style={{ width: 22, height: 22 }}/>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============ AI FAB ============
function AIFab() {
  const nav = useNav();
  return (
    <button onClick={() => nav.tabTo('ai')} style={{
      position: 'absolute', right: 18, bottom: 100, zIndex: 40,
      width: 52, height: 52, borderRadius: 26, border: 'none', cursor: 'pointer',
      background: 'linear-gradient(135deg, #2F80ED 0%, #38BDF8 100%)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(56,189,248,0.5), 0 0 0 4px rgba(56,189,248,0.15)',
      animation: 'byc-ai-pulse 2.4s ease-in-out infinite',
    }}>
      <I.bot style={{ width: 24, height: 24 }}/>
    </button>
  );
}

// ============ HEADER BAR (for pushed screens) ============
function ScreenHeader({ title, subtitle, onBack, right, transparent }) {
  const nav = useNav();
  const T = useTheme();
  return (
    <div style={{
      padding: '54px 16px 12px',
      background: transparent ? 'transparent' : T.bg,
      display: 'flex', alignItems: 'center', gap: 12,
      position: 'relative', zIndex: 10,
    }}>
      <button onClick={() => (onBack ? onBack() : nav.pop())} style={{
        width: 38, height: 38, borderRadius: 12, border: `1px solid ${T.line2}`,
        background: T.card, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
      }}><I.chevL/></button>
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div style={{ fontSize: 11, color: T.text3, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{subtitle}</div>}
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

// ============ PHONE SHELL ============
function PhoneShell({ children }) {
  const T = useTheme();
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => {
    const r = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  // Mobile real: full-bleed (no phone chrome)
  const isMobileViewport = vp.w < 600;

  if (isMobileViewport) {
    return (
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden',
        background: T.bg, color: T.text,
        fontFamily: 'Inter, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}>{children}</div>
    );
  }

  // Desktop: phone frame, optionally with side panel
  const PHONE_W = 390, PHONE_H = 844;
  const scale = Math.min(1, (vp.h - 80) / PHONE_H);
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: T.dark
        ? 'radial-gradient(80% 60% at 50% 20%, #0B3D3A 0%, #06121F 60%, #000 100%)'
        : 'radial-gradient(80% 60% at 50% 20%, #E8ECF1 0%, #C5CFDB 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* side panel description */}
      <DesktopSidePanel/>

      <div style={{
        width: PHONE_W, height: PHONE_H,
        transform: `scale(${scale})`, transformOrigin: 'center center',
        borderRadius: 50, position: 'relative',
        background: T.bg, color: T.text,
        boxShadow: '0 0 0 12px #0B0B0F, 0 0 0 14px #2A2D33, 0 40px 100px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 35, borderRadius: 22, background: '#000', zIndex: 110,
        }}/>
        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 130, height: 4, borderRadius: 99, zIndex: 120,
          background: T.dark ? 'rgba(255,255,255,0.5)' : 'rgba(11,31,51,0.35)',
        }}/>
        {children}
      </div>
    </div>
  );
}

function DesktopSidePanel() {
  const { state, dispatch } = useStore();
  const T = useTheme();
  const tc = T.dark ? '#F8FAFC' : '#0B1F33';
  const tm = T.dark ? '#94A3B8' : '#51637A';
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 360,
      padding: '50px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      color: tc, pointerEvents: 'auto',
    }}>
      <div>
        <LogoBYC size={28} dark={T.dark}/>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: -1.4, lineHeight: 1.05, marginTop: 28, marginBottom: 12 }}>
          Invertí en carne real.<br/><span style={{ color: '#00C896' }}>Seguí la trazabilidad.</span>
        </h1>
        <p style={{ fontSize: 14, color: tm, lineHeight: 1.55, maxWidth: 280 }}>
          Demo navegable de la app móvil del Inversor. Ingresá con Face ID o "Probar demo" para explorar todos los flujos.
        </p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <DemoChip label="Login social + Face ID" />
          <DemoChip label="Onboarding interactivo · 7 slides" />
          <DemoChip label="KYC simulado con progreso real" />
          <DemoChip label="Simulador con sliders dinámicos" />
          <DemoChip label="Flujo de inversión en 7 pasos" />
          <DemoChip label="Pasaporte Digital con timeline" />
          <DemoChip label="AgroAI Coach contextual" />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <button onClick={() => dispatch({ type: 'THEME' })} style={{
            padding: '10px 14px', borderRadius: 99, border: 'none', cursor: 'pointer',
            background: T.dark ? 'rgba(248,250,252,0.1)' : 'rgba(11,31,51,0.08)',
            color: tc, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <I.layer style={{ width: 14, height: 14 }}/>Modo {T.dark ? 'claro' : 'oscuro'}
          </button>
          <button onClick={() => { dispatch({ type: 'DEMO_SEED' }); dispatch({ type: 'NAV', view: 'app' }); }} style={{
            padding: '10px 14px', borderRadius: 99, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #00A878, #00C896)', color: '#fff',
            fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <I.spark style={{ width: 14, height: 14 }}/>Saltar al portafolio demo
          </button>
        </div>
        <div style={{ fontSize: 10, color: tm, letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>POWERED BY</div>
        <PartnerLogos dark={T.dark} size={11}/>
      </div>
    </div>
  );
}

function DemoChip({ label }) {
  const T = useTheme();
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 99,
      background: T.dark ? 'rgba(0,200,150,0.1)' : 'rgba(0,168,120,0.08)',
      color: T.dark ? '#00C896' : '#00A878',
      border: `1px solid ${T.dark ? 'rgba(0,200,150,0.25)' : 'rgba(0,168,120,0.2)'}`,
      fontSize: 12, fontWeight: 600, width: 'fit-content',
    }}>
      <I.check style={{ width: 12, height: 12 }}/>{label}
    </div>
  );
}

// ============ ROUTER ============
const _screenRegistry = {};
function registerScreen(name, Comp) { _screenRegistry[name] = Comp; }
function ScreenByName({ name, params }) {
  const C = _screenRegistry[name];
  if (!C) return <div style={{ padding: 80, fontFamily: 'Inter' }}>Pantalla no implementada: {name}</div>;
  return <C {...(params || {})}/>;
}

// Tab roots
function CurrentTabRoot() {
  const { state } = useStore();
  const map = { home: 'home', opp: 'opportunities', mine: 'my-assets', map: 'map', ai: 'agroai' };
  return <ScreenByName name={map[state.tab]}/>;
}

// ============ STYLES ============
function GlobalAnims() {
  return (
    <style>{`
      @keyframes byc-toast-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes byc-fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes byc-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
      @keyframes byc-modal-in { from { opacity: 0; transform: translateY(-50%) scale(0.92); } to { opacity: 1; transform: translateY(-50%) scale(1); } }
      @keyframes byc-drawer-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      @keyframes byc-spin { to { transform: rotate(360deg); } }
      @keyframes byc-ai-pulse {
        0%, 100% { box-shadow: 0 10px 30px rgba(56,189,248,0.5), 0 0 0 4px rgba(56,189,248,0.15); }
        50% { box-shadow: 0 10px 30px rgba(56,189,248,0.5), 0 0 0 10px rgba(56,189,248,0.08); }
      }
      @keyframes byc-pulse-dot { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      input[type=range] { -webkit-appearance: none; appearance: none; }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: 22px; height: 22px; border-radius: 99px;
        background: #fff; cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,168,120,0.4), 0 0 0 2px #00A878;
      }
      input[type=range]::-moz-range-thumb {
        width: 22px; height: 22px; border-radius: 99px;
        background: #fff; cursor: pointer; border: 2px solid #00A878;
      }
    `}</style>
  );
}

Object.assign(window, {
  useTheme, ScreenWrap, StatusBar, Toast, Sheet, Modal, Drawer, AppTabBar, AIFab,
  ScreenHeader, PhoneShell, ScreenByName, CurrentTabRoot, GlobalAnims,
  registerScreen, registerSheet, registerModal,
});
