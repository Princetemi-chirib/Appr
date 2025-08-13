'use client';
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/providers/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download,
  Upload,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Lock,
  Key,
  Smartphone,
  Mail,
  Globe,
  Database,
  Server,
  Activity,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  FileText,
  Calendar,
  Clock,
  Users,
  Building,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  Phone,
  Link,
  ExternalLink,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Zap,
  Moon,
  Sun,
  Monitor,
  Camera
} from 'lucide-react';
import { exportAllReports } from '../../../lib/pdf-export';

export default function SettingsPage() {
  const { userRole, onRoleChange } = useAuth();
  
  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    manager: 'Jane Smith',
    bio: 'Experienced software developer with expertise in full-stack development.',
    avatar: 'JD'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appraisalReminders: true,
    goalDeadlines: true,
    teamUpdates: true,
    systemMaintenance: true,
    weeklyReports: false,
    frequency: 'immediate' // immediate, daily, weekly
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team', // public, team, private
    showEmail: true,
    showPhone: false,
    allowDirectMessages: true,
    dataSharing: false,
    analyticsTracking: true
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system', // light, dark, system
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    timezone: 'America/New_York',
    compactMode: false
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    loginAlerts: true,
    passwordExpiry: 90, // days
    allowRememberMe: true
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: RefreshCw }
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    // Export all system data as PDF
    const mockData = {
      employees: [
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@company.com',
          team: 'Engineering',
          position: 'Senior Developer',
          appraisalStatus: 'Finalized',
          performance: 'Exceeds Expectations',
          lastReview: '2024-01-15',
          manager: 'John Smith',
          hireDate: '2022-03-15',
          salary: '85000'
        }
      ],
      tasks: [],
      performance: [
        { period: 'Q4 2023', rating: 'Exceeds Expectations', score: 4.2, feedback: 'Excellent work on the new feature implementation' }
      ],
      objectives: [],
      appraisals: []
    };

    exportAllReports(mockData);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        
        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold">
              {profileSettings.avatar}
            </div>
            <button className="absolute -bottom-1 -right-1 p-1 bg-black dark:bg-white text-white dark:text-black rounded-full border border-white dark:border-black">
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div>
            <h4 className="font-semibold">{profileSettings.firstName} {profileSettings.lastName}</h4>
            <p className="text-gray-600 dark:text-gray-400">{profileSettings.position}</p>
            <div className="flex space-x-2 mt-2">
              <button className="text-sm bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded border border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200">
                Change Photo
              </button>
              <button className="text-sm text-black dark:text-white border border-black dark:border-white px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              value={profileSettings.firstName}
              onChange={(e) => setProfileSettings({...profileSettings, firstName: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={profileSettings.lastName}
              onChange={(e) => setProfileSettings({...profileSettings, lastName: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={profileSettings.phone}
              onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <input
              type="text"
              value={profileSettings.position}
              onChange={(e) => setProfileSettings({...profileSettings, position: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={profileSettings.department}
              onChange={(e) => setProfileSettings({...profileSettings, department: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={profileSettings.bio}
            onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive browser push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via text message</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <h4 className="font-medium mb-4">Notification Types</h4>
        <div className="space-y-3">
          {[
            { key: 'appraisalReminders', label: 'Appraisal Reminders', desc: 'Reminders about pending appraisals' },
            { key: 'goalDeadlines', label: 'Goal Deadlines', desc: 'Notifications about approaching goal deadlines' },
            { key: 'teamUpdates', label: 'Team Updates', desc: 'Updates about your team and colleagues' },
            { key: 'systemMaintenance', label: 'System Maintenance', desc: 'Important system updates and maintenance' },
            { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Weekly summary of your activities' }
          ].map(item => (
            <div key={item.key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={item.key}
                checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                onChange={(e) => setNotificationSettings({...notificationSettings, [item.key]: e.target.checked})}
                className="rounded border-black dark:border-white"
              />
              <div>
                <label htmlFor={item.key} className="font-medium cursor-pointer">{item.label}</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Notification Frequency</label>
          <select
            value={notificationSettings.frequency}
            onChange={(e) => setNotificationSettings({...notificationSettings, frequency: e.target.value})}
            className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Summary</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Privacy Controls</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Profile Visibility</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="team">Team Only - Visible to team members</option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Email Address</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow others to see your email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacySettings.showEmail}
                  onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Phone Number</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow others to see your phone number</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacySettings.showPhone}
                  onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Direct Messages</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow colleagues to send you direct messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacySettings.allowDirectMessages}
                  onChange={(e) => setPrivacySettings({...privacySettings, allowDirectMessages: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Sharing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share anonymized data for analytics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacySettings.dataSharing}
                  onChange={(e) => setPrivacySettings({...privacySettings, dataSharing: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: 'Light', desc: 'Light theme' },
                { value: 'dark', label: 'Dark', desc: 'Dark theme' },
                { value: 'system', label: 'System', desc: 'Follow system preference' }
              ].map(theme => (
                <label key={theme.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    checked={appearanceSettings.theme === theme.value}
                    onChange={(e) => setAppearanceSettings({...appearanceSettings, theme: e.target.value})}
                    className="sr-only peer"
                  />
                  <div className="p-4 border border-black dark:border-white rounded-lg peer-checked:bg-black peer-checked:text-white dark:peer-checked:bg-white dark:peer-checked:text-black">
                    <div className="font-medium">{theme.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 peer-checked:text-gray-300 dark:peer-checked:text-gray-700">{theme.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={appearanceSettings.language}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, language: e.target.value})}
                className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                value={appearanceSettings.timezone}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date Format</label>
              <select
                value={appearanceSettings.dateFormat}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, dateFormat: e.target.value})}
                className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Format</label>
              <select
                value={appearanceSettings.timeFormat}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, timeFormat: e.target.value})}
                className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
              >
                <option value="12h">12 Hour</option>
                <option value="24h">24 Hour</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Compact Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use a more compact interface layout</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={appearanceSettings.compactMode}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, compactMode: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                securitySettings.twoFactorAuth
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                  : 'bg-white text-black dark:bg-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {securitySettings.twoFactorAuth ? 'Enabled' : 'Enable'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password Expiry (days)</label>
            <select
              value={securitySettings.passwordExpiry}
              onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-black dark:border-white rounded-lg bg-white dark:bg-black text-black dark:text-white"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Login Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.loginAlerts}
                onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Remember Me</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow &quot;Remember Me&quot; option on login</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.allowRememberMe}
                onChange={(e) => setSecuritySettings({...securitySettings, allowRememberMe: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3">Password Management</h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Update your current password</div>
              </button>
              <button className="w-full text-left p-3 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium">Download Recovery Codes</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Get backup codes for account recovery</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout userRole={userRole} onRoleChange={onRoleChange}>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-black rounded-xl shadow p-4 md:p-6 border border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Manage your account preferences and security settings</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExportData}
                className="flex items-center space-x-2 px-4 py-2 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white dark:bg-black rounded-xl shadow border border-gray-300 dark:border-gray-700">
          {/* Mobile Tab Selector */}
          <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Desktop Tab Navigation */}
          <div className="hidden md:block border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-black dark:border-white text-black dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="p-4 md:p-6">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
            {activeTab === 'appearance' && renderAppearanceSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
