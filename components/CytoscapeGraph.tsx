'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CytoscapeComponent from 'react-cytoscapejs'
import type { Core, ElementDefinition } from 'cytoscape'

interface CytoscapeGraphProps {
  elements: ElementDefinition[]
}

export default function CytoscapeGraph({ elements }: CytoscapeGraphProps) {
  const cyRef = useRef<Core | null>(null)
  const router = useRouter()
  const layout = useMemo(
    () => ({
      name: 'cose',
      animate: false,
      fit: true,
      padding: 50,
      nodeRepulsion: 8000,
      idealEdgeLength: 150,
      edgeElasticity: 100,
      nestingFactor: 1.2,
      gravity: 1,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0,
    }),
    []
  )

  // Handle Cytoscape instance initialization
  const handleCyInit = (cy: Core) => {
    if (cyRef.current && cyRef.current !== cy) {
      cyRef.current.off('tap', 'node')
      cyRef.current.off('mouseover', 'node')
      cyRef.current.off('mouseout', 'node')
    }
    cyRef.current = cy

    // Node click handler - navigate to profile
    cy.on('tap', 'node', (evt) => {
      const node = evt.target
      const nodeId = node.id()

      router.push(`/profile/${nodeId}`)
    })

    // Node hover handlers - change cursor and size
    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target
      document.body.style.cursor = 'pointer'

      if (node && cy && !cy.destroyed()) {
        node.addClass('is-hovered')
      }
    })

    cy.on('mouseout', 'node', (evt) => {
      const node = evt.target
      document.body.style.cursor = 'default'

      if (node && cy && !cy.destroyed()) {
        node.removeClass('is-hovered')
      }
    })
  }

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (cyRef.current && !cyRef.current.destroyed()) {
        cyRef.current.off('tap', 'node')
        cyRef.current.off('mouseover', 'node')
        cyRef.current.off('mouseout', 'node')
      }
      document.body.style.cursor = 'default'
      cyRef.current = null
    }
  }, [])

  // Stylesheet for the graph
  const stylesheet = [
    {
      selector: 'node',
      style: {
        width: 60,
        height: 60,
        'background-color': '#627EEA',
        'background-image': 'data(avatar)',
        'background-fit': 'cover',
        'background-clip': 'none',
        'border-width': 3,
        'border-color': '#ffffff',
        'border-opacity': 1,
        label: 'data(label)',
        'text-valign': 'bottom' as const,
        'text-halign': 'center' as const,
        'text-margin-y': 8,
        'font-size': 12,
        'font-weight': '600',
        color: '#1e293b',
        'text-outline-width': 2,
        'text-outline-color': '#ffffff',
        'transition-property': 'width, height, font-size',
        'transition-duration': '0.2s',
        'transition-timing-function': 'ease-out',
        shape: 'ellipse',
      },
    },
    {
      selector: 'node.is-hovered',
      style: {
        width: 80,
        height: 80,
        'font-size': 16,
      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'line-color': '#94A3B8',
        'target-arrow-color': '#94A3B8',
        'target-arrow-shape': 'triangle' as const,
        'curve-style': 'bezier' as const,
        opacity: 0.6,
      },
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 4,
        'border-color': '#3b82f6',
      },
    },
    {
      selector: 'node:active',
      style: {
        'overlay-opacity': 0.2,
        'overlay-color': '#3b82f6',
      },
    },
  ]

  return (
    <div className="w-full h-full">
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        cy={handleCyInit}
        style={{ width: '100%', height: '100%' }}
        wheelSensitivity={0.2}
        minZoom={0.5}
        maxZoom={3}
      />
    </div>
  )
}
