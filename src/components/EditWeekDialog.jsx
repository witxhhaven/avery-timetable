import { useState, useEffect } from 'react'

function EditWeekDialog({ isOpen, currentWeekType, onSave, onCancel }) {
  const [selectedWeekType, setSelectedWeekType] = useState(currentWeekType)

  useEffect(() => {
    setSelectedWeekType(currentWeekType)
  }, [currentWeekType, isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    onSave(selectedWeekType)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-warm max-w-md w-full mx-4 animate-slide-up border-4 border-warm-peach/40">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">✏️</span>
          <h2 className="text-2xl font-display font-bold text-gradient-warm">
            Edit Week Type
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 font-body mb-6">
          Update the week type to match your school schedule:
        </p>

        {/* Week Type Selection */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => setSelectedWeekType('even')}
            className={`w-full p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
              selectedWeekType === 'even'
                ? 'bg-gradient-to-r from-warm-coral to-warm-sunset text-white border-warm-sunset shadow-warm'
                : 'bg-white border-warm-peach/40 text-gray-700 hover:border-warm-coral'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌅</span>
                <span className="font-display font-semibold text-lg">Even Week</span>
              </div>
              {selectedWeekType === 'even' && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedWeekType('odd')}
            className={`w-full p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
              selectedWeekType === 'odd'
                ? 'bg-gradient-to-r from-warm-amber to-warm-honey text-gray-800 border-warm-honey shadow-warm'
                : 'bg-white border-warm-peach/40 text-gray-700 hover:border-warm-amber'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌻</span>
                <span className="font-display font-semibold text-lg">Odd Week</span>
              </div>
              {selectedWeekType === 'odd' && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-full font-body font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 rounded-full font-body font-semibold bg-gradient-to-r from-warm-coral to-warm-sunset text-white shadow-warm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditWeekDialog
