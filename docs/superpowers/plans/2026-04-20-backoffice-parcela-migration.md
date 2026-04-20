# Backoffice Parcela UI Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `predium-vue-backoffice-frontend` from `predium-design-ui` to `@parcela/ui`, adopting Template layout patterns (sidebar sections, KPI strips, toolbar tabs, full-page detail with tabs, right-drawer forms).

**Architecture:** Swap the component library dependency, rewrite layout shell (PSidebar + PTopNav), then rewrite each view top-down following the Template patterns. Hooks, interfaces, router, and auth stay untouched.

**Tech Stack:** Vue 3, TypeScript, @parcela/ui (from github:eddwinpaz/predium-parcela-ui), TailwindCSS v4, Lucide Vue Next icons, dayjs, zod, axios.

**Working directory:** `/Users/eddwinpaz/Documents/work/predium/predium-vue-backoffice-frontend`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Swap dependency |
| `src/main.ts` | Modify | Change style imports |
| `src/assets/main.css` | Modify | Change token import |
| `src/App.vue` | Modify | Swap SnackbarProvider → PSnackbar |
| `src/layouts/BackofficeLayout.vue` | Rewrite | PSidebar + PTopNav shell |
| `src/dashboard/views/DashboardView.vue` | Rewrite | KPI strip + agenda layout |
| `src/dashboard/components/StatusCards.vue` | Rewrite | PKpiCard grid |
| `src/dashboard/components/PlanDistribution.vue` | Rewrite | PKpiCard grid |
| `src/dashboard/components/ExpiringTrials.vue` | Rewrite | Agenda-style list |
| `src/customers/views/CustomerListView.vue` | Rewrite | ViewList pattern |
| `src/customers/views/CustomerDetailView.vue` | Rewrite | ViewDetail full-page + tabs |
| `src/customers/components/CustomerInfo.vue` | Rewrite | PFormSection grid |
| `src/customers/components/SubscriptionCard.vue` | Rewrite | PKpiCard + PProgressBar |
| `src/customers/components/ModulesCard.vue` | Rewrite | PCheckbox grid |
| `src/customers/components/OtrosPagosCard.vue` | Rewrite | PFormField grid |
| `src/customers/components/CreateCustomerDrawer.vue` | Rewrite | PRightDrawer + PStepper |
| `src/customers/components/actions/ChangePlanModal.vue` | Rewrite | PModal |
| `src/customers/components/actions/ExtendTrialModal.vue` | Rewrite | PModal |
| `src/customers/components/actions/UpdateCreditsModal.vue` | Rewrite | PModal |
| `src/customers/components/actions/ToggleStatusModal.vue` | Rewrite | PModal destructive |
| `src/subscriptions/views/SubscriptionListView.vue` | Rewrite | ViewList pattern |
| `src/payments/views/PaymentsView.vue` | Rewrite | KPI + month grid + detail |
| `src/payments/components/MonthlyChart.vue` | Rewrite | PKpiCard clickable grid |
| `src/payments/components/MonthDetailTable.vue` | Rewrite | PDataTable |

**Untouched files:** All hooks (`useCustomers.ts`, `useCustomerDetail.ts`, `usePayments.ts`, `useSubscriptions.ts`, `useApi.ts`, `useAuth.ts`), all interfaces, router, login views, `SessionManagerComponent.vue`.

---

## Task 1: Swap Dependency & Style Imports

**Files:**
- Modify: `package.json`
- Modify: `src/main.ts`
- Modify: `src/assets/main.css`

- [ ] **Step 1: Update package.json**

```json
// In package.json, replace the predium-design-ui dependency:
// Remove:   "predium-design-ui": "github:eddwinpaz/predium-design-ui"
// Add:      "@parcela/ui": "github:eddwinpaz/predium-parcela-ui"
```

- [ ] **Step 2: Update main.ts**

Replace the full content of `src/main.ts`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@parcela/ui/styles/tokens.css'
import '@parcela/ui/styles/global.css'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 3: Update main.css**

Replace the full content of `src/assets/main.css`:

```css
@import 'tailwindcss';
```

- [ ] **Step 4: Install dependencies**

Run: `npm install` (or `pnpm install` depending on lockfile)

- [ ] **Step 5: Commit**

```bash
git add package.json src/main.ts src/assets/main.css pnpm-lock.yaml
git commit -m "chore: swap predium-design-ui for @parcela/ui"
```

---

## Task 2: App.vue — Swap Snackbar Provider

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Rewrite App.vue**

```vue
<script setup lang="ts">
import { PSnackbar } from '@parcela/ui'
import SessionManagerComponent from '@/components/SessionManagerComponent.vue'
</script>

<template>
  <PSnackbar placement="top">
    <SessionManagerComponent />
    <router-view />
  </PSnackbar>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/App.vue
git commit -m "feat: swap SnackbarProvider to PSnackbar from @parcela/ui"
```

---

## Task 3: BackofficeLayout — PSidebar + PTopNav Shell

**Files:**
- Modify: `src/layouts/BackofficeLayout.vue`

- [ ] **Step 1: Rewrite BackofficeLayout.vue**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PSidebar, PTopNav, PButton, PBadge } from '@parcela/ui'
import { useAuth } from '@/hooks/useAuth'
import {
  LayoutDashboard, Users, CreditCard, Receipt, Settings,
} from 'lucide-vue-next'

const { user, logout } = useAuth()
const route = useRoute()
const router = useRouter()
const expanded = ref(true)

