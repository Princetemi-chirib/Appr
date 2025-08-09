import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, Bell, LogOut, User, Settings, ChevronDown, Mail, Phone, Calendar, CheckCircle, AlertTriangle, Info, X, Menu } from 'lucide-react';
import NavButton from './ui/NavButton';
import { mockRoles, roleIcons } from '@/lib/mock-data';

interface LayoutProps {
  children: React.ReactNode;
  userRole: string;
  onRoleChange: (role: string | null) => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, onRoleChange }) => {
  const router = useRouter();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileSidebar && isMobile) {
        const sidebar = document.getElementById('mobile-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setShowMobileSidebar(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileSidebar, isMobile]);

  // Mock user data
  const userData = {
    name: 'Alex Doe',
    email: 'alex.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: userRole,
    department: 'Engineering',
    employeeId: 'EMP-2024-001',
    joinDate: 'January 15, 2024',
    avatar: 'A'
  };

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Appraisal Reminder',
      message: 'Your Q1 performance review is due in 3 days. Please complete your self-assessment.',
      type: 'warning',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Goal Completed',
      message: 'Congratulations! You have successfully completed your React certification goal.',
      type: 'success',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      title: 'Team Meeting',
      message: 'Your team meeting has been scheduled for tomorrow at 10:00 AM.',
      type: 'info',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      title: 'System Update',
      message: 'The appraisal system will be updated tonight at 11:00 PM. Expect brief downtime.',
      type: 'info',
      time: '3 days ago',
      read: true
    },
    {
      id: 5,
      title: 'Manager Review',
      message: 'Your manager has completed reviewing your appraisal. Check your dashboard for feedback.',
      type: 'success',
      time: '1 week ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAccountClick = () => {
    setShowAccountDropdown(!showAccountDropdown);
    setShowNotificationDropdown(false);
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowAccountDropdown(false);
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleSettingsClick = () => {
    setShowAccountDropdown(false);
    router.push('/settings');
  };

  const handleLogoutClick = () => {
    setShowAccountDropdown(false);
    onRoleChange(null);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-black dark:text-white" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-black dark:text-white" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-black dark:text-white" />;
      default:
        return <Info className="h-4 w-4 text-black dark:text-white" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-black bg-gray-100 dark:border-l-white dark:bg-gray-900';
      case 'warning':
        return 'border-l-black bg-gray-100 dark:border-l-white dark:bg-gray-900';
      case 'error':
        return 'border-l-black bg-gray-100 dark:border-l-white dark:bg-gray-900';
      default:
        return 'border-l-black bg-gray-100 dark:border-l-white dark:bg-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex text-black dark:text-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 z-40 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Building className="h-6 w-6 text-black dark:text-white" />
                <h1 className="text-lg font-bold">Appraisal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Mobile Notification Button */}
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-black dark:bg-white rounded-full border-2 border-white dark:border-gray-900 text-xs text-white dark:text-black flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Account Button */}
              <button 
                onClick={handleAccountClick}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm">
                  {userData.avatar}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <aside 
            id="mobile-sidebar"
            className="w-80 max-w-[80vw] bg-black dark:bg-white text-white dark:text-black h-full p-6 flex flex-col border-r border-gray-300 dark:border-gray-700 transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-white dark:text-black" />
                <h1 className="text-2xl font-bold">Appraisal</h1>
              </div>
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-grow space-y-2">
              <h2 className="text-gray-300 dark:text-gray-700 text-sm font-semibold mb-2 uppercase">Switch Role (Dev)</h2>
              {mockRoles.map(role => {
                const IconComponent = roleIcons[role.iconName as keyof typeof roleIcons];
                return (
                  <NavButton
                    key={role.name}
                    icon={<IconComponent />}
                    text={role.name}
                    onClick={() => {
                      onRoleChange(role.name);
                      setShowMobileSidebar(false);
                    }}
                    active={userRole === role.name}
                  />
                );
              })}
            </nav>
            
            <div className="mt-auto">
              <NavButton 
                icon={<LogOut />} 
                text="Log Out" 
                onClick={() => {
                  onRoleChange(null);
                  setShowMobileSidebar(false);
                }} 
                active={false} 
              />
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      {!isMobile && (
        <aside className="w-64 bg-black dark:bg-white text-white dark:text-black flex-shrink-0 p-6 flex flex-col border-r border-gray-300 dark:border-gray-700">
          <div className="flex items-center mb-10 space-x-2">
            <Building className="h-8 w-8 text-white dark:text-black" />
            <h1 className="text-2xl font-bold">Appraisal</h1>
          </div>
          <nav className="flex-grow space-y-2">
            <h2 className="text-gray-300 dark:text-gray-700 text-sm font-semibold mb-2 uppercase">Switch Role (Dev)</h2>
            {mockRoles.map(role => {
              const IconComponent = roleIcons[role.iconName as keyof typeof roleIcons];
              return (
                <NavButton
                  key={role.name}
                  icon={<IconComponent />}
                  text={role.name}
                  onClick={() => onRoleChange(role.name)}
                  active={userRole === role.name}
                />
              );
            })}
          </nav>
          <div className="mt-auto">
            <NavButton icon={<LogOut />} text="Log Out" onClick={() => onRoleChange(null)} active={false} />
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto ${isMobile ? 'pt-16' : ''}`}>
        <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
          {/* Desktop Header */}
          {!isMobile && (
            <header className="flex justify-between items-center pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-3xl font-bold">{userRole} Dashboard</h2>
              <div className="flex space-x-4">
            
            {/* Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 bg-black dark:bg-white rounded-full border-2 border-white dark:border-gray-900 text-xs text-white dark:text-black flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-black dark:text-white hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                              !notification.read ? 'ring-2 ring-gray-300 dark:ring-gray-700' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                                      {notification.title}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                      {notification.time}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-1 ml-2">
                                    {!notification.read && (
                                      <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="text-xs text-black dark:text-white hover:underline"
                                      >
                                        Mark read
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteNotification(notification.id)}
                                      className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-black dark:text-white hover:underline">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Account Dropdown */}
            <div className="relative">
              <button 
                onClick={handleAccountClick}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold">
                  {userData.avatar}
                </span>
                <div className="hidden md:block text-left">
                  <div className="font-semibold">{userData.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{userData.position}</div>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showAccountDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  {/* User Info Section */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <span className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xl">
                        {userData.avatar}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{userData.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{userData.position}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{userData.department}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Employee ID</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.employeeId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Join Date</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Settings</span>
                    </button>
                    
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
              </div>
            </header>
          )}

          {/* Mobile Title */}
          {isMobile && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{userRole} Dashboard</h2>
            </div>
          )}

          {children}
        </div>
      </main>

      {/* Backdrop to close dropdowns when clicking outside */}
      {(showAccountDropdown || showNotificationDropdown) && !isMobile && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowAccountDropdown(false);
            setShowNotificationDropdown(false);
          }}
        />
      )}

      {/* Mobile Backdrop */}
      {(showAccountDropdown || showNotificationDropdown) && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => {
            setShowAccountDropdown(false);
            setShowNotificationDropdown(false);
          }}
        />
      )}
    </div>
  );
};