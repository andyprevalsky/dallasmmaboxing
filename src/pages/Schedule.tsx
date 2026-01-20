import ScheduleComponent from '../components/Schedule'
import { SAMPLE_SCHEDULES } from '../utils/constants'

const Schedule = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-4">Class Schedule</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our diverse range of classes designed to fit your schedule and fitness goals.
          All classes are led by certified instructors.
        </p>
        <ScheduleComponent schedules={SAMPLE_SCHEDULES} />
      </div>
    </div>
  )
}

export default Schedule
