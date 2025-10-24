<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p class="text-gray-600 mt-2">Sign in to your Ticketly account</p>
      </div>

      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-6">
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
                placeholder="Enter your password"
              />
              <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
            </div>

            <Button type="submit" class="w-full" size="lg" :disabled="isLoading">
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <router-link to="/auth/signup" class="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
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

const state = reactive({
  email: '',
  password: '',
})

const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email = ''
  errors.password = ''
  let ok = true
  
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

  return ok
}

async function onSubmit() {
  if (!validate()) {
    toast.fixErrors()
    return
  }

  isLoading.value = true

  try {
    const success = await auth.login(state.email, state.password)
    if (success) {
      toast.welcomeBack()
      router.push('/dashboard')
    } else {
      toast.invalidCredentials()
    }
  } catch (error) {
    toast.genericError()
  } finally {
    isLoading.value = false
  }
}
</script>
