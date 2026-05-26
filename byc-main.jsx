/* BeefYield Capital — Main app screens: Dashboard, Opportunities, Detail, Simulator, Invest */
/* eslint-disable */

// ============ HOME / DASHBOARD ============
function HomeScreen() {
  const { state, dispatch } = useStore();
  const T = useTheme();
  const nav = useNav();
  const p = usePortfolio();
  const unread = state.notifications.filter(n => !n.read).length;

  if (!p.hasInvestments) return <HomeEmpty/>;

  const dot = (v) => state.hideAmounts ? '•••••' : v;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText/>
      {/* HERO */}
      <div style={{
        padding: '60px 20px 20px',
        background: 'linear-gradient(180deg, #071A2D 0%, #0B3D3A 80%, #00A878 130%)',
        color: '#F8FAFC', position: 'relative', overflow: 'hidden',
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
      }}>
        <div style={{ position: 'absolute', top: -80, right: -50, width: 200, height: 200, borderRadius: 999, background: 'radial-gradient(circle, rgba(0,200,150,0.4), transparent 70%)', filter: 'blur(20px)' }}/>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative' }}>
          <button onClick={() => nav.drawer(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #FFB020, #F5A524)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0B1F33', fontSize: 14 }}>{state.user.avatar}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Hola,</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC' }}>{state.user.name}</div>
            </div>
            <Badge tone="emerald" style={{ marginLeft: 6 }}><I.check style={{ width: 10, height: 10 }}/>KYC</Badge>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => nav.push('notifications')} style={{ ...darkIconBtn, position: 'relative' }}>
              <I.bell/>
              {unread > 0 && <div style={{ position: 'absolute', top: 6, right: 7, width: 10, height: 10, borderRadius: 99, background: '#F5A524', border: '2px solid #0B1F33', fontSize: 7, color: '#06121F', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</div>}
            </button>
            <button onClick={() => dispatch({ type: 'HIDE_AMOUNTS' })} style={darkIconBtn}>{state.hideAmounts ? <I.eyeOff/> : <I.eye/>}</button>
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Valor estimado</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <MoneyBig value={dot(p.value.toLocaleString('es-AR'))} size={40} weight={800}/>
          <div style={{ background: 'rgba(0,200,150,0.18)', color: '#00D084', padding: '4px 8px', borderRadius: 99, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
            <I.trend style={{ width: 12, height: 12 }}/>{p.ret >= 0 ? '+' : ''}{p.ret.toFixed(1)}%
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, color: '#94A3B8', fontSize: 12 }}>
          <div>Invertido <span style={{ color: '#F8FAFC', fontWeight: 700 }} className="mono">{dot('USD ' + p.invested.toLocaleString('es-AR'))}</span></div>
          <div>·</div>
          <div>Proyectado <span style={{ color: '#00D084', fontWeight: 700 }} className="mono">+{p.projAvg.toFixed(1)}%</span></div>
        </div>

        <div style={{ marginTop: 14, marginBottom: 12 }}>
          <Spark data={[100,102,101,105,108,107,112,115,118,116,122,127]} color="#00C896" w={350} h={50}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Próxima liquidación</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC' }}>15 sep · Novillito 003</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Lotes activos</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC' }} className="mono">{p.active}</div>
          </div>
          <button onClick={() => nav.push('liquidations')} style={{ background: '#00C896', border: 'none', borderRadius: 99, width: 30, height: 30, color: '#06121F', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><I.arrowRight/></button>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { icon: <I.spark/>, label: 'Oportunidades', tone: '#00A878', tab: 'opp' },
          { icon: <I.calc/>, label: 'Simular', tone: '#2F80ED', action: () => nav.push('simulator', { oppId: 'angus-001' }) },
          { icon: <I.pin/>, label: 'Mapa', tone: '#38BDF8', tab: 'map' },
          { icon: <I.gift/>, label: 'Beneficios', tone: '#F5A524', action: () => nav.push('club') },
        ].map((q, i) => (
          <button key={i} onClick={() => q.tab ? nav.tabTo(q.tab) : q.action()} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: q.tone, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{q.icon}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{q.label}</span>
          </button>
        ))}
      </div>

      {/* AgroAI recommendation */}
      <div style={{ padding: '14px 20px 0' }}>
        <button onClick={() => nav.tabTo('ai')} style={{
          background: 'linear-gradient(135deg, #0B1F33 0%, #102A43 50%, #0C4A6E 100%)',
          borderRadius: 22, padding: 16, color: '#F8FAFC', position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(56,189,248,0.3)', width: '100%', textAlign: 'left', cursor: 'pointer',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: 999, background: 'radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, position: 'relative' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #2F80ED, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.bot/></div>
            <div>
              <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 700, letterSpacing: 0.5 }}>AGROAI · DETECTÓ OPORTUNIDAD</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Reinvertí tu próxima liquidación</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.5, position: 'relative' }}>
            Tenés una liquidación en <b style={{ color: '#F8FAFC' }}>18 días</b>. Hay un lote moderado con trazabilidad <b style={{ color: '#00D084' }}>94/100</b> abriendo fondeo.
          </div>
        </button>
      </div>

      {/* Health grid */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>Salud del portafolio</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { v: 92, l: 'Confianza', c: '#00A878' },
            { v: 91, l: 'Sanitario', c: '#2F80ED' },
            { v: 88, l: 'Bienestar', c: '#38BDF8' },
            { v: 87, l: 'Trazabilidad', c: '#7C3AED' },
            { v: 66, l: 'Progreso prod.', c: '#F5A524' },
            { v: 75, l: 'Riesgo (inv.)', c: T.dark ? '#94A3B8' : '#0B1F33' },
          ].map((m, i) => (
            <div key={i} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.line}`, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <ProgressRing value={m.v} size={52} stroke={5} color={m.c} track={T.dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,51,0.08)'}>
                <span style={{ fontSize: 13, fontWeight: 800, color: T.text, fontFamily: 'Manrope, sans-serif' }}>{m.v}</span>
              </ProgressRing>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: T.text2, textAlign: 'center' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>Continuar donde dejaste</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', paddingLeft: 20, paddingBottom: 4 }}>
          <ContinueCard onClick={() => nav.push('report-detail', { id: 'r1' })} kind="report" title="Reporte mensual" sub="Agosto · Lote Angus 001" tone="emerald"/>
          <ContinueCard onClick={() => nav.push('simulator', { oppId: 'angus-001', amount: 1500 })} kind="sim" title="Simulación guardada" sub="USD 1.500 · 150 días" tone="cyan"/>
          <ContinueCard onClick={() => nav.push('missions')} kind="mission" title="Misión pendiente" sub="Entender trazabilidad" tone="gold"/>
          <div style={{ width: 12, flexShrink: 0 }}/>
        </div>
      </div>
    </div>
  );
}

const darkIconBtn = {
  width: 36, height: 36, borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#F8FAFC', cursor: 'pointer',
};

function ContinueCard({ kind, title, sub, tone, onClick }) {
  const T = useTheme();
  const tones = {
    emerald: { c: '#00A878', icon: <I.file/> },
    cyan: { c: '#2F80ED', icon: <I.calc/> },
    gold: { c: '#F5A524', icon: <I.trophy/> },
  }[tone];
  return (
    <button onClick={onClick} style={{ flexShrink: 0, width: 200, background: T.card, borderRadius: 16, border: `1px solid ${T.line}`, padding: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: tones.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{tones.icon}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{title}</div>
      <div style={{ fontSize: 11, color: T.text2, marginTop: 2 }}>{sub}</div>
    </button>
  );
}

// ============ HOME EMPTY ============
function HomeEmpty() {
  const { state, dispatch } = useStore();
  const T = useTheme();
  const nav = useNav();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText/>
      <div style={{ padding: '60px 20px 24px', background: 'linear-gradient(180deg, #071A2D 0%, #0B3D3A 100%)', color: '#F8FAFC', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <button onClick={() => nav.drawer(true)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #FFB020, #F5A524)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#06121F' }}>{state.user.avatar}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>Bienvenido,</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{state.user.name}</div>
            </div>
          </button>
          <button onClick={() => nav.push('notifications')} style={darkIconBtn}><I.bell/></button>
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>VALOR DEL PORTAFOLIO</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 42, fontWeight: 800, letterSpacing: -1.5 }}>
          <span style={{ fontSize: 22, opacity: 0.6 }}>USD</span> 0,00
        </div>
        <div style={{ fontSize: 12, color: '#94A3B8' }}>Aún no comenzaste a invertir.</div>
      </div>

      <div style={{ padding: '28px 20px', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, margin: '0 auto 16px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'radial-gradient(circle, rgba(0,200,150,0.18), transparent 70%)' }}/>
          <div style={{ position: 'absolute', inset: 18, borderRadius: 99, background: 'linear-gradient(135deg, #064E3B, #00A878)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 20px 40px rgba(0,168,120,0.3)' }}>
            <I.cow style={{ width: 38, height: 38 }}/>
          </div>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, marginBottom: 8 }}>
          Tu portafolio empieza acá.
        </div>
        <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.5, maxWidth: 300, margin: '0 auto 24px' }}>
          Explorá oportunidades, usá el simulador y aprendé cómo funciona la inversión ganadera antes de comenzar.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <Btn kind="emerald" full size="lg" icon={<I.spark/>} onClick={() => nav.tabTo('opp')}>Ver oportunidades</Btn>
          <Btn kind="ghost" full icon={<I.calc/>} onClick={() => nav.push('simulator', { oppId: 'angus-001' })}>Probar simulador</Btn>
          <button onClick={() => dispatch({ type: 'DEMO_SEED' })} style={{ background: 'none', border: 'none', color: T.text2, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
            ⚡ Cargar portafolio demo
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ OPPORTUNITIES ============
function OpportunitiesScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const [filter, setFilter] = React.useState('Todos');
  const [q, setQ] = React.useState('');
  const filters = [
    { id: 'Todos', match: () => true },
    { id: 'Bajo riesgo', match: o => o.riskN >= 85 },
    { id: 'Exportación', match: o => o.exportReady },
    { id: 'Alta trazab.', match: o => o.trace >= 85 },
    { id: 'Ticket bajo', match: o => o.ticket <= 250 },
    { id: 'Premium', match: o => o.ret >= 18 },
    { id: 'Próx. a cerrar', match: o => o.funding >= 80 },
  ];
  const list = state.opportunities.filter(o => filters.find(f => f.id === filter)?.match(o) && (!q || o.name.toLowerCase().includes(q.toLowerCase()) || o.location.toLowerCase().includes(q.toLowerCase())));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <div style={{ padding: '58px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, color: T.text3, fontWeight: 600 }}>{state.opportunities.length} lotes abiertos · {list.length} resultados</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>Oportunidades</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.card, borderRadius: 14, padding: '10px 14px', border: `1px solid ${T.line2}`, marginTop: 12 }}>
          <I.search style={{ color: T.text3 }}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar lote, feedlot, provincia…" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif', background: 'transparent', color: T.text }}/>
        </div>
      </div>
      <div style={{ padding: '6px 0 14px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 20px' }}>
          {filters.map(f => <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.id}</Chip>)}
        </div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: T.text2 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Sin resultados para este filtro</div>
          </div>
        ) : (
          list.map(o => <OpportunityCard key={o.id} o={o} onClick={() => nav.push('opportunity', { id: o.id })}/>)
        )}
      </div>
    </div>
  );
}

function OpportunityCard({ o, onClick }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{ background: T.card, borderRadius: 22, border: `1px solid ${T.line}`, overflow: 'hidden', boxShadow: T.dark ? 'none' : '0 2px 6px rgba(11,31,51,0.04), 0 12px 28px rgba(11,31,51,0.05)', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: T.text, padding: 0 }}>
      <ImagePh tone={o.tone} label={`${o.name.toLowerCase()} · ${o.feedlot.toLowerCase()}`} height={120} style={{ borderRadius: 0 }}/>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {o.tokenized && <Badge tone="violet"><I.coin style={{ width: 10, height: 10 }}/>Tokenizado</Badge>}
          {o.traceable && <Badge tone="emerald"><I.shield style={{ width: 10, height: 10 }}/>Trazable</Badge>}
          {o.exportReady && <Badge tone="cyan"><I.globe style={{ width: 10, height: 10 }}/>Export-ready</Badge>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, letterSpacing: -0.4 }}>{o.name}</div>
            <div style={{ fontSize: 12, color: T.text3, display: 'flex', alignItems: 'center', gap: 4 }}><I.pin style={{ width: 11, height: 11 }}/>{o.location}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#00A878', letterSpacing: -0.5 }}>+{o.ret}%</div>
            <div style={{ fontSize: 10, color: T.text3 }}>Proyectado · {o.days}d</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '12px 0', borderTop: `1px dashed ${T.line2}`, borderBottom: `1px dashed ${T.line2}`, margin: '12px 0' }}>
          <Stat label="Ticket" value={`USD ${o.ticket}`}/>
          <Stat label="Riesgo" value={<span style={{ color: riskColor(o.riskN) }}>{o.risk}</span>}/>
          <Stat label="Confianza" value={`${o.conf}/100`} tone="#00A878"/>
        </div>
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.text2, marginBottom: 5, fontWeight: 600 }}>
            <span>Fondeo</span>
            <span className="mono" style={{ color: T.text }}>{o.funding}% · USD {(o.target * o.funding / 100 / 1000).toFixed(0)}k de {(o.target / 1000).toFixed(0)}k</span>
          </div>
          <ProgressBar value={o.funding} color="#00C896" track={T.dark ? '#16324A' : '#E4ECF3'}/>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.text2, fontSize: 13, fontWeight: 600 }}>
          <span>Ver detalle</span>
          <I.arrowRight/>
        </div>
      </div>
    </button>
  );
}

// ============ OPPORTUNITY DETAIL ============
function OpportunityDetailScreen({ id }) {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const o = state.opportunities.find(x => x.id === id) || state.opportunities[0];
  const [tab, setTab] = React.useState('Resumen');

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ position: 'relative', height: 280 }}>
        <ImagePh tone={o.tone} label={`${o.name.toLowerCase()} · ${o.feedlot.toLowerCase()}`} height={280} style={{ borderRadius: 0 }}/>
        <StatusBar darkText/>
        <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => nav.pop()} style={glassBtn}><I.chevL/></button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => nav.toast('Oportunidad guardada', 'success')} style={glassBtn}><I.heart/></button>
            <button onClick={() => nav.toast('Enlace copiado', 'success')} style={glassBtn}><I.share/></button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, background: 'linear-gradient(transparent, rgba(6,18,31,0.9))', color: '#F8FAFC' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {o.traceable && <Badge tone="emerald" soft={false}><I.shield style={{ width: 10, height: 10 }}/>Trazabilidad validada</Badge>}
            {o.tokenized && <Badge tone="cyan" soft={false}>Tokenizable</Badge>}
            {o.exportReady && <Badge tone="gold" soft={false}>Export-ready</Badge>}
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, letterSpacing: -0.8 }}>{o.name}</div>
          <div style={{ fontSize: 13, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 5 }}><I.pin style={{ width: 13, height: 13 }}/>{o.location} · {o.feedlot}</div>
        </div>
      </div>

      <div style={{ padding: 20, marginTop: -22, position: 'relative' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>RENTABILIDAD PROYECTADA</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 36, fontWeight: 800, color: '#00A878', letterSpacing: -1.5 }}>+{o.ret}%</div>
              <div style={{ fontSize: 11, color: T.text3 }}>Escenario base · No garantizado</div>
            </div>
            <ProgressRing value={o.conf} size={64} stroke={6} color="#00A878" track={T.dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,51,0.08)'}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: 'Manrope, sans-serif' }}>{o.conf}</div>
                <div style={{ fontSize: 8, color: T.text3 }}>CONFIANZA</div>
              </div>
            </ProgressRing>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '12px 0', borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
            <Stat label="Plazo" value={`${o.days} días`}/>
            <Stat label="Ticket mín." value={`USD ${o.ticket}`}/>
            <Stat label="Riesgo" value={<span style={{ color: riskColor(o.riskN) }}>{o.risk}</span>}/>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: T.text2, fontWeight: 600 }}>Fondeo</span>
              <span className="mono" style={{ fontWeight: 700 }}>USD {(o.target * o.funding / 100).toLocaleString('es-AR')} / {o.target.toLocaleString('es-AR')} · {o.funding}%</span>
            </div>
            <ProgressBar value={o.funding} color="#00C896" height={8} track={T.dark ? '#16324A' : '#E4ECF3'}/>
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {['Resumen', 'Simulación', 'Trazabilidad', 'Riesgos', 'Documentos', 'Mapa', 'AgroAI'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 12px', borderRadius: 99, border: 'none',
            background: tab === t ? T.text : 'transparent',
            color: tab === t ? T.bg : T.text2,
            fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        <OppTabContent tab={tab} o={o}/>
      </div>

      {/* sticky CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 28px', background: `linear-gradient(transparent, ${T.bg} 30%)`, display: 'flex', gap: 10, zIndex: 30 }}>
        <Btn kind="ghost" icon={<I.calc/>} onClick={() => nav.push('simulator', { oppId: o.id })}>Simular</Btn>
        <Btn kind="emerald" full size="lg" icon={<I.arrowRight/>} onClick={() => nav.push('invest', { oppId: o.id })}>Invertir desde USD {o.ticket}</Btn>
      </div>
    </div>
  );
}

function OppTabContent({ tab, o }) {
  const T = useTheme();
  if (tab === 'Resumen') return (
    <>
      <Card pad={16} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5, marginBottom: 8 }}>RESUMEN EJECUTIVO</div>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: T.text }}>
          Financiamiento del ciclo de engorde de <b>{o.animals} animales</b>, peso inicial ~{o.weightIn} kg, peso objetivo {o.weightTarget} kg.
          Operado por <b>{o.feedlot}</b>. {o.exportReady ? <>Estrategia de salida: <b>exportación</b> vía frigorífico asociado.</> : 'Estrategia: mercado interno premium.'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <KVRow k="Animales" v={`${o.animals}`}/>
          <KVRow k="Peso inicial" v={`~${o.weightIn} kg`}/>
          <KVRow k="Peso objetivo" v={`~${o.weightTarget} kg`}/>
          <KVRow k="GDP esperado" v={`${o.gdp} kg/día`}/>
          <KVRow k="Ingreso" v="18 ago 2025"/>
          <KVRow k="Cierre est." v={`+${o.days}d`}/>
        </div>
      </Card>
      <Card pad={16} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5, marginBottom: 10 }}>ÍNDICES OPERATIVOS</div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'space-between' }}>
          <IxCol icon={<I.heart/>} v={o.sanit} l="Sanitario" c="#00A878"/>
          <IxCol icon={<I.cow/>} v={o.well} l="Bienestar" c="#38BDF8"/>
          <IxCol icon={<I.shield/>} v={o.conf} l="Confianza" c="#00A878"/>
          <IxCol icon={<I.layer/>} v={o.trace} l="Trazab." c="#7C3AED"/>
        </div>
      </Card>
    </>
  );
  if (tab === 'Riesgos') return (
    <Card pad={16} style={{ background: T.dark ? '#102A43' : 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)', border: T.dark ? '1px solid #16324A' : '1px solid #FCD34D' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.dark ? '#FCD34D' : '#A87514', letterSpacing: 0.5, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <I.shield style={{ width: 14, height: 14 }}/>RIESGOS PRINCIPALES
      </div>
      {['Productivo (clima, conversión alimenticia)', 'Sanitario', 'Comercial / precio de hacienda', 'Tipo de cambio', 'Logístico exportación', 'Regulatorio'].map(r => (
        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.text2, padding: '6px 0' }}>
          <div style={{ width: 5, height: 5, borderRadius: 99, background: '#F5A524' }}/>{r}
        </div>
      ))}
      <div style={{ marginTop: 10, fontSize: 11, color: T.text3, lineHeight: 1.5 }}>
        Las proyecciones son estimativas y pueden variar según condiciones productivas, sanitarias, comerciales y regulatorias.
      </div>
    </Card>
  );
  if (tab === 'Trazabilidad') return (
    <Card pad={16}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, marginBottom: 10 }}>EVENTOS VALIDADOS</div>
      {['Origen del animal · La Pampa', 'Compra y transporte', 'Ingreso al feedlot', 'Pesada inicial', 'Plan alimenticio aprobado'].map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? `1px solid ${T.line}` : 'none' }}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: '#00C896', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.check style={{ width: 12, height: 12 }}/></div>
          <div style={{ fontSize: 13, color: T.text }}>{e}</div>
        </div>
      ))}
    </Card>
  );
  if (tab === 'Documentos') return (
    <Card pad={12}>
      {['Términos de inversión', 'Resumen del lote', 'Política de tokenización', 'Auditoría operativa', 'Comisiones'].map((d, i) => (
        <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 4 ? `1px solid ${T.line}` : 'none' }}>
          <I.file style={{ color: T.text3 }}/>
          <div style={{ flex: 1, fontSize: 13, color: T.text }}>{d}</div>
          <I.download style={{ color: T.text3 }}/>
        </div>
      ))}
    </Card>
  );
  if (tab === 'Mapa') return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 240, background: 'linear-gradient(135deg, #134E4A, #0F3055)' }}>
        <svg viewBox="0 0 350 240" style={{ width: '100%', height: '100%' }}>
          <path d="M40 100 Q 150 80 220 120 T 340 140" fill="rgba(0,168,120,0.2)" stroke="rgba(0,200,150,0.4)" strokeWidth="0.5"/>
          <circle cx="120" cy="100" r="20" fill="rgba(0,168,120,0.3)"/>
          <circle cx="120" cy="100" r="12" fill="#00C896"/>
          <text x="120" y="104" fontSize="10" textAnchor="middle" fill="#06121F" fontWeight="800">F</text>
          <text x="120" y="130" fontSize="9" textAnchor="middle" fill="#fff" fontWeight="700">Feedlot</text>
        </svg>
      </div>
      <div style={{ padding: 14, fontSize: 13, color: T.text2 }}>{o.feedlot} · {o.location}</div>
    </Card>
  );
  if (tab === 'AgroAI') return (
    <Card pad={14} style={{ background: T.dark ? '#0C4A6E' : 'linear-gradient(135deg, rgba(56,189,248,0.08), #fff)', border: '1px solid rgba(56,189,248,0.3)' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #2F80ED, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><I.bot/></div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>
          <b>{o.name}</b> es un lote con riesgo <b>{o.risk}</b> y confianza <b>{o.conf}/100</b>. La trazabilidad es <b>{o.trace}/100</b>. {o.exportReady ? 'Apto para exportación.' : 'Destinado a mercado interno premium.'}
        </div>
      </div>
    </Card>
  );
  return <Card pad={16}><div style={{ fontSize: 13, color: T.text2 }}>Próximamente.</div></Card>;
}

const glassBtn = {
  width: 38, height: 38, borderRadius: 12,
  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.3)', color: '#0B1F33',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};

function KVRow({ k, v }) {
  const T = useTheme();
  return (
    <div>
      <div style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
    </div>
  );
}

function IxCol({ icon, v, l, c }) {
  const T = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: c + '22', color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, color: T.text }}>{v}</div>
      <div style={{ fontSize: 10, color: T.text3 }}>{l}</div>
    </div>
  );
}

Object.assign(window, { HomeScreen, HomeEmpty, OpportunitiesScreen, OpportunityDetailScreen, OpportunityCard });
