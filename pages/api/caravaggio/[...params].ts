import caravaggio from 'caravaggio'
import nextPlugin from 'caravaggio-plugin-nextjs'

const ONE_DAY = 60 * 60 * 24

export default caravaggio({
  errors: 'html',
  logger: {
    options: {
      level: 'error',
    },
  },
  basePath: '/api/caravaggio',
  browserCache: {
    maxAge: ONE_DAY,
  },
  plugins: {
    plugins: [{
      name: 'nextjs',
      instance: nextPlugin()
    }]
  }
})
