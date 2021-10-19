import { getUser } from '@/models/auth/user'
import type { NextApiHandler } from 'next'

const protect = (handler: NextApiHandler): NextApiHandler => async (req, res) => {
  const session = await getUser({ req })
  if (!session) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }

  return handler(req, res)
}

export default protect
