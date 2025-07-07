import React, { useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, 
Filter, Grid, List, AlertTriangle, User, MapPin, Phone
} from "lucide-react";

export const CalendarView = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
      const storedAppointments = localStorage.getItem("calendarAppointments");
      if (storedAppointments) {
        console.log(storedAppointments)
        setAppointments(JSON.parse(storedAppointments));
      }
    }, []);
  
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
        case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-blue-100 text-blue-800 border-blue-200';
      }
    };
  
    const getTypeIcon = (type) => {
      switch (type?.toLowerCase()) {
        case 'emergency': return <AlertTriangle size={16} className="text-red-500" />;
        case 'consultation': return <User size={16} className="text-blue-500" />;
        case 'therapy': return <Clock size={16} className="text-green-500" />;
        case 'followup': return <Calendar size={16} className="text-purple-500" />;
        default: return <Calendar size={16} className="text-gray-500" />;
      }
    };
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const groupedByDate = appointments
      .filter(appt => filterStatus === 'all' || appt.status?.toLowerCase() === filterStatus.toLowerCase())
      .reduce((acc, appt) => {
        const date = appt.datetime.split("T")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(appt);
        return acc;
      }, {});
  
    const sortedDates = Object.keys(groupedByDate).sort();
  
    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
    };
  
    const getDaysInMonth = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
  
      const days = [];
  
      for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
      for (let day = 1; day <= daysInMonth; day++) days.push(day);
  
      return days;
    };
  
    const getAppointmentsForDate = (day) => {
      if (!day) return [];
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return groupedByDate[dateString] || [];
    };
  
    const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar View</h1>
              <p className="text-gray-600">Schedule and manage appointments</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="urgent">Urgent</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">{currentMonth}</h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {viewMode === 'month' ? (
          /* Calendar Grid View */
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-4">
              {days.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded-lg transition-colors ${
                      day 
                        ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' 
                        : 'bg-transparent'
                    }`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <div className="font-medium text-gray-800 mb-1">{day}</div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map(appt => (
                            <div
                              key={appt.id}
                              className={`text-xs px-2 py-1 rounded border ${getStatusColor(appt.status)}`}
                            >
                              {formatTime(appt.datetime)}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-gray-500 px-2">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {sortedDates.map(date => (
              <div key={date} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" />
                  {formatDate(date)}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupedByDate[date].map(appt => (
                    <div
                      key={appt.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appt.type)}
                          <h3 className="font-medium text-gray-800">{appt.title}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appt.status)}`}>
                          {appt.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{formatTime(appt.datetime)} ({appt.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{appt.patient}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{appt.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>{appt.contact}</span>
                        </div>
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          {appt.treatment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedDates.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {filterStatus !== 'all' ? 'No Appointments Found' : 'No Appointments Scheduled'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus !== 'all' 
                ? 'Try adjusting your filter to see more appointments.' 
                : 'Schedule your first appointment to get started.'}
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Schedule Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;