import { User } from '../../models/User.js'
import { compareHash } from '../../utils/hashPassword.js'
import { signToken } from '../../utils/signToken.js'

export const logInUser = async (credentials) => {
  const { email, password } = credentials
  let user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }
  await compareHash(user?.password, password)
  const token = signToken(user.doc.toJSON())
  console.log(user.toJSON(), user.doc.toJSON())
  user = await User.findByIdAndUpdate(
    user?._id,
    {
      token,
      last_login: new Date().toISOString(),
    },
    { new: true }
  )
    .select('_id name email createdAt token last_login')

  return { user, token }
}

export const logOutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { isLoggedIn: false, token: '' })
}

