import { StyleSheet, View, Image } from 'react-native'
import { useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'
import { RegisterForm } from '../../components/Auth'

const logo = require('../../../assets/img/5-tenedores-letras-icono-logo.png')

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    marginTop: 20,
    height: 150,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
})

export function RegisterScreen() {
  const toastRef = useRef()
  return (
    <KeyboardAwareScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  )
}
