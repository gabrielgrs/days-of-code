import withMiddlewares from 'services/withMiddlewares'
import contentCollection from 'services/collections/content'
import { decodeToken } from 'services/token'

// import faker from 'faker'
// import { generateRandomNumber, languages, levels, technologies } from 'helpers'

// const generateMockData = (userId) => {
//   Array.from({ length: 500 }).map(() => {
//     const randomLevel = levels[generateRandomNumber(0, levels.length - 1)]
//     const randomLanguage = languages[generateRandomNumber(0, languages.length - 1)]
//     const randomTechnologies = technologies.filter(() => !!generateRandomNumber(0, 1))

//     const data = {
//       title: faker.lorem.words(5),
//       link: faker.internet.url(),
//       level: randomLevel,
//       technologies: randomTechnologies,
//       language: randomLanguage,
//       likes: [],
//       creator: userId,
//     }

//     contentCollection.create(data)
//   })
// }

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)

    // generateMockData(_id)

    const data = await contentCollection.create({ ...req.body, likes: [], creator: _id })
    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
