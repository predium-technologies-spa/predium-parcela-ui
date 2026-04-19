import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PCheckbox,
  PInput,
} from '@parcela/ui'
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
    components: { PSidebar, PTopNav, PButton, PCheckbox, PInput },
    setup() {
      return { sidebarSections, AlertTriangle }
    },
    template: `
      <div style="position: relative; width: 1280px; height: 820px; overflow: hidden;">
        <!-- Background (dimmed) -->
        <div style="display: flex; width: 100%; height: 100%; filter: saturate(0.7);">
          <PSidebar :sections="sidebarSections" active="property" />
          <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
            <PTopNav :breadcrumb="['Portfolio', 'Properties', 'Harper Hall']" />
            <div style="flex: 1; padding: 24px 32px; background: var(--color-bg);">
              <div style="font-size: 22px; font-weight: 600; color: var(--color-text); margin-bottom: 20px;">Harper Hall</div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Units</div>
                  <div style="font-size: 24px; font-weight: 600; color: var(--color-text);">36</div>
                </div>
                <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Occupancy</div>
                  <div style="font-size: 24px; font-weight: 600; color: var(--color-text);">78%</div>
                </div>
                <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Rent roll</div>
                  <div style="font-size: 24px; font-weight: 600; color: var(--color-text);">$68,100</div>
                </div>
                <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">NOI</div>
                  <div style="font-size: 24px; font-weight: 600; color: var(--color-text);">$41,210</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal overlay (inline, not using PModal/Teleport) -->
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50;">
          <div style="width: 520px; background: var(--color-bg-surface); border-radius: 12px; box-shadow: 0 24px 48px rgba(0,0,0,0.2); overflow: hidden;">
            <!-- Header -->
            <div style="padding: 24px 24px 0;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: var(--color-danger-subtle); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <component :is="AlertTriangle" :size="20" style="color: var(--color-danger);" />
                </div>
                <div>
                  <div style="font-size: 16px; font-weight: 600; color: var(--color-text);">Archive Harper Hall?</div>
                  <div style="font-size: 13px; color: var(--color-text-secondary); margin-top: 2px;">PRP-0126 &middot; 36 units &middot; 4 active leases</div>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div style="padding: 20px 24px;">
              <p style="font-size: 14px; color: var(--color-text-secondary); margin: 0 0 16px; line-height: 1.5;">
                Archiving this property will remove it from all active views and reports.
                Associated leases, payments, and work orders will be flagged for review.
                You can restore it later from Settings &gt; Archived properties.
              </p>

              <!-- Impact summary card -->
              <div style="border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-bg); overflow: hidden; margin-bottom: 16px;">
                <div style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid var(--color-border);">
                  Impact summary
                </div>
                <div style="padding: 0;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--color-border);">
                    <div>
                      <span style="font-size: 13px; color: var(--color-text);">Active leases</span>
                      <span style="font-size: 13px; font-weight: 600; color: var(--color-text); margin-left: 8px;">4</span>
                    </div>
                    <span style="font-size: 12px; color: var(--color-text-secondary);">Will be flagged for review</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--color-border);">
                    <div>
                      <span style="font-size: 13px; color: var(--color-text);">Scheduled payments</span>
                      <span style="font-size: 13px; font-weight: 600; color: var(--color-text); margin-left: 8px;">8</span>
                    </div>
                    <span style="font-size: 12px; color: var(--color-text-secondary);">Will be held next cycle</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px;">
                    <div>
                      <span style="font-size: 13px; color: var(--color-text);">Open work orders</span>
                      <span style="font-size: 13px; font-weight: 600; color: var(--color-text); margin-left: 8px;">2</span>
                    </div>
                    <span style="font-size: 12px; color: var(--color-text-secondary);">Must be reassigned</span>
                  </div>
                </div>
              </div>

              <!-- Confirm input -->
              <div style="margin-bottom: 4px;">
                <label style="font-size: 13px; color: var(--color-text); font-weight: 500;">Type HARPER HALL to confirm:</label>
                <div style="margin-top: 6px; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: 6px; font-size: 14px; font-family: var(--font-mono); color: var(--color-text); background: var(--color-bg);">
                  HARPER HALL<span style="border-right: 2px solid var(--color-primary); animation: blink 1s step-end infinite; margin-left: 1px;"></span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 16px 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; gap: 12px;">
              <PCheckbox label="Notify tenants" />
              <div style="flex: 1;"></div>
              <PButton variant="ghost">Cancel</PButton>
              <PButton style="background: var(--color-danger); color: white; border: none;">Archive property</PButton>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
