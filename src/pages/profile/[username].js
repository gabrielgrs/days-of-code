import { useCallback, useEffect, useState } from 'react'
import { Column, Icon, Row, Avatar, TagsContainer, Tag } from 'components'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import api from 'services/api'

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  align-items: center;
  padding: ${({ padding }) => padding};
`

export default function Settings() {
  const [user, setUser] = useState(undefined)
  const { push, query } = useRouter()

  const onGetUser = useCallback(async (username) => {
    const { data } = await api.get(`/user/getByUsername?username=${username}`)
    setUser(data)
  }, [])

  useEffect(() => {
    if (query.username) onGetUser(query.username)
  }, [onGetUser, query.username])

  if (!user) return null

  return (
    <Layout>
      <Row>
        <Column size={12}>
          <Flex>
            <Icon name="leftArrow" height={40} cursor="pointer" onClick={() => push('/')} />
            <h1>Profile</h1>
            <div />
          </Flex>
        </Column>
        <Column size={12}>
          <Flex justifyContent="center">
            <Avatar />
          </Flex>
        </Column>
        <Column size={12}>
          <Flex justifyContent="center" padding="24px 0">
            <div>
              <span>{user.location}</span>
              <span>{user.name}</span>
              <span>@{user.username}</span>
            </div>
          </Flex>
        </Column>
        <Column size={12}>
          <Flex justifyContent="center">
            <h3>Skills</h3>
          </Flex>
          <TagsContainer>
            {Object.keys(user.counts).map((tech) => (
              <Tag active key={tech}>
                {tech} ({user.counts[tech]})
              </Tag>
            ))}
          </TagsContainer>
        </Column>
      </Row>
    </Layout>
  )
}
