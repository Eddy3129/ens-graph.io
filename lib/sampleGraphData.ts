import type { ElementDefinition } from 'cytoscape'

// Hardcoded sample graph data with real ENS names in Cytoscape format
export const sampleGraphData: ElementDefinition[] = [
  // Nodes - avatars proxied via /api/avatar to avoid CORS
  {
    data: { id: 'vitalik.eth', label: 'vitalik.eth', avatar: '/api/avatar?name=vitalik.eth' },
    group: 'nodes',
  },
  { data: { id: 'balajis.eth', label: 'balajis.eth', avatar: null }, group: 'nodes' },
  {
    data: { id: 'brantly.eth', label: 'brantly.eth', avatar: '/api/avatar?name=brantly.eth' },
    group: 'nodes',
  },
  {
    data: { id: 'nick.eth', label: 'nick.eth', avatar: '/api/avatar?name=nick.eth' },
    group: 'nodes',
  },
  {
    data: { id: 'aave.eth', label: 'aave.eth', avatar: '/api/avatar?name=aave.eth' },
    group: 'nodes',
  },
  { data: { id: 'luc.eth', label: 'luc.eth', avatar: '/api/avatar?name=luc.eth' }, group: 'nodes' },
  {
    data: { id: 'jeff.eth', label: 'jeff.eth', avatar: '/api/avatar?name=jeff.eth' },
    group: 'nodes',
  },
  {
    data: { id: 'daylon.eth', label: 'daylon.eth', avatar: '/api/avatar?name=daylon.eth' },
    group: 'nodes',
  },

  // Edges
  { data: { source: 'vitalik.eth', target: 'balajis.eth' }, group: 'edges' },
  { data: { source: 'vitalik.eth', target: 'brantly.eth' }, group: 'edges' },
  { data: { source: 'vitalik.eth', target: 'nick.eth' }, group: 'edges' },
  { data: { source: 'balajis.eth', target: 'brantly.eth' }, group: 'edges' },
  { data: { source: 'brantly.eth', target: 'nick.eth' }, group: 'edges' },
  { data: { source: 'aave.eth', target: 'vitalik.eth' }, group: 'edges' },
  { data: { source: 'luc.eth', target: 'nick.eth' }, group: 'edges' },
  { data: { source: 'jeff.eth', target: 'balajis.eth' }, group: 'edges' },
  { data: { source: 'daylon.eth', target: 'brantly.eth' }, group: 'edges' },
  { data: { source: 'luc.eth', target: 'jeff.eth' }, group: 'edges' },
]
