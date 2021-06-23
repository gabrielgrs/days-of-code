import { Tag, TagsContainer } from 'components'
import { technologies, levels, languages } from 'helpers'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2;
  border: solid ${({ theme }) => theme.colors.silver} 1px;
  background: ${({ theme }) => theme.colors.white};

  animation: wrapperAppears 500ms ease-in-out;

  ${({ theme }) => theme.animations.appears('wrapperAppears')};
`

export default function Filters({
  isOpen,
  selectedLanguage,
  setSelectedLanguage,
  onSelectTechnology,
  selectedTechnologies,
  selectedLevel,
  setSelectedLevel,
}) {
  if (!isOpen) return null

  return (
    <Wrapper>
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
    </Wrapper>
  )
}
