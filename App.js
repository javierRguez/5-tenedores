import React from 'react'
import Navigation from './app/navigation/Navigation'
import InitializeFirebase from './app/utils/firebase'

export default function App() {
  InitializeFirebase()
  return <Navigation />
}
