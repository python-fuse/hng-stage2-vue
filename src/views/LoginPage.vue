<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 class="text-2xl font-bold mb-2">Sign in to your Ticketly account</h2>
      <form @submit.prevent="onSubmit" class="space-y-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="state.email" type="email" class="mt-1 block w-full border rounded px-3 py-2" />
          <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="state.password" type="password" class="mt-1 block w-full border rounded px-3 py-2" />
          <p v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
      </form>

      <p class="mt-4 text-sm">Don't have an account? <router-link to="/auth/signup" class="text-blue-600">Sign up</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

auth.initializeAuth()

const state = reactive({
  email: '',
  password: '',
})

const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email = ''
  errors.password = ''
  let ok = true
  if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = 'Please enter a valid email'
    ok = false
  }
  if (!state.password || state.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    ok = false
  }
  return ok
}

async function onSubmit() {
  if (!validate()) {
    // show generic toast equivalent
    alert('Please fix the errors below')
    return
  }

  const success = await auth.login(state.email, state.password)
  if (success) {
    alert('Welcome back to Ticketly!')
    router.push('/dashboard')
  } else {
    alert('Invalid email or password. Please check your credentials and try again.')
  }
}
// template uses state.* via v-model
</script>
