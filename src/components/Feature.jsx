

export const Feature = () => {

const patientIconPath = "M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z";
const calendarIconPath = "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z";
const eyeIconPath = "M10 12a2 2 0 100-4 2 2 0 000 4zM.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z";
  return (
    <div>
    <section id="features" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Powerful Features
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
          Everything you need to manage your dental practice efficiently
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="bg-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d={patientIconPath} />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Management</h3>
          <p className="text-gray-600">
            Comprehensive patient records with medical history, treatment plans, and notes.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-indigo-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d={calendarIconPath} clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Appointment Scheduling</h3>
          <p className="text-gray-600">
            Intuitive calendar with reminders, availability tracking, and automated confirmations.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-purple-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d=eyeIconPath clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Treatment Tracking</h3>
          <p className="text-gray-600">
            Detailed treatment records with progress tracking and outcome analysis.
          </p>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}