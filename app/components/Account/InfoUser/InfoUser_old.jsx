import { View, Text } from 'react-native'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Avatar } from 'react-native-elements'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { styles } from './InfoUser.styles'

const defaultAvatar = require('../../../../assets/img/avatar-default.jpg')

export function InfoUser({ toastRef, setLoadingText, setIsLoading }) {
  const auth = getAuth()
  const storage = getStorage()
  const { uid, photoURL, email, displayName } = auth.currentUser

  const uploadImage = async (uri) => {
    setLoadingText('Actualizando Avatar...')
    setIsLoading(true)

    const storageRef = ref(storage, `avatar/${uid}`)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        resolve(xhr.response)
      }
      xhr.onerror = () => {
        setIsLoading(false)
        reject(toastRef.current.show('Error al actualizar el avatar.'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          const update = {
            photoURL: url,
          }
          await updateProfile(auth.currentUser, update)
          setIsLoading(false)
        })
      })
      .catch(() => {
        setIsLoading(false)
        toastRef.current.show('Error al actualizar el avatar.')
      })
  }

  const changeAvatar = async () => {
    const resultPermission = await MediaLibrary.requestPermissionsAsync()

    if (resultPermission.status === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos de la galería')
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })
      if (result.cancelled) {
        toastRef.current.show('Has cerrado la selección de imagenes')
      } else {
        uploadImage(result.uri)
      }
    }
  }

  return (
    <View style={styles.content}>
      <Avatar
        showEditButton
        rounded
        size="large"
        containerStyle={styles.avatar}
        icon={{ type: 'material', name: 'person' }}
        source={photoURL ? { uri: photoURL } : defaultAvatar}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || 'Anónimo'}</Text>
        <Text>{email || 'Social Login'}</Text>
      </View>
    </View>
  )
}
