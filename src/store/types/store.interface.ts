import { AppState } from './state.interface'

export interface AppStore {
  state: AppState
  dispatch: (type: string, payload?: any) => Promise<any>
  commit: (type: string, payload?: any) => void
}
