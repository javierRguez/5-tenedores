import { StyleSheet, View, Text } from 'react-native'

import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Avatar } from 'react-native-elements'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'

const styles = StyleSheet.create({
  userInfoAvatar: { marginRight: 20 },
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
    paddingBottom: 30,
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
})

const defaultAvatar = require('../../../assets/img/avatar-default.jpg')

export default function InfoUser({
  userInfo,
  toastRef,
  setLoadingText,
  setIsLoading,
}) {
  const auth = getAuth()
  const storage = getStorage()
  const { uid, photoURL, email, displayName } = userInfo

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
    <View style={styles.viewUserInfo}>
      <Avatar
        showEditButton
        rounded
        size="large"
        containerStyle={styles.userInfoAvatar}
        source={photoURL ? { uri: photoURL } : defaultAvatar}
      >
        <Avatar.Accessory size={28} onPress={() => changeAvatar()} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || 'Anónimo'}</Text>
        <Text>{email || 'Social Login'}</Text>
      </View>
    </View>
  )
}
