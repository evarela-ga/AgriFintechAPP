/* BeefYield Capital — Auth flow: Splash, Login, Onboarding, KYC, Risk profile */
/* eslint-disable */

// ============ SPLASH ============
function SplashScreen() {
  const nav = useNav();
  React.useEffect(() => {
    const t = setTimeout(() => nav.go('login'), 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #0B3D3A 0%, #071A2D 50%, #06121F 100%)', color: '#F8FAFC' }}>
      <StatusBar darkText/>
      <svg viewBox="0 0 390 844" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="splash-line2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00C896" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#00C896"/>
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M-20 620 Q 100 600, 195 640 T 410 600" stroke="url(#splash-line2)" strokeWidth="1.5" fill="none"/>
        <circle cx="80" cy="615" r="3" fill="#00C896"/>
        <circle cx="195" cy="635" r="3" fill="#00C896"/>
        <circle cx="310" cy="610" r="3" fill="#38BDF8"/>
      </svg>
      <div style={{ position: 'absolute', top: -100, right: -60, width: 280, height: 280, borderRadius: 999, background: 'radial-gradient(circle, rgba(0,200,150,0.4), transparent 70%)', filter: 'blur(20px)' }}/>
      <div style={{ position: 'absolute', bottom: 200, left: -80, width: 240, height: 240, borderRadius: 999, background: 'radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%)', filter: 'blur(30px)' }}/>

      <div style={{ position: 'relative', inset: 0, padding: '0 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 210, paddingBottom: 60 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <svg width="56" height="56" viewBox="0 0 32 32">
              <defs><linearGradient id="splash-byc-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00C896"/><stop offset="1" stopColor="#38BDF8"/></linearGradient></defs>
              <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#splash-byc-g)"/>
              <path d="M9 22V10h6c2.2 0 3.6 1.2 3.6 3 0 1.4-.8 2.4-2 2.7v.1c1.5.3 2.5 1.4 2.5 3 0 2-1.6 3.2-4 3.2H9zm3-7h2.2c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3H12V15zm0 4.7h2.5c1.1 0 1.8-.5 1.8-1.4s-.7-1.4-1.8-1.4H12v2.8z" fill="#06121F"/>
              <circle cx="23" cy="11" r="2.5" fill="#FFB020"/>
            </svg>
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 26, letterSpacing: -0.8, lineHeight: 1 }}>BeefYield</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500, fontSize: 18, color: '#94A3B8', letterSpacing: 4 }}>CAPITAL</div>
            </div>
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1.25, maxWidth: 300 }}>
            Ganadería real convertida en activos digitales trazables.
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', fontSize: 12, marginBottom: 22 }}>
            <div style={{ width: 10, height: 10, borderRadius: 99, border: '2px solid #00C896', borderTopColor: 'transparent', animation: 'byc-spin 1s linear infinite' }}/>
            <span className="mono">Cargando portafolio…</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.7)', letterSpacing: 1, marginBottom: 10, fontWeight: 600 }}>POWERED BY</div>
          <PartnerLogos dark/>
        </div>
      </div>
    </div>
  );
}

