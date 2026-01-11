function WeekBadge({ weekType, onClick }) {
  const isEven = weekType === 'even'

  return (
    <div
      onClick={onClick}
      className={`${isEven ? 'badge-even' : 'badge-odd'} flex items-center gap-3 group`}
    >
      <span className="text-lg">
        {isEven ? '🌅' : '🌻'} {isEven ? 'Even Week' : 'Odd Week'}
      </span>
      <svg
        className="w-5 h-5 transition-transform group-hover:rotate-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </div>
  )
}

export default WeekBadge
