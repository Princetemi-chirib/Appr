'use client';
import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  lastUpdated: string;
  performance: string;
  rating: number;
  goals: number;
  completedGoals: number;
  tasks: number;
  completedTasks: number;
  appraisalStatus: string;
}
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Bell,
  Plus,
  Edit,
  Eye,
  Download,
  Star,
  Target,
  AlertTriangle,
  ThumbsUp,
  UserCheck,
  Award,
  Settings,
  Filter,
  Search,
  X
} from 'lucide-react';
import { 
  mockNotifications,
  mockUserObjectives,
  mockSelfAppraisals,
  mockPerformanceAppraisals,
  getCurrentPeriod,
  getObjectiveById
} from '../../lib/mock-data';
import {
  exportPerformanceSummary,
  exportAnalyticsReport,
  exportAllReports,
  type EmployeeData,
  type PerformanceData
} from '../../lib/pdf-export';

// Enhanced mock data for manager dashboard
const mockTeamMembers = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@company.com',
    position: 'Senior Developer',
    status: 'Completed', 
    lastUpdated: '2024-01-15',
    performance: 'Exceeds Expectations',
    rating: 4.2,
    goals: 3,
    completedGoals: 2,
    tasks: 8,
    completedTasks: 7,
    appraisalStatus: 'Finalized'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@company.com',
    position: 'Marketing Manager',
    status: 'Pending Review', 
    lastUpdated: '2024-01-14',
    performance: 'Meets Expectations',
    rating: 3.8,
    goals: 4,
    completedGoals: 3,
    tasks: 6,
    completedTasks: 4,
    appraisalStatus: 'In Progress'
  },
  { 
    id: 3, 
    name: 'Carol Davis', 
    email: 'carol@company.com',
    position: 'Sales Representative',
    status: 'Not Started', 
    lastUpdated: '2024-01-10',
    performance: 'Below Expectations',
    rating: 2.9,
    goals: 3,
    completedGoals: 1,
    tasks: 5,
    completedTasks: 2,
    appraisalStatus: 'Not Started'
  },
  { 
    id: 4, 
    name: 'David Wilson', 
    email: 'david@company.com',
    position: 'Team Lead',
    status: 'Completed', 
    lastUpdated: '2024-01-16',
    performance: 'Exceeds Expectations',
    rating: 4.5,
    goals: 5,
    completedGoals: 5,
    tasks: 10,
    completedTasks: 9,
    appraisalStatus: 'Finalized'
  },
];

const mockTeamGoals = [
  { id: 1, title: 'Increase team productivity by 15%', progress: 75, dueDate: '2024-03-31', status: 'In Progress' },
  { id: 2, title: 'Complete project documentation', progress: 90, dueDate: '2024-02-28', status: 'In Progress' },
  { id: 3, title: 'Improve code quality standards', progress: 100, dueDate: '2024-01-31', status: 'Completed' },
];

const mockTeamMetrics = {
  totalMembers: 4,
  completedAppraisals: 2,
  pendingReviews: 1,
  notStarted: 1,
  averageRating: 3.85,
  completionRate: 50,
  productivityScore: 87,
  teamSatisfaction: 4.1
};

const mockRecentActivities = [
  { id: 1, action: 'Reviewed Alice Johnson\'s appraisal', time: '2 hours ago', type: 'review' },
  { id: 2, action: 'Assigned new goal to Bob Smith', time: '1 day ago', type: 'goal' },
  { id: 3, action: 'Team meeting scheduled', time: '2 days ago', type: 'meeting' },
  { id: 4, action: 'David Wilson completed all goals', time: '3 days ago', type: 'achievement' },
];

