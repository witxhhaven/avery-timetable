function WeekBadge({ weekType, schoolWeek }) {
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
