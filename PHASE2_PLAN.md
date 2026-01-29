# Phase 2: Social Network Graph Visualization

## Objective

Create an in-browser graph visualization of Ethereum social networks using user-provided ENS pairs.

## Tasks

### Task 2.1: Create Graph Data Types ✓

- [x] Define GraphNode interface (id, label, avatar, etc)
- [x] Define GraphEdge interface (source, target)
- [x] Create graph parsing utility from ENS pairs

### Task 2.2: Build Graph Visualization Component ✓

- [x] Install react-force-graph-2d
- [x] Create ForceGraph component with force simulation
- [x] Implement node click → route to profile
- [x] Add hover tooltips with ENS name
- [x] Style nodes as circles with Ethereum blue (#627EEA)
- [x] Add zoom/pan/drag controls
- [x] Dark mode support
- [x] Design system compliance (no emoji icons)

### Task 2.3: Create Graph Input Page

- [ ] Build textarea for ENS pair input
- [ ] Parse input format: "ens1, ens2" per line
- [ ] Validate ENS names
- [ ] Handle errors gracefully
- [ ] Submit to visualization page

### Task 2.4: Add Graph Link to Home Page

- [ ] Update home page with "Social Graph" button
- [ ] Link to graph input page
- [ ] Update example section

## Data Structure

```typescript
// Input format
const pairs = [
  "vitalik.eth, balajis.eth",
  "balajis.eth, brantly.eth"
]

// Parsed graph
const graph = {
  nodes: [
    { id: "vitalik.eth", label: "vitalik.eth", ... },
    { id: "balajis.eth", label: "balajis.eth", ... }
  ],
  links: [
    { source: "vitalik.eth", target: "balajis.eth" }
  ]
}
```

## Routes

- `/graph` - Graph input page
- `/graph/view?pairs=...` or use state for data passing

## UI/UX

- Minimalist design consistent with Phase 1
- Dark mode support
- Responsive layout
- Loading states while fetching avatar data
