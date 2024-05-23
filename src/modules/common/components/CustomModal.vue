<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500 pb-2">
        <!-- Header -->
        <!-- <h1>Header</h1> -->
        <slot name="header" />
        <!-- <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p> -->
      </div>

      <div class="py-5">
        <slot name="body" />
      </div>

      <div class="border-t border-blue-500 pt-2">
        <form method="dialog">
          <slot name="footer" />
          <!-- <button class="btn">Close</button> -->
        </form>
      </div>
    </div>
  </dialog>

  <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"></div>
</template>

<script setup lang="ts">
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>

<style scoped></style>