<template>
  <div class="calendar-container">
    <div
      class="align-items-center mb-4"
      style="display: grid; grid-template-columns: 1fr auto 1fr; width: 100%"
    >
      <div class="d-flex justify-content-start">
        <div class="btn-group shadow-sm">
          <button
            @click="prevMonth"
            class="btn btn-sm btn-outline-primary px-2 border-2 me-1"
          >
            <i class="fas fa-chevron-left fa-xs"></i>
          </button>
          <button
            @click="nextMonth"
            class="btn btn-sm btn-outline-primary px-2 border-2"
          >
            <i class="fas fa-chevron-right fa-xs"></i>
          </button>
        </div>
      </div>

      <div class="text-center px-4">
        <h5 class="fw-bold mb-0">{{ currentYear }}년 {{ currentMonth }}월</h5>
      </div>

      <div class="d-flex gap-2 justify-content-end"></div>
    </div>

    <div class="row g-0 text-center mb-2">
      <div
        v-for="day in days"
        :key="day"
        class="col fw-bold py-2 small"
        :class="{ 'text-danger': day === '일', 'text-primary': day === '토' }"
      >
        {{ day }}
      </div>
    </div>

    <div class="row g-2">
      <div
        v-for="(dayObj, index) in calendarDates"
        :key="index"
        class="col-1-7"
      >
        <CalendarDayBar
          v-if="dayObj.date"
          :calendar-date="dayObj"
          :key="dayObj.date"
          @selectDate="handleClickDate"
        />
        <div v-else class="h-100 p-2 opacity-25"></div>
      </div>
    </div>
  </div>

  <TransactionModal
    v-if="selectedDate"
    :date="selectedDate"
    @close="selectedDate = null"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import CalendarDayBar from './CalendarDayBar.vue';
import TransactionModal from '../modal/TransactionModal.vue';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth() + 1);

const calendarDates = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const result = [];
  for (let i = 0; i < firstDay; i++) {
    result.push({ date: null, currentMonth: false });
  }
  for (let d = 1; d <= lastDate; d++) {
    result.push({ date: d, currentMonth: true });
  }
  return result;
});

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentYear.value--;
    currentMonth.value = 12;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentYear.value++;
    currentMonth.value = 1;
  } else {
    currentMonth.value++;
  }
};

/* ---------------------------------------------------------
🚩 수정된 부분: 캘린더와 모달 연결
--------------------------------------------------------- */
const selectedDate = ref(null);

const handleClickDate = (dayNum) => {
  // 숫자(dayNum)를 받아서 실제 Date 객체로 변환하여 저장
  // 월(Month)은 0부터 시작하므로 -1을 해줍니다.
  selectedDate.value = new Date(
    currentYear.value,
    currentMonth.value - 1,
    dayNum,
  );
};
</script>

<style scoped>
.col-1-7 {
  flex: 0 0 14.285%;
  max-width: 14.285%;
}
</style>
