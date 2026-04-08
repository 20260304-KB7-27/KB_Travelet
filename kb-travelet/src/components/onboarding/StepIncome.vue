<template>
  <div class="step-income">
    <p class="back-text">← 날짜 선택으로 돌아가기</p>

    <div class="title-line">
      <span class="icon">$</span>
      <h2>월 수입을 입력하세요</h2>
    </div>

    <label class="input-label">월 수입 (원)</label>

    <div class="money-input-wrap">
      <input
        :value="formattedIncome"
        type="text"
        placeholder="예: 3,000,000"
        class="income-input"
        @input="handleInput"
      />

      <div class="arrow-box">
        <button type="button" @click="increaseIncome">▲</button>
        <button type="button" @click="decreaseIncome">▼</button>
      </div>
    </div>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <button class="next-btn" @click="handleNext">다음</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTravelStore } from '@/stores/travel'

const emit = defineEmits(['next'])
const travelStore = useTravelStore()

const rawIncome = ref(travelStore.monthlyIncome || 0)
const errorMessage = ref('')

const formattedIncome = computed(() => {
  return rawIncome.value ? Number(rawIncome.value).toLocaleString('ko-KR') : ''
})

const handleInput = (event) => {
  const onlyNumber = event.target.value.replace(/[^0-9]/g, '')
  rawIncome.value = Number(onlyNumber || 0)
  travelStore.setMonthlyIncome(rawIncome.value)
}

const increaseIncome = () => {
  rawIncome.value += 10000
  travelStore.setMonthlyIncome(rawIncome.value)
}

const decreaseIncome = () => {
  rawIncome.value = Math.max(0, rawIncome.value - 10000)
  travelStore.setMonthlyIncome(rawIncome.value)
}

const handleNext = () => {
  if (!rawIncome.value) {
    errorMessage.value = '월 수입을 입력해주세요.'
    return
  }

  if (rawIncome.value <= 0) {
    errorMessage.value = '월 수입은 0원보다 커야 합니다.'
    return
  }

  if (rawIncome.value > 100000000) {
    errorMessage.value = '월 수입은 1억 원 이하로 입력해주세요.'
    return
  }

  errorMessage.value = ''
  travelStore.setMonthlyIncome(rawIncome.value)
  emit('next')
}
</script>

<style scoped>
.step-income {
  width: 100%;
}

.back-text {
  color: #7aa3e8;
  font-size: 14px;
  margin-bottom: 28px;
}

.title-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.icon {
  font-size: 24px;
  color: #0766ff;
  font-weight: 700;
}

h2 {
  font-size: 32px;
  color: #1d2a57;
  margin: 0;
  font-weight: 800;
}

.input-label {
  display: block;
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 8px;
}

.money-input-wrap {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.income-input {
  flex: 1;
  height: 52px;
  border: 1px solid #d7e3f8;
  border-radius: 10px;
  padding: 0 16px;
  font-size: 16px;
  outline: none;
}

.arrow-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.arrow-box button {
  width: 44px;
  height: 23px;
  border: 1px solid #d7e3f8;
  background: white;
  border-radius: 8px;
  cursor: pointer;
}

.error-text {
  color: #e53935;
  font-size: 14px;
  margin-bottom: 16px;
}

.next-btn {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #0766ff;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
</style>