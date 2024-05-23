<template>
  <aside class="bg-base-300 w-72 min-h-[calc(100vh-60px)]">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="proyectStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul v-else class="menu rounded-box">
      <li v-for="project in proyectStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/project/${project.id}`">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <RouterLink :to="`/project/${project.id}`">
            {{ project.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useProyectsStore } from '../store/projects.store';

const proyectStore = useProyectsStore();
</script>

<style scoped></style>