// ============ LOGIN ============
function LoginScreen() {
  const nav = useNav();
  const [showPw, setShowPw] = React.useState(false);
  const [email, setEmail] = React.useState('enzo@beefyield.io');
  const [pw, setPw] = React.useState('demoaccess');
  const toOnb = () => nav.go('onb');
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F7FAFC', color: '#0B1F33', overflow: 'auto' }}>
      <StatusBar/>
      <div style={{ padding: '70px 24px 40px' }}>
        <LogoBYC size={26}/>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: -1, marginTop: 28, marginBottom: 6 }}>Iniciar sesión</div>
        <div style={{ color: '#51637A', fontSize: 14, lineHeight: 1.5, marginBottom: 22 }}>
          Accedé a tu portafolio ganadero digital, seguí tus activos y consultá la trazabilidad en tiempo real.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          <button onClick={toOnb} style={socialBtnStyle}><I.google/>Continuar con Google</button>
          <button onClick={toOnb} style={{ ...socialBtnStyle, background: '#0B1F33', color: '#fff', border: '1px solid #0B1F33' }}><I.apple style={{ color: '#fff' }}/>Continuar con Apple</button>
          <button onClick={toOnb} style={socialBtnStyle}><I.ms/>Continuar con Microsoft</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#8497AE', fontSize: 11, fontWeight: 600, letterSpacing: 1, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#E4ECF3' }}/>O CON EMAIL<div style={{ flex: 1, height: 1, background: '#E4ECF3' }}/>
        </div>

        <FormField label="Email" value={email} onChange={setEmail} placeholder="tu@correo.com"/>
        <FormField label="Contraseña" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} placeholder="••••••••"
          trailing={<button onClick={() => setShowPw(s => !s)} style={{ border: 'none', background: 'none', color: '#8497AE', cursor: 'pointer', padding: 4 }}>{showPw ? <I.eyeOff/> : <I.eye/>}</button>}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#51637A', cursor: 'pointer' }}>
            <span style={{ width: 18, height: 18, borderRadius: 5, background: '#00A878', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><I.check style={{ width: 12, height: 12 }}/></span>
            Recordarme
          </label>
          <a style={{ fontSize: 13, color: '#0B1F33', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>Olvidé mi contraseña</a>
        </div>

        <Btn kind="emerald" full size="lg" icon={<I.finger/>} onClick={toOnb}>Ingresar con Face ID</Btn>
        <div style={{ height: 8 }}/>
        <Btn kind="ghost" full onClick={toOnb}>Ingresar con email</Btn>

        <div style={{ marginTop: 24, textAlign: 'center', color: '#51637A', fontSize: 13 }}>
          ¿Nuevo? <a onClick={toOnb} style={{ color: '#0B1F33', fontWeight: 700, cursor: 'pointer' }}>Crear cuenta</a>
        </div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <LoginDemoButton/>
        </div>

        <div style={{ marginTop: 32, paddingTop: 18, borderTop: '1px solid #EEF3F8', fontSize: 10, color: '#8497AE', lineHeight: 1.6, textAlign: 'center' }}>
          Al continuar aceptás los Términos y la Política de Privacidad.<br/>
          Las rentabilidades son proyectadas y no garantizadas.
        </div>
      </div>
    </div>
  );
}

const socialBtnStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  padding: '14px 16px', borderRadius: 14, background: '#fff',
  border: '1px solid #E4ECF3', cursor: 'pointer', width: '100%',
  fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#0B1F33',
};

function FormField({ label, value, onChange, type = 'text', placeholder, trailing }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#51637A', marginBottom: 6, letterSpacing: 0.2 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 14, border: '1px solid #E4ECF3', padding: '0 14px' }}>
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
          flex: 1, border: 'none', outline: 'none', padding: '14px 0',
          background: 'transparent', fontSize: 15, color: '#0B1F33',
          fontFamily: 'Inter, sans-serif',
        }}/>
        {trailing}
      </div>
    </div>
  );
}

