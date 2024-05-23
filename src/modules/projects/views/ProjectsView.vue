<template>
  <div class="overflow-x-auto w-full">
    <!-- <button class="btn btn-primary  mb-3">
      <AddIcon />
      Agregar
    </button> -->
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projectsStore.projectsWithCompletion" :key="project.id" class="hover">
          <th>{{ index + 1 }}</th>
          <td>
            <span @dblclick="console.log(project.name)">{{ project.name }}</span>
          </td>
          <td>{{ project.totalTasks }} tareas</td>
          <td>
            <progress class="progress progress-accent" :value="project.taskProgress" max="100"
              :title="`${project.taskProgress}%`">{{ 40 }}%</progress>
          </td>
        </tr>
      </tbody>
    </table>
    <InputModal :open="modalOpen" title="Nuevo Proyecto" description="Crear un nuevo proyecto"
      placeholder="Ingrese el nombre del proyecto" @close="modalOpen = false" @value="projectsStore.addProject" />

    <CustomModal :open="customModalOpen">
      <template #header>
        <h1 class="text-xl">Titulo del modal</h1>
      </template>
      <template #body>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil iure consectetur, quibusdam quia quo,
          undeelit corporis.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end mt-2 gap-3">
          <button class="btn btn-ghost" @click="customModalOpen = false">Cerrar</button>
          <button class="btn btn-primary" @click="customModalOpen = false">Aceptar</button>
        </div>
      </template>
    </CustomModal>
    <FabButton position="bottom-right" @click="modalOpen = true">
      <AddCircleIcon />
    </FabButton>
    <FabButton position="bottom-left" @click="customModalOpen = true">
      <AddIcon />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircleIcon from '@/modules/common/icons/AddCircleIcon.vue';
import AddIcon from '@/modules/common/icons/AddIcon.vue';
import { ref } from 'vue';
import { useProyectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProyectsStore();
console.log(projectsStore.projectsWithCompletion)

</script>

<style scoped></style>