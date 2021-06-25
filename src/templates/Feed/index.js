import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Column, Row } from 'components'
import { rgba } from 'polished'
import { format } from 'date-fns'
import { Icon } from 'components'
import Layout from 'components/Layout'
import api from 'services/api'
import buildQueryString from 'utils/buildQueryString'
import useAuth from 'hooks/useAuth'

const Textarea = styled.textarea`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  font-size: 1.1rem;

  outline: none;
  border: none;
  border-bottom: solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.silver)}
    2px;
  padding: 0 ${({ theme }) => theme.sizes.xxs};

  &:focus {
    outline: none;
    border: none;
    border-bottom: solid ${({ theme }) => theme.colors.black} 2px;
  }

  // specifics
  position: relative;
  margin-bottom: ${({ theme }) => theme.sizes.xs};
`

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

const FieldActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const FieldActionsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.sm};
  margin-bottom: ${({ theme }) => theme.sizes.sm};
`

const CharactersCounter = styled.div`
  color: ${({ theme, invalid }) => (invalid ? theme.colors.danger : theme.colors.black)};
`

const ShowMoreButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.3rem;
  margin-top: ${({ theme }) => theme.sizes.lg};

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

const ITEMS_PER_PAGE = 5
const MAX_CHARACTERS = 50

export default function Feed() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [limit, setLimit] = useState(ITEMS_PER_PAGE)
  const [totalRecords, setTotalRecords] = useState(0)

  const { isAuthenticated, user = {} } = useAuth()

  const invalidText = text.length > MAX_CHARACTERS

  const getAll = useCallback(async (itemsPerPage = ITEMS_PER_PAGE) => {
    const queryString = buildQueryString({ limit: itemsPerPage })
    const { data, headers } = await api.get(`/publication/getAll?${queryString}`)
    setTotalRecords(+headers['x-total-records'])
    setItems(data)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!items.length) {
      getAll()
    }
  }, [getAll, items.length])

  const onLike = (publicationId) =>
    api.put(`/publication/like?${buildQueryString({ publicationId })}`)

  const onPressShowMore = () => {
    setLimit((p) => p + ITEMS_PER_PAGE)
    getAll(limit + ITEMS_PER_PAGE)
  }

  const onSubmit = async (t) => {
    try {
      setIsSubmitting(true)
      setText('')
      await api.post('/publication/create', { text: t })
      setLimit((p) => p + 1)
      setIsSubmitting(false)
      getAll(limit + 1)
    } catch (error) {
      setText(t)
    }
  }

  return (
    <Layout>
      <Row>
        {isAuthenticated && (
          <Column size={12}>
            <Textarea
              value={text}
              onChange={({ target }) => setText(target.value)}
              placeholder="Type some content..."
              onKeyDown={({ shiftKey, code }) => {
                if (code === 'Enter') {
                  if (!shiftKey) return onSubmit(text)
                }
              }}
              rows={4}
            />
            <FieldActions>
              <FieldActionsSection>
                <Icon name="report" cursor="not-allowed" />
                <Icon name="report" cursor="not-allowed" />
              </FieldActionsSection>
              <FieldActionsSection>
                <CharactersCounter invalid={invalidText}>
                  {text.length} / {MAX_CHARACTERS}
                </CharactersCounter>
                <Button
                  onClick={() => onSubmit(text)}
                  disabled={isSubmitting || invalidText || !text.length}
                >
                  Send
                </Button>
              </FieldActionsSection>
            </FieldActions>
          </Column>
        )}
        <Column size={12}>
          {items.map((item, index) => {
            return (
              <Card
                key={item._id}
                id={item._id}
                username={item.creator.username}
                createdAt={new Date(item.createdAt)}
                text={item.text}
                isLiked={item.likes.includes(user._id)}
                isLastItem={1 + index === items.length}
                onLike={onLike}
              />
            )
          })}
        </Column>
        <Column size={4} />
        <Column size={4}>
          {totalRecords > items.length && (
            <ShowMoreButton onClick={onPressShowMore}>Show more</ShowMoreButton>
          )}
        </Column>
        <Column size={4} />
      </Row>
    </Layout>
  )
}
