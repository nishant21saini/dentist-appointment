import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Activity,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const navigate = useNavigate();

  const [kpiData, setKpiData] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [topPatients, setTopPatients] = useState([]);
  const [recentTreatments, setRecentTreatments] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role !== "Doctor") {
      navigate('/signin');
    }

    setKpiData(JSON.parse(localStorage.getItem("doctorKPI")) || {});
    setUpcomingAppointments(JSON.parse(localStorage.getItem("doctorAppointments")) || []);
    setTopPatients(JSON.parse(localStorage.getItem("topPatients")) || []);
    setRecentTreatments(JSON.parse(localStorage.getItem("recentTreatments")) || []);
  }, [navigate]);

  const KPICard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Healthcare Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your practice overview</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setActiveRoute('patients');
                  navigate('/patient-management');
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
                  activeRoute === 'patients' ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                Patients Management
              </button>

              <button
                onClick={() => {
                  setActiveRoute('reports');
                  navigate('/incident');
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
                  activeRoute === 'reports' ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Incident Management
              </button>

              <button
                onClick={() => {
                  setActiveRoute('calendar');
                  navigate('/calendar');
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
                  activeRoute === 'calendar' ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </button>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Current Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`$${(kpiData.totalRevenue || 0).toLocaleString()}`}
            change={kpiData.monthlyGrowth}
            icon={DollarSign}
            color="bg-green-500"
          />
          <KPICard
            title="Active Patients"
            value={kpiData.activePatients || 0}
            change={8.2}
            icon={Users}
            color="bg-blue-500"
          />
          <KPICard
            title="Completed Treatments"
            value={kpiData.completedTreatments || 0}
            change={15.3}
            icon={CheckCircle}
            color="bg-purple-500"
          />
          <KPICard
            title="Today's Appointments"
            value={kpiData.todayAppointments || 0}
            icon={Calendar}
            color="bg-orange-500"
          />
        </div>

     
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Next 10 Appointments
                </h2>
                <span className="text-sm text-gray-500">Today & Upcoming</span>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.patient}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <p className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Top Patients
              </h2>
              <div className="space-y-4">
                {topPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.visits} visits</p>
                      <p className="text-xs text-gray-500">Last: {patient.lastVisit}</p>
                    </div>
                    <p className="font-medium text-green-600">${patient.revenue}</p>
                  </div>
                ))}
              </div>
            </div>

        
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Treatment Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="font-medium text-gray-900">Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{kpiData.completedTreatments || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                    <span className="font-medium text-gray-900">Pending</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{kpiData.pendingTreatments || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

  
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Recent Treatments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Treatment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTreatments.map((treatment) => (
                    <tr key={treatment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{treatment.patient}</td>
                      <td className="py-3 px-4 text-gray-600">{treatment.treatment}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${treatment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {treatment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{treatment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
