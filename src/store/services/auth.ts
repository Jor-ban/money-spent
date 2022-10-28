import { AppStore } from './../types/store.interface'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db, provider } from '@/utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { UserData } from '@/types/userData.interface'
import { ActionTypes } from '../types/actionTypes'
import Cookies from 'js-cookie'

export default {
  [ActionTypes.LOGIN]: login,
  [ActionTypes.LOGIN_FROM_COOKIES]: loginFromLocalStorage,
}

async function login({ state }: AppStore) {
  const result = await signInWithPopup(auth, provider)
  GoogleAuthProvider.credentialFromResult(result)
  const user = result.user as unknown as UserData
  await createUserIfNotExist(user)
  Cookies.set('uid', user.uid, {
    expires: 100 * 365,
  })
  state.userData = {
    uid: user.uid,
    displayName: user.displayName,
  }
  state.isAuthenticated = true
}
async function loginFromLocalStorage({ state }: AppStore) {
  const uid: string | undefined = Cookies.get('uid')
  if (uid) {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      const docData = userDoc.data()
      state.userData = docData.userData as UserData
      state.isAuthenticated = true
    }
  }
}

async function createUserIfNotExist(user: UserData) {
  const potentialDoc = await getDoc(doc(db, 'users', user.uid))
  if (!potentialDoc.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      userData: {
        uid: user.uid,
        displayName: user.displayName,
      },
    })
  }
}
