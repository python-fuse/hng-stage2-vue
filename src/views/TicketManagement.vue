<template>
  <AppLayout>
    <div class="w-full max-w-[1440px] mx-auto py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Tickets</h1>
        <Button>Create New Ticket</Button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card v-for="ticket in tickets" :key="ticket.id" class="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{{ ticket.title }}</CardTitle>
            <CardDescription>{{ ticket.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2 mt-3">
              <StatusBadge :status="ticket.status" />
              <Button @click="onDelete(ticket.id)" variant="ghost" size="sm" class="ml-auto text-red-600">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/layout/AppLayout.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const ticketsStore = useTicketsStore()
const toast = useToast()

onMounted(() => {
  ticketsStore.loadTickets()
})

const tickets = ticketsStore.tickets

function onDelete(id: string) {
  if (confirm('Are you sure you want to delete this ticket?')) {
    ticketsStore.deleteTicket(id)
    toast.ticketDeleted()
  }
}
</script>
