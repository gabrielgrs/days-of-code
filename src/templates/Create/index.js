import { Row, Column, Button, Modal, TagsContainer, Tag, Textfield } from 'components'
import { languages, levels, technologies } from 'helpers'
import { useForm } from 'react-hook-form'
import api from 'services/api'

export default function Create({ isOpen, onClose }) {
  const { register, handleSubmit, watch, setValue, reset, formState } = useForm()

  const selectedLanguage = watch('language')
  const selectedLevel = watch('level')
  const selectedTechnologies = watch('technologies') || []

  const onSubmit = async (values) => {
    try {
      await api.post('/content/create', values)
      alert('Created with success')
      reset()
      onClose()
    } catch (error) {
      alert('Failed to create')
    }
  }

  const isValidLink = (link) => {
    const hasProtocol = link.includes('http://') || link.includes('https://')
    const hasDomains = link.split('.').length > 2
    const hasSubpath = link.replace('//', '').indexOf('/') !== -1
    const barIsLastCharacter = 1 - link.length === link.indexOf('/')

    return hasProtocol && hasDomains && hasSubpath && !barIsLastCharacter
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Column size={12}>
            <label>Title</label>
            <Textfield {...register('title', { required: true })} placeholder="some title" />
          </Column>
          <Column size={12}>
            <label>Link</label>
            <Textfield
              {...register('link', { required: true, validate: (v) => isValidLink(v) })}
              placeholder="https://sitefromtest.com/somecontent"
            />
          </Column>
          <Column size={12}>
            <label>languages</label>
            <TagsContainer>
              {languages.map((lang) => (
                <Tag
                  key={lang}
                  onClick={() => setValue('language', lang)}
                  active={selectedLanguage === lang}
                >
                  {lang}
                </Tag>
              ))}
            </TagsContainer>
          </Column>
          <Column size={12}>
            <label>Technologies</label>
            <TagsContainer>
              {technologies.map((tech) => (
                <Tag
                  key={tech}
                  onClick={() =>
                    setValue(
                      'technologies',
                      selectedTechnologies.includes(tech)
                        ? selectedTechnologies.filter((x) => x !== tech)
                        : [...selectedTechnologies, tech]
                    )
                  }
                  active={selectedTechnologies.includes(tech)}
                >
                  {tech}
                </Tag>
              ))}
            </TagsContainer>
          </Column>
          <Column size={12}>
            <label>Level</label>
            <TagsContainer>
              {levels.map((level) => (
                <Tag
                  key={level}
                  onClick={() => setValue('level', level)}
                  active={selectedLevel === level}
                >
                  {level}
                </Tag>
              ))}
            </TagsContainer>
          </Column>
        </Row>
        <div style={{ margin: '16px 0' }} />
        <Row>
          <Column size={6}>
            <Button fullWidth disabled={formState.isSubmitting} onClick={() => reset()}>
              Reset
            </Button>
          </Column>
          <Column size={6}>
            <Button fullWidth disabled={formState.isSubmitting} type="submit">
              Submit
            </Button>
          </Column>
        </Row>
      </form>
    </Modal>
  )
}
