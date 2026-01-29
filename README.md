# ENS Graph.io

A modern web application for exploring ENS (Ethereum Name Service) profiles and visualizing social networks on Ethereum. View on-chain data, transaction history, token balances, and discover your network through interactive graph visualizations.

**Built by Eddy**

---

## Features

- 🔍 **ENS Profile Viewer**: Search and view detailed ENS profiles
- 📊 **On-Chain Data**: ETH balance, token holdings, and transaction history
- 🌐 **Social Graph**: Visualize ENS network relationships with interactive graphs
- 🎨 **Modern UI**: Clean, minimalist design with dark mode support
- ⚡ **Real-Time Data**: Live data from Ethereum mainnet, Etherscan, and CoinGecko APIs

---

## Tech Stack

### Core Framework

- **Next.js**: `16.1.6` - React framework with App Router
- **React**: `19.2.3` - UI library
- **TypeScript**: `^5` - Type safety

### Blockchain & Web3

- **wagmi**: `^3.4.1` - React hooks for Ethereum
- **viem**: `^2.45.0` - TypeScript Ethereum library for ENS resolution
- **Etherscan API**: On-chain transaction and balance data
- **CoinGecko API**: Token price data

### Data Fetching & State

- **@tanstack/react-query**: `^5.90.20` - Async state management

### Graph Visualization

- **cytoscape**: `^3.33.1` - Graph theory library
- **react-cytoscapejs**: `^2.0.0` - React bindings for Cytoscape

### Styling

- **Tailwind CSS**: `^4` - Utility-first CSS framework
- **lucide-react**: `^0.563.0` - Icon library

### Development Tools

- **ESLint**: `^9` - Code linting
- **Prettier**: `^3.8.1` - Code formatting
- **Husky**: `^9.1.7` - Git hooks
- **lint-staged**: `^16.2.7` - Run linters on staged files

---

## Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        A1[app/page.tsx<br/>Home/Search]
        A2[app/profile/[ensName]/page.tsx<br/>Profile View]
        A3[app/graph/page.tsx<br/>Graph Input]
        A4[app/graph/view/page.tsx<br/>Graph Visualization]
        A5[app/api/avatar/route.ts<br/>Avatar Proxy API]

        A --> A1
        A --> A2
        A --> A3
        A --> A4
        A --> A5
    end

    subgraph "Component Layer"
        C1[Navbar.tsx]
        C2[ENSProfileView.tsx]
        C3[CytoscapeGraph.tsx]
        C4[ForceGraphView.tsx]

        A1 --> C1
        A2 --> C2
        A2 --> C1
        A3 --> C1
        A4 --> C3
        A4 --> C1
    end

    subgraph "Library Layer"
        L1[lib/ens.ts<br/>ENS utilities]
        L2[lib/etherscan.ts<br/>On-chain data]
        L3[lib/wagmi.ts<br/>Web3 config]
        L4[lib/sampleGraphData.ts<br/>Graph samples]

        C2 --> L1
        C2 --> L2
        C2 --> L3
        C3 --> L1
        C4 --> L4
    end

    subgraph "Type Layer"
        T1[types/ens.ts<br/>ENS interfaces]
        T2[types/graph.ts<br/>Graph interfaces]

        L1 --> T1
        L2 --> T1
        L3 --> T1
        C3 --> T2
        C4 --> T2
    end

    subgraph "External APIs"
        E1[Ethereum Mainnet<br/>viem/publicClient]
        E2[Etherscan API v2<br/>Transactions & Balances]
        E3[CoinGecko API<br/>Token Prices]

        L1 --> E1
        L2 --> E2
        L2 --> E3
        L3 --> E1
    end

    subgraph "Data Flow"
        D1[TanStack Query<br/>@tanstack/react-query]
        D2[Wagmi Provider<br/>Web3 Context]

        A --> D1
        A --> D2
        C2 --> D1
        L3 --> D2
    end

    style A fill:#0070f3,color:#fff
    style E1 fill:#627eea,color:#fff
    style E2 fill:#21325b,color:#fff
    style E3 fill:#8dc647,color:#fff
    style D1 fill:#ff4154,color:#fff
    style D2 fill:#627eea,color:#fff
