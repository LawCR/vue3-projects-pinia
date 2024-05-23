import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projects_layout',
      redirect: { name: 'projects' },
      component: ProjectsLayout,
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsView,
        },
        {
          path: 'project/:id',
          name: 'project',
          component: () => import('@/modules/projects/views/ProjectDetailsView.vue'),
          props: true,
        },
      ],
    },
  ],
});

export default router;
