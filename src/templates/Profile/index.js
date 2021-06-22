import { categories, generateRandomNumber, languages, levels } from 'helpers'
import { useState } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 16px 32px;
`

const Tags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.div`
  border: solid black 2px;
  padding: 4px 8px;
  user-select: none;

  background: ${({ percentage }) => {
    const rest = 100 - percentage
    return `linear-gradient(90deg, #ffc0cb ${rest}%, white ${percentage}%)`
  }};
`

const Tabs = styled.div`
  margin: 8px 0 24px;
  display: flex;
  gap: 10px;
`

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  font-weight: ${({ active }) => active && '600'};
  padding: 0 4px;

  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 3px;
    background: ${({ active }) => active && 'red'};
    bottom: -4px;
    left: 0;
  }
`

export default function Profile({ isOpen, onClose }) {
  const tabs = {
    language: 'language',
    level: 'level',
    category: 'category',
  }

  const [currentTab, setCurrentTab] = useState(tabs.language)

  if (!isOpen) return null

  return (
    <Overlay>
      <Modal>
        <button onClick={onClose}>Close</button>
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
          {currentTab === tabs.category &&
            categories.map((l) => (
              <Tag key={l} percentage={Math.trunc(generateRandomNumber(1, 100))}>
                {l}
              </Tag>
            ))}
        </Tags>
      </Modal>
    </Overlay>
  )
}