```

---

## Directory Structure

```
ens-graph.io/
├── app/                        # Next.js App Router
│   ├── api/avatar/            # Avatar proxy API route
│   ├── graph/                 # Graph visualization pages
│   │   ├── page.tsx          # Graph input form
│   │   └── view/page.tsx     # Graph view
│   ├── profile/[ensName]/    # Dynamic ENS profile pages
│   │   ├── page.tsx          # Profile view
│   │   ├── loading.tsx       # Loading state
│   │   └── not-found.tsx     # 404 state
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── providers.tsx         # React Query & Wagmi providers
│   └── globals.css           # Global styles
│
├── components/                # React components
│   ├── Navbar.tsx            # Navigation bar
│   ├── ENSProfileView.tsx    # ENS profile display
│   ├── CytoscapeGraph.tsx    # Graph visualization
│   └── ForceGraphView.tsx    # Alternative graph view
│
├── lib/                       # Utility libraries
│   ├── ens.ts                # ENS resolution & utilities
│   ├── etherscan.ts          # Etherscan API client
│   ├── wagmi.ts              # Web3 configuration
│   └── sampleGraphData.ts    # Sample graph data
│
├── types/                     # TypeScript type definitions
│   ├── ens.ts                # ENS profile interfaces
│   ├── graph.ts              # Graph data structures
│   └── react-cytoscapejs.d.ts
│
├── design-system/            # Design guidelines
│   ├── MASTER.md
│   └── DESIGN_GUIDE.md
│
└── public/                   # Static assets
```

---

## Key Components

### 1. **ENS Profile Viewer** (`app/profile/[ensName]/page.tsx`)

- Fetches ENS profile data using viem
- Displays avatar, social links, crypto addresses
- Shows ETH balance, top 10 token holdings
- Lists recent transactions with ENS resolution
- Responsive cards with dark mode

### 2. **Graph Visualization** (`components/CytoscapeGraph.tsx`)

- Interactive node-link diagram using Cytoscape.js
- Force-directed layout (COSE algorithm)
- Node click navigation to profiles
- Hover effects and zoom controls
- Avatar integration on nodes

### 3. **Data Fetching** (`lib/`)

- **ens.ts**: ENS name resolution, validation, formatting
- **etherscan.ts**: ETH/token balances, transactions via Etherscan API v2
- **wagmi.ts**: Web3 provider configuration for mainnet

### 4. **Type Safety** (`types/`)

- **ENSProfile**: Complete profile structure with portfolio data
- **GraphData**: Node/edge definitions for visualization
- Strong typing across all components

---

## Environment Variables

Create a `.env.local` file:

```env
# Required: Etherscan API key for transaction/balance data
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Optional: Custom Ethereum RPC endpoint
NEXT_PUBLIC_MAINNET_RPC=https://ethereum-rpc.publicnode.com
```

Get your Etherscan API key: https://etherscan.io/apis

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd ens-graph.io

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Start production server
pnpm start
```

---

## Scripts

```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint errors
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting
pnpm type-check    # TypeScript type checking
```

---

## API Integration

### Ethereum Mainnet

- **Provider**: Public RPC node (configurable)
- **Library**: viem v2.45.0
- **Usage**: ENS resolution, name lookups

### Etherscan API v2

- **Endpoint**: `https://api.etherscan.io/v2/api`
- **Modules Used**:
  - `account/balance` - ETH balance
  - `account/tokentx` - Token transactions
  - `account/tokenbalance` - ERC-20 balances
  - `account/txlist` - Transaction history
- **Rate Limits**: Free tier: 5 calls/sec

### CoinGecko API

- **Endpoint**: `https://api.coingecko.com/api/v3`
- **Usage**: Token USD price data
- **Rate Limits**: Free tier: 10-30 calls/min

---

## Design System

The project follows a minimalist design philosophy:

- **Colors**: Ethereum blue (`#627EEA`), neutral grays, semantic colors
- **Typography**: System fonts, clear hierarchy
- **Spacing**: Consistent 4px/8px grid
- **Dark Mode**: Full support across all components
- **Responsive**: Mobile-first design

See `design-system/MASTER.md` for complete guidelines.

---

## Future Roadmap (Phase 2)

### Graph Features

- [ ] Graph input page for user-defined ENS pairs
- [ ] Enhanced graph features (filters, search, export)
- [ ] Graph analytics (centrality, communities)
- [ ] Transaction graph visualization

### Data & Performance

- [ ] **API Response Caching**: Implement caching layer (Redis/Vercel KV) for Etherscan and CoinGecko API responses to reduce latency and API rate limit usage
- [ ] **PostgreSQL Database**: Add persistent storage for:
  - User-created ENS relationship graphs
  - Graph CRUD operations (create, read, update, delete relationships)
  - Saved graph configurations and layouts
  - Historical data snapshots

### Profile Enhancements

- [ ] ENS registration/expiration tracking
- [ ] NFT gallery integration
- [ ] Portfolio value tracking over time

See `PHASE2_PLAN.md` for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- ESLint and Prettier are enforced via Husky pre-commit hooks
- All PRs must pass type checking (`pnpm type-check`)
- Follow existing code style and design patterns

---

## License

This project is private and proprietary.

---

## Acknowledgments

- ENS Protocol for decentralized naming
- Cytoscape.js for graph visualization
- Etherscan for blockchain data
- Next.js team for the amazing framework
