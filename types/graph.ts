export interface GraphNode {
  id: string // ENS name (unique identifier)
  label: string // Display name
  avatar?: string | null // Avatar URL
  x?: number // Force simulation positioning
  y?: number
}

export interface GraphLink {
  source: string // ENS name
  target: string // ENS name
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface ParsedPair {
  source: string
  target: string
}

/**
 * Parse comma-separated ENS pairs from text input
 * Format: "ens1.eth, ens2.eth" per line
 */
export function parseENSPairs(input: string): ParsedPair[] {
  const pairs: ParsedPair[] = []
  const lines = input.trim().split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const parts = trimmed.split(',').map((s) => s.trim())
    if (parts.length === 2) {
      const [source, target] = parts
      if (source && target && source.endsWith('.eth') && target.endsWith('.eth')) {
        pairs.push({ source, target })
      }
    }
  }

  return pairs
}

/**
 * Convert parsed pairs to graph data structure
 */
export function pairsToGraphData(pairs: ParsedPair[]): GraphData {
  const nodeMap = new Map<string, GraphNode>()
  const links: GraphLink[] = []

  // Create nodes and links
  for (const pair of pairs) {
    // Add source node
    if (!nodeMap.has(pair.source)) {
      nodeMap.set(pair.source, {
        id: pair.source,
        label: pair.source,
      })
    }

    // Add target node
    if (!nodeMap.has(pair.target)) {
      nodeMap.set(pair.target, {
        id: pair.target,
        label: pair.target,
      })
    }

    // Add link (prevent duplicates)
    const linkKey = [pair.source, pair.target].sort().join('|')
    if (!links.find((l) => [l.source, l.target].sort().join('|') === linkKey)) {
      links.push({
        source: pair.source,
        target: pair.target,
      })
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    links,
  }
}

/**
 * Validate ENS name format
 */
export function isValidENS(name: string): boolean {
  return /^[a-z0-9-]+\.eth$/i.test(name)
}
