<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <div class="flex justify-between items-center">
          <CardTitle class="text-2xl">Edit Ticket</CardTitle>
          <Button variant="ghost" @click="onClose" size="sm">✕</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <Label for="title">Title *</Label>
            <Input
              id="title"
              v-model="state.title"
              :class="['mt-1', errors.title ? 'border-red-500' : '']"
              placeholder="Enter ticket title"
              :maxlength="100"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ state.title.length }}/100 characters</p>
          </div>

          <div>
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="state.description"
              :class="['mt-1', errors.description ? 'border-red-500' : '']"
              placeholder="Describe the issue or task (optional)"
              :rows="4"
              :maxlength="500"
            />
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ state.description.length }}/500 characters</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="status">Status *</Label>
              <select
                id="status"
                v-model="state.status"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <Label for="priority">Priority</Label>
              <select
                id="priority"
                v-model="state.priority"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
            <p><strong>Created:</strong> {{ new Date(ticket.createdAt).toLocaleString() }}</p>
            <p><strong>Last Updated:</strong> {{ new Date(ticket.updatedAt).toLocaleString() }}</p>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" @click="onClose">Cancel</Button>
            <Button type="submit" :disabled="isLoading">
              {{ isLoading ? 'Updating...' : 'Update Ticket' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTicketsStore } from '@/stores/tickets'
import { useToast } from '@/composables/useToast'
import type { Ticket } from '@/types'

interface Props {
  ticket: Ticket
  onClose: () => void
}

const props = defineProps<Props>()
const tickets = useTicketsStore()
const toast = useToast()
const isLoading = ref(false)

const state = reactive({
  title: props.ticket.title,
  description: props.ticket.description || '',
  status: props.ticket.status,
  priority: props.ticket.priority || 'medium' as 'low' | 'medium' | 'high',
})

const errors = reactive({ title: '', description: '' })

function validateForm() {
  errors.title = ''
  errors.description = ''
  let ok = true

  if (!state.title.trim()) {
    errors.title = 'Title is required'
    ok = false
  } else if (state.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters'
    ok = false
  } else if (state.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters'
    ok = false
  }

  if (state.description && state.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
    ok = false
  }

  return ok
}

async function handleSubmit() {
  if (!validateForm()) {
    toast.fixErrors()
    return
  }

  isLoading.value = true

  try {
    tickets.updateTicket(props.ticket.id, {
      title: state.title.trim(),
      description: state.description.trim() || undefined,
      status: state.status,
      priority: state.priority,
    })

    toast.ticketUpdated()
    props.onClose()
  } catch (error) {
    toast.error('Failed to update ticket. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>
