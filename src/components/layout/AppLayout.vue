<template>
  <Sidebar>
    <div :class="['px-4 sm:px-6 lg:px-8', className]">
      <slot />
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'

interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
