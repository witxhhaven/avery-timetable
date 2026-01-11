function DateDisplay({ date }) {
  const year = date.getFullYear()
  const day = String(date.getDate()).padStart(2, '0')
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ]
  const month = months[date.getMonth()]

  return (
    <div className="date-card text-center transform transition-all duration-500 hover:scale-105">
      {/* Year - Mini */}
      <div className="text-xs md:text-sm font-body font-semibold text-gray-500 tracking-widest mb-2 md:mb-4">
        {year}
      </div>

      {/* Date - Large */}
      <div className="text-7xl md:text-9xl font-display font-bold text-gradient-warm mb-2 md:mb-4 animate-bounce-soft">
        {day}
      </div>

      {/* Month - Small */}
      <div className="text-lg md:text-xl font-body font-bold text-gray-700 tracking-wide">
        {month}
      </div>

      {/* Decorative line */}
      <div className="mt-4 md:mt-6 flex items-center justify-center gap-2">
        <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-transparent via-warm-coral to-transparent rounded-full"></div>
        <div className="text-xl md:text-2xl">✨</div>
        <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-transparent via-warm-coral to-transparent rounded-full"></div>
      </div>
    </div>
  )
}

export default DateDisplay
