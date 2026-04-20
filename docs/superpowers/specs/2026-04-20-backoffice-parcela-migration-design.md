# Backoffice Frontend Migration to Parcela UI

**Date**: 2026-04-20
**Project**: predium-vue-backoffice-frontend
**Target**: Replace `predium-design-ui` with `@parcela/ui` (from `github:eddwinpaz/predium-parcela-ui`)

## Goal

Migrate the backoffice frontend from the old `predium-design-ui` design system to the new `@parcela/ui` (Parcela) design system, replicating the visual structure and layout patterns from the Template reference files while keeping the same data and business logic.

## Scope

- **IN**: Visual migration, component swap, layout restructure to match Template patterns
- **OUT**: New features, new data, backend changes

## Dependency Change

```json
// Remove
"predium-design-ui": "github:eddwinpaz/predium-design-ui"

// Add
"@parcela/ui": "github:eddwinpaz/predium-parcela-ui"
```

Style imports:
```ts
import '@parcela/ui/styles/tokens.css'
import '@parcela/ui/styles/global.css'
```

## Sidebar Structure

Using `PSidebar` component with sections:

```
Brand: "Predium Backoffice" / [user context]
─────────────────────────────
WORKSPACE
  Dashboard         (icon: dashboard)
GESTION
  Clientes          (icon: tenants, badge: count)
  Suscripciones     (icon: leases)
FINANZAS
  Pagos             (icon: payments)
SISTEMA
  Configuracion     (icon: settings)
```

## Layout Shell

