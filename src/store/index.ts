import { Expense } from '@/types/expense.interface'
import { createStore } from 'vuex'
import services from './services'
import { MutationTypes } from './types/mutationTypes'
import { AppState } from './types/state.interface'

export default createStore({
  state: {
    isAuthenticated: false,
    userData: null,
    monthList: [],
    currentMonthName: '',
    editingExpense: null,
  } as AppState,
  getters: {},
  mutations: {
    [MutationTypes.SET_CURRENT_MONTH_NAME]: (
      state: AppState,
      monthName: string
    ) => (state.currentMonthName = monthName),

    [MutationTypes.EDIT_EXPENSE]: (state: AppState, expence: Expense | null) =>
      (state.editingExpense = expence),
  },
  actions: services,
  modules: {},
})
