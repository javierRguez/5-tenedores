import { useState } from 'react'
import { View, Text } from 'react-native'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { styles } from './InfoUser.styles'

export function InfoUser({ setLoadingText, setIsLoading }) {
  const auth = getAuth()
  const storage = getStorage()
  const { uid, photoURL, email, displayName } = auth.currentUser
  const [avatar, setAvatar] = useState(photoURL)

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) uploadImage(result.uri)
  }

  const uploadImage = async (uri) => {
    setLoadingText('Actualizando Avatar')
    setIsLoading(true)
    const response = await fetch(uri)
    const blob = await response.blob()
    const storageRef = ref(storage, `avatar/${uid}`)
    uploadBytes(storageRef, blob).then((snapshot) => {
      const { fullPath } = snapshot.metadata
      updatePhotoUrl(fullPath)
    })
  }

  const updatePhotoUrl = async (imagePath) => {
    const imageRef = ref(storage, imagePath)
    const imageUrl = await getDownloadURL(imageRef)
    updateProfile(auth.currentUser, { photoURL: imageUrl })
    setAvatar(imageUrl)
    setIsLoading(false)
  }

  return (
    <View style={styles.content}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatar}
        icon={{ type: 'material-community', name: 'account-circle' }}
        source={avatar && { uri: avatar }}
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
