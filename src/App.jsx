import { useState, useEffect } from 'react'
import DateDisplay from './components/DateDisplay'
import WeekBadge from './components/WeekBadge'
import Navigation from './components/Navigation'
import Schedule from './components/Schedule'
import EditWeekDialog from './components/EditWeekDialog'
import { defaultConfig } from './defaultConfig'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [config, setConfig] = useState(null)
  const [weekType, setWeekType] = useState('even')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load config on mount
  useEffect(() => {
    fetchConfig()
  }, [])

  // Calculate week type when date or config changes
  useEffect(() => {
    if (config) {
      const calculatedWeekType = calculateWeekType(currentDate, config.weekSettings)
      setWeekType(calculatedWeekType)
    }
  }, [currentDate, config])

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config')
      const data = await response.json()
      setConfig(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading config from API, using localStorage fallback:', error)
      // Fallback to localStorage for GitHub Pages
      const savedConfig = localStorage.getItem('calendar-config')
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig))
      } else {
        // Use default config if nothing is saved
        setConfig(defaultConfig)
        localStorage.setItem('calendar-config', JSON.stringify(defaultConfig))
      }
      setIsLoading(false)
    }
  }

  const calculateWeekType = (date, weekSettings) => {
    const referenceDate = new Date(weekSettings.referenceDate)
    const diffTime = Math.abs(date - referenceDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const weeksPassed = Math.floor(diffDays / 7)

    if (weeksPassed % 2 === 0) {
      return weekSettings.weekType
    } else {
      return weekSettings.weekType === 'even' ? 'odd' : 'even'
    }
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

  const handleSaveWeekType = async (newWeekType) => {
    const updatedConfig = {
      ...config,
      weekSettings: {
        referenceDate: currentDate.toISOString().split('T')[0],
        weekType: newWeekType
      }
    }

    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      })
      setConfig(updatedConfig)
      setWeekType(newWeekType)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving config to API, using localStorage fallback:', error)
      // Fallback to localStorage for GitHub Pages
      localStorage.setItem('calendar-config', JSON.stringify(updatedConfig))
      setConfig(updatedConfig)
      setWeekType(newWeekType)
      setIsDialogOpen(false)
    }
  }

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  }

  const getScheduleForDay = () => {
    if (!config) return []

    const dayName = getDayOfWeek(currentDate)

    // Weekend handling
    if (dayName === 'Saturday' || dayName === 'Sunday') {
      return null
    }

    return config.schedules[weekType]?.[dayName] || []
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl font-display text-gradient-warm mb-4">✨</div>
          <p className="text-2xl font-display text-warm-coral">Loading your schedule...</p>
        </div>
      </div>
    )
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
                weekType={weekType}
                onClick={() => setIsDialogOpen(true)}
              />
            </div>
          </div>

          {/* Schedule - Second on mobile */}
          <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Schedule
              schedule={getScheduleForDay()}
              dayOfWeek={getDayOfWeek(currentDate)}
            />
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditWeekDialog
        isOpen={isDialogOpen}
        currentWeekType={weekType}
        onSave={handleSaveWeekType}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

export default App
