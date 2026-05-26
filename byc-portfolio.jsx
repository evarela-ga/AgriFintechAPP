/* BeefYield Capital — My Assets, Detail, Passport, Map */
/* eslint-disable */

// ============ MY ASSETS ============
function MyAssetsScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const p = usePortfolio();
  const [filter, setFilter] = React.useState('Todos');

  if (!p.hasInvestments) return <MyAssetsEmpty/>;

  const filters = [
    { id: 'Todos', match: () => true },
    { id: 'Activos', match: a => a.status === 'En engorde' },
    { id: 'Pre-liq.', match: a => a.status === 'Pre-liquidación' },
    { id: 'Liquidados', match: a => a.status === 'Liquidado' },
    { id: 'Mayor rend.', match: () => true, sort: (a, b) => b.ret - a.ret },
    { id: 'Menor riesgo', match: () => true, sort: (a, b) => b.conf - a.conf },
  ];
  const f = filters.find(x => x.id === filter);
  let list = state.assets.filter(f.match);
  if (f.sort) list = [...list].sort(f.sort);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <div style={{ padding: '58px 20px 14px' }}>
        <div style={{ fontSize: 12, color: T.text3, fontWeight: 600 }}>{p.active} lotes activos · {p.total - p.active} liquidado{p.total - p.active !== 1 ? 's' : ''}</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>Mis Activos</div>
      </div>

      <div style={{ padding: '0 20px 14px' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>VALOR TOTAL ESTIMADO</div>
              <MoneyBig value={p.value.toLocaleString('es-AR')} size={28}/>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 12, color: '#00A878', fontWeight: 700 }}>
                <I.trend style={{ width: 12, height: 12 }}/>+USD {(p.value - p.invested).toLocaleString('es-AR')} · +{p.ret.toFixed(1)}%
              </div>
            </div>
            <ProgressRing value={87} size={62} stroke={6} color="#00C896" track={T.dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,51,0.08)'}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>87%</div>
                <div style={{ fontSize: 8, color: T.text3 }}>TRAZAB.</div>
              </div>
            </ProgressRing>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, paddingTop: 12, marginTop: 12, borderTop: `1px dashed ${T.line2}` }}>
            <Stat label="Capital" value={`USD ${p.invested.toLocaleString('es-AR')}`}/>
            <Stat label="Tokens" value={p.tokens.toLocaleString('es-AR')}/>
            <Stat label="Próx. liq." value="15 sep"/>
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 0 14px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 20px' }}>
          {filters.map(f => <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.id}</Chip>)}
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(a => <AssetRow key={a.id} a={a} onClick={() => nav.push('asset', { id: a.id })}/>)}
      </div>
    </div>
  );
}

function MyAssetsEmpty() {
  const T = useTheme();
  const nav = useNav();
  const { dispatch } = useStore();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, background: T.bg, color: T.text }}>
      <StatusBar darkText={T.dark}/>
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, margin: '0 auto 20px', borderRadius: 99, background: T.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text3 }}>
          <I.wallet style={{ width: 44, height: 44 }}/>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, marginBottom: 8 }}>
          Todavía no tenés activos ganaderos.
        </div>
        <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.5, maxWidth: 290, margin: '0 auto 24px' }}>
          Explorá oportunidades, usá el simulador y conocé cómo funciona antes de invertir.
        </div>
        <Btn kind="emerald" full size="lg" icon={<I.spark/>} onClick={() => nav.tabTo('opp')}>Ver oportunidades</Btn>
      </div>
    </div>
  );
}

