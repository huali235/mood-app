'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()
  const handleNewEntry = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">New Entry</h2>
      <p className="text-gray-600 mb-4">Create a new journal entry.</p>
      <button
        onClick={handleNewEntry}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Add Entry
      </button>
    </div>
  )
}

export default NewEntryCard