// Need access to dispatch from LoginScreen demo button
// override LoginScreen to use proper hook
function LoginDemoButton() {
  const { dispatch } = useStore();
  const nav = useNav();
  return (
    <button onClick={() => { dispatch({ type: 'DEMO_SEED' }); nav.go('app'); }}
      style={{ background: 'linear-gradient(135deg, #FFB020, #F5A524)', color: '#06121F', border: 'none', padding: '12px 24px', borderRadius: 14, fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 8px 20px rgba(245,165,36,0.3)' }}>
      ⚡ Probar demo con portafolio cargado
    </button>
  );
}

// ============ ONBOARDING ============
const ONB_SLIDES = [
  { title: 'Ganadería real,\ninversión digital.', body: 'Participá en ciclos de engorde bovino gestionados por operadores profesionales.', tone: 'emerald', vis: 'cattle' },
  { title: 'Cada inversión\nestá respaldada.', body: 'Conocé el lote, el feedlot, la ubicación, la documentación y los eventos validados.', tone: 'cyan', vis: 'token' },
  { title: 'Seguí tus activos\nen tiempo real.', body: 'Consultá avance productivo, reportes, trazabilidad, sanidad, documentos y próximas liquidaciones.', tone: 'navy', vis: 'dashboard' },
  { title: 'Decidí con\ninformación.', body: 'Compará escenarios conservador, base y optimista antes de comprometer capital.', tone: 'gold', vis: 'sim' },
  { title: 'AgroAI te\nacompaña.', body: 'Tu coach IA te ayuda a entender rendimiento, riesgos, oportunidades y trazabilidad.', tone: 'cyan', vis: 'ai' },
  { title: 'Aprendé\ny desbloqueá.', body: 'Completá misiones educativas, ganá insignias y accedé a oportunidades destacadas.', tone: 'gold', vis: 'club' },
  { title: 'Tu portafolio\nganadero empieza acá.', body: 'Sumate a una nueva categoría de inversión alternativa: activos reales, trazables y digitales.', tone: 'emerald', vis: 'final' },
];

function OnboardingScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const i = state.onboardingIndex;
  const s = ONB_SLIDES[i];
  const isLast = i === ONB_SLIDES.length - 1;
  const next = () => isLast ? nav.go('kyc') : dispatch({ type: 'ONB_NEXT' });
  const prev = () => dispatch({ type: 'ONB_PREV' });
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#06121F', color: '#F8FAFC', overflow: 'hidden' }}>
      <StatusBar darkText/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 60% at 20% 10%, rgba(0,200,150,0.18), transparent 60%)' }}/>

      <div style={{ position: 'relative', height: '100%', padding: '70px 24px 100px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {ONB_SLIDES.map((_, k) => (
              <button key={k} onClick={() => dispatch({ type: 'ONB_SET', index: k })} style={{
                width: k === i ? 20 : 6, height: 6, borderRadius: 99,
                background: k <= i ? '#00C896' : 'rgba(255,255,255,0.18)',
                border: 'none', padding: 0, cursor: 'pointer', transition: 'width 0.3s ease',
              }}/>
            ))}
          </div>
          <button onClick={() => nav.go('kyc')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Omitir</button>
        </div>

        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'byc-fade-in 0.4s ease' }}>
          <OnbVisual kind={s.vis} tone={s.tone}/>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: -1.4, lineHeight: 1.05, marginBottom: 14, whiteSpace: 'pre-line', marginTop: 32 }}>{s.title}</div>
          <div style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.5 }}>{s.body}</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {i > 0 && <button onClick={prev} style={{ padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', color: '#F8FAFC', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Atrás</button>}
          <button onClick={next} style={{
            flex: 1, padding: '14px 18px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #00A878, #00C896)',
            color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {isLast ? 'Comenzar verificación' : 'Siguiente'}<I.arrowRight/>
          </button>
        </div>
      </div>
    </div>
  );
}

function OnbVisual({ kind, tone }) {
  const styles = { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 };
  if (kind === 'cattle') return (
    <div style={styles}>
      <div style={{ width: 200, height: 200, borderRadius: 28, background: 'linear-gradient(135deg, #064E3B, #00A878, #34D399)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,168,120,0.4)' }}>
        <I.cow style={{ width: 80, height: 80, color: '#06121F' }}/>
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(11,31,51,0.85)', borderRadius: 99, padding: '4px 8px', fontSize: 10, color: '#00D084', fontWeight: 800 }}>+18,4%</div>
      </div>
    </div>
  );
  if (kind === 'token') return (
    <div style={styles}>
      <div style={{ position: 'relative', width: 220, height: 200 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(135deg, #0C4A6E, #38BDF8)' }}/>
        <div style={{ position: 'absolute', top: 24, left: 24, right: 24, padding: 14, background: 'rgba(11,31,51,0.6)', backdropFilter: 'blur(10px)', borderRadius: 14, border: '1px solid rgba(56,189,248,0.3)' }}>
          <div style={{ fontSize: 9, color: '#38BDF8', fontWeight: 800, letterSpacing: 1 }}>TOKEN BYC</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#F8FAFC', marginTop: 4 }}>0x4f3a…9c2B</div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#CBD5E1' }}>Lote Angus 001</div>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24, display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, padding: '6px 10px', borderRadius: 99, background: 'rgba(0,168,120,0.3)', color: '#00D084', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}><I.shield style={{ width: 10, height: 10 }}/>Validado</div>
        </div>
      </div>
    </div>
  );
  if (kind === 'dashboard') return (
    <div style={styles}>
      <div style={{ width: 220, padding: 14, borderRadius: 24, background: 'linear-gradient(135deg, #071A2D, #102A43)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 10, color: '#94A3B8' }}>VALOR PORTAFOLIO</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginTop: 4 }} className="mono">USD 14.820</div>
        <Spark data={[100,105,103,108,112,116,118,122]} color="#00C896" w={180} h={36} fill/>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94A3B8', marginTop: 6 }}>
          <span>+12,7% <span style={{ color: '#00D084' }}>↑</span></span><span>4 lotes activos</span>
        </div>
      </div>
    </div>
  );
  if (kind === 'sim') return (
    <div style={styles}>
      <div style={{ width: 220, padding: 16, borderRadius: 24, background: 'linear-gradient(135deg, #78350F, #D9A441)', color: '#F8FAFC' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>SIMULADOR</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, marginTop: 4 }} className="mono">+USD 184</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
          {['Cons.', 'Base', 'Opt.'].map((s, i) => (
            <div key={s} style={{ flex: 1, padding: 6, textAlign: 'center', borderRadius: 8, background: i === 1 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)', fontSize: 10, fontWeight: 700 }}>{s}</div>
          ))}
        </div>
        <div style={{ marginTop: 8, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 99 }}>
          <div style={{ width: '55%', height: '100%', background: '#fff', borderRadius: 99 }}/>
        </div>
      </div>
    </div>
  );
  if (kind === 'ai') return (
    <div style={styles}>
      <div style={{ width: 220, padding: 14, borderRadius: 24, background: 'linear-gradient(135deg, #0C4A6E, #38BDF8)', color: '#F8FAFC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.bot/></div>
          <div style={{ fontSize: 11, fontWeight: 700 }}>AgroAI Coach</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.12)', padding: 10, borderRadius: 12, fontSize: 11, lineHeight: 1.4 }}>Tu rendimiento parcial es <b>+4,6%</b>. ¿Querés ver el detalle?</div>
      </div>
    </div>
  );
  if (kind === 'club') return (
    <div style={styles}>
      <div style={{ width: 220, padding: 16, borderRadius: 24, background: 'linear-gradient(135deg, #78350F, #FFB020)', color: '#F8FAFC' }}>
        <I.trophy style={{ width: 32, height: 32, marginBottom: 8 }}/>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800 }}>Inversor Ganadero</div>
        <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>Nivel 3 · 2.840 AgroPoints</div>
        <div style={{ marginTop: 10, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 99 }}>
          <div style={{ width: '68%', height: '100%', background: '#fff', borderRadius: 99 }}/>
        </div>
      </div>
    </div>
  );
  if (kind === 'final') return (
    <div style={styles}>
      <div style={{ width: 120, height: 120, borderRadius: 99, background: 'linear-gradient(135deg, #00A878, #00C896)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,168,120,0.5)' }}>
        <I.check style={{ width: 56, height: 56, color: '#fff', strokeWidth: 2.5 }}/>
      </div>
    </div>
  );
  return null;
}

// ============ KYC ============
const KYC_STEPS = [
  { key: 'dni', icon: I.file, title: 'Documento de identidad', sub: 'DNI frente y dorso' },
  { key: 'selfie', icon: I.eye, title: 'Selfie con prueba de vida', sub: 'Validación facial automática' },
  { key: 'address', icon: I.file, title: 'Comprobante de domicilio', sub: 'Servicio reciente o resumen bancario' },
  { key: 'funds', icon: I.coin, title: 'Origen de fondos', sub: 'Declaración simple' },
  { key: 'declaration', icon: I.badge, title: 'Declaración perfil inversor', sub: '3 preguntas regulatorias' },
];

function KycScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const done = KYC_STEPS.filter(s => state.kyc[s.key]).length;
  const all = done === KYC_STEPS.length;

  const finish = () => {
    dispatch({ type: 'KYC_DONE' });
    nav.go('risk');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F7FAFC', color: '#0B1F33', overflow: 'auto', paddingBottom: 100 }}>
      <StatusBar/>
      <div style={{ padding: '60px 20px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav.go('onb')} style={{ width: 36, height: 36, borderRadius: 12, background: '#fff', border: '1px solid #E4ECF3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F33', cursor: 'pointer' }}><I.chevL/></button>
          <div>
            <div style={{ fontSize: 11, color: '#8497AE', fontWeight: 600, letterSpacing: 0.8 }}>PASO {done + 1} DE 5</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>Verificación de identidad</div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <ProgressBar value={(done / KYC_STEPS.length) * 100} color="#00C896"/>
          <div style={{ marginTop: 6, fontSize: 11, color: '#8497AE', fontWeight: 600 }}>{done} de {KYC_STEPS.length} validados</div>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Card pad={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #00A878, #00C896)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <I.shield style={{ width: 22, height: 22 }}/>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Validación segura</div>
              <div style={{ fontSize: 12, color: '#51637A' }}>Tus datos están encriptados y nunca se comparten.</div>
            </div>
          </div>
        </Card>

        {KYC_STEPS.map(s => {
          const ok = state.kyc[s.key];
          return (
            <button key={s.key} onClick={() => !ok && dispatch({ type: 'KYC_STEP', key: s.key })} disabled={ok} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              background: '#fff', borderRadius: 16, border: ok ? '1px solid #DCFCE7' : '1px solid #EEF3F8',
              cursor: ok ? 'default' : 'pointer', width: '100%', textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: ok ? '#DCFCE7' : '#F2F6F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ok ? '#00A878' : '#51637A' }}>
                <s.icon/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1F33' }}>{s.title}</div>
                <div style={{ fontSize: 11, color: '#8497AE' }}>{s.sub}</div>
              </div>
              {ok ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 99, background: '#DCFCE7', color: '#00A878', fontSize: 11, fontWeight: 700 }}>
                  <I.check style={{ width: 12, height: 12 }}/>Validado
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 99, background: '#FEF3C7', color: '#A87514', fontSize: 11, fontWeight: 700 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: '#F5A524' }}/>Pendiente
                </div>
              )}
            </button>
          );
        })}

        <Card pad={14} style={{ background: '#F2F6F9', border: '1px solid #E4ECF3', boxShadow: 'none' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <I.shield style={{ width: 18, height: 18, color: '#00A878', flexShrink: 0, marginTop: 2 }}/>
            <div style={{ fontSize: 12, color: '#51637A', lineHeight: 1.5 }}>
              La verificación protege tu cuenta y permite operar de forma segura.
            </div>
          </div>
        </Card>
      </div>

      <div style={{ padding: '18px 20px' }}>
        <Btn kind={all ? 'emerald' : 'soft'} full size="lg" icon={<I.arrowRight/>} onClick={all ? finish : null} style={all ? null : { opacity: 0.5, pointerEvents: 'none' }}>
          {all ? 'Finalizar verificación' : `Completá ${KYC_STEPS.length - done} pasos`}
        </Btn>
      </div>
    </div>
  );
}

// ============ RISK PROFILE ============
const RISK_QUESTIONS = [
  { q: '¿Cuál es tu experiencia invirtiendo?', opts: ['Soy nuevo', 'Algo de experiencia', 'Inversor habitual', 'Profesional'] },
  { q: '¿Cómo reaccionarías ante una variación negativa del 10%?', opts: ['Retiro todo', 'Espero', 'Reviso y mantengo', 'Aprovecho para sumar'] },
  { q: '¿Qué plazo preferís?', opts: ['Lo más corto posible', 'Medio plazo (3-6m)', 'Largo plazo (>6m)', 'No tengo preferencia'] },
  { q: '¿Preferís estabilidad o mayor potencial de retorno?', opts: ['Estabilidad ante todo', 'Equilibrio', 'Más retorno con más riesgo', 'Máximo retorno'] },
];

function RiskProfileScreen() {
  const { dispatch } = useStore();
  const nav = useNav();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [done, setDone] = React.useState(false);

  const choose = (i) => {
    const next = [...answers, i];
    setAnswers(next);
    if (next.length === RISK_QUESTIONS.length) {
      setDone(true);
      const avg = next.reduce((a, b) => a + b, 0) / next.length;
      const profile = avg < 0.8 ? 'Conservador' : avg < 1.8 ? 'Moderado' : avg < 2.6 ? 'Dinámico' : 'Estratégico';
      dispatch({ type: 'SET_RISK', profile });
    } else {
      setStep(step + 1);
    }
  };

  if (done) {
    const { state } = useStore();
    return <RiskResult profile={state.riskProfile} onContinue={() => nav.go('app')}/>;
  }

  const q = RISK_QUESTIONS[step];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F7FAFC', color: '#0B1F33', overflow: 'auto', paddingBottom: 30 }}>
      <StatusBar/>
      <div style={{ padding: '60px 24px 12px' }}>
        <div style={{ fontSize: 11, color: '#8497AE', fontWeight: 700, letterSpacing: 0.8 }}>PERFIL DE RIESGO · PASO {step + 1} DE {RISK_QUESTIONS.length}</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
          {RISK_QUESTIONS.map((_, k) => (
            <div key={k} style={{ flex: 1, height: 4, borderRadius: 99, background: k <= step ? '#00C896' : '#E4ECF3' }}/>
          ))}
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 28 }}>{q.q}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.opts.map((opt, i) => (
            <button key={opt} onClick={() => choose(i)} style={{
              padding: '16px 18px', background: '#fff', border: '1px solid #E4ECF3',
              borderRadius: 16, textAlign: 'left', cursor: 'pointer',
              fontSize: 15, fontWeight: 600, color: '#0B1F33', fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.15s',
            }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#00C896'; e.currentTarget.style.background = '#F0FDF4'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4ECF3'; e.currentTarget.style.background = '#fff'; }}>
              <span>{opt}</span>
              <I.chevR style={{ color: '#8497AE' }}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskResult({ profile, onContinue }) {
  const recs = {
    Conservador: { color: '#00A878', text: 'Empezá con lotes de menor riesgo, alta trazabilidad y plazos previsibles.' },
    Moderado:    { color: '#00B8D9', text: 'Equilibrio entre rentabilidad y riesgo. Buen punto de partida para diversificar.' },
    Dinámico:    { color: '#F5A524', text: 'Mayor exposición a oportunidades premium y plazos extendidos.' },
    Estratégico: { color: '#7C3AED', text: 'Cartera diversificada con mix de exportación, premium y nichos productivos.' },
  };
  const r = recs[profile] || recs.Moderado;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F7FAFC', color: '#0B1F33', overflow: 'auto' }}>
      <StatusBar/>
      <div style={{ padding: '90px 24px 30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 84, height: 84, borderRadius: 24, background: 'linear-gradient(135deg, #00A878, #00C896)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,168,120,0.35)' }}>
            <I.check style={{ width: 42, height: 42, color: '#fff' }}/>
          </div>
          <div style={{ marginTop: 18, fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: -0.8, textAlign: 'center' }}>Tu perfil es</div>
          <div style={{ marginTop: 4, fontFamily: 'Manrope, sans-serif', fontSize: 36, fontWeight: 800, color: r.color, letterSpacing: -1.2 }}>{profile}</div>
        </div>

        <Card pad={18}>
          <div style={{ fontSize: 13, color: '#51637A', lineHeight: 1.55 }}>{r.text}</div>
        </Card>

        <Card pad={14} style={{ marginTop: 12, background: '#F2F6F9', boxShadow: 'none', border: '1px solid #E4ECF3' }}>
          <div style={{ fontSize: 11, color: '#8497AE', lineHeight: 1.5 }}>
            Podés cambiar tu perfil en cualquier momento desde Perfil → Perfil de riesgo. Las proyecciones son estimativas y no garantizadas.
          </div>
        </Card>

        <div style={{ marginTop: 24 }}>
          <Btn kind="emerald" full size="lg" icon={<I.arrowRight/>} onClick={onContinue}>Ir a mi dashboard</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SplashScreen, LoginScreen, OnboardingScreen, KycScreen, RiskProfileScreen, LoginDemoButton });
