import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to TokyoIA</h1>
        <p className="text-xl mb-8">AI-Powered Casino Platform</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>AI-Powered Game Recommendations</li>
              <li>Secure Payment Processing</li>
              <li>Real-time Gaming</li>
              <li>Leaderboards & Achievements</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <div className="space-y-4">
              <Link href="/games" className="block text-blue-600 hover:underline">
                Browse Games
              </Link>
              <Link href="/login" className="block text-blue-600 hover:underline">
                Login
              </Link>
              <Link href="/register" className="block text-blue-600 hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
