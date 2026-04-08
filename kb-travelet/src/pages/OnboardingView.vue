<template>
  <div class="onboarding-page">
    <div class="onboarding-card">
      <div class="header-row">
        <div class="title-wrap">
          <span class="plane">✈</span>
          <h1>{{ displayName }}님의 여행 목표</h1>
        </div>
        <span class="step-text">Step {{ currentStep }} / 5</span>
      </div>

      <StepIncome v-if="currentStep === 4" @next="goToStep5" />
      <StepOption
        v-if="currentStep === 5"
        @back="goToStep4"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import StepIncome from '@/components/onboarding/StepIncome.vue'
import StepOption from '@/components/onboarding/StepOption.vue'
import { useTravelStore } from '@/stores/travel'

const router = useRouter()
const travelStore = useTravelStore()

const currentStep = ref(4)
const displayName = computed(() => travelStore.userName || '사용자')

if (!travelStore.continent) {
  travelStore.setContinent('Asia')
}
if (!travelStore.destination) {
  travelStore.setDestination('일본')
}
if (!travelStore.startDate) {
  travelStore.setStartDate('2026-06-04')
}
if (!travelStore.endDate) {
  travelStore.setEndDate('2026-06-08')
}

const goToStep5 = () => {
  currentStep.value = 5
}

const goToStep4 = () => {
  currentStep.value = 4
}

const finishOnboarding = () => {
  router.push('/settings')
}

onMounted(() => {
  window.addEventListener('goal-complete', finishOnboarding)
})

onBeforeUnmount(() => {
  window.removeEventListener('goal-complete', finishOnboarding)
})
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0766ff, #0047d4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.onboarding-card {
  width: 100%;
  max-width: 760px;
  background: #f8fbff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.plane {
  font-size: 26px;
  color: #0766ff;
}

h1 {
  margin: 0;
  color: #1d2a57;
  font-size: 30px;
  font-weight: 800;
}

.step-text {
  color: #7b8497;
  font-size: 16px;
}
</style>