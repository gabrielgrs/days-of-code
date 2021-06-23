import { Modal } from 'components'
import { technologies, generateRandomNumber, languages, levels } from 'helpers'
import { useState } from 'react'
import styled from 'styled-components'

const Tags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Tag = styled.div`
  border: solid black 2px;
  padding: ${({ theme }) => `${theme.sizes.xxs} ${theme.sizes.xs}`};
  user-select: none;

  background: ${({ theme, percentage }) => {
    const rest = 100 - percentage
    return `linear-gradient(to right, ${theme.colors.secondary} ${rest}%, white 100%)`
  }};
`

const Tabs = styled.div`
  margin: ${({ theme }) => `${theme.sizes.xs} 0 ${theme.sizes.md}`};
  display: flex;
  gap: ${({ theme }) => theme.sizes.xs};
`

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  font-weight: ${({ active }) => active && '600'};
  padding: 0 ${({ theme }) => theme.sizes.xxs};

  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 3px;
    background: ${({ theme, active }) => active && theme.colors.secondary};
    bottom: -4px;
    left: 0;
  }
`

export default function Profile({ isOpen, onClose }) {
  const tabs = {
    technology: 'technology',
    level: 'level',
  }

  const [currentTab, setCurrentTab] = useState(tabs.technology)

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1>Profile</h1>
      <h3>My Skills</h3>
      <Tabs>
        {Object.values(tabs).map((t) => (
          <Tab onClick={() => setCurrentTab(t)} active={t === currentTab} key={t}>
            {t}
          </Tab>
        ))}
      </Tabs>
      <Tags>
        {currentTab === tabs.language &&
          languages.map((l) => (
            <Tag key={l} percentage={Math.trunc(generateRandomNumber(1, 100))}>
              {l}
            </Tag>
          ))}
      </Tags>
      <Tags>
        {currentTab === tabs.level &&
          levels.map((l) => (
            <Tag key={l} percentage={Math.trunc(generateRandomNumber(1, 100))}>
              {l}
            </Tag>
          ))}
      </Tags>
      <Tags>
        {currentTab === tabs.technology &&
          technologies.map((l) => (
            <Tag key={l} percentage={Math.trunc(generateRandomNumber(1, 100))}>
              {l}
            </Tag>
          ))}
      </Tags>
    </Modal>
  )
}
