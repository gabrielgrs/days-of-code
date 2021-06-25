import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: feedWrapperAppears 400ms linear;

  @keyframes feedWrapperAppears {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

const Content = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Feed() {
  return (
    <Wrapper>
      <Content>Feed</Content>
    </Wrapper>
  )
}
