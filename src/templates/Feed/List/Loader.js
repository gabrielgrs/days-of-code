import Skeleton from 'react-loading-skeleton'

export default function FeedListLoader() {
  return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} height={120} />)
}
