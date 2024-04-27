import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetail.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import Request from './pages/requests/Request.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'Coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact',
          name: 'ContactCoach',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      name: 'CoachRegister',
      component: CoachRegister,
      meta: { requiredAuth: true },
    },
    {
      path: '/request',
      name: 'Request',
      component: Request,
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: UserAuth,
      meta: { requiredUnauth: true },
    },
    { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requiredAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiredUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
