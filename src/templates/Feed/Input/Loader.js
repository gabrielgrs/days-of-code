import useTheme from 'hooks/useTheme'
import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function FeedInputLoader() {
  const { theme } = useTheme()

  return (
    <Fragment>
      <Skeleton height={theme.sizes.custom(11)} />
      <Skeleton height={theme.sizes.xxl} style={{ marginTop: theme.sizes.xxs }} />
    </Fragment>
  )
}
