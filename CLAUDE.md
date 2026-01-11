# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev              # Start both frontend (port 3000) and backend (port 3001)
npm run dev:frontend     # Start only Vite dev server
npm run dev:backend      # Start only Express server
```

### Build Commands
```bash
npm run build            # Create production build
npm run preview          # Preview production build
```

## Architecture Overview

### Frontend-Backend Architecture
This is a client-server application with a React frontend and Express backend:

- **Frontend**: React app built with Vite, serves UI at http://localhost:3000
- **Backend**: Express server at http://localhost:3001, handles config persistence
- **Communication**: Frontend proxies `/api/*` requests to backend (configured in vite.config.js:8-13)

### State Management & Week Calculation
The app's core logic centers on calculating even/odd weeks:

1. **Reference Date System**: The backend stores a reference date and its week type in `data/calendar-config.json`
2. **Week Calculation Algorithm** (App.jsx:40-51):
   - Calculates days between current date and reference date
   - Converts to weeks passed
   - Alternates week type based on even/odd week count
3. **State Flow**: Config loaded from backend → Week type calculated in frontend → Display updated

### Data Persistence
- **Runtime Config**: `data/calendar-config.json` (created on first run, persisted across restarts)
- **Default Config**: `intructions/calendar-config.json` (backup template, copied to data/ on initialization)
- **Backend Initialization** (server/index.js:21-44): On startup, ensures data directory exists and copies default config if needed

### Configuration Structure
The `calendar-config.json` contains:
- `weekSettings`: Reference date and week type for calculations
- `schedules.even`: Schedule objects for each weekday during even weeks
- `schedules.odd`: Schedule objects for each weekday during odd weeks

Each schedule entry has `time` and `subject` properties. Special subjects include: "Recess", "Assembly", "(Spelling)", "CCE (FTGP)", etc.

## Component Architecture

### Component Hierarchy
```
App.jsx (main state container)
├── DateDisplay.jsx (shows date with gradient styling)
├── WeekBadge.jsx (clickable even/odd week indicator)
├── Navigation.jsx (previous/today/next day buttons)
├── Schedule.jsx (displays daily schedule or weekend message)
└── EditWeekDialog.jsx (modal for changing week type)
```

### Key State Management (App.jsx)
- `currentDate`: The date being viewed (defaults to today)
- `config`: Loaded from backend, contains weekSettings and schedules
- `weekType`: Calculated value ('even' or 'odd') based on currentDate and config
- `isDialogOpen`: Controls EditWeekDialog visibility

### API Integration
The app uses two endpoints:
- `GET /api/config`: Fetch configuration on load
- `POST /api/config`: Save updated configuration (triggered when editing week type)

## Design System

### Color Scheme ("Sunrise Planner")
The app uses a warm, student-friendly design with:
- Even weeks: Coral to Sunset gradient (#FF8C7A → #FF6B6B)
- Odd weeks: Amber to Honey gradient (#FFD93D → #FFC857)
- Background: Warm cream (#FFF8F0)

Colors are defined in tailwind.config.js. See DESIGN.md for complete design documentation.

### Typography
- Display font: Fredoka (rounded, friendly) - used for headers, dates, badges
- Body font: Nunito (clean, readable) - used for schedules, buttons, text

Fonts loaded via Google Fonts in index.html.

### Custom Animations
Defined in index.css:
- `animate-float`: Gentle up/down motion for decorative emojis
- `animate-slide-up`: Entry animation with stagger delays
- `animate-fade-in`: Opacity transition
- `animate-bounce-soft`: Subtle scale pulse

## Important Implementation Details

### Weekend Handling
The app detects weekends (App.jsx:105-107) and returns `null` for the schedule, which triggers the Schedule component to show a special weekend message instead of the schedule grid.

### Week Type Editing
When the WeekBadge is clicked:
1. Dialog opens with current week type selected
2. User selects new week type
3. On save, the current date becomes the new reference date with the selected type
4. This recalculates all past and future weeks relative to the new reference

### Data Flow for Week Changes
```
User clicks badge → Dialog opens → User selects type →
handleSaveWeekType updates config with new reference date →
POST to /api/config → Backend saves to file →
Frontend re-fetches → Week type recalculated
```

### Port Configuration
- Frontend: 3000 (vite.config.js:7)
- Backend: 3001 (server/index.js:11)
- Proxy setup in vite.config.js routes `/api` requests from frontend to backend

## File Locations

### Critical Files
- Main app logic: `src/App.jsx`
- Backend server: `server/index.js`
- Config storage: `data/calendar-config.json` (runtime, gitignored)
- Default config: `intructions/calendar-config.json` (version controlled)
- Styling: `src/index.css` (custom animations) and `tailwind.config.js` (theme)

### Component Files
All React components are in `src/components/`:
- DateDisplay.jsx, WeekBadge.jsx, Navigation.jsx, Schedule.jsx, EditWeekDialog.jsx
