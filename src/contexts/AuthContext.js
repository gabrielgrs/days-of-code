import { useState, createContext, useCallback, useEffect } from 'react'
import api from 'services/api'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(undefined)

  const onAuthenticate = useCallback((_token, _user) => {
    if (!_token) throw Error(`Token is required`)
    if (!_user) throw Error(`User is required`)

    localStorage.setItem('token', _token)
    setUser(_user)
  }, [])

  // const onVerifyToken = useCallback(
  //   async (token) => {
  //     setLoading(true)

  //     if (!token) {
  //       setUser(undefined)
  //       return setLoading(false)
  //     }

  //     const { data } = await api.post('/auth/verifyToken')

  //     if (data?.token && data?.user) {
  //       onAuthenticate(data.token, data.user)
  //     }
  //     return setLoading(false)
  //   },
  //   [onAuthenticate]
  // )

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   onVerifyToken(token)
  // }, [onVerifyToken])

  if (loading) return 'Loading....'

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, onAuthenticate }}>
      {children}
    </AuthContext.Provider>
  )
}
