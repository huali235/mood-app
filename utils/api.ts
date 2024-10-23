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
      return null
    }
  } catch (error) {
    console.error('An error occured:', error)
    return null
  }
}
