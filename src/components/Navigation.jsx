function Navigation({ onPrevious, onNext, onToday }) {
  return (
    <div className="flex justify-center items-center gap-4 animate-fade-in">
      <button
        onClick={onPrevious}
        className="btn-warm flex items-center gap-2"
        aria-label="Previous day"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Yesterday
      </button>

      <button
        onClick={onToday}
        className="btn-warm px-8 bg-gradient-to-r from-warm-coral to-warm-sunset text-white hover:from-warm-sunset hover:to-warm-coral"
      >
        <span className="mr-2">🏠</span>
        Today
      </button>

      <button
        onClick={onNext}
        className="btn-warm flex items-center gap-2"
        aria-label="Next day"
      >
        Tomorrow
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Navigation
