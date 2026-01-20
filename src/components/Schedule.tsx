import { ClassSchedule } from '../types'

interface ScheduleProps {
  schedules: ClassSchedule[]
}

const Schedule = ({ schedules }: ScheduleProps) => {
  const getDisciplineColor = (discipline: string): string => {
    const colors: { [key: string]: string } = {
      Boxing: 'bg-red-100 text-red-800',
      'Muay Thai': 'bg-blue-100 text-blue-800',
      MMA: 'bg-purple-100 text-purple-800',
      'Brazilian Jiu-Jitsu': 'bg-green-100 text-green-800',
    }
    return colors[discipline] || 'bg-gray-100 text-gray-800'
  }

  const getLevelColor = (level: string): string => {
    const colors: { [key: string]: string } = {
      Beginner: 'bg-green-500',
      Intermediate: 'bg-yellow-500',
      Advanced: 'bg-red-500',
      'All Levels': 'bg-blue-500',
    }
    return colors[level] || 'bg-gray-500'
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{schedule.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getDisciplineColor(
                    schedule.discipline
                  )}`}
                >
                  {schedule.discipline}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Instructor: {schedule.instructor}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Day:</span>
                  {schedule.day}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Time:</span>
                  {schedule.time}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Duration:</span>
                  {schedule.duration} min
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${getLevelColor(schedule.level)}`}
                  title={schedule.level}
                />
                <span className="text-sm font-medium">{schedule.level}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Schedule
