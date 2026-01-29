import Image from 'next/image'
import { ExternalLink, Wallet, History, Twitter, Github } from 'lucide-react'
import { formatAddress, formatDate, formatUSD } from '@/lib/ens'
import type { ENSProfile } from '@/types/ens'

interface ENSProfileViewProps {
  profile: ENSProfile
}

export default function ENSProfileView({ profile }: ENSProfileViewProps) {
  const socialLinks = [
    profile.twitter && { name: 'Twitter', value: profile.twitter, url: `https://twitter.com/${profile.twitter}`, icon: Twitter },
    profile.github && { name: 'GitHub', value: profile.github, url: `https://github.com/${profile.github}`, icon: Github },
    profile.discord && { name: 'Discord', value: profile.discord },
    profile.telegram && { name: 'Telegram', value: profile.telegram, url: `https://t.me/${profile.telegram}` },
  ].filter(Boolean)

  const hasAddresses = profile.btc || profile.ltc || profile.doge
  const portfolioValue = profile.tokens.reduce((acc, t) => acc + (t.valueUsd || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 py-12">
        {/* Header - Profile Info + Socials Side by Side */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Avatar + Name + Address */}
            <div className="flex gap-4">
              {profile.avatar ? (
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="rounded-full object-cover border-4 border-blue-100 dark:border-blue-900/30"
                    sizes="96px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0 border-4 border-blue-100 dark:border-blue-900/30">
                  <span className="text-3xl font-bold text-white">
                    {profile.name[0].toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 break-all">
                  {profile.name}
                </h1>

                {profile.address && (
                  <a
                    href={`https://etherscan.io/address/${profile.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline break-all flex items-center gap-1 group"
                  >
                    {formatAddress(profile.address)}
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {profile.location && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    📍 {profile.location}
                  </p>
                )}
              </div>
            </div>

            {/* Socials Column */}
            {socialLinks.length > 0 && (
              <div className="flex-shrink-0">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link: any) => (
                    <a
                      key={link.name}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-lg transition-all duration-200 group text-xs font-medium cursor-pointer"
                    >
                      {link.icon && <link.icon className="w-3.5 h-3.5" />}
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {link.name}
                      </span>
                      {link.url && (
                        <ExternalLink className="w-2.5 h-2.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {profile.description && (
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
              "{profile.description}"
            </p>
          )}
        </div>

        {/* Portfolio Overview */}
        {(profile.ethBalance || profile.tokens.length > 0) && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Portfolio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {profile.ethBalance && (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                    ETH Balance
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {parseFloat(profile.ethBalance).toFixed(4)} ETH
                  </p>
                </div>
              )}

              {profile.tokens.length > 0 && (
                <>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">
                      Tokens
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {profile.tokens.length}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                      Portfolio Value
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {formatUSD(portfolioValue)}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Tokens List */}
            {profile.tokens.length > 0 && (
              <div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {profile.tokens.map((token) => (
                    <div
                      key={token.contractAddress}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                          {token.symbol}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-gray-900 dark:text-gray-100">
                          {parseFloat(token.balanceFormatted).toFixed(4)}
                        </p>
                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                          {formatUSD(token.valueUsd)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transactions */}
        {profile.transactions.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              Recent Transactions
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {profile.transactions.slice(0, 20).map((tx) => (
                <a
                  key={tx.hash}
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                        tx.isReceived
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {tx.isReceived ? '↓ In' : '↑ Out'}
                      </span>
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 group-hover:underline break-all">
                        {tx.hash.slice(0, 12)}...
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {tx.valueFormatted.startsWith('-') ? tx.valueFormatted : `+${tx.valueFormatted}`} ETH
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ENS Resolver */}
        {profile.controller && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              ENS Resolver
            </h3>

            <a
              href={`https://etherscan.io/address/${profile.controller}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group cursor-pointer inline-block w-full"
            >
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                Resolver Address
              </p>
              <p className="font-mono text-sm text-blue-600 dark:text-blue-400 group-hover:underline break-all flex items-center gap-2">
                {profile.controller}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </p>
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Note: ENS expiration dates require direct contract queries to the ENS Registrar (coming in a future update)
            </p>
          </div>
        )}

        {/* Crypto Addresses */}
        {hasAddresses && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Crypto Addresses
            </h3>

            <div className="space-y-3">
              {profile.btc && (
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Bitcoin (BTC)
                  </p>
                  <p className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">{profile.btc}</p>
                </div>
              )}

              {profile.ltc && (
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Litecoin (LTC)
                  </p>
                  <p className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">{profile.ltc}</p>
                </div>
              )}

              {profile.doge && (
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Dogecoin (DOGE)
                  </p>
                  <p className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">{profile.doge}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
