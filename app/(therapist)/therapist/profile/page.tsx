'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TherapistNavbar from '@/components/therapist/TherapistNavbar';
import { User, Lock, Shield, FileText, LogOut, Eye, EyeOff, X, Edit, Loader2, Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { privacyPolicy, termsAndConditions } from '@/data/legal';
import therapist2 from '@/assets/therapist2.jpeg';

type ActiveSection = 'profile' | 'password' | 'privacy' | 'terms';

export default function TherapistProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayContent, setOverlayContent] = useState('');
  const [overlayTitle, setOverlayTitle] = useState('');

  // Image state
  const [profileImagePreview, setProfileImagePreview] = useState<string | any>(therapist2);
  const [originalProfileImage, setOriginalProfileImage] = useState<string | any>(therapist2);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState('');

  // Achievements state
  const [newAchievement, setNewAchievement] = useState('');

  const [profileData, setProfileData] = useState({
    name: 'Dr. Tashi Dorji',
    email: 'tashi@calm.bt',
    licenseNo: 'BT-MH-2015-001',
    specializations: 'Anxiety, Depression, Trauma',
    languages: 'English, Dzongkha',
    profileImage: therapist2,
    achievements: [] as string[]
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // LocalStorage key
  const STORAGE_KEY = 'therapist_profile_data';

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);
        if (parsedData.profileImage) {
          setProfileImagePreview(parsedData.profileImage);
          setOriginalProfileImage(parsedData.profileImage);
        }
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    router.push('/therapist/login');
  };

  // Image handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setImageErrorMessage('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    if (file.size > maxSize) {
      setImageErrorMessage('Image size must be less than 5MB');
      return;
    }

    setImageErrorMessage('');
    setIsImageLoading(true);

    // Convert to Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setProfileImagePreview(base64String);
      setHasImageChanged(true);
      setIsImageLoading(false);
    };
    reader.onerror = () => {
      setImageErrorMessage('Error reading file');
      setIsImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = () => {
    try {
      const updatedData = { ...profileData, profileImage: profileImagePreview };
      setProfileData(updatedData);
      setOriginalProfileImage(profileImagePreview);
      setHasImageChanged(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      alert('Profile picture saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Error saving profile picture. Image might be too large.');
    }
  };

  const handleRevertImage = () => {
    setProfileImagePreview(originalProfileImage);
    setHasImageChanged(false);
    setImageErrorMessage('');
    // Clear the file input
    const fileInput = document.getElementById('profileImageInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Data might be too large.');
    }
  };

  // Achievement handlers
  const handleAddAchievement = () => {
    if (!newAchievement.trim()) {
      return;
    }
    setProfileData({
      ...profileData,
      achievements: [...profileData.achievements, newAchievement.trim()]
    });
    setNewAchievement('');
  };

  const handleRemoveAchievement = (index: number) => {
    setProfileData({
      ...profileData,
      achievements: profileData.achievements.filter((_, i) => i !== index)
    });
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
    <main className="min-h-screen bg-gray-50">
      <TherapistNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
                {/* Avatar with Edit Functionality */}
                <div className="relative mb-3 group">
                  {/* Avatar Container */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                    {isImageLoading ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                      </div>
                    ) : (
                      <Image
                        src={profileImagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    )}
                  </div>

                  {/* Edit Button Overlay (appears on hover) */}
                  <label
                    htmlFor="profileImageInput"
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Edit className="w-6 h-6 text-white" />
                  </label>

                  {/* Hidden File Input */}
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isImageLoading}
                  />
                </div>

                {/* Image Error Message */}
                {imageErrorMessage && (
                  <p className="text-xs text-red-500 mb-2 text-center">{imageErrorMessage}</p>
                )}

                {/* Save/Revert Buttons */}
                {hasImageChanged && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={handleSaveImage}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={handleRevertImage}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xs font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Revert
                    </button>
                  </div>
                )}

                <h3 className="font-bold text-dark text-center">{profileData.name}</h3>
                <p className="text-sm text-dark/60">{profileData.email}</p>
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
                      <label className="block text-sm font-medium text-dark mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">License Number</label>
                      <input
                        type="text"
                        value={profileData.licenseNo}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-dark/60"
                      />
                      <p className="text-xs text-dark/50 mt-1">License number cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Specializations</label>
                      <input
                        type="text"
                        value={profileData.specializations}
                        onChange={(e) => setProfileData({ ...profileData, specializations: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="Anxiety, Depression, Trauma"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Languages</label>
                      <input
                        type="text"
                        value={profileData.languages}
                        onChange={(e) => setProfileData({ ...profileData, languages: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="English, Dzongkha"
                      />
                    </div>

                    {/* Achievements Section */}
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Achievements</label>

                      {/* Add Achievement Input */}
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddAchievement();
                            }
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          placeholder="Add an achievement..."
                        />
                        <button
                          type="button"
                          onClick={handleAddAchievement}
                          className="px-4 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all flex items-center gap-2 font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Add
                        </button>
                      </div>

                      {/* Achievements List */}
                      {profileData.achievements.length > 0 ? (
                        <div className="space-y-2">
                          {profileData.achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent/10 to-orange-50 border border-accent/20 rounded-xl group hover:shadow-md transition-all"
                            >
                              <span className="text-dark font-medium">{achievement}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveAchievement(index)}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-dark/50 italic py-3 text-center bg-gray-50 rounded-xl border border-gray-200">
                          No achievements added yet. Add your awards, certifications, or accomplishments above.
                        </p>
                      )}
                      <p className="text-xs text-dark/50 mt-2">List your achievements, certifications, or awards</p>
                    </div>

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
