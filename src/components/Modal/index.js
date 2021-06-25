import Icon from 'components/Icon'
import { rgba } from 'polished'
import { useEffect } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => rgba('black', theme.opacity.default)};
  z-index: 10;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.white};
  z-index: 11;
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ theme }) => theme.sizes.sm};
  width: ${({ width }) => width};
  max-width: 772px;

  animation: appears 500ms linear;

  @keyframes appears {
    from {
      opacity: 0;
      transform: scale(0) translate(-50%, 50%);
    }

    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }

  @media screen and (max-width: 992px) {
    width: 95%;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.colored(theme.colors.primary)};
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    top: -10px;
    right: -10px;
    padding: 4px;
  }
`

export default function Modal({ children, isOpen, onClose, width }) {
  useEffect(() => {
    const onPressEscape = ({ code }) => code === 'Escape' && onClose()
    window.addEventListener('keydown', (e) => onPressEscape(e))
    window.removeEventListener('keydown', (e) => onPressEscape(e))
  }, [onClose])

  if (!isOpen) return null

  return (
    <Overlay>
      <ModalWrapper width={width || '500px'}>
        <CloseButton onClick={onClose}>
          <Icon name="close" height={28} />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>
  )
}
