import { format, addDays, startOfWeek } from 'date-fns'

interface WeekNavigatorProps {
  currentDate: Date
}

export function WeekNavigator({ currentDate }: WeekNavigatorProps) {
  const weekStart = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className={`p-2 rounded-lg ${
            format(day, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
              ? 'bg-blue-100 font-semibold'
              : ''
          }`}
        >
          <div className="text-sm text-gray-500">{format(day, 'EEE')}</div>
          <div className="text-lg">{format(day, 'd')}</div>
        </div>
      ))}
    </div>
  )
}

