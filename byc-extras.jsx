/* BeefYield Capital — AgroAI, Reports, Liquidations, Club, Missions, Profile, Notifications + extras */
/* eslint-disable */

// ============ AGROAI CHAT ============
const AI_PROMPTS = [
  '¿Cómo está mi inversión?',
  '¿Cuál es mi rendimiento proyectado?',
  'Explicame este lote en palabras simples.',
  '¿Qué riesgos tiene mi portafolio?',
  'Compará Angus 001 con Brangus 002.',
  '¿Conviene reinvertir?',
  '¿Dónde están mis activos?',
  'Generame un resumen para mi contador.',
];

function AiScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.aiHistory]);

  const send = (text) => {
    if (!text.trim()) return;
    dispatch({ type: 'AI_MSG', msg: { role: 'user', text } });
    setInput('');
    setTimeout(() => {
      dispatch({ type: 'AI_MSG', msg: aiReply(text, state) });
    }, 600);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#06121F', color: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <StatusBar darkText/>
      <div style={{ background: 'radial-gradient(80% 50% at 50% 0%, rgba(56,189,248,0.12), transparent 60%)', position: 'absolute', inset: 0, pointerEvents: 'none' }}/>

      <div style={{ padding: '60px 16px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #16324A', position: 'relative', background: '#06121F' }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg, #2F80ED, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><I.bot/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, color: '#F8FAFC' }}>AgroAI Coach</div>
          <div style={{ fontSize: 11, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: '#00C896' }}/>
            En línea · contexto: tu portafolio
          </div>
        </div>
        <button style={darkIconBtn}><I.mic/></button>
      </div>

      <div ref={scrollRef} style={{ flex: 1, padding: '14px 16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {state.aiHistory.map((m, i) => <ChatMsg key={i} m={m}/>)}
      </div>

      {/* prompts row */}
      <div style={{ padding: '4px 16px 8px', overflowX: 'auto', position: 'relative', background: '#06121F', borderTop: '1px solid #16324A' }}>
        <div style={{ display: 'flex', gap: 6, paddingTop: 6 }}>
          {AI_PROMPTS.slice(0, 5).map(p => (
            <button key={p} onClick={() => send(p)} style={{ flexShrink: 0, padding: '7px 12px', borderRadius: 99, background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', color: '#38BDF8', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
              <I.spark style={{ width: 11, height: 11, display: 'inline', marginRight: 4, verticalAlign: -2 }}/>{p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 16px 100px', background: '#0B1F33', borderTop: '1px solid #16324A', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 22, padding: '6px 6px 6px 16px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)} placeholder="Escribí tu pregunta…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: '#F8FAFC', fontSize: 14, fontFamily: 'Inter, sans-serif' }}/>
          <button onClick={() => send(input)} style={{ width: 32, height: 32, borderRadius: 99, background: 'linear-gradient(135deg, #2F80ED, #38BDF8)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><I.send/></button>
        </div>
      </div>
    </div>
  );
}

function ChatMsg({ m }) {
  const isUser = m.role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', maxWidth: '100%' }}>
      <div style={{
        maxWidth: '85%',
        background: isUser ? 'linear-gradient(135deg, #2F80ED, #38BDF8)' : 'rgba(255,255,255,0.04)',
        color: isUser ? '#06121F' : '#F8FAFC',
        padding: '11px 14px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
        fontSize: 13, lineHeight: 1.5,
      }}>
        {m.card ? <ChatCard card={m.card}/> : null}
        {m.text}
        {m.actions && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {m.actions.map((a, i) => (
              <span key={i} style={{ padding: '5px 10px', borderRadius: 99, background: 'rgba(56,189,248,0.18)', color: '#38BDF8', fontSize: 11, fontWeight: 600, border: '1px solid rgba(56,189,248,0.3)' }}>{a}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatCard({ card }) {
  if (card.kind === 'asset') {
    return (
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 12, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Rendimiento parcial</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: '#00D084' }}>+{card.partial}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Proyección base</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: '#F8FAFC' }}>+{card.ret}%</div>
          </div>
        </div>
        <Spark data={[100,101,102.5,103,104.8,105.2,106,106.4]} color="#00C896" w={240} h={32}/>
      </div>
    );
  }
  if (card.kind === 'compare') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        {card.items.map((l, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 10, border: `1px solid ${l.c}40` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#F8FAFC' }}>{l.n}</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800, color: l.c, marginTop: 2 }}>+{l.r}%</div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{l.risk}</div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>Conf. {l.conf}</div>
          </div>
        ))}
      </div>
    );
  }
  if (card.kind === 'warn') {
    return (
      <div style={{ padding: 10, background: 'rgba(245,165,36,0.1)', borderRadius: 10, fontSize: 11, color: '#FCD34D', borderLeft: '2px solid #F5A524', marginBottom: 8 }}>
        <b>Aviso:</b> {card.text}
      </div>
    );
  }
  return null;
}

function aiReply(prompt, state) {
  const p = prompt.toLowerCase();
  const assets = state.assets;
  const port = assets.reduce((s, a) => ({ inv: s.inv + a.invested, val: s.val + a.value }), { inv: 0, val: 0 });
  const ret = port.inv ? ((port.val - port.inv) / port.inv * 100).toFixed(1) : 0;

  if (p.includes('inversión') || p.includes('rendimiento') || p.includes('cómo está')) {
    if (assets.length === 0) return { role: 'ai', text: 'Todavía no tenés inversiones. Cuando hagas tu primera, te muestro evolución y proyecciones acá.' };
    const top = assets[0];
    return {
      role: 'ai',
      card: { kind: 'asset', partial: top.partial, ret: top.ret },
      text: `Tu portafolio rinde **+${ret}%** acumulado. Tu lote ${top.name} va por encima de la curva base con parcial +${top.partial}%.`,
      actions: ['Ver pasaporte', 'Reporte sanitario', 'Simular reinversión'],
    };
  }
  if (p.includes('comparar') || p.includes('compará') || p.includes('compara')) {
    return {
      role: 'ai',
      card: { kind: 'compare', items: [
        { n: 'Angus 001', r: 18.4, risk: 'Moderado', conf: 92, c: '#00C896' },
        { n: 'Brangus 002', r: 21.2, risk: 'Medio/Alto', conf: 89, c: '#38BDF8' },
      ]},
      text: 'Comparativa rápida: mayor proyección viene con más riesgo.',
    };
  }
  if (p.includes('riesgo')) {
    return {
      role: 'ai',
      card: { kind: 'warn', text: 'Las rentabilidades son proyectadas y pueden variar según condiciones productivas, sanitarias y comerciales.' },
      text: 'Tu portafolio tiene riesgo promedio moderado. Los principales son: productivo (clima/conversión), sanitario, comercial (precio de hacienda) y tipo de cambio.',
    };
  }
  if (p.includes('reinvert')) {
    return {
      role: 'ai',
      text: 'Tu próxima liquidación es Lote Novillito 003 en 14 días. Podés reinvertir parcialmente en un lote moderado con trazabilidad 94/100. ¿Querés que abramos el simulador?',
      actions: ['Simular reinversión', 'Ver oportunidad'],
    };
  }
  if (p.includes('dónde') || p.includes('donde') || p.includes('mapa')) {
    return { role: 'ai', text: 'Tus activos están en Córdoba (Villa María, Río Cuarto), Santa Fe (Rafaela) y Buenos Aires (Pergamino). Abrí el mapa para ver la ruta de cada lote.', actions: ['Abrir mapa'] };
  }
  if (p.includes('contador') || p.includes('resumen')) {
    return { role: 'ai', text: `Te genero un PDF con: capital invertido (USD ${port.inv.toLocaleString('es-AR')}), valor actual (USD ${port.val.toLocaleString('es-AR')}), rentabilidad acumulada (+${ret}%), detalle por lote y comisiones. ¿Lo descargo?`, actions: ['Descargar PDF'] };
  }
  if (p.includes('lote') || p.includes('palabras simples')) {
    return { role: 'ai', text: 'Un lote es un grupo de animales que financiamos juntos. Vos comprás una participación (en tokens BYC). El feedlot los engorda, los vende y al cierre del ciclo recibís tu parte del resultado. Todo el proceso queda registrado con hashes verificables.' };
  }
  return { role: 'ai', text: 'Interesante. Como demo, tengo respuestas precargadas para preguntas sobre rendimiento, riesgos, comparaciones y reinversión. Probá uno de los prompts sugeridos abajo.' };
}

// ============ REPORTS ============
function ReportsScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const [filter, setFilter] = React.useState('Todos');
  const filters = ['Todos', 'Mensuales', 'Sanitario', 'Trazabilidad', 'Financieros', 'Liquidación'];
  const list = state.reports.filter(r => filter === 'Todos' || r.type === filter.replace('Mensuales', 'Mensual').replace('Financieros', 'Financiero'));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Reportes" subtitle={`${state.reports.filter(r => r.isNew).length} NUEVOS · ${state.reports.length} TOTALES`}/>
      <div style={{ padding: '0 0 14px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 20px' }}>
          {filters.map(c => <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Chip>)}
        </div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(r => <ReportRow key={r.id} r={r} onClick={() => nav.push('report-detail', { id: r.id })}/>)}
      </div>
    </div>
  );
}

function ReportRow({ r, onClick }) {
  const T = useTheme();
  const tones = { emerald: '#00A878', cyan: '#0284C7', violet: '#7C3AED', gold: '#A87514', navy: T.text };
  return (
    <button onClick={onClick} style={{ background: T.card, borderRadius: 16, padding: 14, display: 'flex', gap: 12, border: `1px solid ${T.line}`, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif', color: T.text }}>
      <div style={{ width: 44, height: 56, borderRadius: 8, background: tones[r.tone] + '20', color: tones[r.tone], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <I.file style={{ width: 22, height: 22 }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{r.title}</div>
          {r.isNew && <div style={{ width: 6, height: 6, borderRadius: 99, background: '#EF4444' }}/>}
        </div>
        <div style={{ fontSize: 12, color: T.text3 }}>{r.lot}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <Badge tone={r.tone === 'navy' ? 'navy' : r.tone}>{r.type}</Badge>
          <div className="mono" style={{ fontSize: 11, color: T.text3 }}>{r.date}</div>
        </div>
      </div>
    </button>
  );
}

function ReportDetailScreen({ id }) {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const r = state.reports.find(x => x.id === id);
  if (!r) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto', paddingBottom: 40 }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title={r.title} subtitle={r.type.toUpperCase()}/>
      <div style={{ padding: '0 20px' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{r.lot}</div>
              <div style={{ fontSize: 11, color: T.text3 }} className="mono">{r.date}</div>
            </div>
            <Badge tone={r.tone === 'navy' ? 'navy' : r.tone} soft={false}>{r.type}</Badge>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: T.text2 }}>{r.body}</div>
        </Card>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Btn kind="primary" full icon={<I.download/>} onClick={() => nav.toast('PDF descargado', 'success')}>Descargar PDF</Btn>
          <Btn kind="ghost" icon={<I.share/>} onClick={() => nav.toast('Enlace copiado', 'success')}>Compartir</Btn>
        </div>
        <div style={{ marginTop: 14 }}>
          <Btn kind="soft" full icon={<I.bot/>} onClick={() => { nav.popTo(); nav.tabTo('ai'); }}>Preguntar a AgroAI</Btn>
        </div>
      </div>
    </div>
  );
}

// ============ LIQUIDATIONS ============
function LiquidationsScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const pre = state.assets.find(a => a.status === 'Pre-liquidación');
  const done = state.assets.filter(a => a.status === 'Liquidado');

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Liquidaciones"/>

      <div style={{ padding: '0 20px 14px' }}>
        <Card pad={16} style={{ background: 'linear-gradient(135deg, #064E3B, #00A878)', color: '#F8FAFC', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.8)', fontWeight: 600 }}>TOTAL LIQUIDADO 2025</div>
              <MoneyBig value={done.reduce((s, a) => s + a.value, 0).toLocaleString('es-AR') || '0'} size={30}/>
              <div style={{ fontSize: 12, color: 'rgba(248,250,252,0.85)', marginTop: 2 }}>{done.length} ciclo{done.length !== 1 ? 's' : ''} cerrado{done.length !== 1 ? 's' : ''}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.8)', fontWeight: 600 }}>RENT. REAL</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800 }}>+27,5%</div>
              <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.85)' }}>vs proy. +14,6%</div>
            </div>
          </div>
        </Card>
      </div>

      {pre && (
        <div style={{ padding: '0 20px 8px' }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Próxima</div>
          <Card pad={14}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{pre.name}</div>
                  <Badge tone="cyan">en {pre.daysLeft} días</Badge>
                </div>
                <div style={{ fontSize: 12, color: T.text3, marginTop: 2 }}>{pre.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 16, fontWeight: 800 }}>USD {pre.value.toLocaleString('es-AR')}</div>
                <div style={{ fontSize: 11, color: '#00A878', fontWeight: 700 }}>+{pre.partial}% est.</div>
              </div>
            </div>
            <ProgressBar value={pre.progress} color="#38BDF8" height={5} track={T.dark ? '#16324A' : '#E4ECF3'}/>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Btn kind="ghost" size="sm" style={{ flex: 1 }} icon={<I.calc/>} onClick={() => nav.modal({ name: 'reinvest', props: { asset: pre } })}>Simular reinv.</Btn>
              <Btn kind="primary" size="sm" style={{ flex: 1 }} icon={<I.arrowRight/>} onClick={() => nav.push('asset', { id: pre.id })}>Detalle</Btn>
            </div>
          </Card>
        </div>
      )}

      <div style={{ padding: '12px 20px' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Histórico</div>
        {done.length === 0 ? (
          <Card pad={16}><div style={{ fontSize: 13, color: T.text2, textAlign: 'center' }}>Tus liquidaciones aparecerán acá cuando finalice un ciclo.</div></Card>
        ) : (
          done.map(d => (
            <Card key={d.id} pad={16} style={{ marginBottom: 8, background: T.dark ? '#3F2A14' : 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.dark ? '#F8FAFC' : '#0B1F33' }}>{d.name}</div>
                    <Badge tone="gold" soft={false}>Liquidado</Badge>
                  </div>
                  <div style={{ fontSize: 11, color: T.dark ? '#94A3B8' : '#8497AE' }}>{d.sub} · {d.daysLeft === 0 ? '110 días' : ''}</div>
                </div>
                <button onClick={() => nav.toast('Comprobante descargado', 'success')} style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(168,117,20,0.15)', border: 'none', color: '#A87514', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><I.download/></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '10px 0', borderTop: '1px dashed rgba(168,117,20,0.3)', borderBottom: '1px dashed rgba(168,117,20,0.3)' }}>
                <KVRow k="Capital inicial" v={`USD ${d.invested.toLocaleString('es-AR')}`}/>
                <KVRow k="Resultado bruto" v={`USD ${(d.value + 50).toLocaleString('es-AR')}`}/>
                <KVRow k="Comisión" v="USD 30"/>
                <KVRow k="Resultado neto" v={`USD ${d.value.toLocaleString('es-AR')}`}/>
                <KVRow k="Rentab. real" v={<span style={{ color: '#00A878' }}>+{d.partial}%</span>}/>
                <KVRow k="vs proy." v={`+${d.ret}%`}/>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <Btn kind="soft" size="sm" style={{ flex: 1 }} icon={<I.calc/>} onClick={() => nav.modal({ name: 'reinvest', props: { asset: d } })}>Reinvertir</Btn>
                <Btn kind="ghost" size="sm" style={{ flex: 1 }} onClick={() => nav.toast('Retiro a saldo en cuenta', 'success')}>Retirar</Btn>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

registerModal('reinvest', ({ asset }) => {
  const T = useTheme();
  const nav = useNav();
  return (
    <div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, letterSpacing: -0.6, marginBottom: 6 }}>Tu ciclo finalizó.</div>
      <div style={{ fontSize: 13, color: T.text2, marginBottom: 18, lineHeight: 1.5 }}>Elegí tu próximo paso para {asset.name}.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Btn kind="emerald" full icon={<I.arrowRight/>} onClick={() => { nav.modal(null); nav.toast('Reinversión completa preparada', 'success'); }}>Reinvertir total · USD {asset.value.toLocaleString('es-AR')}</Btn>
        <Btn kind="soft" full onClick={() => { nav.modal(null); nav.toast('Reinversión parcial 50% preparada', 'success'); }}>Reinvertir 50%</Btn>
        <Btn kind="ghost" full onClick={() => { nav.modal(null); nav.toast('Retiro confirmado', 'success'); }}>Retirar fondos</Btn>
        <Btn kind="ghost" full icon={<I.calc/>} onClick={() => { nav.modal(null); nav.push('simulator', { oppId: 'angus-001' }); }}>Simular reinversión</Btn>
      </div>
      <div style={{ marginTop: 14, fontSize: 11, color: T.text3, textAlign: 'center', lineHeight: 1.5 }}>
        Antes de reinvertir, compará escenarios y revisá tu perfil de riesgo.
      </div>
    </div>
  );
});

// ============ CLUB ============
function ClubScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const benefits = [
    { i: <I.spark/>, t: 'Acceso anticipado a 3 nuevos lotes', s: 'Antes del fondeo público · 24 hs', c: '#00A878' },
    { i: <I.gift/>, t: '20% bonificación en fee de gestión', s: 'Aplicable a próxima inversión', c: '#F5A524' },
    { i: <I.globe/>, t: 'Webinar exportación con AgroComex', s: '12 sep · 18:00 ARG', c: '#0284C7' },
    { i: <I.pin/>, t: 'Visita al feedlot Campo Amigo', s: '1 cupo disponible', c: '#7C3AED' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: T.bg, color: T.text }}>
      <StatusBar darkText/>
      <div style={{ padding: '58px 20px 24px', background: 'linear-gradient(135deg, #78350F 0%, #D9A441 50%, #FFB020 100%)', color: '#F8FAFC', position: 'relative', overflow: 'hidden', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)', filter: 'blur(20px)' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <button onClick={() => nav.pop()} style={glassBtn}><I.chevL/></button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: 1 }}>BEEFYIELD CLUB</div>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, paddingLeft: 48, letterSpacing: -0.8 }}>Club del Inversor</div>
        <div style={{ marginTop: 18, padding: 14, background: 'rgba(11,31,51,0.55)', backdropFilter: 'blur(10px)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 }}>NIVEL · {state.user.level} DE 6</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800 }}>{state.user.levelName}</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #FFB020, #F5A524)', color: '#06121F', padding: '6px 10px', borderRadius: 99, fontSize: 11, fontWeight: 800 }}>
              ⭐ {state.user.agropoints} AP
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <ProgressBar value={68} color="#FFB020" track="rgba(255,255,255,0.15)" height={6}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
              <span>68% al siguiente nivel</span>
              <span><b style={{ color: '#FFB020' }}>1.160 AP</b> restantes</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 0 0' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, padding: '0 20px 10px' }}>Niveles</div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px' }}>
            {[
              { n: 'Explorador Agro', i: 1, c: '#94A3B8' },
              { n: 'Primer Corral', i: 2, c: '#0284C7' },
              { n: 'Inversor Ganadero', i: 3, c: '#F5A524', current: true },
              { n: 'Socio Productivo', i: 4, c: '#7C3AED', locked: true },
              { n: 'Estratégico', i: 5, c: '#00A878', locked: true },
              { n: 'Partner AgroCap.', i: 6, c: T.text, locked: true },
            ].map(l => (
              <div key={l.i} style={{
                flexShrink: 0, width: 130,
                background: l.current ? `linear-gradient(135deg, ${l.c}, #FFB020)` : T.card,
                border: l.current ? 'none' : `1px solid ${T.line}`,
                borderRadius: 16, padding: 12, color: l.current ? '#06121F' : (l.locked ? T.text3 : T.text),
                opacity: l.locked ? 0.6 : 1, position: 'relative',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: l.current ? 'rgba(11,31,51,0.15)' : l.c + '20', color: l.current ? '#06121F' : l.c, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <I.trophy/>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>NIVEL {l.i}</div>
                <div style={{ fontSize: 12, fontWeight: 800, lineHeight: 1.2 }}>{l.n}</div>
                {l.current && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 800, background: '#06121F', color: '#FFB020', padding: '2px 6px', borderRadius: 99 }}>ACTUAL</div>}
              </div>
            ))}
            <div style={{ width: 12, flexShrink: 0 }}/>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 10px' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, marginBottom: 10 }}>Beneficios disponibles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {benefits.map((b, i) => (
            <button key={i} onClick={() => nav.toast(`Beneficio reclamado: ${b.t}`, 'success')} style={{ background: T.card, borderRadius: 14, padding: 12, display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${T.line}`, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif', color: T.text }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: b.c + '15', color: b.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{b.t}</div>
                <div style={{ fontSize: 11, color: T.text3 }}>{b.s}</div>
              </div>
              <I.chevR style={{ color: T.text3 }}/>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <button onClick={() => nav.push('missions')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, cursor: 'pointer', color: T.text, fontFamily: 'Inter, sans-serif' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <I.trophy style={{ color: '#F5A524' }}/>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Ver misiones ({state.missions.filter(m => !m.done).length} pendientes)</span>
          </span>
          <I.chevR style={{ color: T.text3 }}/>
        </button>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, marginBottom: 10 }}>Insignias</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { n: 'Perfil Verif.', e: '🛡️', got: true, c: '#00A878' },
            { n: 'Primer Inv.', e: '🐂', got: true, c: '#F5A524' },
            { n: 'Analista', e: '📊', got: true, c: '#0284C7' },
            { n: 'Diversific.', e: '🎯', got: true, c: '#7C3AED' },
            { n: 'Trazab. 360', e: '🗺️', got: false, c: T.text3 },
            { n: 'Reinversor', e: '🔁', got: false, c: T.text3 },
            { n: 'Exportador', e: '🌍', got: false, c: T.text3 },
            { n: 'Capital Pac.', e: '⏳', got: false, c: T.text3 },
          ].map((b, i) => (
            <div key={i} style={{ background: T.card, borderRadius: 14, padding: 10, textAlign: 'center', border: `1px solid ${T.line}`, opacity: b.got ? 1 : 0.5 }}>
              <div style={{ width: 36, height: 36, borderRadius: 99, background: b.c + '15', color: b.c, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 18 }}>{b.e}</div>
              <div style={{ fontSize: 9.5, fontWeight: 700 }}>{b.n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ MISSIONS ============
function MissionsScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();
  const cats = [...new Set(state.missions.map(m => m.cat))];

  const completeMission = (m) => {
    dispatch({ type: 'MISSION_DONE', id: m.id });
    nav.toast(`Misión completada · +${m.pts} AgroPoints`, 'success');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Misiones" subtitle={`${state.missions.filter(m => !m.done).length} PENDIENTES`}/>
      <div style={{ padding: '0 20px 14px' }}>
        <Card pad={14} style={{ background: 'linear-gradient(135deg, #FFB020, #F5A524)', color: '#06121F', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4, opacity: 0.7 }}>TUS AGROPOINTS</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800 }}>⭐ {state.user.agropoints}</div>
            </div>
            <I.trophy style={{ width: 36, height: 36 }}/>
          </div>
        </Card>
      </div>

      {cats.map(cat => (
        <div key={cat} style={{ padding: '0 20px 14px' }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: T.text2, marginBottom: 8, letterSpacing: 0.4, textTransform: 'uppercase' }}>{cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {state.missions.filter(m => m.cat === cat).map(m => (
              <button key={m.id} onClick={() => !m.done && completeMission(m)} disabled={m.done} style={{
                background: T.card, borderRadius: 14, padding: 12, border: `1px solid ${T.line}`,
                width: '100%', textAlign: 'left', cursor: m.done ? 'default' : 'pointer',
                fontFamily: 'Inter, sans-serif', color: T.text, opacity: m.done ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {m.done && <I.check style={{ width: 14, height: 14, color: '#00A878' }}/>}
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{m.title}</div>
                    </div>
                    <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>{m.sub}</div>
                  </div>
                  <div style={{ background: m.done ? '#DCFCE7' : 'linear-gradient(135deg, #FFB020, #F5A524)', color: m.done ? '#00A878' : '#06121F', padding: '4px 8px', borderRadius: 99, fontSize: 10, fontWeight: 800 }}>+{m.pts} AP</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ PROFILE ============
function ProfileScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Perfil"/>

      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0B1F33, #102A43)', borderRadius: 22, padding: 18, color: '#F8FAFC', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #FFB020, #F5A524)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#06121F' }}>{state.user.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>{state.user.name} {state.user.surname}</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>{state.user.email}</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
              {state.user.kyc === 'approved' && <Badge tone="emerald" soft={false}><I.check style={{ width: 10, height: 10 }}/>KYC</Badge>}
              <Badge tone="gold" soft={false}>Nivel {state.user.level}</Badge>
              {state.riskProfile && <Badge tone="cyan" soft={false}>{state.riskProfile}</Badge>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <MiniStat l="Lotes" v={state.assets.length}/>
        <MiniStat l="AgroPoints" v={state.user.agropoints}/>
        <MiniStat l="Insignias" v="4"/>
      </div>

      <div style={{ padding: '0 20px' }}>
        <SettingsSection title="CUENTA">
          <SettingRow icon={<I.badge/>} title="Perfil de riesgo" detail={state.riskProfile || 'No definido'} onClick={() => nav.go('risk')}/>
          <SettingRow icon={<I.shield/>} title="Estado KYC" detail="Aprobado"/>
          <SettingRow icon={<I.coin/>} title="Métodos de pago" detail="2 conectados"/>
          <SettingRow icon={<I.file/>} title="Datos fiscales"/>
          <SettingRow icon={<I.globe/>} title="País / Idioma" detail="🇦🇷 Argentina · ES"/>
        </SettingsSection>

        <SettingsSection title="SEGURIDAD">
          <SettingRow icon={<I.finger/>} title="Face ID" toggle on={true}/>
          <SettingRow icon={<I.shield/>} title="2FA" detail="App auth" onClick={() => nav.push('security')}/>
          <SettingRow icon={<I.eye/>} title="Confirmar inversiones" toggle on={true}/>
        </SettingsSection>

        <SettingsSection title="PREFERENCIAS">
          <SettingRow icon={<I.layer/>} title="Modo oscuro" toggle on={T.dark} onClick={() => dispatch({ type: 'THEME' })}/>
          <SettingRow icon={<I.bell/>} title="Notificaciones" onClick={() => nav.push('notifications')}/>
          <SettingRow icon={<I.spark/>} title="Centro de aprendizaje" onClick={() => nav.push('learn')}/>
          <SettingRow icon={<I.bot/>} title="Soporte" detail="Chat 24/7" onClick={() => nav.push('support')}/>
        </SettingsSection>

        <button onClick={() => nav.go('login')} style={{ width: '100%', padding: 14, marginTop: 6, background: 'transparent', border: `1px solid ${T.dark ? '#3F1A1A' : '#FEE2E2'}`, borderRadius: 14, color: '#EF4444', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Cerrar sesión
        </button>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 10, color: T.text3 }}>
          <LogoBYC size={16} dark={T.dark}/>
          <div style={{ marginTop: 8 }}>v1.0 · build 2025.09 · 🇦🇷</div>
          <div style={{ marginTop: 12 }}><PartnerLogos size={9} dark={T.dark}/></div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ l, v }) {
  const T = useTheme();
  return (
    <div style={{ background: T.card, borderRadius: 14, padding: '12px 10px', border: `1px solid ${T.line}`, textAlign: 'center' }}>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800 }} className="mono">{v}</div>
      <div style={{ fontSize: 10, color: T.text3, marginTop: 2 }}>{l}</div>
    </div>
  );
}

function SettingsSection({ title, children }) {
  const T = useTheme();
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: T.text3, letterSpacing: 0.8, padding: '0 4px 6px' }}>{title}</div>
      <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.line}`, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

function SettingRow({ icon, title, detail, toggle, on, onClick }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: `1px solid ${T.line}`, background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: onClick ? 'pointer' : 'default', fontFamily: 'Inter, sans-serif', color: T.text }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: T.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text2 }}>{icon}</div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{title}</div>
      {detail && !toggle && <div style={{ fontSize: 12, color: T.text3 }}>{detail}</div>}
      {toggle ? (
        <div style={{ width: 40, height: 24, borderRadius: 99, background: on ? '#00A878' : T.line2, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 20, height: 20, borderRadius: 99, background: '#fff', transition: 'left 0.2s' }}/>
        </div>
      ) : onClick ? <I.chevR style={{ color: T.text3 }}/> : null}
    </button>
  );
}

// ============ NOTIFICATIONS ============
function NotificationsScreen() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();
  const icoMap = { bot: I.bot, spark: I.spark, file: I.file, trend: I.trend, coin: I.coin, gift: I.gift };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Notificaciones" subtitle={`${state.notifications.filter(n => !n.read).length} SIN LEER`}/>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {state.notifications.map(n => {
          const Ico = icoMap[n.ico] || I.bell;
          return (
            <button key={n.id} onClick={() => dispatch({ type: 'NOTIF_READ', id: n.id })} style={{
              background: n.read ? T.card : (T.dark ? '#102A43' : '#F2F6F9'),
              borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
              border: `1px solid ${T.line}`, cursor: 'pointer', width: '100%', textAlign: 'left',
              fontFamily: 'Inter, sans-serif', color: T.text,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: n.tone + '20', color: n.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ico/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
                  {!n.read && <div style={{ width: 6, height: 6, borderRadius: 99, background: '#EF4444' }}/>}
                </div>
                <div style={{ fontSize: 12, color: T.text2, marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
                <div style={{ fontSize: 10, color: T.text3, marginTop: 4 }} className="mono">{n.t}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============ GENERIC SECONDARY SCREENS ============
function LearnScreen() {
  const T = useTheme();
  const nav = useNav();
  const cats = [
    { t: '¿Qué es la inversión ganadera tokenizada?', tone: '#00A878' },
    { t: '¿Cómo funciona un ciclo de engorde?', tone: '#38BDF8' },
    { t: 'Trazabilidad y bienestar animal', tone: '#7C3AED' },
    { t: 'Riesgos productivos, sanitarios y comerciales', tone: '#F5A524' },
    { t: 'Liquidaciones y reinversión', tone: '#0284C7' },
    { t: 'Cuota Hilton y exportación', tone: '#00A878' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Centro de Aprendizaje"/>
      <div style={{ padding: '0 20px' }}>
        {cats.map((c, i) => (
          <button key={i} onClick={() => nav.toast('Lección abierta', 'success')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, marginBottom: 8, cursor: 'pointer', color: T.text, textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: c.tone + '20', color: c.tone, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.spark/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: T.text3 }}>3 min de lectura · video + quiz</div>
            </div>
            <I.chevR style={{ color: T.text3 }}/>
          </button>
        ))}
      </div>
    </div>
  );
}

function SecurityScreen() {
  const T = useTheme();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Seguridad"/>
      <div style={{ padding: '0 20px' }}>
        <Card pad={14} style={{ background: T.card2, boxShadow: 'none', border: `1px solid ${T.line}`, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>Tu cuenta protege activos, documentos e información financiera. Activá controles adicionales.</div>
        </Card>
        <SettingsSection title="AUTENTICACIÓN">
          <SettingRow icon={<I.finger/>} title="Face ID / Touch ID" toggle on/>
          <SettingRow icon={<I.shield/>} title="2FA con app" toggle on/>
          <SettingRow icon={<I.eye/>} title="Confirmar inversiones" toggle on/>
          <SettingRow icon={<I.eye/>} title="Confirmar retiros" toggle on/>
        </SettingsSection>
        <SettingsSection title="DISPOSITIVOS">
          <SettingRow icon={<I.layer/>} title="iPhone de Enzo" detail="Activo · Ahora" onClick={() => {}}/>
          <SettingRow icon={<I.layer/>} title="MacBook Pro" detail="Hace 2 horas" onClick={() => {}}/>
        </SettingsSection>
      </div>
    </div>
  );
}

function DocumentsScreen() {
  const T = useTheme();
  const docs = [
    { c: 'Contratos', n: 4, i: <I.file/> },
    { c: 'Comprobantes', n: 8, i: <I.file/> },
    { c: 'Reportes', n: 18, i: <I.file/> },
    { c: 'Certificados sanitarios', n: 12, i: <I.heart/> },
    { c: 'Trazabilidad', n: 24, i: <I.shield/> },
    { c: 'Liquidaciones', n: 2, i: <I.coin/> },
    { c: 'Facturas', n: 6, i: <I.file/> },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Documentos"/>
      <div style={{ padding: '0 20px' }}>
        {docs.map((d, i) => (
          <button key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, marginBottom: 8, cursor: 'pointer', color: T.text, textAlign: 'left' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.card2, color: T.text2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.i}</div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{d.c}</div>
            <Badge tone="navy">{d.n}</Badge>
            <I.chevR style={{ color: T.text3 }}/>
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen() {
  const T = useTheme();
  const { dispatch } = useStore();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Configuración"/>
      <div style={{ padding: '0 20px' }}>
        <SettingsSection title="APARIENCIA">
          <SettingRow icon={<I.layer/>} title="Modo oscuro" toggle on={T.dark} onClick={() => dispatch({ type: 'THEME' })}/>
          <SettingRow icon={<I.eye/>} title="Ocultar montos por defecto" toggle/>
        </SettingsSection>
        <SettingsSection title="IDIOMA Y REGIÓN">
          <SettingRow icon={<I.globe/>} title="Idioma" detail="Español" onClick={() => {}}/>
          <SettingRow icon={<I.globe/>} title="Moneda" detail="USD" onClick={() => {}}/>
        </SettingsSection>
      </div>
    </div>
  );
}

function SupportScreen() {
  const T = useTheme();
  const nav = useNav();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Soporte"/>
      <div style={{ padding: '0 20px' }}>
        <Card pad={16} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>¿Necesitás ayuda?</div>
          <div style={{ fontSize: 12, color: T.text2 }}>Hablá con AgroAI o contactá a nuestro equipo.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <Btn kind="emerald" full icon={<I.bot/>} onClick={() => { nav.pop(); nav.tabTo('ai'); }}>AgroAI</Btn>
            <Btn kind="ghost" full>Chat humano</Btn>
          </div>
        </Card>
        <SettingsSection title="AYUDA RÁPIDA">
          <SettingRow icon={<I.spark/>} title="Preguntas frecuentes" onClick={() => {}}/>
          <SettingRow icon={<I.file/>} title="Tutoriales" onClick={() => {}}/>
          <SettingRow icon={<I.bell/>} title="Reportar problema" onClick={() => nav.toast('Equipo notificado', 'success')}/>
        </SettingsSection>
      </div>
    </div>
  );
}

Object.assign(window, {
  AiScreen, ReportsScreen, ReportDetailScreen, LiquidationsScreen, ClubScreen,
  MissionsScreen, ProfileScreen, NotificationsScreen,
  LearnScreen, SecurityScreen, DocumentsScreen, SettingsScreen, SupportScreen,
});
