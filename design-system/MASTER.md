# ENS Social Network - Design System

> Professional Web3 profile viewer and social network visualization

## Color Palette

### Primary Colors
- **Primary Blue:** `#627EEA` (Ethereum blue) - Main CTA, links
- **Primary Purple:** `#8B5CF6` (Purple accent) - Gradients, secondary actions
- **Primary Pink:** `#EC4899` (Pink accent) - Interactive states

### Semantic Colors
- **Success:** `#10B981` (Green)
- **Warning:** `#F59E0B` (Amber)
- **Error:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

### Neutral Colors (Light Mode)
- **Text Primary:** `#0F172A` (Slate-900)
- **Text Secondary:** `#475569` (Slate-600)
- **Text Muted:** `#94A3B8` (Slate-400)
- **Background:** `#FFFFFF` (White)
- **Surface:** `#F8FAFC` (Slate-50)
- **Border:** `#E2E8F0` (Slate-200)

### Neutral Colors (Dark Mode)
- **Text Primary:** `#F1F5F9` (Slate-100)
- **Text Secondary:** `#CBD5E1` (Slate-300)
- **Text Muted:** `#64748B` (Slate-500)
- **Background:** `#0F172A` (Slate-950)
- **Surface:** `#1E293B` (Slate-800)
- **Border:** `#334155` (Slate-700)

## Typography

### Font Stack
- **Display/Headlines:** Inter, system font stack
- **Body/UI:** Inter, system font stack
- **Monospace:** IBM Plex Mono, "Courier New"

### Type Scale
- **H1:** 36px, 700, line-height 1.2
- **H2:** 28px, 700, line-height 1.3
- **H3:** 24px, 600, line-height 1.3
- **H4:** 20px, 600, line-height 1.4
- **Body Large:** 16px, 500, line-height 1.6
- **Body Base:** 14px, 500, line-height 1.6
- **Body Small:** 12px, 400, line-height 1.5
- **Label:** 12px, 600, line-height 1.4, uppercase, letter-spacing 0.05em

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing System

Using 4px base unit:
- **xs:** 4px (0.25rem)
- **sm:** 8px (0.5rem)
- **md:** 12px (0.75rem)
- **lg:** 16px (1rem)
- **xl:** 24px (1.5rem)
- **2xl:** 32px (2rem)
- **3xl:** 48px (3rem)
- **4xl:** 64px (4rem)

## Border & Shadows

### Border Radius
- **sm:** 4px
- **md:** 8px
- **lg:** 12px
- **xl:** 16px
- **2xl:** 20px
- **full:** 9999px

### Shadows
- **sm:** 0 1px 2px 0 rgb(0 0 0 / 0.05)
- **md:** 0 4px 6px -1px rgb(0 0 0 / 0.1)
- **lg:** 0 10px 15px -3px rgb(0 0 0 / 0.1)
- **xl:** 0 20px 25px -5px rgb(0 0 0 / 0.1)

## Interactive Elements

### Buttons
- **Primary:** bg-blue-600, text-white, hover:bg-blue-700
- **Secondary:** bg-gray-100, text-gray-900, hover:bg-gray-200
- **Tertiary:** border border-gray-300, text-gray-900, hover:bg-gray-50
- **Minimal:** text-blue-600, hover:underline

### Input Fields
- **Border:** border-gray-300
- **Focus:** focus:ring-2 focus:ring-blue-500 focus:border-transparent
- **Disabled:** bg-gray-50, opacity-50, cursor-not-allowed

### Cards
- **Default:** bg-white, border border-gray-200, rounded-lg shadow-sm
- **Elevated:** bg-white, border border-gray-200, rounded-xl shadow-lg
- **Glass:** bg-white/80, backdrop-blur-sm, border border-gray-200

## Animations & Transitions

### Motion
- **Fast:** 150ms
- **Normal:** 200ms
- **Slow:** 300ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)

### Standard Transitions
- Colors: `transition-colors duration-200`
- All: `transition-all duration-200`
- Shadows: `transition-shadow duration-200`

## Components

### Navigation
- Floating navbar with spacing: `top-4 left-4 right-4`
- Sticky header with backdrop blur
- Breadcrumb for hierarchy

### Search Input
- Full width on mobile, max-w-2xl on desktop
- Icon on right side with `absolute right-4 top-1/2 -translate-y-1/2`
- Clear placeholder text

### Profile Cards
- Avatar: 96x96px (Phase 1), rounded-full
- Name: H1 or H2 weight
- Metadata: caption text with icons
- Fields grid: 2 columns on desktop, 1 on mobile

### Links & CTAs
- External links with icon indicator
- Hover underline or color change
- All clickable elements: `cursor-pointer`

## Icons

### Guidelines
- Use Lucide React icons (24x24 viewBox)
- Classes: `w-6 h-6` for standard size, `w-4 h-4` for small
- NO emoji icons as UI elements
- Consistent icon set across app
- Color: inherit or specify with `text-gray-400`

### Common Icons
- External Link: `<ExternalLink />`
- Search: `<Search />`
- Network: `<Network />`
- Arrow Left: `<ArrowLeft />`
- Menu: `<Menu />`
- X: `<X />`

## Anti-Patterns to Avoid

❌ **Don't:**
- Use emojis as UI icons (🎨 🚀 ⚙️)
- Mix emoji and SVG icons
- Leave default cursor on interactive elements
- Use `scale-*` on hover (causes layout shift)
- Apply color changes without transition
- Use glass effect with low opacity in light mode
- Use gray-400 for body text (too light)
- Stack navbar to `top-0 left-0 right-0` without floating
- Hide content behind fixed elements
- Mix different max-width values inconsistently

✅ **Do:**
- Use Lucide React icons consistently
- Add `cursor-pointer` to all interactive elements
- Use `transition-colors duration-200` for smooth changes
- Keep hover states visually distinct
- Use `bg-white/80` for glass effect in light mode
- Use slate-900 or darker for text
- Float navbar with proper spacing
- Account for fixed navbar height with padding
- Use consistent container widths (max-w-4xl, max-w-6xl)
- Test light and dark modes before delivery

## Responsive Breakpoints

- **Mobile:** 375px
- **Tablet:** 768px
- **Desktop:** 1024px
- **Large Desktop:** 1440px

Mobile-first approach:
- Base styles for mobile
- `md:` for tablet (768px+)
- `lg:` for desktop (1024px+)
- `xl:` for large (1440px+)

## Accessibility

### WCAG AA Compliance
- Minimum contrast ratio 4.5:1 for text
- Focus states visible on all interactive elements
- Color not sole indicator (use icons, text, patterns)
- All images have descriptive alt text
- Form labels associated with inputs
- Semantic HTML structure
- Keyboard navigation support

### Motion
- Respect `prefers-reduced-motion`
- Animations max 300ms for snappy feel
- No auto-playing animations

## Light/Dark Mode

### Strategy
- Light mode default
- Dark mode support via class
- Tested contrast in both modes
- Proper border visibility in both
- Glass effect visibility in both

### Implementation
- Use Tailwind's `dark:` prefix
- Test all components in both modes
- Borders: `border-gray-200` (light), `dark:border-gray-700` (dark)
- Text: `text-gray-900` (light), `dark:text-gray-100` (dark)
- Surface: `bg-white` (light), `dark:bg-slate-900` (dark)
