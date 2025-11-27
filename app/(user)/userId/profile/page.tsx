'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserNavbar from '@/components/shared/UserNavbar';
import { User, Lock, Shield, FileText, LogOut, Eye, EyeOff, X } from 'lucide-react';
import { privacyPolicy, termsAndConditions } from '@/data/legal';
import ChatBot from '@/components/ChatBot';

type ActiveSection = 'profile' | 'password' | 'privacy' | 'terms';

export default function UserProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState('');
  const [overlayTitle, setOverlayTitle] = useState('');

  const [profileData, setProfileData] = useState({
    nickname: 'SilentMountain',
    ageGroup: '18-25',
    language: 'English'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleLogout = () => {
    router.push('/login');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const showPrivacyPolicy = () => {
    setOverlayTitle('Privacy Policy');
    setOverlayContent(privacyPolicy);
    setShowOverlay(true);
  };

  const showTerms = () => {
    setOverlayTitle('Terms and Conditions');
    setOverlayContent(termsAndConditions);
    setShowOverlay(true);
  };

  const MenuItem = ({ icon: Icon, label, section, onClick }: any) => (
    <button
      onClick={onClick || (() => setActiveSection(section))}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeSection === section
          ? 'bg-accent text-white'
          : 'text-dark/70 hover:bg-primary hover:text-dark'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <main className="max-h-screen bg-gray-50">
      <UserNavbar />
      <ChatBot />

      <div className="max-w-7xl mx-auto px-6 py-8 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {profileData.nickname.charAt(0)}
                </div>
                <h3 className="font-bold text-dark text-center">{profileData.nickname}</h3>
                <p className="text-sm text-dark/60">{profileData.ageGroup}</p>
              </div>

              <div className="space-y-2">
                <MenuItem icon={User} label="Edit Profile" section="profile" />
                <MenuItem icon={Lock} label="Change Password" section="password" />
                <MenuItem icon={Shield} label="Privacy Policy" section="privacy" onClick={showPrivacyPolicy} />
                <MenuItem icon={FileText} label="Terms & Conditions" section="terms" onClick={showTerms} />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {/* Edit Profile */}
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Edit Profile</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Nickname</label>
                      <input
                        type="text"
                        value={profileData.nickname}
                        onChange={(e) => setProfileData({ ...profileData, nickname: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Age Group</label>
                      <select
                        value={profileData.ageGroup}
                        onChange={(e) => setProfileData({ ...profileData, ageGroup: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="18-25">18-25</option>
                        <option value="26-35">26-35</option>
                        <option value="36-50">36-50</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-dark mb-2">Language</label>
                      <select
                        value={profileData.language}
                        onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Dzongkha">Dzongkha</option>
                      </select>
                    </div> */}

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Change Password */}
              {activeSection === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Confirm New Password</label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Privacy/Terms */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark">{overlayTitle}</h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-dark/60" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] prose prose-sm max-w-none">
              <div
                className="text-dark/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: overlayContent
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-dark mt-6 mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-dark mt-5 mb-3">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-dark mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-dark">$1</strong>')
                    .replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
                    .replace(/\n\n/g, '<br/><br/>')
                }}
              />
            </div>
          </div>
        </div>
        
      )}
      
    </main>
  );
}
