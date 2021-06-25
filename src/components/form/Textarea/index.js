import styled from 'styled-components'

const Textarea = styled.textarea`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  font-size: 1.1rem;

  outline: none;
  border: none;
  border-bottom: solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.silver)}
    2px;
  padding: 0 ${({ theme }) => theme.sizes.xxs};

  &:focus {
    outline: none;
    border: none;
    border-bottom: solid ${({ theme }) => theme.colors.black} 2px;
  }
`

export default Textarea
