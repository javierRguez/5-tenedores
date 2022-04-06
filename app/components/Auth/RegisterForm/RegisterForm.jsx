import { View } from 'react-native'
import { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { screen } from '../../../navigation/screenName'
import { styles } from './RegisterForm.styles'
import { initialValues, validationSchema } from './RegisterForm.data'

export function RegisterForm() {
  const navigation = useNavigation()
  const auth = getAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => onSubmit(formValue),
  })

  const onSubmit = async (formValue) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      )
      navigation.navigate(screen.account.account)
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error al registrarse, intentelo mas tarde',
      })
    }
  }

  const onShowHidePassword = () => setShowPassword((prevValue) => !prevValue)
  const onShowHideRepeatPassword = () =>
    setShowRepeatPassword((prevValue) => !prevValue)
  /*  const { email, password, repeatPassword } = formData
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
        .then(( userCredential ) => {
          // const { user } = userCredential
          setIsLoading(false)
          navigation.navigate(screen.account.account)
        })
        .catch((error) => {
          setIsLoading(false)
          const errorCode = error.code
          // const errorMessage = error.message
          toastRef.current.show(
            `El email ya está en uso, pruebe con otro. Error code: ${errorCode}`
          )
        })
    } */

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
      <Input
        password
        secureTextEntry={!showRepeatPassword}
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
        errorMessage={formik.errors.repeatPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={onShowHideRepeatPassword}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}
