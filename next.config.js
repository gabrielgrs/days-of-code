module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE: process.env.DATABASE,
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}