const sections = [
  {
    title: 'Workspace',
    items: [
      { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { key: 'customers', icon: Users, label: 'Clientes' },
      { key: 'subscriptions', icon: Receipt, label: 'Suscripciones' },
    ],
  },
  {
    title: 'Finanzas',
    items: [
      { key: 'payments', icon: CreditCard, label: 'Pagos' },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { key: 'settings', icon: Settings, label: 'Configuracion' },
    ],
  },
]

const activeKey = computed(() => {
  if (route.path === '/') return 'dashboard'
  if (route.path.startsWith('/customers')) return 'customers'
  if (route.path === '/subscriptions') return 'subscriptions'
  if (route.path === '/payments') return 'payments'
  return ''
})

const breadcrumb = computed(() => {
  const crumbs: string[] = []
  if (route.path === '/') crumbs.push('Workspace', 'Dashboard')
  else if (route.path === '/customers') crumbs.push('Gestion', 'Clientes')
  else if (route.path.startsWith('/customers/')) crumbs.push('Gestion', 'Clientes', 'Detalle')
  else if (route.path === '/subscriptions') crumbs.push('Gestion', 'Suscripciones')
  else if (route.path === '/payments') crumbs.push('Finanzas', 'Pagos')
  return crumbs
})

function onNavigate(key: string) {
  const map: Record<string, string> = {
    dashboard: '/',
    customers: '/customers',
    subscriptions: '/subscriptions',
    payments: '/payments',
    settings: '/',
  }
  router.push(map[key] ?? '/')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <PSidebar
      brand="Predium"
      org="Backoffice"
      :sections="sections"
      :active="activeKey"
      v-model:expanded="expanded"
      @navigate="onNavigate"
    />
    <div class="flex flex-col flex-1 min-w-0">
      <PTopNav
        :breadcrumb="breadcrumb"
        :search="false"
        :user-initials="user?.name?.slice(0, 2).toUpperCase() ?? 'BO'"
      >
      </PTopNav>
      <main class="flex-1 overflow-y-auto" style="background: var(--color-bg);">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify app boots without errors**

Run: `npm run dev` — open browser, confirm sidebar + topnav render, navigation works.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BackofficeLayout.vue
git commit -m "feat: rewrite BackofficeLayout with PSidebar + PTopNav"
```

---

## Task 4: Dashboard View

**Files:**
- Modify: `src/dashboard/views/DashboardView.vue`
- Modify: `src/dashboard/components/StatusCards.vue`
- Modify: `src/dashboard/components/PlanDistribution.vue`
- Modify: `src/dashboard/components/ExpiringTrials.vue`

- [ ] **Step 1: Rewrite StatusCards.vue**

```vue
<script setup lang="ts">
import { PKpiCard } from '@parcela/ui'

defineProps<{
  statusCounts: Record<string, number>
  customersLast30Days: number
}>()

const statusConfig: { key: string; label: string; tone: 'good' | 'warn' | 'danger' | 'neutral' }[] = [
  { key: 'ACTIVE', label: 'Activos', tone: 'good' },
  { key: 'TRIAL', label: 'Trial', tone: 'neutral' },
  { key: 'TRIAL_EXPIRED', label: 'Trial Expirado', tone: 'warn' },
  { key: 'PENDING_PAYMENT', label: 'Pago Pendiente', tone: 'warn' },
  { key: 'EXPIRED', label: 'Expirados', tone: 'danger' },
  { key: 'CANCELLED', label: 'Cancelados', tone: 'danger' },
  { key: 'SUSPENDED', label: 'Suspendidos', tone: 'neutral' },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <PKpiCard
      v-for="s in statusConfig"
      :key="s.key"
      :label="s.label"
      :value="String(statusCounts[s.key] ?? 0)"
      :tone="s.tone"
    />
    <PKpiCard
      label="Nuevos (30 dias)"
      :value="String(customersLast30Days)"
      tone="good"
    />
  </div>
</template>
```

- [ ] **Step 2: Rewrite PlanDistribution.vue**

```vue
<script setup lang="ts">
import { PKpiCard } from '@parcela/ui'

defineProps<{
  planCounts: Record<string, number>
}>()

const plans: { key: string; label: string; tone: 'neutral' | 'good' | 'warn' }[] = [
  { key: 'STARTER', label: 'Starter', tone: 'neutral' },
  { key: 'PROFESIONAL', label: 'Profesional', tone: 'warn' },
  { key: 'PREMIUM', label: 'Premium', tone: 'good' },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <PKpiCard
      v-for="p in plans"
      :key="p.key"
      :label="p.label"
      :value="String(planCounts[p.key] ?? 0)"
      :tone="p.tone"
    />
  </div>
</template>
```

- [ ] **Step 3: Rewrite ExpiringTrials.vue**

```vue
<script setup lang="ts">
import { PBadge } from '@parcela/ui'
import type { ExpiringTrial } from '@/interfaces/dashboard'

defineProps<{
  trials: ExpiringTrial[]
}>()
</script>

<template>
  <div class="border border-[var(--color-line)] rounded-[var(--radius-xl)] overflow-hidden" style="background: var(--color-surface);">
    <div
      v-for="(trial, i) in trials"
      :key="trial.customerId"
      class="flex items-center gap-3 px-4 py-3"
      :class="{ 'border-b border-[var(--color-line-soft)]': i < trials.length - 1 }"
    >
      <div
        class="w-1.5 h-1.5 rounded-full flex-shrink-0"
        :class="trial.daysRemaining <= 2 ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-warn)]'"
      />
      <div class="flex-1 min-w-0">
        <div class="text-[13px] font-medium" style="color: var(--color-ink);">{{ trial.companyName }}</div>
        <div class="text-[11px]" style="color: var(--color-ink3);">{{ trial.primaryUserEmail }}</div>
      </div>
      <div class="text-[12px] font-mono" style="color: var(--color-ink2);">{{ trial.trialEndDate }}</div>
      <PBadge :tone="trial.daysRemaining <= 2 ? 'danger' : 'warn'">{{ trial.daysRemaining }}d</PBadge>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Rewrite DashboardView.vue**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PSpinner } from '@parcela/ui'
import { useApi } from '@/hooks/useApi'
import type { DashboardSummary } from '@/interfaces/dashboard'
import StatusCards from '../components/StatusCards.vue'
import PlanDistribution from '../components/PlanDistribution.vue'
import ExpiringTrials from '../components/ExpiringTrials.vue'

const { get } = useApi()
const data = ref<DashboardSummary | null>(null)
const loading = ref(true)

onMounted(async () => {
  data.value = await get<DashboardSummary>('/dashboard')
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-5">
      <div class="text-[11px] font-medium uppercase tracking-wider" style="color: var(--color-ink4);">Workspace</div>
      <div class="text-[22px] font-semibold tracking-tight" style="color: var(--color-ink);">Dashboard</div>
    </div>

    <PSpinner v-if="loading" />

    <template v-else-if="data">
      <div class="space-y-5">
        <!-- KPI Strip: Status counts -->
        <section>
          <div class="text-[11px] font-medium uppercase tracking-wider mb-3" style="color: var(--color-ink3);">Por Estado</div>
          <StatusCards
            :status-counts="data.statusCounts"
            :customers-last30-days="data.customersLast30Days"
          />
        </section>

        <!-- Plan distribution -->
        <section>
          <div class="text-[11px] font-medium uppercase tracking-wider mb-3" style="color: var(--color-ink3);">Por Plan</div>
          <PlanDistribution :plan-counts="data.planCounts" />
        </section>

        <!-- Expiring trials (agenda-style) -->
        <section v-if="data.expiringTrials.length > 0">
          <div class="flex items-center justify-between mb-3">
            <div class="text-[13px] font-semibold" style="color: var(--color-ink);">Trials por expirar (&lt; 7 dias)</div>
            <span class="text-[11px] font-mono" style="color: var(--color-warn);">{{ data.expiringTrials.length }} pendientes</span>
          </div>
          <ExpiringTrials :trials="data.expiringTrials" />
        </section>
      </div>
    </template>
  </div>
</template>
```

- [ ] **Step 5: Verify dashboard renders**

Run: `npm run dev` — open `/`, confirm KPIs + trials list render correctly.

- [ ] **Step 6: Commit**

```bash
git add src/dashboard/
git commit -m "feat: migrate dashboard to @parcela/ui with KPI strip + agenda layout"
```

---

## Task 5: Customer List View

**Files:**
- Modify: `src/customers/views/CustomerListView.vue`

- [ ] **Step 1: Rewrite CustomerListView.vue**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PButton, PInput, PDataTable, PBadge, PToolbar, PKpiCard } from '@parcela/ui'
import { useCustomers } from '../hooks/useCustomers'
import type { CustomerList } from '@/interfaces/customer'
import CreateCustomerDrawer from '../components/CreateCustomerDrawer.vue'
import dayjs from 'dayjs'
import { Plus, Upload, Download } from 'lucide-vue-next'

const router = useRouter()
const { customers, totalPages, totalItems, currentPage, loading, fetchCustomers } = useCustomers()
const showCreateDrawer = ref(false)
const search = ref('')
const activeTab = ref(0)

const tabs = [
  { label: 'Todos', count: 0 },
  { label: 'Activo' },
  { label: 'Trial' },
  { label: 'Expirado' },
  { label: 'Suspendido' },
]

const tabStatusMap: Record<number, string | undefined> = {
  0: undefined,
  1: 'ACTIVE',
  2: 'TRIAL',
  3: 'EXPIRED',
  4: 'SUSPENDED',
}

const columns = [
  { key: 'companyName', label: 'Empresa', sortable: true },
  { key: 'companyTaxNumber', label: 'RUT' },
  { key: 'primaryUserEmail', label: 'Email' },
  { key: 'planType', label: 'Plan' },
  { key: 'subscriptionStatus', label: 'Estado' },
  { key: 'propertyCount', label: 'Propiedades', align: 'right' as const, mono: true },
  { key: 'createdOn', label: 'Creado' },
]

const statusTone: Record<string, 'good' | 'warn' | 'danger' | 'neutral' | 'info'> = {
  ACTIVE: 'good', TRIAL: 'info', TRIAL_EXPIRED: 'warn',
  PENDING_PAYMENT: 'warn', EXPIRED: 'danger', CANCELLED: 'danger', SUSPENDED: 'neutral',
}

function applyFilters() {
  fetchCustomers({
    search: search.value || undefined,
    status: tabStatusMap[activeTab.value],
  })
}

function onTabChange(idx: number) {
  activeTab.value = idx
  fetchCustomers({
    search: search.value || undefined,
    status: tabStatusMap[idx],
  })
}

function onPageChange(page: number) {
  fetchCustomers({
    page: page - 1,
    search: search.value || undefined,
    status: tabStatusMap[activeTab.value],
  })
}

function onRowClick(row: CustomerList) {
  router.push(`/customers/${row.id}`)
}

onMounted(() => fetchCustomers())
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-end justify-between mb-4">
      <div>
        <div class="text-[11px] font-medium uppercase tracking-wider" style="color: var(--color-ink4);">Gestion</div>
        <div class="text-[22px] font-semibold tracking-tight" style="color: var(--color-ink);">Clientes</div>
      </div>
      <div class="flex gap-2">
        <PButton variant="ghost" :icon="Download">Exportar</PButton>
        <PButton variant="primary" :icon="Plus" @click="showCreateDrawer = true">Nuevo cliente</PButton>
      </div>
    </div>

    <!-- Toolbar with tabs -->
    <PToolbar
      :tabs="tabs"
      :active-tab="activeTab"
      @update:active-tab="onTabChange"
    >
      <template #actions>
        <PInput
          v-model="search"
          placeholder="Buscar por nombre, RUT o email..."
          size="sm"
          @keyup.enter="applyFilters"
        />
      </template>
    </PToolbar>

    <!-- Data Table -->
    <div class="mt-3">
      <PDataTable
        :columns="columns"
        :rows="(customers as Record<string, unknown>[])"
        :pagination="{ page: currentPage + 1, pageSize: 20, totalRows: totalItems }"
        @page-change="onPageChange"
      >
        <template #cell-primaryUserEmail="{ value }">
          <span class="text-[12px] font-mono" style="color: var(--color-ink3);">{{ value }}</span>
        </template>
        <template #cell-planType="{ value }">
          <PBadge v-if="value" tone="info">{{ value }}</PBadge>
          <span v-else style="color: var(--color-ink4);">-</span>
        </template>
        <template #cell-subscriptionStatus="{ value }">
          <PBadge v-if="value" :tone="statusTone[value as string] ?? 'neutral'">{{ value }}</PBadge>
        </template>
        <template #cell-createdOn="{ value }">
          {{ dayjs(value as string).format('DD/MM/YYYY') }}
        </template>
      </PDataTable>
    </div>

    <CreateCustomerDrawer
      :open="showCreateDrawer"
      @close="showCreateDrawer = false"
      @created="(id: string) => { showCreateDrawer = false; router.push(`/customers/${id}`) }"
    />
  </div>
</template>
```

- [ ] **Step 2: Verify list view renders**

Run: `npm run dev` — open `/customers`, confirm toolbar, tabs, table, pagination work.

- [ ] **Step 3: Commit**

```bash
git add src/customers/views/CustomerListView.vue
git commit -m "feat: migrate CustomerListView to Parcela ViewList pattern"
```

---

## Task 6: Customer Detail View

**Files:**
- Modify: `src/customers/views/CustomerDetailView.vue`
- Modify: `src/customers/components/CustomerInfo.vue`
- Modify: `src/customers/components/SubscriptionCard.vue`
- Modify: `src/customers/components/ModulesCard.vue`
- Modify: `src/customers/components/OtrosPagosCard.vue`

- [ ] **Step 1: Rewrite CustomerInfo.vue**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { PToggle } from '@parcela/ui'
import type { CustomerDetail } from '@/interfaces/customer'
import dayjs from 'dayjs'

const props = defineProps<{ customer: CustomerDetail }>()
const emit = defineEmits<{ toggleStatus: [isActive: boolean] }>()

const fields = computed(() => [
  { label: 'Empresa', value: props.customer.companyName },
  { label: 'RUT', value: props.customer.companyTaxNumber },
  { label: 'Email Primario', value: props.customer.primaryUserEmail ?? '-' },
  { label: 'Pais', value: props.customer.country ?? '-' },
  { label: 'Tasa Impositiva', value: `${props.customer.taxRate}%` },
  { label: 'Creado', value: dayjs(props.customer.createdOn).format('DD/MM/YYYY') },
  { label: 'Ultima actividad', value: props.customer.updatedOn ? dayjs(props.customer.updatedOn).format('DD/MM/YYYY HH:mm') : '-' },
  { label: 'Estado', value: props.customer.isActive ? 'Activo' : 'Inactivo' },
  { label: 'Propiedades', value: String(props.customer.propertyCount) },
  { label: 'Contratos', value: String(props.customer.contractCount) },
  { label: 'Usuarios', value: String(props.customer.userCount) },
  { label: 'Unidades', value: String(props.customer.unitCount) },
])
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div class="text-[13px] font-semibold" style="color: var(--color-ink);">Informacion General</div>
      <PToggle :model-value="customer.isActive" @update:model-value="emit('toggleStatus', $event)" label="Activo" />
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-4 p-4 rounded-[var(--radius-xl)] border border-[var(--color-line)]"
      style="background: var(--color-surface);"
    >
      <div v-for="f in fields" :key="f.label">
        <div class="text-[11px] mb-1" style="color: var(--color-ink3);">{{ f.label }}</div>
        <div class="text-[13px] font-medium" style="color: var(--color-ink);">{{ f.value }}</div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Rewrite SubscriptionCard.vue**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { PKpiCard, PProgressBar, PButton } from '@parcela/ui'
import type { CustomerDetail } from '@/interfaces/customer'
import dayjs from 'dayjs'

const props = defineProps<{ customer: CustomerDetail }>()
const emit = defineEmits<{ changePlan: []; extendTrial: []; updateCredits: [] }>()

function tokenPercentage(): number {
  if (!props.customer.monthlyTokenLimit) return 0
  return Math.round((props.customer.tokensUsed / props.customer.monthlyTokenLimit) * 100)
}

const tokenTone = computed(() => {
  const pct = tokenPercentage()
  if (pct >= 90) return 'danger' as const
  if (pct >= 70) return 'warn' as const
  return 'good' as const
})
</script>

<template>
  <div class="space-y-4">
    <!-- Action buttons -->
    <div class="flex gap-2">
      <PButton variant="ghost" size="sm" @click="emit('changePlan')">Cambiar Plan</PButton>
      <PButton variant="ghost" size="sm" @click="emit('extendTrial')">Extender Trial</PButton>
      <PButton variant="ghost" size="sm" @click="emit('updateCredits')">Creditos</PButton>
    </div>

    <!-- KPI strip -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <PKpiCard label="Plan" :value="customer.planType ?? '-'" tone="neutral" />
      <PKpiCard label="Estado" :value="customer.subscriptionStatus ?? '-'" tone="good" />
      <PKpiCard label="Periodo" :value="customer.billingPeriod === 'MONTHLY' ? 'Mensual' : customer.billingPeriod === 'ANNUAL' ? 'Anual' : customer.billingPeriod ?? '-'" tone="neutral" />
      <PKpiCard label="Prox. Facturacion" :value="customer.nextBillingDate ? dayjs(customer.nextBillingDate).format('DD/MM/YYYY') : '-'" tone="neutral" />
    </div>

    <!-- Token usage -->
    <div class="p-4 rounded-[var(--radius-xl)] border border-[var(--color-line)]" style="background: var(--color-surface);">
      <div class="text-[11px] font-medium uppercase tracking-wider mb-2" style="color: var(--color-ink3);">Uso de Tokens</div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-[13px] font-mono" style="color: var(--color-ink);">{{ customer.tokensUsed.toLocaleString() }} / {{ customer.monthlyTokenLimit.toLocaleString() }}</span>
        <span class="text-[12px] font-mono" style="color: var(--color-ink2);">{{ tokenPercentage() }}%</span>
      </div>
      <PProgressBar :value="tokenPercentage()" :tone="tokenTone" />
    </div>
  </div>
</template>
```

- [ ] **Step 3: Rewrite ModulesCard.vue**

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { PCheckbox, PButton } from '@parcela/ui'
import type { CustomerModules } from '@/interfaces/customer'

const props = defineProps<{ modules: CustomerModules; saving?: boolean }>()
const emit = defineEmits<{ save: [modules: string[]] }>()

const selected = ref<Set<string>>(new Set(props.modules.enabledModules))

watch(() => props.modules, (m) => { selected.value = new Set(m.enabledModules) })

function toggle(mod: string) {
  if (props.modules.planModules.includes(mod)) return
  if (selected.value.has(mod)) { selected.value.delete(mod) } else { selected.value.add(mod) }
}

function save() { emit('save', Array.from(selected.value)) }
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div class="text-[13px] font-semibold" style="color: var(--color-ink);">Modulos</div>
      <PButton variant="primary" size="sm" :disabled="saving" @click="save">Guardar</PButton>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <PCheckbox
        v-for="mod in modules.availableModules"
        :key="mod"
        :model-value="selected.has(mod)"
        :disabled="modules.planModules.includes(mod)"
        @update:model-value="toggle(mod)"
      >
        {{ mod }}
        <span v-if="modules.planModules.includes(mod)" class="text-[10px] ml-1" style="color: var(--color-ink4);">(plan)</span>
      </PCheckbox>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Rewrite OtrosPagosCard.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PInput, PButton, PBadge, PFormField } from '@parcela/ui'
import type { OtrosPagosConfig } from '@/interfaces/customer'

const props = defineProps<{ config: OtrosPagosConfig | null; saving?: boolean }>()
const emit = defineEmits<{
  save: [data: { convenioId: string; recaudadorId: string; aesKey: string; aesIv: string; description?: string }]
  deactivate: []
}>()

const form = ref({
  convenioId: props.config?.convenioId ?? '',
  recaudadorId: props.config?.recaudadorId ?? '',
  aesKey: '',
  aesIv: '',
  description: props.config?.description ?? '',
})

function submit() { emit('save', { ...form.value }) }
</script>

<template>
  <div class="p-4 rounded-[var(--radius-xl)] border border-[var(--color-line)]" style="background: var(--color-surface);">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="text-[13px] font-semibold" style="color: var(--color-ink);">OtrosPagos</div>
        <PBadge v-if="config" :tone="config.isActive ? 'good' : 'danger'">{{ config.isActive ? 'Activo' : 'Inactivo' }}</PBadge>
        <PBadge v-else tone="neutral">Sin configurar</PBadge>
      </div>
      <PButton v-if="config?.isActive" variant="danger" size="sm" @click="emit('deactivate')">Desactivar</PButton>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <PFormField label="Convenio ID" required>
        <PInput v-model="form.convenioId" placeholder="200614" />
      </PFormField>
      <PFormField label="Recaudador ID" required>
        <PInput v-model="form.recaudadorId" placeholder="REC001" />
      </PFormField>
      <PFormField label="AES Key" required>
        <PInput v-model="form.aesKey" type="password" placeholder="Clave AES" />
      </PFormField>
      <PFormField label="AES IV" required>
        <PInput v-model="form.aesIv" type="password" placeholder="Vector AES" />
      </PFormField>
      <PFormField label="Descripcion" :cols="2">
        <PInput v-model="form.description" placeholder="Notas opcionales" />
      </PFormField>
    </div>

    <div class="flex justify-end mt-4">
      <PButton variant="primary" size="sm" :disabled="saving" @click="submit">Guardar</PButton>
    </div>
  </div>
</template>
```

- [ ] **Step 5: Rewrite CustomerDetailView.vue**

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PTabs, PSpinner, PAvatar, PBadge, PButton } from '@parcela/ui'
import { useSnackbar } from '@parcela/ui'
import { useCustomerDetail } from '../hooks/useCustomerDetail'
import CustomerInfo from '../components/CustomerInfo.vue'
import SubscriptionCard from '../components/SubscriptionCard.vue'
import ModulesCard from '../components/ModulesCard.vue'
import OtrosPagosCard from '../components/OtrosPagosCard.vue'
import ChangePlanModal from '../components/actions/ChangePlanModal.vue'
import ExtendTrialModal from '../components/actions/ExtendTrialModal.vue'
import UpdateCreditsModal from '../components/actions/UpdateCreditsModal.vue'
import ToggleStatusModal from '../components/actions/ToggleStatusModal.vue'

const route = useRoute()
const customerId = route.params.id as string
const { enqueue } = useSnackbar()

const {
  customer, modules, otrospagosConfig, loading,
  fetchDetail, fetchModules, fetchOtrosPagos,
  toggleStatus, changePlan, extendTrial, updateCredits,
  updateModules, saveOtrosPagos, deactivateOtrosPagos,
} = useCustomerDetail(customerId)

const activeTab = ref('info')
const tabs = [
  { key: 'info', label: 'Informacion' },
  { key: 'subscription', label: 'Suscripcion' },
  { key: 'modules', label: 'Modulos' },
  { key: 'otrospagos', label: 'OtrosPagos' },
]

const showChangePlan = ref(false)
const showExtendTrial = ref(false)
const showUpdateCredits = ref(false)
const showToggleStatus = ref(false)
const saving = ref(false)

const statusTone: Record<string, 'good' | 'warn' | 'danger' | 'neutral' | 'info'> = {
  ACTIVE: 'good', TRIAL: 'info', TRIAL_EXPIRED: 'warn',
  PENDING_PAYMENT: 'warn', EXPIRED: 'danger', CANCELLED: 'danger', SUSPENDED: 'neutral',
}

async function handleAction(action: () => Promise<void>, successMsg: string) {
  saving.value = true
  try {
    await action()
    enqueue({ message: successMsg, kind: 'success' })
  } catch (e: any) {
    enqueue({ message: e.response?.data?.message ?? 'Error', kind: 'error' })
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await fetchDetail()
  await Promise.all([fetchModules(), fetchOtrosPagos()])
})
</script>

<template>
  <div>
    <PSpinner v-if="loading" />

    <template v-else-if="customer">
      <!-- Detail Header (ViewDetail pattern) -->
      <div class="pb-4 mb-4 border-b border-[var(--color-line)]">
        <div class="flex items-start gap-4">
          <PAvatar :initials="customer.companyName.slice(0, 2).toUpperCase()" size="lg" />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] font-mono" style="color: var(--color-ink3);">{{ customer.id }}</span>
              <PBadge :tone="customer.isActive ? 'good' : 'danger'">{{ customer.isActive ? 'Activo' : 'Inactivo' }}</PBadge>
              <PBadge v-if="customer.planType" tone="info">{{ customer.planType }}</PBadge>
            </div>
            <div class="text-[24px] font-semibold tracking-tight" style="color: var(--color-ink);">{{ customer.companyName }}</div>
            <div class="text-[13px]" style="color: var(--color-ink3);">{{ customer.companyTaxNumber }} · {{ customer.primaryUserEmail }}</div>
          </div>
          <div class="flex gap-2">
            <PButton variant="ghost" @click="showToggleStatus = true">{{ customer.isActive ? 'Desactivar' : 'Activar' }}</PButton>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mt-4">
          <PTabs v-model="activeTab" :tabs="tabs" />
        </div>
      </div>

      <!-- Tab Content -->
      <CustomerInfo v-if="activeTab === 'info'" :customer="customer" @toggle-status="showToggleStatus = true" />
      <SubscriptionCard v-if="activeTab === 'subscription'" :customer="customer" @change-plan="showChangePlan = true" @extend-trial="showExtendTrial = true" @update-credits="showUpdateCredits = true" />
      <ModulesCard v-if="activeTab === 'modules' && modules" :modules="modules" :saving="saving" @save="(m: string[]) => handleAction(() => updateModules(m), 'Modulos actualizados')" />
      <OtrosPagosCard v-if="activeTab === 'otrospagos'" :config="otrospagosConfig" :saving="saving" @save="(d: any) => handleAction(() => saveOtrosPagos(d), 'Configuracion guardada')" @deactivate="() => handleAction(() => deactivateOtrosPagos(), 'Configuracion desactivada')" />

      <!-- Modals -->
      <ChangePlanModal :open="showChangePlan" :current-plan="customer.planType" @close="showChangePlan = false" @confirm="(p: string) => { showChangePlan = false; handleAction(() => changePlan(p), 'Plan actualizado') }" />
      <ExtendTrialModal :open="showExtendTrial" @close="showExtendTrial = false" @confirm="(d: string) => { showExtendTrial = false; handleAction(() => extendTrial(d), 'Trial extendido') }" />
      <UpdateCreditsModal :open="showUpdateCredits" :current-limit="customer.monthlyTokenLimit" @close="showUpdateCredits = false" @confirm="(l: number, r: boolean) => { showUpdateCredits = false; handleAction(() => updateCredits(l, r), 'Creditos actualizados') }" />
      <ToggleStatusModal :open="showToggleStatus" :is-active="customer.isActive" :company-name="customer.companyName" @close="showToggleStatus = false" @confirm="() => { showToggleStatus = false; handleAction(() => toggleStatus(!customer!.isActive), customer!.isActive ? 'Cliente desactivado' : 'Cliente activado') }" />
    </template>
  </div>
</template>
```

- [ ] **Step 6: Verify customer detail renders**

Run: `npm run dev` — open `/customers/:id`, confirm header, tabs, each tab content.

- [ ] **Step 7: Commit**

```bash
git add src/customers/views/CustomerDetailView.vue src/customers/components/CustomerInfo.vue src/customers/components/SubscriptionCard.vue src/customers/components/ModulesCard.vue src/customers/components/OtrosPagosCard.vue
git commit -m "feat: migrate CustomerDetail to Parcela ViewDetail pattern"
```

---

## Task 7: Action Modals (PModal)

**Files:**
- Modify: `src/customers/components/actions/ChangePlanModal.vue`
- Modify: `src/customers/components/actions/ExtendTrialModal.vue`
- Modify: `src/customers/components/actions/UpdateCreditsModal.vue`
- Modify: `src/customers/components/actions/ToggleStatusModal.vue`

- [ ] **Step 1: Rewrite ChangePlanModal.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PModal, PSegmentedButton, PButton } from '@parcela/ui'

defineProps<{ open: boolean; currentPlan: string | null }>()
const emit = defineEmits<{ close: []; confirm: [plan: string] }>()

const selected = ref('')
const options = ['STARTER', 'PROFESIONAL', 'PREMIUM']
</script>

<template>
  <PModal :open="open" title="Cambiar Plan" @close="emit('close')">
    <template #body>
      <p class="text-[13px] mb-4" style="color: var(--color-ink2);">Plan actual: <strong style="color: var(--color-ink);">{{ currentPlan }}</strong></p>
      <PSegmentedButton v-model="selected" :options="options" />
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <PButton variant="ghost" @click="emit('close')">Cancelar</PButton>
        <PButton variant="primary" :disabled="!selected" @click="emit('confirm', selected)">Confirmar</PButton>
      </div>
    </template>
  </PModal>
</template>
```

- [ ] **Step 2: Rewrite ExtendTrialModal.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PModal, PInput, PButton, PFormField } from '@parcela/ui'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: []; confirm: [date: string] }>()
const date = ref('')
</script>

<template>
  <PModal :open="open" title="Extender Trial" @close="emit('close')">
    <template #body>
      <PFormField label="Nueva fecha de fin de trial" required>
        <PInput v-model="date" type="text" placeholder="YYYY-MM-DD" />
      </PFormField>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <PButton variant="ghost" @click="emit('close')">Cancelar</PButton>
        <PButton variant="primary" :disabled="!date" @click="emit('confirm', date)">Confirmar</PButton>
      </div>
    </template>
  </PModal>
</template>
```

- [ ] **Step 3: Rewrite UpdateCreditsModal.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PModal, PInput, PCheckbox, PButton, PFormField } from '@parcela/ui'

defineProps<{ open: boolean; currentLimit: number }>()
const emit = defineEmits<{ close: []; confirm: [limit: number, reset: boolean] }>()

const limit = ref(0)
const resetUsage = ref(false)
</script>

<template>
  <PModal :open="open" title="Actualizar Creditos" @close="emit('close')">
    <template #body>
      <div class="space-y-4">
        <PFormField label="Limite mensual de tokens" required>
          <PInput v-model="limit" type="number" :placeholder="String(currentLimit)" mono />
        </PFormField>
        <PCheckbox v-model="resetUsage">Resetear uso actual a 0</PCheckbox>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <PButton variant="ghost" @click="emit('close')">Cancelar</PButton>
        <PButton variant="primary" @click="emit('confirm', limit, resetUsage)">Confirmar</PButton>
      </div>
    </template>
  </PModal>
</template>
```

- [ ] **Step 4: Rewrite ToggleStatusModal.vue**

```vue
<script setup lang="ts">
import { PModal, PButton } from '@parcela/ui'

defineProps<{ open: boolean; isActive: boolean; companyName: string }>()
const emit = defineEmits<{ close: []; confirm: [] }>()
</script>

<template>
  <PModal
    :open="open"
    :title="isActive ? 'Desactivar Cliente' : 'Activar Cliente'"
    :variant="isActive ? 'destructive' : 'default'"
    @close="emit('close')"
  >
    <template #body>
      <p class="text-[13px]" style="color: var(--color-ink2);">
        {{ isActive ? 'Desactivar' : 'Activar' }} la cuenta de <strong style="color: var(--color-ink);">{{ companyName }}</strong>?
      </p>
      <p v-if="isActive" class="text-[12px] mt-2" style="color: var(--color-danger);">
        Se suspenderan los servicios asociados a este cliente.
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <PButton variant="ghost" @click="emit('close')">Cancelar</PButton>
        <PButton :variant="isActive ? 'danger' : 'primary'" @click="emit('confirm')">{{ isActive ? 'Desactivar' : 'Activar' }}</PButton>
      </div>
    </template>
  </PModal>
</template>
```

- [ ] **Step 5: Commit**

```bash
git add src/customers/components/actions/
git commit -m "feat: migrate action modals to PModal"
```

---

## Task 8: CreateCustomerDrawer (PRightDrawer + PStepper)

**Files:**
- Modify: `src/customers/components/CreateCustomerDrawer.vue`

- [ ] **Step 1: Rewrite CreateCustomerDrawer.vue**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { PRightDrawer, PStepper, PInput, PSelect, PCheckbox, PButton, PFormField, PSegmentedButton } from '@parcela/ui'
import { useSnackbar } from '@parcela/ui'
import { useApi } from '@/hooks/useApi'
import type { CreateCustomerRequest } from '@/interfaces/customer'
import { z } from 'zod'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: []; created: [id: string] }>()

