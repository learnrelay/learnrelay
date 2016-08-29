import * as Immutable from 'immutable'

interface UserData {
  endpoint: string
  email: string
  resetPasswordToken: string
}

export interface StoredState {
  hasRead: { [key: string]: boolean }
  user: UserData | null
  skippedAuth: boolean
}

const initialState: StoredState = {
  hasRead: {},
  user: null,
  skippedAuth: false,
}

let state: StoredState = window.localStorage.hasOwnProperty('learnrelay_state')
  ? JSON.parse(window.localStorage.getItem('learnrelay_state')!) as StoredState
  : initialState

export function getStoredState(): StoredState {
  return state
}

export function update(keyPath: string[], value: any): StoredState {
  state = Immutable.fromJS(state).setIn(keyPath, value).toJS() as StoredState
  window.localStorage.setItem('learnrelay_state', JSON.stringify(state))
  return state
}
