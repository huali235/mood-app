const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-500 text-sm mb-4">{date}</p>
      <p className="text-gray-600">Some description or content here...</p>
    </div>
  )
}

export default EntryCard
