import { ScrollView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { styles } from './UserGuestScreen.styles'
import { screen } from '../../../navigation/screenName'

const logo = require('../../../../assets/img/user-guest.jpg')

export function UserGuestScreen() {
  const navigation = useNavigation()
  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }

  return (
    <ScrollView centerContent style={styles.content}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>

      <Button
        buttonStyle={styles.btnStyle}
        title="Ver tu perfil"
        onPress={goToLogin}
      />
    </ScrollView>
  )
}
