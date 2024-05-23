<template>
  <div class="flex flex-col">
    <!-- Top Menu -->
    <TopMenu />
    <main class="flex">
      <!-- Side Menu -->
      <SideMenu />
      <section class="p-5 w-full">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';


</script>

<style scoped></style>