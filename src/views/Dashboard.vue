<template>
  <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold">Welcome back, {{ userName }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-sm text-gray-500">Total Tickets</h3>
        <p class="text-2xl font-bold">{{ stats.total }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-sm text-gray-500">Open</h3>
        <p class="text-2xl font-bold">{{ stats.open }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-sm text-gray-500">In Progress</h3>
        <p class="text-2xl font-bold">{{ stats.inProgress }}</p>
      </div>
    </div>

    <div class="mt-6">
      <router-link to="/tickets" class="bg-blue-600 text-white px-4 py-2 rounded">Manage Tickets</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'

const auth = useAuthStore()
const tickets = useTicketsStore()

onMounted(() => {
  auth.initializeAuth()
  tickets.loadTickets()
})

const userName = computed(() => auth.user?.name ?? 'Guest')

const stats = computed(() => tickets.getTicketStats())
</script>
