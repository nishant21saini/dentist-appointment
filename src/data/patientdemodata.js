export const initializeDemoData = () => {
    if (!localStorage.getItem('patientData')) {
      const patientData = {
        name: "Sarah Johnson",
        id: "PT-2024-001",
        dob: "March 15, 1985",
        phone: "(555) 123-4567",
        email: "sarah.johnson@email.com"
      };
      localStorage.setItem("patientData", JSON.stringify(patientData));
    }
  
    if (!localStorage.getItem('upcomingAppointments')) {
      const upcomingAppointments = [
        {
          id: 1,
          date: "July 15, 2025",
          time: "10:00 AM",
          doctor: "Dr. Smith",
          type: "Annual Physical",
          cost: "$150.00",
          location: "Main Office - Room 102"
        },
        {
          id: 2,
          date: "July 22, 2025",
          time: "2:30 PM",
          doctor: "Dr. Johnson",
          type: "Cardiology Follow-up",
          cost: "$75.00",
          location: "Cardiology Wing - Room 205"
        },
        {
          id: 3,
          date: "August 5, 2025",
          time: "11:15 AM",
          doctor: "Dr. Wilson",
          type: "Lab Results Review",
          cost: "$50.00",
          location: "Main Office - Room 108"
        }
      ];
      localStorage.setItem("upcomingAppointments", JSON.stringify(upcomingAppointments));
    }
  
    if (!localStorage.getItem('medicalHistory')) {
      const medicalHistory = [
        {
          id: 1,
          date: "June 20, 2025",
          doctor: "Dr. Wilson",
          type: "Consultation",
          treatment: "Prescribed Lisinopril 10mg daily for hypertension management. Patient advised to monitor blood pressure twice weekly and maintain low-sodium diet.",
          cost: "$200.00",
          diagnosis: "Hypertension"
        },
        {
          id: 2,
          date: "May 10, 2025",
          doctor: "Dr. Brown",
          type: "Physical Therapy",
          treatment: "Completed 6-week shoulder rehabilitation program. Exercises included rotator cuff strengthening and range of motion improvements. Full recovery achieved.",
          cost: "$120.00",
          diagnosis: "Shoulder impingement"
        },
        {
          id: 3,
          date: "March 15, 2025",
          doctor: "Dr. Smith",
          type: "Annual Physical",
          treatment: "Routine physical examination completed. All vitals normal. Updated immunizations. Recommended annual mammogram and colonoscopy screening.",
          cost: "$175.00",
          diagnosis: "Routine examination"
        },
        {
          id: 4,
          date: "January 8, 2025",
          doctor: "Dr. Johnson",
          type: "Cardiology Consultation",
          treatment: "EKG and stress test performed. Results normal. Patient cleared for regular exercise routine. Follow-up in 6 months recommended.",
          cost: "$300.00",
          diagnosis: "Cardiac clearance"
        }
      ];
      localStorage.setItem("medicalHistory", JSON.stringify(medicalHistory));
    }
  
    if (!localStorage.getItem('users')) {
      const users = [
        {
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          password: "123456",
          role: "Patient"
        },
        {
          name: "Dr. Smith",
          email: "dr.smith@email.com",
          password: "doctor123",
          role: "Doctor"
        }
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  };
  