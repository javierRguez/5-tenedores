import { LogBox } from 'react-native'
import Toast from 'react-native-toast-message'
import AppNavigation from './app/navigation/AppNavigation'
import InitializeFirebase from './app/utils/firebase'

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  InitializeFirebase()
  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  )
}
