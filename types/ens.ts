export interface ENSProfile {
  // Core
  name: string
  address: `0x${string}` | null
  avatar: string | null

  // ENS Registry Data
  expiration: string | null // ISO date string
  registrant: `0x${string}` | null
  controller: `0x${string}` | null

  // Social
  twitter: string | null
  github: string | null
  discord: string | null
  telegram: string | null
  email: string | null
  url: string | null

  // Personal
  description: string | null
  location: string | null

  // Crypto addresses
  btc: string | null
  ltc: string | null
  doge: string | null

  // Content
  contentHash: string | null

  // Portfolio Data
  ethBalance: string | null // in ETH
  tokens: TokenBalance[]
  transactions: Transaction[]
}

export interface TokenBalance {
  contractAddress: `0x${string}`
  name: string
  symbol: string
  decimals: number
  balance: string
  balanceFormatted: string // formatted with decimals
  priceUsd: number | null
  valueUsd: number | null // balance * price
}

export interface Transaction {
  hash: string
  from: `0x${string}`
  fromEns?: string | null
  to: `0x${string}` | null
  toEns?: string | null
  value: string // in wei
  valueFormatted: string // in ETH
  timestamp: number
  blockNumber: number
  isReceived: boolean // true if "to" address matches our address
  tokenSymbol?: string
}

export interface ENSTextRecord {
  key: string
  value: string | null
}
