import { Overlay } from 'react-native-elements'
import { styles } from './Modal.styles'

export const Modal = ({ isVisible, close, children }) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  )
}
