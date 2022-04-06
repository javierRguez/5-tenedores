import { StyleSheet, ScrollView, Image, View, Text } from 'react-native'

import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screenName'

const logo = require('../../../assets/img/user-guest.jpg')

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: '#00a680',
  },
  btnContainer: {
    width: '70%',
  },
})

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
          onPress={() => navigation.navigate(screen.account.login)}
        />
      </View>
    </ScrollView>
  )
}
