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

export default function Result({ list }) {
  const onLike = ({ id, title }) => alert(`Item (${id}-${title}) liked with sucess`)
  const onReport = ({ id, title }) => alert(`Item (${id}-${title}) reported with sucess`)
  const onLearn = ({ id, title }) => alert(`Item (${id}-${title}) learnedWithSuccess with sucess`)

  return (
    <Results>
      {list.map((item) => (
        <Item key={item.id}>
          <Actions>
            <div onClick={() => onLike(item)}>Like</div>
            <div onClick={() => onReport(item)}>Report</div>
          </Actions>
          <Learned>
            <div onClick={() => onLearn(item)}>Learned</div>
          </Learned>
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
