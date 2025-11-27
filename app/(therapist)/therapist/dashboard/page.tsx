'use client';

import { useState } from 'react';
import Link from 'next/link';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import {
  Calendar,
  MessageSquare,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Star
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getDashboardStats, sessions } from '@/data/therapistData';

export default function TherapistDashboard() {
  const therapist = { id: 'T001', name: 'Dr. Tashi Dorji' };
  const stats = getDashboardStats(therapist.id);

  const todaySessions = sessions.filter(s => s.therapistId === therapist.id);

  const COLORS = ['#ff8967', '#f17e65', '#ffa590', '#ff7550', '#ffb3a3'];

  const StatCard = ({ icon: Icon, title, value, color, trend }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark/60 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-dark">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <TherapistNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark mb-2">
            Welcome back, {therapist.name.split(' ')[1]} 👋
          </h2>
          <p className="text-dark/60">Here's what's happening with your sessions today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Calendar}
            title="Sessions Today"
            value={stats.totalSessionsToday}
            color="bg-accent"
            trend="+12% from yesterday"
          />
          <StatCard
            icon={Clock}
            title="Pending Requests"
            value={stats.pendingRequests}
            color="bg-orange-500"
          />
          <StatCard
            icon={MessageSquare}
            title="Active Sessions"
            value={stats.activeSessions}
            color="bg-accent"
          />
          <StatCard
            icon={CheckCircle}
            title="Completed This Week"
            value={stats.completedThisWeek}
            color="bg-green-500"
            trend="+8% from last week"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Sessions Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-dark">Weekly Sessions</h3>
                <p className="text-sm text-dark/50">Sessions per day this week</p>
              </div>
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.weeklySessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="sessions" fill="#ff8967" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sessions by Category */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-dark">Sessions by Category</h3>
                <p className="text-sm text-dark/50">Distribution of session types</p>
              </div>
              <PieChart className="w-5 h-5 text-accent" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie
                  data={stats.sessionsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // FIXED: Added fallback (percent || 0) to handle undefined values safely
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.sessionsByCategory.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Schedule & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-dark">Today's Schedule</h3>
              <Link
                href="/therapist/sessions"
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {todaySessions.length > 0 ? (
                todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-orange-50 rounded-xl border border-accent/20 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {session.userNickname.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-dark">{session.userNickname}</p>
                        <p className="text-sm text-dark/60">{session.context}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-dark/60">
                        {new Date(session.startTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : session.status === 'waiting'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {session.status}
                      </span>
                      <Link
                        href={`/therapist/chat?session=${session.id}`}
                        className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-dark/50">No sessions scheduled for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Satisfaction Rate */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-dark">Satisfaction Rate</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-dark">{stats.satisfactionRate}</span>
                <span className="text-dark/60">/5.0</span>
              </div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(stats.satisfactionRate)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/therapist/sessions"
                  className="flex items-center gap-3 p-3 bg-primary hover:bg-primary/70 rounded-xl transition-colors"
                >
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-dark">View Requests</span>
                </Link>
                <Link
                  href="/therapist/chat"
                  className="flex items-center gap-3 p-3 bg-primary hover:bg-primary/70 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-dark">Active Chats</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}