import { Fragment, useState } from 'react'

import Profile from 'templates/Profile'
import Auth from 'templates/Auth'
import Create from 'templates/Create'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import Icon from 'components/Icon'

import Loader from './Loader'

import * as S from './styles'

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { isAuthenticated, loading } = useAuth()
  const { themeName, onChangeTheme } = useTheme()

  if (loading) return <Loader />

  return (
    <Fragment>
      <S.Nav>
        <S.Section>
          {themeName == 'light' ? (
            <Icon cursor="pointer" name="moon" onClick={() => onChangeTheme('dark')} height={24} />
          ) : (
            <Icon cursor="pointer" name="sun" onClick={() => onChangeTheme('light')} height={24} />
          )}
        </S.Section>
        <S.Section>
          {isAuthenticated && (
            <Icon
              name="add"
              cursor="pointer"
              onClick={() => setIsCreateModalOpen(true)}
              height={24}
            />
          )}
          {isAuthenticated && (
            <Icon
              cursor="pointer"
              name="profile"
              onClick={() => setIsProfileModalOpen(true)}
              height={24}
            />
          )}
          {!isAuthenticated && (
            <Icon
              cursor="pointer"
              name="profile"
              onClick={() => setIsAuthModalOpen(true)}
              height={24}
            />
          )}
        </S.Section>
      </S.Nav>

      <Profile isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <Auth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Create isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </Fragment>
  )
}
