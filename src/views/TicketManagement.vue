<template>
  <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Tickets</h1>
      <router-link to="/tickets" class="bg-blue-600 text-white px-4 py-2 rounded">Create New Ticket</router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div v-for="ticket in tickets" :key="ticket.id" class="p-4 bg-white rounded shadow">
        <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
        <p class="text-sm text-gray-600">{{ ticket.description }}</p>
        <div class="mt-3 flex items-center gap-2">
          <span class="text-sm px-2 py-1 bg-gray-100 rounded">{{ ticket.status }}</span>
          <button @click="onDelete(ticket.id)" class="ml-auto text-sm text-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'

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
