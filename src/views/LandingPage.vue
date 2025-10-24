<template>
  <main class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <section class="py-24 text-center">
        <h1 class="text-5xl font-extrabold mb-4">Ticketly</h1>
        <p class="text-lg text-gray-600 mb-8">Ticket Management Made Simple</p>

        <div class="flex justify-center gap-4">
          <router-link to="/auth/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">Get Started</router-link>
          <router-link to="/auth/login" class="bg-white border rounded px-6 py-3">Login</router-link>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
