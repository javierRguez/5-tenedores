import { View } from 'react-native'
import { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { isEmpty } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { validateEmail } from '../../../utils/validations'
import { LoadingModal } from '../..'
import { screen } from '../../../navigation/screenName'
import { styles } from './LoginForm.styles'

function defaultFormValue() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  }
}

export function LoginForm({ toastRef }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValue())
  const [isLoading, setIsLoading] = useState(false)
  const auth = getAuth()
  const navigation = useNavigation()

  const onChange = (e, type) => {
    e.persist()
    setFormData((prevValue) => {
      return { ...prevValue, [type]: e.nativeEvent.text }
    })
  }

  const onSubmit = () => {
    const { email, password } = formData
    if (isEmpty(email) || isEmpty(password)) {
      toastRef.current.show('Todos los campos son obligatorios')
    } else if (!validateEmail(email)) {
      toastRef.current.show('El email no es correcto')
    } else {
      setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLoading(false)
          navigation.navigate(screen.account.account)
        })
        .catch((error) => {
          setIsLoading(false)
          toastRef.current.show(`Error: ${error.code}`)
        })
    }
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
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <LoadingModal isVisible={isLoading} text="Iniciando sesión" />
    </View>
  )
}
