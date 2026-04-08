<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-24">
    <header class="p-6 bg-white flex justify-between items-center shadow-sm">
      <div>
        <h1 class="text-xl font-bold text-slate-900">나의 여행 자산</h1>
        <p class="text-sm text-slate-500">
          파리 여행까지 <span class="text-indigo-600 font-bold">D-15</span>
        </p>
      </div>
      <button
        @click="$router.push('/settings')"
        class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </header>

    <main class="p-6 space-y-6">
      <section
        class="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100"
      >
        <div class="flex justify-between items-end mb-4">
          <div>
            <p class="text-indigo-100 text-sm mb-1">현재 모은 금액</p>
            <h2 class="text-3xl font-bold">
              ₩ {{ formatNumber(currentSavings) }}
            </h2>
          </div>
          <span class="text-lg font-bold bg-white/20 px-3 py-1 rounded-full"
            >{{ progressPercentage }}%</span
          >
        </div>
        <div class="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            class="h-full bg-white transition-all duration-1000"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="flex justify-between mt-3 text-xs text-indigo-100">
          <span>목표: ₩ {{ formatNumber(targetBudget) }}</span>
          <span
            >남은 금액: ₩
            {{ formatNumber(targetBudget - currentSavings) }}</span
          >
        </div>
      </section>

      <section class="grid grid-cols-3 gap-3">
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">
            수입
          </p>
          <p class="text-sm font-bold text-emerald-500">
            +{{ formatNumber(monthlyIncome) }}
          </p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">
            지출
          </p>
          <p class="text-sm font-bold text-rose-500">
            -{{ formatNumber(monthlyExpense) }}
          </p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">
            잔액
          </p>
          <p class="text-sm font-bold text-slate-700">
            {{ formatNumber(monthlyIncome - monthlyExpense) }}
          </p>
        </div>
      </section>

      <section
        class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[300px]"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-slate-800">2026년 4월</h3>
          <div class="flex space-x-2">
            <button class="p-1 hover:bg-slate-50 rounded">〈</button>
            <button class="p-1 hover:bg-slate-50 rounded">〉</button>
          </div>
        </div>
        <div
          class="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-4"
        >
          <span
            v-for="day in ['일', '월', '화', '수', '목', '금', '토']"
            :key="day"
            >{{ day }}</span
          >
        </div>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="i in 30"
            :key="i"
            class="aspect-square flex items-center justify-center text-sm font-medium rounded-xl hover:bg-indigo-50 cursor-pointer"
          >
            {{ i }}
          </div>
        </div>
      </section>
    </main>

    <nav
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center max-w-md mx-auto rounded-t-3xl shadow-2xl"
    >
      <button class="text-indigo-600">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
      </button>
      <button class="text-slate-300 hover:text-indigo-400 transition-colors">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <div
        class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg -mt-12 border-4 border-white"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <button class="text-slate-300 hover:text-indigo-400 transition-colors">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>
      <button
        @click="$router.push('/settings')"
        class="text-slate-300 hover:text-indigo-400 transition-colors"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue';

const state = reactive({
  currentSavings: 1250000,
  targetBudget: 3000000,
  monthlyIncome: 2500000,
  monthlyExpense: 1100000,
});

// ...toRefs(state) 지침 준수
const { currentSavings, targetBudget, monthlyIncome, monthlyExpense } =
  toRefs(state);

// 진척도 퍼센트 계산
const progressPercentage = computed(() => {
  return Math.round((state.currentSavings / state.targetBudget) * 100);
});

// 천단위 콤마 포맷
const formatNumber = (val) => {
  return val.toLocaleString();
};
</script>
