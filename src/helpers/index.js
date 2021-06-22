import faker from 'faker'

export const levelKeys = {
  basic: 'basic',
  intermediary: 'intermediary',
  advanced: 'advanced',
}

export const levels = Object.values(levelKeys)

export const categoryKeys = {
  frontEnd: 'Front-End',
  backEnd: 'Back-End',
  devOps: 'Dev Ops',
}

export const categories = Object.values(categoryKeys)

export const languageKeys = {
  javaScript: 'javaScript',
  HTML: 'html',
  CSS: 'css',
}

export const languages = Object.values(languageKeys)

export const generateRandomNumber = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

export const mock = Array.from({ length: 10 }).map((_, index) => {
  const randomLevel = levels[generateRandomNumber(0, levels.length - 1)]
  const randomCategories = categories.filter(() => !!generateRandomNumber(0, 1))
  const randomLanguages = languages.filter(() => !!generateRandomNumber(0, 1))

  return {
    id: index,
    // link: `https://www.google.com/search?q=${faker.}`,
    title: faker.lorem.words(5),
    link: faker.internet.url(),
    level: randomLevel,
    categories: randomCategories,
    languages: randomLanguages,
  }
})
