import { prisma } from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const { userId } = auth()

  if (!userId) {
    console.error('User is not authenticated or user ID is missing')
    return
  }

  let match
  try {
    match = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    })
  } catch (error) {
    // If user is not found, create a new user
    const user = await currentUser()
    if (!user) {
      console.error('User is not authenticated')
      return
    }

    match = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/sign-in')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
