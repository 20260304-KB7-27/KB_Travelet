<template>
  <div class="settings-page">
    <div class="settings-shell">
      <h1 class="page-title">설정</h1>

      <!-- 프로필 카드 -->
      <section class="profile-card">
        <div class="profile-avatar">👤</div>
        <div class="profile-info">
          <p class="profile-name">{{ userName || '사용자' }}</p>
          <p class="profile-email">{{ userEmail || 'email@example.com' }}</p>
        </div>
      </section>

      <!-- 보기 모드 -->
      <section v-if="!isEditMode" class="goal-card">
        <div class="goal-card-header">
          <h2>여행 목표</h2>
          <button class="edit-btn" @click="openEditMode">수정</button>
        </div>

        <div class="goal-info-grid">
          <div class="info-item">
            <p class="label">목적지</p>
            <p class="value">{{ destinationText }}</p>
          </div>

          <div class="info-item">
            <p class="label">대륙</p>
            <p class="value">{{ continentText }}</p>
          </div>

          <div class="info-item">
            <p class="label">출발일</p>
            <p class="value">{{ startDateText }}</p>
          </div>

          <div class="info-item">
            <p class="label">귀국일</p>
            <p class="value">{{ endDateText }}</p>
          </div>

          <div class="info-item">
            <p class="label">여행 경비 (원)</p>
            <p class="value">{{ formatNumber(travelCost) }}</p>
          </div>

          <div class="info-item">
            <p class="label">비행기값 (원)</p>
            <p class="value">{{ formatNumber(flightCost) }}</p>
          </div>

          <div class="info-item">
            <p class="label">숙소 비용 (원)</p>
            <p class="value">{{ formatNumber(hotelCost) }}</p>
          </div>

          <div class="info-item">
            <p class="label">하루 예산 (원)</p>
            <p class="value">{{ formatNumber(dailyBudget) }}</p>
          </div>
        </div>
      </section>

      <!-- 수정 모드 -->
      <section v-else class="edit-card">
        <div class="goal-info-grid top-info-grid">
          <div class="info-item">
            <p class="label">목적지</p>
            <p class="value">{{ destinationText }}</p>
          </div>

          <div class="info-item">
            <p class="label">대륙</p>
            <p class="value">{{ continentText }}</p>
          </div>

          <div class="info-item">
            <p class="label">출발일</p>
            <p class="value">{{ startDateText }}</p>
          </div>

          <div class="info-item">
            <p class="label">귀국일</p>
            <p class="value">{{ endDateText }}</p>
          </div>
        </div>

        <div class="edit-form">
          <div class="form-group">
            <label>여행 경비 (원)</label>
            <input v-model.number="editForm.travelCost" type="number" min="0" />
          </div>

          <div class="form-group">
            <label>비행기값 (원)</label>
            <input v-model.number="editForm.flightCost" type="number" min="0" />
          </div>

          <div class="form-group">
            <label>숙소 비용 (원)</label>
            <input v-model.number="editForm.hotelCost" type="number" min="0" />
          </div>

          <div class="form-group">
            <label>하루 예산 (원)</label>
            <input v-model.number="editForm.dailyBudget" type="number" min="0" />
          </div>
        </div>

        <div class="edit-button-row">
          <button class="save-btn" @click="saveEdit">저장</button>
          <button class="cancel-btn" @click="cancelEdit">취소</button>
        </div>
      </section>

      <!-- 요약 카드 -->
      <section class="summary-card">
        <div class="summary-row">
          <span class="summary-label">현재 목표 상태:</span>
          <strong
            class="summary-value"
            :class="{ ended: isGoalEnded }"
          >
            {{ isGoalEnded ? '조기 종료됨' : '진행 중' }}
          </strong>
        </div>
      </section>

      <!-- 액션 카드 -->
      <section class="action-grid">
        <div class="action-card reset-card">
          <h3>목표 초기화</h3>
          <p>모든 여행 목표 값을 초기 상태로 되돌립니다.</p>
          <button class="action-btn reset-btn" @click="resetGoal">목표 전체 삭제</button>
        </div>

        <div class="action-card finish-card">
          <h3>조기 종료</h3>
          <p>현재 목표를 조기 종료 상태로 변경합니다.</p>
          <button class="action-btn finish-btn" @click="finishGoal">조기 종료</button>
        </div>
      </section>
    </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-box" @click.stop>
        <h3 class="modal-title">알림</h3>
        <p class="modal-message">{{ modalMessage }}</p>
        <button class="modal-confirm-btn" @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useTravelStore } from '@/stores/travel'

