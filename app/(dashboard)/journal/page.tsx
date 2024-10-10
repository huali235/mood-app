import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getJournalEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getJournalEntries()
  console.log('entries', entries)
  return <div>Journal Page</div>
}

export default JournalPage
