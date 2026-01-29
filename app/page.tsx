'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidENS } from '@/lib/ens'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [ensName, setEnsName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = ensName.trim()

    if (!trimmed) {
      setError('Please enter an ENS name')
      return
    }

    if (!isValidENS(trimmed)) {
      setError('Invalid ENS name. Must end with .eth')
      return
    }

    router.push(`/profile/${trimmed}`)
  }

  const exampleNames = ['vitalik.eth', 'nick.eth', 'brantly.eth']

  const handleExampleClick = (name: string) => {
    router.push(`/profile/${name}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
            <span className="text-2xl">🌐</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            ENS Social Network
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Explore ENS profiles and visualize social connections on Ethereum. View all on-chain data and discover your network.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 block">
                Search ENS Name
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={ensName}
                  onChange={(e) => setEnsName(e.target.value)}
                  placeholder="vitalik.eth"
                  className="w-full px-4 py-4 pr-12 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  autoFocus
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
            </label>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 cursor-pointer"
            >
              View Profile
            </button>
          </form>

          {/* Quick Examples */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Try an Example:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleNames.map((name) => (
                <button
                  key={name}
                  onClick={() => handleExampleClick(name)}
                  className="px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
            Coming Soon
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/graph"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg duration-200 cursor-pointer"
            >
              🕸️ Social Network Graph
            </Link>
            <div className="px-6 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300">
              ✏️ Edit Connections
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
