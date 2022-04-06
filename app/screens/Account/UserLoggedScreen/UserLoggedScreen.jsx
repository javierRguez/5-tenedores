import { View } from 'react-native'
import { useRef, useState, useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import { LoadingModal } from '../../../components'
import InfoUser from '../../../components/Account/InfoUser'
import AccountOptions from '../../../components/Account/AccountOptions'
import { styles } from './UserLoggedScreen.styles'

export function UserLoggedScreen() {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [reloadUserInfo, setReloadUserInfo] = useState(false)
  const auth = getAuth()
  const toastRef = useRef()

  useEffect(() => {
    ;(async () => {
      const user = auth.currentUser
      setUserInfo(user)
    })()
    setReloadUserInfo(false)
  }, [reloadUserInfo])

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setIsLoading={setIsLoading}
          setLoadingText={setLoadingText}
        />
      )}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => signOut(auth)}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <LoadingModal text={loadingText} isVisible={isLoading} />
    </View>
  )
}
