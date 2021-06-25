import styled from 'styled-components'

const Img = styled.img`
  height: ${({ theme }) => theme.sizes.custom(20)};
  width: ${({ theme }) => theme.sizes.custom(20)};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.colored(theme.colors.black)};
`

export default function Avatar() {
  return <Img src="/assets/svgs/avatar.svg" />
}
