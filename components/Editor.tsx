'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis || {})
  const {
    summary = '',
    subject = '',
    mood = '',
    negative = false,
    color = '',
  } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const data = await updateEntry(entry.id, content)
      setAnalysis(data.analysis)
      console.log(analysis)
    } catch (error) {
      console.error('Failed to save content', error)
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 p-6">
      <div className="flex-1 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
  )
}

export default Editor
