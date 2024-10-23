'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateEntry(entry.id, content)
    } catch (error) {
      console.error('Failed to save content', error)
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Journal Entry</h1>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
      />
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default Editor
