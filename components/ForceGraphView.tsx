'use client'

import dynamic from 'next/dynamic'
import type { ElementDefinition } from 'cytoscape'

interface ForceGraphViewProps {
  elements: ElementDefinition[]
}

// Dynamic import to prevent SSR issues with Cytoscape
const CytoscapeGraph = dynamic<{ elements: ElementDefinition[] }>(
  () => import('./CytoscapeGraph'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading graph...</p>
      </div>
    ),
  }
)

export default function ForceGraphView({ elements }: ForceGraphViewProps) {
  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-slate-950">
      {/* Graph Container - Full size */}
      <div className="absolute inset-0">
        <CytoscapeGraph elements={elements} />
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 shadow-md z-10">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Controls</p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-xs">
          <li className="flex items-start">
            <span className="font-medium mr-2">Click</span>
            <span>View profile</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">Drag</span>
            <span>Reposition node</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">Scroll</span>
            <span>Zoom in/out</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">Pan</span>
            <span>Click + drag background</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">Hover</span>
            <span>Node grows larger</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
