import { useState } from 'react'
import { Logo } from 'components'
import api from 'services/api'
import styled from 'styled-components'
import buildQueryString from 'utils/buildQueryString'
import Layout from 'components/Layout'

import Filters from './Filters'
import Results from './Results'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.xxs};
  width: 100%;

  @media screen and (max-width: 992px) {
    flex-wrap: wrap;
  }
`

const SearchInput = styled.input`
  font-size: 1.1rem;
  width: 100%;
  background: none;
  border: none;
  border-bottom: solid ${({ theme }) => theme.colors.silver} 2px;

  &:focus {
    outline: none;
    border: none;
    border-bottom: solid ${({ theme }) => theme.colors.black} 2px;
  }
`

const BaseButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  font-size: 1.1rem;
  width: 120px;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.sizes.xs};

  &:hover {
    gap: ${({ theme }) => theme.sizes.sm};
  }
`

const FiltersButton = styled(BaseButton)`
  &:before {
    content: '{ ';
  }

  &:after {
    content: ' }';
  }
`

const SearchButton = styled(BaseButton)`
  cursor: ${({ searching }) => (searching ? 'not-allowed' : 'pointer')};
  color: ${({ theme }) => theme.colors.primary};

  opacity: ${({ theme, searching }) => searching && theme.opacity.default};

  &:before {
    content: '[ ';
  }

  &:after {
    content: ' ]';
  }
`

const Main = styled.div``

const ResultFrom = styled.div`
  padding: ${({ theme }) => theme.sizes.sm} 0;
  text-align: center;
`

export default function Search() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
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

  const onSearch = async (page = 1) => {
    if (searching) return null

    setShowFilters(false)
    setSearching(true)

    const queryString = buildQueryString({
      title: searchText,
      // link: searchText,
      level: selectedLevel,
      technologies: selectedTechnologies,
      language: selectedLanguage,
      page,
    })

    onSetLastSearch(queryString)
    const { data, headers } = await api.get(`/content/getAll?${queryString}`)

    setItems(data)
    setTotalRecords(+headers['x-total-records'])

    setSearching(false)
  }

  const onChangePage = (currentPage) => {
    setPage(currentPage)
  }

  const onPressToSearch = () => {
    setPage(1)
    onSearch(1)
  }

  return (
    <Layout alignItems={items.length ? 'flex-start' : 'center'} height={!items.length && '100vh'}>
      <Wrapper>
        <Logo />
        <Main>
          <InputWrapper>
            <SearchInput
              placeholder="Type your search..."
              value={searchText}
              onKeyDown={({ code }) => code === 'Enter' && onPressToSearch()}
              onChange={({ target }) => setSearchText(target.value)}
            />
            <FiltersButton onClick={() => setShowFilters((p) => !p)}>Filters</FiltersButton>
            <SearchButton searching={searching} onClick={() => onPressToSearch()}>
              Search
            </SearchButton>
          </InputWrapper>
          {!!items.length && !showFilters && lastSearch && (
            <ResultFrom>
              <strong>Result from:</strong> {lastSearch}
            </ResultFrom>
          )}
          <Filters
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
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
          currentPage={page}
          onChangePage={(page) => onChangePage(page)}
        />
      </Wrapper>
    </Layout>
  )
}
