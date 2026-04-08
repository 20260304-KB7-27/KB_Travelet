<template>
  <div class="landing-page">
    <div class="card">
      <div class="title-wrap">
        <span class="plane">✈</span>
        <h1>여행 저축 가계부</h1>
      </div>

      <p class="subtitle">꿈의 여행을 위한 첫 걸음</p>

      <div class="field">
        <label>이름</label>
        <input v-model="name" type="text" placeholder="이름을 입력하세요" />
      </div>

      <div class="field">
        <label>이메일</label>
        <input v-model="email" type="email" placeholder="email@example.com" />
      </div>

      <button @click="goToOnboarding">시작하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTravelStore } from '@/stores/travel'

const router = useRouter()
const travelStore = useTravelStore()

const name = ref('')
const email = ref('')

const goToOnboarding = () => {
  if (!name.value || !email.value) {
    alert('이름과 이메일을 입력해주세요.')
    return
  }

  travelStore.setUserName(name.value)
  travelStore.setUserEmail(email.value)

  router.push('/onboarding')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0766ff, #0047d4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: #f8fbff;
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.plane {
  font-size: 28px;
  color: #0766ff;
}

h1 {
  margin: 0;
  font-size: 28px;
  color: #1d2a57;
  font-weight: 800;
}

.subtitle {
  color: #7b8497;
  margin-bottom: 28px;
}

.field {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #5b6478;
  font-size: 14px;
}

input {
  width: 100%;
  height: 48px;
  border: 1px solid #d7e3f8;
  border-radius: 10px;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #0766ff;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
}
</style>