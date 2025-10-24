<template>
  <div
    :class="[
      sizeClasses[size],
      color,
      'rounded-full',
      'absolute',
      'blur-sm',
      className
    ]"
    :style="{ opacity }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  opacity?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'bg-blue-500',
  opacity: 0.1,
  className: '',
})

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
}
</script>
