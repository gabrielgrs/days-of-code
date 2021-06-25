import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 2% 0 5% 0;
  justify-content: center;
  align-items: ${({ alignItems }) => alignItems};
  height: ${({ height }) => height};

  animation: layoutAppears 400ms linear;

  @keyframes layoutAppears {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

const Content = styled.div`
  width: 80%;
  max-width: 1200px;
`

export default function Layout({ children, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Content>{children}</Content>
    </Wrapper>
  )
}
