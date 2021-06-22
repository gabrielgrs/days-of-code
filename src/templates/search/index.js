import { categories, languages, levels, mock } from 'helpers'
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
  gap: 8px;
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
  gap: 8px;
`

const Tag = styled.div`
  cursor: pointer;
  border: solid black 2px;
  padding: 4px 8px;
  user-select: none;

  background: ${({ active }) => (active ? 'black' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
`

export default function Home() {
  const [items, setItems] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(undefined)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [searching, setSearching] = useState(false)

  const onSelectCategory = (category) => {
    if (!selectedCategories.includes(category))
      return setSelectedCategories((p) => [...p, category])
    return setSelectedCategories((p) => p.filter((x) => x !== category))
  }

  const onSelectLanguage = (language) => {
    if (!selectedLanguages.includes(language)) return setSelectedLanguages((p) => [...p, language])
    return setSelectedLanguages((p) => p.filter((x) => x !== language))
  }

  const onSearch = () => {
    setSearching(true)

    const hasLevel = !!selectedLevel
    const hasCategories = !!selectedCategories.length
    if (!hasLevel && !hasCategories) {
      return setTimeout(() => {
        setItems(mock)
        setSearching(false)
      }, 1000)
    }

    const filtred = mock.reduce((acc, curr) => {
      const isSameLevel = curr.level === selectedLevel
      const includesCategories = selectedCategories.some((x) => curr.categories.includes(x))
      const includesLanguages = selectedLanguages.some((x) => curr.languages.includes(x))

      if (isSameLevel || includesCategories || includesLanguages) {
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
          <SearchInput placeholder="Type your search..." />
          <SearchButton disabled={searching} onClick={onSearch}>
            {!searching ? 'Search' : 'Searching...'}
          </SearchButton>
        </div>
        {showFilters && (
          <Filters>
            <div>Languages</div>
            <Tags>
              {languages.map((language) => (
                <Tag
                  key={language}
                  onClick={() => onSelectLanguage(language)}
                  active={selectedLanguages.includes(language)}
                >
                  {language}
                </Tag>
              ))}
            </Tags>
            <div>Level</div>
            <Tags>
              {levels.map((l) => (
                <Tag
                  key={l}
                  onClick={() => setSelectedLevel((p) => (p === l ? undefined : l))}
                  active={selectedLevel === l}
                >
                  {l}
                </Tag>
              ))}
            </Tags>
            <div>Category</div>
            <Tags>
              {categories.map((c) => (
                <Tag
                  key={c}
                  onClick={() => onSelectCategory(c)}
                  active={selectedCategories.includes(c)}
                >
                  {c}
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
