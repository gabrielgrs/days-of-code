import { memo, useState } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { format } from 'date-fns'
import { Icon } from 'components'
import useAuth from 'hooks/useAuth'

import Loader from './Loader'

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  border-bottom: ${({ theme, isLastItem }) => !isLastItem && `solid ${theme.colors.silver} 1px`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.md};
  padding: ${({ theme }) => theme.sizes.xs};

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.silver, 0.05)};
  }
`

const About = styled.div``

const Text = styled.div``

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.sm};
`

const ActionItem = styled.div`
  &:hover {
    opacity: ${({ theme }) => theme.opacity.default};
  }
`

function Card({ id, username, createdAt, text, isLastItem, onLike, isLiked }) {
  return (
    <Item isLastItem={isLastItem}>
      <About>
        @{username} - {format(createdAt, 'dd/mm/yyyy HH:mm')}
      </About>
      <Text>{text}</Text>
      <Actions>
        <ActionItem>
          <Icon
            name="heart"
            cursor="pointer"
            color={isLiked ? 'danger' : 'black'}
            onClick={() => onLike(id)}
          />
        </ActionItem>
        {/* <ActionItem>Teste</ActionItem> */}
      </Actions>
    </Item>
  )
}

function FeedList({ items, onLike, loading }) {
  const [localLikes, setLocalLikes] = useState([])

  const { user = {} } = useAuth()

  const onPressLike = (itemId) => {
    onLike(itemId)
    setLocalLikes((p) => (p.includes(itemId) ? p.filter((x) => x !== itemId) : [...p, itemId]))
  }

  if (loading) return <Loader />

  return items.map((item, index) => {
    return (
      <Card
        key={item._id}
        id={item._id}
        username={item.creator.username}
        createdAt={new Date(item.createdAt)}
        text={item.text}
        isLiked={item.likes.includes(user._id) || localLikes.includes(item._id)}
        isLastItem={1 + index === items.length}
        onLike={() => onPressLike(item._id)}
      />
    )
  })
}

export default memo(FeedList)
