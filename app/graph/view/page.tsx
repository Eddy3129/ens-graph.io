'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ForceGraphView from '@/components/ForceGraphView'
import type { GraphData } from '@/types/graph'
import type { ElementDefinition } from 'cytoscape'

// Convert old GraphData format to Cytoscape format
function graphDataToCytoscape(data: GraphData): ElementDefinition[] {
  const elements: ElementDefinition[] = []

  // Add nodes
  data.nodes.forEach((node) => {
    const avatarUrl = node.avatar
      ? `/api/avatar?url=${encodeURIComponent(node.avatar)}`
      : `/api/avatar?name=${encodeURIComponent(node.id)}`
    elements.push({
      data: { id: node.id, label: node.label, avatar: avatarUrl },
      group: 'nodes',
    })
  })

  // Add edges
  data.links.forEach((link) => {
    elements.push({
      data: { source: link.source, target: link.target },
      group: 'edges',
    })
  })

  return elements
}

function GraphViewContent() {
  const searchParams = useSearchParams()

  // Derive graph data from URL params using useMemo
  const graphData = useMemo<GraphData | null>(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        return JSON.parse(Buffer.from(dataParam, 'base64').toString())
      } catch (err) {
        console.error('Failed to decode graph data:', err)
        return null
      }
    }
    return null
  }, [searchParams])

  if (!graphData || graphData.nodes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link
              href="/graph"
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Graph Visualization
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No graph data provided</p>
            <Link
              href="/graph"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
            >
              Create a Graph
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Convert to Cytoscape format
  const cytoscapeElements = graphDataToCytoscape(graphData)

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/graph"
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Graph Visualization
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {graphData.nodes.length} nodes • {graphData.links.length} connections
              </p>
            </div>
          </div>
          <Link
            href="/graph"
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            New Graph
          </Link>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 relative">
        <ForceGraphView elements={cytoscapeElements} />
      </div>
    </div>
  )
}

export default function GraphViewPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <p className="text-gray-500 dark:text-gray-400">Loading graph...</p>
        </div>
      }
    >
      <GraphViewContent />
    </Suspense>
  )
}
