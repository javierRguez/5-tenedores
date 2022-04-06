import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#00a680',
  },
})
function defaultFormValue() {
  return { email: '', password: '' }
}

const ChangeEmailForm = ({
  email,
  setShowModal,
  toastRef,
  setReloadUserInfo,
}) => {
  const [formData, setFormData] = useState(defaultFormValue())

  const onSubmit = () => {}

  const onChange = (e, type) => {
    e.persist()
    setFormData((prevValue) => {
      return { ...prevValue, [type]: e.nativeEvent.text }
    })
  }

  return (
    <View style={styles.view}>
      <Input
        style={styles.input}
        placeholder="Correo electrónico"
        defaultValue={email || ''}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
        onChange={(e) => onChange(e, 'email')}
      />
      <Input
        style={styles.input}
        placeholder="Contraseña"
        password
        secureTextEntry
        rightIcon={{
          type: 'material-community',
          name: 'eye-outline',
          color: '#c2c2c2',
        }}
        onChange={(e) => onChange(e, 'password')}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  )
}

export default ChangeEmailForm
