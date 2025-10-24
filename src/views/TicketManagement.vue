<template>
  <div class="min-h-screen bg-gray-50">
    <AppLayout>
      <div class="py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Ticket Management</h1>
          <Button @click="showCreateModal = true" size="lg">
            + Create New Ticket
          </Button>
        </div>

        <!-- Search and Filter Bar -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <Input
              v-model="searchTerm"
              placeholder="Search tickets by title or description..."
              class="w-full"
            />
          </div>
          <div class="flex gap-2">
            <Button
              :variant="statusFilter === 'all' ? 'default' : 'outline'"
              @click="statusFilter = 'all'"
              size="sm"
            >
              All
            </Button>
            <Button
              :variant="statusFilter === 'open' ? 'default' : 'outline'"
              @click="statusFilter = 'open'"
              size="sm"
            >
              Open
            </Button>
            <Button
              :variant="statusFilter === 'in_progress' ? 'default' : 'outline'"
              @click="statusFilter = 'in_progress'"
              size="sm"
            >
              In Progress
            </Button>
            <Button
              :variant="statusFilter === 'closed' ? 'default' : 'outline'"
              @click="statusFilter = 'closed'"
              size="sm"
            >
              Closed
            </Button>
          </div>
        </div>

        <!-- Tickets List -->
        <Card v-if="filteredTickets.length === 0">
          <CardContent class="p-12 text-center">
            <p class="text-gray-600 text-lg mb-4">
              {{ ticketsStore.tickets.length === 0
                ? 'No tickets yet. Create your first ticket!'
                : 'No tickets match your current filters.' }}
            </p>
            <Button v-if="ticketsStore.tickets.length === 0" @click="showCreateModal = true">
              Create Your First Ticket
            </Button>
          </CardContent>
        </Card>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader class="pb-3">
              <div class="flex justify-between items-start">
                <CardTitle class="text-lg line-clamp-2">
                  {{ ticket.title }}
                </CardTitle>
                <Badge :class="getStatusBadgeClass(ticket.status)">
                  {{ formatStatus(ticket.status) }}
                </Badge>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span v-if="ticket.priority" :class="`font-medium ${getPriorityColor(ticket.priority)}`">
                  {{ ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1) }} Priority
                </span>
                <span>Created: {{ formatDate(ticket.createdAt) }}</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p v-if="ticket.description" class="text-gray-700 line-clamp-3">
                {{ ticket.description }}
              </p>

              <div class="flex justify-between items-center pt-2">
                <span class="text-xs text-gray-500">
                  Updated: {{ formatDate(ticket.updatedAt) }}
                </span>
                <div class="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    @click="handleEdit(ticket)"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    @click="handleDeleteTicket(ticket.id, ticket.title)"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Stats Footer -->
        <div v-if="ticketsStore.tickets.length > 0" class="mt-8 text-center text-gray-600">
          <p>
            Showing {{ filteredTickets.length }} of {{ ticketsStore.tickets.length }} tickets
            <span v-if="statusFilter !== 'all'">
              (filtered by {{ formatStatus(statusFilter) }})
            </span>
          </p>
        </div>
      </div>
    </AppLayout>

    <!-- Create Ticket Modal -->
    <CreateTicketForm v-if="showCreateModal" :on-close="() => showCreateModal = false" />

    <!-- Edit Ticket Modal -->
    <EditTicketForm v-if="editingTicket" :ticket="editingTicket" :on-close="() => editingTicket = null" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/layout/AppLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import CreateTicketForm from '@/components/forms/CreateTicketForm.vue'
import EditTicketForm from '@/components/forms/EditTicketForm.vue'
import { getStatusColor, formatStatus } from '@/utils/statusColors'
import type { Ticket } from '@/types'

const ticketsStore = useTicketsStore()
const toast = useToast()

const showCreateModal = ref(false)
const editingTicket = ref<Ticket | null>(null)
const searchTerm = ref('')
const statusFilter = ref<'all' | 'open' | 'in_progress' | 'closed'>('all')

onMounted(() => {
  ticketsStore.loadTickets()
})

const filteredTickets = computed(() => {
  let result = ticketsStore.tickets

  // Filter by status
  if (statusFilter.value !== 'all') {
    result = result.filter(t => t.status === statusFilter.value)
  }

  // Filter by search query
  if (searchTerm.value.trim()) {
    const query = searchTerm.value.toLowerCase()
    result = result.filter(t => 
      t.title.toLowerCase().includes(query) ||
      (t.description && t.description.toLowerCase().includes(query))
    )
  }

  return result
})

function handleEdit(ticket: Ticket) {
  editingTicket.value = ticket
}

function handleDeleteTicket(ticketId: string, ticketTitle: string) {
  if (
    window.confirm(
      `Are you sure you want to delete "${ticketTitle}"? This action cannot be undone.`
    )
  ) {
    ticketsStore.deleteTicket(ticketId)
    toast.ticketDeleted()
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusBadgeClass(status: Ticket['status']) {
  const colors = getStatusColor(status)
  return `${colors.bg} ${colors.text} hover:${colors.bg}`
}

function getPriorityColor(priority?: string) {
  switch (priority) {
    case 'high':
      return 'text-red-600'
    case 'medium':
      return 'text-yellow-600'
    case 'low':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}
</script>
