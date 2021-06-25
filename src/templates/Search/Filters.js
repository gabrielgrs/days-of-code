import { Modal, Tag, TagsContainer } from 'components'
import { technologies, levels, languages } from 'helpers'
import styled from 'styled-components'

export default function Filters({
  isOpen,
  onClose,
  selectedLanguage,
  setSelectedLanguage,
  onSelectTechnology,
  selectedTechnologies,
  selectedLevel,
  setSelectedLevel,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>languages</div>
      <TagsContainer>
        {languages.map((lang) => (
          <Tag
            key={lang}
            onClick={() => setSelectedLanguage((p) => (p === lang ? undefined : lang))}
            active={selectedLanguage === lang}
          >
            {lang}
          </Tag>
        ))}
      </TagsContainer>
      <div>technologies</div>
      <TagsContainer>
        {technologies.map((tech) => (
          <Tag
            key={tech}
            onClick={() => onSelectTechnology(tech)}
            active={selectedTechnologies.includes(tech)}
          >
            {tech}
          </Tag>
        ))}
      </TagsContainer>
      <div>Level</div>
      <TagsContainer>
        {levels.map((level) => (
          <Tag
            key={level}
            onClick={() => setSelectedLevel((p) => (p === level ? undefined : level))}
            active={selectedLevel === level}
          >
            {level}
          </Tag>
        ))}
      </TagsContainer>
    </Modal>
  )
}
