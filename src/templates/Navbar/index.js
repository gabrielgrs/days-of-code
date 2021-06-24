import { Fragment, useState } from 'react'
import styled from 'styled-components'

import Profile from 'templates/Profile'
import Auth from 'templates/Auth'
import Create from 'templates/Create'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import Icon from 'components/Icon'

const Nav = styled.div``

const Section = styled.div``

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { isAuthenticated } = useAuth()
  const { themeName, onChangeTheme } = useTheme()

  return (
    <Fragment>
      <Nav>
        <Section>
          {themeName == 'light' ? (
            <Icon cursor="pointer" name="moon" onClick={() => onChangeTheme('dark')} height={24} />
          ) : (
            <Icon cursor="pointer" name="sun" onClick={() => onChangeTheme('light')} height={24} />
          )}
        </Section>
        <Section>
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
        </Section>
      </Nav>

      <Profile isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <Auth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Create isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </Fragment>
  )
}
