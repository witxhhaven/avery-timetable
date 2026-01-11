function Schedule({ schedule, dayOfWeek }) {
  // Weekend handling
  if (!schedule) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-warm border-4 border-warm-amber/40 text-center">
        <div className="text-6xl mb-6 animate-bounce-soft">🎉</div>
        <h2 className="text-4xl font-display font-bold text-gradient-sunny mb-4">
          No School Today!
        </h2>
        <p className="text-xl font-body text-gray-600">
          Enjoy your weekend! Time to relax and have fun! 🌈
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-warm border-4 border-warm-peach/40">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-warm-peach/30">
        <span className="text-3xl">📖</span>
        <h2 className="text-3xl font-display font-bold text-gradient-warm">
          {dayOfWeek}'s Schedule
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
        {[...new Set(schedule.map(period => period.subject))].filter(subject => !subject.toLowerCase().includes('recess')).map((subject, index) => {
          const isSpecial = subject.includes('(')
          const hasRecess = subject.toLowerCase().includes('recess')

          return (
            <div
              key={index}
              className="schedule-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                {/* Icon based on subject */}
                <div className="text-3xl">
                  {hasRecess ? '☀️' :
                   subject.includes('English') ? '📝' :
                   subject.includes('Math') ? '🔢' :
                   subject.includes('PE') ? '⚽' :
                   subject.includes('Art') ? '🎨' :
                   subject.includes('Music') ? '🎵' :
                   subject.includes('Mother Tongue') ? '🗣️' :
                   subject.includes('Science') || subject.includes('STEM') ? '🔬' :
                   '📚'}
                </div>

                {/* Subject */}
                <div>
                  <div className="font-body font-bold text-gray-800 text-base">
                    {subject}
                  </div>
                </div>

                {/* Special indicator */}
                {isSpecial && !hasRecess && (
                  <div className="text-sm">⭐</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer encouragement */}
      <div className="mt-6 pt-6 border-t-2 border-warm-peach/30 text-center">
        <p className="text-lg font-display text-gray-600">
          You've got this! 💪 Have a great day!
        </p>
      </div>
    </div>
  )
}

export default Schedule
