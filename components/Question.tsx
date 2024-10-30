'use client'

import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')

  const handleValueChange = (e) => {
    setValue(e.target.value)
    // do some things here
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          onChange={handleValueChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
