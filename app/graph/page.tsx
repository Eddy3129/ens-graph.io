'use client'

import ForceGraphView from '@/components/ForceGraphView'
import { sampleGraphData } from '@/lib/sampleGraphData'

export default function GraphPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}

      {/* Graph Canvas - Takes remaining height */}
      <div className="flex-1 relative overflow-hidden">
        <ForceGraphView elements={sampleGraphData} />
      </div>
    </div>
  )
}
