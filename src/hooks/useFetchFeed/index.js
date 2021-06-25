import { useState, useEffect } from 'react'
import api from 'services/api'
import useSWR from 'swr'

export default function useFetchFeed({ limit, itemsPerPage }) {
  const [lastItemsCache, setLastItemsCache] = useState(undefined)
  const [totalRecords, setTotalRecords] = useState(itemsPerPage + 1)

  const { data = [], mutate } = useSWR(`/publication/getAll?limit=${limit}`, {
    initialData: lastItemsCache,
    fetcher: (resource, init) =>
      api.get(resource, init).then(({ data, headers }) => {
        setTotalRecords(+headers['x-total-records'])
        return data
      }),
  })

  useEffect(() => setLastItemsCache(data), [data])

  return {
    items: data,
    canLoadMore: data.length && totalRecords > data.length,
    mutate,
  }
}
