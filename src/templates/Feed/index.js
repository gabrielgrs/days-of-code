import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Column, Row } from 'components'
import Layout from 'components/Layout'
import api from 'services/api'
import buildQueryString from 'utils/buildQueryString'
import useOnScreen from 'hooks/useOnScreen'
import useFetchFeed from 'hooks/useFetchFeed'

import Input from './Input'
import List from './List'

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

const ITEMS_PER_PAGE = 5

export default function Feed() {
  const showMoreRef = useRef(null)

  const [limit, setLimit] = useState(ITEMS_PER_PAGE)

  const { items, mutate, canLoadMore, loading } = useFetchFeed({
    limit,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const isVisible = useOnScreen(showMoreRef, canLoadMore)

  const onLike = async (publicationId) => {
    await api.put(`/publication/like?${buildQueryString({ publicationId })}`)
    mutate()
  }

  const onShowMore = useCallback(() => {
    setLimit((p) => p + ITEMS_PER_PAGE)
  }, [])

  const onSubmit = async ({ text }) => {
    await api.post('/publication/create', { text })
    setLimit((p) => p + 1)
    mutate()
  }

  useEffect(() => {
    if (isVisible) onShowMore()
  }, [isVisible, onShowMore])

  return (
    <Layout>
      <Row>
        <Column size={12}>
          <Input onSubmit={onSubmit} />
        </Column>
        <Column size={12}>
          <List loading={loading} items={items} onLike={onLike} />
        </Column>
        <Column size={4} />
        <Column size={4}>
          {canLoadMore && !loading && (
            <ShowMoreButton ref={showMoreRef} onClick={onShowMore}>
              Show more
            </ShowMoreButton>
          )}
        </Column>
        <Column size={4} />
      </Row>
    </Layout>
  )
}
