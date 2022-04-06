import { LogBox } from 'react-native'
import Navigation from './app/navigation/Navigation'
import InitializeFirebase from './app/utils/firebase'

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  InitializeFirebase()
  return <Navigation />
}
