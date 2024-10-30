import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

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
  return (
    <div>
      <h2 className="text-3xl mb-5">Journal</h2>
      <div>
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
