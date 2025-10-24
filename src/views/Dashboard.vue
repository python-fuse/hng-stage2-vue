<template>
  <AppLayout>
    <div class="w-full max-w-[1440px] mx-auto py-8">
      <h1 class="text-3xl font-bold">Welcome back, {{ userName }}</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-gray-500">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">{{ stats.total }}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-gray-500">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold text-green-600">{{ stats.open }}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold text-amber-600">{{ stats.inProgress }}</p>
          </CardContent>
        </Card>
      </div>

      <div class="mt-6">
        <router-link to="/tickets">
          <Button>Manage Tickets</Button>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'
import AppLayout from '@/components/layout/AppLayout.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const auth = useAuthStore()
const tickets = useTicketsStore()

onMounted(() => {
  auth.initializeAuth()
  tickets.loadTickets()
})

const userName = computed(() => auth.user?.name ?? 'Guest')
const stats = computed(() => tickets.getTicketStats())
</script>
