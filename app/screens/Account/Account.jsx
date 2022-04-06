import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LoadingModal } from 'components'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
  const [hasLogged, setHasLogged] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(!!user)
    })
  }, [])

  if (hasLogged === null) return <LoadingModal isVisible text="Cargando.." />

  return hasLogged ? <UserLogged /> : <UserGuest />
}
