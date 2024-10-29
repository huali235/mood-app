import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const { summary, subject, mood, negative, color } = entry?.analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-6 p-6">
        <div className="flex-1">
          <Editor entry={entry} />
        </div>
        <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ backgroundColor: color }}
          >
            Analysis
          </h2>
          <div>
            <ul>
              {analysisData.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-2 border-b-2"
                >
                  <span className="font-semibold text-gray-700">
                    {item.name}:
                  </span>
                  <span className="text-gray-500">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default EntryPage
