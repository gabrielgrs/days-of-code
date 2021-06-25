import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import api from 'services/api'
import { Row, Column, Button, Modal, Textfield } from 'components'
import useAuth from 'hooks/useAuth'

const Tabs = styled.div`
  margin: ${({ theme }) => `${theme.sizes.xs} 0 ${theme.sizes.md}`};
  display: flex;
  gap: ${({ theme }) => theme.sizes.xs};
  font-size: 1.5rem;
`

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  font-weight: ${({ active }) => active && '600'};
  padding: 0 ${({ theme }) => theme.sizes.xxs};

  border-bottom: solid
    ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.white)} 4px;
`

const PasswordDisplay = styled.button`
  background: none;
  border: none;
`

export default function Auth({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { onAuthenticate } = useAuth()

  const { register, handleSubmit, formState, reset } = useForm()

  useEffect(() => {
    reset()
  }, [reset, isRegister])

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post(`/auth/${isRegister ? 'register' : 'login'}`, values)
      onAuthenticate(data.token, data.user)
      onClose()
    } catch (error) {
      alert('Failed to request')
    }
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <Tab onClick={() => setIsRegister(false)} active={!isRegister}>
            Login
          </Tab>
          <Tab onClick={() => setIsRegister(true)} active={isRegister}>
            Register
          </Tab>
        </Tabs>
        <Row>
          {isRegister && (
            <Column size={12}>
              <Textfield
                {...register('username', { required: true })}
                placeholder="Type your username"
              />
            </Column>
          )}
          <Column size={12}>
            <Textfield {...register('email', { required: true })} placeholder="Type your email" />
          </Column>
          <Column size={12}>
            <Textfield
              {...register('password', { required: true })}
              type={!showPassword && 'password'}
              placeholder="Type your password"
            />
          </Column>
          <Column size={12}>
            <PasswordDisplay type="button" onClick={() => setShowPassword((p) => !p)}>
              {showPassword ? 'hide' : 'show'}
            </PasswordDisplay>
          </Column>
        </Row>
        <Row>
          <Column size={12}>
            <Button fullWidth type="submit" disabled={formState.isSubmitting}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Column>
        </Row>
      </form>
    </Modal>
  )
}
