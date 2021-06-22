import { technologies, levels, mock, languages } from 'helpers'
import { useState } from 'react'
import styled from 'styled-components'

import Results from './Results'

const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  text-align: center;
  width: 100%;
  max-width: 992px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Title = styled.h1``

const SearchInput = styled.input`
  width: 300px;
`

const FiltersButton = styled.button`
  width: 100px;
`

const SearchButton = styled.button`
  width: 100px;
`

const Filters = styled.div``

const Tags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Tag = styled.div`
  cursor: pointer;
  border: solid black 2px;
  padding: ${({ theme }) => `${theme.sizes.xxs} ${theme.sizes.xs}`};
  user-select: none;

  background: ${({ active }) => (active ? 'black' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
`

export default function Search() {
  const [items, setItems] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchText, setSearchText] = useState(undefined)
  const [selectedLevel, setSelectedLevel] = useState(undefined)
  const [selectedLanguage, setSelectedLanguage] = useState(undefined)
  const [selectedTechnologies, setSelectedTechnologies] = useState([])
  const [searching, setSearching] = useState(false)

  const onSelectLanguage = (language) => {
    if (!selectedTechnologies.includes(language))
      return setSelectedTechnologies((p) => [...p, language])
    return setSelectedTechnologies((p) => p.filter((x) => x !== language))
  }

  const onSearch = () => {
    setSearching(true)

    const hasLevel = !!selectedLevel
    const hasTechnology = !!selectedTechnologies.length

    if (!hasLevel && !hasTechnology) {
      return setTimeout(() => {
        setItems(mock)
        setSearching(false)
      }, 1000)
    }

    const filtred = mock.reduce((acc, curr) => {
      const t = (x) => String(x).toLowerCase()

      const hasText = t(curr.link).includes(t(searchText)) || t(curr.title).includes(t(searchText))
      const isSameLanguage = curr.language === selectedLanguage
      const isSameLevel = curr.level === selectedLevel
      const includedTechnologies = selectedTechnologies.some((x) => curr.languages.includes(x))

      if (isSameLevel || includedTechnologies || isSameLanguage || hasText) {
        acc.push(curr)
      }

      return acc
    }, [])

    setTimeout(() => {
      setItems(filtred)
      setSearching(false)
    }, 1000)
  }

  return (
    <Wrapper>
      <Content>
        <Title>Days Of Code</Title>
        <div>
          <FiltersButton onClick={() => setShowFilters((p) => !p)}>
            {showFilters ? 'Hide' : 'Show'} filters
          </FiltersButton>
          <SearchInput
            placeholder="Type your search..."
            value={searchText}
            onChange={({ target }) => setSearchText(target.value)}
          />
          <SearchButton disabled={searching} onClick={onSearch}>
            {!searching ? 'Search' : 'Searching...'}
          </SearchButton>
        </div>
        {showFilters && (
          <Filters>
            <div>languages</div>
            <Tags>
              {languages.map((lang) => (
                <Tag
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  active={selectedLanguage === lang}
                >
                  {lang}
                </Tag>
              ))}
            </Tags>
            <div>technologies</div>
            <Tags>
              {technologies.map((tech) => (
                <Tag
                  key={tech}
                  onClick={() => onSelectLanguage(tech)}
                  active={selectedTechnologies.includes(tech)}
                >
                  {tech}
                </Tag>
              ))}
            </Tags>
            <div>Level</div>
            <Tags>
              {levels.map((level) => (
                <Tag
                  key={level}
                  onClick={() => setSelectedLevel((p) => (p === level ? undefined : level))}
                  active={selectedLevel === level}
                >
                  {level}
                </Tag>
              ))}
            </Tags>
          </Filters>
        )}

        <Results list={items} />
      </Content>
    </Wrapper>
  )
}
