import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  overlay: {
    width: '90%',
  },
})

const Modal = ({ isVisible, setIsVisible, children }) => {
  const closeModal = () => setIsVisible(false)
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  )
}

export default Modal
