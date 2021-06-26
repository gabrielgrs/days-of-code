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
            <S.Item onClick={() => onChangeTheme('dark')}>
              <Icon name="moon" height={24} />
            </S.Item>
          ) : (
            <S.Item onClick={() => onChangeTheme('light')}>
              <Icon name="sun" height={24} />
            </S.Item>
          )}
        </S.Section>
        <S.Section>
          {isAuthenticated && (
            <S.Item onClick={() => setIsCreateModalOpen(true)}>
              {/* <Icon name="add" height={24} /> */}
              <span>Add Content</span>
            </S.Item>
          )}
          {isAuthenticated && (
            <S.Item onClick={() => setIsProfileModalOpen(true)}>
              {/* <Icon name="profile" height={24} /> */}
              <span>Profile</span>
            </S.Item>
          )}
          {!isAuthenticated && (
            <S.Item onClick={() => setIsAuthModalOpen(true)}>
              {/* <Icon name="profile" height={24} /> */}
              <span>Login</span>
            </S.Item>
          )}
        </S.Section>
      </S.Nav>

      <Profile isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <Auth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Create isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </Fragment>
  )
}
