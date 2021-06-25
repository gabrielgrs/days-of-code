import { Fragment } from 'react'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { Button, Icon } from 'components'

const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.sm};
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

const Actions = styled(Base)`
  top: 0;
`

const Learned = styled(Base)`
  bottom: 0;
`

const Link = styled.div`
  font-size: 0.9rem;
`

const Title = styled.a`
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`

const About = styled.div`
  width: 50%;
  font-style: italic;
`

export default function Result({ list, totalRecords, onLike, onLearn, onReport, onShowMore }) {
  const { user, isAuthenticated } = useAuth()

  return (
    <Results>
      {list.map((item) => (
        <Item key={item._id}>
          {isAuthenticated && (
            <Fragment>
              <Actions>
                <Icon
                  name="heart"
                  cursor="pointer"
                  color={item.likes.includes(user._id) ? 'black' : 'danger'}
                  onClick={() => onLike(item._id)}
                />
                <Icon name="report" cursor="pointer" onClick={() => onReport(item._id)} />
              </Actions>
              <Learned>
                <div onClick={() => onLearn(item._id)}>
                  {user.learnings.includes(item._id) ? 'Unmark' : 'Mark'} as learned
                </div>
              </Learned>
            </Fragment>
          )}
          <Link>{item.link}</Link>
          <Title target="_blank" href={item.link}>
            {item.title}
          </Title>
          <About>
            {item.level} - {item.technologies.join(',')} - {item.language}
          </About>
        </Item>
      ))}
      {totalRecords > list.length && <Button onClick={onShowMore}>Show more</Button>}
    </Results>
  )
}
