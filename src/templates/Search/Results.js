import { Fragment } from 'react'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { Button, Icon } from 'components'

const Results = styled.div``

const Item = styled.div``

const Base = styled.div``

const Actions = styled(Base)``

const Learned = styled(Base)``

const Link = styled.div``

const Title = styled.a``

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
                  color={item.likes.includes(user._id) ? 'black' : 'danger'}
                  onClick={() => onLike(item._id)}
                />
                <div onClick={() => onReport(item._id)}>Report</div>
              </Actions>
              <Learned>
                <div onClick={() => onLearn(item._id)}>
                  {user.learnings.includes(item._id) ? 'Unmark' : 'Mark'} as learned
                </div>
              </Learned>
            </Fragment>
          )}
          <Title target="_blank" href={item.link}>
            <Link>{item.link}</Link>
            {item.title}
          </Title>
          <div>
            {item.level} - {item.technologies.join(',')} - {item.language}
          </div>
        </Item>
      ))}
      {totalRecords > list.length && <Button onClick={onShowMore}>Show more</Button>}
    </Results>
  )
}
