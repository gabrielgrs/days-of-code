import { useEffect, useState } from 'react'
import { Button, Column, Icon, Row, Textfield, Textarea } from 'components'
import Layout from 'components/Layout'
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import api from 'services/api'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShowPassword = styled.button`
  background: none;
  border: none;
`

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const { push } = useRouter()
  const { user } = useAuth()

  const { handleSubmit, register, reset, formState, watch } = useForm()
  const password = watch('password')
  const { isSubmitting, errors } = formState

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [reset, user])

  const onSubmit = async (values) => {
    const { data } = await api.put('/user/update', values)
    if (data) return reset(values)
  }

  return (
    <Layout>
      <form onClick={handleSubmit(onSubmit)}>
        <Row>
          <Column size={12}>
            <Flex>
              <Icon name="leftArrow" height={40} cursor="pointer" onClick={() => push('/')} />
              <h1>Settings</h1>
              <div />
            </Flex>
          </Column>
          <Column size={6}>
            <Textfield {...register('name')} placeholder="Type your name" error={errors.name} />
          </Column>
          <Column size={6}>
            <Textfield
              {...register('location')}
              placeholder="Type your location"
              error={errors.name}
            />
          </Column>
          <Column size={6}>
            <Flex>
              @
              <Textfield
                {...register('username', { required: true })}
                placeholder="Type your username"
                error={errors.username}
              />
            </Flex>
          </Column>
          <Column size={6}>
            <Textfield
              {...register('email', { required: true })}
              placeholder="Type your email"
              error={errors.email}
            />
          </Column>
          <Column size={12}>
            <Textarea
              rows={4}
              {...register('biography')}
              placeholder="Type your biography"
              error={errors.biography}
            />
          </Column>
          <Column size={6}>
            <Flex>
              <Textfield
                {...register('currentPassword', { required: !!password })}
                placeholder="Type to change your password"
                type={!showCurrentPassword && 'password'}
                error={errors.currentPassword}
              />
              <ShowPassword onClick={() => setShowCurrentPassword((p) => !p)}>
                {showCurrentPassword ? 'Hide' : 'Show'} password
              </ShowPassword>
            </Flex>
          </Column>
          <Column size={6}>
            <Flex>
              <Textfield
                {...register('password')}
                placeholder="Type to change your password"
                type={!showPassword && 'password'}
                error={errors.password}
              />
              <ShowPassword onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? 'Hide' : 'Show'} password
              </ShowPassword>
            </Flex>
          </Column>
        </Row>
        <Row>
          <Column size={9} />
          <Column size={3}>
            <Button fullWidth type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Column>
        </Row>
      </form>
    </Layout>
  )
}
