import { UserData } from '@/types/userData.interface'

export interface AppState {
  isAuthenticated: boolean
  userData: UserData | null
}
