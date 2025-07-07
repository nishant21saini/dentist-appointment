import React, { useState, useEffect } from "react";
import {
    Plus, Edit2, Trash2, AlertTriangle, Calendar, FileText, DollarSign, Activity, Clock, X, Save, Upload, Search, Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const IncidentManagement = () => {
    const [incidents, setIncidents] = useState([]);
    const [form, setForm] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("authenticated") !== "true" || localStorage.getItem("role") !== "Doctor") {
            navigate('/signin');
        }
    }, [navigate]);

    useEffect(() => {
        const stored = localStorage.getItem("incidents");
        if (stored) {
            setIncidents(JSON.parse(stored));
        }
    }, []);

    const saveToLocalStorage = (data) => {
        localStorage.setItem("incidents", JSON.stringify(data));
    };

    const handleSubmit = () => {
        const { title, datetime, description, status } = form;
        if (!title || !datetime || !description || !status) {
            alert('Please fill in all required fields');
            return;
        }

        if (editingId) {
            const updated = incidents.map(i =>
                i.id === editingId ? { ...form, id: editingId } : i
            );
            setIncidents(updated);
            saveToLocalStorage(updated);
        } else {
            const newData = [...incidents, { ...form, id: Date.now().toString() }];
            setIncidents(newData);
            saveToLocalStorage(newData);
        }

        setForm({});
        setEditingId(null);
        setOpen(false);
    };

    const handleEdit = (incident) => {
        setForm(incident);
        setEditingId(incident.id);
        setOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this incident?")) {
            const updated = incidents.filter(i => i.id !== id);
            setIncidents(updated);
            saveToLocalStorage(updated);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'under review': return 'bg-yellow-100 text-yellow-800';
            case 'pending': return 'bg-orange-100 text-orange-800';
            case 'critical': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredIncidents = incidents.filter(incident => {
        const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || incident.status?.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const formatDateTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Incident Management</h1>
                            <p className="text-gray-600">Track and manage healthcare incidents and safety reports</p>
                        </div>
                        <button
                            onClick={() => { setForm({}); setEditingId(null); setOpen(true); }}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Report Incident
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search incidents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <Filter size={20} className="absolute left-3 top-3 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="resolved">Resolved</option>
                                <option value="under review">Under Review</option>
                                <option value="pending">Pending</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Form Modal */}
                {open && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {editingId ? 'Edit Incident' : 'Report New Incident'}
                                    </h3>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <AlertTriangle size={16} className="inline mr-2" />
                                            Incident Title *
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Brief description of the incident"
                                            value={form.title || ""}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar size={16} className="inline mr-2" />
                                            Date & Time *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={form.datetime || ""}
                                            onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Activity size={16} className="inline mr-2" />
                                            Status *
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={form.status || ""}
                                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FileText size={16} className="inline mr-2" />
                                            Description *
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 resize-none"
                                            placeholder="Detailed description of what happened..."
                                            value={form.description || ""}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FileText size={16} className="inline mr-2" />
                                            Comments & Notes
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20 resize-none"
                                            placeholder="Additional comments or observations..."
                                            value={form.comments || ""}
                                            onChange={(e) => setForm({ ...form, comments: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <DollarSign size={16} className="inline mr-2" />
                                            Estimated Cost
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="0.00"
                                            value={form.cost || ""}
                                            onChange={(e) => setForm({ ...form, cost: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock size={16} className="inline mr-2" />
                                            Follow-up Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            value={form.nextDate || ""}
                                            onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FileText size={16} className="inline mr-2" />
                                            Treatment & Actions Taken
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20 resize-none"
                                            placeholder="Describe treatment provided and actions taken..."
                                            value={form.treatment || ""}
                                            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Upload size={16} className="inline mr-2" />
                                            Attach File
                                        </label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            onChange={(e) => setForm({ ...form, file: e.target.files[0]?.name })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        {editingId ? 'Update Incident' : 'Report Incident'}
                                    </button>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Incidents Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredIncidents.map((incident) => (
                        <div key={incident.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                            <AlertTriangle size={24} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{incident.title}</h3>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                                                {incident.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(incident)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit incident"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(incident.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete incident"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="text-gray-600">{formatDateTime(incident.datetime)}</span>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <FileText size={16} className="text-gray-400 mt-0.5" />
                                        <span className="text-gray-600 flex-1">{incident.description}</span>
                                    </div>

                                    {incident.cost && (
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} className="text-gray-400" />
                                            <span className="text-gray-600">${incident.cost}</span>
                                        </div>
                                    )}

                                    {incident.treatment && (
                                        <div className="flex items-start gap-2">
                                            <Activity size={16} className="text-gray-400 mt-0.5" />
                                            <span className="text-gray-600 flex-1">{incident.treatment}</span>
                                        </div>
                                    )}

                                    {incident.nextDate && (
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-gray-600">Follow-up: {new Date(incident.nextDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredIncidents.length === 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {searchTerm || statusFilter !== 'all' ? 'No Matching Incidents' : 'No Incidents Reported'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm || statusFilter !== 'all'
                                ? 'Try adjusting your search or filter criteria.'
                                : 'Get started by reporting your first incident.'}
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
                            <button
                                onClick={() => { setForm({}); setEditingId(null); setOpen(true); }}
                                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
                            >
                                <Plus size={20} />
                                Report First Incident
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};