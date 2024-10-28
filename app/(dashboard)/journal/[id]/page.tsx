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
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: 'false' },
  ]
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-6 p-6">
        <div className="flex-1">
          <Editor entry={entry} />
        </div>
        <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analysis</h2>
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
