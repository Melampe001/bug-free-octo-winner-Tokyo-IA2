import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link href="/">TokyoIA</Link>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/games" className="hover:text-blue-400 transition-colors">
              Games
            </Link>
            <Link href="/leaderboard" className="hover:text-blue-400 transition-colors">
              Leaderboard
            </Link>
            <Link href="/profile" className="hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
