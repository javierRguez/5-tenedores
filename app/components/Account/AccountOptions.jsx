import { useState } from 'react'
import { View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import { Modal } from '../Shared'
import { ChangeDisplayNameForm } from './ChangeDisplayNameForm'
import { ChangeEmailForm } from './ChangeEmailForm'
import { ChangePasswordForm } from './ChangePasswordForm'

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

export function AccountOptions({ onReload }) {
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const onCloseOpenModal = () => setShowModal(false)

  const selectedComponent = (key) => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
            onClose={onCloseOpenModal}
            onReload={onReload}
          />
        )
        setShowModal(true)
        break
      case 'email':
        setRenderComponent(
          <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
        )
        setShowModal(true)
        break
      case 'password':
        setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />)
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
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
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
        <Modal isVisible={showModal} close={onCloseOpenModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  )
}
