import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
})

function generateOptions(selectedComponent) {
  return [
    {
      title: 'Cambiar Nombre y Apellidos',
      iconType: 'material-community',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('displayName'),
    },
    {
      title: 'Cambiar Email',
      iconType: 'material-community',
      iconNameLeft: 'at',
      iconColorLeft: '#ccc',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('email'),
    },
    {
      title: 'Cambiar Contraseña',
      iconType: 'material-community',
      iconNameLeft: 'lock-reset',
      iconColorLeft: '#ccc',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('password'),
    },
  ]
}

export default function AccountOptions({
  toastRef,
  userInfo,
  setReloadUserInfo,
}) {
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)
  const selectedComponent = (key) => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        )
        setShowModal(true)
        break
      case 'email':
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        )
        setShowModal(true)
        break
      case 'password':
        setRenderComponent(<Text>Cambiando contraseña</Text>)
        setShowModal(true)
        break

      default:
        setRenderComponent(null)
        setShowModal(false)
        break
    }
  }
  const menuOptions = generateOptions(selectedComponent)
  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={30} color={menu.iconColorRight} />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  )
}
