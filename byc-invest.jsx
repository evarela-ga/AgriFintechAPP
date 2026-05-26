/* BeefYield Capital — Simulator + Invest Flow */
/* eslint-disable */

// ============ SIMULATOR ============
function SimulatorScreen({ oppId, amount: initAmount }) {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const o = state.opportunities.find(x => x.id === oppId) || state.opportunities[0];

  const [amt, setAmt] = React.useState(initAmount || Math.max(o.ticket, 1000));
  const [days, setDays] = React.useState(o.days);
  const [scenario, setScenario] = React.useState('base');
  const [reinvest, setReinvest] = React.useState(true);

  const mult = scenario === 'cons' ? 1 + o.ret * 0.005 : scenario === 'opt' ? 1 + o.ret * 0.013 : 1 + o.ret / 100;
  const out = Math.round(amt * mult);
  const tokens = Math.round(amt * 10);
  const participation = ((amt / o.target) * 100).toFixed(2);

  const data = React.useMemo(() => {
    const arr = []; const n = 20;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const noise = Math.sin(i * 1.3) * 0.012;
      arr.push(amt + (out - amt) * (t * t * (3 - 2 * t)) * (1 + noise));
    }
    return arr;
  }, [amt, out]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto', paddingBottom: 130 }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title={o.name} subtitle="SIMULADOR · NO VINCULANTE"/>

      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #071A2D 0%, #0B3D3A 60%, #00A878 130%)',
          borderRadius: 22, padding: 18, color: '#F8FAFC', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: 999, background: 'radial-gradient(circle, rgba(0,200,150,0.3), transparent 70%)', filter: 'blur(10px)' }}/>
          <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.5 }}>RESULTADO ESTIMADO</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <MoneyBig value={out.toLocaleString('es-AR')} size={40} weight={800}/>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 12, color: '#CBD5E1', flexWrap: 'wrap' }}>
            <div>Capital <span style={{ color: '#F8FAFC', fontWeight: 700 }} className="mono">USD {amt.toLocaleString('es-AR')}</span></div>
            <div>·</div>
            <div>Ganancia <span style={{ color: '#00D084', fontWeight: 700 }} className="mono">+USD {(out - amt).toLocaleString('es-AR')}</span></div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 4, fontSize: 12, color: '#CBD5E1', flexWrap: 'wrap' }}>
            <div>Tokens <span style={{ color: '#38BDF8', fontWeight: 700 }} className="mono">{tokens.toLocaleString('es-AR')} BYC</span></div>
            <div>·</div>
            <div>Participación <span style={{ color: '#F8FAFC', fontWeight: 700 }} className="mono">{participation}%</span></div>
          </div>
          <div style={{ marginTop: 14, padding: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 12 }}>
            <Spark data={data} color="#00C896" w={310} h={48}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: '#94A3B8' }}>
              <span>Hoy</span>
              <span>Cierre est. · {new Date(Date.now() + days * 86400000).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* scenario toggle */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, background: T.card2, padding: 4, borderRadius: 14 }}>
          {[
            { id: 'cons', label: 'Conservador', v: `+${(o.ret * 0.5).toFixed(1)}%` },
            { id: 'base', label: 'Base', v: `+${o.ret}%` },
            { id: 'opt', label: 'Optimista', v: `+${(o.ret * 1.3).toFixed(1)}%` },
          ].map(s => (
            <button key={s.id} onClick={() => setScenario(s.id)} style={{
              padding: '10px 6px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: scenario === s.id ? T.card : 'transparent',
              boxShadow: scenario === s.id ? '0 1px 3px rgba(11,31,51,0.1)' : 'none',
              fontSize: 11, fontWeight: 700, color: T.text,
              display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'Inter, sans-serif',
            }}>
              <div>{s.label}</div>
              <div style={{ fontSize: 13, color: s.id === 'opt' ? '#00A878' : s.id === 'cons' ? T.text2 : T.text, fontFamily: 'Manrope, sans-serif' }}>{s.v}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5 }}>MONTO A INVERTIR</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800 }} className="mono">USD {amt.toLocaleString('es-AR')}</div>
          </div>
          <input type="range" min={o.ticket} max={20000} step={50} value={amt} onChange={e => setAmt(+e.target.value)} style={{ width: '100%', height: 6, background: `linear-gradient(to right, #00C896 ${(amt - o.ticket) / (20000 - o.ticket) * 100}%, ${T.dark ? '#16324A' : '#E4ECF3'} ${(amt - o.ticket) / (20000 - o.ticket) * 100}%)`, borderRadius: 99 }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.text3, marginTop: 4 }}>
            <span>USD {o.ticket}</span><span>USD 20.000</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }}>
            {[o.ticket, 500, 1000, 2500, 5000].map(v => (
              <Chip key={v} active={amt === v} onClick={() => setAmt(v)} style={{ padding: '5px 10px', fontSize: 11 }}>
                ${v >= 1000 ? `${v/1000}k` : v}
              </Chip>
            ))}
          </div>
        </Card>

        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5 }}>PLAZO ESTIMADO</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800 }} className="mono">{days} días</div>
          </div>
          <input type="range" min={90} max={240} step={10} value={days} onChange={e => setDays(+e.target.value)} style={{ width: '100%', height: 6, background: `linear-gradient(to right, #00C896 ${(days - 90) / 150 * 100}%, ${T.dark ? '#16324A' : '#E4ECF3'} ${(days - 90) / 150 * 100}%)`, borderRadius: 99 }}/>
        </Card>

        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Reinvertir al cierre</div>
              <div style={{ fontSize: 11, color: T.text3 }}>Auto-reinversión parcial 50%</div>
            </div>
            <button onClick={() => setReinvest(r => !r)} style={{ width: 48, height: 28, borderRadius: 99, background: reinvest ? '#00A878' : '#CBD5E1', position: 'relative', cursor: 'pointer', border: 'none' }}>
              <div style={{ position: 'absolute', top: 2, left: reinvest ? 22 : 2, width: 24, height: 24, borderRadius: 99, background: '#fff', transition: 'left 0.2s' }}/>
            </button>
          </div>
        </Card>

        <Card pad={14} style={{ background: T.card2, boxShadow: 'none', border: `1px solid ${T.line2}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, marginBottom: 6, letterSpacing: 0.4 }}>SUPUESTOS</div>
          <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.5 }}>
            Precio carne +3% · Costo alimento estable · TC oficial · Conversión 6,2:1 · Mortalidad &lt;1%
          </div>
        </Card>

        <Card pad={14} style={{ background: T.dark ? '#0C4A6E' : 'linear-gradient(135deg, rgba(56,189,248,0.08), #fff)', border: '1px solid rgba(56,189,248,0.3)' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(135deg, #2F80ED, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><I.bot style={{ width: 16, height: 16 }}/></div>
            <div style={{ fontSize: 12, color: T.text, lineHeight: 1.55 }}>
              <b>AgroAI:</b> Si invertís USD {amt.toLocaleString('es-AR')}, tu retorno estimado en escenario {scenario === 'opt' ? 'optimista' : scenario === 'cons' ? 'conservador' : 'base'} podría ser <b style={{ color: '#00A878' }}>USD {out.toLocaleString('es-AR')}</b> al cierre del ciclo. Este resultado no está garantizado.
            </div>
          </div>
        </Card>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 28px', background: `linear-gradient(transparent, ${T.bg} 30%)`, display: 'flex', gap: 8, zIndex: 30 }}>
        <Btn kind="ghost" icon={<I.download/>} onClick={() => nav.toast('Simulación guardada', 'success')}>Guardar</Btn>
        <Btn kind="emerald" full size="lg" icon={<I.arrowRight/>} onClick={() => nav.push('invest', { oppId: o.id, amount: amt })}>Invertir</Btn>
      </div>
    </div>
  );
}

// ============ INVEST FLOW ============
const INVEST_STEPS = ['Monto', 'Simulación', 'Checklist', 'Documentos', 'Pago', 'Confirmar'];
const CHECKLIST_ITEMS = [
  'Entiendo el plazo estimado',
  'Entiendo que la rentabilidad NO está garantizada',
  'Revisé el escenario conservador',
  'Revisé los riesgos principales',
  'Revisé la documentación disponible',
  'Entiendo cómo se liquida el ciclo',
];

function InvestFlowScreen({ oppId, amount: initAmount }) {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const T = useTheme();
  const o = state.opportunities.find(x => x.id === oppId);
  const [step, setStep] = React.useState(0);
  const [amount, setAmount] = React.useState(initAmount || o.ticket);
  const [checks, setChecks] = React.useState(new Array(CHECKLIST_ITEMS.length).fill(false));
  const [paymentMethod, setPaymentMethod] = React.useState('balance');
  const [success, setSuccess] = React.useState(false);
  const [docsAccepted, setDocsAccepted] = React.useState(false);

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => Math.max(0, s - 1));

  const projectedReturn = Math.round(amount * (1 + o.ret / 100));
  const tokens = Math.round(amount * 10);
  const fee = Math.round(amount * 0.0083);

  const confirmInvestment = () => {
    const newAsset = {
      id: 'a-' + Date.now(),
      oppId: o.id,
      name: o.name,
      sub: `${o.exportReady ? 'Exp.' : 'Interno'} · ${o.feedlot}`,
      tone: o.tone,
      invested: amount,
      value: amount,
      ret: o.ret,
      partial: 0,
      progress: 1,
      daysLeft: o.days,
      conf: o.conf,
      status: 'En engorde',
      risk: o.risk,
      tokens,
    };
    dispatch({ type: 'ADD_ASSET', asset: newAsset });
    dispatch({ type: 'FUND_OPP', id: o.id, delta: Math.round((amount / o.target) * 100) });
    setSuccess(true);
  };

  if (success) return <InvestSuccess asset={{ name: o.name, amount, tokens, ret: o.ret, daysLeft: o.days, fee }}/>;

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto', paddingBottom: 120 }}>
      <StatusBar darkText={T.dark}/>
      <ScreenHeader title="Nueva inversión" subtitle={`PASO ${step + 1} DE ${INVEST_STEPS.length} · ${INVEST_STEPS[step]}`} onBack={step === 0 ? () => nav.pop() : prev}/>

      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {INVEST_STEPS.map((_, n) => (
            <div key={n} style={{ flex: 1, height: 4, borderRadius: 99, background: n <= step ? '#00C896' : T.dark ? '#16324A' : '#E4ECF3' }}/>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {step === 0 && <StepAmount o={o} amount={amount} setAmount={setAmount}/>}
        {step === 1 && <StepSimulation o={o} amount={amount}/>}
        {step === 2 && <StepChecklist checks={checks} setChecks={setChecks}/>}
        {step === 3 && <StepDocuments accepted={docsAccepted} setAccepted={setDocsAccepted}/>}
        {step === 4 && <StepPayment method={paymentMethod} setMethod={setPaymentMethod}/>}
        {step === 5 && <StepConfirm o={o} amount={amount} tokens={tokens} fee={fee} projectedReturn={projectedReturn}/>}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 28px', background: `linear-gradient(transparent, ${T.bg} 30%)`, zIndex: 30 }}>
        {step < INVEST_STEPS.length - 1 ? (
          <Btn kind="emerald" full size="lg" icon={<I.arrowRight/>} onClick={next}
            style={!isStepValid(step, { amount, o, checks, docsAccepted }) ? { opacity: 0.5, pointerEvents: 'none' } : null}>
            Continuar
          </Btn>
        ) : (
          <Btn kind="emerald" full size="lg" icon={<I.check/>} onClick={confirmInvestment}>Confirmar inversión</Btn>
        )}
      </div>
    </div>
  );
}

function isStepValid(step, { amount, o, checks, docsAccepted }) {
  if (step === 0) return amount >= o.ticket;
  if (step === 2) return checks.every(Boolean);
  if (step === 3) return docsAccepted;
  return true;
}

function StepAmount({ o, amount, setAmount }) {
  const T = useTheme();
  const tokens = Math.round(amount * 10);
  const participation = ((amount / o.target) * 100).toFixed(2);
  return (
    <>
      <Card pad={16} style={{ marginBottom: 12, background: 'linear-gradient(135deg, #0B1F33, #102A43)', color: '#F8FAFC', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>INVERTIRÁS</div>
          <div style={{ fontSize: 11, color: '#94A3B8' }}>{o.name}</div>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: -1 }} className="mono">USD {amount.toLocaleString('es-AR')}</div>
        <div style={{ marginTop: 6, fontSize: 12, color: '#CBD5E1' }}>
          Tokens: <b style={{ color: '#38BDF8' }} className="mono">{tokens.toLocaleString('es-AR')} BYC</b> · Participación: <b style={{ color: '#F8FAFC' }} className="mono">{participation}%</b>
        </div>
      </Card>

      <Card pad={16}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5, marginBottom: 10 }}>MONTO</div>
        <input type="range" min={o.ticket} max={20000} step={50} value={amount} onChange={e => setAmount(+e.target.value)} style={{ width: '100%', height: 6, background: `linear-gradient(to right, #00C896 ${(amount - o.ticket) / (20000 - o.ticket) * 100}%, ${T.dark ? '#16324A' : '#E4ECF3'} ${(amount - o.ticket) / (20000 - o.ticket) * 100}%)`, borderRadius: 99 }}/>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {[o.ticket, 500, 1000, 2500, 5000, 10000].map(v => (
            <Chip key={v} active={amount === v} onClick={() => setAmount(v)} style={{ padding: '5px 10px', fontSize: 11 }}>
              ${v >= 1000 ? `${v/1000}k` : v}
            </Chip>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: T.text3 }}>Ticket mínimo: USD {o.ticket} · Disponible para fondear: USD {Math.round(o.target * (1 - o.funding / 100)).toLocaleString('es-AR')}</div>
      </Card>
    </>
  );
}

