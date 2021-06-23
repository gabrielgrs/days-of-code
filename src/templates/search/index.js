import { technologies, levels, languages } from 'helpers'
import { useState } from 'react'
import api from 'services/api'
import styled from 'styled-components'
import buildQueryString from 'utils/buildQueryString'

import Results from './Results'

const Wrapper = styled.div`
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

const Main = styled.div`
  position: relative;
`

const Filters = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2;
  border: solid ${({ theme }) => theme.colors.silver} 1px;
  background: ${({ theme }) => theme.colors.white};
`

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

  const onLike = (contentId) => api.put(`/content/like?${buildQueryString({ contentId })}`)

  const onLearn = (contentId) => api.put(`/content/learn?${buildQueryString({ contentId })}`)

  const onReport = (contentId) => alert(`Under construction - ${contentId}`)

  const onSearch = async () => {
    setShowFilters(false)
    setSearching(true)

    const queryString = buildQueryString({
      title: searchText,
      // link: searchText,
      level: selectedLevel,
      technologies: selectedTechnologies,
      language: selectedLanguage,
    })
    const { data } = await api.get(`/content/getAll?${queryString}`)

    setItems(data)

    setSearching(false)
  }

  return (
    <Wrapper>
      <Content>
        <Title>Days Of Code</Title>
        <Main>
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
          {!!items.length &&
            !showFilters &&
            (setSelectedLanguage || selectedLevel || !!selectedTechnologies.length) && (
              <div>
                <strong>Result from:</strong> {selectedLanguage}, {selectedLevel}{' '}
                {selectedTechnologies.join(', ')}
              </div>
            )}
          {showFilters && (
            <Filters>
              <div>languages</div>
              <Tags>
                {languages.map((lang) => (
                  <Tag
                    key={lang}
                    onClick={() => setSelectedLanguage((p) => (p === lang ? undefined : lang))}
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
        </Main>

        <Results list={items} onLike={onLike} onLearn={onLearn} onReport={onReport} />
      </Content>
    </Wrapper>
  )
}