const { post } = useApi()
const { enqueue } = useSnackbar()

const step = ref(0)
const steps = [
  { label: 'Empresa' },
  { label: 'Usuario' },
  { label: 'Plan' },
  { label: 'OtrosPagos' },
]

const form = ref({
  companyName: '',
  companyTaxNumber: '',
  countryId: 'CL',
  taxRate: 19,
  primaryUserEmail: '',
  primaryUserName: '',
  planType: 'STARTER',
  billingPeriod: 'MONTHLY',
  modules: [] as string[],
  otrospagosEnabled: false,
  otrospagos: { convenioId: '', recaudadorId: '', aesKey: '', aesIv: '', description: '' },
})

const errors = ref<string[]>([])

const availableModules = [
  'PROPERTIES', 'CONTRACTS', 'TENANTS', 'UNITS', 'PAYMENTS',
  'DOCUMENTS', 'REPORTS', 'MAINTENANCE', 'INSPECTIONS',
  'ACCOUNTING', 'COMMUNICATIONS', 'LEADS', 'ANALYTICS',
  'INTEGRATIONS', 'API_ACCESS', 'BULK_OPERATIONS', 'CUSTOM_FIELDS',
  'AUTOMATIONS', 'AUDIT_LOG', 'MULTI_CURRENCY', 'TAX_MANAGEMENT',
  'INSURANCE', 'LEGAL',
]

