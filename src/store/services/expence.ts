import { Expense } from '@/types/expense.interface'
import { db } from '@/utils/firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { ActionTypes } from '../types/actionTypes'
import { AppStore } from '../types/store.interface'

export default {
  [ActionTypes.ADD_EXPENCE]: addExpence,
  [ActionTypes.EDIT_EXPENCE]: editExpense,
  [ActionTypes.DELETE_EXPENSE]: deleteExpense,
}

async function addExpence({ state }: AppStore, spendData: Expense) {
  const userUid = state.userData?.uid
  if (userUid) {
    const userDoc = doc(db, 'users', userUid)
    const currentTimeInMs = Date.now()
    spendData.time = currentTimeInMs
    await setDoc(
      doc(userDoc, state.currentMonthName, String(currentTimeInMs)),
      spendData
    )
    state.monthList.push(spendData)
  }
}

async function editExpense({ state }: AppStore, spendData: { time: number }) {
  const userUid = state.userData?.uid
  if (userUid) {
    const userDoc = doc(db, 'users', userUid)
    await setDoc(
      doc(userDoc, state.currentMonthName, String(spendData.time)),
      spendData
    )
    const expenseInArr = state.monthList.find(
      (el: Expense) => el.time === spendData.time
    )
    if (expenseInArr) {
      Object.assign(expenseInArr, spendData)
    }
  }
}

async function deleteExpense({ state }: AppStore, spendData: Expense) {
  const userUid = state.userData?.uid
  if (userUid) {
    const userDoc = doc(db, 'users', userUid)
    await deleteDoc(
      doc(userDoc, state.currentMonthName, String(spendData.time))
    )
    const expenseInArrIndex = state.monthList.findIndex(
      (el: Expense) => el.time === spendData.time
    )
    state.monthList.splice(expenseInArrIndex, 1)
  }
}
