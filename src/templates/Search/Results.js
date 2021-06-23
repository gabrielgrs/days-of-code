import { Fragment } from 'react'
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { Button, Icon } from 'components'

const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.sm};
  margin-top: ${({ theme }) => theme.sizes.sm};
`

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: solid ${({ theme }) => theme.colors.silver} 1px;
  position: relative;
  padding: ${({ theme }) => theme.sizes.xs} 0;
`

const Base = styled.div`
  position: absolute;
  display: flex;
  right: 4px;
  gap: 8px;
  font-size: 0.8rem;

  & > div {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`

const Actions = styled(Base)`
  top: 4px;
  display: flex;
  align-items: center;
`

const Learned = styled(Base)`
  bottom: 4px;
`

const Link = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
`

const Title = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  font-size: 1.2rem;
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
