import { Fragment } from 'react'

import Skeleton from 'react-loading-skeleton'

import * as S from './styles'

const Icon = () => <Skeleton style={{ height: '24px', width: '24px', borderRadius: '50px' }} />

export default function Home() {
  return (
    <Fragment>
      <S.Nav>
        <S.Section>
          <Icon />
        </S.Section>
        <S.Section>
          <Icon />
          <Icon />
        </S.Section>
      </S.Nav>
    </Fragment>
  )
}
