import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { size, isEmpty } from 'lodash'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../utils/validations'
import { LoadingModal } from '..'

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputForm: {
    width: '100%',
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: '95%',
  },
  btnRegister: {
    backgroundColor: '#00a680',
  },
  iconRight: {
    color: '#c1c1c1',
  },
})

function defaultFormValue() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  }
}

export default function RegisterForm({ toastRef }) {
  const navigation = useNavigation()
  const auth = getAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValue())

  const onSubmit = () => {
    const { email, password, repeatPassword } = formData
    if (isEmpty(email) || isEmpty(password) || isEmpty(repeatPassword)) {
      toastRef.current.show('Todos los campos son obligatorios')
    } else if (!validateEmail(email)) {
      toastRef.current.show('El email no es correcto')
    } else if (password !== repeatPassword) {
      toastRef.current.show('Las contraseñas tienen que ser iguales')
    } else if (size(password) < 6) {
      toastRef.current.show(
        'La contraseña tiene que tener al menos 6 caracteres'
      )
    } else {
      setIsLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((/* userCredential */) => {
          // const { user } = userCredential
          setIsLoading(false)
          navigation.navigate('account')
        })
        .catch((error) => {
          setIsLoading(false)
          const errorCode = error.code
          // const errorMessage = error.message
          toastRef.current.show(
            `El email ya está en uso, pruebe con otro. Error code: ${errorCode}`
          )
        })
    }
  }

  const onChange = (e, type) => {
    e.preventDefault()
    setFormData((prevValue) => {
      return { ...prevValue, [type]: e.nativeEvent.text }
    })
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'email')}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        password
        secureTextEntry={!showPassword}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'password')}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword((prevValue) => !prevValue)}
          />
        }
      />
      <Input
        password
        secureTextEntry={!showRepeatPassword}
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'repeatPassword')}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword((prevValue) => !prevValue)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <LoadingModal isVisible={isLoading} text="Creando cuenta" />
    </View>
  )
}
