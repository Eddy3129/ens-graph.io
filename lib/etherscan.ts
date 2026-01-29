import type { TokenBalance, Transaction } from '@/types/ens'
import { formatEther, parseAbi } from 'viem'

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const ETHERSCAN_API = 'https://api.etherscan.io/v2/api' // V2 endpoint with chainid support

// ERC-20 ABI minimal interface
const ERC20_ABI = parseAbi([
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
])

/**
 * Get ETH balance for an address
 */
export async function getEthBalance(address: string): Promise<string | null> {
  try {
    if (!ETHERSCAN_API_KEY) {
      console.warn('ETHERSCAN_API_KEY not set, skipping ETH balance')
      return null
    }

    const params = new URLSearchParams({
      chainid: '1', // Ethereum mainnet
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey: ETHERSCAN_API_KEY,
    })

    const url = `${ETHERSCAN_API}?${params}`
    console.log('[ETH Balance] Fetching from V2 API for:', address)
    
    const response = await fetch(url)
    const data = await response.json()

    console.log('[ETH Balance] Response:', data)

    if (data.status === '1' && data.result) {
      // Convert wei to ETH
      return formatEther(BigInt(data.result))
    }
    console.warn('[ETH Balance] Failed:', data.message || data.result)
    return null
  } catch (error) {
    console.error('[ETH Balance] Error:', error)
    return null
  }
}

/**
 * Get ERC-20 token balances for an address
 */
export async function getTokenBalances(address: string): Promise<TokenBalance[]> {
  try {
    if (!ETHERSCAN_API_KEY) {
      console.warn('ETHERSCAN_API_KEY not set, skipping token balances')
      return []
    }

    const params = new URLSearchParams({
      chainid: '1', // Ethereum mainnet
      module: 'account',
      action: 'tokentx',
      address,
      sort: 'desc',
      page: '1',
      offset: '50', // Limit to 50 results to avoid timeout
      apikey: ETHERSCAN_API_KEY,
    })

    const url = `${ETHERSCAN_API}?${params}`
    console.log('[Token Balances] Fetching from V2 API for:', address)
    
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
    const data = await response.json()

    console.log('[Token Balances] Response status:', data.status, 'message:', data.message)

    if (data.status !== '1' || !data.result) {
      console.warn('[Token Balances] No transactions found:', address, data.message)
      return []
    }

    console.log('[Token Balances] Found', data.result.length, 'token transactions')

    // Group transactions by token to get unique tokens
    const tokenMap = new Map<string, any>()

    data.result.forEach((tx: any) => {
      const key = tx.contractAddress.toLowerCase()
      if (!tokenMap.has(key)) {
        tokenMap.set(key, tx)
      }
    })

    console.log('[Token Balances] Found', tokenMap.size, 'unique tokens')

    // Get current balances for each token
    const tokens: TokenBalance[] = []

    for (const [contractAddress, tx] of tokenMap.entries()) {
      try {
        const decimalsNum = parseInt(tx.decimals) || 18
        
        // Skip if we can't determine decimals
        if (!decimalsNum || isNaN(decimalsNum)) {
          console.log(`[Token Balances] Skipping token ${contractAddress} - using default 18 decimals`)
        }
        
        const balance = await getTokenBalance(address, contractAddress, decimalsNum || 18)
        const valueUsd = await getTokenPrice(contractAddress)

        if (balance && valueUsd && !isNaN(balance.value)) {
          tokens.push({
            contractAddress: contractAddress as `0x${string}`,
            name: tx.tokenName,
            symbol: tx.tokenSymbol,
            decimals: decimalsNum || 18,
            balance: balance.raw,
            balanceFormatted: balance.formatted,
            priceUsd: valueUsd,
            valueUsd: balance.value * valueUsd,
          })
        }
      } catch (err) {
        console.error(`[Token Balances] Error fetching token ${contractAddress}:`, err)
      }
    }

    // Filter tokens > $10 USD value and return top 10
    const filtered = tokens
      .filter(t => (t.valueUsd || 0) > 10)
      .sort((a, b) => (b.valueUsd || 0) - (a.valueUsd || 0))
      .slice(0, 10) // Top 10 tokens
    console.log(`[Token Balances] Found ${filtered.length} tokens over $10 for address ${address}`)
    return filtered
  } catch (error) {
    console.error('[Token Balances] Error:', error)
    return []
  }
}