function AssetRow({ a, onClick }) {
  const T = useTheme();
  const isLiq = a.status === 'Liquidado';
  const isPre = a.status === 'Pre-liquidación';
  return (
    <button onClick={onClick} style={{ background: T.card, borderRadius: 18, border: `1px solid ${T.line}`, padding: 14, display: 'flex', gap: 12, boxShadow: T.dark ? 'none' : '0 1px 2px rgba(11,31,51,0.04)', width: '100%', textAlign: 'left', cursor: 'pointer', color: T.text, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0, overflow: 'hidden' }}>
        <ImagePh tone={a.tone} label="" height={64}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{a.name}</div>
            <div style={{ fontSize: 11, color: T.text3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.sub}</div>
          </div>
          <Badge tone={isLiq ? 'gold' : isPre ? 'cyan' : 'emerald'}>{a.status}</Badge>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, alignItems: 'baseline' }}>
          <div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 800, color: T.text }}>USD {a.value.toLocaleString('es-AR')}</div>
            <div style={{ fontSize: 11, color: T.text3 }}>de USD {a.invested.toLocaleString('es-AR')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#00A878' }} className="mono">+{a.partial}%</div>
            <div style={{ fontSize: 10, color: T.text3 }}>parcial · proy. +{a.ret}%</div>
          </div>
        </div>

        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ProgressBar value={a.progress} color={isLiq ? '#F5A524' : isPre ? '#38BDF8' : '#00C896'} height={5} track={T.dark ? '#16324A' : '#E4ECF3'}/>
          <div style={{ fontSize: 10, color: T.text3, fontWeight: 600, whiteSpace: 'nowrap' }} className="mono">{a.progress}%</div>
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: T.text3, display: 'flex', justifyContent: 'space-between' }}>
          <span>{isLiq ? 'Liquidado' : isPre ? `Liquidación en ${a.daysLeft}d` : `${a.daysLeft}d restantes`}</span>
          <span style={{ color: '#00A878' }}>Confianza {a.conf}/100</span>
        </div>
      </div>
    </button>
  );
}

// ============ ASSET DETAIL ============
function AssetDetailScreen({ id }) {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const a = state.assets.find(x => x.id === id);
  const [tab, setTab] = React.useState('Resumen');
  if (!a) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, color: T.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ position: 'relative', height: 220 }}>
        <ImagePh tone={a.tone} label={`${a.name.toLowerCase()} · ${a.sub.toLowerCase()}`} height={220} style={{ borderRadius: 0 }}/>
        <StatusBar darkText/>
        <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => nav.pop()} style={glassBtn}><I.chevL/></button>
          <button onClick={() => nav.toast('Enlace copiado', 'success')} style={glassBtn}><I.share/></button>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 20, right: 20, color: '#fff' }}>
          <Badge tone="emerald" soft={false} style={{ marginBottom: 6 }}><I.shield style={{ width: 10, height: 10 }}/>Trazabilidad validada</Badge>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>{a.name}</div>
          <div style={{ fontSize: 12, color: '#CBD5E1' }}>{a.sub}</div>
        </div>
      </div>

      <div style={{ padding: 20, marginTop: -22, position: 'relative' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>VALOR ACTUAL ESTIMADO</div>
              <MoneyBig value={a.value.toLocaleString('es-AR')} size={32}/>
              <div style={{ fontSize: 12, color: T.text3, marginTop: 2 }}>de USD {a.invested.toLocaleString('es-AR')} invertidos</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Badge tone="emerald" soft={false}>+{a.partial}%</Badge>
              <div style={{ marginTop: 6, fontSize: 11, color: T.text3 }}>Proyectado</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, color: '#00A878' }}>+{a.ret}%</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, padding: '14px 0', borderTop: `1px solid ${T.line}` }}>
            <div>
              <div style={{ fontSize: 11, color: T.text3, fontWeight: 600 }}>PROGRESO DEL CICLO</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800 }}>{a.progress}% <span style={{ fontSize: 12, color: T.text3, fontWeight: 600 }}>· {a.daysLeft}d restantes</span></div>
            </div>
            <ProgressRing value={a.progress} size={50} stroke={5} color="#00C896" track={T.dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,31,51,0.08)'}>
              <span style={{ fontSize: 11, fontWeight: 800, color: T.text }}>{a.progress}%</span>
            </ProgressRing>
          </div>
          <ProgressBar value={a.progress} color="#00C896" track={T.dark ? '#16324A' : '#E4ECF3'}/>
        </Card>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { v: 91, l: 'Sanitario', c: '#00A878' },
          { v: 88, l: 'Bienestar', c: '#38BDF8' },
          { v: a.conf, l: 'Confianza', c: '#00A878' },
          { v: 87, l: 'Trazab.', c: '#7C3AED' },
        ].map((m, i) => (
          <Card pad={10} key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 800, color: m.c }}>{m.v}</div>
            <div style={{ fontSize: 10, color: T.text3, fontWeight: 600 }}>{m.l}</div>
          </Card>
        ))}
      </div>

      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {['Resumen', 'Evolución', 'Trazabilidad', 'Sanidad', 'Documentos', 'AgroAI'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 12px', borderRadius: 99, border: 'none',
            background: tab === t ? T.text : 'transparent',
            color: tab === t ? T.bg : T.text2,
            fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 20px 14px' }}>
        <AssetTabContent tab={tab} a={a}/>
      </div>

      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 800, marginBottom: 10 }}>Más detalle</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <NavTile icon={<I.qr/>} title="Pasaporte Digital" sub="ID, historial y hash" onClick={() => nav.push('passport', { id: a.id })}/>
          <NavTile icon={<I.layer/>} title="Trazabilidad" sub="18 eventos validados" tone="#7C3AED" onClick={() => nav.push('passport', { id: a.id, anchor: 'timeline' })}/>
          <NavTile icon={<I.pin/>} title="Mapa" sub="Ver ubicación" tone="#F5A524" onClick={() => { nav.popTo(); nav.tabTo('map'); }}/>
          <NavTile icon={<I.bot/>} title="Preguntar a AgroAI" sub="Sobre este lote" tone="#38BDF8" onClick={() => { nav.popTo(); nav.tabTo('ai'); }}/>
        </div>
      </div>
    </div>
  );
}