export default function ManagerDashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [teamGoals, setTeamGoals] = useState(mockTeamGoals);
  const [recentActivities, setRecentActivities] = useState(mockRecentActivities);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Modal states
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showViewMemberModal, setShowViewMemberModal] = useState(false);
  const [showScheduleReviewModal, setShowScheduleReviewModal] = useState(false);
  const [showTeamMeetingModal, setShowTeamMeetingModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Form states
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id' | 'lastUpdated'>>({
    name: '',
    email: '',
    position: '',
    status: 'Not Started',
    performance: 'Meets Expectations',
    rating: 3.0,
    goals: 0,
    completedGoals: 0,
    tasks: 0,
    completedTasks: 0,
    appraisalStatus: 'Not Started'
  });
  
  // Notifications data
  const [notifications] = useState([
    { id: 1, message: 'Alice Johnson completed her self-review', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Bob Smith needs manager review', time: '1 day ago', type: 'warning' },
    { id: 3, message: 'Team meeting scheduled for tomorrow', time: '2 days ago', type: 'info' },
    { id: 4, message: 'Q1 review cycle deadline approaching', time: '3 days ago', type: 'urgent' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-gray-100 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white';
      case 'Pending Review':
        return 'bg-gray-100 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white';
      case 'Not Started':
        return 'bg-gray-100 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white';
      default:
        return 'bg-gray-100 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending Review':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Exceeds Expectations':
        return 'text-black dark:text-white';
      case 'Meets Expectations':
        return 'text-black dark:text-white';
      case 'Below Expectations':
        return 'text-black dark:text-white';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Handler functions
  const resetNewMember = () => {
    setNewMember({
      name: '',
      email: '',
      position: '',
      status: 'Not Started',
      performance: 'Meets Expectations',
      rating: 3.0,
      goals: 0,
      completedGoals: 0,
      tasks: 0,
      completedTasks: 0,
      appraisalStatus: 'Not Started'
    });
  };

  const handleAddMember = () => {
    // Validation
    if (!newMember.name.trim()) {
      alert('Please enter a name');
      return;
    }
    if (!newMember.email.trim()) {
      alert('Please enter an email');
      return;
    }
    if (!newMember.position.trim()) {
      alert('Please enter a position');
      return;
    }
    
    // Check for duplicate email
    if (teamMembers.some(member => member.email.toLowerCase() === newMember.email.toLowerCase())) {
      alert('A team member with this email already exists');
      return;
    }

    const nextId = Math.max(...teamMembers.map(m => m.id)) + 1;
    const memberToAdd: TeamMember = {
      ...newMember,
      id: nextId,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setTeamMembers([...teamMembers, memberToAdd]);
    resetNewMember();
    setShowAddMemberModal(false);
    addActivity(`Added new team member: ${memberToAdd.name}`);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    const { id, lastUpdated, ...memberWithoutIdAndDate } = member;
    setNewMember(memberWithoutIdAndDate as Omit<TeamMember, 'id' | 'lastUpdated'>);
    setShowEditMemberModal(true);
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;
    
    // Validation
    if (!newMember.name.trim()) {
      alert('Please enter a name');
      return;
    }
    if (!newMember.email.trim()) {
      alert('Please enter an email');
      return;
    }
    if (!newMember.position.trim()) {
      alert('Please enter a position');
      return;
    }
    
    // Check for duplicate email (excluding current member)
    if (teamMembers.some(member => 
      member.id !== selectedMember.id && 
      member.email.toLowerCase() === newMember.email.toLowerCase()
    )) {
      alert('A team member with this email already exists');
      return;
    }

    setTeamMembers(teamMembers.map(member => 
      member.id === selectedMember.id ? { ...newMember, id: selectedMember.id, lastUpdated: new Date().toISOString().split('T')[0] } : member
    ));
    setShowEditMemberModal(false);
    setSelectedMember(null);
    resetNewMember();
    addActivity(`Updated team member: ${newMember.name}`);
  };

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowViewMemberModal(true);
  };

  const handleReviewMember = (member: TeamMember) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === member.id ? { ...m, status: 'Completed', lastUpdated: new Date().toISOString().split('T')[0] } : m
    ));
    addActivity(`Completed review for ${member.name}`);
  };

  const handleScheduleReview = () => {
    setShowScheduleReviewModal(true);
  };

  const handleTeamMeeting = () => {
    setShowTeamMeetingModal(true);
  };

  const handleExportReport = (reportType: string) => {
    // Convert team members to EmployeeData format
    const employeeData: EmployeeData[] = teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      email: `${member.name.toLowerCase().replace(' ', '.')}@company.com`,
      team: 'Engineering', // Default team
      position: 'Developer', // Default position
      appraisalStatus: member.appraisalStatus,
      performance: member.performance,
      lastReview: '2024-01-15', // Default date
      manager: 'Manager Name',
      hireDate: '2023-01-01', // Default date
      salary: '65000' // Default salary
    }));

    const performanceData: PerformanceData[] = [
      { period: 'Q4 2023', rating: 'Exceeds Expectations', score: 4.2, feedback: 'Excellent work on the new feature implementation' },
      { period: 'Q3 2023', rating: 'Meets Expectations', score: 3.8, feedback: 'Good progress on assigned tasks' },
      { period: 'Q2 2023', rating: 'Exceeds Expectations', score: 4.1, feedback: 'Outstanding collaboration and innovation' }
    ];

    switch (reportType) {
      case 'Performance Report':
        exportPerformanceSummary(employeeData, performanceData);
        break;
      case 'Analytics Report':
        const analyticsData = {
          totalEmployees: teamMembers.length,
          completedAppraisals: teamMembers.filter(m => m.appraisalStatus === 'Finalized').length,
          completionRate: Math.round((teamMembers.filter(m => m.appraisalStatus === 'Finalized').length / teamMembers.length) * 100),
          averageScore: mockTeamMetrics.averageRating,
          performanceDistribution: {
            'Exceeds Expectations': teamMembers.filter(m => m.performance === 'Exceeds Expectations').length,
            'Meets Expectations': teamMembers.filter(m => m.performance === 'Meets Expectations').length,
            'Below Expectations': teamMembers.filter(m => m.performance === 'Below Expectations').length
          }
        };
        exportAnalyticsReport(analyticsData);
        break;
      case 'All Reports':
        exportAllReports({
          employees: employeeData,
          tasks: [],
          performance: performanceData,
          objectives: [],
          appraisals: []
        });
        break;
      default:
        console.log(`Exporting ${reportType} report`);
    }
    
    addActivity(`Exported ${reportType} report`);
  };

  const addActivity = (action: string) => {
    const newActivity = {
      id: recentActivities.length + 1,
      action,
      time: 'Just now',
      type: 'action'
    };
    setRecentActivities([newActivity, ...recentActivities.slice(0, 9)]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-black dark:text-white" />;
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-black dark:text-white" />;
      default:
        return <Bell className="h-4 w-4 text-black dark:text-white" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-black dark:bg-white rounded-xl shadow p-6 text-white dark:text-black border border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Team Management Dashboard</h2>
            <p className="text-gray-300 dark:text-gray-700">Manage your team&apos;s performance and appraisals</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{mockTeamMetrics.averageRating}</div>
            <div className="text-gray-300 dark:text-gray-700">Team Average Rating</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white dark:bg-black rounded-xl shadow p-3 md:p-6 border border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Team Size</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">{mockTeamMetrics.totalMembers}</p>
            </div>
            <Users className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-black rounded-xl shadow p-3 md:p-6 border border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">{mockTeamMetrics.completedAppraisals}</p>
            </div>
            <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-black rounded-xl shadow p-3 md:p-6 border border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">{mockTeamMetrics.pendingReviews}</p>
            </div>
            <Clock className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-black rounded-xl shadow p-3 md:p-6 border border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">{mockTeamMetrics.completionRate}%</p>
            </div>
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
      </div>

      {/* Team Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Productivity Score</span>
              <span className="font-semibold text-green-600">{mockTeamMetrics.productivityScore}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${mockTeamMetrics.productivityScore}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Team Satisfaction</span>
              <span className="font-semibold text-blue-600">{mockTeamMetrics.teamSatisfaction}/5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(mockTeamMetrics.teamSatisfaction / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Team Goals Progress</h3>
          <div className="space-y-4">
            {teamGoals.map(goal => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Due: {goal.dueDate}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    goal.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {goal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Not Started">Not Started</option>
          </select>
          <button 
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center space-x-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Team Members Grid */}
      {filteredTeamMembers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No team members found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || selectedStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Get started by adding your first team member'}
          </p>
          {(!searchTerm && selectedStatus === 'all') && (
            <button 
              onClick={() => setShowAddMemberModal(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
            >
              Add Team Member
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTeamMembers.map(member => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold text-sm md:text-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{member.name}</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{member.position}</p>
                </div>
              </div>
              <div className="flex space-x-1 md:space-x-2">
                <button 
                  onClick={() => handleViewMember(member)}
                  className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleEditMember(member)}
                  className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Edit Member"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                <span className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                  {member.performance}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{member.rating}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Goals</span>
                <span className="text-sm font-medium">{member.completedGoals}/{member.goals}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tasks</span>
                <span className="text-sm font-medium">{member.completedTasks}/{member.tasks}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                  {getStatusIcon(member.status)}
                  <span>{member.status}</span>
                </span>
                <button 
                  onClick={() => handleReviewMember(member)}
                  className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Performance Reviews</h3>
        <button 
          onClick={handleScheduleReview}
          className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Review</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{member.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                      {getStatusIcon(member.status)}
                      <span>{member.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                      {member.performance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{member.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {member.status === 'Pending Review' && (
                        <button 
                          onClick={() => handleReviewMember(member)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
                        >
                          Review
                        </button>
                      )}
                      {member.status === 'Not Started' && (
                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors" disabled>
                          Waiting
                        </button>
                      )}
                      {member.status === 'Completed' && (
                        <span className="text-green-600 text-sm">✓ Reviewed</span>
                      )}
                      <button 
                        onClick={() => handleViewMember(member)}
                        className="text-black dark:text-white hover:text-indigo-900 dark:hover:text-indigo-400"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Team Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Performance Distribution</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Exceeds Expectations</span>
              <span className="font-semibold text-green-600">50%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Meets Expectations</span>
              <span className="font-semibold text-blue-600">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Below Expectations</span>
              <span className="font-semibold text-red-600">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Team Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Average Rating</span>
              <span className="font-semibold text-black dark:text-white">{mockTeamMetrics.averageRating}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Completion Rate</span>
              <span className="font-semibold text-green-600">{mockTeamMetrics.completionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Productivity Score</span>
              <span className="font-semibold text-blue-600">{mockTeamMetrics.productivityScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Team Satisfaction</span>
              <span className="font-semibold text-purple-600">{mockTeamMetrics.teamSatisfaction}/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Reports</h4>
          <button 
            onClick={() => handleExportReport('All Reports')}
            className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleExportReport('Performance Report')}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <BarChart3 className="h-5 w-5 text-black dark:text-white" />
            <span>Performance Report</span>
          </button>
          <button 
            onClick={() => handleExportReport('Goals Report')}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Target className="h-5 w-5 text-black dark:text-white" />
            <span>Goals Report</span>
          </button>
          <button 
            onClick={() => handleExportReport('Trend Analysis')}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <TrendingUp className="h-5 w-5 text-black dark:text-white" />
            <span>Trend Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manager Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Lead your team to success</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-black dark:bg-white rounded-full"></span>
            </button>
            <button 
              onClick={handleTeamMeeting}
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Team Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-xl">
            <button className="w-full text-center text-sm text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              View All Notifications
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'reviews', label: 'Reviews', icon: UserCheck },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedTab(tab.id);
                    // Close all modals when switching tabs
                    setShowAddMemberModal(false);
                    setShowEditMemberModal(false);
                    setShowViewMemberModal(false);
                    setShowScheduleReviewModal(false);
                    setShowTeamMeetingModal(false);
                    setSelectedMember(null);
                  }}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'team' && renderTeam()}
        {selectedTab === 'reviews' && renderReviews()}
        {selectedTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Add Team Member</h3>
                <button 
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleAddMember(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Performance</label>
                  <select
                    value={newMember.performance}
                    onChange={(e) => setNewMember({...newMember, performance: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Exceeds Expectations">Exceeds Expectations</option>
                    <option value="Meets Expectations">Meets Expectations</option>
                    <option value="Below Expectations">Below Expectations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newMember.rating}
                    onChange={(e) => setNewMember({...newMember, rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Edit Team Member</h3>
                <button 
                  onClick={() => setShowEditMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateMember(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Performance</label>
                  <select
                    value={newMember.performance}
                    onChange={(e) => setNewMember({...newMember, performance: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Exceeds Expectations">Exceeds Expectations</option>
                    <option value="Meets Expectations">Meets Expectations</option>
                    <option value="Below Expectations">Below Expectations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newMember.status}
                    onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newMember.rating}
                    onChange={(e) => setNewMember({...newMember, rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditMemberModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Update Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Team Member Details</h3>
                <button 
                  onClick={() => setShowViewMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedMember.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{selectedMember.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedMember.position}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
                  <p className="text-sm">{selectedMember.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedMember.status)}`}>
                    {getStatusIcon(selectedMember.status)}
                    <span>{selectedMember.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Performance</label>
                  <p className={`text-sm font-medium ${getPerformanceColor(selectedMember.performance)}`}>
                    {selectedMember.performance}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Rating</label>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{selectedMember.rating}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Goals Progress</label>
                  <p className="text-sm">{selectedMember.completedGoals}/{selectedMember.goals} completed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tasks Progress</label>
                  <p className="text-sm">{selectedMember.completedTasks}/{selectedMember.tasks} completed</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Last Updated</label>
                  <p className="text-sm">{selectedMember.lastUpdated}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowViewMemberModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewMemberModal(false);
                    handleEditMember(selectedMember);
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Edit Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Review Modal */}
      {showScheduleReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Schedule Review</h3>
                <button 
                  onClick={() => setShowScheduleReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); setShowScheduleReviewModal(false); addActivity('Scheduled team review meeting'); alert('Review scheduled successfully!'); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Review Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="quarterly">Quarterly Review</option>
                    <option value="annual">Annual Review</option>
                    <option value="mid-year">Mid-Year Review</option>
                    <option value="project">Project Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Team Members</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {teamMembers.map(member => (
                      <label key={member.id} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">{member.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Additional notes for the review..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowScheduleReviewModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Schedule Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Team Meeting Modal */}
      {showTeamMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Schedule Team Meeting</h3>
                <button 
                  onClick={() => setShowTeamMeetingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); setShowTeamMeetingModal(false); addActivity('Scheduled team meeting'); alert('Team meeting scheduled successfully!'); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meeting Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Weekly Team Standup"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meeting Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="standup">Daily Standup</option>
                    <option value="review">Sprint Review</option>
                    <option value="planning">Planning Meeting</option>
                    <option value="one-on-one">One-on-One</option>
                    <option value="all-hands">All Hands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Agenda</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Meeting agenda items..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTeamMeetingModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Schedule Meeting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
