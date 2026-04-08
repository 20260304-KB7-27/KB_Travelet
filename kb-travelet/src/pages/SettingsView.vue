<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-10">
    <header class="p-6 bg-white flex items-center shadow-sm">
      <button @click="$router.back()" class="p-2 -ml-2 text-slate-400">
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
      <h1 class="ml-2 text-xl font-bold text-slate-900">설정</h1>
    </header>

    <main class="p-6 space-y-8">
      <section>
        <h3
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2"
        >
          계정 정보
        </h3>
        <div
          class="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center"
        >
          <div
            class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mr-4"
          >
            T
          </div>
          <div>
            <p class="font-bold text-slate-900 text-lg">Travelet User</p>
            <p class="text-sm text-slate-500">user@example.com</p>
          </div>
        </div>
      </section>

      <section>
        <h3
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2"
        >
          여행 목표 수정
        </h3>
        <div
          class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-slate-700"
        >
          <button
            class="w-full p-5 flex justify-between items-center hover:bg-slate-50 border-b border-slate-50"
          >
            <span class="font-medium">여행지 및 일정 변경</span>
            <svg
              class="w-5 h-5 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            class="w-full p-5 flex justify-between items-center hover:bg-slate-50 border-b border-slate-50"
          >
            <span class="font-medium">목표 예산 재설정</span>
            <svg
              class="w-5 h-5 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            @click="confirmReset"
            class="w-full p-5 flex justify-between items-center hover:bg-rose-50 text-rose-500"
          >
            <span class="font-medium">데이터 초기화</span>
            <svg
              class="w-5 h-5 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </section>

      <section>
        <h3
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2"
        >
          앱 설정
        </h3>
        <div
          class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-slate-700"
        >
          <div
            class="p-5 flex justify-between items-center border-b border-slate-50"
          >
            <span class="font-medium">알림 설정</span>
            <div class="w-12 h-6 bg-indigo-600 rounded-full relative">
              <div
                class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"
              ></div>
            </div>
          </div>
          <div class="p-5 flex justify-between items-center">
            <span class="font-medium">버전 정보</span>
            <span class="text-slate-400 text-sm font-medium italic"
              >v1.0.4-stable</span
            >
          </div>
        </div>
      </section>

      <button
        @click="logout"
        class="w-full py-4 text-slate-400 font-medium hover:text-rose-500 transition-colors"
      >
        로그아웃
      </button>
    </main>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = reactive({
  isProcessing: false,
});

const { isProcessing } = toRefs(state);

const confirmReset = () => {
  if (confirm('모든 데이터가 삭제됩니다. 정말 초기화할까요?')) {
    // 초기화 로직 (Pinia 스토어 클리어 등)
    router.push('/');
  }
};

const logout = () => {
  router.push('/');
};
</script>
