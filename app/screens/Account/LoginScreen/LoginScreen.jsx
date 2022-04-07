import { ScrollView, View } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../../components/Auth'
import { screen } from '../../../navigation/screenName'
import { styles } from './LoginScreen.styles'

const logo = require('../../../../assets/img/5-tenedores-letras-icono-logo.png')

export function LoginScreen() {
  const navigation = useNavigation()
  const goToRegister = () => {
    navigation.navigate(screen.account.register)
  }
  return (
    <ScrollView>
      <Image source={logo} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta{' '}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Regístrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}
