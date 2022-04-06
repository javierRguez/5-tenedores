import { LogBox } from 'react-native'
import AppNavigation from './app/navigation/AppNavigation'
import InitializeFirebase from './app/utils/firebase'

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  InitializeFirebase()
  return <AppNavigation />
}
