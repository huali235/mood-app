'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleValueChange = (e) => {
    setValue(e.target.value)
    // do some things here
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const answer = await askQuestion(value)
      setResponse(answer)
      console.log(answer)
    } catch (error) {
      console.error('Failed to get answer', error)
    } finally {
      setLoading(false)
      setValue('')
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          disabled={loading}
          onChange={handleValueChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          {loading ? <LoadingSpinner /> : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

export default Question
