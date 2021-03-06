import { useContext } from 'react'
import styled from 'styled-components'
import { Modal, Tag, TagsContainer, Row, Column, Icon, Button } from 'components'
import { AuthContext } from 'contexts/AuthContext'
import { useRouter } from 'next/router'

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: ${({ theme }) => theme.sizes.sm};
  text-align: center;
`

const LogoutButton = styled(Button)`
  color: ${({ theme }) => theme.colors.danger};
  border: none;
  background: none;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    border: none;
    background: none;
  }
`

export default function Profile({ isOpen, onClose }) {
  const { user = {}, onLogout } = useContext(AuthContext)
  const { push } = useRouter()

  const onPressLogout = () => {
    onClose()
    onLogout()
    push('/')
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Row>
        <Column size={12}>
          <Flex>
            <Icon
              name="eye"
              height={28}
              cursor="pointer"
              onClick={() => {
                onClose()
                push(`/profile/${user.username}`)
              }}
            />
            <h2>{user.username}</h2>
            <Icon
              name="edit"
              height={28}
              cursor="pointer"
              onClick={() => {
                onClose()
                push(`/settings`)
              }}
            />
          </Flex>
        </Column>
        <Column size={12}>
          <Flex>{user.location}</Flex>
        </Column>
        <Column size={6}>
          <h3>Skills</h3>
        </Column>
        <Column size={6}></Column>

        <Column size={12}>
          <TagsContainer>
            {Object.keys(user.counts).map((tech) => (
              <Tag active key={tech}>
                {tech} ({user.counts[tech]})
              </Tag>
            ))}
          </TagsContainer>
        </Column>

        <Column size={12}>
          <LogoutButton onClick={onPressLogout} fullWidth color="danger">
            Logout
          </LogoutButton>
        </Column>
      </Row>
    </Modal>
  )
}
