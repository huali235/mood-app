import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Sidebar</div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <a href="/journal" className="block p-2 hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                Settings
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-100 p-4 shadow flex justify-center">
          <div className="container mx-auto">
            <h1 className="text-xl font-semibold">Navbar</h1>
          </div>
          <div className="flex justify-end">
            <UserButton />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
