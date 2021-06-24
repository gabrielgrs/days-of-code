import { useState } from 'react'
import { Icon } from 'components'
import api from 'services/api'
import styled from 'styled-components'
import buildQueryString from 'utils/buildQueryString'

import Filters from './Filters'
import Results from './Results'

const Wrapper = styled.div``

const Content = styled.div``

const Title = styled.h1``

const InputWrapper = styled.div``

const SearchInput = styled.input``

const BaseButton = styled.button``

const FiltersButton = styled(BaseButton)``

const SearchButton = styled(BaseButton)``

const Main = styled.div``

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
    if (searching) return null

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
          <InputWrapper>
            <SearchInput
              placeholder="Type your search..."
              value={searchText}
              onKeyDown={({ code }) => code === 'Enter' && onSearch()}
              onChange={({ target }) => setSearchText(target.value)}
            />
            <FiltersButton onClick={() => setShowFilters((p) => !p)}>
              <Icon name="filters" height={28} />
            </FiltersButton>
            <SearchButton searching={searching} onClick={() => onSearch()}>
              <Icon name="search" height={28} />
            </SearchButton>
            {!!items.length && !showFilters && lastSearch && (
              <div>
                <strong>Result from:</strong> {lastSearch}
              </div>
            )}
          </InputWrapper>
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
