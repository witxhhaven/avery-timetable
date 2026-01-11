# Setup Guide for Avery School Calendar

## Prerequisites

Before you begin, ensure you have the following installed:

### 1. Node.js and npm

**Check if installed:**
```bash
node --version
npm --version
```

**If not installed, download from:**
- https://nodejs.org/ (Download the LTS version)

**macOS Installation (using Homebrew):**
```bash
brew install node
```

**Windows Installation:**
- Download the installer from nodejs.org
- Run the installer and follow the prompts

**Verify installation:**
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

## Installation Steps

### Step 1: Install Dependencies

From the project root directory, run:

```bash
npm install
```

This will install all required packages:
- React and React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- Express (backend server)
- CORS (cross-origin requests)
- Concurrently (run multiple commands)

**Expected output:**
```
added XXX packages, and audited XXX packages in XXs
```

### Step 2: Verify Project Structure

Make sure you have these files:
```
avery-calendar/
├── src/
│   ├── components/
│   │   ├── DateDisplay.jsx
│   │   ├── WeekBadge.jsx
│   │   ├── Navigation.jsx
│   │   ├── Schedule.jsx
│   │   └── EditWeekDialog.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   └── index.js
├── intructions/
│   └── calendar-config.json
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### Step 3: Run the Application

Start both the frontend and backend servers:

```bash
npm run dev
```

This command runs:
- Frontend dev server on http://localhost:3000
- Backend API server on http://localhost:3001

**Expected output:**
```
╔════════════════════════════════════════╗
║   🌅 School Calendar Server Running   ║
║                                        ║
║   Backend: http://localhost:3001      ║
║   Status: ✅ Ready                     ║
╚════════════════════════════════════════╝

  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Step 4: Open in Browser

Navigate to:
```
http://localhost:3000
```

You should see:
- 🌅 A warm, colorful calendar interface
- The current date displayed prominently
- An even/odd week indicator
- Today's schedule (if it's a weekday)

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**Option 1: Stop the process using the port**
```bash
# Find process on port 3000
lsof -ti:3000 | xargs kill -9

# Find process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Option 2: Change the port**
Edit `vite.config.js`:
```javascript
server: {
  port: 3002,  // Change to any available port
  // ...
}
```

Edit `server/index.js`:
```javascript
const PORT = 3003  // Change to any available port
```

### Module Not Found Errors

If you see "Cannot find module" errors:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

If you see CORS errors in the browser console:
- Make sure both servers are running
- Check that the proxy is configured in `vite.config.js`
- Verify the backend is running on port 3001

### Config File Not Loading

If the calendar doesn't show schedules:
- Check that `intructions/calendar-config.json` exists
- The backend will automatically create `data/calendar-config.json` on first run
- Check browser console and server logs for errors

## Running Individual Servers

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Stopping the Application

Press `Ctrl + C` in the terminal where the dev server is running.

## Next Steps

Once the application is running:

1. **Test Navigation**: Use the Yesterday, Today, and Tomorrow buttons
2. **Change Week Type**: Click on the Even/Odd week badge
3. **View Schedules**: Navigate to different days to see schedules
4. **Check Persistence**: Change the week type, restart the server, and verify it persists

## Getting Help

If you encounter issues:

1. Check the browser console (F12) for frontend errors
2. Check the terminal for backend errors
3. Verify all files are in the correct locations
4. Make sure Node.js and npm are properly installed
5. Try clearing the browser cache

---

Enjoy your warm, friendly school calendar! 🌅📚
