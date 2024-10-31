const createURL = (path: string) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const createNewEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      })
    )
    if (res.ok) {
      const data = await res.json()
      return data.data
    } else {
      console.error('Fetch request failed with status:', res.status)
      return { id: '', content: '' }
    }
  } catch (error) {
    console.error('An error occured:', error)
    return { id: '', content: '' }
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log(data.data)
    return data.data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
