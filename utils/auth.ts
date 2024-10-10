import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'

export const getUserByClerkID = async () => {
  const { userId } = await auth()

  if (!userId) {
    console.error('User is not authenticated or user ID is missing')
    return null
  }

  let user
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    })
  } catch (error) {
    // If user is not found, create a new user
    const currentUserData = await currentUser()
    if (!currentUserData) {
      console.error('User is not authenticated')
      return null
    }

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: currentUserData.emailAddresses[0].emailAddress,
      },
    })
  }

  return user
}
