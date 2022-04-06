import { View } from 'react-native'
import { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import Toast from 'react-native-toast-message'
import { screen } from '../../../navigation/screenName'
import { styles } from './LoginForm.styles'
import { initialValues, validationSchema } from './LoginForm.data'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const auth = getAuth()
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => onSubmit(formValue),
  })

  const onSubmit = async (formValue) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      )
      navigation.navigate(screen.account.account)
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Usuario o contraseña incorrectos',
      })
    }
  }

  const onShowHidePassword = () => setShowPassword((prevValue) => !prevValue)

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
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
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={onShowHidePassword}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}
