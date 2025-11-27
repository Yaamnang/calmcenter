'use client';

import { useState } from 'react';
import Link from 'next/link';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import {
  Filter,
  Search,
  Clock,
  User,
  Globe,
  MessageSquare,
  Check,
  X,
  Calendar,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { sessionRequests, SessionRequest } from '@/data/therapistData';

export default function SessionsPage() {
  const therapist = { id: 'T001' };
  const [requests, setRequests] = useState<SessionRequest[]>(sessionRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  const filteredRequests = requests
    .filter((req) => {
      if (filter !== 'all' && req.status !== filter) return false;
      if (searchTerm && !req.userNickname.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleAccept = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: 'accepted' as const, therapistId: therapist?.id } : req
      )
    );
  };

  const handleDecline = (requestId: string) => {
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'accepted':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <TherapistNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-dark">Session Requests</h1>
            <p className="text-dark/60">Manage incoming session requests</p>
          </div>
          <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
            {requests.filter((r) => r.status === 'pending').length} Pending
          </span>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by nickname..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {request.userNickname.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {request.userNickname}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        {request.ageGroup && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {request.ageGroup}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {request.languagePreference}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(request.requestedTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">Session Context:</p>
                      <p className="text-sm text-gray-700">{request.context}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Requested {new Date(request.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {request.status === 'pending' && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Check className="w-5 h-5" />
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Decline
                    </button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <Link
                    href={`/therapist/chat?request=${request.id}`}
                    className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 text-center transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Session
                  </Link>
                )}

                {request.status === 'completed' && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Session Completed</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No requests found</h3>
              <p className="text-gray-600">
                {filter !== 'all'
                  ? `No ${filter} requests at the moment`
                  : 'No session requests match your search'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
