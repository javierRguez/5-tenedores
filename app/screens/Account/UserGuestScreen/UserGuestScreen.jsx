import { ScrollView, Image, View, Text } from 'react-native'

import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { styles } from './UserGuestScreen.styles'

const logo = require('../../../../assets/img/user-guest.jpg')

export function UserGuestScreen() {
  const navigation = useNavigation()
  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image source={logo} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </ScrollView>
  )
}
