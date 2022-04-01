/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: '#fff',
    margin: 0,
    padding: 10,
    borderRadius: 10,
    borderColor: '#00a680',
    borderWidth: 2,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#00a680',
    textTransform: 'uppercase',
    marginTop: 10,
  },
})

export default function Loading({ isVisible, text }) {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}
