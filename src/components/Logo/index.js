import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.h1`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 3rem;
  margin: ${({ theme }) => theme.sizes.lg} 0;
  padding-right: ${({ active }) => active && '25%'};

  * {
    transition: all 0.6s linear;
    transition-delay: 0.5s;
  }

  @media screen and (max-width: 772px) {
    padding-left: 20%;
    font-size: 1.5rem;
  }
`

const Left = styled.div`
  transition: all 0.6s cubic-bezier(0.555, -0.375, 0, 1.615);
  transform: ${({ active }) => active && 'translateX(205px)'};

  @media screen and (max-width: 772px) {
    transform: ${({ active }) => active && 'translateX(100px)'};
  }
`

const Right = styled.div`
  transition: all 1.2s cubic-bezier(0.555, -0.375, 0, 1.615);
  text-indent: ${({ active }) => active && '-35px'};
  transform: ${({ active }) => active && 'translateX(-40px)'};

  @media screen and (max-width: 772px) {
    transform: ${({ active }) => active && 'translateX(0px)'};
  }
`

const Bar = styled.div`
  margin: 0 ${({ theme }) => theme.sizes.xxs};
  transform: ${({ active }) => (active ? '' : ' rotateZ(22deg)')};
  color: ${({ theme }) => theme.colors.primary};
`

const Opacify = styled.span`
  opacity: ${({ active }) => (active ? 0 : 1)};
`

export default function Logo() {
  const [active, setActive] = useState(false)

  return (
    <Wrapper active={active} onClick={() => setActive((p) => !p)}>
      <Left active={active}>
        D<Opacify active={active}>eveloper</Opacify>
      </Left>{' '}
      <Bar active={active}>|</Bar>{' '}
      <Right active={active}>
        <Opacify active={active}>Net</Opacify>work
      </Right>
    </Wrapper>
  )
}