Replace `BackofficeLayout.vue`:
- Use `PSidebar` (240px, dark/light variant from Template)
- Use `PTopNav` with breadcrumbs + search + user avatar + logout
- Main content area with `bg` background color (#FAFAF7)
- Collapsed state toggle preserved

## View Designs

### 1. Dashboard (`DashboardView.vue`)

**Layout**: Template's dashboard pattern adapted to existing data.

```
[Header: greeting + date]
[KPI Strip: 4 cards with sparklines]
  - Total Clientes | Activos | Trial | Expirados
[Grid 2 columns:]
  [Left: "Trials por Expirar" - agenda-style list]
  [Right: "Distribucion de Planes" - KPI cards stacked]
```

**Components used**:
- `PKpiCard` with sparkline for the KPI strip
- `PDataTable` or custom card list for expiring trials (styled like `PAgendaItem`)
- `PKpiCard` for plan distribution

### 2. Customer List (`CustomerListView.vue`)

**Layout**: Template's `ViewList` pattern.

```
[Header: "Clientes" title + "Nuevo cliente" PButton]
[KPI Bar: 4 cards]
  - Total | Activos | Trial | Pendiente Pago
[Toolbar: tabs (All/Active/Trial/Expired) + filter pills + search]
[PDataTable: sortable, selectable]
  Columns: Company | RUT | Email | Plan | Status | Properties | Created
  Row click -> navigate to detail
[Pagination footer]
```

**Components used**:
- `PKpiCard` (4-column grid)
- `PToolbar` with tabs + `PFilterPill`
- `PDataTable` with `PBadge` for status, `PTableCell` for formatted cells
- `PPagination`

### 3. Customer Detail (`CustomerDetailView.vue`)

**Layout**: Template's `ViewDetail` pattern (full page + tabs).

```
[Header section (white bg, border-bottom)]
  [Avatar (initials) + Company name + badges (status, plan)]
  [Subtitle: RUT, email, country]
  [Action buttons: Edit, Export, Toggle status]
  [Tabs: Overview | Suscripcion | Modulos | OtrosPagos]

[Content area (scrollable, bg background)]
  Tab: Overview
    - PFormSection grid: Company, RUT, Email, Country, Tax Rate, Created, Updated, Properties, Contracts, Users, Units
    - "Recent Activity" card (if available)

  Tab: Suscripcion
    - Financial snapshot (4-col KPI: Plan, Status, Billing Period, Token Usage)
    - ProgressBar for token usage
    - Action buttons: Change Plan, Extend Trial, Update Credits

  Tab: Modulos
    - Grid of checkboxes (2-3 columns)
    - Plan-included modules disabled
    - Save button

  Tab: OtrosPagos
    - Status badge
    - Detail fields (Convenio ID, Recaudador ID, AES Key, AES IV, Description)
    - Deactivate button
```

**Components used**:
- `PAvatar`, `PBadge`, `PButton`
- `PTabs`
- `PFormSection` with grid layout
- `PKpiCard` for subscription metrics
- `PProgressBar` for tokens
- `PCheckbox` grid for modules
- `PModal` for action confirmations

### 4. Subscription List (`SubscriptionListView.vue`)

**Layout**: Same as Customer List pattern.

```
[Header: "Suscripciones" title]
[Toolbar: tabs (All/Active/Trial/Expired) + Plan filter]
[PDataTable]
  Columns: Customer | Plan | Status | Billing Period | Next Billing | Tokens (used/limit)
  Row click -> navigate to customer detail
[Pagination]
```

### 5. Payments (`PaymentsView.vue`)

**Layout**: KPI overview + selectable month grid + detail table.

```
[Header: "Pagos" title + year context]
[KPI Strip: Total anual, Pagados, Pendientes, Promedio mensual]
[Month Grid: 3-4 columns of month cards]
  Each card: Month name, Total CLP, Paid count, Pending count
  Click to select -> loads detail below
[Selected Month Detail:]
  [PDataTable]
    Columns: Customer | Plan | Amount | Status | Period | Paid Date
```

**Components used**:
- `PKpiCard` for annual summary
- Custom month cards (styled like PKpiCard with click state)
- `PDataTable` with `PBadge` for payment status

## Forms

### Create Customer (Right Drawer + Stepper)

Uses `PRightDrawer` with `PStepper` (4 steps):

```
Step 1: Empresa
  - Company Name, RUT, Country, Tax Rate

Step 2: Usuario Principal
  - Name, Email, Phone, Password

Step 3: Plan y Modulos
  - Plan selection (PSegmentedButton: STARTER/PROFESIONAL/PREMIUM)
  - Module checkboxes grid

Step 4: OtrosPagos (optional)
  - Toggle enable
  - Convenio ID, Recaudador ID, AES Key, AES IV, Description
```

Footer: Back | Save draft | Continue (with progress indicator)

### Action Modals (PModal)

- **ChangePlanModal**: Select plan + confirm
- **ExtendTrialModal**: Date picker + confirm
- **UpdateCreditsModal**: Token limit input + reset checkbox + confirm
- **ToggleStatusModal**: Destructive confirmation (ViewModal pattern with impact summary)

## Component Mapping (Old -> New)

| predium-design-ui | @parcela/ui |
|---|---|
| SidebarNav | PSidebar |
| NavHeader | PTopNav |
| Button | PButton |
| Badge | PBadge |
| Card | (custom div with Parcela tokens) |
| Table | PDataTable |
| Input | PInput |
| Select | PSelect |
| Checkbox | PCheckbox |
| Modal | PModal |
| Drawer | PRightDrawer |
| Tabs | PTabs |
| Pagination | (built into PDataTable) |
| Breadcrumbs | PBreadcrumbTrail |
| Spinner | PSpinner |
| KpiCard | PKpiCard |
| DetailSection | PFormSection |
| FormControl | PFormField |
| Toggle | PToggle |
| ProgressBar | PProgressBar |
| Separator | (border utility) |
| SnackbarProvider | PSnackbar (useSnackbar) |

## What Stays the Same

- **Hooks**: `useCustomers`, `useCustomerDetail`, `usePayments`, `useSubscriptions` (untouched)
- **Router**: Same routes, same lazy loading
- **Auth**: Same token-based guard
- **Interfaces**: All TypeScript interfaces unchanged
- **Validation**: Zod schemas in CreateCustomerDrawer stay the same
- **API calls**: All axios calls unchanged
- **Language**: Spanish UI labels maintained

## File Changes Summary

| File | Action |
|---|---|
| `package.json` | Swap dependency |
| `main.ts` | Change style imports |
| `App.vue` | Change SnackbarProvider to PSnackbar pattern |
| `BackofficeLayout.vue` | Rewrite with PSidebar + PTopNav |
| `DashboardView.vue` | Rewrite layout with PKpiCard + agenda pattern |
| `StatusCards.vue` | Replace with PKpiCard components |
| `PlanDistribution.vue` | Replace with PKpiCard components |
| `ExpiringTrials.vue` | Replace with agenda-style list |
| `CustomerListView.vue` | Rewrite with ViewList pattern |
| `CustomerDetailView.vue` | Rewrite with ViewDetail pattern (full page + tabs) |
| `CreateCustomerDrawer.vue` | Rewrite as PRightDrawer + PStepper |
| `CustomerInfo.vue` | Replace with PFormSection |
| `SubscriptionCard.vue` | Replace with PKpiCard + PProgressBar |
| `ModulesCard.vue` | Replace with PCheckbox grid |
| `OtrosPagosCard.vue` | Replace with PFormSection |
| `ChangePlanModal.vue` | Rewrite with PModal |
| `ExtendTrialModal.vue` | Rewrite with PModal |
| `UpdateCreditsModal.vue` | Rewrite with PModal |
| `ToggleStatusModal.vue` | Rewrite with PModal (destructive pattern) |
| `SubscriptionListView.vue` | Rewrite with ViewList pattern |
| `PaymentsView.vue` | Rewrite layout |
| `MonthlyChart.vue` | Replace with PKpiCard grid |
| `MonthDetailTable.vue` | Replace with PDataTable |
| `SessionManagerComponent.vue` | Minimal change (just wrapping) |

## Design Tokens in Use

All views will use Parcela tokens via Tailwind classes:
- Backgrounds: `bg-bg`, `bg-surface`
- Text: `text-ink`, `text-ink2`, `text-ink3`, `text-ink4`
- Borders: `border-line`, `border-lineSoft`
- Status: `text-good`, `bg-goodBg`, `text-warn`, `bg-warnBg`, `text-danger`, `bg-dangerBg`
- Spacing: Parcela spacing scale (compact, data-dense)
- Typography: Inter (sans) + IBM Plex Mono (mono), 13px base
