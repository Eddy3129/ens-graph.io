import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://ethereum-rpc.publicnode.com'
    ),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
