import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTravelStore = defineStore('travel', () => {
  const userName = ref('')
  const userEmail = ref('')

  const continent = ref('')
  const destination = ref('')
  const startDate = ref('')
  const endDate = ref('')

  const monthlyIncome = ref(0)
  const budgetOption = ref('')
  const targetAmount = ref(0)
  const currentAsset = ref(0)
  const travelCost = ref(0)
  const flightCost = ref(0)
  const hotelCost = ref(0)
  const dailyBudget = ref(0)

  const isCompleted = ref(false)
  const isEarlyClosed = ref(false)

  const remainingAmount = computed(() => {
    const remain = targetAmount.value - currentAsset.value
    return remain > 0 ? remain : 0
  })

  const daysUntilTrip = computed(() => {
    if (!startDate.value) return null

    const today = new Date()
    const tripDate = new Date(startDate.value)

    today.setHours(0, 0, 0, 0)
    tripDate.setHours(0, 0, 0, 0)

    const diff = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24))
    return diff >= 0 ? diff : 0
  })

  const monthsNeeded = computed(() => {
    if (targetAmount.value <= currentAsset.value) return 0
    if (monthlyIncome.value <= 0) return null

    return Math.ceil((targetAmount.value - currentAsset.value) / monthlyIncome.value)
  })

  const setUserName = (value) => {
    userName.value = value
  }

  const setUserEmail = (value) => {
    userEmail.value = value
  }

  const setContinent = (value) => {
    continent.value = value
  }

  const setDestination = (value) => {
    destination.value = value
  }

  const setStartDate = (value) => {
    startDate.value = value
  }

  const setEndDate = (value) => {
    endDate.value = value
  }

  const setMonthlyIncome = (value) => {
    monthlyIncome.value = Number(value) || 0
  }

  const setBudgetOption = (value) => {
    budgetOption.value = value
  }

  const setTargetAmount = (value) => {
    targetAmount.value = Number(value) || 0
  }

  const setCurrentAsset = (value) => {
    currentAsset.value = Number(value) || 0
  }

  const setTravelCost = (value) => {
    travelCost.value = Number(value) || 0
  }

  const setFlightCost = (value) => {
    flightCost.value = Number(value) || 0
  }

  const setHotelCost = (value) => {
    hotelCost.value = Number(value) || 0
  }

  const setDailyBudget = (value) => {
    dailyBudget.value = Number(value) || 0
  }

  const markEarlyClosed = () => {
    isEarlyClosed.value = true
    isCompleted.value = true
  }

  const resetGoal = () => {
    monthlyIncome.value = 0
    budgetOption.value = ''
    targetAmount.value = 0
    currentAsset.value = 0
    travelCost.value = 0
    flightCost.value = 0
    hotelCost.value = 0
    dailyBudget.value = 0
    isCompleted.value = false
    isEarlyClosed.value = false
  }

  return {
    userName,
    userEmail,
    continent,
    destination,
    startDate,
    endDate,
    monthlyIncome,
    budgetOption,
    targetAmount,
    currentAsset,
    travelCost,
    flightCost,
    hotelCost,
    dailyBudget,
    isCompleted,
    isEarlyClosed,
    remainingAmount,
    daysUntilTrip,
    monthsNeeded,
    setUserName,
    setUserEmail,
    setContinent,
    setDestination,
    setStartDate,
    setEndDate,
    setMonthlyIncome,
    setBudgetOption,
    setTargetAmount,
    setCurrentAsset,
    setTravelCost,
    setFlightCost,
    setHotelCost,
    setDailyBudget,
    markEarlyClosed,
    resetGoal,
  }
})