function StepSimulation({ o, amount }) {
  const T = useTheme();
  const scenarios = [
    { l: 'Conservador', m: 1 + o.ret * 0.005, c: T.text2 },
    { l: 'Base', m: 1 + o.ret / 100, c: '#00A878' },
    { l: 'Optimista', m: 1 + o.ret * 0.013, c: '#00C896' },
  ];
  return (
    <>
      <Card pad={16} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, marginBottom: 12 }}>ESCENARIOS PROYECTADOS</div>
        {scenarios.map(s => (
          <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.line}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{s.l}</div>
              <div style={{ fontSize: 11, color: T.text3 }}>{((s.m - 1) * 100).toFixed(1)}% · {o.days} días</div>
            </div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: s.c }} className="mono">USD {Math.round(amount * s.m).toLocaleString('es-AR')}</div>
          </div>
        ))}
      </Card>
      <Card pad={14} style={{ background: T.dark ? '#3F2A14' : '#FEF3C7', border: T.dark ? '1px solid #78350F' : '1px solid #FDE68A', boxShadow: 'none' }}>
        <div style={{ fontSize: 11, color: T.dark ? '#FCD34D' : '#A87514', lineHeight: 1.5 }}>
          <b>Aviso:</b> Las proyecciones son estimativas y pueden variar según condiciones productivas, sanitarias, comerciales y regulatorias. Las rentabilidades no están garantizadas.
        </div>
      </Card>
    </>
  );
}