const countryOptions = ['CL', 'MX', 'CO', 'PE', 'AR']
const billingOptions = ['MONTHLY', 'ANNUAL']

function toggleModule(mod: string) {
  const idx = form.value.modules.indexOf(mod)
  if (idx >= 0) form.value.modules.splice(idx, 1)
  else form.value.modules.push(mod)
}

function validate(): boolean {
  errors.value = []
  if (step.value === 0) {
    if (!form.value.companyName) errors.value.push('Nombre de empresa requerido')
    if (!form.value.companyTaxNumber) errors.value.push('RUT requerido')
  } else if (step.value === 1) {
    if (!form.value.primaryUserEmail) errors.value.push('Email requerido')
    if (!form.value.primaryUserName) errors.value.push('Nombre requerido')
  }
  return errors.value.length === 0
}

function next() {
  if (!validate()) return
  if (step.value < steps.length - 1) step.value++
  else submit()
}

function back() {
  if (step.value > 0) step.value--
}

async function submit() {
  if (!validate()) return
  try {
    const payload: CreateCustomerRequest = {
      companyName: form.value.companyName,
      companyTaxNumber: form.value.companyTaxNumber,
      countryId: form.value.countryId,
      taxRate: form.value.taxRate,
      primaryUserEmail: form.value.primaryUserEmail,
      primaryUserName: form.value.primaryUserName,
      planType: form.value.planType,
      billingPeriod: form.value.billingPeriod,
      modules: form.value.modules,
    }
    if (form.value.otrospagosEnabled) {
      payload.otrospagos = { ...form.value.otrospagos }
    }
    const result = await post<{ id: string }>('/customers', payload)
    enqueue({ message: 'Cliente creado exitosamente', kind: 'success' })
    emit('created', result.id)
  } catch (e: any) {
    enqueue({ message: e.response?.data?.message ?? 'Error al crear cliente', kind: 'error' })
  }
}

