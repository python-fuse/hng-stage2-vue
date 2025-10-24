<template>
  <AppLayout>
    <div class="w-full max-w-[1440px] mx-auto py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Tickets</h1>
        <Button @click="showCreateModal = true">Create New Ticket</Button>
      </div>

      <!-- Search and Filter -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            placeholder="Search tickets by title or description..."
            class="w-full"
          />
        </div>
        <div>
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div v-if="filteredTickets.length === 0" class="text-center py-12">
        <p class="text-gray-500">No tickets found.</p>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card v-for="ticket in filteredTickets" :key="ticket.id" class="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{{ ticket.title }}</CardTitle>
            <CardDescription>{{ ticket.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2 mt-3">
              <StatusBadge :status="ticket.status" />
              <div class="ml-auto flex gap-2">
                <Button @click="handleEdit(ticket)" variant="ghost" size="sm">
                  Edit
                </Button>
                <Button @click="onDelete(ticket.id)" variant="ghost" size="sm" class="text-red-600">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Results Count -->
      <div v-if="filteredTickets.length > 0" class="mt-6 text-center text-sm text-gray-600">
        Showing {{ filteredTickets.length }} of {{ ticketsStore.tickets.length }} ticket{{ ticketsStore.tickets.length !== 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Create Modal -->
    <CreateTicketForm v-if="showCreateModal" :on-close="() => showCreateModal = false" />

    <!-- Edit Modal -->
    <EditTicketForm v-if="editingTicket" :ticket="editingTicket" :on-close="() => editingTicket = null" />
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/layout/AppLayout.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import CreateTicketForm from '@/components/forms/CreateTicketForm.vue'
import EditTicketForm from '@/components/forms/EditTicketForm.vue'
import type { Ticket } from '@/types'

const ticketsStore = useTicketsStore()
const toast = useToast()

const showCreateModal = ref(false)
const editingTicket = ref<Ticket | null>(null)
const searchQuery = ref('')
const statusFilter = ref('all')

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
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
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

function onDelete(id: string) {
  if (confirm('Are you sure you want to delete this ticket?')) {
    ticketsStore.deleteTicket(id)
    toast.ticketDeleted()
  }
}
</script>
