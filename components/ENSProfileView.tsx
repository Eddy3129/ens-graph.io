'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, History, Twitter, Github, ArrowLeft } from 'lucide-react'
import { formatAddress } from '@/lib/ens'
import type { ENSProfile } from '@/types/ens'

interface ENSProfileViewProps {
  profile: ENSProfile
}

export default function ENSProfileView({ profile }: ENSProfileViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{profile.name}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Header - Compact */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4 mb-4">
          <div className="flex items-start gap-4">
            {/* Avatar + ETH Balance */}
            <div className="flex-shrink-0">
              {profile.avatar && profile.avatar.startsWith('http') ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border border-gray-200 dark:border-slate-700">
                  <span className="text-xl font-bold text-white">
                    {profile.name[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Name, Address, ETH */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {profile.name}
                </h2>
                {profile.ethBalance && (
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Balance: {parseFloat(profile.ethBalance).toFixed(2)} ETH
                  </span>
                )}
              </div>

              {profile.address && (
                <a
                  href={`https://etherscan.io/address/${profile.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
                >
                  {formatAddress(profile.address)}
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              )}

              {profile.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold">Bio:</span> {profile.description}
                </p>
              )}

              {profile.location && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-semibold">Location:</span> {profile.location}
                </p>
              )}
            </div>

            {/* Social Links - Vertical */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              {profile.twitter && (
                <a
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4 text-blue-500" />
                </a>
              )}
              {profile.github && (
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Transactions - Table Format */}
        {profile.transactions.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <History className="w-4 h-4" />
              Recent 50 Transactions
            </h3>

            {/* Table Header */}
            <div className="grid grid-cols-10 gap-2 px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-slate-800 mb-1">
              <div className="col-span-2">Tx Hash</div>
              <div className="col-span-2">From</div>
              <div className="col-span-2">To</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2 text-right">Date</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-0.5 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {profile.transactions.slice(0, 20).map((tx) => (
                <a
                  key={tx.hash}
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-10 gap-2 px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer group"
                >
                  {/* Tx Hash */}
                  <div
                    className="col-span-2 font-mono text-blue-600 dark:text-blue-400 group-hover:underline truncate"
                    title={tx.hash}
                  >
                    {tx.hash.slice(0, 6)}...{tx.hash.slice(-6)}
                  </div>

                  {/* From Address */}
                  <div
                    className="col-span-2 font-mono text-gray-700 dark:text-gray-300 truncate"
                    title={tx.from}
                  >
                    {tx.fromEns || `${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
                  </div>

                  {/* To Address */}
                  <div
                    className="col-span-2 font-mono text-gray-700 dark:text-gray-300 truncate"
                    title={tx.to || ''}
                  >
                    {tx.toEns || (tx.to ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : '—')}
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 font-mono font-semibold">
                    <span
                      className={
                        tx.isReceived
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    >
                      {tx.isReceived ? '↓' : '↑'}{' '}
                      {Math.abs(parseFloat(tx.valueFormatted)).toFixed(4)} ETH
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right text-xs whitespace-nowrap">
                    {new Date(tx.timestamp * 1000).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Resolver Address - Minimal */}
        {profile.controller && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-3 mt-4">
            <a
              href={`https://etherscan.io/address/${profile.controller}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 group hover:bg-gray-50 dark:hover:bg-slate-800 p-2 rounded transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  ENS Resolver Address
                </p>
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 group-hover:underline truncate">
                  {profile.controller.slice(0, 10)}...{profile.controller.slice(-8)}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