function AssetTabContent({ tab, a }) {
  const T = useTheme();
  if (tab === 'Resumen') return (
    <Card pad={16}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, marginBottom: 10 }}>RESUMEN</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KVRow k="Tokens" v={`${a.tokens.toLocaleString('es-AR')} BYC`}/>
        <KVRow k="Riesgo" v={a.risk}/>
        <KVRow k="Estado" v={a.status}/>
        <KVRow k="Cierre est." v={a.daysLeft > 0 ? `+${a.daysLeft}d` : 'Liquidado'}/>
      </div>
    </Card>
  );
  if (tab === 'Evolución') return (
    <Card pad={16}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Evolución productiva</div>
      </div>
      <Spark data={[280, 283, 287, 292, 296, 300, 305, 310, 314, 318, 322, 326, 329]} color="#00C896" w={310} h={70}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: T.text3 }}>
        <span>Peso medio <b style={{ color: T.text }} className="mono">329 kg</b></span>
        <span>GDP <b style={{ color: '#00A878' }} className="mono">1,08 kg/d</b></span>
      </div>
    </Card>
  );
  if (tab === 'Trazabilidad') return (
    <Card pad={16}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, marginBottom: 10 }}>ÚLTIMOS EVENTOS</div>
      {['Pesada intermedia · 312 kg', 'Vacunación · IBR/BVD', 'Plan alimenticio aprobado', 'Ingreso al feedlot'].map((e, i, ar) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < ar.length - 1 ? `1px solid ${T.line}` : 'none' }}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: '#00C896', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.check style={{ width: 12, height: 12 }}/></div>
          <div style={{ fontSize: 13, color: T.text, flex: 1 }}>{e}</div>
        </div>
      ))}
    </Card>
  );
  if (tab === 'Sanidad') return (
    <Card pad={16}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <KVRow k="Mortalidad" v="0,7%"/>
        <KVRow k="Cobertura vacunal" v="96%"/>
        <KVRow k="En observación" v="2 animales"/>
        <KVRow k="Casos críticos" v="0"/>
      </div>
    </Card>
  );
  if (tab === 'Documentos') return (
    <Card pad={12}>
      {['Reporte mensual · Ago', 'Control sanitario · 25 ago', 'Pesada intermedia', 'Trazabilidad validada'].map((d, i, ar) => (
        <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < ar.length - 1 ? `1px solid ${T.line}` : 'none' }}>
          <I.file style={{ color: T.text3 }}/>
          <div style={{ flex: 1, fontSize: 13, color: T.text }}>{d}</div>
          <I.download style={{ color: T.text3 }}/>
        </div>
      ))}
    </Card>
  );
  if (tab === 'AgroAI') return (
    <Card pad={14} style={{ background: T.dark ? '#0C4A6E' : 'linear-gradient(135deg, rgba(56,189,248,0.08), #fff)', border: '1px solid rgba(56,189,248,0.3)' }}>
      <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>
        Tu lote rinde <b style={{ color: '#00A878' }}>+{a.partial}%</b> y está al <b>{a.progress}%</b> del ciclo. La curva va sobre la proyección base.
      </div>
    </Card>
  );
}

function NavTile({ icon, title, sub, tone = '#0B1F33', onClick }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 14, padding: 12, textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Inter, sans-serif', color: T.text }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: tone + '15', color: tone, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 11, color: T.text3 }}>{sub}</div>
      </div>
    </button>
  );
}

