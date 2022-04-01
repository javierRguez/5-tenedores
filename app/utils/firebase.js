import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBU-reD7cPGrW_un0UE7M9Le-1e_yVD_Bo',
  authDomain: 'tenedores-ef0c0.firebaseapp.com',
  projectId: 'tenedores-ef0c0',
  storageBucket: 'tenedores-ef0c0.appspot.com',
  messagingSenderId: '47846679988',
  appId: '1:47846679988:web:ca6fed959c0285770c7ee1',
}

const InitializeFirebase = () => {
  if (getApps().length < 1) {
    const app = initializeApp(firebaseConfig)
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  }
}

export default InitializeFirebase
