import { View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RegisterForm } from '../../../components/Auth'
import { styles } from './RegisterScreen.styles'

const logo = require('../../../../assets/img/5-tenedores-letras-icono-logo.png')

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  )
}
