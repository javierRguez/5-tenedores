import { View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'
import { styles } from './LoadingModal.styles'

export function LoadingModal({ isVisible, text }) {
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}

LoadingModal.defaultProps = {
  show: false,
}
