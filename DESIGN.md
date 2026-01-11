# 🎨 Design Documentation

## Design Vision: "Sunrise Planner"

A warm, student-friendly calendar application that makes checking school schedules feel welcoming and encouraging.

## Design Principles

### 1. Warmth & Approachability
- Soft, warm colors inspired by sunrise (peachy corals, sunny ambers)
- Rounded corners throughout for a friendly feel
- Gentle shadows instead of harsh borders
- Playful emoji decorations

### 2. Student-Focused
- Clear, easy-to-read typography
- Large, prominent date display
- Organized schedule view with subject icons
- Encouraging messages ("You've got this!")

### 3. Visual Hierarchy
- **Primary Focus**: Large date number (96px)
- **Secondary**: Week indicator and schedule
- **Tertiary**: Navigation buttons and metadata

## Color Palette

### Warm Colors
- **Cream Background**: `#FFF8F0` - Soft, warm base
- **Peach**: `#FFB4A2` - Gentle accent
- **Coral**: `#FF8C7A` - Primary brand color
- **Sunset**: `#FF6B6B` - Bold accent
- **Amber**: `#FFD93D` - Sunny highlight
- **Honey**: `#FFC857` - Warm golden

### Usage
- **Even Week Badge**: Coral to Sunset gradient
- **Odd Week Badge**: Amber to Honey gradient
- **Buttons**: White with coral hover
- **Background**: Cream with subtle gradients

## Typography

### Fonts
- **Display Font**: Fredoka
  - Modern, rounded, friendly
  - Used for: Headlines, date number, week badge

- **Body Font**: Nunito
  - Clean, readable, approachable
  - Used for: Schedule items, buttons, body text

### Type Scale
- **Date Number**: 96px (6rem) - Extra bold
- **Page Title**: 48px (3rem) - Bold
- **Section Headers**: 32px (2rem) - Semi-bold
- **Schedule Items**: 18px (1.125rem) - Regular
- **Metadata**: 14px (0.875rem) - Regular

## Components

### 1. Date Display Card
```
┌────────────────────┐
│      2026          │ (14px, gray)
│       15           │ (96px, gradient)
│    JANUARY         │ (20px, bold)
│    ✨ ─── ✨       │ (decorative)
└────────────────────┘
```

**Features:**
- White card with warm shadow
- Coral/sunset gradient on date number
- Subtle bounce animation
- Hover effect (slight scale)

### 2. Week Badge
```
┌──────────────────┐
│ 🌅 Even Week  ✏️ │ (Coral gradient)
└──────────────────┘

┌──────────────────┐
│ 🌻 Odd Week   ✏️ │ (Amber gradient)
└──────────────────┘
```

**Features:**
- Rounded pill shape
- Emoji icon for visual interest
- Edit icon on hover
- Clickable with scale effect
- Gradient background matching week type

### 3. Navigation Buttons
```
[← Yesterday]  [🏠 Today]  [Tomorrow →]
```

**Features:**
- Rounded full buttons
- White background, coral accent
- Icon indicators
- Hover effects (scale, shadow)
- "Today" button has gradient background

### 4. Schedule Display
```
┌────────────────────────────────┐
│ 📖 Monday's Schedule           │
├────────────────────────────────┤
│  ┌──────────────────────────┐  │
│  │ 📝  English           ⭐ │  │
│  │     7:35 - 8:05          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🔢  Math                 │  │
│  │     8:05 - 8:35          │  │
│  └──────────────────────────┘  │
│                                │
│  ...more periods...            │
│                                │
├────────────────────────────────┤
│ You've got this! 💪            │
└────────────────────────────────┘
```

**Features:**
- Subject-specific emoji icons
- Special indicator (⭐) for special periods
- Soft card design with borders
- Hover effects on each period
- Encouraging footer message
- Scrollable for long schedules

### 5. Weekend Display
```
┌────────────────────────────────┐
│            🎉                  │
│                                │
│     No School Today!           │
│                                │
│  Enjoy your weekend! 🌈        │
└────────────────────────────────┘
```

**Features:**
- Sunny gradient (amber to honey)
- Large emoji with bounce animation
- Cheerful messaging
- Different style from weekday display

### 6. Edit Week Dialog
```
┌──────────────────────────────┐
│ ✏️ Edit Week Type            │
├──────────────────────────────┤
│ Update the week type...      │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌅 Even Week         ✓   │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌻 Odd Week              │ │
│ └──────────────────────────┘ │
│                              │
│  [Cancel]  [Save Changes]    │
└──────────────────────────────┘
```

**Features:**
- Modal overlay with blur backdrop
- Rounded corners
- Large selectable cards
- Visual checkmark on selected option
- Gradient on selected option
- Two action buttons

## Animations

### Micro-interactions
- **Float**: Decorative emojis gently float up and down (3s cycle)
- **Slide Up**: Content slides up on load (0.4s)
- **Fade In**: Smooth fade in (0.5s)
- **Bounce Soft**: Gentle scale pulse (2s cycle)
- **Hover Scale**: Elements grow slightly on hover (1.05x)

### Stagger Pattern
Elements animate in sequence with delays:
- Header: 0s
- Navigation: 0.1s
- Date card: 0.15s
- Schedule: 0.2s

### Transitions
- All interactions: 300ms ease
- Smooth color transitions
- Transform transitions for scale/translate

## Layout

### Desktop (>1024px)
```
┌─────────────────────────────────────────┐
│         My School Calendar              │
│    Your daily schedule, made friendly!  │
│                                         │
│  [← Yesterday] [🏠 Today] [Tomorrow →] │
│                                         │
│  ┌─────────────┐  ┌──────────────────┐ │
│  │             │  │                  │ │
│  │    DATE     │  │    SCHEDULE      │ │
│  │   DISPLAY   │  │     DISPLAY      │ │
│  │             │  │                  │ │
│  │  Week Badge │  │                  │ │
│  └─────────────┘  └──────────────────┘ │
│   (40% width)       (60% width)        │
└─────────────────────────────────────────┘
```

### Mobile (<1024px)
```
┌──────────────────┐
│  Calendar Title  │
│                  │
│   Navigation     │
│                  │
│   Date Display   │
│   Week Badge     │
│                  │
│ Schedule Display │
│                  │
└──────────────────┘
```

## Decorative Elements

### Background
- Gradient: Cream → Orange-50 → Peach
- Radial gradient overlays for depth
- Subtle texture effect

### Floating Emojis
- 🌅 (top-right)
- 📚 (bottom-left)
- ⭐ (middle-left)
- Gentle floating animation
- Low opacity (20%)

### Scrollbar (Webkit)
- Warm gradient thumb (peach → coral)
- Cream track
- Rounded edges

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Dark text on light backgrounds
- White text only on dark gradients

### Interactive Elements
- Clear hover states
- Focus indicators
- Large click targets (44px minimum)
- Semantic HTML

### Typography
- Readable font sizes (14px minimum)
- Good line height (1.5-1.6)
- Clear hierarchy

## Implementation Notes

### CSS Custom Properties
All colors defined in Tailwind config for consistency and easy theming.

### Component Architecture
- Small, focused components
- Props for configuration
- Consistent styling patterns
- Reusable class names

### Performance
- CSS animations (no JavaScript)
- Minimal re-renders
- Optimized images/fonts
- Lazy loading where appropriate

---

This design creates a warm, encouraging environment that makes students feel good about checking their schedules!