function StepChecklist({ checks, setChecks }) {
  const T = useTheme();
  const toggle = (i) => setChecks(c => c.map((v, k) => k === i ? !v : v));
  return (
    <>
      <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5, marginBottom: 14 }}>
        Para invertir de forma responsable, confirmá que entendiste cada punto:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CHECKLIST_ITEMS.map((c, i) => (
          <button key={i} onClick={() => toggle(i)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: T.card, borderRadius: 14, border: `1px solid ${T.line}`, cursor: 'pointer',
            width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: checks[i] ? '#00A878' : T.card, border: checks[i] ? 'none' : `2px solid ${T.line2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              {checks[i] && <I.check style={{ width: 14, height: 14 }}/>}
            </div>
            <div style={{ fontSize: 13, color: checks[i] ? T.text : T.text2, lineHeight: 1.45 }}>{c}</div>
          </button>
        ))}
      </div>
    </>
  );
}

function StepDocuments({ accepted, setAccepted }) {
  const T = useTheme();
  return (
    <>
      <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5, marginBottom: 14 }}>
        Revisá los documentos asociados antes de continuar.
      </div>
      <Card pad={0} style={{ marginBottom: 14 }}>
        {['Términos de inversión', 'Resumen de oportunidad', 'Política de tokenización', 'Información de comisiones', 'Contrato de adhesión'].map((d, i, a) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < a.length - 1 ? `1px solid ${T.line}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.card2, color: T.text2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.file/></div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{d}</div>
            <button style={{ background: 'none', border: 'none', color: T.text3, cursor: 'pointer' }}><I.download/></button>
          </div>
        ))}
      </Card>
      <button onClick={() => setAccepted(a => !a)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: T.card, borderRadius: 14, border: `1px solid ${T.line}`, width: '100%', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, background: accepted ? '#00A878' : T.card, border: accepted ? 'none' : `2px solid ${T.line2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
          {accepted && <I.check style={{ width: 14, height: 14 }}/>}
        </div>
        <div style={{ fontSize: 13, color: T.text, lineHeight: 1.4 }}>He leído y acepto los documentos asociados a esta inversión.</div>
      </button>
    </>
  );
}

function StepPayment({ method, setMethod }) {
  const T = useTheme();
  const methods = [
    { id: 'balance', icon: <I.wallet/>, label: 'Saldo en cuenta', sub: 'USD 8.450 disponible' },
    { id: 'transfer', icon: <I.coin/>, label: 'Transferencia bancaria', sub: 'CBU/CVU · 1-2 días hábiles' },
    { id: 'stable', icon: <I.coin/>, label: 'Stablecoin (USDT/USDC)', sub: 'Wallet conectada · Instantáneo' },
    { id: 'card', icon: <I.coin/>, label: 'Tarjeta de débito', sub: 'Comisión 1,5%' },
  ];
  return (
    <>
      <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5, marginBottom: 14 }}>
        Elegí cómo querés pagar tu inversión:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {methods.map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            background: T.card, borderRadius: 14, border: method === m.id ? '2px solid #00A878' : `1px solid ${T.line}`, cursor: 'pointer',
            width: '100%', textAlign: 'left', fontFamily: 'Inter, sans-serif', color: T.text,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: T.card2, color: T.text2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: T.text3 }}>{m.sub}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: 99, border: method === m.id ? '6px solid #00A878' : `2px solid ${T.line2}` }}/>
          </button>
        ))}
      </div>
    </>
  );
}

function StepConfirm({ o, amount, tokens, fee, projectedReturn }) {
  const T = useTheme();
  return (
    <>
      <Card pad={16} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, letterSpacing: 0.5, marginBottom: 12 }}>RESUMEN</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden' }}>
            <ImagePh tone={o.tone} label="" height={44}/>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{o.name}</div>
            <div style={{ fontSize: 11, color: T.text3 }}>{o.feedlot}</div>
          </div>
        </div>
        <div style={{ borderTop: `1px dashed ${T.line2}`, paddingTop: 12 }}>
          <RowKV k="Monto" v={`USD ${amount.toLocaleString('es-AR')}`}/>
          <RowKV k="Tokens" v={`${tokens.toLocaleString('es-AR')} BYC`} c="#38BDF8"/>
          <RowKV k="Plazo estimado" v={`${o.days} días`}/>
          <RowKV k="Rentab. proyectada" v={`+${o.ret}%`} c="#00A878"/>
          <RowKV k="Resultado estimado" v={`USD ${projectedReturn.toLocaleString('es-AR')}`} c="#00A878"/>
          <RowKV k="Comisión BeefYield" v={`USD ${fee} (0,83%)`}/>
        </div>
      </Card>
      <Card pad={14} style={{ background: T.dark ? '#3F2A14' : '#FEF3C7', border: T.dark ? '1px solid #78350F' : '1px solid #FDE68A', boxShadow: 'none' }}>
        <div style={{ fontSize: 11, color: T.dark ? '#FCD34D' : '#A87514', lineHeight: 1.5 }}>
          Al confirmar aceptás participar en este activo ganadero real. La rentabilidad es proyectada y no garantizada.
        </div>
      </Card>
    </>
  );
}

function RowKV({ k, v, c }) {
  const T = useTheme();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
      <div style={{ fontSize: 12, color: T.text3 }}>{k}</div>
      <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: c || T.text }}>{v}</div>
    </div>
  );
}

// ============ INVEST SUCCESS ============
function InvestSuccess({ asset }) {
  const nav = useNav();
  const { dispatch } = useStore();
  const T = useTheme();

  React.useEffect(() => {
    setTimeout(() => nav.toast(`Inversión confirmada · +${asset.tokens.toLocaleString('es-AR')} BYC`, 'success'), 600);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto' }}>
      <StatusBar darkText={T.dark}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 60% at 50% 30%, rgba(0,200,150,0.15), transparent 70%)', pointerEvents: 'none' }}/>
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }} viewBox="0 0 390 844">
        {Array.from({ length: 30 }, (_, i) => {
          const x = (i * 47) % 380 + 5;
          const y = 80 + (i * 23) % 300;
          const c = ['#00C896', '#38BDF8', '#F5A524', '#7C3AED'][i % 4];
          return <circle key={i} cx={x} cy={y} r="2.5" fill={c} opacity="0.6"/>;
        })}
      </svg>

      <div style={{ position: 'relative', padding: '90px 24px 30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 84, height: 84, borderRadius: 24, background: 'linear-gradient(135deg, #00A878, #00C896)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,168,120,0.35)' }}>
            <I.check style={{ width: 42, height: 42, color: '#fff' }}/>
          </div>
          <div style={{ marginTop: 18, fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, letterSpacing: -0.8, textAlign: 'center' }}>Inversión confirmada</div>
          <div style={{ marginTop: 6, fontSize: 14, color: T.text2, textAlign: 'center', maxWidth: 280, lineHeight: 1.5 }}>
            Sumaste un activo ganadero real a tu portafolio.
          </div>
        </div>

        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg, #064E3B, #00A878)' }}/>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{asset.name}</div>
                <div style={{ fontSize: 11, color: T.text3 }} className="mono">BYC·0x{Math.random().toString(16).slice(2, 6)}</div>
              </div>
            </div>
            <Badge tone="emerald" soft={false}>Activo</Badge>
          </div>
          <div style={{ borderTop: `1px dashed ${T.line2}`, borderBottom: `1px dashed ${T.line2}`, padding: '12px 0' }}>
            <RowKV k="Monto" v={`USD ${asset.amount.toLocaleString('es-AR')}`}/>
            <RowKV k="Tokens" v={`${asset.tokens.toLocaleString('es-AR')} BYC`} c="#38BDF8"/>
            <RowKV k="Cierre estimado" v={`+${asset.daysLeft} días`}/>
            <RowKV k="Rentab. proy." v={`+${asset.ret}%`} c="#00A878"/>
            <RowKV k="Comisión" v={`USD ${asset.fee}`}/>
          </div>
          <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11, color: T.text3 }}>Transacción</div>
            <div className="mono" style={{ fontSize: 11, color: T.text }}>BYC-{Date.now().toString().slice(-7)}</div>
          </div>
        </Card>

        <div style={{ marginTop: 14, padding: 14, background: T.dark ? '#0C4A6E' : 'linear-gradient(135deg, rgba(56,189,248,0.08), #fff)', borderRadius: 16, border: '1px solid rgba(56,189,248,0.25)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0284C7', letterSpacing: 0.4, marginBottom: 6 }}>PRÓXIMO HITO</div>
          <div style={{ fontSize: 13, color: T.text }}>Pesada intermedia · próximas 4 semanas</div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Btn kind="emerald" full size="lg" icon={<I.arrowRight/>} onClick={() => { nav.resetStack(); nav.tabTo('mine'); }}>Ver mi activo</Btn>
          <Btn kind="ghost" full icon={<I.download/>} onClick={() => nav.toast('Comprobante descargado', 'success')}>Descargar comprobante</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SimulatorScreen, InvestFlowScreen, InvestSuccess });
