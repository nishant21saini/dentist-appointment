
export const initializeDoctorDashboardData = () => {
    if (!localStorage.getItem('doctorKPI')) {
      localStorage.setItem(
        'doctorKPI',
        JSON.stringify({
          totalRevenue: 45680,
          monthlyGrowth: 12.5,
          totalPatients: 1247,
          activePatients: 892,
          completedTreatments: 156,
          pendingTreatments: 23,
          todayAppointments: 8,
          weeklyAppointments: 47,
        })
      );
    }
  
    if (!localStorage.getItem('doctorAppointments')) {
      localStorage.setItem(
        'doctorAppointments',
        JSON.stringify([
          { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
          { id: 2, patient: 'Michael Chen', time: '09:30 AM', type: 'Follow-up', status: 'confirmed' },
          { id: 3, patient: 'Emma Williams', time: '10:15 AM', type: 'Treatment', status: 'pending' },
          { id: 4, patient: 'David Brown', time: '11:00 AM', type: 'Consultation', status: 'confirmed' },
          { id: 5, patient: 'Lisa Anderson', time: '11:45 AM', type: 'Check-up', status: 'confirmed' },
          { id: 6, patient: 'James Wilson', time: '02:00 PM', type: 'Treatment', status: 'pending' },
          { id: 7, patient: 'Maria Garcia', time: '02:45 PM', type: 'Follow-up', status: 'confirmed' },
          { id: 8, patient: 'Robert Taylor', time: '03:30 PM', type: 'Consultation', status: 'confirmed' },
          { id: 9, patient: 'Jennifer Davis', time: '04:15 PM', type: 'Treatment', status: 'pending' },
          { id: 10, patient: 'Christopher Lee', time: '05:00 PM', type: 'Check-up', status: 'confirmed' },
        ])
      );
    }
  
    if (!localStorage.getItem('topPatients')) {
      localStorage.setItem(
        'topPatients',
        JSON.stringify([
          { id: 1, name: 'Sarah Johnson', visits: 24, lastVisit: '2 days ago', revenue: 3200 },
          { id: 2, name: 'Michael Chen', visits: 18, lastVisit: '1 week ago', revenue: 2800 },
          { id: 3, name: 'Emma Williams', visits: 16, lastVisit: '3 days ago', revenue: 2400 },
          { id: 4, name: 'David Brown', visits: 14, lastVisit: '5 days ago', revenue: 2100 },
          { id: 5, name: 'Lisa Anderson', visits: 12, lastVisit: '1 day ago', revenue: 1900 },
        ])
      );
    }
  
    if (!localStorage.getItem('recentTreatments')) {
      localStorage.setItem(
        'recentTreatments',
        JSON.stringify([
          { id: 1, patient: 'Sarah Johnson', treatment: 'Root Canal', status: 'completed', date: 'Today' },
          { id: 2, patient: 'Michael Chen', treatment: 'Teeth Cleaning', status: 'completed', date: 'Yesterday' },
          { id: 3, patient: 'Emma Williams', treatment: 'Filling', status: 'pending', date: 'Tomorrow' },
          { id: 4, patient: 'David Brown', treatment: 'Consultation', status: 'completed', date: '2 days ago' },
          { id: 5, patient: 'Lisa Anderson', treatment: 'Whitening', status: 'pending', date: 'Next week' },
        ])
      );
    }

    if(!localStorage.getItem('calendarAppointments')){
        localStorage.setItem('calendarAppointments', JSON.stringify([
            {
              id: '1',
              title: 'Dr. Smith - Cardiology Consultation',
              datetime: '2025-07-15T10:00',
              status: 'Confirmed',
              patient: 'John Doe',
              location: 'Room 302',
              contact: '+1-555-0123',
              duration: 60,
              type: 'consultation'
            },
            {
              id: '2',
              title: 'Physical Therapy Session',
              datetime: '2025-07-15T14:30',
              status: 'Confirmed',
              patient: 'Jane Smith',
              location: 'PT Room 1',
              contact: '+1-555-0456',
              duration: 45,
              type: 'therapy'
            },
            {
              id: '3',
              title: 'Lab Results Review',
              datetime: '2025-07-16T09:00',
              status: 'Pending',
              patient: 'Mike Johnson',
              location: 'Lab 2',
              contact: '+1-555-0789',
              duration: 30,
              type: 'followup'
            },
            {
              id: '4',
              title: 'Emergency Consultation',
              datetime: '2025-07-16T11:30',
              status: 'Urgent',
              patient: 'Sarah Wilson',
              location: 'ER Bay 3',
              contact: '+1-555-0321',
              duration: 90,
              type: 'emergency'
            },
            {
              id: '5',
              title: 'Follow-up Appointment',
              datetime: '2025-07-17T13:00',
              treatment: 'Post-treatment checkup',
              status: 'Confirmed',
              patient: 'Robert Brown',
              location: 'Room 205',
              contact: '+1-555-0654',
              duration: 30,
              type: 'followup'
            },
            {
              id: '6',
              title: 'Dental Cleaning',
              datetime: '2025-07-18T09:30',
              treatment: 'Routine dental hygiene',
              status: 'Confirmed',
              patient: 'Emily Davis',
              location: 'Dental Suite A',
              contact: '+1-555-0987',
              duration: 45,
              type: 'consultation'
            },
            {
              id: '7',
              title: 'Orthopedic Consultation',
              datetime: '2025-07-19T11:00',
              status: 'Pending',
              patient: 'Tom Wilson',
              location: 'Orthopedic Wing',
              contact: '+1-555-0246',
              duration: 60,
              type: 'consultation'
            }
          ]));
           
          if(!localStorage.getItem("incidents")){
            localStorage.setItem("incidents",json.stringify([
              {
              id: '1',
              title: 'Slip and Fall - Cafeteria',
              datetime: '2024-01-15T14:30',
              description: 'Patient slipped on wet floor in cafeteria area',
              comments: 'Floor was recently mopped, warning signs were present',
              cost: '250',
              treatment: 'Minor bruising, ice pack applied',
              status: 'Resolved',
              nextDate: '2024-01-22',
              file: 'incident_report_001.pdf'
            },
            {
              id: '2',
              title: 'Medication Error - Room 205',
              datetime: '2024-01-14T09:15',
              description: 'Wrong dosage administered to patient',
              comments: 'Staff member misread prescription, corrected immediately',
              cost: '500',
              treatment: 'Patient monitored, no adverse effects',
              status: 'Under Review',
              nextDate: '2024-01-21',
              file: 'med_error_report.pdf'
            }]))
          }
    }
  };
  