# Avery School Calendar

A warm, student-friendly school calendar application with even/odd week tracking and daily schedule display.

## Features

- **Beautiful Design**: Warm sunrise-inspired colors and friendly typography
- **Week Tracking**: School week numbers (Week 1-52) with even/odd week display
- **Daily Schedules**: View your complete schedule for each day
- **Easy Navigation**: Previous day, next day, and today buttons
- **Weekend Display**: Shows day name on Saturdays and Sundays

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Fonts**: Fredoka (display) + Nunito (body)
- **Data**: Static JSON files (no backend required)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

```bash
npm run dev
```

### 3. Open in Browser

Navigate to http://localhost:3000 to use the calendar!

## Project Structure

```
avery-calendar/
├── src/
│   ├── components/
│   │   ├── DateDisplay.jsx      # Date display component
│   │   ├── WeekBadge.jsx        # Week type and number indicator
│   │   ├── Navigation.jsx       # Navigation buttons
│   │   └── Schedule.jsx         # Daily schedule display
│   ├── data/
│   │   ├── schedules.json       # Timetables for odd/even weeks
│   │   └── weeks-2026.json      # School week tracking (Week 1-52)
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind styles
└── index.html                   # HTML entry point
```

## Data Files

### schedules.json

Contains the timetables for both odd and even weeks:

```json
{
  "odd": {
    "Monday": [
      { "time": "7:35 - 8:05", "subject": "English" },
      ...
    ],
    ...
  },
  "even": {
    "Monday": [...],
    ...
  }
}
```

### weeks-2026.json

Contains all 52 school weeks with their dates and types:

```json
{
  "year": 2026,
  "startDate": "2026-01-05",
  "weeks": [
    { "date": "2026-01-05", "schoolWeek": 1, "weekType": "odd" },
    { "date": "2026-01-12", "schoolWeek": 2, "weekType": "even" },
    ...
  ]
}
```

- **Week 1** starts on January 5, 2026 (first Monday of the year)
- Week types alternate: odd, even, odd, even...

## Design Philosophy

**"Sunrise Planner"** - A warm, encouraging interface that makes checking your school schedule feel friendly and approachable:

- **Warm Color Palette**: Peachy corals, sunset oranges, and sunny ambers
- **Friendly Typography**: Rounded, welcoming fonts
- **Playful Elements**: Emoji decorations, soft shadows, gentle animations
- **Student-Focused**: Clear, easy-to-read layout with encouraging messages

## Customization

### Updating Schedules

Edit `src/data/schedules.json` to change the timetable for any day.

### Updating Week Types

Edit `src/data/weeks-2026.json` to adjust which weeks are odd/even.

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

## License

Private educational use.

---

Made with love for students everywhere!
