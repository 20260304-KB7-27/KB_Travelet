<template>
  <div
    class="d-flex vh-100 overflow-hidden"
    style="background-color: var(--color-surface)"
  >
    <div style="width: 280px; flex-shrink: 0"><SideBar /></div>

    <main class="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
      <div
        class="w-100 sticky-top flex-shrink-0"
        style="z-index: 1020; background-color: var(--color-primary-soft)"
      >
        <ProgressBar />
      </div>
      <div class="flex-grow-1 overflow-auto p-4">
        <h4 class="mb-4 fw-bold">설정</h4>

        <div class="settings-content">
          <ProfileSection class="mb-4" />
          <TravelGoalSection
            :goal="myTravelGoal"
            @update-goal="handleGoalUpdate"
            class="mb-4"
          />
          <FinishGoalSection />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import SideBar from '@/components/common/SideBar.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import ProfileSection from '@/components/profile/ProfileSection.vue';
import TravelGoalSection from '@/components/profile/TravelGoalSection.vue';
import FinishGoalSection from '@/components/profile/FinishGoalSection.vue';
import { ref } from 'vue';


// 1. 초기 데이터 설정 (값이 비어있지 않도록 넉넉하게 채워둠)
const myTravelGoal = ref({
  destination: '도쿄 & 오사카',
  continent: '아시아',
  startDate: '2026-06-15',
  endDate: '2026-06-25',
  etcExpense: 1200000,
  flightExpense: 450000,
  hotelExpense: 1850000,
});

// 2. 자식(TravelGoalSection)이 보낸 수정된 데이터를 처리
const handleGoalUpdate = (newData) => {
  // 실제로는 여기서 axios 같은 거로 서버에 PUT/PATCH 요청을 보냅니다.
  console.log('서버로 전송할 데이터:', newData);

  // 서버 응답이 성공했다고 가정하고 로컬 상태 업데이트
  // 스프레드 연산자를 써서 새 객체로 교체해주는 게 Vue의 반응성에 좋습니다.
  myTravelGoal.value = { ...newData };

  alert('여행 목표가 성공적으로 수정되었습니다!');
};
</script>

<style scoped>
.bg-surface {
  background-color: var(--color-surface);
}
/* 스크롤바 디자인을 깔끔하게 하고 싶다면 */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
