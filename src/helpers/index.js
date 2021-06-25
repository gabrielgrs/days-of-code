import faker from 'faker'

export const languageKeys = {
  portuguese: 'portuguese',
  english: 'english',
}

export const languages = Object.values(languageKeys)

export const levelKeys = {
  basic: 'basic',
  intermediary: 'intermediary',
  advanced: 'advanced',
}

export const levels = Object.values(levelKeys)

export const technologyKeys = {
  javaScript: 'javaScript',
  HTML: 'html',
  CSS: 'css',
}

export const technologies = Object.values(technologyKeys)

export const generateRandomNumber = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

export const mock = Array.from({ length: 10 }).map((_, index) => {
  const randomLevel = levels[generateRandomNumber(0, levels.length - 1)]
  const randomLanguage = languages[generateRandomNumber(0, languages.length - 1)]
  const randomTechnologies = technologies.filter(() => !!generateRandomNumber(0, 1))

  return {
    id: index,
    // link: `https://www.google.com/search?q=${faker.}`,
    title: faker.lorem.words(5),
    link: faker.internet.url(),
    level: randomLevel,
    technologies: randomTechnologies,
    language: randomLanguage,
  }
})
