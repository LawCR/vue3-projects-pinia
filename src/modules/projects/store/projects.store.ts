import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProyectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (!name) return;
    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  };

  const addTaskByProjectId = (projectId: string, taskName: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project || taskName.trim().length === 0) return;

    project.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  const deleteProject = (projectId: string) => {
    const index = projects.value.findIndex((p) => p.id === projectId);
    if (index === -1) return;

    projects.value.splice(index, 1);
  };

  const deteleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const index = project.tasks.findIndex((t) => t.id === taskId);
    if (index === -1) return;

    project.tasks.splice(index, 1);
  };

  return {
    // properties
    // projects,

    // Getter o computed
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectById: (id: string) => computed(() => projects.value.find((p) => p.id === id)),
    projectsWithCompletion: computed(() =>
      projects.value.map((project) => {
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter((t) => t.completedAt).length;

        return {
          id: project.id,
          name: project.name,
          totalTasks,
          taskProgress: totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100,
        };
      }),
    ),

    // Actions
    addProject,
    addTaskByProjectId,
    toggleTask,
    deleteProject,
    deteleTask,
  };
});
