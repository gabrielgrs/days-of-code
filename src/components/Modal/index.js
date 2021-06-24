import Icon from 'components/Icon'
import { useEffect } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  animation: overlayAppears 400ms linear;

  ${({ theme }) => theme.animations.appears('overlayAppears')};
`

const ModalWrapper = styled.div`
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 772px;
  padding: ${({ theme }) => `${theme.sizes.sm} ${theme.sizes.lg}`};
  border-radius: ${({ theme }) => theme.radius.default};
`

const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: -16px;
  right: -16px;
  height: 36px;
  width: 36px;
  border-radius: 50px;
  padding: ${({ theme }) => theme.sizes.xxs};
  box-shadow: ${({ theme }) => theme.shadows.colored(theme.colors.black)};
  border: none;

  &:hover {
    opacity: ${({ theme }) => theme.opacities.default};
  }
`

export default function Modal({ children, isOpen, onClose }) {
  useEffect(() => {
    const onPressEscape = ({ code }) => code === 'Escape' && onClose()
    window.addEventListener('keydown', (e) => onPressEscape(e))
    window.removeEventListener('keydown', (e) => onPressEscape(e))
  }, [onClose])

  if (!isOpen) return null

  return (
    <Overlay>
      <ModalWrapper>
        <CloseButton onClick={onClose}>
          <Icon name="close" />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>
  )
}