function close() {
  step.value = 0
  emit('close')
}
</script>

<template>
  <PRightDrawer
    :open="open"
    eyebrow="Nuevo registro"
    title="Crear Cliente"
    :subtitle="`Paso ${step + 1} de ${steps.length} — ${steps[step].label}`"
    @close="close"
  >
    <template #header-extra>
      <PStepper :steps="steps" :active-step="step" />
    </template>

    <template #body>
      <!-- Step 0: Empresa -->
      <div v-if="step === 0" class="space-y-4">
        <PFormField label="Nombre de Empresa" required>
          <PInput v-model="form.companyName" placeholder="Mi Empresa SpA" />
        </PFormField>
        <PFormField label="RUT" required>
          <PInput v-model="form.companyTaxNumber" placeholder="12.345.678-9" />
        </PFormField>
        <PFormField label="Pais">
          <PSelect v-model="form.countryId" :options="countryOptions" />
        </PFormField>
        <PFormField label="Tasa Impositiva (%)">
          <PInput v-model="form.taxRate" type="number" mono suffix="%" />
        </PFormField>
      </div>

      <!-- Step 1: Usuario -->
      <div v-if="step === 1" class="space-y-4">
        <PFormField label="Nombre completo" required>
          <PInput v-model="form.primaryUserName" placeholder="Juan Perez" />
        </PFormField>
        <PFormField label="Email" required>
          <PInput v-model="form.primaryUserEmail" type="email" placeholder="juan@empresa.cl" />
        </PFormField>
      </div>

      <!-- Step 2: Plan y Modulos -->
      <div v-if="step === 2" class="space-y-4">
        <PFormField label="Plan">
          <PSegmentedButton v-model="form.planType" :options="['STARTER', 'PROFESIONAL', 'PREMIUM']" />
        </PFormField>
        <PFormField label="Periodo de facturacion">
          <PSegmentedButton v-model="form.billingPeriod" :options="billingOptions" />
        </PFormField>
        <div>
          <div class="text-[12px] font-medium mb-2" style="color: var(--color-ink2);">Modulos adicionales</div>
          <div class="grid grid-cols-2 gap-2">
            <PCheckbox
              v-for="mod in availableModules"
              :key="mod"
              :model-value="form.modules.includes(mod)"
              @update:model-value="toggleModule(mod)"
            >{{ mod }}</PCheckbox>
          </div>
        </div>
      </div>

      <!-- Step 3: OtrosPagos -->
      <div v-if="step === 3" class="space-y-4">
        <PCheckbox v-model="form.otrospagosEnabled">Habilitar OtrosPagos</PCheckbox>
        <template v-if="form.otrospagosEnabled">
          <PFormField label="Convenio ID" required>
            <PInput v-model="form.otrospagos.convenioId" placeholder="200614" />
          </PFormField>
          <PFormField label="Recaudador ID" required>
            <PInput v-model="form.otrospagos.recaudadorId" placeholder="REC001" />
          </PFormField>
          <PFormField label="AES Key" required>
            <PInput v-model="form.otrospagos.aesKey" type="password" placeholder="Clave AES" />
          </PFormField>
          <PFormField label="AES IV" required>
            <PInput v-model="form.otrospagos.aesIv" type="password" placeholder="Vector AES" />
          </PFormField>
          <PFormField label="Descripcion">
            <PInput v-model="form.otrospagos.description" placeholder="Notas opcionales" />
          </PFormField>
        </template>
      </div>

      <!-- Errors -->
      <div v-if="errors.length" class="mt-4 p-3 rounded-[var(--radius-lg)]" style="background: var(--color-danger-bg);">
        <div v-for="err in errors" :key="err" class="text-[12px]" style="color: var(--color-danger);">{{ err }}</div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center gap-2">
        <PButton v-if="step > 0" variant="ghost" @click="back">Atras</PButton>
        <div class="flex-1" />
        <PButton variant="ghost" @click="close">Cancelar</PButton>
        <PButton variant="primary" @click="next">{{ step === steps.length - 1 ? 'Crear Cliente' : 'Continuar' }}</PButton>
      </div>
    </template>
  </PRightDrawer>
