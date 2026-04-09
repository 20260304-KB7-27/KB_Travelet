<template>
  <div class="bg-white rounded-4 shadow-sm p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold mb-0">
        <i class="fas fa-plane-departure me-2 text-primary"></i>여행 목표
      </h5>
      <div class="d-flex gap-2">
        <button
          v-if="isEditing"
          @click="cancelEdit"
          class="btn btn-sm btn-light px-3"
        >
          취소
        </button>
        <button
          @click="isEditing ? saveEdit() : startEdit()"
          class="btn btn-sm px-3"
          :class="isEditing ? 'btn-success' : 'btn-primary'"
        >
          {{ isEditing ? '저장' : '수정' }}
        </button>
      </div>
    </div>

    <TravelGoalForm v-if="isEditing" v-model="tempData" />
    <TravelGoalDisplay v-else :goal="goal" />

    <div
      class="d-flex justify-content-between align-items-center mt-3 border-top pt-3"
    >
      <span class="text-muted">총 여행 경비</span>
      <span class="fw-bold" style="color: var(--color-primary)">
        {{ totalExpense.toLocaleString() }}원
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TravelGoalDisplay from './TravelGoalDisplay.vue';
import TravelGoalForm from '../form/TravelGoalForm.vue';

const props = defineProps({
  goal: { type: Object, required: true },
});
const emit = defineEmits(['update-goal']);

const isEditing = ref(false);
const tempData = ref({});

const totalExpense = computed(() => {
  const target = isEditing.value ? tempData.value : props.goal;
  return (
    (target.etcExpense || 0) +
    (target.flightExpense || 0) +
    (target.hotelExpense || 0)
  );
});

const startEdit = () => {
  tempData.value = { ...props.goal };
  isEditing.value = true;
};

const saveEdit = () => {
  emit('update-goal', { ...tempData.value });
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>
