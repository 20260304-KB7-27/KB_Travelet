<template>
  <div class="settings-page">
    <h1>설정</h1>

    <div class="goal-card">
      <div class="goal-header">
        <h2>여행 목표</h2>
        <button class="edit-btn" @click="isEditing = !isEditing">
          {{ isEditing ? '닫기' : '수정' }}
        </button>
      </div>

      <div v-if="!isEditing" class="goal-info">
        <div class="info-grid">
          <div class="info-item">
            <p class="label">목적지</p>
            <p class="value">{{ travelStore.destination || '-' }}</p>
          </div>

          <div class="info-item">
            <p class="label">대륙</p>
            <p class="value">{{ travelStore.continent || '-' }}</p>
          </div>

          <div class="info-item">
            <p class="label">출발일</p>
            <p class="value">{{ travelStore.startDate || '-' }}</p>
          </div>

          <div class="info-item">
            <p class="label">귀국일</p>
            <p class="value">{{ travelStore.endDate || '-' }}</p>
          </div>

          <div class="info-item">
            <p class="label">월 수입</p>
            <p class="value">
              {{ formatCurrency(travelStore.monthlyIncome) }}원
            </p>
          </div>

          <div class="info-item">
            <p class="label">예산 옵션</p>
            <p class="value">{{ travelStore.budgetOption || '-' }}</p>
          </div>

          <div class="info-item">
            <p class="label">목표 예산</p>
            <p class="value">
              {{ formatCurrency(travelStore.targetAmount) }}원
            </p>
          </div>

          <div class="info-item">
            <p class="label">현재 자산</p>
            <p class="value">
              {{ formatCurrency(travelStore.currentAsset) }}원
            </p>
          </div>
        </div>

        <div class="result-box">
          <p>
            남은 목표 금액: {{ formatCurrency(travelStore.remainingAmount) }}원
          </p>
          <p>여행까지 남은 기간: {{ dDayText }}</p>
        </div>
      </div>

      <div v-else class="edit-form">
        <label>월 수입</label>
        <input v-model="monthlyIncomeInput" type="text" inputmode="numeric" />

        <label>현재 자산</label>
        <input v-model="currentAssetInput" type="text" inputmode="numeric" />

        <label>목표 예산</label>
        <input v-model="targetAmountInput" type="text" inputmode="numeric" />

        <div class="button-row">
          <button class="save-btn" @click="saveGoal">저장</button>
          <button class="cancel-btn" @click="cancelEdit">취소</button>
        </div>
      </div>
    </div>

    <div class="action-grid">
      <div class="action-card danger">
        <h3>초기화</h3>
        <p>목표를 초기화합니다.</p>
        <button class="danger-btn" @click="showResetModal = true">
          초기화
        </button>
      </div>

      <div class="action-card success">
        <h3>조기 종료</h3>
        <p>목표를 달성한 경우 조기 종료할 수 있습니다.</p>
        <button class="success-btn" @click="showEarlyModal = true">
          조기 종료
        </button>
      </div>
    </div>

    <div v-if="showResetModal" class="modal-overlay">
      <div class="modal-card">
        <p class="modal-text">
          초기화 할 경우 다시 되돌릴 수 없습니다.<br />
          그래도 초기화 하시겠습니까?
        </p>
        <button class="modal-confirm danger-btn" @click="confirmReset">
          확인
        </button>
      </div>
    </div>

    <div v-if="showEarlyModal" class="modal-overlay">
      <div class="modal-card">
        <p class="modal-text">
          목표를 달성하셨나요? 축하드립니다!<br />
          조기 종료를 원하시면 확인 버튼을 눌러주세요!
        </p>
        <button class="modal-confirm success-btn" @click="confirmEarlyClose">
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTravelStore } from '@/stores/travel';

const travelStore = useTravelStore();
const isEditing = ref(false);

const showResetModal = ref(false);
const showEarlyModal = ref(false);

const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '';
  return Number(value).toLocaleString('ko-KR');
};