const travelStore = useTravelStore()

const isEditMode = ref(false)
const showModal = ref(false)
const modalMessage = ref('')

const editForm = reactive({
  travelCost: 0,
  flightCost: 0,
  hotelCost: 0,
  dailyBudget: 0,
})

/*
  fallback을 없애거나 최소화해야
  reset했을 때 진짜 빈 상태가 화면에 반영됨
*/
const userName = computed(() => travelStore.userName ?? '')
const userEmail = computed(() => travelStore.userEmail ?? '')

const destinationText = computed(() => travelStore.destination ?? '')
const continentText = computed(() => travelStore.continent ?? '')
const startDateText = computed(() => travelStore.startDate ?? '')
const endDateText = computed(() => travelStore.endDate ?? '')

const travelCost = computed(() => Number(travelStore.travelCost ?? 0))
const flightCost = computed(() => Number(travelStore.flightCost ?? 0))
const hotelCost = computed(() => Number(travelStore.hotelCost ?? 0))
const dailyBudget = computed(() => Number(travelStore.dailyBudget ?? 0))
const isGoalEnded = computed(() => Boolean(travelStore.isGoalEnded ?? false))

const formatNumber = (value) => Number(value || 0).toLocaleString('ko-KR')

const openModal = (message) => {
  modalMessage.value = message
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalMessage.value = ''
}

const openEditMode = () => {
  editForm.travelCost = travelCost.value
  editForm.flightCost = flightCost.value
  editForm.hotelCost = hotelCost.value
  editForm.dailyBudget = dailyBudget.value
  isEditMode.value = true
}

const cancelEdit = () => {
  isEditMode.value = false
}

const saveEdit = () => {
  /*
    setter가 있으면 setter 사용
    없으면 직접 할당
  */
  if (typeof travelStore.setTravelCost === 'function') {
    travelStore.setTravelCost(editForm.travelCost)
  } else {
    travelStore.travelCost = editForm.travelCost
  }

  if (typeof travelStore.setFlightCost === 'function') {
    travelStore.setFlightCost(editForm.flightCost)
  } else {
    travelStore.flightCost = editForm.flightCost
  }

  if (typeof travelStore.setHotelCost === 'function') {
    travelStore.setHotelCost(editForm.hotelCost)
  } else {
    travelStore.hotelCost = editForm.hotelCost
  }

  if (typeof travelStore.setDailyBudget === 'function') {
    travelStore.setDailyBudget(editForm.dailyBudget)
  } else {
    travelStore.dailyBudget = editForm.dailyBudget
  }

  isEditMode.value = false
  openModal('여행 목표가 수정되었습니다.')
}

const resetGoal = () => {
  if (typeof travelStore.setDestination === 'function') {
    travelStore.setDestination('')
  } else {
    travelStore.destination = ''
  }

  if (typeof travelStore.setContinent === 'function') {
    travelStore.setContinent('')
  } else {
    travelStore.continent = ''
  }

  if (typeof travelStore.setStartDate === 'function') {
    travelStore.setStartDate('')
  } else {
    travelStore.startDate = ''
  }

  if (typeof travelStore.setEndDate === 'function') {
    travelStore.setEndDate('')
  } else {
    travelStore.endDate = ''
  }

  if (typeof travelStore.setTravelCost === 'function') {
    travelStore.setTravelCost(0)
  } else {
    travelStore.travelCost = 0
  }

  if (typeof travelStore.setFlightCost === 'function') {
    travelStore.setFlightCost(0)
  } else {
    travelStore.flightCost = 0
  }

  if (typeof travelStore.setHotelCost === 'function') {
    travelStore.setHotelCost(0)
  } else {
    travelStore.hotelCost = 0
  }

  if (typeof travelStore.setDailyBudget === 'function') {
    travelStore.setDailyBudget(0)
  } else {
    travelStore.dailyBudget = 0
  }

  if (typeof travelStore.setBudgetOption === 'function') {
    travelStore.setBudgetOption('')
  } else {
    travelStore.budgetOption = ''
  }

  if (typeof travelStore.setTargetAmount === 'function') {
    travelStore.setTargetAmount(0)
  } else {
    travelStore.targetAmount = 0
  }

  if ('isGoalEnded' in travelStore) {
    travelStore.isGoalEnded = false
  }

  isEditMode.value = false
  openModal('목표가 초기화되었습니다.')
}

