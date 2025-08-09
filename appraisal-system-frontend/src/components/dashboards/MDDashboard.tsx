'use client';
import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building, 
  Award, 
  Target, 
  Calendar, 
  FileText, 
  Download, 
  Eye,
  Plus,
  Settings,
  Bell,
  MessageSquare,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  PieChart,
  Activity,
  Filter,
  Search
} from 'lucide-react';

// Enhanced mock data for MD dashboard
const mockCompanyMetrics = {
  totalEmployees: 156,
  totalDepartments: 8,
  completedAppraisals: 142,
  pendingReviews: 14,
  averageRating: 3.8,
  goalAttainment: 87,
  topPerformers: 23,
  improvementNeeded: 8,
  companySatisfaction: 4.2,
  productivityScore: 91,
  retentionRate: 94,
  budgetUtilization: 89
};

const mockDepartments = [
  { 
    id: 1, 
    name: 'Engineering', 
    employees: 45, 
    completedAppraisals: 42, 
    averageRating: 4.1, 
    productivity: 94, 
    satisfaction: 4.3,
    budgetUtilization: 92,
    topPerformers: 8
  },
  { 
    id: 2, 
    name: 'Sales', 
    employees: 28, 
    completedAppraisals: 25, 
    averageRating: 3.9, 
    productivity: 88, 
    satisfaction: 4.1,
    budgetUtilization: 85,
    topPerformers: 5
  },
  { 
    id: 3, 
    name: 'Marketing', 
    employees: 22, 
    completedAppraisals: 20, 
    averageRating: 3.7, 
    productivity: 91, 
    satisfaction: 4.0,
    budgetUtilization: 87,
    topPerformers: 4
  },
  { 
    id: 4, 
    name: 'HR', 
    employees: 15, 
    completedAppraisals: 15, 
    averageRating: 4.2, 
    productivity: 96, 
    satisfaction: 4.4,
    budgetUtilization: 94,
    topPerformers: 3
  },
  { 
    id: 5, 
    name: 'Finance', 
    employees: 18, 
    completedAppraisals: 16, 
    averageRating: 3.8, 
    productivity: 89, 
    satisfaction: 4.2,
    budgetUtilization: 91,
    topPerformers: 3
  },
  { 
    id: 6, 
    name: 'Operations', 
    employees: 28, 
    completedAppraisals: 24, 
    averageRating: 3.6, 
    productivity: 86, 
    satisfaction: 3.9,
    budgetUtilization: 88,
    topPerformers: 4
  }
];

const mockStrategicGoals = [
  { id: 1, title: 'Increase overall productivity by 15%', progress: 78, target: 100, dueDate: '2024-12-31', status: 'On Track' },
  { id: 2, title: 'Improve employee retention to 95%', progress: 94, target: 95, dueDate: '2024-06-30', status: 'On Track' },
  { id: 3, title: 'Launch new product line', progress: 45, target: 100, dueDate: '2024-09-30', status: 'At Risk' },
  { id: 4, title: 'Expand to 3 new markets', progress: 67, target: 100, dueDate: '2024-12-31', status: 'On Track' },
];

const mockTopPerformers = [
  { id: 1, name: 'Sarah Johnson', department: 'Engineering', rating: 4.8, achievements: 12, impact: 'High' },
  { id: 2, name: 'Michael Chen', department: 'Sales', rating: 4.7, achievements: 15, impact: 'High' },
  { id: 3, name: 'Emily Davis', department: 'Marketing', rating: 4.6, achievements: 10, impact: 'Medium' },
  { id: 4, name: 'David Wilson', department: 'Engineering', rating: 4.5, achievements: 8, impact: 'High' },
  { id: 5, name: 'Lisa Brown', department: 'HR', rating: 4.4, achievements: 6, impact: 'Medium' },
];

const mockRecentActivities = [
  { id: 1, action: 'Q1 Performance Review completed', time: '2 hours ago', type: 'review' },
  { id: 2, action: 'New strategic goal added', time: '1 day ago', type: 'goal' },
  { id: 3, action: 'Department heads meeting scheduled', time: '2 days ago', type: 'meeting' },
  { id: 4, action: 'Budget allocation approved', time: '3 days ago', type: 'budget' },
];

