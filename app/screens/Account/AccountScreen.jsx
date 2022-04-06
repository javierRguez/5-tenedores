import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LoadingModal } from '../../components'
import { UserGuestScreen } from './UserGuestScreen'
import { UserLoggedScreen } from './UserLoggedScreen'

export function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(!!user)
    })
  }, [])

  if (hasLogged === null) return <LoadingModal isVisible text="Cargando.." />

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
}
