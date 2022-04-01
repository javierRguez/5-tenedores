import { View, Button } from 'react-native'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'

export default function UserLogged() {
  const auth = getAuth()
  return (
    <View>
      <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
    </View>
  )
}
