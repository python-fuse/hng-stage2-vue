<template>
  <Badge
    :class="[colors.bg, colors.text, `hover:${colors.bg}`, className]"
    variant="secondary"
  >
    {{ formatStatus(status) }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { getStatusColor, formatStatus, type TicketStatus } from '@/utils/statusColors'

interface Props {
  status: TicketStatus
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const colors = computed(() => getStatusColor(props.status))
</script>
