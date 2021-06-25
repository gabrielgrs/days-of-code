import { useState } from 'react'
import styled from 'styled-components'
import { Button, Column, Row } from 'components'
import { rgba } from 'polished'
import { format } from 'date-fns'
import { Icon } from 'components'
import { feedMock } from 'helpers'
import Layout from 'components/Layout'

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

  // specifics
  position: relative;
  margin-bottom: ${({ theme }) => theme.sizes.xs};
`

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  border-bottom: solid ${({ theme }) => theme.colors.silver} 1px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.md};
  padding: ${({ theme }) => theme.sizes.xs};

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.silver, 0.05)};
  }
`

const About = styled.div``

const Text = styled.div``

const Actions = styled.div``

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

function Card({ nickname, createdAt, text }) {
  return (
    <Item>
      <About>
        @{nickname} - {format(createdAt, 'dd/mm/yyyy')}
      </About>
      <Text>{text}</Text>
      <Actions>Action</Actions>
    </Item>
  )
}

export default function Feed() {
  const [text, setText] = useState('')

  const MAX_CHARACTERS = 30
  const invalidText = text.length > MAX_CHARACTERS

  return (
    <Layout>
      <Row>
        <Column size={12}>
          <div style={{ color: 'red' }}>This screen is a mock</div>
        </Column>
      </Row>
      <Row>
        <Column size={12}>
          <Textarea
            value={text}
            onChange={({ target }) => setText(target.value)}
            placeholder="Type some content..."
            rows={4}
          />
          <FieldActions>
            <FieldActionsSection>
              <Icon name="report" cursor="not-allowed" />
              <Icon name="report" cursor="not-allowed" />
            </FieldActionsSection>
            <FieldActionsSection>
              <CharactersCounter invalid={invalidText}>
                {text.length} / {MAX_CHARACTERS}
              </CharactersCounter>
              <Button disabled={invalidText || !text.length}>Send</Button>
            </FieldActionsSection>
          </FieldActions>
          {feedMock.map((item) => (
            <Card
              key={item._id}
              nickname={item.nickname}
              createdAt={item.createdAt}
              text={item.text}
            />
          ))}
        </Column>
      </Row>
    </Layout>
  )
}
