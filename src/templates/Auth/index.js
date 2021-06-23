import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { AuthContext } from 'contexts/AuthContext'
import api from 'services/api'
import { Modal } from 'components'

const Tabs = styled.div`
  margin: ${({ theme }) => `${theme.sizes.xs} 0 ${theme.sizes.md}`};
  display: flex;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  font-weight: ${({ active }) => active && '600'};
  padding: 0 ${({ theme }) => theme.sizes.xxs};

  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 3px;
    background: ${({ theme, active }) => active && theme.colors.secondary};
    bottom: -4px;
    left: 0;
  }
`

const PasswordDisplay = styled.button`
  background: none;
  border: none;
`

export default function Auth({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { onAuthenticate } = useContext(AuthContext)

  const { register, handleSubmit, formState } = useForm()

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
        <div>
          <input {...register('email', { required: true })} placeholder="Type your email" />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            type={!showPassword && 'password'}
            placeholder="Type your password"
          />
          <PasswordDisplay type="button" onClick={() => setShowPassword((p) => !p)}>
            {showPassword ? 'hide' : 'show'}
          </PasswordDisplay>
        </div>
        <button type="submit" disabled={formState.isSubmitting}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </Modal>
  )
}