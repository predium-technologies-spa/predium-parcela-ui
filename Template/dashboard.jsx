// dashboard.jsx — Agent's daily dashboard view
// Uses Shell, Badge, Btn, Icon, ICONS, T from views.jsx (window globals)

function ViewDashboard() {
  const { T, ICONS } = window;

  const Icon = ({ d, size = 14, stroke = 1.5, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );

  const Badge = window.__Badge || (({ tone = 'neutral', children }) => {
    const map = {
      neutral:  { bg: T.chipBg, fg: T.ink2, dot: T.ink4 },
      good:     { bg: T.goodBg, fg: T.good,   dot: T.good },
      warn:     { bg: T.warnBg, fg: T.warn,   dot: T.warn },
      danger:   { bg: T.dangerBg, fg: T.danger, dot: T.danger },
      info:     { bg: T.infoBg, fg: T.info, dot: T.info },
    }[tone];
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: map.bg, color: map.fg,
        padding: '2px 7px', borderRadius: 3,
        fontSize: 11, fontWeight: 500,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: map.dot }} />
        {children}
      </span>
    );
  });

  const Btn = ({ variant = 'primary', icon, children, size = 'md', style = {} }) => {
    const base = {
      display: 'inline-flex', alignItems: 'center', gap: 6,
      border: '1px solid transparent', borderRadius: 6,
      fontFamily: T.sans, fontWeight: 500, cursor: 'pointer',
      padding: size === 'sm' ? '5px 10px' : '7px 12px',
      fontSize: size === 'sm' ? 12 : 13, letterSpacing: -0.05,
    };
    const variants = {
      primary: { background: T.ink, color: '#fff' },
      ghost:   { background: 'transparent', color: T.ink2, border: `1px solid ${T.line}` },
      subtle:  { background: T.chipBg, color: T.ink2 },
    };
    return (
      <button style={{ ...base, ...variants[variant], ...style }}>
        {icon && <Icon d={icon} size={13} />}
        {children}
      </button>
    );
  };

  const Card = ({ title, action, children, style = {} }) => (
    <div style={{
      background: T.surface, border: `1px solid ${T.line}`,
      borderRadius: 6, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', ...style,
    }}>
      {title && (
        <div style={{
          padding: '12px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: `1px solid ${T.lineSoft}`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: -0.1 }}>{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );

  // Sidebar (dashboard active) — inline here to set active=dashboard
  const NavItem = ({ icon, label, active, badge }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 4,
      background: active ? '#EDEAE2' : 'transparent',
      color: active ? T.ink : T.ink2,
      fontSize: 13, fontWeight: active ? 500 : 400,
    }}>
      <Icon d={icon} size={15} stroke={active ? 1.8 : 1.5} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && (
        <span style={{
          fontFamily: T.mono, fontSize: 10, color: T.ink3,
          background: active ? '#fff' : T.chipBg,
          padding: '1px 6px', borderRadius: 3,
        }}>{badge}</span>
      )}
    </div>
  );

  const section = (title, items) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
        color: T.ink4, fontWeight: 500, padding: '0 10px', marginBottom: 6,
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(([k, icon, label, badge, active]) => (
          <NavItem key={k} icon={icon} label={label} active={active} badge={badge} />
        ))}
      </div>
    </div>
  );

  const Sidebar = (
    <div style={{
      width: 240, height: '100%', background: '#FAFAF7',
      borderRight: `1px solid ${T.line}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 16px', borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{
          width: 22, height: 22, background: T.ink, borderRadius: 4,
          display: 'grid', placeItems: 'center', color: '#fff',
          fontFamily: T.mono, fontSize: 12, fontWeight: 600,
        }}>P</div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: -0.1 }}>Parcela</div>
          <div style={{ fontSize: 10, color: T.ink4 }}>Meridian Holdings</div>
        </div>
      </div>
      <div style={{ padding: 12, flex: 1 }}>
        {section('Workspace', [
          ['dashboard', ICONS.dashboard, 'Dashboard', undefined, true],
          ['reports',   ICONS.reports,   'Reports'],
        ])}
        {section('Portfolio', [
          ['property',  ICONS.property,  'Properties', 48],
          ['units',     ICONS.units,     'Units', 312],
          ['tenants',   ICONS.tenants,   'Tenants', 287],
          ['leases',    ICONS.leases,    'Leases', 287],
        ])}
        {section('Operations', [
          ['payments',  ICONS.payments,  'Payments'],
          ['tickets',   ICONS.tickets,   'Work orders', 14],
          ['inspect',   ICONS.inspect,   'Inspections'],
        ])}
        {section('System', [
          ['settings',  ICONS.settings,  'Settings'],
        ])}
      </div>
      <div style={{ padding: 14, borderTop: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.ink3, marginBottom: 6 }}>
          <span>Storage</span><span style={{ fontFamily: T.mono }}>42.1 / 100 GB</span>
        </div>
        <div style={{ height: 3, background: T.chipBg, borderRadius: 2 }}>
          <div style={{ width: '42%', height: '100%', background: T.ink, borderRadius: 2 }}/>
        </div>
      </div>
    </div>
  );

  const TopNav = (
    <div style={{
      height: 56, borderBottom: `1px solid ${T.line}`,
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
      background: T.surface,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <span style={{ color: T.ink3 }}>Workspace</span>
        <Icon d={ICONS.chevronR} size={12} color={T.ink4} />
        <span style={{ color: T.ink, fontWeight: 500 }}>Dashboard</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: T.bg, border: `1px solid ${T.line}`, borderRadius: 6,
        padding: '6px 12px', width: 280, color: T.ink4, fontSize: 13,
      }}>
        <Icon d={ICONS.search} size={14} />
        <span style={{ flex: 1 }}>Find property, tenant, lease…</span>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.ink4, background: '#fff', padding: '1px 5px', borderRadius: 3, border: `1px solid ${T.line}` }}>⌘K</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.ink2 }}>
        <div style={{ padding: 7, position: 'relative' }}>
          <Icon d={ICONS.bell} size={16} />
          <div style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: T.danger, borderRadius: 3, border: `1.5px solid ${T.surface}` }}/>
        </div>
        <div style={{ padding: 7 }}><Icon d={ICONS.calendar} size={16} /></div>
        <div style={{ width: 1, height: 20, background: T.line, margin: '0 4px' }} />
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: '#2E3A2A',
          color: '#fff', display: 'grid', placeItems: 'center',
          fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
        }}>ER</div>
      </div>
    </div>
  );

  // Day in numbers — sparkline tiles
  const Spark = ({ points, color = T.ink, fill }) => {
    const max = Math.max(...points), min = Math.min(...points);
    const range = max - min || 1;
    const pts = points.map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - ((p - min) / range) * 80 - 10;
      return `${x},${y}`;
    }).join(' ');
    const area = `0,100 ${pts} 100,100`;
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 40 }}>
        {fill && <polygon points={area} fill={fill} />}
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  };

  // Today's schedule / agenda items
  const agenda = [
    { time: '09:00', dur: '30m', type: 'Showing', label: 'Unit 4B · Harper Hall', who: 'Prospect: J. Anand', tone: 'info', status: 'confirmed' },
    { time: '10:30', dur: '45m', type: 'Inspection', label: 'Cedar Lofts — annual', who: 'Inspector: K. Fields', tone: 'good', status: 'confirmed' },
    { time: '12:15', dur: '1h',  type: 'Lunch',      label: 'Owner: M. Santoro', who: 'Acquisition review', tone: 'neutral', status: 'confirmed' },
    { time: '14:00', dur: '30m', type: 'Signing',    label: 'Unit 7C lease — M. Delacroix', who: 'Office · Rm 2', tone: 'good', status: 'pending' },
    { time: '15:30', dur: '20m', type: 'Walk-through', label: 'North Ridge — 2 vacant units', who: 'Self', tone: 'neutral', status: 'confirmed' },
    { time: '16:30', dur: '30m', type: 'Call',       label: 'Delinquency — K. Rivera (4B)', who: 'Phone', tone: 'warn', status: 'flagged' },
  ];

  // Pipeline / leads
  const leads = [
    { name: 'J. Anand',     src: 'Website',  unit: 'Harper Hall 4B',  stage: 'Showing',    score: 84, budget: '$2,400' },
    { name: 'P. Okonkwo',   src: 'Referral', unit: 'Cedar Lofts 12',  stage: 'Application',score: 72, budget: '$3,100' },
    { name: 'S. Hoffmann',  src: 'Zillow',   unit: 'Linden Court 3A', stage: 'Qualifying', score: 58, budget: '$1,850' },
    { name: 'N. Barbosa',   src: 'Website',  unit: 'Harper Hall 2C',  stage: 'New',        score: 41, budget: '$2,100' },
  ];

  // Messages
  const messages = [
    { from: 'K. Rivera',      unit: '4B · Harper Hall',   text: 'Sorry for the delay, I can pay Thursday…', time: '08:42', unread: true },
    { from: 'Inspector K.',   unit: 'Cedar Lofts',        text: 'Will arrive 10 min early, bring keys.',      time: '08:15', unread: true },
    { from: 'M. Delacroix',   unit: '7C · Harper Hall',   text: 'Confirmed for signing at 2pm.',              time: '07:58' },
    { from: 'Owner · Santoro',unit: 'Vine & Third',       text: 'Quarterly report attached.',                 time: 'Yesterday' },
  ];

  // Work orders
  const orders = [
    { id: 'T-441', prop: 'Harper Hall',  unit: '2A', issue: 'Leak — kitchen sink',      prio: 'high',   age: '4h'  },
    { id: 'T-438', prop: 'Cedar Lofts',  unit: '12', issue: 'HVAC not heating',         prio: 'high',   age: '1d'  },
    { id: 'T-437', prop: 'Linden Court', unit: '3A', issue: 'Bathroom light flickers',  prio: 'med',    age: '2d'  },
    { id: 'T-432', prop: 'Ashford Row',  unit: '8',  issue: 'Door lock replacement',    prio: 'low',    age: '3d'  },
  ];

  const prioBadge = (p) => ({
    high: <Badge tone="danger">High</Badge>,
    med:  <Badge tone="warn">Medium</Badge>,
    low:  <Badge tone="neutral">Low</Badge>,
  }[p]);

  return (
    <div style={{
      width: '100%', height: '100%', background: T.surface,
      display: 'flex', fontFamily: T.sans, color: T.ink,
      position: 'relative', overflow: 'hidden',
    }}>
      {Sidebar}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {TopNav}
        <div style={{ flex: 1, overflow: 'auto', background: T.bg, padding: '20px 24px 28px' }}>
          {/* Greeting + context */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Sunday · April 19, 2026</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: T.ink, letterSpacing: -0.5 }}>Good morning, Elena.</div>
              <div style={{ fontSize: 13, color: T.ink3, marginTop: 2 }}>
                <b style={{ color: T.ink2 }}>6 events</b> today · <b style={{ color: T.warn }}>3 items need attention</b> · weather <b style={{ color: T.ink2 }}>14°C partly cloudy</b>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="ghost" icon={ICONS.calendar}>Today</Btn>
              <Btn variant="ghost" icon={ICONS.map}>Route</Btn>
              <Btn variant="primary" icon={ICONS.plus}>New activity</Btn>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { k: 'Showings today', v: '4',       sub: '+1 vs. yesterday', spark: [2,3,3,2,4,3,4], tone: 'good' },
              { k: 'Active leads',   v: '23',      sub: '4 new this week',  spark: [18,19,20,21,22,22,23], tone: 'good' },
              { k: 'Rent collected', v: '$118,240',sub: '72% of month',     spark: [40,55,62,68,70,71,72], tone: 'neutral' },
              { k: 'Open tickets',   v: '14',      sub: '2 overdue',        spark: [10,11,13,12,14,15,14], tone: 'warn' },
            ].map(k => (
              <div key={k.k} style={{
                background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
                padding: '12px 14px 6px', display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11, color: T.ink3 }}>{k.k}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, fontFamily: T.mono, letterSpacing: -0.5, marginTop: 2 }}>{k.v}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: k.tone === 'good' ? T.good : k.tone === 'warn' ? T.warn : T.ink3, marginTop: 2 }}>{k.sub}</div>
                <div style={{ marginTop: 4, marginLeft: -4, marginRight: -4 }}>
                  <Spark points={k.spark} color={k.tone === 'warn' ? T.warn : k.tone === 'good' ? T.good : T.ink3} fill={k.tone === 'good' ? T.goodBg : k.tone === 'warn' ? T.warnBg : T.chipBg} />
                </div>
              </div>
            ))}
          </div>

          {/* Main grid: agenda (wide) + side column */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
            {/* Agenda / today's schedule — timeline */}
            <Card
              title="Today's schedule"
              action={
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ display: 'flex', gap: 2, padding: 2, background: T.bg, borderRadius: 5, fontSize: 11 }}>
                    {['Day', 'Week', 'Map'].map((t, i) => (
                      <span key={t} style={{
                        padding: '3px 9px',
                        background: i === 0 ? T.surface : 'transparent',
                        color: i === 0 ? T.ink : T.ink3,
                        fontWeight: i === 0 ? 500 : 400,
                        borderRadius: 4, boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {agenda.map((a, i) => {
                  const now = i === 2; // "current" position between items 1 and 2
                  return (
                    <React.Fragment key={i}>
                      {now && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 16px', position: 'relative' }}>
                          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.danger, fontWeight: 500, width: 52 }}>NOW 11:42</span>
                          <div style={{ flex: 1, height: 1, background: T.danger, opacity: 0.5 }} />
                          <div style={{ width: 6, height: 6, borderRadius: 3, background: T.danger }} />
                        </div>
                      )}
                      <div style={{
                        display: 'flex', alignItems: 'stretch', gap: 14,
                        padding: '12px 16px',
                        borderBottom: i < agenda.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                        background: i === 1 ? '#FAF8F2' : 'transparent',
                      }}>
                        <div style={{ width: 52, flexShrink: 0 }}>
                          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink, fontWeight: 500 }}>{a.time}</div>
                          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.ink4 }}>{a.dur}</div>
                        </div>
                        <div style={{
                          width: 3, borderRadius: 2, flexShrink: 0,
                          background: a.tone === 'info' ? T.info : a.tone === 'good' ? T.good : a.tone === 'warn' ? T.warn : T.ink4,
                        }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase', color: T.ink3, fontWeight: 500 }}>{a.type}</span>
                            {a.status === 'flagged' && <Badge tone="warn">Follow-up</Badge>}
                            {a.status === 'pending' && <Badge tone="neutral">Pending</Badge>}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, marginTop: 2 }}>{a.label}</div>
                          <div style={{ fontSize: 11, color: T.ink3 }}>{a.who}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                          <Icon d={ICONS.chevronR} size={14} color={T.ink4} />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>

            {/* Side column: tasks + messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card title="Tasks" action={<span style={{ fontSize: 11, color: T.ink3 }}>3 of 7 done</span>}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { done: true,  t: 'Send lease docs to M. Delacroix', when: '08:00' },
                    { done: true,  t: 'Prepare showing kit — Harper 4B',  when: '08:30' },
                    { done: true,  t: 'Confirm inspector arrival',        when: '09:15' },
                    { done: false, t: 'Follow up: K. Rivera payment plan', when: 'Due 16:30', urgent: true },
                    { done: false, t: 'Upload signed counteroffer — Linden', when: 'Today' },
                    { done: false, t: 'Review comp report — Market Sq', when: 'Today' },
                    { done: false, t: 'Invoice Oakline owner — April', when: 'Tomorrow' },
                  ].map((t, i, a) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px',
                      borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                    }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: 3,
                        border: `1.5px solid ${t.done ? T.good : T.ink4}`,
                        background: t.done ? T.good : 'transparent',
                        display: 'grid', placeItems: 'center',
                      }}>
                        {t.done && <Icon d={ICONS.check} size={9} color="#fff" stroke={2.5}/>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, color: t.done ? T.ink3 : T.ink, textDecoration: t.done ? 'line-through' : 'none', fontWeight: t.done ? 400 : 500 }}>{t.t}</div>
                      </div>
                      <span style={{ fontFamily: T.mono, fontSize: 10, color: t.urgent ? T.warn : T.ink4 }}>{t.when}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Messages" action={<span style={{ fontSize: 11, color: T.warn, fontWeight: 500 }}>2 unread</span>}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {messages.map((m, i, a) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, padding: '10px 14px',
                      borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                      background: m.unread ? '#FAF8F2' : 'transparent',
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                        background: T.chipBg, color: T.ink2,
                        display: 'grid', placeItems: 'center',
                        fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
                      }}>{m.from.split(/[ .]/).filter(Boolean).slice(0,2).map(s=>s[0]).join('')}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ fontSize: 12, fontWeight: m.unread ? 600 : 500, color: T.ink }}>{m.from}</div>
                          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.ink4 }}>{m.time}</div>
                        </div>
                        <div style={{ fontSize: 11, color: T.ink3 }}>{m.unit}</div>
                        <div style={{ fontSize: 12, color: T.ink2, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.text}</div>
                      </div>
                      {m.unread && <div style={{ width: 6, height: 6, borderRadius: 3, background: T.info, marginTop: 6 }}/>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom row: pipeline + work orders + attention */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: 12 }}>
            <Card title="Lead pipeline" action={<Btn variant="ghost" size="sm">View all 23</Btn>}>
              {/* Stage bar */}
              <div style={{ display: 'flex', padding: '12px 16px', gap: 4 }}>
                {[
                  ['New', 7, T.ink4],
                  ['Qualifying', 6, T.info],
                  ['Showing', 5, T.info],
                  ['Application', 3, T.good],
                  ['Signed', 2, T.good],
                ].map(([l, n, c]) => (
                  <div key={l} style={{ flex: n, minWidth: 30 }}>
                    <div style={{ height: 6, background: c, borderRadius: 2, opacity: 0.7 }} />
                    <div style={{ fontSize: 10, color: T.ink3, marginTop: 4, letterSpacing: 0.3 }}>{l} <span style={{ fontFamily: T.mono, color: T.ink2 }}>{n}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${T.lineSoft}` }}>
                {leads.map((l, i, a) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px',
                    borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                      background: T.chipBg, color: T.ink2,
                      display: 'grid', placeItems: 'center',
                      fontSize: 10, fontWeight: 600,
                    }}>{l.name.split(/[ .]/).filter(Boolean).slice(0,2).map(s=>s[0]).join('')}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: T.ink }}>{l.name} <span style={{ color: T.ink4, fontWeight: 400 }}>· {l.src}</span></div>
                      <div style={{ fontSize: 11, color: T.ink3 }}>{l.unit}</div>
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink2, width: 60, textAlign: 'right' }}>{l.budget}</div>
                    <div style={{ width: 90 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.ink3, marginBottom: 3 }}>
                        <span>{l.stage}</span><span style={{ fontFamily: T.mono, color: T.ink2 }}>{l.score}</span>
                      </div>
                      <div style={{ height: 3, background: T.chipBg, borderRadius: 2 }}>
                        <div style={{ width: `${l.score}%`, height: '100%', background: l.score >= 70 ? T.good : l.score >= 50 ? T.warn : T.ink4, borderRadius: 2 }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Open work orders" action={<Btn variant="ghost" size="sm">All 14</Btn>}>
              <div>
                {orders.map((o, i, a) => (
                  <div key={o.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '11px 16px',
                    borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.ink3 }}>{o.id}</span>
                        <span style={{ color: T.line }}>·</span>
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.ink }}>{o.prop} {o.unit}</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.ink3, marginTop: 2 }}>{o.issue}</div>
                    </div>
                    <span style={{ fontFamily: T.mono, fontSize: 10, color: T.ink4, width: 28, textAlign: 'right' }}>{o.age}</span>
                    {prioBadge(o.prio)}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Needs attention">
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { tone: 'danger', t: '2 overdue inspections', sub: 'Cedar Lofts · Harper Hall', act: 'Reschedule' },
                  { tone: 'warn',   t: 'Rent 7+ days late',     sub: '3 tenants · $4,820',         act: 'Contact' },
                  { tone: 'info',   t: 'Lease expiring <30d',   sub: '5 leases — send renewals',   act: 'Review' },
                  { tone: 'neutral',t: 'Docs missing',          sub: 'Oakline onboarding · 4 items', act: 'Upload' },
                ].map((n, i) => {
                  const c = n.tone === 'danger' ? T.danger : n.tone === 'warn' ? T.warn : n.tone === 'info' ? T.info : T.ink3;
                  const bg = n.tone === 'danger' ? T.dangerBg : n.tone === 'warn' ? T.warnBg : n.tone === 'info' ? T.infoBg : T.chipBg;
                  return (
                    <div key={i} style={{
                      display: 'flex', gap: 10, padding: 10,
                      background: bg, borderRadius: 5, alignItems: 'flex-start',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: c, marginTop: 6, flexShrink: 0 }}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: c }}>{n.t}</div>
                        <div style={{ fontSize: 11, color: T.ink2, marginTop: 2 }}>{n.sub}</div>
                      </div>
                      <span style={{ fontSize: 11, color: c, fontWeight: 500, whiteSpace: 'nowrap' }}>{n.act} →</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ViewDashboard });
