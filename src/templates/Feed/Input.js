import styled from 'styled-components'
import { Button, Textarea as CTextarea } from 'components'
import { Icon } from 'components'
import useAuth from 'hooks/useAuth'
import { useForm } from 'react-hook-form'

const Textarea = styled((props) => <CTextarea {...props} rows={4} />)`
  position: relative;
  margin-bottom: ${({ theme }) => theme.sizes.xs};
`

const FieldActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const FieldActionsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.sm};
  margin-bottom: ${({ theme }) => theme.sizes.sm};
`

const CharactersCounter = styled.div`
  color: ${({ theme, invalid }) => (invalid ? theme.colors.danger : theme.colors.black)};
`

const MAX_CHARACTERS = 50

export default function Feed({ onSubmit }) {
  const { register, handleSubmit, formState, watch, setValue } = useForm()
  const watchedText = watch('text') || ''
  const { isSubmitting, errors } = formState
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  const submitAndResetInput = (values) => {
    setValue('text', '')
    return onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(submitAndResetInput)}>
      <Textarea
        {...register('text', {
          required: true,
          validate: (value) => !!value && value.length < MAX_CHARACTERS,
        })}
        onKeyPress={({ code, shiftKey }) =>
          code === 'Enter' && !shiftKey && handleSubmit(onSubmit)()
        }
        placeholder="Type some content..."
      />
      <FieldActions>
        <FieldActionsSection>
          <Icon name="report" cursor="not-allowed" />
          <Icon name="report" cursor="not-allowed" />
        </FieldActionsSection>
        <FieldActionsSection>
          <CharactersCounter invalid={errors.text}>
            {watchedText.length} / {MAX_CHARACTERS}
          </CharactersCounter>
          <Button type="submit" disabled={isSubmitting || errors.text}>
            Send
          </Button>
        </FieldActionsSection>
      </FieldActions>
    </form>
  )
}
