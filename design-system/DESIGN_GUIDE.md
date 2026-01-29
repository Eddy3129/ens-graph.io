# ENS Graph IO - Design System

**Built by:** Eddy  
**Version:** 1.0  
**Last Updated:** January 2025

---

## Brand Philosophy

**Minimalist. Compact. Functional.**

ENS Graph IO prioritizes clarity and efficiency. Every design element serves a purpose. No decorative bloat—just clean, readable, accessible interfaces.

---

## Color Palette

### Light Mode

- **Background**: `#F8FAFC` (slate-50)
- **Surface**: `#FFFFFF` (white)
- **Border**: `#E2E8F0` (gray-200)
- **Text Primary**: `#0F172A` (slate-900)
- **Text Secondary**: `#475569` (slate-600)
- **Text Muted**: `#64748B` (slate-500)
- **Accent**: `#2563EB` (blue-600)
- **Success**: `#16A34A` (green-600)
- **Error**: `#DC2626` (red-600)

### Dark Mode

- **Background**: `#020617` (slate-950)
- **Surface**: `#0F172A` (slate-900)
- **Border**: `#1E293B` (slate-800)
- **Text Primary**: `#F1F5F9` (slate-100)
- **Text Secondary**: `#CBD5E1` (slate-300)
- **Text Muted**: `#94A3B8` (slate-400)
- **Accent**: `#3B82F6` (blue-500)
- **Success**: `#4ADE80` (green-400)
- **Error**: `#F87171` (red-400)

---

## Typography

### Font Families

- **Primary**: System stack (optimized for readability)
- **Monospace**: Monospace font stack for addresses/hashes

### Font Sizes

- **Display**: 24px (profile names)
- **Heading**: 16px (section titles)
- **Body**: 14px (general text)
- **Caption**: 12px (table headers, labels)
- **Code**: 12px monospace (addresses, hashes)

### Font Weights

- **Bold**: 700 (headings, emphasis)
- **Semibold**: 600 (section headers, labels)
- **Regular**: 400 (body text)

---

## Layout & Spacing

### Container

- **Max Width**: `max-w-6xl` (1024px)
- **Padding**:
  - Desktop: `px-4` (16px)
  - Content: `py-6` (24px)

### Spacing Scale

- **xs**: 4px (`gap-1`)
- **sm**: 8px (`gap-2`)
- **md**: 16px (`gap-4`)
- **lg**: 24px (`gap-6`)
- **xl**: 32px (`gap-8`)

### Cards

- **Border Radius**: `rounded-xl` (12px)
- **Padding**: `p-4` (16px)
- **Border**: 1px solid (border color)
- **Gap Between**: `mb-4`

---

## Components

### Navigation

- **Style**: Sticky header with back button
- **Height**: 56px (py-3 + icon size)
- **Border**: Bottom border only
- **Background**: Surface color with subtle separation

### Profile Header

- **Layout**: Horizontal flex with avatar, info, and socials
- **Avatar**: 64px (w-16 h-16) with rounded corners
- **Spacing**: `gap-4` between sections
- **Socials**: Vertical icon buttons, no labels

### Tables

- **Grid Columns**: Equal width (`grid-cols-10` for 5 equal cols)
- **Row Height**: `py-2` (8px padding top/bottom)
- **Headers**: Font-semibold, text-xs, border-bottom
- **Rows**: Hover effect, cursor-pointer, smooth transition
- **Address Display**: Truncated format `0x1234...5678` with monospace font
- **Tooltips**: Full address on hover via title attribute

### Buttons & Links

- **Style**: Minimal, text-based
- **Hover**: Background color change (subtle)
- **Icons**: 16-20px from lucide-react
- **State**: `cursor-pointer`, `transition-colors duration-200`

### Status Indicators

- **Up/Down**: `↓` for received, `↑` for sent (green and red)
- **Badge**: Inline span with background color
- **Colors**:
  - Received: Green (text-green-600 dark:text-green-400)
  - Sent: Red (text-red-600 dark:text-red-400)

---

## Common Patterns

### Address Display

```
{ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
```

**Priority**: ENS name > Truncated address

### Transaction Amount

```
{isReceived ? '↓' : '↑'} {Math.abs(parseFloat(amount)).toFixed(4)}
```

**Color**: Green for received, Red for sent

### Date Format

```
Mon DD, HH:MM:SS AM/PM
```

Example: `Jan 24, 08:50:11 PM`

### Grid System

- **Responsive**: Use responsive grid columns based on content
- **Gap**: Consistent `gap-2` between columns
- **Padding**: `px-3 py-2` for compact cells

---

## Dark Mode

- **Auto Support**: All components support light/dark modes
- **CSS Classes**: Use `dark:` prefix for dark mode styles
- **No Forced Dark**: Respects system preference

**Example:**

```tsx
className = 'bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100'
```

---

## Accessibility

### Color Contrast

- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Links and accents: Always underlined or distinct on hover

### Interactions

- All interactive elements: Clearly visible focus state
- Keyboard navigation: Fully supported
- Loading states: Spinner with text label

### Semantic HTML

- Use `<a>` for links (not `<div>` with click handler)
- Use `<button>` for buttons
- Use `<table>` for tabular data
- Use `<label>` for form inputs

---

## Anti-Patterns ❌

- ❌ No emoji icons (use lucide-react instead)
- ❌ No excessive shadows or gradients
- ❌ No justified text alignment
- ❌ No animated transitions > 300ms
- ❌ No nested popups or complex modals
- ❌ No fixed widths (use responsive max-width)
- ❌ No hover effects that shift layout

---

## Component Library

All components use **Lucide React** for icons:

- `ArrowLeft` - Navigation back
- `History` - Transactions section
- `Wallet` - Portfolio section
- `ExternalLink` - Links to external sites
- `Twitter`, `Github` - Social icons

---

## File Structure

```
ens-graph.io/
├── components/
│   └── ENSProfileView.tsx       # Profile page UI
│   └── HomeView.tsx              # Home/dashboard UI (to be created)
├── design-system/
│   ├── MASTER.md                # (Legacy - superseded by this file)
│   └── DESIGN_GUIDE.md          # This file
├── lib/
│   ├── ens.ts                   # ENS utilities
│   ├── etherscan.ts             # Etherscan API
│   └── ens.ts                   # Text formatting
├── types/
│   └── ens.ts                   # TypeScript interfaces
└── app/
    ├── page.tsx                 # Home page
    └── profile/
        └── [ensName]/page.tsx   # Profile page
```

---

## Implementation Checklist

- [ ] Use `max-w-6xl mx-auto` for all pages
- [ ] Support dark mode with `dark:` classes
- [ ] Truncate long addresses with tooltip
- [ ] Use monospace font for addresses/hashes
- [ ] Implement hover states on interactive elements
- [ ] Include back button on detail pages
- [ ] Use table grid for multi-column data
- [ ] Follow spacing scale consistently
- [ ] Test contrast ratios (4.5:1 minimum)
- [ ] Verify keyboard navigation works

---

**Questions?** Contact Eddy or refer to ENSProfileView.tsx for reference implementation.
