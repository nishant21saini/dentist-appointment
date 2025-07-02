import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import {Feature}  from "./Feature"

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full font-sans bg-gray-50">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
              DentalCare <span className="text-blue-600">Pro</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* <div
          className="absolute inset-0 bg-no-repeat bg-contain bg-center opacity-20"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png')",
          }}
        /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-blue-50/60 z-0" /> */}
        
        <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight mb-6">
            Modern Dental Practice <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Streamline your dental clinic operations with our comprehensive management system designed for both practitioners and patients.
          </p>
        </div>
      </section>

    
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card imageSrc="https://img.icons8.com/color/96/doctor-male.png" imageAlt='Doctor' portalName='Doctor Portal' overView=' Comprehensive tools for patient management, scheduling, and treatment tracking.' onClick={() => navigate("/doctorsignin")} /> 
          <Card  imageSrc="https://img.icons8.com/color/96/person-male.png" imageAlt='Patient' portalName='Patient Portal' overView=' Easy access to appointments, treatment history, and dental records.' onClick={() => navigate("/patientsignin")}/>
        </div>
      </section>
      
     <Feature/>
      
    </div>
  );
};