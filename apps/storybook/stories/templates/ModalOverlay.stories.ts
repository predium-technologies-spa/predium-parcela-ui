import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PCheckbox,
} from '@parcela/ui'
import { ref } from 'vue'
import {
  LayoutDashboard,
  BarChart3,
  Building,
  Grid3X3,
  Users,
  FileText,
  CreditCard,
  Wrench,
  Search,
  Settings,
  AlertTriangle,
  X,
  Trash2,
} from 'lucide-vue-next'

const sidebarSections = [
  { title: 'Workspace', items: [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { key: 'reports', icon: BarChart3, label: 'Reports' },
  ]},
  { title: 'Portfolio', items: [
    { key: 'property', icon: Building, label: 'Properties', badge: 48 },
    { key: 'units', icon: Grid3X3, label: 'Units', badge: 312 },
    { key: 'tenants', icon: Users, label: 'Tenants', badge: 287 },
    { key: 'leases', icon: FileText, label: 'Leases', badge: 287 },
  ]},
  { title: 'Operations', items: [
    { key: 'payments', icon: CreditCard, label: 'Payments' },
    { key: 'tickets', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspect', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

const meta: Meta = {
  title: 'Templates/ModalOverlay',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { PSidebar, PTopNav, PButton, PCheckbox },
    setup() {
      const showModal = ref(false)
      const sidebarExpanded = ref(true)
      return { sidebarSections, AlertTriangle, X, Trash2, showModal, sidebarExpanded }
    },
    template: `
      <div class="relative font-sans text-ink" style="width: 1280px; height: 820px; overflow: hidden;">
        <!-- Background -->
        <div class="flex w-full h-full" :style="showModal ? 'filter: saturate(0.7)' : ''">
          <PSidebar :sections="sidebarSections" active="property" v-model:expanded="sidebarExpanded" />
          <div class="flex-1 flex flex-col min-w-0">
            <PTopNav :breadcrumb="['Portfolio', 'Properties', 'Harper Hall']" />
            <div class="flex-1 p-6 bg-bg">
              <div class="flex items-center justify-between mb-5">
                <div class="text-2xl font-semibold text-ink tracking-tight">Harper Hall</div>
                <PButton variant="danger" :icon="Trash2" @click="showModal = true">Archive property</PButton>
              </div>
              <div class="bg-surface border border-line rounded-xl p-5">
                <div class="grid grid-cols-4 gap-4">
                  <div v-for="[k, v] in [['Units', '36'], ['Occupancy', '78%'], ['Rent roll', '$68,100'], ['NOI', '$41,210']]" :key="k">
                    <div class="text-sm text-ink3">{{ k }}</div>
                    <div class="text-xl font-mono text-ink mt-0.5">{{ v }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal backdrop + dialog (inline, not teleported) -->
        <Transition name="modal-fade">
          <div v-if="showModal" class="absolute inset-0 z-50" style="background: rgba(23, 20, 15, 0.35); backdrop-filter: blur(1px);">
            <Transition name="modal-scale" appear>
              <div class="absolute bg-surface rounded-2xl shadow-modal overflow-hidden" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 480px;">
                <!-- Header -->
                <div class="px-5 pt-5 pb-4 flex gap-3.5 border-b border-line-soft">
                  <div class="w-8 h-8 rounded-xl bg-danger-bg text-danger grid place-items-center shrink-0">
                    <component :is="AlertTriangle" :size="16" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="text-lg font-semibold text-ink tracking-tight">Archive Harper Hall?</div>
                        <div class="text-xs font-mono text-ink4 mt-0.5">PRP-0126 · 36 units · 4 active leases</div>
                      </div>
                      <button class="text-ink4 cursor-pointer hover:text-ink" @click="showModal = false">
                        <component :is="X" :size="16" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Body -->
                <div class="px-5 py-4">
                  <p class="text-md text-ink2 leading-relaxed mb-3.5">
                    Archiving will stop rent collection, pause scheduled inspections, and mark the property as read-only in all reports.
                    <strong class="text-ink">This action cannot be undone without a manager approval.</strong>
                  </p>

                  <div class="bg-bg border border-line rounded-xl p-3.5 mb-3.5">
                    <div class="text-sm text-ink3 uppercase tracking-wide font-medium mb-2.5">Impact summary</div>
                    <div v-for="([k, v, note], i) in [
                      ['Active leases', '4', 'Will be flagged for review'],
                      ['Scheduled payments', '8', 'Will be held next cycle'],
                      ['Open work orders', '2', 'Must be reassigned'],
                    ]" :key="k" class="flex items-center gap-3 py-2" :class="i < 2 && 'border-b border-line-soft'">
                      <div class="flex-1">
                        <div class="text-base text-ink2">{{ k }}</div>
                        <div class="text-sm text-ink3">{{ note }}</div>
                      </div>
                      <div class="font-mono text-md text-ink font-medium">{{ v }}</div>
                    </div>
                  </div>

                  <div class="text-base text-ink2 mb-1.5">
                    Type <span class="font-mono bg-chip-bg px-1.5 py-px rounded-sm text-ink">HARPER HALL</span> to confirm:
                  </div>
                  <div class="flex items-center bg-surface border border-ink rounded-lg px-2.5 py-2 font-mono text-md text-ink">
                    HARPER HALL<span class="ml-0.5 w-px h-3.5 bg-ink inline-block" style="animation: blink 1s steps(1) infinite;" />
                  </div>
                </div>

                <!-- Footer -->
                <div class="px-5 py-3 bg-bg border-t border-line flex items-center gap-2.5">
                  <PCheckbox>Notify tenants</PCheckbox>
                  <div class="flex-1" />
                  <PButton variant="ghost" @click="showModal = false">Cancel</PButton>
                  <PButton variant="primary" class="!bg-danger hover:!bg-danger/90" @click="showModal = false">Archive property</PButton>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    `,
  }),
}
