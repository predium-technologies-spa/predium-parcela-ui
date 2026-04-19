// extra-views.jsx — Full form page + Payment history table

function ViewFullForm() {
  const { T, ICONS } = window;

  const Icon = ({ d, size = 14, stroke = 1.5, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );

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

  // Sidebar (properties active for create-new context)
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

  const navSection = (title, items) => (
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
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>Parcela</div>
          <div style={{ fontSize: 10, color: T.ink4 }}>Meridian Holdings</div>
        </div>
      </div>
      <div style={{ padding: 12, flex: 1 }}>
        {navSection('Workspace', [
          ['dashboard', ICONS.dashboard, 'Dashboard'],
          ['reports',   ICONS.reports,   'Reports'],
        ])}
        {navSection('Portfolio', [
          ['property',  ICONS.property,  'Properties', 48, true],
          ['units',     ICONS.units,     'Units', 312],
          ['tenants',   ICONS.tenants,   'Tenants', 287],
          ['leases',    ICONS.leases,    'Leases', 287],
        ])}
        {navSection('Operations', [
          ['payments',  ICONS.payments,  'Payments'],
          ['tickets',   ICONS.tickets,   'Work orders', 14],
          ['inspect',   ICONS.inspect,   'Inspections'],
        ])}
        {navSection('System', [['settings', ICONS.settings, 'Settings']])}
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
        <span style={{ color: T.ink3 }}>Portfolio</span>
        <Icon d={ICONS.chevronR} size={12} color={T.ink4} />
        <span style={{ color: T.ink3 }}>Properties</span>
        <Icon d={ICONS.chevronR} size={12} color={T.ink4} />
        <span style={{ color: T.ink, fontWeight: 500 }}>New property</span>
      </div>
      <div style={{ flex: 1 }} />
      <Btn variant="ghost" size="sm" icon={ICONS.close}>Discard</Btn>
    </div>
  );

  // Form primitives
  const Label = ({ children, required, hint }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: T.ink2 }}>
        {children} {required && <span style={{ color: T.danger }}>*</span>}
      </label>
      {hint && <span style={{ fontSize: 11, color: T.ink4 }}>{hint}</span>}
    </div>
  );
  const Input = ({ value, placeholder, mono, suffix, icon, error }) => (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: T.surface, border: `1px solid ${error ? T.danger : T.line}`,
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
  const Field = ({ label, children, hint, required, cols = 1, error }) => (
    <div style={{ gridColumn: `span ${cols}`, marginBottom: 0 }}>
      <Label required={required} hint={hint}>{label}</Label>
      {children}
      {error && <div style={{ fontSize: 11, color: T.danger, marginTop: 4 }}>{error}</div>}
    </div>
  );

  const FormSection = ({ num, title, desc, children, right }) => (
    <div style={{
      background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
      marginBottom: 16, overflow: 'hidden',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, padding: '20px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink4 }}>{num}</span>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>{title}</div>
          </div>
          <div style={{ fontSize: 12, color: T.ink3, lineHeight: 1.5 }}>{desc}</div>
          {right}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 14px' }}>
          {children}
        </div>
      </div>
    </div>
  );

  // Sticky nav stepper
  const steps = [
    ['01', 'Identity', true],
    ['02', 'Address & Location', true],
    ['03', 'Structure', true],
    ['04', 'Financials', false, 'current'],
    ['05', 'Team & Access', false],
    ['06', 'Documents', false],
  ];

  return (
    <div style={{
      width: '100%', height: '100%', background: T.surface,
      display: 'flex', fontFamily: T.sans, color: T.ink,
      overflow: 'hidden',
    }}>
      {Sidebar}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {TopNav}
        <div style={{ flex: 1, display: 'flex', minHeight: 0, background: T.bg }}>
          {/* Left: step nav */}
          <div style={{
            width: 220, borderRight: `1px solid ${T.line}`,
            padding: '22px 16px', flexShrink: 0, background: '#FCFBF8',
          }}>
            <div style={{ fontSize: 10, color: T.ink3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, fontWeight: 500 }}>Sections</div>
            {steps.map(([n, name, done, cur]) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 4, marginBottom: 2,
                background: cur ? '#EDEAE2' : 'transparent',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 9,
                  border: `1.5px solid ${done ? T.good : cur ? T.ink : T.line}`,
                  background: done ? T.good : cur ? T.ink : 'transparent',
                  color: '#fff', display: 'grid', placeItems: 'center',
                  fontSize: 9, fontFamily: T.mono, fontWeight: 600,
                }}>
                  {done ? <Icon d={ICONS.check} size={9} stroke={2.5} color="#fff"/> : n}
                </div>
                <span style={{ fontSize: 12, color: cur ? T.ink : done ? T.ink2 : T.ink3, fontWeight: cur ? 500 : 400 }}>{name}</span>
              </div>
            ))}
            <div style={{ height: 1, background: T.line, margin: '16px 0' }}/>
            <div style={{ fontSize: 11, color: T.ink3, marginBottom: 6 }}>Completion</div>
            <div style={{ height: 3, background: T.chipBg, borderRadius: 2 }}>
              <div style={{ width: '50%', height: '100%', background: T.ink, borderRadius: 2 }}/>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, marginTop: 6 }}>3 / 6</div>
          </div>

          {/* Right: scrollable form body */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ padding: '24px 28px 16px' }}>
              <div style={{ fontSize: 11, color: T.ink3, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>New record</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, letterSpacing: -0.5 }}>Add property</div>
                <span style={{
                  fontSize: 11, color: T.warn, background: T.warnBg,
                  padding: '2px 7px', borderRadius: 3, fontWeight: 500,
                }}>Draft · autosaved 12s ago</span>
              </div>
              <div style={{ fontSize: 13, color: T.ink3, marginTop: 4 }}>
                Complete all sections to publish. You can save and return later.
              </div>
            </div>

            <div style={{ padding: '0 28px 80px' }}>
              {/* 01 Identity (completed) */}
              <FormSection num="01" title="Identity" desc="How this property is identified in the system and on documents.">
                <Field label="Property name" required cols={2}>
                  <Input value="Harper Hall" />
                </Field>
                <Field label="Property ID" hint="auto">
                  <Input value="PRP-0126" mono />
                </Field>
                <Field label="Internal code">
                  <Input value="HRP-BX-02" mono />
                </Field>
                <Field label="Classification" required>
                  <Select value="Mixed-use" />
                </Field>
                <Field label="Sub-type">
                  <Select value="Residential over retail" />
                </Field>
                <Field label="Tags" cols={2}>
                  <div style={{
                    display: 'flex', gap: 6, flexWrap: 'wrap',
                    padding: '6px 8px', background: T.surface,
                    border: `1px solid ${T.line}`, borderRadius: 5, minHeight: 34,
                  }}>
                    {['core', 'renovated-2019', 'bronx', 'section8-eligible'].map(t => (
                      <span key={t} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: T.chipBg, color: T.ink2,
                        padding: '2px 7px', borderRadius: 3, fontSize: 11,
                      }}>
                        {t} <Icon d={ICONS.close} size={10} color={T.ink4}/>
                      </span>
                    ))}
                    <span style={{ fontSize: 11, color: T.ink4, padding: '2px 4px' }}>+ add tag</span>
                  </div>
                </Field>
              </FormSection>

              {/* 02 Address (completed) */}
              <FormSection num="02" title="Address & Location" desc="Physical location used for maps, routing, and tax filings.">
                <Field label="Street" required cols={2}>
                  <Input value="402 Harper St" />
                </Field>
                <Field label="City" required><Input value="Bronx" /></Field>
                <Field label="State" required><Select value="New York" /></Field>
                <Field label="ZIP" required><Input value="10457" mono /></Field>
                <Field label="County"><Input value="Bronx County" /></Field>
                <Field label="Latitude"><Input value="40.8537" mono /></Field>
                <Field label="Longitude"><Input value="-73.8814" mono /></Field>
                <Field label="Parcel / APN" cols={2} hint="Used for tax matching">
                  <Input value="BX-2988-0042-01" mono />
                </Field>
              </FormSection>

              {/* 03 Structure (completed) */}
              <FormSection num="03" title="Structure" desc="Physical characteristics of the building.">
                <Field label="Year built" required><Input value="1948" mono /></Field>
                <Field label="Last renovation"><Input value="2019" mono /></Field>
                <Field label="Floors above grade"><Input value="5" mono /></Field>
                <Field label="Floors below grade"><Input value="1" mono /></Field>
                <Field label="Gross area" required><Input value="42,180" mono suffix="sqft" /></Field>
                <Field label="Net leasable area"><Input value="36,420" mono suffix="sqft" /></Field>
                <Field label="Residential units" required><Input value="36" mono /></Field>
                <Field label="Commercial units"><Input value="4" mono /></Field>
                <Field label="Parking spaces"><Input value="0" mono /></Field>
                <Field label="Amenities" cols={2}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
                    padding: 8, border: `1px solid ${T.line}`, borderRadius: 5, background: T.surface,
                  }}>
                    {[
                      ['Elevator', true], ['Laundry', true], ['Gym', false], ['Rooftop', true],
                      ['Doorman', false], ['Bike storage', true], ['Package room', true], ['Pet friendly', true],
                    ].map(([a, on]) => (
                      <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: on ? T.ink : T.ink3 }}>
                        <div style={{
                          width: 14, height: 14, borderRadius: 3,
                          border: `1.5px solid ${on ? T.ink : T.ink4}`,
                          background: on ? T.ink : 'transparent',
                          display: 'grid', placeItems: 'center',
                        }}>
                          {on && <Icon d={ICONS.check} size={8} color="#fff" stroke={3}/>}
                        </div>
                        {a}
                      </label>
                    ))}
                  </div>
                </Field>
              </FormSection>

              {/* 04 Financials (current) */}
              <div style={{
                background: T.surface, border: `1.5px solid ${T.ink}`, borderRadius: 6,
                marginBottom: 16, overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(23,20,15,0.06)',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, padding: '20px 24px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: T.mono, fontSize: 11, color: T.ink4 }}>04</span>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, letterSpacing: -0.2 }}>Financials</div>
                      <span style={{
                        fontSize: 10, color: T.ink, background: '#EDEAE2',
                        padding: '1px 6px', borderRadius: 3, fontWeight: 500,
                        textTransform: 'uppercase', letterSpacing: 0.5,
                      }}>Current</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.ink3, lineHeight: 1.5 }}>
                      Acquisition, ongoing rent estimates, and tax metadata. These drive dashboards and monthly reports.
                    </div>
                    <div style={{
                      marginTop: 14, padding: 10, background: T.goodBg,
                      border: `1px solid ${T.good}22`, borderRadius: 5,
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                    }}>
                      <Icon d={ICONS.check} size={12} color={T.good} />
                      <div style={{ fontSize: 11, color: T.good, lineHeight: 1.5 }}>
                        Values are within 4% of comparable properties in this region.
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                    <Field label="Acquisition price" required hint="USD">
                      <Input value="4,280,000" mono suffix="USD" />
                    </Field>
                    <Field label="Acquisition date" required>
                      <Input value="Mar 14, 2021" icon={ICONS.calendar} />
                    </Field>
                    <Field label="Property class" required cols={2}>
                      <div style={{ display: 'flex', border: `1px solid ${T.line}`, borderRadius: 5, overflow: 'hidden', background: T.surface }}>
                        {['A', 'B', 'B+', 'C', 'D'].map((o, i) => (
                          <div key={o} style={{
                            flex: 1, padding: '7px', fontSize: 13, textAlign: 'center',
                            background: i === 2 ? T.ink : T.surface,
                            color: i === 2 ? '#fff' : T.ink2,
                            fontWeight: i === 2 ? 500 : 400,
                            borderLeft: i > 0 ? `1px solid ${T.line}` : 'none',
                          }}>{o}</div>
                        ))}
                      </div>
                    </Field>
                    <Field label="Base rent estimate" hint="Blended avg">
                      <Input value="1,890.00" mono suffix="/ unit / mo" />
                    </Field>
                    <Field label="Expense ratio" hint="Of gross">
                      <Input value="38" mono suffix="%" />
                    </Field>
                    <Field label="Cap rate"><Input value="5.4" mono suffix="%" /></Field>
                    <Field label="Tax assessment"><Input value="3,710,000" mono suffix="USD" /></Field>
                    <Field label="Annual tax"><Input value="48,230" mono suffix="USD" /></Field>
                    <Field label="Insurance annual"><Input value="14,600" mono suffix="USD" /></Field>
                    <Field label="Reporting currency" cols={2}>
                      <Select value="USD — United States Dollar" />
                    </Field>
                    <Field label="Internal notes" cols={2}>
                      <div style={{
                        background: T.surface, border: `1px solid ${T.line}`, borderRadius: 5,
                        padding: 10, fontSize: 13, color: T.ink2, minHeight: 72, lineHeight: 1.5,
                      }}>
                        Seller financing 20% of purchase. Roof replaced 2023. Legal review pending for unit 3A conversion. Insurance renewal due Sep 2026.
                      </div>
                    </Field>
                  </div>
                </div>
              </div>

              {/* 05 Team (upcoming) */}
              <FormSection num="05" title="Team & Access" desc="Who manages this property and what they can do.">
                <Field label="Primary manager" required>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: T.surface, border: `1px solid ${T.line}`,
                    borderRadius: 5, padding: '5px 10px', height: 34, fontSize: 13,
                  }}>
                    <div style={{ width: 20, height: 20, borderRadius: 10, background: '#2E3A2A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 600 }}>DO</div>
                    <span>D. Okafor</span>
                    <span style={{ marginLeft: 'auto' }}><Icon d={ICONS.chevronD} size={13} color={T.ink4}/></span>
                  </div>
                </Field>
                <Field label="Owner entity" required>
                  <Select value="Meridian Holdings LLC" />
                </Field>
                <Field label="Backup manager"><Select placeholder="Select a user" /></Field>
                <Field label="Maintenance vendor"><Select value="North Bronx Services" /></Field>
                <Field label="Team members" cols={2}>
                  <div style={{
                    border: `1px solid ${T.line}`, borderRadius: 5, overflow: 'hidden',
                  }}>
                    {[
                      ['D. Okafor', 'Primary manager', 'Owner'],
                      ['L. Moreno', 'Leasing agent', 'Editor'],
                      ['A. Petrov', 'Accounting', 'Viewer'],
                    ].map(([n, r, role], i, a) => (
                      <div key={n} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', background: T.surface,
                        borderBottom: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
                      }}>
                        <div style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 600 }}>
                          {n.split(/[ .]/).filter(Boolean).slice(0,2).map(s=>s[0]).join('')}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 500, color: T.ink }}>{n}</div>
                          <div style={{ fontSize: 11, color: T.ink3 }}>{r}</div>
                        </div>
                        <span style={{
                          fontSize: 11, color: T.ink2, background: T.chipBg,
                          padding: '1px 7px', borderRadius: 3,
                        }}>{role}</span>
                        <Icon d={ICONS.more} size={14} color={T.ink4}/>
                      </div>
                    ))}
                    <div style={{ padding: '8px 12px', fontSize: 12, color: T.ink3, background: '#FCFBF8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon d={ICONS.plus} size={12}/> Invite teammate
                    </div>
                  </div>
                </Field>
              </FormSection>

              {/* 06 Documents (upcoming) */}
              <FormSection num="06" title="Documents" desc="Deed, title, insurance, inspection reports. PDF, DOC, XLS up to 25 MB each.">
                <Field label="Attachments" cols={2}>
                  <div style={{
                    border: `1.5px dashed ${T.line}`, borderRadius: 5,
                    padding: 18, textAlign: 'center',
                    background: '#FCFBF8',
                  }}>
                    <Icon d={ICONS.upload} size={18} color={T.ink3}/>
                    <div style={{ fontSize: 13, color: T.ink2, fontWeight: 500, marginTop: 6 }}>Drop files or browse</div>
                    <div style={{ fontSize: 11, color: T.ink4, marginTop: 2 }}>PDF, DOC, XLS · up to 25 MB each</div>
                  </div>
                </Field>
                {[
                  ['Deed of sale.pdf', '1.2 MB', 'Uploaded'],
                  ['Insurance policy 2025.pdf', '340 KB', 'Uploaded'],
                  ['Roof inspection 2023.pdf', '2.8 MB', 'Uploaded'],
                ].map(([n, size, status], i) => (
                  <div key={i} style={{
                    gridColumn: 'span 2',
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', background: T.surface,
                    border: `1px solid ${T.line}`, borderRadius: 5,
                  }}>
                    <Icon d={ICONS.doc} size={16} color={T.ink3}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>{n}</div>
                      <div style={{ fontSize: 11, color: T.ink3, fontFamily: T.mono }}>{size}</div>
                    </div>
                    <span style={{ fontSize: 11, color: T.good, background: T.goodBg, padding: '1px 7px', borderRadius: 3, fontWeight: 500 }}>{status}</span>
                    <Icon d={ICONS.more} size={14} color={T.ink4}/>
                  </div>
                ))}
              </FormSection>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div style={{
          height: 56, borderTop: `1px solid ${T.line}`,
          background: T.surface, display: 'flex', alignItems: 'center',
          padding: '0 24px', gap: 10,
        }}>
          <Btn variant="ghost" icon={ICONS.chevronR} style={{ flexDirection: 'row-reverse' }}>Previous</Btn>
          <div style={{ fontSize: 11, color: T.ink3, marginLeft: 8 }}>
            <span style={{ fontFamily: T.mono, color: T.ink2 }}>04</span> of <span style={{ fontFamily: T.mono, color: T.ink2 }}>06</span> · Financials
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: T.ink4 }}>Autosaved 12s ago</span>
          <Btn variant="ghost">Save draft</Btn>
          <Btn variant="ghost">Preview</Btn>
          <Btn variant="primary" icon={ICONS.chevronR}>Continue to Team</Btn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Payment history — dense table
