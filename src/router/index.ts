import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/LandingPage.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: () => import("../views/SignupPage.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () => import("../views/TicketManagement.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("ticketapp_session");
  if ((to.meta as any)?.requiresAuth && !token) {
    return next("/auth/login");
  }
  return next();
});

export default router;
