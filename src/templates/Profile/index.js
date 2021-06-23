import { Modal, Tag, TagsContainer } from 'components'
import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'

export default function Profile({ isOpen, onClose }) {
  const { user = {} } = useContext(AuthContext)

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1>Profile from {user.email}</h1>
      <h3>My Skills</h3>

      <TagsContainer>
        {Object.keys(user.counts).map((tech) => (
          <Tag active key={tech}>
            {tech} ({user.counts[tech]})
          </Tag>
        ))}
      </TagsContainer>
    </Modal>
  )
}
