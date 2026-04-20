import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatBadge } from '@parcela/ui'

const meta: Meta<typeof PChatBadge> = {
  title: 'Chat/ChatBadge',
  component: PChatBadge,
}

export default meta
type Story = StoryObj<typeof PChatBadge>

export const Default: Story = {
  render: () => ({
    components: { PChatBadge },
    template: `
      <PChatBadge
        name="Nora"
        :online="true"
        :unread-count="2"
        time="07:58"
        @click="() => {}"
      />
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PChatBadge },
    template: `
      <div class="flex flex-col gap-20 items-end p-8">
        <!-- With unread + online -->
        <PChatBadge
          name="Nora"
          :online="true"
          :unread-count="2"
          time="07:58"
          @click="() => {}"
        />

        <!-- No unread + online -->
        <PChatBadge
          name="Nora"
          :online="true"
          :unread-count="0"
          time="09:15"
          @click="() => {}"
        />

        <!-- Offline -->
        <PChatBadge
          name="Nora"
          subtitle="Asistente · Desconectada"
          :online="false"
          :unread-count="0"
          @click="() => {}"
        />
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const Playground: Story = {
  args: {
    name: 'Nora',
    subtitle: 'Asistente · En línea',
    online: true,
    unreadCount: 3,
    time: '07:58',
    avatarColor: '#8B7355',
  },
}