export default function MDDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Behind':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-blue-600 bg-blue-100';
      case 'Low':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDepartments = selectedDepartment === 'all' 
    ? mockDepartments 
    : mockDepartments.filter(dept => dept.name === selectedDepartment);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Executive Dashboard</h2>
            <p className="text-purple-100">Company-wide performance and strategic overview</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{mockCompanyMetrics.averageRating}</div>
            <div className="text-purple-100">Company Average Rating</div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockCompanyMetrics.totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Goal Attainment</p>
              <p className="text-2xl font-bold text-green-600">{mockCompanyMetrics.goalAttainment}%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Productivity Score</p>
              <p className="text-2xl font-bold text-indigo-600">{mockCompanyMetrics.productivityScore}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Retention Rate</p>
              <p className="text-2xl font-bold text-purple-600">{mockCompanyMetrics.retentionRate}%</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Strategic Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Strategic Goals</h3>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Goal</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {mockStrategicGoals.map(goal => (
            <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{goal.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due: {goal.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}/{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.status === 'On Track' ? 'bg-green-600' : 
                      goal.status === 'At Risk' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Company Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Employee Satisfaction</span>
              <span className="font-semibold text-green-600">{mockCompanyMetrics.companySatisfaction}/5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(mockCompanyMetrics.companySatisfaction / 5) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Budget Utilization</span>
              <span className="font-semibold text-blue-600">{mockCompanyMetrics.budgetUtilization}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mockCompanyMetrics.budgetUtilization}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Appraisal Completion</span>
              <span className="font-semibold text-indigo-600">{Math.round((mockCompanyMetrics.completedAppraisals / mockCompanyMetrics.totalEmployees) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(mockCompanyMetrics.completedAppraisals / mockCompanyMetrics.totalEmployees) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {mockRecentActivities.map(activity => (
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
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Department Performance</h3>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="all">All Departments</option>
          {mockDepartments.map(dept => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map(dept => (
          <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">{dept.name}</h4>
              <button className="text-indigo-600 hover:text-indigo-700">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Employees</span>
                <span className="font-medium">{dept.employees}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{dept.averageRating}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Productivity</span>
                <span className="font-medium text-green-600">{dept.productivity}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
                <span className="font-medium text-blue-600">{dept.satisfaction}/5</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Top Performers</span>
                <span className="font-medium text-purple-600">{dept.topPerformers}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                <span className="text-sm font-medium">{dept.completedAppraisals}/{dept.employees}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                <div 
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(dept.completedAppraisals / dept.employees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopPerformers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Top Performers</h3>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Award className="h-4 w-4" />
          <span>Recognition Program</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Achievements</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTopPerformers.map(performer => (
                <tr key={performer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {performer.name.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{performer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{performer.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{performer.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{performer.achievements}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(performer.impact)}`}>
                      {performer.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:hover:text-green-400">
                        <Award className="h-4 w-4" />
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
      <h3 className="text-xl font-semibold">Executive Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Performance Distribution</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Exceeds Expectations</span>
              <span className="font-semibold text-green-600">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Meets Expectations</span>
              <span className="font-semibold text-blue-600">55%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Below Expectations</span>
              <span className="font-semibold text-red-600">10%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Company Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Revenue Growth</span>
              <span className="font-semibold text-green-600">+18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Employee Retention</span>
              <span className="font-semibold text-blue-600">{mockCompanyMetrics.retentionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Customer Satisfaction</span>
              <span className="font-semibold text-indigo-600">4.6/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Market Share</span>
              <span className="font-semibold text-purple-600">+5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Executive Reports</h4>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <span>Performance Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <DollarSign className="h-5 w-5 text-indigo-600" />
            <span>Financial Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Strategic Analysis</span>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Executive Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Strategic overview and company performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Board Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'departments', label: 'Departments', icon: Building },
              { id: 'performers', label: 'Top Performers', icon: Award },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
        {selectedTab === 'departments' && renderDepartments()}
        {selectedTab === 'performers' && renderTopPerformers()}
        {selectedTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}
