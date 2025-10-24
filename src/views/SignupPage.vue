<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Join Ticketly</h1>
        <p class="text-gray-600 mt-2">Create your account to get started</p>
      </div>

      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div>
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                v-model="state.name"
                type="text"
                :class="['mt-1', errors.name ? 'border-red-500' : '']"
                placeholder="Enter your full name"
              />
              <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <Label for="email">Email address</Label>
              <Input
                id="email"
                v-model="state.email"
                type="email"
                :class="['mt-1', errors.email ? 'border-red-500' : '']"
                placeholder="Enter your email"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="state.password"
                type="password"
                :class="['mt-1', errors.password ? 'border-red-500' : '']"
                placeholder="Create a password"
              />
              <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
            </div>

            <div>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                v-model="state.confirmPassword"
                type="password"
                :class="['mt-1', errors.confirmPassword ? 'border-red-500' : '']"
                placeholder="Confirm your password"
              />
              <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">{{ errors.confirmPassword }}</p>
            </div>

            <Button type="submit" class="w-full" size="lg" :disabled="isLoading">
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?
              <router-link to="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
              </router-link>
            </p>
          </div>

          <div class="mt-4 text-center">
            <router-link to="/" class="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to home
            </router-link>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()
const isLoading = ref(false)

auth.initializeAuth()

const state = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const errors = reactive({ name: '', email: '', password: '', confirmPassword: '' })

function validate() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  let ok = true

  if (!state.name.trim()) {
    errors.name = 'Name is required'
    ok = false
  } else if (state.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    ok = false
  }

  if (!state.email) {
    errors.email = 'Email is required'
    ok = false
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.email = 'Please enter a valid email address'
    ok = false
  }

  if (!state.password) {
    errors.password = 'Password is required'
    ok = false
  } else if (state.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    ok = false
  }

  if (!state.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    ok = false
  } else if (state.password !== state.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    ok = false
  }

  return ok
}

async function onSubmit() {
  if (!validate()) {
    toast.fixErrors()
    return
  }

  isLoading.value = true

  try {
    const success = await auth.signup(state.email, state.password, state.name.trim())
    if (success) {
      toast.accountCreated()
      router.push('/dashboard')
    } else {
      toast.emailExists()
    }
  } catch (error) {
    toast.genericError()
  } finally {
    isLoading.value = false
  }
}
</script>
