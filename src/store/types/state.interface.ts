import { Expense } from '@/types/expense.interface'
import { UserData } from '@/types/userData.interface'

export interface AppState {
  isAuthenticated: boolean
  userData: UserData | null
  monthList: Expense[]
  currentMonthName: string
  editingExpense: null | Expense
}
