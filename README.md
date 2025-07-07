
# 🦷 Dental Clinic Management Dashboard

A modern, responsive **React** frontend-only dashboard for managing a dental clinic’s operations. This includes role-based access for doctors and patients, appointment scheduling, incident/treatment tracking, KPI dashboards, and calendar views — all powered with mock data and persisted using `localStorage`.

---

##  Features

### 🩺 Doctor View
- Dashboard with KPIs (revenue, appointments, treatments, active patients)
- Patient Management (view/add/edit/delete)
- Incident Management (treatments, visits, cost, files)
- Calendar View (month/list modes with status filtering)
- Top patients, treatment status, upcoming appointments

### 👤 Patient View
- View own appointments and treatment history (read-only)

### 🛠 Tech Stack
- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- React Router
- localStorage (for persistence)

---


## 🧪 Prerequisites

- Node.js ≥ 16.x
- npm ≥ 8.x (or yarn)

---

## ⚙️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/nishant21saini/dentist-appointment
   cd src
Install dependencies

npm install
Run the app


npm run dev
Open in browser
Visit http://localhost:5173

🧼 Data Seeding & Storage


Demo data is auto-inserted into:

doctorKPI

doctorAppointments

topPatients

recentTreatments

calendarAppointments

All actions like editing, adding, and deleting patients/incidents are reflected in localStorage.



📝 Notes
This is a frontend-only project — there is no backend API integration

Built for assignment/demo/testing purposes

Auth is simulated via localStorage and role checks

##Login Credentials
 Doctor
Email: zak@clinic.com

Password: Zak123@

Role: Doctor

Patient
Email: ben@clinic.com

Password: Ben123@

Role: Patient