/**
 * Get token balance for a specific token contract
 */
async function getTokenBalance(
  address: string,
  contractAddress: string,
  decimals: number | string | undefined
): Promise<{ raw: string; formatted: string; value: number } | null> {
  try {
    let decimalsNum = 18 // Default to standard ERC-20
    
    if (decimals !== undefined) {
      const parsed = typeof decimals === 'string' ? parseInt(decimals) : decimals
      if (!isNaN(parsed) && parsed >= 0) {
        decimalsNum = parsed
      }
    }

    const params = new URLSearchParams({
      chainid: '1', // Ethereum mainnet
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      tag: 'latest',
      apikey: ETHERSCAN_API_KEY || '',
    })

    const response = await fetch(`${ETHERSCAN_API}?${params}`)
    const data = await response.json()

    if (data.status === '1' && data.result) {
      const balanceBigInt = BigInt(data.result || '0')
      const divisor = BigInt(Math.pow(10, decimalsNum))
      const value = Number(balanceBigInt) / Number(divisor)

      return {
        raw: data.result,
        formatted: value.toFixed(Math.min(decimalsNum, 4)),
        value,
      }
    }
    return null
  } catch (error) {
    console.error(`[Token Balance] Error for ${contractAddress}:`, error)
    return null
  }
}

/**
 * Get token price in USD from CoinGecko
 */
async function getTokenPrice(contractAddress: string): Promise<number | null> {
  try {
    const params = new URLSearchParams({
      contract_addresses: contractAddress,
      vs_currencies: 'usd',
      x_cg_pro_api_key: '', // CoinGecko free API, no key needed
    })

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?${params}`
    )
    const data = await response.json()

    if (data[contractAddress.toLowerCase()]) {
      return data[contractAddress.toLowerCase()].usd
    }
    return null
  } catch (error) {
    console.error('Error fetching token price:', error)
    return null
  }
}

/**
 * Get recent transactions for an address
 */
export async function getTransactions(address: string, limit = 50): Promise<Transaction[]> {
  try {
    if (!ETHERSCAN_API_KEY) {
      console.warn('ETHERSCAN_API_KEY not set, skipping transactions')
      return []
    }

    // V2 API parameters - must match exact format
    const params = new URLSearchParams()
    params.append('chainid', '1')
    params.append('module', 'account')
    params.append('action', 'txlist')
    params.append('address', address)
    params.append('startblock', '0')
    params.append('endblock', '9999999999')
    params.append('sort', 'desc')
    params.append('page', '1')
    params.append('offset', String(Math.min(limit, 50)))
    params.append('apikey', ETHERSCAN_API_KEY)

    const url = `${ETHERSCAN_API}?${params}`
    console.log('[Transactions] Fetching from V2 API for:', address)
    
    const response = await fetch(url)
    const data = await response.json()

    console.log('[Transactions] Response:', data)

    if (data.status !== '1' || !data.result) {
      console.warn('[Transactions] No transactions found:', address, data.message || 'NOTOK')
      return []
    }

    console.log('[Transactions] Found', data.result.length, 'transactions')

    const txs = data.result.slice(0, limit).map((tx: any) => ({
      hash: tx.hash,
      from: tx.from as `0x${string}`,
      to: tx.to as `0x${string}`,
      value: tx.value,
      valueFormatted: formatEther(BigInt(tx.value)),
      timestamp: parseInt(tx.timeStamp),
      blockNumber: parseInt(tx.blockNumber),
      isReceived: tx.to.toLowerCase() === address.toLowerCase(),
    }))
    
    console.log(`[Transactions] Parsed ${txs.length} transactions for address ${address}`)
    return txs
  } catch (error) {
    console.error('[Transactions] Error:', error)
    return []
  }
}

/**
 * Get ENS expiration date
 */
export async function getEnsExpiration(name: string): Promise<{ timestamp: number; date: string } | null> {
  try {
    // This would need the ENS Registry contract interaction
    // For now, we'll handle this in the viem client
    return null
  } catch (error) {
    console.error('Error fetching ENS expiration:', error)
    return null
  }
}
