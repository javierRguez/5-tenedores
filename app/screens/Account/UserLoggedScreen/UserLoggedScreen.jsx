/* eslint-disable no-unused-vars */
import { View } from 'react-native'
import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from 'react-native-elements'
import { LoadingModal } from '../../../components'
import { InfoUser, AccountOptions } from '../../../components/Account'
import { styles } from './UserLoggedScreen.styles'

export function UserLoggedScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [_, setReload] = useState(false)
  const auth = getAuth()

  const onReload = () => setReload((prevState) => !prevState)
  const logout = async () => {
    await signOut(auth)
  }

  return (
    <View>
      <InfoUser setIsLoading={setIsLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload} />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
      <LoadingModal text={loadingText} isVisible={isLoading} />
    </View>
  )
}
