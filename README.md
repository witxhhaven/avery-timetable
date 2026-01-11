# 🌅 Avery School Calendar

A warm, student-friendly school calendar application with even/odd week tracking and daily schedule display.

## Features

- **Beautiful Design**: Warm sunrise-inspired colors and friendly typography
- **Week Tracking**: Automatic even/odd week calculation based on reference date
- **Daily Schedules**: View your complete schedule for each day
- **Easy Navigation**: Previous day, next day, and today buttons
- **Persistent Storage**: All changes saved to file (survives restarts)
- **Weekend Detection**: Special display for Saturday and Sunday

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Fonts**: Fredoka (display) + Nunito (body)
- **Storage**: JSON file-based persistence

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 3. Open in Browser

Navigate to http://localhost:3000 to use the calendar!

## Project Structure

```
avery-calendar/
├── src/
│   ├── components/
│   │   ├── DateDisplay.jsx      # Date display component
│   │   ├── WeekBadge.jsx        # Even/Odd week indicator
│   │   ├── Navigation.jsx       # Navigation buttons
│   │   ├── Schedule.jsx         # Daily schedule display
│   │   └── EditWeekDialog.jsx   # Week type editor
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind styles
├── server/
│   └── index.js                 # Express backend
├── data/
│   └── calendar-config.json     # Configuration storage
├── intructions/
│   └── calendar-config.json     # Default configuration
└── index.html                   # HTML entry point
```

## Configuration

The application uses `data/calendar-config.json` for storing:
- Week settings (reference date and type)
- Complete schedules for even and odd weeks

### Week Calculation

The app calculates whether any date is an even or odd week based on:
- A reference date (e.g., "2026-01-11")
- The week type for that reference date (e.g., "even")

It counts weeks between the current date and reference date to determine the week type.

### Editing Week Type

Click on the week badge to open the edit dialog and manually set the week type for the current date. This updates the reference date and recalculates all future weeks.

## Design Philosophy

**"Sunrise Planner"** - A warm, encouraging interface that makes checking your school schedule feel friendly and approachable:

- **Warm Color Palette**: Peachy corals, sunset oranges, and sunny ambers
- **Friendly Typography**: Rounded, welcoming fonts
- **Playful Elements**: Emoji decorations, soft shadows, gentle animations
- **Student-Focused**: Clear, easy-to-read layout with encouraging messages

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  warm: {
    cream: '#FFF8F0',
    peach: '#FFB4A2',
    coral: '#FF8C7A',
    // ... more colors
  }
}
```

### Fonts

Change fonts in `index.html` (Google Fonts link) and `tailwind.config.js`:

```javascript
fontFamily: {
  display: ['YourFont', 'sans-serif'],
  body: ['YourFont', 'sans-serif'],
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- Dark mode support
- Print schedule functionality
- Mobile app version
- Multi-user support
- Cloud sync
- Homework tracking

## License

Private educational use.

---

Made with 💖 for students everywhere!
