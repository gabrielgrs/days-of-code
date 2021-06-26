import { Fragment, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { Icon } from 'components'

const Results = styled.div`
  width: 100%;
`

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.sm};

  animation: resultsAppears 300ms linear;

  @keyframes resultsAppears {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

const Item = styled.div`
  position: relative;
  border-bottom: solid black 1px;
`

const Base = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  gap: ${({ theme }) => theme.sizes.xxs};
`

const TopActions = styled(Base)`
  top: 0;
`

const BottomActions = styled(Base)`
  bottom: 0;
`

const Link = styled.a`
  font-size: 0.9rem;
`

const Title = styled.a`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`

const About = styled.div`
  width: 50%;
  font-style: italic;
`

const Pages = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.sizes.sm} 0;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Page = styled.div`
  cursor: pointer;
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.black)};
  font-size: 1.4rem;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.default};
  }
`

const Learn = styled.div`
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.default};
  }
`

const ITEMS_PER_PAGE = 10

export default function Result({
  list,
  totalRecords,
  onLike,
  onLearn,
  onReport,
  currentPage,
  onChangePage,
}) {
  const { user, isAuthenticated } = useAuth()
  const [localLikes, setLocalLikes] = useState([])
  const [localLearnings, setLocalLearnings] = useState([])

  const totalPages = useMemo(() => {
    if (totalRecords < ITEMS_PER_PAGE) return 1
    return Math.ceil(totalRecords / ITEMS_PER_PAGE)
  }, [totalRecords])

  const onPressLikeButton = (itemId) => {
    onLike(itemId)
    setLocalLikes((p) => (p.includes(itemId) ? p.filter((x) => x !== itemId) : [...p, itemId]))
  }

  const onPressToMarkAsLearned = (itemId) => {
    onLearn(itemId)
    setLocalLearnings((p) => (p.includes(itemId) ? p.filter((x) => x !== itemId) : [...p, itemId]))
  }

  return (
    <Results>
      <List key={currentPage}>
        {list.map((item) => (
          <Item key={item._id}>
            {isAuthenticated && (
              <Fragment>
                <TopActions>
                  <Icon
                    name="heart"
                    cursor="pointer"
                    color={
                      item.likes.includes(user._id) || localLikes.includes(item._id)
                        ? 'danger'
                        : 'black'
                    }
                    onClick={() => onPressLikeButton(item._id)}
                  />
                  <Icon name="report" cursor="pointer" onClick={() => onReport(item._id)} />
                </TopActions>
                <BottomActions>
                  <Learn onClick={() => onPressToMarkAsLearned(item._id)}>
                    {user.learnings.includes(item._id) || localLearnings.includes(item._id)
                      ? 'Unmark'
                      : 'Mark'}{' '}
                    as learned
                  </Learn>
                </BottomActions>
              </Fragment>
            )}
            <Link target="_blank" href={item.link}>
              {item.link}
            </Link>
            <div>
              <Title target="_blank" href={item.link}>
                {item.title}
              </Title>
            </div>
            <About>
              {item.level} - {item.technologies.join(',')} - {item.language}
            </About>
          </Item>
        ))}
      </List>
      {totalPages > 1 && (
        <Pages>
          {Array.from({ length: totalPages }).map((_, index) => {
            const position = index + 1
            const range = 4
            if (position >= currentPage + range || position <= currentPage - range) return null
            return (
              <Page
                onClick={() => onChangePage(position)}
                key={index}
                active={currentPage === position}
              >
                {position}
              </Page>
            )
          })}
        </Pages>
      )}
    </Results>
  )
}