</template>
```

- [ ] **Step 2: Verify drawer opens and steps work**

Run: `npm run dev` — open `/customers`, click "Nuevo cliente", navigate steps.

- [ ] **Step 3: Commit**

```bash
git add src/customers/components/CreateCustomerDrawer.vue
git commit -m "feat: migrate CreateCustomerDrawer to PRightDrawer + PStepper"
```

---

## Task 9: Subscription List View

**Files:**
- Modify: `src/subscriptions/views/SubscriptionListView.vue`

- [ ] **Step 1: Rewrite SubscriptionListView.vue**

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PDataTable, PBadge, PToolbar } from '@parcela/ui'
import { useSubscriptions } from '../hooks/useSubscriptions'
import dayjs from 'dayjs'

const router = useRouter()
const { subscriptions, totalPages, totalItems, loading, fetchSubscriptions } = useSubscriptions()

const activeTab = ref(0)
const tabs = [
  { label: 'Todos' },
  { label: 'Activo' },
  { label: 'Trial' },
  { label: 'Expirado' },
]

const tabStatusMap: Record<number, string | undefined> = {
  0: undefined, 1: 'ACTIVE', 2: 'TRIAL', 3: 'EXPIRED',
}

const columns = [
  { key: 'customerName', label: 'Cliente', sortable: true },
  { key: 'planType', label: 'Plan' },
  { key: 'status', label: 'Estado' },
  { key: 'billingPeriod', label: 'Periodo' },
  { key: 'nextBillingDate', label: 'Prox. Facturacion' },
  { key: 'tokensUsed', label: 'Tokens' },
  { key: 'unitCount', label: 'Unidades', align: 'right' as const, mono: true },
]

const statusTone: Record<string, 'good' | 'warn' | 'danger' | 'neutral' | 'info'> = {
  ACTIVE: 'good', TRIAL: 'info', EXPIRED: 'danger', CANCELLED: 'danger', SUSPENDED: 'neutral',
}

function onTabChange(idx: number) {
  activeTab.value = idx
  fetchSubscriptions({ status: tabStatusMap[idx] })
}

onMounted(() => fetchSubscriptions())
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-4">
      <div class="text-[11px] font-medium uppercase tracking-wider" style="color: var(--color-ink4);">Gestion</div>
      <div class="text-[22px] font-semibold tracking-tight" style="color: var(--color-ink);">Suscripciones</div>
    </div>

    <!-- Toolbar -->
    <PToolbar :tabs="tabs" :active-tab="activeTab" @update:active-tab="onTabChange" />

    <!-- Table -->
    <div class="mt-3">
      <PDataTable
        :columns="columns"
        :rows="(subscriptions as Record<string, unknown>[])"
        :pagination="{ page: 1, pageSize: 20, totalRows: totalItems }"
      >
        <template #cell-planType="{ value }">
          <PBadge tone="info">{{ value }}</PBadge>
        </template>
        <template #cell-status="{ value }">
          <PBadge :tone="statusTone[value as string] ?? 'neutral'">{{ value }}</PBadge>
        </template>
        <template #cell-billingPeriod="{ value }">
          {{ value === 'MONTHLY' ? 'Mensual' : value === 'ANNUAL' ? 'Anual' : value }}
        </template>
        <template #cell-nextBillingDate="{ value }">
          {{ value ? dayjs(value as string).format('DD/MM/YYYY') : '-' }}
        </template>
        <template #cell-tokensUsed="{ value, row }">
          <span class="font-mono text-[12px]">{{ (value as number).toLocaleString() }} / {{ (row as any).monthlyTokenLimit.toLocaleString() }}</span>
        </template>
      </PDataTable>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify subscriptions view**

Run: `npm run dev` — open `/subscriptions`, confirm table + tabs.

- [ ] **Step 3: Commit**

```bash
git add src/subscriptions/views/SubscriptionListView.vue
git commit -m "feat: migrate SubscriptionListView to Parcela ViewList pattern"
```

---

## Task 10: Payments View

**Files:**
- Modify: `src/payments/views/PaymentsView.vue`
- Modify: `src/payments/components/MonthlyChart.vue`
- Modify: `src/payments/components/MonthDetailTable.vue`

- [ ] **Step 1: Rewrite MonthlyChart.vue**

```vue
<script setup lang="ts">
import { PKpiCard } from '@parcela/ui'
import type { MonthlyPaymentSummary } from '@/interfaces/payment'

