<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 class="text-2xl font-bold mb-2">Create your Ticketly account</h2>
      <form @submit.prevent="onSubmit" class="space-y-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="state.name" type="text" class="mt-1 block w-full border rounded px-3 py-2" />
          <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
        </div>

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

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Create account</button>
      </form>

      <p class="mt-4 text-sm">Already have an account? <router-link to="/auth/login" class="text-blue-600">Login</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

auth.initializeAuth()

const state = reactive({ name: '', email: '', password: '' })
const errors = reactive({ name: '', email: '', password: '' })

function validate() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  let ok = true
  if (!state.name) {
    errors.name = 'Name is required'
    ok = false
  }
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
    toast.fixErrors()
    return
  }

  const success = await auth.signup(state.email, state.password, state.name)
  if (success) {
    toast.accountCreated()
    router.push('/dashboard')
  } else {
    toast.emailExists()
  }
}
</script>
