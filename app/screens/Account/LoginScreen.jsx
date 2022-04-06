import { StyleSheet, ScrollView, Image, View, Text } from 'react-native'
import { useRef } from 'react'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import LoginForm from '../../components/Account/LoginForm'

const logo = require('../../../assets/img/5-tenedores-letras-icono-logo.png')

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    marginTop: 20,
    height: 150,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: '#00a680',
    fontWeight: 'bold',
  },
  divider: {
    margin: 40,
  },
})

export function LoginScreen() {
  const toastRef = useRef()
  return (
    <ScrollView>
      <Image source={logo} resizeMode="contain" style={styles.logo} />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider color="#00a680" style={styles.divider} />
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
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
        onPress={() => navigation.navigate('register')}
      >
        Regístrate
      </Text>
    </Text>
  )
}
