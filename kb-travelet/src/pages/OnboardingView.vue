<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <header class="p-6 flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <button
          @click="handleBack"
          class="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span
          class="text-xs font-bold text-slate-300 uppercase tracking-widest"
        >
          Step {{ currentStep }} / {{ totalSteps }}
        </span>
      </div>

      <ProgressBar :current-step="currentStep" :total-steps="totalSteps" />
    </header>

    <main class="flex-1 px-6 pb-10">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" @next="handleNext" @back="handleBack" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// 분리된 재사용 컴포넌트 임포트
import ProgressBar from '@/components/common/ProgressBar.vue';

const router = useRouter();
const route = useRoute();

const state = reactive({
  // 구조도에 따른 4단계 설정
  totalSteps: 4,
});

const { totalSteps } = toRefs(state);

/**
 * 라우터 meta 데이터에 정의한 step 번호를 가져옵니다.
 * 정의되지 않은 경우 route name을 기반으로 fallback 처리합니다.
 */
const currentStep = computed(() => {
  if (route.meta && route.meta.step) return route.meta.step;

  // Fallback 로직
  const stepMap = {
    'step-region': 1,
    'step-schedule': 2,
    'step-option': 3,
    'step-income': 4,
  };
  return stepMap[route.name] || 1;
});

/**
 * 뒤로가기 제어: 1단계면 랜딩으로, 나머지는 이전 단계로
 */
const handleBack = () => {
  if (currentStep.value === 1) {
    router.push({ name: 'landing' });
  } else {
    router.back();
  }
};

/**
 * 자식 컴포넌트에서 전달된 완료 이벤트를 받아 다음 단계로 라우팅
 */
const handleNext = () => {
  const nextStepMap = {
    1: 'step-schedule',
    2: 'step-option',
    3: 'step-income',
    4: 'main-dashboard', // 마지막 단계 완료 시 대시보드행
  };

  const nextRouteName = nextStepMap[currentStep.value];
  if (nextRouteName) {
    router.push({ name: nextRouteName });
  }
};
</script>

<style scoped>
/* 대한항공 블루 테마를 위한 트랜지션 및 스타일 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
