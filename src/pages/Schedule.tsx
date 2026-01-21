import ScheduleComponent from '../components/Schedule'
import { SAMPLE_SCHEDULES, OPERATING_HOURS } from '../utils/constants'

const Schedule = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-4">Class Schedule</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our diverse range of classes designed to fit your schedule and fitness goals.
          All classes are led by certified instructors.
        </p>

        {/* Operating Hours */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-center mb-8">Operating Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Monday</span>
              <span className="text-gray-600">{OPERATING_HOURS.monday.open} - {OPERATING_HOURS.monday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Tuesday</span>
              <span className="text-gray-600">{OPERATING_HOURS.tuesday.open} - {OPERATING_HOURS.tuesday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Wednesday</span>
              <span className="text-gray-600">{OPERATING_HOURS.wednesday.open} - {OPERATING_HOURS.wednesday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Thursday</span>
              <span className="text-gray-600">{OPERATING_HOURS.thursday.open} - {OPERATING_HOURS.thursday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Friday</span>
              <span className="text-gray-600">{OPERATING_HOURS.friday.open} - {OPERATING_HOURS.friday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Saturday</span>
              <span className="text-gray-600">{OPERATING_HOURS.saturday.open} - {OPERATING_HOURS.saturday.close}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded hover:bg-gray-50 md:col-span-2">
              <span className="font-semibold text-gray-700">Sunday</span>
              <span className="text-red-600 font-semibold">{OPERATING_HOURS.sunday}</span>
            </div>
          </div>
        </div>

        {/* Class Schedule */}
        <div>
          <h2 className="text-center mb-8">Class Times</h2>
          <ScheduleComponent schedules={SAMPLE_SCHEDULES} />
        </div>
      </div>
    </div>
  )
}

export default Schedule
