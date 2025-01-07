import { useState } from 'react'
import { format } from 'date-fns'
import { X } from 'lucide-react'

interface DayModalProps {
  date: Date
  onClose: () => void
}

export default function DayModal({ date, onClose }: DayModalProps) {
  const [workout, setWorkout] = useState('')
  const [nutrition, setNutrition] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your backend
    console.log('Saving data:', { date, workout, nutrition })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{format(date, 'MMMM d, yyyy')}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="workout" className="block text-sm font-medium text-gray-700">
              Workout
            </label>
            <textarea
              id="workout"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows={3}
              placeholder="Enter your workout details"
            />
          </div>
          <div>
            <label htmlFor="nutrition" className="block text-sm font-medium text-gray-700">
              Nutrition
            </label>
            <textarea
              id="nutrition"
              value={nutrition}
              onChange={(e) => setNutrition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows={3}
              placeholder="Enter your nutrition details"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

