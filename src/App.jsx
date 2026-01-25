import { useState } from 'react'
import DateDisplay from './components/DateDisplay'
import WeekBadge from './components/WeekBadge'
import Navigation from './components/Navigation'
import Schedule from './components/Schedule'
import schedules from './data/schedules.json'
import weeksData from './data/weeks-2026.json'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get week info (schoolWeek and weekType) from JSON data
  const getWeekInfo = (date) => {
    // Get the Monday of the current week
    const getWeekMonday = (d) => {
      const dateObj = new Date(d)
      const day = dateObj.getDay()
      // If Sunday (0), go back 6 days; otherwise go back (day - 1) days
      const diff = day === 0 ? -6 : 1 - day
      dateObj.setDate(dateObj.getDate() + diff)
      return dateObj.toISOString().split('T')[0]
    }

    const mondayOfWeek = getWeekMonday(date)
    const weekEntry = weeksData.weeks.find(w => w.date === mondayOfWeek)

    if (weekEntry) {
      return { schoolWeek: weekEntry.schoolWeek, weekType: weekEntry.weekType }
    }

    // Fallback for dates outside 2026
    return { schoolWeek: null, weekType: 'odd' }
  }

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  }

  const getScheduleForDay = () => {
    const dayName = getDayOfWeek(currentDate)

    // Weekend handling
    if (dayName === 'Saturday' || dayName === 'Sunday') {
      return null
    }

    const { weekType } = getWeekInfo(currentDate)
    return schedules[weekType]?.[dayName] || []
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block fixed top-10 right-10 text-6xl opacity-20 animate-float">🌅</div>
      <div className="hidden md:block fixed bottom-10 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>📚</div>
      <div className="hidden md:block fixed top-1/2 left-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>⭐</div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-warm mb-2">
            My School Calendar
          </h1>
          <p className="text-base md:text-lg font-body text-gray-600">Your daily schedule, made friendly!</p>
        </div>

        {/* Navigation */}
        <Navigation
          onPrevious={handlePreviousDay}
          onNext={handleNextDay}
          onToday={handleToday}
        />

        {/* Main Content - Stack on mobile, two columns on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 md:gap-8 mt-6 md:mt-8">
          {/* Date Display - First on mobile */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <DateDisplay date={currentDate} />

            <div className="mt-4 md:mt-6 flex justify-center">
              <WeekBadge
                weekType={getWeekInfo(currentDate).weekType}
                schoolWeek={getWeekInfo(currentDate).schoolWeek}
              />
            </div>
          </div>

          {/* Schedule - Second on mobile */}
          <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Schedule
              schedule={getScheduleForDay()}
              dayOfWeek={getDayOfWeek(currentDate)}
              currentDate={currentDate}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
