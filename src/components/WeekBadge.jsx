function WeekBadge({ weekType, schoolWeek }) {
  if (!weekType) {
    return (
      <div className="badge-neutral flex items-center">
        <span className="text-lg">
          🍂 No School
          {schoolWeek && <span className="opacity-75"> · Week {schoolWeek}</span>}
        </span>
      </div>
    )
  }

  const isEven = weekType === 'even'

  return (
    <div className={`${isEven ? 'badge-even' : 'badge-odd'} flex items-center`}>
      <span className="text-lg">
        {isEven ? '🌅' : '🌻'} {isEven ? 'Even Week' : 'Odd Week'}
        {schoolWeek && <span className="opacity-75"> · Week {schoolWeek}</span>}
      </span>
    </div>
  )
}

export default WeekBadge
