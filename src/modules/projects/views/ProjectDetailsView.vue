th<template>
  <div class="w-full">
    <section>
      <BreadCrumbs :name="project?.name || 'Sin nombre'" />
    </section>
    <section>
      <div class="overflow-x-auto mt-2">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <label>
                  <input type="checkbox" class="checkbox checkbox-primary" :checked="!!task.completedAt"
                    @change="projectStore.toggleTask(project?.id!, task.id)" />
                </label>
                <!-- <input type="checkbox" v-model="task.completed" @change="() => projectStore.updateTask(task)"> -->
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt ? new Date(task.completedAt)?.toLocaleDateString() : 'Pendiente' }}</td>
              <td>
                <button class="btn btn-error text-white" @click="projectStore.deteleTask(project?.id!, task.id)">
                  Eliminar
                </button>
              </td>
            </tr>
            <tr class="hover">
              <th></th>
              <td>
                <input type="text" placeholder="Nueva tarea" v-model="newTask"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  @keypress.enter="onAddTaskByProjectId">
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProyectsStore } from '../store/projects.store';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Project } from '../interfaces/project.interface';


interface Props {
  id: string
}

const router = useRouter()
const props = defineProps<Props>()
const projectStore = useProyectsStore()
const project = ref<Project | null>(null)
const newTask = ref('')

watch(() => props.id, (id) => {
  project.value = projectStore.projectById(id).value || null
  if (!project.value) {
    router.replace('/')
  }
}, { immediate: true })

const onAddTaskByProjectId = () => {
  if (!project.value) return
  projectStore.addTaskByProjectId(project.value.id, newTask.value)
  newTask.value = ''
}
</script>