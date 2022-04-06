import { ScrollView, Image, View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../../components/Auth'
import { screen } from '../../../navigation/screenName'
import { styles } from './LoginScreen.styles'

const logo = require('../../../../assets/img/5-tenedores-letras-icono-logo.png')

export function LoginScreen() {
  return (
    <ScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewContainer}>
        <LoginForm />
        <CreateAccount />
      </View>
      <Divider color="#00a680" style={styles.divider} />
      <Text>Social Login</Text>
    </ScrollView>
  )
}

function CreateAccount() {
  const navigation = useNavigation()
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{' '}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate(screen.account.register)}
      >
        Regístrate
      </Text>
    </Text>
  )
}
