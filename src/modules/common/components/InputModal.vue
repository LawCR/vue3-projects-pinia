<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p v-if="description" class="pt-4">{{ description }}</p>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input ref="inputRef" type="text" :placeholder="placeholder || 'Ingrese un valor'"
            class="input input-bordered input-primary w-full flex-1" v-model="inputValue">
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-4 gap-4">
            <button type="button" class="btn btn-ghost" @click="onClose">Cancelar</button>
            <button type="submit" class="btn btn-primary">Aceptar</button>
          </div>
        </form>
      </div>

    </div>
  </dialog>

  <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, ({ open }) => {
  if (open) {
    inputRef.value?.focus();
  }
});

const onClose = () => {
  emits('close');
  inputValue.value = '';
};

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return
  };

  emits('value', inputValue.value.trim());
  onClose()
};
</script>

<style scoped></style>