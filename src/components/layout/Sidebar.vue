<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Desktop Sidebar -->
    <div class="hidden lg:flex lg:shrink-0">
      <div class="w-64 bg-white border-r">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="p-6 border-b">
            <h2 class="text-2xl font-bold text-blue-600">Ticketly</h2>
            <p v-if="auth.user" class="text-sm text-gray-600 mt-1">
              Welcome, {{ auth.user.name }}
            </p>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 p-4 space-y-2">
            <router-link
              to="/dashboard"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
              ]"
            >
              <span>Dashboard</span>
            </router-link>

            <router-link
              to="/tickets"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/tickets')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
              ]"
            >
              <span>Tickets</span>
            </router-link>
          </nav>

          <!-- Stats Section -->
          <div class="p-4 border-t bg-gray-50">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total</span>
                <span class="text-sm font-medium text-blue-600">{{ stats.total }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Open</span>
                <span class="text-sm font-medium text-green-600">{{ stats.open }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">In Progress</span>
                <span class="text-sm font-medium text-amber-600">{{ stats.inProgress }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Closed</span>
                <span class="text-sm font-medium text-gray-600">{{ stats.closed }}</span>
              </div>
            </div>
          </div>

          <!-- User Actions -->
          <div class="p-4 border-t">
            <Button @click="handleLogout" variant="outline" class="w-full" size="sm">
              <span class="mr-2">👋</span>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Sheet v-model:open="isMobileMenuOpen">
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Mobile Header -->
        <div class="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <h1 class="text-xl font-bold text-blue-600">Ticketly</h1>
          <SheetTrigger as-child>
            <Button variant="ghost" size="sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </SheetTrigger>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-auto">
          <div class="max-w-[1440px] mx-auto">
            <slot />
          </div>
        </div>
      </div>

      <!-- Mobile Sidebar Content -->
      <SheetContent side="left" class="w-80 p-0">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="p-6 border-b">
            <h2 class="text-2xl font-bold text-blue-600">Ticketly</h2>
            <p v-if="auth.user" class="text-sm text-gray-600 mt-1">
              Welcome, {{ auth.user.name }}
            </p>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 p-4 space-y-2">
            <router-link
              to="/dashboard"
              @click="closeMobileMenu"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
              ]"
            >
              <span class="text-xl">📊</span>
              <span>Dashboard</span>
            </router-link>

            <router-link
              to="/tickets"
              @click="closeMobileMenu"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/tickets')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100',
              ]"
            >
              <span class="text-xl">🎫</span>
              <span>Tickets</span>
            </router-link>
          </nav>

          <!-- Stats Section -->
          <div class="p-4 border-t bg-gray-50">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total</span>
                <span class="text-sm font-medium text-blue-600">{{ stats.total }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Open</span>
                <span class="text-sm font-medium text-green-600">{{ stats.open }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">In Progress</span>
                <span class="text-sm font-medium text-amber-600">{{ stats.inProgress }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Closed</span>
                <span class="text-sm font-medium text-gray-600">{{ stats.closed }}</span>
              </div>
            </div>
          </div>

          <!-- User Actions -->
          <div class="p-4 border-t">
            <Button @click="handleLogout" variant="outline" class="w-full" size="sm">
              <span class="mr-2">👋</span>
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const tickets = useTicketsStore()

const stats = computed(() => tickets.getTicketStats())

const handleLogout = () => {
  auth.logout()
  router.push('/')
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const isActive = (path: string) => {
  return route.path === path
}
</script>
