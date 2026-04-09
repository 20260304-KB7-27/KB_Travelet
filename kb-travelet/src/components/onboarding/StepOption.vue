<template>
  <div class="step-option">
    <div class="top-fixed">
      <p class="back-text" @click="$emit('back')">← 수입 입력으로 돌아가기</p>

      <div class="title-row">
        <h2>여행 예산 옵션을 선택하세요</h2>
        <p class="sub-text">목적지: {{ store.destination }}</p>
      </div>
    </div>

    <div v-if="loading" class="message">데이터 불러오는 중...</div>

    <div v-else class="option-list">
      <div
        v-for="option in options"
        :key="option.key"
        class="option-card"
        :class="{ selected: selected === option.key }"
        @click="select(option)"
      >
        <div class="top-line">
          <h3>{{ option.label }}</h3>
          <p class="price">{{ format(option.total) }}원</p>
        </div>

        <div class="detail-list">
          <p><span>여행 경비:</span><strong>{{ format(option.total) }}원</strong></p>
          <p><span>비행기값:</span><strong>{{ format(option.flight) }}원</strong></p>
          <p><span>숙소 비용:</span><strong>{{ format(option.hotel) }}원</strong></p>
        </div>

        <div class="divider"></div>

        <div class="bottom-area">
          <div class="daily-row">
            <span>하루 사용 가능 금액:</span>
            <strong>{{ format(option.daily) }}원</strong>
          </div>

          <p class="days-text">{{ tripDays }}일 동안 저축</p>
        </div>
      </div>
    </div>

    <button class="complete-btn" :disabled="!selected" @click="complete">
      목표 설정 완료
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTravelStore } from '@/stores/travel'

defineEmits(['complete', 'back'])

const store = useTravelStore()

const loading = ref(true)
const selected = ref('')
const countryData = ref(null)

const tripDays = computed(() => {
  if (!store.startDate || !store.endDate) return 1

  const start = new Date(store.startDate)
  const end = new Date(store.endDate)
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

  return diff > 0 ? diff : 1
})

const makeOption = (key, label, arr) => {
  const [flightMan, hotelMan, dailyMan] = arr

  const flight = flightMan * 10000
  const hotel = hotelMan * 10000
  const daily = dailyMan * 10000
  const total = flight + hotel + daily * tripDays.value

  return {
    key,
    label,
    flight,
    hotel,
    daily,
    total,
  }
}

const options = computed(() => {
  if (!countryData.value) return []

  return [
    makeOption('eco', '절약형', countryData.value.levels.eco),
    makeOption('std', '적정형', countryData.value.levels.std),
    makeOption('lux', '여유형', countryData.value.levels.lux),
  ]
})

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:3000/continents')
    const data = await res.json()

    for (const continent of data) {
      const found = continent.countries.find((c) => c.name === store.destination)
      if (found) {
        countryData.value = found

        if (!store.continent) {
          store.setContinent(continent.continent)
        }
        break
      }
    }
  } catch (error) {
    console.error('예산 옵션 불러오기 실패:', error)
  } finally {
    loading.value = false
  }
}

const select = (option) => {
  selected.value = option.key
  store.setBudgetOption(option.label)
  store.setTargetAmount(option.total)
  store.setTravelCost(option.total)
  store.setFlightCost(option.flight)
  store.setHotelCost(option.hotel)
  store.setDailyBudget(option.daily)
}

const complete = () => {
  if (!selected.value) return
  window.dispatchEvent(new CustomEvent('goal-complete'))
}

const format = (v) => Number(v).toLocaleString('ko-KR')

onMounted(fetchData)
</script>

<style scoped>
.step-option {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  min-height: 0;
}

.top-fixed {
  flex-shrink: 0;
}

.back-text {
  color: #7aa3e8;
  font-size: 14px;
  margin-bottom: 18px;
  cursor: pointer;
}

.title-row {
  margin-bottom: 14px;
}

h2 {
  font-size: 28px;
  color: #1d2a57;
  margin: 0 0 8px;
  font-weight: 800;
  line-height: 1.3;
}

.sub-text {
  color: #8f97a6;
  font-size: 14px;
  margin: 0;
}

.message {
  padding: 20px 0;
  color: #1d2a57;
  flex: 1;
}

.option-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 18px;
  padding-right: 6px;
}

.option-card {
  border: 1.5px solid #dbe5f5;
  border-radius: 14px;
  padding: 20px 22px 16px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.option-card:hover {
  border-color: #b9cef5;
}

.option-card.selected {
  border: 2px solid #0766ff;
  background-color: #f8fbff;
  box-shadow: 0 0 0 2px rgba(7, 102, 255, 0.05);
}

.top-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.top-line h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #1d2a57;
}

.price {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0766ff;
  flex-shrink: 0;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-list p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-size: 14px;
  color: #7d8594;
  line-height: 1.4;
  gap: 12px;
}

.detail-list strong {
  color: #4d5565;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.divider {
  height: 1px;
  background-color: #e3e7ee;
  margin: 12px 0 10px;
}

.bottom-area {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.daily-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.daily-row span {
  font-size: 14px;
  color: #0766ff;
  font-weight: 800;
}

.daily-row strong {
  font-size: 14px;
  color: #0766ff;
  font-weight: 800;
  flex-shrink: 0;
}

.days-text {
  margin: 6px 0 0;
  font-size: 12px;
  color: #a0a8b7;
  text-align: right;
  line-height: 1;
}

.complete-btn {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #0766ff;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
}

.complete-btn:disabled {
  background-color: #a9c4fb;
  cursor: default;
}

/* 스크롤바 */
.option-list::-webkit-scrollbar {
  width: 8px;
}

.option-list::-webkit-scrollbar-thumb {
  background: #c9d8f5;
  border-radius: 999px;
}

.option-list::-webkit-scrollbar-track {
  background: transparent;
}

@media (max-width: 768px) {
  h2 {
    font-size: 24px;
  }

  .option-card {
    padding: 18px 16px 14px;
  }

  .top-line h3,
  .price {
    font-size: 16px;
  }
}
</style>
