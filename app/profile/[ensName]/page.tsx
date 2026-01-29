import { notFound } from 'next/navigation'
import { normalize } from 'viem/ens'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import ENSProfileView from '@/components/ENSProfileView'
import type { ENSProfile } from '@/types/ens'
import { ENS_TEXT_RECORDS, getEnsRegistryData } from '@/lib/ens'
import { getEthBalance, getTransactions } from '@/lib/etherscan'
import type { Metadata } from 'next'

// Create client for server-side ENS resolution
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://ethereum-rpc.publicnode.com'
  ),
})

async function getENSProfile(ensName: string): Promise<ENSProfile | null> {
  try {
    const name = normalize(ensName)

    // Get address
    const address = await publicClient.getEnsAddress({ name })
    if (!address) return null

    // Get all text records in parallel
    const textRecords = await Promise.all(
      ENS_TEXT_RECORDS.map((key) => publicClient.getEnsText({ name, key }))
    )

    // Map to profile object
    const [
      avatar,
      description,
      email,
      url,
      location,
      twitter,
      github,
      discord,
      telegram,
      btc,
      ltc,
      doge,
    ] = textRecords

    // Get ENS registry data
    const registryData = await getEnsRegistryData(name)

    // Get portfolio data in parallel
    const [ethBalance, transactions] = await Promise.all([
      getEthBalance(address),
      getTransactions(address, 50), // Max 50 transactions
    ])

    return {
      name,
      address,
      avatar,
      description,
      email,
      url,
      location,
      twitter,
      github,
      discord,
      telegram,
      btc,
      ltc,
      doge,
      contentHash: null,
      expiration: registryData.expiration,
      registrant: registryData.registrant,
      controller: registryData.controller,
      ethBalance,
      tokens: [],
      transactions,
    }
  } catch (error) {
    console.error('ENS resolution error:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ensName: string }>
}): Promise<Metadata> {
  const { ensName } = await params
  const profile = await getENSProfile(ensName)

  if (!profile) {
    return {
      title: 'ENS Profile Not Found',
    }
  }

  return {
    title: `${profile.name} | ENS Profile`,
    description:
      profile.description ||
      `View ${profile.name}'s ENS profile and social connections`,
    openGraph: {
      title: profile.name,
      description: profile.description || undefined,
      images: profile.avatar ? [profile.avatar] : [],
    },
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ ensName: string }>
}) {
  const { ensName } = await params
  const profile = await getENSProfile(ensName)

  if (!profile) {
    notFound()
  }

  return <ENSProfileView profile={profile} />
}
