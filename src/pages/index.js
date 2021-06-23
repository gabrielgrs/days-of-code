import { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from 'contexts/AuthContext'

import Search from 'templates/search'
import Profile from 'templates/Profile'
import Auth from 'templates/Auth'
import Create from 'templates/Create'

const Actions = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  padding: ${({ theme }) => theme.sizes.xxs};
  gap: ${({ theme }) => theme.sizes.xxs};
  width: 100%;
`

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Fragment>
      <Actions>
        {isAuthenticated ? (
          <Fragment>
            <button onClick={() => setIsProfileModalOpen(true)}>My profile</button>
            <button onClick={() => setIsCreateModalOpen(true)}>Create</button>
          </Fragment>
        ) : (
          <button onClick={() => setIsAuthModalOpen(true)}>Auth</button>
        )}
      </Actions>
      <Profile isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <Auth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Create isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <Search />
    </Fragment>
  )
}
