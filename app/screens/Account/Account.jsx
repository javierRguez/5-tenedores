import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'

export default function Account() {
  const [login, setLogin] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogin(false)
      } else {
        setLogin(true)
      }
    })
  }, [])

  if (login === null) return <Loading isVisible text="Cargando.." />

  return login ? <UserLogged /> : <UserGuest />
}
