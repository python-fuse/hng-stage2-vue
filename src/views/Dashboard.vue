<template>
  <div class="min-h-screen">
    <AppLayout>
      <div class="py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold">Dashboard</h1>
          <p v-if="auth.user" class="text-gray-600 mt-1">Welcome back, {{ auth.user.name }}!</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-lg font-medium text-gray-600">
                Total Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-3xl font-bold text-blue-600">
                {{ stats.total }}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-lg font-medium text-gray-600">
                Open Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-3xl font-bold text-green-600">
                {{ stats.open }}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-lg font-medium text-gray-600">
                Resolved Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-3xl font-bold text-gray-600">
                {{ stats.closed }}
              </p>
            </CardContent>
          </Card>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button as-child class="w-full">
                <router-link to="/tickets">Manage Tickets</router-link>
              </Button>
              <Button as-child variant="outline" class="w-full">
                <router-link to="/tickets">Create New Ticket</router-link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-bold text-amber-600">
                {{ stats.inProgress }}
              </p>
              <p class="text-gray-600 text-sm">
                tickets currently being worked on
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  </div>
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

const stats = computed(() => tickets.getTicketStats())
</script>
