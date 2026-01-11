function Navigation({ onPrevious, onNext, onToday }) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 animate-fade-in">
      <button
        onClick={onPrevious}
        className="btn-warm flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-6"
        aria-label="Previous day"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <button
        onClick={onToday}
        className="btn-warm px-4 md:px-8 text-sm md:text-base border-2 border-warm-coral hover:border-warm-sunset"
      >
        <span className="mr-1 md:mr-2">🏠</span>
        Today
      </button>

      <button
        onClick={onNext}
        className="btn-warm flex items-center gap-1 md:gap-2 text-sm md:text-base px-3 md:px-6"
        aria-label="Next day"
      >
        Next
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Navigation
