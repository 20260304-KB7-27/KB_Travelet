import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/pages/LandingView.vue'
import OnboardingView from '@/pages/OnboardingView.vue'
import SettingsView from '@/pages/SettingsView.vue'
import MainDashboard from '@/pages/MainDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MainDashboard,
    },
  ],
})

export default router