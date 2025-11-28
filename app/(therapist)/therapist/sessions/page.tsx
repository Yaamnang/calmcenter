'use client';

import { useState } from 'react';
import Link from 'next/link';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import {
  Filter,
  Clock,
  User,
  Globe,
  MessageSquare,
  Check,
  X,
  Calendar,
  ChevronDown,
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';
import { sessionRequests, SessionRequest } from '@/data/therapistData';

export default function SessionsPage() {
  const therapist = { id: 'T001' };
  
  // State
  const [requests, setRequests] = useState<SessionRequest[]>(sessionRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);

  // Filter & Sort Logic
  const filteredRequests = requests
    .filter((req) => {
      if (filter !== 'all' && req.status !== filter) return false;
      return true;
    })
    .sort((a, b) => {
      // 1. Sort by Status Priority (Pending > Accepted > Completed)
      const statusPriority = { pending: 1, accepted: 2, completed: 3 };
      // @ts-ignore
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        // @ts-ignore
        return statusPriority[a.status] - statusPriority[b.status];
      }

      // 2. Sort by Date
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // --- HANDLERS ---

  const openAcceptModal = (request: SessionRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const confirmAppointment = () => {
    if (!selectedRequest) return;

    // Change status to accepted instead of removing
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: 'accepted' as const } 
        : req
    );
    setRequests(updatedRequests);
    
    alert(`Appointment confirmed for ${selectedRequest.userNickname} on ${new Date(selectedRequest.requestedTime).toLocaleString()}`);
    
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleDecline = (requestId: string) => {
    const confirm = window.confirm("Are you sure you want to decline this request?");
    if (confirm) {
      setRequests(requests.filter((req) => req.id !== requestId));
    }
  };

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8700]"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF5E6]">
      <TherapistNavbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark">Session Requests</h1>
            <p className="text-dark/60 mt-1">Review and manage incoming appointments</p>
          </div>
          <span className="px-4 py-2 bg-[#FF8700]/10 text-[#FF8700] rounded-full text-sm font-bold border border-[#FF8700]/20">
            {requests.filter((r) => r.status === 'pending').length} Pending
          </span>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
          
          {/* Status Filter */}
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8700]/50 focus:border-[#FF8700] appearance-none bg-transparent text-sm font-medium text-dark"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Date Sort */}
          <div className="relative min-w-[200px]">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8700]/50 focus:border-[#FF8700] appearance-none bg-transparent text-sm font-medium text-dark"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 group ${
                  request.status === 'accepted' ? 'border-green-200 bg-green-50/10' : 'border-orange-100'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  
                  {/* User Info */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform ${
                      request.status === 'accepted' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-orange-400 to-[#FF8700]'
                    }`}>
                      {request.userNickname.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-1">
                        {request.userNickname}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-dark/60">
                        {request.ageGroup && (
                          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                            <User className="w-3.5 h-3.5" />
                            {request.ageGroup}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <Globe className="w-3.5 h-3.5" />
                          {request.languagePreference}
                        </span>
                        <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md font-medium ${
                          request.status === 'accepted' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-[#FF8700]'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          {request.status === 'accepted' ? 'Scheduled: ' : 'Requested: '} 
                          {new Date(request.requestedTime).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                {/* Context Box */}
                <div className={`rounded-xl p-4 mb-5 border relative ${
                  request.status === 'accepted' ? 'bg-green-50/50 border-green-100' : 'bg-[#FDF5E6] border-orange-100'
                }`}>
                  <div className="flex items-start gap-3">
                    <MessageSquare className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      request.status === 'accepted' ? 'text-green-600' : 'text-[#FF8700]'
                    }`} />
                    <div>
                      <p className="text-xs font-bold text-dark/40 uppercase tracking-wider mb-1">Reason for Visit</p>
                      <p className="text-dark/80 text-sm leading-relaxed font-medium">{request.context}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {request.status === 'pending' ? (
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => openAcceptModal(request)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FF8700] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e67a00] transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Check className="w-5 h-5" />
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="px-6 py-3 bg-white border-2 border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <X className="w-5 h-5" />
                      Decline
                    </button>
                  </div>
                ) : (
                  // Accepted State Actions
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <Link
                      href={`/therapist/chat?session=${request.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Go to Chat
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center border border-orange-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">No requests found</h3>
              <p className="text-dark/50 max-w-xs mx-auto">
                There are no {filter !== 'all' ? filter : ''} requests matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-gray-100 bg-[#FDF5E6]">
              <h2 className="text-xl font-bold text-dark">Confirm Appointment</h2>
              <p className="text-dark/60 text-sm">Please verify the details below</p>
            </div>

            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <p className="text-dark/60 mb-2">Fix appointment with <span className="font-bold text-dark">{selectedRequest.userNickname}</span> on:</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 inline-block w-full">
                  <div className="text-2xl font-bold text-[#FF8700]">
                    {new Date(selectedRequest.requestedTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-lg font-medium text-dark/70">
                    {new Date(selectedRequest.requestedTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-gray-200 text-dark/60 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAppointment}
                  className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Confirm & Fix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}