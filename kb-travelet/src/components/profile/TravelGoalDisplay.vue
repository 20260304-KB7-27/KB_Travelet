<template>
  <div class="row g-4 mb-4">
    <div class="col-6">
      <div class="text-muted small">목적지</div>
      <div class="fw-bold fs-5">{{ goal.destination }}</div>
    </div>
    <div class="col-6">
      <div class="text-muted small">대륙</div>
      <div class="fw-bold fs-5">{{ goal.continent }}</div>
    </div>
    <div class="col-6">
      <div class="text-muted small">출발일</div>
      <div class="fw-bold fs-5">{{ goal.startDate }}</div>
    </div>
    <div class="col-6">
      <div class="text-muted small">귀국일</div>
      <div class="fw-bold fs-5">{{ goal.endDate }}</div>
    </div>
  </div>

  <hr class="text-muted opacity-25" />

  <div class="vstack gap-2">
    <div class="d-flex justify-content-between align-items-center">
      <span class="text-muted">기타 경비</span>
      <span class="fw-bold">{{ goal.etcExpense?.toLocaleString() }}원</span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <span class="text-muted">비행기값</span>
      <span class="fw-bold">{{ goal.flightExpense?.toLocaleString() }}원</span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <span class="text-muted">총 숙소비</span>
      <span class="fw-bold">{{ goal.hotelExpense?.toLocaleString() }}원</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  goal: { type: Object, required: true },
});
</script>

<style scoped></style>
