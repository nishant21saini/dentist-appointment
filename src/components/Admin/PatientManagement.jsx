import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, User, Phone, Calendar, FileText, X, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const  PatientManagement = ()=> {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
   const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("authenticated") !== "true" || localStorage.getItem("role") !== "Doctor" ){
      navigate('/signin');
 }
  },[navigate])
  useEffect(() => {
    const data = localStorage.getItem("patients");
    if (data) setPatients(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleSubmit = () => {
    const { fullName, dob, contact, healthInfo } = form;
    if (!fullName || !dob || !contact || !healthInfo) {
      alert('All fields are required');
      return;
    }

    if (editingId) {
      setPatients((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
    } else {
      setPatients((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setForm({});
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Management</h1>
              <p className="text-gray-600">Manage patient records and health information</p>
            </div>
            <button
              onClick={() => { setForm({}); setEditingId(null); setOpen(true); }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Patient
            </button>
          </div>
        </div>

      
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {editingId ? 'Edit Patient' : 'Add New Patient'}
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" /> Full Name
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter patient's full name"
                      value={form.fullName || ''}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" /> Date of Birth
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      type="date"
                      value={form.dob || ''}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" /> Contact Number
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter phone number"
                      value={form.contact || ''}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText size={16} className="inline mr-2" /> Health Information
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
                      placeholder="Enter medical conditions, allergies, notes..."
                      value={form.healthInfo || ''}
                      onChange={(e) => setForm({ ...form, healthInfo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> {editingId ? 'Update Patient' : 'Add Patient'}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{patient.fullName}</h3>
                      <p className="text-sm text-gray-500">Age: {calculateAge(patient.dob)} years</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit patient"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete patient"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-600">Born: {formatDate(patient.dob)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-600">{patient.contact}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <FileText size={16} className="text-gray-400 mt-0.5" />
                    <span className="text-gray-600 flex-1">{patient.healthInfo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {patients.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Patients Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first patient record.</p>
            <button
              onClick={() => { setForm({}); setEditingId(null); setOpen(true); }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add First Patient
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