const parseNumber = (value) => {
  return Number(String(value).replace(/[^0-9]/g, '')) || 0;
};

const monthlyIncomeInput = computed({
  get: () => formatNumber(travelStore.monthlyIncome),
  set: (value) => travelStore.setMonthlyIncome(parseNumber(value)),
});

const currentAssetInput = computed({
  get: () => formatNumber(travelStore.currentAsset),
  set: (value) => travelStore.setCurrentAsset(parseNumber(value)),
});

const targetAmountInput = computed({
  get: () => formatNumber(travelStore.targetAmount),
  set: (value) => travelStore.setTargetAmount(parseNumber(value)),
});

const dDayText = computed(() => {
  if (travelStore.daysUntilTrip === null) return '-';
  return `D-${travelStore.daysUntilTrip}`;
});

const saveGoal = () => {
  if (
    Number(travelStore.monthlyIncome) < 0 ||
    Number(travelStore.currentAsset) < 0 ||
    Number(travelStore.targetAmount) < 0
  ) {
    return;
  }

  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const confirmReset = () => {
  travelStore.resetGoal();
  showResetModal.value = false;
};

const confirmEarlyClose = () => {
  travelStore.markEarlyClosed();
  showEarlyModal.value = false;
};

const formatCurrency = (value) => {
  return Number(value || 0).toLocaleString('ko-KR');
};
</script>

<style scoped>
.settings-page {
  max-width: 980px;
  margin: 0 auto;
  padding: 20px 20px 16px;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 36px;
  margin: 0 0 16px;
  color: #1d2a57;
  font-weight: 800;
  line-height: 1;
}

.goal-card {
  background: #f8fbff;
  border: 1px solid #dce8ff;
  border-radius: 20px;
  padding: 22px;
  margin-bottom: 14px;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.goal-header h2 {
  font-size: 26px;
  color: #1d2a57;
  margin: 0;
}

.edit-btn {
  border: none;
  background-color: #0766ff;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 30px;
  margin-bottom: 18px;
}

.info-item {
  min-width: 0;
}

.label {
  font-size: 13px;
  color: #7b8497;
  margin-bottom: 6px;
}

.value {
  font-size: 18px;
  font-weight: 700;
  color: #1d2a57;
  word-break: break-word;
}

.result-box {
  padding: 16px 18px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #e8eefb;
}

.result-box p {
  margin: 0 0 10px;
  font-size: 16px;
  color: #1d2a57;
}

.result-box p:last-child {
  margin-bottom: 0;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-form label {
  font-size: 14px;
  color: #5b6478;
  font-weight: 600;
}

.edit-form input {
  height: 44px;
  border: 1px solid #d7e3f8;
  border-radius: 12px;
  padding: 0 14px;
  margin-bottom: 8px;
  font-size: 15px;
  box-sizing: border-box;
}

.button-row {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.save-btn,
.cancel-btn,
.danger-btn,
.success-btn {
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  cursor: pointer;
  color: white;
  font-weight: 700;
  font-size: 15px;
}

.save-btn {
  background-color: #0766ff;
}

.cancel-btn {
  background-color: #94a3b8;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  flex-shrink: 0;
}

.action-card {
  border-radius: 20px;
  padding: 18px 20px;
  text-align: center;
}

.action-card h3 {
  margin: 0 0 8px;
  font-size: 22px;
}

.action-card p {
  margin: 0 0 14px;
  font-size: 14px;
}

.action-card.danger {
  background: #ffe8e6;
  color: #8e1f18;
}

.action-card.success {
  background: #e8f8eb;
  color: #0a6d2f;
}

.danger-btn {
  background: #ff3b30;
}

.success-btn {
  background: #16a34a;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 460px;
  background: white;
  border-radius: 18px;
  padding: 28px;
  text-align: center;
}

.modal-text {
  font-size: 18px;
  line-height: 1.6;
  color: #1d2a57;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .settings-page {
    height: auto;
    overflow: visible;
    padding: 16px;
  }

  .goal-card {
    flex: none;
  }

  .info-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