// ============ PASSPORT ============
const PASSPORT_EVENTS = [
  { d: '18 ago', t: 'Ingreso al feedlot', who: 'Operador · Marcelo R.', ev: 'Foto + Doc', status: 'ok' },
  { d: '18 ago', t: 'Pesada inicial · 280 kg', who: 'Veterinario · Dra. Cárdenas', ev: 'Pesaje certificado', status: 'ok' },
  { d: '19 ago', t: 'Asignación corral 12', who: 'Operador', ev: 'Registro interno', status: 'ok' },
  { d: '20 ago', t: 'Plan alimenticio aprobado', who: 'Nutricionista', ev: 'Documento técnico', status: 'ok' },
  { d: '25 ago', t: 'Vacunación · IBR/BVD', who: 'Veterinario', ev: 'Certificado SENASA', status: 'ok' },
  { d: '8 sep', t: 'Pesada intermedia · 312 kg', who: 'Veterinario', ev: 'Pesaje certificado', status: 'ok' },
  { d: '15 sep', t: 'Control sanitario rutinario', who: 'Veterinario', ev: 'En proceso', status: 'now' },
  { d: '—', t: 'Próximo: terminación', who: 'Pendiente', ev: '-', status: 'pending' },
];

function PassportScreen({ id }) {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const a = state.assets.find(x => x.id === id) || state.assets[0];
  if (!a) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 40, background: '#06121F', color: '#F8FAFC' }}>
      <StatusBar darkText/>
      <div style={{ padding: '58px 20px 18px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -50, right: -40, width: 200, height: 200, borderRadius: 999, background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)', filter: 'blur(20px)' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, position: 'relative' }}>
          <button onClick={() => nav.pop()} style={darkIconBtn}><I.chevL/></button>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.8 }}>PASAPORTE DIGITAL</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#F8FAFC', letterSpacing: -0.6 }}>{a.name}</div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #102A43 0%, #0B1F33 100%)',
          border: '1px solid rgba(56,189,248,0.2)',
          borderRadius: 22, padding: 18, color: '#F8FAFC', position: 'relative', overflow: 'hidden', marginTop: 8,
        }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05, fontSize: 120, fontWeight: 900, fontFamily: 'Manrope, sans-serif' }}>BYC</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, position: 'relative' }}>
            <div>
              <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 1 }}>ID DEL LOTE</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>BYC-{a.oppId.toUpperCase()}-2025</div>
            </div>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: '#F8FAFC', padding: 6 }}>
              <QRGlyph2/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <PK k="Animales" v="128 Angus"/>
            <PK k="Origen" v="La Pampa"/>
            <PK k="Peso inicial" v="280 kg"/>
            <PK k="Peso actual" v="329 kg"/>
            <PK k="Peso objetivo" v="430 kg"/>
            <PK k="GDP" v="1,08 kg/d"/>
            <PK k="Operador" v="Marcelo R."/>
            <PK k="Veterinario" v="Dra. Cárdenas"/>
          </div>
          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', marginTop: 14, paddingTop: 12 }}>
            <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 0.5 }}>SMART CONTRACT</div>
            <div className="mono" style={{ fontSize: 11, color: '#38BDF8', marginTop: 2, wordBreak: 'break-all' }}>
              0x4f3aE7…9c2B · BYC.feedlot.angus.v1
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 0.5, marginTop: 8 }}>HASH BLOCKCHAIN</div>
            <div className="mono" style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, wordBreak: 'break-all' }}>
              0x7b9a4c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
            <Badge tone="emerald" soft={false}>Sanitario 91</Badge>
            <Badge tone="cyan" soft={false}>Bienestar 88</Badge>
            <Badge tone="violet" soft={false}>Trazab. 87</Badge>
            <Badge tone="gold" soft={false}>Confianza {a.conf}</Badge>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 20px' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 800, color: '#F8FAFC', marginBottom: 14 }}>Línea de tiempo</div>
        <div style={{ position: 'relative', paddingLeft: 22 }}>
          <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, #00C896, #38BDF8, rgba(255,255,255,0.1))' }}/>
          {PASSPORT_EVENTS.map((e, i) => (
            <button key={i} onClick={() => nav.sheet({ name: 'event', props: { event: e } })} style={{ position: 'relative', paddingBottom: 12, background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', display: 'block' }}>
              <div style={{
                position: 'absolute', left: -18, top: 4, width: 15, height: 15, borderRadius: 99,
                background: e.status === 'ok' ? '#00C896' : e.status === 'now' ? '#38BDF8' : 'rgba(255,255,255,0.08)',
                border: e.status === 'now' ? '2px solid #38BDF8' : 'none',
                boxShadow: e.status === 'now' ? '0 0 0 4px rgba(56,189,248,0.2)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {e.status === 'ok' && <I.check style={{ width: 9, height: 9, color: '#06121F' }}/>}
              </div>
              <div style={{ background: '#0B1F33', border: '1px solid #16324A', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC', flex: 1 }}>{e.t}</div>
                  <div className="mono" style={{ fontSize: 10, color: '#94A3B8' }}>{e.d}</div>
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{e.who}</div>
                {e.status === 'ok' && (
                  <div className="mono" style={{ marginTop: 6, fontSize: 9, color: '#00C896', letterSpacing: 0.3 }}>
                    ✓ hash 0x{(Math.random().toString(16).slice(2, 12))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PK({ k, v }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 0.4 }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC', marginTop: 1 }}>{v}</div>
    </div>
  );
}

function QRGlyph2() {
  const cells = [];
  const m = 7;
  for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
    const corner = (x < 2 && y < 2) || (x > m - 3 && y < 2) || (x < 2 && y > m - 3);
    const inner = (x === 0 || x === m - 1 || y === 0 || y === m - 1) ? false : ((x + y) % 2 === 0);
    if (corner || inner) cells.push([x, y]);
  }
  return (
    <svg viewBox={`0 0 ${m} ${m}`} width="100%" height="100%">
      {cells.map(([x, y], i) => <rect key={i} x={x} y={y} width="1" height="1" fill="#06121F"/>)}
    </svg>
  );
}

// Event sheet
registerSheet('event', ({ event }) => {
  const T = useTheme();
  return (
    <div style={{ padding: '0 20px 10px' }}>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{event.t}</div>
      <div style={{ fontSize: 12, color: T.text3 }}>{event.d} · {event.who}</div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KVRow k="Estado" v={event.status === 'ok' ? 'Validado ✓' : event.status === 'now' ? 'En proceso' : 'Pendiente'}/>
        <KVRow k="Evidencia" v={event.ev}/>
        <KVRow k="Responsable" v={event.who.split('·')[0].trim()}/>
        <KVRow k="Hash" v="0x7b9a…1c2d"/>
      </div>
      {event.status === 'ok' && (
        <div style={{ marginTop: 14, padding: 12, background: T.card2, borderRadius: 12 }}>
          <div style={{ fontSize: 11, color: T.text3, marginBottom: 4 }}>VERIFICACIÓN BLOCKCHAIN</div>
          <div className="mono" style={{ fontSize: 10, color: '#00A878', wordBreak: 'break-all' }}>0x7b9a4c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b</div>
        </div>
      )}
    </div>
  );
});

// ============ MAP ============
function MapScreen() {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const [layer, setLayer] = React.useState('Mis activos');

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <StatusBar darkText/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0F3055 0%, #134E4A 50%, #0B1F33 100%)' }}/>
      <svg viewBox="0 0 390 844" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M40 200 Q 120 180 180 220 T 350 240 L 360 300 Q 250 320 180 290 T 30 310 Z" fill="rgba(0,168,120,0.18)" stroke="rgba(0,200,150,0.4)" strokeWidth="0.5"/>
        <path d="M80 350 Q 160 330 230 360 T 360 400 L 370 480 Q 240 470 170 450 T 60 460 Z" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5"/>
        <path d="M30 540 Q 120 520 200 560 T 360 600 L 360 700 Q 230 680 150 660 T 30 680 Z" fill="rgba(245,165,36,0.1)" stroke="rgba(245,165,36,0.25)" strokeWidth="0.5"/>
        {Array.from({ length: 12 }, (_, i) => <line key={'h' + i} x1="0" y1={i * 80} x2="390" y2={i * 80} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
        {Array.from({ length: 7 }, (_, i) => <line key={'v' + i} x1={i * 65} y1="0" x2={i * 65} y2="844" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
        <path d="M120 280 Q 200 380, 260 450 T 320 620" stroke="#00C896" strokeWidth="2" strokeDasharray="4 4" fill="none"/>

        {/* port */}
        <g><rect x="335" y="690" width="22" height="22" rx="6" fill="#0B1F33" stroke="#38BDF8" strokeWidth="1.5"/><text x="346" y="705" fontSize="10" textAnchor="middle" fill="#38BDF8" fontWeight="800">⚓</text></g>
      </svg>

      {/* clickable pins */}
      {state.assets.length > 0 && state.assets.slice(0, 4).map((a, i) => {
        const positions = [
          { x: 120, y: 280, c: '#00C896' },
          { x: 200, y: 390, c: '#38BDF8' },
          { x: 280, y: 510, c: '#7C3AED' },
          { x: 320, y: 620, c: '#F5A524' },
        ];
        const p = positions[i];
        return (
          <button key={a.id} onClick={() => nav.sheet({ name: 'asset-pin', props: { id: a.id } })} style={{
            position: 'absolute', left: p.x - 16, top: p.y - 16, width: 32, height: 32, borderRadius: 99,
            background: p.c, border: 'none', cursor: 'pointer', color: '#06121F',
            fontWeight: 800, fontSize: 12,
            boxShadow: `0 0 0 8px ${p.c}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{i + 1}</button>
        );
      })}

      {/* top bar */}
      <div style={{ position: 'absolute', top: 50, left: 16, right: 16, display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <I.search style={{ color: '#8497AE' }}/>
          <span style={{ fontSize: 13, color: '#8497AE' }}>Buscar lote, feedlot…</span>
        </div>
        <button style={glassBtn}><I.layer/></button>
      </div>

      {/* legend chips */}
      <div style={{ position: 'absolute', top: 110, left: 16, right: 16, display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          { l: 'Mis activos', c: '#00C896', n: state.assets.length },
          { l: 'Feedlot', c: '#38BDF8', n: 3 },
          { l: 'Origen', c: '#7C3AED', n: 2 },
          { l: 'Frigorífico', c: '#F5A524', n: 1 },
          { l: 'Puerto', c: '#0284C7', n: 1 },
        ].map(it => (
          <button key={it.l} onClick={() => setLayer(it.l)} style={{ flexShrink: 0, background: layer === it.l ? '#fff' : 'rgba(11,31,51,0.85)', backdropFilter: 'blur(10px)', borderRadius: 99, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${layer === it.l ? 'transparent' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer' }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: it.c }}/>
            <span style={{ fontSize: 11, color: layer === it.l ? '#0B1F33' : '#F8FAFC', fontWeight: 600 }}>{it.l}</span>
            <span style={{ fontSize: 10, color: layer === it.l ? '#8497AE' : '#94A3B8' }}>{it.n}</span>
          </button>
        ))}
      </div>

      <div style={{ position: 'absolute', right: 16, bottom: 140, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button style={{ ...glassBtn, width: 42, height: 42 }}><I.pin/></button>
        <button style={{ ...glassBtn, width: 42, height: 42 }}><I.plus/></button>
      </div>

      {state.assets.length === 0 && (
        <div style={{ position: 'absolute', bottom: 140, left: 20, right: 20, padding: 16, background: 'rgba(11,31,51,0.85)', backdropFilter: 'blur(10px)', borderRadius: 16, color: '#F8FAFC', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Tu mapa está vacío</div>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>Cuando invertís en un lote, aparece su feedlot y ruta logística.</div>
        </div>
      )}
    </div>
  );
}

registerSheet('asset-pin', ({ id }) => {
  const { state } = useStore();
  const nav = useNav();
  const T = useTheme();
  const a = state.assets.find(x => x.id === id);
  if (!a) return null;
  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 60, height: 60, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}><ImagePh tone={a.tone} label="" height={60}/></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{a.name}</div>
            <Badge tone="emerald">{a.status}</Badge>
          </div>
          <div style={{ fontSize: 11, color: T.text3 }}>{a.sub}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 11 }}>
            <span><b className="mono">USD {a.value.toLocaleString('es-AR')}</b> <span style={{ color: T.text3 }}>valor</span></span>
            <span style={{ color: '#00A878' }}>+{a.partial}%</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, padding: '12px 0', borderTop: `1px dashed ${T.line2}`, borderBottom: `1px dashed ${T.line2}`, margin: '12px 0' }}>
        <Stat label="Confianza" value={a.conf}/>
        <Stat label="Sanitario" value="91"/>
        <Stat label="Riesgo" value={<span style={{ color: '#00B8D9' }}>{a.risk}</span>}/>
        <Stat label="Liq." value={a.daysLeft > 0 ? `+${a.daysLeft}d` : 'Liq.'}/>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Btn kind="ghost" icon={<I.qr/>} onClick={() => { nav.sheet(null); nav.push('passport', { id: a.id }); }}>Pasaporte</Btn>
        <Btn kind="primary" full icon={<I.arrowRight/>} onClick={() => { nav.sheet(null); nav.push('asset', { id: a.id }); }}>Ver activo</Btn>
      </div>
    </div>
  );
});

Object.assign(window, { MyAssetsScreen, AssetDetailScreen, PassportScreen, MapScreen });