defineProps<{ summaries: MonthlyPaymentSummary[] }>()
const emit = defineEmits<{ selectMonth: [year: number, month: number] }>()

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    <div
      v-for="s in summaries"
      :key="`${s.year}-${s.month}`"
      class="cursor-pointer transition-shadow hover:shadow-[var(--shadow-card)]"
      @click="emit('selectMonth', s.year, s.month)"
    >
      <PKpiCard
        :label="`${monthNames[s.month - 1]} ${s.year}`"
        :value="formatCLP(s.totalAmountCLP)"
        :delta="`${s.paidCount} pagados, ${s.pendingCount} pendientes`"
        tone="good"
        mono
      />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Rewrite MonthDetailTable.vue**

```vue
<script setup lang="ts">
import { PDataTable, PBadge, PSpinner } from '@parcela/ui'
import type { SubscriptionInvoice } from '@/interfaces/payment'
import dayjs from 'dayjs'

defineProps<{ invoices: SubscriptionInvoice[]; loading: boolean }>()

const columns = [
  { key: 'customerName', label: 'Cliente' },
  { key: 'planType', label: 'Plan' },
  { key: 'amount', label: 'Monto (CLP)', align: 'right' as const, mono: true },
  { key: 'status', label: 'Estado' },
  { key: 'periodStart', label: 'Periodo' },
  { key: 'paidOn', label: 'Pagado' },
]

const statusTone: Record<string, 'good' | 'warn' | 'danger' | 'neutral' | 'info'> = {
  PAID: 'good', PENDING: 'warn', OVERDUE: 'danger',
  PARTIALLY_PAID: 'info', REFUNDED: 'neutral', CANCELLED: 'neutral',
}
</script>

<template>
  <PSpinner v-if="loading" />
  <PDataTable
    v-else
    :columns="columns"
    :rows="(invoices as Record<string, unknown>[])"
  >
    <template #cell-planType="{ value }">
      <PBadge tone="info">{{ value }}</PBadge>
    </template>
    <template #cell-amount="{ value }">
      ${{ (value as number).toLocaleString('es-CL') }}
    </template>
    <template #cell-status="{ value }">
      <PBadge :tone="statusTone[value as string] ?? 'neutral'">{{ value }}</PBadge>
    </template>
    <template #cell-periodStart="{ row }">
      {{ dayjs((row as any).periodStart).format('DD/MM') }} - {{ dayjs((row as any).periodEnd).format('DD/MM/YYYY') }}
    </template>
    <template #cell-paidOn="{ value }">
      {{ value ? dayjs(value as string).format('DD/MM/YYYY HH:mm') : '-' }}
    </template>
  </PDataTable>
</template>
```