// ─────────────────────────────────────────────────────────────
function ViewPaymentHistory() {
  const { T, ICONS } = window;

  const Icon = ({ d, size = 14, stroke = 1.5, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
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
    return <button style={{ ...base, ...variants[variant], ...style }}>{icon && <Icon d={icon} size={13} />}{children}</button>;
  };
  const Badge = ({ tone = 'neutral', children }) => {
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
        background: map.bg, color: map.fg, padding: '2px 7px',
        borderRadius: 3, fontSize: 11, fontWeight: 500,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: map.dot }} />
        {children}
      </span>
    );
  };

  // Sidebar (payments active)
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
  const navSection = (title, items) => (
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
          <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>Parcela</div>
          <div style={{ fontSize: 10, color: T.ink4 }}>Meridian Holdings</div>
        </div>
      </div>
      <div style={{ padding: 12, flex: 1 }}>
        {navSection('Workspace', [
          ['dashboard', ICONS.dashboard, 'Dashboard'],
          ['reports',   ICONS.reports,   'Reports'],
        ])}
        {navSection('Portfolio', [
          ['property',  ICONS.property,  'Properties', 48],
          ['units',     ICONS.units,     'Units', 312],
          ['tenants',   ICONS.tenants,   'Tenants', 287],
          ['leases',    ICONS.leases,    'Leases', 287],
        ])}
        {navSection('Operations', [
          ['payments',  ICONS.payments,  'Payments', undefined, true],
          ['tickets',   ICONS.tickets,   'Work orders', 14],
          ['inspect',   ICONS.inspect,   'Inspections'],
        ])}
        {navSection('System', [['settings', ICONS.settings, 'Settings']])}
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
        <span style={{ color: T.ink3 }}>Operations</span>
        <Icon d={ICONS.chevronR} size={12} color={T.ink4} />
        <span style={{ color: T.ink3 }}>Payments</span>
        <Icon d={ICONS.chevronR} size={12} color={T.ink4} />
        <span style={{ color: T.ink, fontWeight: 500 }}>History</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ width: 28, height: 28, borderRadius: 14, background: '#2E3A2A', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>ER</div>
    </div>
  );

  // Data — 14 rows
  const payments = [
    { d: '2026-04-18', id: 'PAY-104928', tenant: 'K. Rivera',     unit: 'Harper Hall · 4B',   prop: 'Harper Hall', amt: 2150.00,  method: 'ACH',       status: 'posted',    ref: 'ch_7Q42A', late: 0 },
    { d: '2026-04-18', id: 'PAY-104927', tenant: 'M. Delacroix',  unit: 'Harper Hall · 7C',   prop: 'Harper Hall', amt: 2380.00,  method: 'Card',      status: 'posted',    ref: 'ch_7Q41K', late: 0 },
    { d: '2026-04-17', id: 'PAY-104926', tenant: 'A. Nakamura',   unit: 'Cedar Lofts · 12',   prop: 'Cedar Lofts', amt: 3100.00,  method: 'Wire',      status: 'posted',    ref: 'wr_55812', late: 0 },
    { d: '2026-04-17', id: 'PAY-104925', tenant: 'T. Wickramasinghe', unit: 'Linden Court · 3A', prop: 'Linden Court', amt: 1850.00, method: 'ACH',    status: 'pending',   ref: 'ch_7Q40F', late: 0 },
    { d: '2026-04-15', id: 'PAY-104924', tenant: 'S. Hoffmann',   unit: 'North Ridge · 18',   prop: 'North Ridge', amt: 2620.00,  method: 'ACH',       status: 'posted',    ref: 'ch_7Q3ZP', late: 0 },
    { d: '2026-04-14', id: 'PAY-104923', tenant: 'R. Albright',   unit: 'Ashford Row · 2',    prop: 'Ashford Row', amt: 1990.00,  method: 'Check',     status: 'posted',    ref: '#4418',    late: 0 },
    { d: '2026-04-12', id: 'PAY-104922', tenant: 'J. Chen',       unit: 'Harper Hall · 2A',   prop: 'Harper Hall', amt: 2150.00,  method: 'Card',      status: 'failed',    ref: 'ch_7Q3XB', late: 7 },
    { d: '2026-04-10', id: 'PAY-104921', tenant: 'E. Petit',      unit: 'Briarwood 7 · 5',    prop: 'Briarwood 7', amt: 1780.00,  method: 'ACH',       status: 'posted',    ref: 'ch_7Q3W1', late: 0 },
    { d: '2026-04-08', id: 'PAY-104920', tenant: 'L. Fontaine',   unit: 'Vine & Third · R1',  prop: 'Vine & Third',amt: 8400.00,  method: 'Wire',      status: 'posted',    ref: 'wr_55788', late: 0 },
    { d: '2026-04-05', id: 'PAY-104919', tenant: 'K. Rivera',     unit: 'Harper Hall · 4B',   prop: 'Harper Hall', amt: 500.00,   method: 'ACH',       status: 'refunded',  ref: 'ch_7Q3UJ', late: 0 },
    { d: '2026-04-02', id: 'PAY-104918', tenant: 'N. Barbosa',    unit: 'Linden Court · 9',   prop: 'Linden Court',amt: 2100.00,  method: 'Card',      status: 'posted',    ref: 'ch_7Q3S9', late: 0 },
    { d: '2026-03-29', id: 'PAY-104917', tenant: 'H. Osei',       unit: 'Harper Hall · 5D',   prop: 'Harper Hall', amt: 2240.00,  method: 'ACH',       status: 'disputed',  ref: 'ch_7Q3P7', late: 0 },
    { d: '2026-03-27', id: 'PAY-104916', tenant: 'P. Okonkwo',    unit: 'Cedar Lofts · 8',    prop: 'Cedar Lofts', amt: 2950.00,  method: 'ACH',       status: 'posted',    ref: 'ch_7Q3N2', late: 0 },
    { d: '2026-03-25', id: 'PAY-104915', tenant: 'M. Delacroix',  unit: 'Harper Hall · 7C',   prop: 'Harper Hall', amt: 2380.00,  method: 'Card',      status: 'posted',    ref: 'ch_7Q3L8', late: 0 },
  ];
  const fmt = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const statusBadge = (s) => ({
    posted:   <Badge tone="good">Posted</Badge>,
    pending:  <Badge tone="info">Pending</Badge>,
    failed:   <Badge tone="danger">Failed</Badge>,
    refunded: <Badge tone="neutral">Refunded</Badge>,
    disputed: <Badge tone="warn">Disputed</Badge>,
  }[s]);

  const Th = ({ children, align = 'left', width, sort }) => (
    <th style={{
      textAlign: align, padding: '10px 12px',
      fontSize: 11, fontWeight: 500, color: T.ink3, letterSpacing: 0.3,
      textTransform: 'uppercase', borderBottom: `1px solid ${T.line}`,
      background: '#FCFBF8', width, whiteSpace: 'nowrap',
      position: 'sticky', top: 0, zIndex: 2,
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {children}
        {sort && <Icon d={ICONS.chevronD} size={10} color={sort === 'desc' ? T.ink : T.ink4} />}
      </span>
    </th>
  );
  const Td = ({ children, align = 'left', style = {} }) => (
    <td style={{
      padding: '10px 12px', fontSize: 13, color: T.ink2, textAlign: align,
      borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: 'nowrap', ...style,
    }}>{children}</td>
  );

  // Compute bar lengths for the mini daily chart
  const byDay = [4100, 4230, 0, 3100, 1850, 2620, 1990, 0, 0, 2150, 1780, 8400, 500, 0, 0, 0, 0, 2100, 0, 2240, 2950, 2380];
  const maxB = Math.max(...byDay);

  return (
    <div style={{
      width: '100%', height: '100%', background: T.surface,
      display: 'flex', fontFamily: T.sans, color: T.ink,
      overflow: 'hidden',
    }}>
      {Sidebar}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {TopNav}
        <div style={{ flex: 1, overflow: 'auto', background: T.bg, padding: '20px 24px 24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: T.ink3, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Operations</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, letterSpacing: -0.5 }}>Payment history</div>
              <div style={{ fontSize: 13, color: T.ink3, marginTop: 2 }}>All ledger entries across your portfolio · last 30 days</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="ghost" icon={ICONS.filter}>Save view</Btn>
              <Btn variant="ghost" icon={ICONS.download}>Export CSV</Btn>
              <Btn variant="primary" icon={ICONS.plus}>Record payment</Btn>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            {/* Collected trend card */}
            <div style={{
              background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: T.ink3 }}>Collected · last 22 days</div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: T.mono, color: T.ink, letterSpacing: -0.5, marginTop: 2 }}>$41,090</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 32, marginTop: 8 }}>
                {byDay.map((v, i) => (
                  <div key={i} style={{
                    flex: 1, height: maxB ? (v / maxB) * 100 + '%' : 0,
                    minHeight: v > 0 ? 2 : 0,
                    background: v > 0 ? T.ink : T.lineSoft,
                    borderRadius: 1,
                  }}/>
                ))}
              </div>
            </div>
            {[
              ['Processed', '214', '14 pending', T.ink3],
              ['Failed', '3', '$6,450 retry', T.danger],
              ['Refunded', '1', '$500 this cycle', T.ink3],
              ['Avg. settle', '1.8 d', 'ACH median', T.ink3],
            ].map(([k, v, sub, c]) => (
              <div key={k} style={{
                background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6,
                padding: '12px 14px',
              }}>
                <div style={{ fontSize: 11, color: T.ink3 }}>{k}</div>
                <div style={{ fontSize: 22, fontWeight: 600, fontFamily: T.mono, color: T.ink, letterSpacing: -0.5, marginTop: 2 }}>{v}</div>
                <div style={{ fontSize: 11, color: c, marginTop: 4 }}>{sub}</div>
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
              {['All', 'Posted', 'Pending', 'Failed', 'Refunded', 'Disputed'].map((t, i) => (
                <div key={t} style={{
                  padding: '4px 10px', fontSize: 12, fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? T.ink : T.ink3,
                  background: i === 0 ? T.surface : 'transparent',
                  borderRadius: 4, boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                }}>{t}{i === 0 && <span style={{ marginLeft: 5, fontFamily: T.mono, fontSize: 10, color: T.ink4 }}>214</span>}</div>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: T.bg, border: `1px solid ${T.line}`, borderRadius: 5,
              padding: '4px 10px', fontSize: 12, color: T.ink2,
            }}>
              <Icon d={ICONS.calendar} size={12} color={T.ink3}/>
              <span style={{ fontFamily: T.mono }}>Mar 25 → Apr 18, 2026</span>
            </div>
            <Btn variant="ghost" size="sm" icon={ICONS.filter}>Property</Btn>
            <Btn variant="ghost" size="sm" icon={ICONS.filter}>Method</Btn>
            <Btn variant="ghost" size="sm" icon={ICONS.filter}>Tenant</Btn>
            <div style={{ width: 1, height: 20, background: T.line }} />
            <Btn variant="ghost" size="sm" icon={ICONS.search}>Search</Btn>
          </div>

          {/* Table */}
          <div style={{
            background: T.surface, border: `1px solid ${T.line}`,
            borderRadius: 6, overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <Th width={28}><input type="checkbox" style={{ accentColor: T.ink }} /></Th>
                  <Th sort="desc">Date</Th>
                  <Th>Payment ID</Th>
                  <Th>Tenant</Th>
                  <Th>Unit</Th>
                  <Th align="right">Amount</Th>
                  <Th>Method</Th>
                  <Th>Reference</Th>
                  <Th>Status</Th>
                  <Th width={32}></Th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => {
                  const highlight = p.status === 'failed' || p.status === 'disputed';
                  return (
                    <tr key={p.id} style={{ background: highlight ? '#FAF2EF' : T.surface }}>
                      <Td><input type="checkbox" style={{ accentColor: T.ink }} /></Td>
                      <Td style={{ fontFamily: T.mono, fontSize: 12, color: T.ink2 }}>{p.d}</Td>
                      <Td style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>{p.id}</Td>
                      <Td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 22, height: 22, borderRadius: 11, background: T.chipBg, color: T.ink2, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 600 }}>
                            {p.tenant.split(/[ .]/).filter(Boolean).slice(0,2).map(s=>s[0]).join('')}
                          </div>
                          <div style={{ fontSize: 13, color: T.ink, fontWeight: 500 }}>{p.tenant}</div>
                        </div>
                      </Td>
                      <Td><span style={{ fontSize: 12, color: T.ink2 }}>{p.unit}</span></Td>
                      <Td align="right" style={{ fontFamily: T.mono, fontWeight: 500, color: p.status === 'refunded' ? T.ink3 : T.ink }}>
                        {p.status === 'refunded' ? '–' : ''}{fmt(p.amt)}
                      </Td>
                      <Td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '1px 7px', background: T.chipBg, borderRadius: 3,
                          fontSize: 11, color: T.ink2, fontWeight: 500,
                        }}>
                          {p.method === 'ACH' && <Icon d={ICONS.payments} size={10}/>}
                          {p.method === 'Card' && <Icon d={ICONS.payments} size={10}/>}
                          {p.method === 'Wire' && <Icon d={ICONS.upload} size={10}/>}
                          {p.method === 'Check' && <Icon d={ICONS.doc} size={10}/>}
                          {p.method}
                        </span>
                      </Td>
                      <Td style={{ fontFamily: T.mono, fontSize: 11, color: T.ink3 }}>{p.ref}</Td>
                      <Td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {statusBadge(p.status)}
                          {p.late > 0 && <span style={{ fontSize: 10, color: T.danger, fontFamily: T.mono }}>{p.late}d late</span>}
                        </div>
                      </Td>
                      <Td><Icon d={ICONS.more} size={14} color={T.ink4} /></Td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#FCFBF8' }}>
                  <td colSpan={5} style={{ padding: '11px 12px', fontSize: 12, color: T.ink3, borderTop: `1px solid ${T.line}` }}>
                    <b style={{ color: T.ink2 }}>14</b> entries shown · gross total
                  </td>
                  <td style={{ padding: '11px 12px', textAlign: 'right', fontFamily: T.mono, fontSize: 13, fontWeight: 600, color: T.ink, borderTop: `1px solid ${T.line}` }}>$37,990.00</td>
                  <td colSpan={4} style={{ borderTop: `1px solid ${T.line}` }}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 2px', fontSize: 12, color: T.ink3 }}>
            <div>Showing <span style={{ fontFamily: T.mono, color: T.ink2 }}>1–14</span> of <span style={{ fontFamily: T.mono, color: T.ink2 }}>214</span> payments</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ padding: '4px 8px', border: `1px solid ${T.line}`, borderRadius: 4, background: T.surface }}>Prev</span>
              <span style={{ padding: '4px 8px', background: T.ink, color: '#fff', borderRadius: 4, fontFamily: T.mono }}>1</span>
              <span style={{ padding: '4px 8px', fontFamily: T.mono }}>2</span>
              <span style={{ padding: '4px 8px', fontFamily: T.mono }}>3</span>
              <span style={{ padding: '4px 8px' }}>…</span>
              <span style={{ padding: '4px 8px', fontFamily: T.mono }}>16</span>
              <span style={{ padding: '4px 8px', border: `1px solid ${T.line}`, borderRadius: 4, background: T.surface }}>Next</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ViewFullForm, ViewPaymentHistory });
