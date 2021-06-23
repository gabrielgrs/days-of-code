import { useState } from 'react'
import { Button } from 'components'
import api from 'services/api'
import styled from 'styled-components'
import buildQueryString from 'utils/buildQueryString'

import Filters from './Filters'
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
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  border: solid ${({ theme }) => theme.colors.silver} 1px;

  &:focus {
    border: solid ${({ theme }) => theme.colors.black} 1px;
  }
`

const FiltersButton = styled(Button)`
  width: 100px;
`

const SearchButton = styled(Button)`
  width: 100px;
`

const Main = styled.div`
  position: relative;
`

const ITEMS_PER_PAGE = 10

export default function Search() {
  const [items, setItems] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [searchLimit, setSearchLimit] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchText, setSearchText] = useState(undefined)
  const [lastSearch, setLastSearch] = useState(undefined)
  const [selectedLevel, setSelectedLevel] = useState(undefined)
  const [selectedLanguage, setSelectedLanguage] = useState(undefined)
  const [selectedTechnologies, setSelectedTechnologies] = useState([])
  const [searching, setSearching] = useState(false)

  const onSelectTechnology = (language) => {
    if (!selectedTechnologies.includes(language))
      return setSelectedTechnologies((p) => [...p, language])
    return setSelectedTechnologies((p) => p.filter((x) => x !== language))
  }

  const onLike = (contentId) => api.put(`/content/like?${buildQueryString({ contentId })}`)

  const onLearn = (contentId) => api.put(`/content/learn?${buildQueryString({ contentId })}`)

  const onReport = (contentId) => alert(`Under construction - ${contentId}`)

  const onSetLastSearch = (rawQuery) => {
    const query = rawQuery.toString()
    if (!query) return setLastSearch(undefined)
    const formatted = query.replaceAll('=', ': ').replaceAll('&', ' & ').replaceAll('%2C', ', ')
    setLastSearch(formatted)
  }

  const onSearch = async (limit = ITEMS_PER_PAGE) => {
    setShowFilters(false)
    setSearching(true)

    const queryString = buildQueryString({
      title: searchText,
      // link: searchText,
      level: selectedLevel,
      technologies: selectedTechnologies,
      language: selectedLanguage,
      limit,
    })

    debugger

    onSetLastSearch(queryString)
    const { data, headers } = await api.get(`/content/getAll?${queryString}`)

    setItems(data)
    setTotalRecords(+headers['x-total-records'])

    setSearching(false)
  }

  const onShowMore = () => {
    setSearchLimit((p) => p + ITEMS_PER_PAGE)
    onSearch(searchLimit + ITEMS_PER_PAGE)
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
          <SearchButton disabled={searching} onClick={() => onSearch()}>
            {!searching ? 'Search' : 'Searching...'}
          </SearchButton>
          {!!items.length && !showFilters && lastSearch && (
            <div>
              <strong>Result from:</strong> {lastSearch}
            </div>
          )}
          <Filters
            isOpen={showFilters}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onSelectTechnology={onSelectTechnology}
            selectedTechnologies={selectedTechnologies}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </Main>

        <Results
          list={items}
          onLike={onLike}
          onLearn={onLearn}
          onReport={onReport}
          totalRecords={totalRecords}
          onShowMore={onShowMore}
        />
      </Content>
    </Wrapper>
  )
}