- [ ] **Step 3: Rewrite PaymentsView.vue**

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PSpinner } from '@parcela/ui'
import { usePayments } from '../hooks/usePayments'
import MonthlyChart from '../components/MonthlyChart.vue'
import MonthDetailTable from '../components/MonthDetailTable.vue'

const { monthlySummaries, monthDetail, loading, detailLoading, fetchMonthly, fetchMonthDetail } = usePayments()

const selectedMonth = ref<{ year: number; month: number } | null>(null)
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function onSelectMonth(year: number, month: number) {
  selectedMonth.value = { year, month }
  fetchMonthDetail(year, month)
}

onMounted(() => fetchMonthly())
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-5">
      <div class="text-[11px] font-medium uppercase tracking-wider" style="color: var(--color-ink4);">Finanzas</div>
      <div class="text-[22px] font-semibold tracking-tight" style="color: var(--color-ink);">Pagos</div>
      <div class="text-[13px] mt-1" style="color: var(--color-ink3);">Pagos de suscripcion por mes (ultimos 12 meses)</div>
    </div>

    <PSpinner v-if="loading" />

    <template v-else>
      <MonthlyChart :summaries="monthlySummaries" @select-month="onSelectMonth" />

      <!-- Detail section -->
      <div v-if="selectedMonth" class="mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[13px] font-semibold" style="color: var(--color-ink);">
            Detalle {{ monthNames[selectedMonth.month - 1] }} {{ selectedMonth.year }}
          </div>
        </div>
        <MonthDetailTable :invoices="monthDetail" :loading="detailLoading" />
      </div>
    </template>
  </div>
</template>
```

- [ ] **Step 4: Verify payments view**

Run: `npm run dev` — open `/payments`, confirm month grid + detail table.

- [ ] **Step 5: Commit**

```bash
git add src/payments/
git commit -m "feat: migrate PaymentsView to Parcela KPI grid + PDataTable"
```

---

## Task 11: Final Verification & Type Check

- [ ] **Step 1: Run type check**

Run: `npm run type-check`

Fix any TypeScript errors (likely import paths or prop type mismatches).

- [ ] **Step 2: Run dev server and test all routes**

Run: `npm run dev`

Test:
- `/` — Dashboard with KPIs
- `/customers` — List with toolbar, tabs, table
- `/customers/:id` — Detail with header, tabs, each tab content
- `/customers` → "Nuevo cliente" → Drawer with stepper
- `/subscriptions` — List with tabs + table
- `/payments` — Month grid + click month → detail table

- [ ] **Step 3: Fix any remaining issues**

Address any visual or functional issues found during testing.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: resolve type errors and final adjustments for Parcela migration"
```

---

## Task 12: Build Verification

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: No errors, clean build output.

- [ ] **Step 2: Preview production build**

Run: `npm run preview`

Verify all routes render correctly.

- [ ] **Step 3: Commit if any build fixes needed**

```bash
git add -A
git commit -m "fix: resolve build errors"
```
