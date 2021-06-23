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
`

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => `${theme.sizes.sm} ${theme.sizes.lg}`};
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
        <button onClick={onClose}>Close</button>
        {children}
      </ModalWrapper>
    </Overlay>
  )
}
