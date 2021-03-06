import { Fragment, useState } from 'react'
import styled from 'styled-components'

import Search from 'templates/Search'
import Feed from 'templates/Feed'

const Actions = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.xs};
  left: 2%;
  z-index: 2;
`

export const Dot = styled.div`
  cursor: pointer;
  width: 12px;
  height: ${({ active }) => (active ? '16px' : '12px')};
  border-radius: ${({ active }) => (active ? '10px' : '50%')};
  transition: ${({ theme }) => theme.helpers.transitions(['height', 'border-radius'])};
  background: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  const screens = {
    search: 'search',
    feed: 'feed',
  }

  const [screen, setScreen] = useState(localStorage.getItem('@doc:lastPage') ?? screens.search)

  const onChangeScreen = (screenKey) => {
    setScreen(screenKey)
    localStorage.setItem('@doc:lastPage', screenKey)
  }

  return (
    <Fragment>
      <Actions>
        {Object.keys(screens).map((key) => (
          <Dot key={key} active={screen === key} onClick={() => onChangeScreen(key)} />
        ))}
      </Actions>
      {screen === screens.search && <Search />}
      {screen === screens.feed && <Feed />}
    </Fragment>
  )
}
