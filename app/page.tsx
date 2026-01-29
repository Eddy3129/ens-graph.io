'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isValidENS } from '@/lib/ens'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// TypeWriter effect component
function TypeWriter({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, delay])

  return <span>{displayedText}</span>
}

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

  const exampleNames = [
    { name: 'vitalik.eth', avatar: 'https://euc.li/vitalik.eth' },
    { name: 'balajis.eth', avatar: null },
    { name: 'brantly.eth', avatar: 'https://euc.li/brantly.eth' },
  ]

  const handleExampleClick = (name: string) => {
    router.push(`/profile/${name}`)
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            <TypeWriter text="ens_graph.io" delay={80} />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Built by Eddy</p>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Explore ENS Profiles
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            View on-chain ENS data, transaction history, and discover your network
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 w-full max-w-md mb-8">
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                ENS Name
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={ensName}
                  onChange={(e) => setEnsName(e.target.value)}
                  placeholder="vitalik.eth"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  autoFocus
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
            </label>

            {error && (
              <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors duration-200 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Examples */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
              Try these:
            </p>
            <div className="flex flex-row gap-2">
              {exampleNames.map(({ name, avatar }) => (
                <button
                  key={name}
                  onClick={() => handleExampleClick(name)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer group"
                >
                  {avatar ? (
                    <div className="relative w-5 h-5 flex-shrink-0 rounded-full overflow-hidden border border-gray-300 dark:border-slate-600 bg-gradient-to-br from-blue-400 to-purple-500">
                      <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-5 h-5 flex-shrink-0 rounded-full border border-gray-300 dark:border-slate-600 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{name[0]}</span>
                    </div>
                  )}
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Coming Soon
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/graph"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors duration-200"
            >
              Social Graph
            </Link>
            <div className="px-4 py-2 bg-gray-200 dark:bg-slate-800 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">
              Edit Connections
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
