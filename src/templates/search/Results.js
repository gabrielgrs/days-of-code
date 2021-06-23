import { Fragment, useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import styled from 'styled-components'

const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Item = styled.div`
  width: 100%;
  border: solid black 2px;
  position: relative;
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
`

const Learned = styled(Base)`
  bottom: 4px;
`

const Link = styled.div`
  font-size: 0.8rem;
  color: gray;
`

const Title = styled.a`
  color: blue;
`

export default function Result({ list, onLike, onLearn, onReport }) {
  const { user, isAuthenticated } = useContext(AuthContext)

  return (
    <Results>
      {list.map((item) => (
        <Item key={item._id}>
          {isAuthenticated && (
            <Fragment>
              <Actions>
                <div onClick={() => onLike(item._id)}>
                  {item.likes.includes(user._id) ? 'Unlike' : 'Like'}
                </div>
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
    </Results>
  )
}
