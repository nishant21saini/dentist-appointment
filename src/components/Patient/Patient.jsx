import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, User, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PatientPortal = () => {
  const [activeView, setActiveView] = useState('upcoming');
  const [patientData, setPatientData] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true" || localStorage.getItem("role") !== "Patient") {
        navigate('/signin');
    }
}, [navigate]);
  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patientData"));
    const upcoming = JSON.parse(localStorage.getItem("upcomingAppointments")) || [];
    const history = JSON.parse(localStorage.getItem("medicalHistory")) || [];
    setPatientData(patient);
    setUpcomingAppointments(upcoming);
    setMedicalHistory(history);
  }, []);

  const AppointmentCard = ({ appointment, isUpcoming = true }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
          <p className="text-gray-600">with {appointment.doctor}</p>
        </div>
        {isUpcoming && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Upcoming
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2 text-blue-500" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock size={16} className="mr-2 text-green-500" />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign size={16} className="mr-2 text-purple-500" />
          <span>{appointment.cost}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">📍</span>
          <span>{appointment.location}</span>
        </div>
      </div>
      {appointment.treatment && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Treatment Summary:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{appointment.treatment}</p>
          {appointment.diagnosis && (
            <p className="text-sm text-blue-600 mt-2 font-medium">Diagnosis: {appointment.diagnosis}</p>
          )}
        </div>
      )}
    </div>
  );

  if (!patientData) {
    return <p className="text-center py-16 text-gray-600">Loading patient data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-lg p-3 mr-4">
                <User size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Health Portal</h1>
                <p className="text-sm text-gray-600">Personal medical information</p>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Shield size={20} className="mr-2" />
              <span className="text-sm">Secure Access</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-600" />
            My Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">{patientData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Patient ID</p>
              <p className="font-medium text-gray-900">{patientData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
              <p className="font-medium text-gray-900">{patientData.dob}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Phone Number</p>
              <p className="font-medium text-gray-900">{patientData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email Address</p>
              <p className="font-medium text-gray-900">{patientData.email}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveView('upcoming')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'upcoming'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Calendar size={18} className="mr-2" />
            Upcoming Appointments
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {upcomingAppointments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText size={18} className="mr-2" />
            Medical History
            <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {medicalHistory.length}
            </span>
          </button>
        </div>

        <div className="space-y-6">
          {activeView === 'upcoming' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} isUpcoming={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No upcoming appointments scheduled</p>
                </div>
              )}
            </div>
          )}

          {activeView === 'history' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical History</h2>
              {medicalHistory.length > 0 ? (
                <div className="space-y-4">
                  {medicalHistory.map((visit) => (
                    <AppointmentCard key={visit.id} appointment={visit} isUpcoming={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No medical history available</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Calendar size={32} className="mx-auto mb-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {upcomingAppointments.length}
            </h3>
            <p className="text-gray-600">Upcoming Appointments</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <FileText size={32} className="mx-auto mb-2 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {medicalHistory.length}
            </h3>
            <p className="text-gray-600">Past Visits</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <DollarSign size={32} className="mx-auto mb-2 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              ${medicalHistory.reduce((total, visit) => total + parseFloat(visit.cost.replace('$', '')), 0).toFixed(2)}
            </h3>
            <p className="text-gray-600">Total Medical Costs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
