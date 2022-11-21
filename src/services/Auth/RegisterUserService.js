import { User } from '../../models/User.js'
import { hashPassword } from '../../utils/hashPassword.js'
import { documentAlreadyExist } from '../../utils/documentAlreadyExist.js'

export const registerUser = async (userData) => {
  const { password, email } = userData
  //check if user already exists
  await documentAlreadyExist(User, { email })
  // hash password
  const hashedPassword = await hashPassword(password)
  userData.password = hashedPassword
  // store user
  let user = await User.create(userData)
  
  delete user._doc.password

  return { 
    user : 
      {
        ...user._doc,
        _id: user.id,
        createdAt: new Date(user.createdAt).toISOString(),
      }
  }
}
