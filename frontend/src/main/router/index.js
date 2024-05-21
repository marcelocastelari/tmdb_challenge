import { createRouter, createWebHashHistory } from "vue-router"; 
import RegisterPage from "@/pages/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import FeedPage from "@/pages/FeedPage.vue";
import UserPage from "@/pages/UserPage.vue";

const routes = [
    {
        path: '/',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/feed',
        component: FeedPage,
        name: 'feed',
        meta: {
            auth: true
        }
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register'
    },
    {
        path: '/user',
        component: UserPage,
        name: 'user',
        meta: {
            auth: true
        }
    }
]   

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.auth);
    const isAuthenticated = checkAuthStatus();

    if (requiresAuth && !isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });
  
  function checkAuthStatus() {
    const token = localStorage.getItem('token');
    return !!token;
  }


export default router