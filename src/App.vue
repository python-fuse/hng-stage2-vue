<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div id="app">
    <RouterView />
    <Toaster />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
