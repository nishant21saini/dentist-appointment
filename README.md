
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
   git clone https://github.com/your-username/dental-dashboard.git
   cd dental-dashboard
Install dependencies

bash
Copy
Edit
npm install
Run the app

bash
Copy
Edit
npm run dev
Open in browser
Visit http://localhost:5173

🧼 Data Seeding & Storage
On first load, localStorage.clear() is triggered to reset data

Demo data is auto-inserted into:

doctorKPI

doctorAppointments

topPatients

recentTreatments

calendarAppointments

All actions like editing, adding, and deleting patients/incidents are reflected in localStorage.

📷 Screenshots
Dashboard	Calendar View

📝 Notes
This is a frontend-only project — there is no backend API integration

Built for assignment/demo/testing purposes

Auth is simulated via localStorage and role checks

🧑‍💻 Author
Nishant Saini
GitHub: @nishant21saini

📄 License
This project is open-source and free to use for educational and non-commercial purposes.

yaml
Copy
Edit

---

Would you like me to generate the actual `demo-data.js` file or help set up screenshots for the `README`?








Ask ChatGPT

