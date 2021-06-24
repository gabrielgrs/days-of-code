import Icon from 'components/Icon'
import { useEffect } from 'react'
import styled from 'styled-components'

const Overlay = styled.div``

const ModalWrapper = styled.div``

const CloseButton = styled.button``

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