const finishGoal = () => {
  if ('isGoalEnded' in travelStore) {
    travelStore.isGoalEnded = true
  } else {
    travelStore.isGoalEnded = true
  }

  openModal('목표가 조기 종료되었습니다.')
}
</script>

<style scoped>
.settings-page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #f6f8fc;
  padding: 18px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.settings-shell {
  width: min(980px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
}

.page-title {
  margin: 0;
  color: #1b2d6b;
  font-size: 34px;
  font-weight: 800;
}

.profile-card,
.goal-card,
.edit-card,
.summary-card {
  background: #f9fbff;
  border: 1px solid #d8e3f6;
  border-radius: 18px;
  padding: 16px 20px;
  box-sizing: border-box;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: #1568f5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.profile-name {
  margin: 0 0 2px;
  font-size: 17px;
  font-weight: 800;
  color: #162b66;
}

.profile-email {
  margin: 0;
  font-size: 12px;
  color: #8f97aa;
}

.goal-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.goal-card-header h2 {
  margin: 0;
  color: #1b2d6b;
  font-size: 24px;
  font-weight: 800;
}

.edit-btn {
  border: none;
  background: #1568f5;
  color: white;
  border-radius: 10px;
  min-width: 68px;
  height: 40px;
  padding: 0 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.goal-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 40px;
}

.top-info-grid {
  margin-bottom: 16px;
}

.label {
  margin: 0 0 4px;
  color: #8f97aa;
  font-size: 12px;
  font-weight: 500;
}

.value {
  margin: 0;
  color: #162b66;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.25;
  word-break: break-word;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  color: #5c6884;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  height: 40px;
  border: 1px solid #cfdcf4;
  border-radius: 8px;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 14px;
  outline: none;
}

.edit-button-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 16px;
}

.save-btn,
.cancel-btn {
  height: 42px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.save-btn {
  border: none;
  background: #1568f5;
  color: white;
}

.cancel-btn {
  border: 1px solid #d7dfef;
  background: white;
  color: #49566f;
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.summary-label {
  color: #1b2d6b;
  font-size: 15px;
}

.summary-value {
  color: #1b2d6b;
  font-size: 15px;
  font-weight: 800;
}

.summary-value.ended {
  color: #18a84a;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-card {
  border-radius: 18px;
  padding: 18px 16px;
  min-height: 150px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.action-card h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
}

.action-card p {
  margin: 0;
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
}

.reset-card {
  background: #f9e3e1;
}

.reset-card h3,
.reset-card p {
  color: #bb4b3b;
}

.finish-card {
  background: #deefe2;
}

.finish-card h3,
.finish-card p {
  color: #2f8c46;
}

.action-btn {
  border: none;
  border-radius: 10px;
  min-width: 132px;
  height: 42px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.reset-btn {
  background: #ff4336;
}

.finish-btn {
  background: #18a84a;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-box {
  width: min(360px, calc(100vw - 32px));
  background: white;
  border-radius: 16px;
  padding: 20px 20px 16px;
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
}

.modal-title {
  margin: 0 0 8px;
  color: #1b2d6b;
  font-size: 20px;
  font-weight: 800;
}

.modal-message {
  margin: 0 0 16px;
  color: #374151;
  font-size: 14px;
  line-height: 1.4;
}

.modal-confirm-btn {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #1568f5;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 900px) {
  .settings-page {
    padding: 12px;
  }

  .page-title {
    font-size: 28px;
  }

  .goal-info-grid,
  .action-grid,
  .edit-button-row {
    grid-template-columns: 1fr;
  }

  .goal-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
