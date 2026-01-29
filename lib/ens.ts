import { normalize } from 'viem/ens'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import type { ENSProfile } from '@/types/ens'

// Create a public client for ENS resolution
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://ethereum-rpc.publicnode.com'
  ),
})

/**
 * Normalize ENS name
 * Throws if invalid
 */
export function normalizeENS(name: string): string {
  return normalize(name)
}

/**
 * Check if string is valid ENS name
 */
export function isValidENS(name: string): boolean {
  try {
    normalize(name)
    return name.endsWith('.eth')
  } catch {
    return false
  }
}

/**
 * Format Ethereum address for display
 */
export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format number to USD currency
 */
export function formatUSD(value: number | null): string {
  if (!value) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Text records to fetch from ENS
 */
export const ENS_TEXT_RECORDS = [
  'avatar',
  'description',
  'email',
  'url',
  'location',
  'com.twitter',
  'com.github',
  'com.discord',
  'org.telegram',
  'BTC',
  'LTC',
  'DOGE',
] as const

/**
 * Get ENS registrant and controller addresses
 * Note: Getting registrant and expiration requires querying the ENS Registrar contract
 * For now we'll return resolver address as controller
 */
export async function getEnsRegistryData(name: string): Promise<{
  expiration: string | null
  registrant: `0x${string}` | null
  controller: `0x${string}` | null
}> {
  try {
    const normalizedName = normalize(name)

    // Get resolver address (controller)
    const resolver = await publicClient.getEnsResolver({ name: normalizedName })

    // Note: Getting registrant and expiration requires direct contract calls to the ENS Registrar
    // This is beyond scope for now, would need namehash calculation and registry contract ABI
    return {
      expiration: null, // Would require registrar contract query
      registrant: null, // Would require registrar contract query
      controller: resolver || null,
    }
  } catch (error) {
    console.error('Error fetching ENS registry data:', error)
    return {
      expiration: null,
      registrant: null,
      controller: null,
    }
  }
}
