// views.jsx — Parcela property management system — 5 views

// ─────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────
const T = {
  bg:       '#FAFAF7',
  surface:  '#FFFFFF',
  ink:      '#17140F',
  ink2:     '#3A3631',
  ink3:     '#6E6A63',
  ink4:     '#9C978F',
  line:     '#E8E5DE',
  lineSoft: '#F0EDE6',
  chipBg:   '#F3F1EB',
  accent:   '#17140F', // primary = near-black
  good:     '#5A6B3E', // olive
  goodBg:   '#EEF0E5',
  warn:     '#8A6A1F',
  warnBg:   '#F5EDD9',
  danger:   '#8B3A2E',
  dangerBg: '#F5E3DE',
  info:     '#34495E',
  infoBg:   '#E6EAEE',
  mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

// ─────────────────────────────────────────────────────────────
// Tiny primitives
// ─────────────────────────────────────────────────────────────
const Icon = ({ d, size = 14, stroke = 1.5, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard: 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z',
  property:  'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 12h.01M15 12h.01',
  units:     'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  tenants:   'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  leases:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  payments:  'M2 9h20M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2M2 9v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9M6 15h4',
  tickets:   'M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8M16 14l2 2 4-4',
  inspect:   'M21 21l-6-6M10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
  reports:   'M3 3v18h18M7 14l4-4 4 4 5-5',
  settings:  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  search:    'M21 21l-6-6M10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
  bell:      'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  plus:      'M12 5v14M5 12h14',
  chevronD:  'M6 9l6 6 6-6',
  chevronR:  'M9 6l6 6-6 6',
  close:     'M18 6L6 18M6 6l12 12',
  filter:    'M22 3H2l8 9.46V19l4 2v-8.54z',
  sort:      'M3 6h18M6 12h12M10 18h4',
  more:      'M12 5v.01M12 12v.01M12 19v.01',
  edit:      'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z',
  download:  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  upload:    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  check:     'M20 6L9 17l-5-5',
  warn:      'M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
  map:       'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4zM8 2v16M16 6v16',
  calendar:  'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18',
  home:      'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
  key:       'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
  doc:       'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
  building:  'M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1',
};

// ─────────────────────────────────────────────────────────────
// App Shell — left module rail + top nav
// ─────────────────────────────────────────────────────────────
function NavItem({ icon, label, active, badge }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 4,
      background: active ? '#EDEAE2' : 'transparent',
      color: active ? T.ink : T.ink2,
      fontSize: 13, fontWeight: active ? 500 : 400,
      cursor: 'pointer', letterSpacing: -0.05,
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
}

function Sidebar({ active = 'property' }) {
  const section = (title, items) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
        color: T.ink4, fontWeight: 500, padding: '0 10px', marginBottom: 6,
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(([k, icon, label, badge]) => (
          <NavItem key={k} icon={icon} label={label} active={active === k} badge={badge} />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      width: 240, height: '100%', background: '#FAFAF7',
      borderRight: `1px solid ${T.line}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Brand */}
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

      <div style={{ padding: 12, flex: 1, overflow: 'hidden' }}>
        {section('Workspace', [
          ['dashboard', ICONS.dashboard, 'Dashboard'],
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

      {/* Storage footer */}
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
}

function TopNav({ breadcrumb, search = true }) {
  return (
    <div style={{
      height: 56, borderBottom: `1px solid ${T.line}`,
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
      background: T.surface,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.ink3 }}>
        {breadcrumb.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon d={ICONS.chevronR} size={12} color={T.ink4} />}
            <span style={{ color: i === breadcrumb.length - 1 ? T.ink : T.ink3, fontWeight: i === breadcrumb.length - 1 ? 500 : 400 }}>{b}</span>
          </React.Fragment>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {search && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: T.bg, border: `1px solid ${T.line}`, borderRadius: 6,
          padding: '6px 12px', width: 280, color: T.ink4, fontSize: 13,
        }}>
          <Icon d={ICONS.search} size={14} />
          <span style={{ flex: 1 }}>Find property, tenant, lease…</span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.ink4, background: '#fff', padding: '1px 5px', borderRadius: 3, border: `1px solid ${T.line}` }}>⌘K</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.ink2 }}>
        <div style={{ padding: 7, borderRadius: 6, border: `1px solid transparent` }}>
          <Icon d={ICONS.bell} size={16} />
        </div>
        <div style={{ padding: 7, borderRadius: 6, border: `1px solid transparent` }}>
          <Icon d={ICONS.calendar} size={16} />
        </div>
        <div style={{ width: 1, height: 20, background: T.line, margin: '0 4px' }} />
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: '#2E3A2A',
          color: '#fff', display: 'grid', placeItems: 'center',
          fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
        }}>ER</div>
      </div>
    </div>
  );
}

// Buttons
function Btn({ variant = 'primary', icon, children, size = 'md', style = {} }) {
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
    danger:  { background: 'transparent', color: T.danger, border: `1px solid ${T.line}` },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }}>
      {icon && <Icon d={icon} size={13} />}
      {children}
    </button>
  );
}

function Badge({ tone = 'neutral', children }) {
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
}

// ─────────────────────────────────────────────────────────────
// Shared page frame (shell + content)
// ─────────────────────────────────────────────────────────────
function Shell({ width = 1280, height = 820, breadcrumb, children, rightPanel, overlay }) {
  return (
    <div style={{
      width, height, background: T.surface,
      display: 'flex', fontFamily: T.sans, color: T.ink,
      position: 'relative', overflow: 'hidden',
      fontSmooth: 'antialiased',
    }}>
      <Sidebar active="property" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopNav breadcrumb={breadcrumb} />
        <div style={{ flex: 1, display: 'flex', minHeight: 0, background: T.bg }}>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            {children}
          </div>
          {rightPanel}
        </div>
      </div>
      {overlay}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sample data
// ─────────────────────────────────────────────────────────────
const PROPS = [
  { id: 'PRP-0128', name: 'Ashford Row', addr: '214 Ashford St, Brooklyn NY', type: 'Multifamily', units: 24, occ: 96, rent: 52400, mgr: 'L. Moreno', status: 'Active' },
  { id: 'PRP-0127', name: 'Linden Court',  addr: '88 Linden Blvd, Queens NY',  type: 'Multifamily', units: 18, occ: 89, rent: 31200, mgr: 'L. Moreno', status: 'Active' },
  { id: 'PRP-0126', name: 'Harper Hall',   addr: '402 Harper St, Bronx NY',    type: 'Mixed-use',   units: 36, occ: 78, rent: 68100, mgr: 'D. Okafor', status: 'Active' },
  { id: 'PRP-0125', name: 'Vine & Third',  addr: '1290 3rd Ave, Manhattan NY', type: 'Retail',      units: 6,  occ: 100, rent: 44800, mgr: 'D. Okafor', status: 'Active' },
  { id: 'PRP-0124', name: 'North Ridge',   addr: '55 Ridge Rd, Jersey City NJ',type: 'Multifamily', units: 42, occ: 93, rent: 87300, mgr: 'A. Petrov', status: 'Active' },
  { id: 'PRP-0123', name: 'Briarwood 7',   addr: '7 Briarwood Ln, Yonkers NY', type: 'Multifamily', units: 12, occ: 100, rent: 21400, mgr: 'A. Petrov', status: 'Active' },
  { id: 'PRP-0122', name: 'Cedar Lofts',   addr: '330 Cedar St, Hoboken NJ',   type: 'Multifamily', units: 28, occ: 82, rent: 61800, mgr: 'L. Moreno', status: 'Review' },
  { id: 'PRP-0121', name: 'Market Square', addr: '12 Market Sq, Newark NJ',    type: 'Mixed-use',   units: 19, occ: 68, rent: 33500, mgr: 'D. Okafor', status: 'Review' },
  { id: 'PRP-0120', name: 'Oakline',       addr: '901 Oakline Dr, Flushing NY',type: 'Multifamily', units: 15, occ: 0,  rent: 0,     mgr: '—',         status: 'Onboarding' },
];

// ─────────────────────────────────────────────────────────────
// VIEW 1 — List rows
// ─────────────────────────────────────────────────────────────
function ViewList() {
  const Th = ({ children, align = 'left', width }) => (
    <th style={{
      textAlign: align, padding: '10px 14px',
      fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3,
      textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`,
      background: '#FCFBF8', width, whiteSpace: 'nowrap',
    }}>{children}</th>
  );
  const Td = ({ children, align = 'left', style = {} }) => (
    <td style={{
      padding: '13px 14px', fontSize: 13, color: T.ink2, textAlign: align,
      borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: 'nowrap', ...style,
    }}>{children}</td>
  );

  const status = (s) => ({
    'Active':     <Badge tone="good">Active</Badge>,
    'Review':     <Badge tone="warn">Review</Badge>,
    'Onboarding': <Badge tone="info">Onboarding</Badge>,
  }[s]);

  return (
    <Shell breadcrumb={['Portfolio', 'Properties']}>
      <div style={{ padding: '20px 24px 24px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: T.ink3, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Portfolio</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, letterSpacing: -0.5 }}>Properties</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" icon={ICONS.upload}>Import</Btn>
            <Btn variant="ghost" icon={ICONS.download}>Export</Btn>
            <Btn variant="primary" icon={ICONS.plus}>New property</Btn>
          </div>
        </div>

        {/* KPI bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          {[
            ['Properties', '48', '+2 this qtr', 'good'],
            ['Units under mgmt', '312', '94% occupancy', 'neutral'],
            ['Monthly rent roll', '$612,840', '+3.1% MoM', 'good'],
            ['Delinquencies', '7', '$18,240 outstanding', 'warn'],
          ].map(([k, v, sub, tone]) => (
            <div key={k} style={{
              background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: T.ink3, letterSpacing: 0.2 }}>{k}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, letterSpacing: -0.5, fontFamily: k.includes('rent') || k.includes('Delinquencies') ? T.mono : T.sans, marginTop: 2 }}>{v}</div>
              <div style={{ fontSize: 11, color: tone === 'good' ? T.good : tone === 'warn' ? T.warn : T.ink3, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
          padding: '8px 10px', background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 6,
        }}>
          <div style={{ display: 'flex', gap: 2, padding: 2, background: T.bg, borderRadius: 5 }}>
            {['All', 'Active', 'Review', 'Onboarding', 'Archived'].map((t, i) => (
              <div key={t} style={{
                padding: '4px 10px', fontSize: 12, fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? T.ink : T.ink3,
                background: i === 0 ? T.surface : 'transparent',
                borderRadius: 4, boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
              }}>{t}{i === 0 && <span style={{ marginLeft: 5, fontFamily: T.mono, fontSize: 10, color: T.ink4 }}>48</span>}</div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <Btn variant="ghost" size="sm" icon={ICONS.filter}>Region: All</Btn>
          <Btn variant="ghost" size="sm" icon={ICONS.filter}>Type: All</Btn>
          <Btn variant="ghost" size="sm" icon={ICONS.filter}>Manager</Btn>
          <div style={{ width: 1, height: 20, background: T.line }} />
          <Btn variant="ghost" size="sm" icon={ICONS.sort}>Sort</Btn>
          <Btn variant="ghost" size="sm" icon={ICONS.more}></Btn>
        </div>

        {/* Table */}
        <div style={{
          flex: 1, background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 6, overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th width={28}><input type="checkbox" style={{ accentColor: T.ink }} /></Th>
                <Th>Property</Th>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th align="right">Units</Th>
                <Th align="right">Occupancy</Th>
                <Th align="right">Rent roll</Th>
                <Th>Manager</Th>
                <Th>Status</Th>
                <Th width={32}></Th>
              </tr>
            </thead>
            <tbody>
              {PROPS.map((p, i) => (
                <tr key={p.id} style={{ background: i === 2 ? '#FAF8F2' : T.surface }}>
                  <Td><input type="checkbox" style={{ accentColor: T.ink }} defaultChecked={i === 2} /></Td>
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 4,
                        background: `repeating-linear-gradient(45deg, ${T.chipBg}, ${T.chipBg} 3px, ${T.surface} 3px, ${T.surface} 6px)`,
                        border: `1px solid ${T.line}`,
                      }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: T.ink3 }}>{p.addr}</div>
                      </div>
                    </div>
                  </Td>
                  <Td style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>{p.id}</Td>
                  <Td>{p.type}</Td>
                  <Td align="right" style={{ fontFamily: T.mono }}>{p.units}</Td>
                  <Td align="right">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 48, height: 3, background: T.chipBg, borderRadius: 2 }}>
                        <div style={{ width: `${p.occ}%`, height: '100%', background: p.occ >= 90 ? T.good : p.occ >= 70 ? T.warn : T.danger, borderRadius: 2 }}/>
                      </div>
                      <span style={{ fontFamily: T.mono, fontSize: 12, color: T.ink2, width: 34, textAlign: 'right' }}>{p.occ}%</span>
                    </div>
                  </Td>
                  <Td align="right" style={{ fontFamily: T.mono }}>${p.rent.toLocaleString()}</Td>
                  <Td>{p.mgr}</Td>
                  <Td>{status(p.status)}</Td>
                  <Td><Icon d={ICONS.more} size={14} color={T.ink4} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 2px', fontSize: 12, color: T.ink3 }}>
          <div>Showing <span style={{ fontFamily: T.mono, color: T.ink2 }}>1–9</span> of <span style={{ fontFamily: T.mono, color: T.ink2 }}>48</span> properties</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ padding: '4px 8px', border: `1px solid ${T.line}`, borderRadius: 4, background: T.surface }}>Prev</span>
            <span style={{ padding: '4px 8px', background: T.ink, color: '#fff', borderRadius: 4, fontFamily: T.mono }}>1</span>
            <span style={{ padding: '4px 8px', fontFamily: T.mono }}>2</span>
            <span style={{ padding: '4px 8px', fontFamily: T.mono }}>3</span>
            <span style={{ padding: '4px 8px' }}>…</span>
            <span style={{ padding: '4px 8px', fontFamily: T.mono }}>6</span>
            <span style={{ padding: '4px 8px', border: `1px solid ${T.line}`, borderRadius: 4, background: T.surface }}>Next</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared: detail body (used by full-page + inline variants)
// ─────────────────────────────────────────────────────────────
function DetailBody({ compact = false }) {
  const KV = ({ k, v, mono = false }) => (
    <div>
      <div style={{ fontSize: 11, color: T.ink3, marginBottom: 2 }}>{k}</div>
      <div style={{ fontSize: 13, color: T.ink, fontFamily: mono ? T.mono : T.sans, fontWeight: mono ? 400 : 500 }}>{v}</div>
    </div>
  );

  const Section = ({ title, right, children }) => (
    <div style={{ marginBottom: compact ? 20 : 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: -0.1 }}>{title}</div>
        {right}
      </div>
      {children}
    </div>
  );

  return (
    <>
      <Section title="Overview">
        <div style={{
          display: 'grid', gridTemplateColumns: compact ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '14px 20px',
          padding: compact ? 0 : 16,
          background: compact ? 'transparent' : T.surface,
          border: compact ? 'none' : `1px solid ${T.line}`,
          borderRadius: 6,
        }}>
          <KV k="Property ID" v="PRP-0126" mono />
          <KV k="Type" v="Mixed-use" />
          <KV k="Year built" v="1948 · Renov. 2019" />
          <KV k="Class" v="B+" />
          <KV k="Gross area" v="42,180 sqft" mono />
          <KV k="Units" v="36 residential · 4 retail" />
          <KV k="Owner entity" v="Meridian Holdings LLC" />
          <KV k="Manager" v="D. Okafor" />
        </div>
      </Section>

      <Section title="Financial snapshot" right={<span style={{ fontSize: 11, color: T.ink3 }}>Trailing 30 days</span>}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
          overflow: 'hidden',
        }}>
          {[
            ['Gross rent', '$68,100', T.mono, T.ink3],
            ['Collected', '$64,420', T.mono, T.good],
            ['Outstanding', '$3,680', T.mono, T.warn],
            ['NOI (est.)', '$41,210', T.mono, T.ink],
          ].map(([k, v, , color], i, a) => (
            <div key={k} style={{
              padding: '14px 16px',
              borderRight: i < a.length - 1 ? `1px solid ${T.line}` : 'none',
            }}>
              <div style={{ fontSize: 11, color: T.ink3, marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 18, fontFamily: T.mono, color, fontWeight: 500, letterSpacing: -0.5 }}>{v}</div>
            </div>
          ))}
        </div>
      </Section>

      {!compact && (
        <Section title="Occupancy by unit" right={<Btn variant="ghost" size="sm">View all 40</Btn>}>
          <div style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
            padding: 14,
          }}>
            {/* Heatmap-style unit grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 4 }}>
              {Array.from({ length: 40 }).map((_, i) => {
                const statuses = ['occ', 'occ', 'occ', 'occ', 'occ', 'occ', 'vac', 'occ', 'occ', 'late'];
                const s = statuses[i % 10];
                const c = s === 'occ' ? T.good : s === 'vac' ? T.chipBg : T.warn;
                return <div key={i} style={{ aspectRatio: '1', background: c, borderRadius: 2 }} />;
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: T.ink3 }}>
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span style={{ width: 8, height: 8, background: T.good, borderRadius: 2 }}/>Occupied 28</span>
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span style={{ width: 8, height: 8, background: T.warn, borderRadius: 2 }}/>Late 4</span>
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><span style={{ width: 8, height: 8, background: T.chipBg, borderRadius: 2 }}/>Vacant 8</span>
            </div>
          </div>
        </Section>
      )}

      <Section title="Recent activity">
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6 }}>
          {[
            ['Payment received', 'Unit 4B · K. Rivera', '$2,150.00', '2h ago', 'good'],
            ['Work order opened', 'Unit 2A · Leak, kitchen', 'T-441', '5h ago', 'warn'],
            ['Lease signed', 'Unit 7C · M. Delacroix', '12-month', 'Yesterday', 'info'],
            ['Inspection scheduled', 'Common areas', 'Apr 24', '2d ago', 'neutral'],
          ].map(([title, sub, val, time, tone], i, a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
              borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 3,
                background: tone === 'good' ? T.good : tone === 'warn' ? T.warn : tone === 'info' ? T.info : T.ink4 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{title}</div>
                <div style={{ fontSize: 11, color: T.ink3 }}>{sub}</div>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.ink2 }}>{val}</div>
              <div style={{ fontSize: 11, color: T.ink4, width: 80, textAlign: 'right' }}>{time}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// VIEW 2 — Detail (full page)
// ─────────────────────────────────────────────────────────────
function ViewDetail() {
  return (
    <Shell breadcrumb={['Portfolio', 'Properties', 'Harper Hall']}>
      <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', background: T.surface, borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 6,
              background: `repeating-linear-gradient(45deg, ${T.chipBg}, ${T.chipBg} 4px, ${T.surface} 4px, ${T.surface} 8px)`,
              border: `1px solid ${T.line}`, flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>PRP-0126</span>
                <span style={{ color: T.line }}>·</span>
                <Badge tone="good">Active</Badge>
                <Badge tone="info">Mixed-use</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 24, fontWeight: 600, color: T.ink, letterSpacing: -0.5 }}>Harper Hall</div>
                <Icon d={ICONS.edit} size={14} color={T.ink4} />
              </div>
              <div style={{ fontSize: 13, color: T.ink3 }}>402 Harper St, Bronx NY 10457 · 36 units · Managed by D. Okafor</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="ghost" icon={ICONS.doc}>Documents</Btn>
              <Btn variant="ghost" icon={ICONS.download}>Export</Btn>
              <Btn variant="primary" icon={ICONS.plus}>New work order</Btn>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, marginTop: 16, marginBottom: -16, borderBottom: `1px solid transparent` }}>
            {['Overview', 'Units', 'Leases', 'Payments', 'Work orders', 'Documents', 'Activity'].map((t, i) => (
              <div key={t} style={{
                padding: '10px 12px', fontSize: 13, fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? T.ink : T.ink3,
                borderBottom: i === 0 ? `2px solid ${T.ink}` : '2px solid transparent',
                marginBottom: -1,
              }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 24px 32px' }}>
          <DetailBody />
        </div>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// VIEW 3 — Detail in right sidebar (list remains visible)
// ─────────────────────────────────────────────────────────────
function ViewDetailSidebar() {
  const panel = (
    <div style={{
      width: 440, height: '100%', background: T.surface,
      borderLeft: `1px solid ${T.line}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Panel header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Icon d={ICONS.chevronR} size={14} color={T.ink4} style={{ transform: 'rotate(180deg)' }} />
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>PRP-0126</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <Icon d={ICONS.edit} size={15} color={T.ink3} />
            <div style={{ width: 1, height: 16, background: T.line, margin: '0 4px' }} />
            <Icon d={ICONS.more} size={15} color={T.ink3} />
            <div style={{ width: 1, height: 16, background: T.line, margin: '0 4px' }} />
            <Icon d={ICONS.close} size={15} color={T.ink3} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 5,
            background: `repeating-linear-gradient(45deg, ${T.chipBg}, ${T.chipBg} 3px, ${T.surface} 3px, ${T.surface} 6px)`,
            border: `1px solid ${T.line}`,
          }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>Harper Hall</div>
            <div style={{ fontSize: 11, color: T.ink3 }}>402 Harper St, Bronx NY</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <Badge tone="good">Active</Badge>
          <Badge tone="info">Mixed-use</Badge>
          <Badge tone="neutral">36 units</Badge>
        </div>
      </div>

      {/* Panel body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px' }}>
        <DetailBody compact />
      </div>

      {/* Footer actions */}
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${T.line}`, display: 'flex', gap: 8 }}>
        <Btn variant="ghost" style={{ flex: 1, justifyContent: 'center' }}>Open full page</Btn>
        <Btn variant="primary" style={{ flex: 1, justifyContent: 'center' }} icon={ICONS.edit}>Edit property</Btn>
      </div>
    </div>
  );

  // Background: the list (dimmed-feeling, with selected row highlighted)
  const Th = ({ children, align = 'left', width }) => (
    <th style={{
      textAlign: align, padding: '10px 14px', fontSize: 11, fontWeight: 500,
      color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase',
      borderBottom: `1px solid ${T.line}`, background: '#FCFBF8', width, whiteSpace: 'nowrap',
    }}>{children}</th>
  );
  const Td = ({ children, align = 'left', style = {} }) => (
    <td style={{
      padding: '12px 14px', fontSize: 13, color: T.ink2, textAlign: align,
      borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: 'nowrap', ...style,
    }}>{children}</td>
  );

  return (
    <Shell breadcrumb={['Portfolio', 'Properties']} rightPanel={panel}>
      <div style={{ padding: '20px 24px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: T.ink, letterSpacing: -0.4 }}>Properties</div>
          <Btn variant="primary" icon={ICONS.plus}>New property</Btn>
        </div>

        <div style={{
          flex: 1, background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 6, overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Property</Th>
                <Th>Type</Th>
                <Th align="right">Units</Th>
                <Th align="right">Occupancy</Th>
                <Th align="right">Rent roll</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {PROPS.slice(0, 7).map((p, i) => {
                const selected = p.id === 'PRP-0126';
                return (
                  <tr key={p.id} style={{ background: selected ? '#F0EDE4' : T.surface }}>
                    <Td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 3, height: 22, background: selected ? T.ink : 'transparent', borderRadius: 2, marginLeft: -6 }}/>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: selected ? 600 : 500, color: T.ink }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: T.ink3 }}>{p.addr}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>{p.type}</Td>
                    <Td align="right" style={{ fontFamily: T.mono }}>{p.units}</Td>
                    <Td align="right" style={{ fontFamily: T.mono }}>{p.occ}%</Td>
                    <Td align="right" style={{ fontFamily: T.mono }}>${p.rent.toLocaleString()}</Td>
                    <Td>
                      {{'Active': <Badge tone="good">Active</Badge>,
                        'Review': <Badge tone="warn">Review</Badge>,
                        'Onboarding': <Badge tone="info">Onboarding</Badge>}[p.status]}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// VIEW 4 — Create new form (right sidebar, multi-section)
// ─────────────────────────────────────────────────────────────
function ViewForm() {
  const Field = ({ label, children, hint, required }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: T.ink2 }}>
          {label} {required && <span style={{ color: T.danger }}>*</span>}
        </label>
        {hint && <span style={{ fontSize: 11, color: T.ink4 }}>{hint}</span>}
      </div>
      {children}
    </div>
  );

  const Input = ({ value, placeholder, mono, suffix, icon }) => (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: T.surface, border: `1px solid ${T.line}`,
      borderRadius: 5, padding: '7px 10px', height: 34,
      fontSize: 13, color: T.ink, fontFamily: mono ? T.mono : T.sans,
    }}>
      {icon && <Icon d={icon} size={14} color={T.ink4} />}
      <span style={{ flex: 1, marginLeft: icon ? 8 : 0, color: value ? T.ink : T.ink4 }}>{value || placeholder}</span>
      {suffix && <span style={{ color: T.ink4, fontFamily: T.mono, fontSize: 12 }}>{suffix}</span>}
    </div>
  );

  const Select = ({ value, placeholder }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: T.surface, border: `1px solid ${T.line}`,
      borderRadius: 5, padding: '7px 10px', height: 34,
      fontSize: 13, color: value ? T.ink : T.ink4,
    }}>
      {value || placeholder}
      <Icon d={ICONS.chevronD} size={14} color={T.ink4} />
    </div>
  );

  const SegBtn = ({ options, active = 0 }) => (
    <div style={{ display: 'flex', border: `1px solid ${T.line}`, borderRadius: 5, overflow: 'hidden', background: T.surface }}>
      {options.map((o, i) => (
        <div key={o} style={{
          flex: 1, padding: '7px 10px', fontSize: 13, textAlign: 'center',
          background: i === active ? T.ink : T.surface,
          color: i === active ? '#fff' : T.ink2,
          fontWeight: i === active ? 500 : 400,
          borderLeft: i > 0 ? `1px solid ${T.line}` : 'none',
        }}>{o}</div>
      ))}
    </div>
  );

  const panel = (
    <div style={{
      width: 460, height: '100%', background: T.surface,
      borderLeft: `1px solid ${T.line}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{ padding: '16px 22px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 10, color: T.ink3, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>New record</div>
          <Icon d={ICONS.close} size={16} color={T.ink3} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: T.ink, letterSpacing: -0.3 }}>Add property</div>
        <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>Draft will autosave · 3 of 4 sections complete</div>
        {/* Stepper */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {['Identity', 'Address', 'Financials', 'Team'].map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{
                height: 3, borderRadius: 2,
                background: i <= 2 ? T.ink : T.chipBg,
              }}/>
              <div style={{ fontSize: 10, color: i === 2 ? T.ink : T.ink3, marginTop: 5, fontWeight: i === 2 ? 500 : 400, letterSpacing: 0.2 }}>
                {String(i + 1).padStart(2, '0')} · {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 22px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 12 }}>Financials</div>

        <Field label="Acquisition price" required hint="USD">
          <Input value="4,280,000" mono suffix="USD" />
        </Field>
        <Field label="Acquisition date" required>
          <Input value="Mar 14, 2021" icon={ICONS.calendar} />
        </Field>

        <Field label="Property class" required>
          <SegBtn options={['A', 'B', 'B+', 'C']} active={2} />
        </Field>

        <Field label="Base rent estimate" hint="Blended average">
          <Input value="1,890.00" mono suffix="/ unit / mo" />
        </Field>

        <Field label="Expense ratio" hint="Of gross revenue">
          <Input value="38" mono suffix="%" />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Cap rate">
            <Input value="5.4" mono suffix="%" />
          </Field>
          <Field label="Tax assessment">
            <Input value="3,710,000" mono suffix="USD" />
          </Field>
        </div>

        <Field label="Reporting currency">
          <Select value="USD — United States Dollar" />
        </Field>

        <Field label="Internal notes">
          <div style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: 5,
            padding: 10, fontSize: 13, color: T.ink2, minHeight: 68, lineHeight: 1.5,
          }}>
            Seller financing 20% of purchase. Roof replaced 2023. Legal review pending for unit 3A conversion.
          </div>
        </Field>

        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: 12, background: T.goodBg, borderRadius: 5,
          border: `1px solid ${T.good}22`, marginTop: 8,
        }}>
          <Icon d={ICONS.check} size={14} color={T.good} />
          <div style={{ fontSize: 12, color: T.good, lineHeight: 1.5 }}>
            Financials look consistent with comparable properties in this region (±4% variance).
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 22px', borderTop: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Btn variant="ghost">Back</Btn>
        <div style={{ flex: 1, fontSize: 11, color: T.ink4, textAlign: 'center' }}>Saved 14s ago</div>
        <Btn variant="ghost">Save draft</Btn>
        <Btn variant="primary">Continue →</Btn>
      </div>
    </div>
  );

  // Background: list view (unchanged, shown alongside)
  return (
    <Shell breadcrumb={['Portfolio', 'Properties', 'New property']} rightPanel={panel}>
      <div style={{ padding: '20px 24px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: T.ink, letterSpacing: -0.4, marginBottom: 14 }}>Properties</div>

        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`, background: '#FCFBF8' }}>Property</th>
                <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`, background: '#FCFBF8' }}>Type</th>
                <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`, background: '#FCFBF8' }}>Units</th>
                <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`, background: '#FCFBF8' }}>Rent roll</th>
                <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`, background: '#FCFBF8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#FAF8F2', borderLeft: `3px solid ${T.ink}` }}>
                <td colSpan={5} style={{ padding: '14px 14px', fontSize: 13, borderBottom: `1px solid ${T.lineSoft}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 4, background: T.chipBg, border: `1px dashed ${T.ink4}`, display: 'grid', placeItems: 'center' }}>
                      <Icon d={ICONS.plus} size={12} color={T.ink3} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>New property (draft)</div>
                      <div style={{ fontSize: 11, color: T.ink3 }}>Editing in panel →</div>
                    </div>
                  </div>
                </td>
              </tr>
              {PROPS.slice(0, 6).map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: T.ink2, borderBottom: `1px solid ${T.lineSoft}`, opacity: 0.55 }}>{p.name} <span style={{ color: T.ink4 }}>· {p.addr}</span></td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: T.ink2, borderBottom: `1px solid ${T.lineSoft}`, opacity: 0.55 }}>{p.type}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: T.ink2, borderBottom: `1px solid ${T.lineSoft}`, textAlign: 'right', fontFamily: T.mono, opacity: 0.55 }}>{p.units}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: T.ink2, borderBottom: `1px solid ${T.lineSoft}`, textAlign: 'right', fontFamily: T.mono, opacity: 0.55 }}>${p.rent.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: T.ink2, borderBottom: `1px solid ${T.lineSoft}`, opacity: 0.55 }}>
                    {{'Active': <Badge tone="good">Active</Badge>,
                      'Review': <Badge tone="warn">Review</Badge>,
                      'Onboarding': <Badge tone="info">Onboarding</Badge>}[p.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// VIEW 5 — Modal box (destructive confirmation)
// ─────────────────────────────────────────────────────────────
function ViewModal() {
  const overlay = (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(23, 20, 15, 0.35)',
        backdropFilter: 'blur(1px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480, background: T.surface, borderRadius: 8,
        boxShadow: '0 20px 60px rgba(23,20,15,0.25), 0 4px 12px rgba(23,20,15,0.12)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 22px 16px', display: 'flex', gap: 14, borderBottom: `1px solid ${T.lineSoft}` }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6, flexShrink: 0,
            background: T.dangerBg, color: T.danger,
            display: 'grid', placeItems: 'center',
          }}>
            <Icon d={ICONS.warn} size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>Archive Harper Hall?</div>
                <div style={{ fontSize: 10, fontFamily: T.mono, color: T.ink4, marginTop: 3 }}>PRP-0126 · 36 units · 4 active leases</div>
              </div>
              <Icon d={ICONS.close} size={16} color={T.ink4} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 22px 18px' }}>
          <div style={{ fontSize: 13, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
            Archiving will stop rent collection, pause scheduled inspections, and mark the property as read-only in all reports. <b style={{ color: T.ink }}>This action cannot be undone without a manager approval.</b>
          </div>

          {/* Impact card */}
          <div style={{
            background: T.bg, border: `1px solid ${T.line}`, borderRadius: 6,
            padding: 14, marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, color: T.ink3, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 500, marginBottom: 10 }}>Impact summary</div>
            {[
              ['Active leases', '4', 'Will be flagged for review'],
              ['Scheduled payments', '8', 'Will be held next cycle'],
              ['Open work orders', '2', 'Must be reassigned'],
            ].map(([k, v, note], i, a) => (
              <div key={k} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 0',
                borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.ink2 }}>{k}</div>
                  <div style={{ fontSize: 11, color: T.ink3 }}>{note}</div>
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Confirm input */}
          <div style={{ fontSize: 12, color: T.ink2, marginBottom: 6 }}>
            Type <span style={{ fontFamily: T.mono, background: T.chipBg, padding: '1px 5px', borderRadius: 3, color: T.ink }}>HARPER HALL</span> to confirm:
          </div>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: T.surface, border: `1px solid ${T.ink}`, borderRadius: 5,
            padding: '8px 10px', fontSize: 13, fontFamily: T.mono, color: T.ink,
          }}>
            HARPER HALL<span style={{ marginLeft: 2, width: 1, height: 14, background: T.ink, display: 'inline-block', animation: 'blink 1s steps(1) infinite' }}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 22px', background: T.bg,
          borderTop: `1px solid ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.ink3 }}>
            <input type="checkbox" style={{ accentColor: T.ink }} />
            Notify tenants
          </label>
          <div style={{ flex: 1 }} />
          <Btn variant="ghost">Cancel</Btn>
          <Btn variant="primary" style={{ background: T.danger, color: '#fff' }}>Archive property</Btn>
        </div>
      </div>
    </>
  );

  return (
    <Shell breadcrumb={['Portfolio', 'Properties', 'Harper Hall']} overlay={overlay}>
      <div style={{ padding: '20px 24px', filter: 'saturate(0.7)' }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 12, letterSpacing: -0.4 }}>Harper Hall</div>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[['Units', '36'], ['Occupancy', '78%'], ['Rent roll', '$68,100'], ['NOI', '$41,210']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: T.ink3 }}>{k}</div>
                <div style={{ fontSize: 18, fontFamily: T.mono, color: T.ink, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

Object.assign(window, { ViewList, ViewDetail, ViewDetailSidebar, ViewForm, ViewModal, T, ICONS });
