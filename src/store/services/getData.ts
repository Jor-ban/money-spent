import { collection, doc, getDocs, getFirestore } from 'firebase/firestore'
import { ActionTypes } from '../types/actionTypes'
import { AppStore } from '../types/store.interface'
import { Expense } from '@/types/expense.interface'
import { MutationTypes } from '../types/mutationTypes'

export default {
  [ActionTypes.RETRIEVE_MONTH]: retrieveMonth,
}

async function retrieveMonth({ state, commit }: AppStore, monthName: string) {
  const userDoc = doc(getFirestore(), 'users', String(state.userData?.uid))
  const thisMonthCollection = collection(userDoc, monthName)
  const docs = await getDocs(thisMonthCollection)
  const spends: Expense[] = []
  docs.forEach((doc) => {
    const expense = doc.data() as Expense
    spends.push(expense)
  })
  state.monthList = spends
  commit(MutationTypes.SET_CURRENT_MONTH_NAME, monthName)
  return spends
}
