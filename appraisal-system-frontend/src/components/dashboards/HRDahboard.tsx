'use client';
import { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  BarChart3, 
  Settings, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Bell,
  TrendingUp,
  Award,
  Target,
  CheckSquare,
  Square,
  CalendarDays,
  User,
  MessageSquare,
  Send,
  X,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';

// Enhanced mock data
const mockEmployees = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', phone: '+1 (555) 123-4567', team: 'Engineering', position: 'Senior Developer', appraisalStatus: 'Not Started', lastReview: '2023-12-15', performance: 'Exceeds Expectations', manager: 'John Smith', hireDate: '2022-03-15', salary: '85000', address: '123 Main St, City, State 12345' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', phone: '+1 (555) 234-5678', team: 'Marketing', position: 'Marketing Manager', appraisalStatus: 'Self-Review Complete', lastReview: '2024-01-10', performance: 'Meets Expectations', manager: 'Sarah Wilson', hireDate: '2021-06-20', salary: '75000', address: '456 Oak Ave, City, State 12345' },
  { id: 3, name: 'Carol Davis', email: 'carol@company.com', phone: '+1 (555) 345-6789', team: 'Sales', position: 'Sales Representative', appraisalStatus: 'Manager Review Pending', lastReview: '2024-01-05', performance: 'Below Expectations', manager: 'Mike Brown', hireDate: '2023-01-10', salary: '60000', address: '789 Pine Rd, City, State 12345' },
  { id: 4, name: 'David Wilson', email: 'david@company.com', phone: '+1 (555) 456-7890', team: 'Engineering', position: 'Team Lead', appraisalStatus: 'Finalized', lastReview: '2024-01-20', performance: 'Exceeds Expectations', manager: 'John Smith', hireDate: '2020-09-15', salary: '95000', address: '321 Elm St, City, State 12345' },
  { id: 5, name: 'Eva Brown', email: 'eva@company.com', phone: '+1 (555) 567-8901', team: 'HR', position: 'HR Specialist', appraisalStatus: 'Not Started', lastReview: '2023-11-30', performance: 'Meets Expectations', manager: 'HR Director', hireDate: '2022-11-05', salary: '65000', address: '654 Maple Dr, City, State 12345' },
  { id: 6, name: 'Frank Miller', email: 'frank@company.com', phone: '+1 (555) 678-9012', team: 'Finance', position: 'Financial Analyst', appraisalStatus: 'Self-Review Complete', lastReview: '2024-01-15', performance: 'Meets Expectations', manager: 'Lisa Chen', hireDate: '2021-12-01', salary: '70000', address: '987 Cedar Ln, City, State 12345' },
];

const mockAppraisalCycles = [
  { id: 1, name: 'Q4 2023 Performance Review', startDate: '2023-10-01', endDate: '2023-12-31', status: 'Completed', completionRate: 95 },
  { id: 2, name: 'Q1 2024 Performance Review', startDate: '2024-01-01', endDate: '2024-03-31', status: 'In Progress', completionRate: 67 },
  { id: 3, name: 'Q2 2024 Performance Review', startDate: '2024-04-01', endDate: '2024-06-30', status: 'Scheduled', completionRate: 0 },
];

const mockTeams = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

const mockPositions = [
  'Senior Developer', 'Junior Developer', 'Team Lead', 'Project Manager',
  'Marketing Manager', 'Marketing Specialist', 'Sales Representative', 'Sales Manager',
  'HR Specialist', 'HR Manager', 'Financial Analyst', 'Accountant',
  'Operations Manager', 'Customer Support', 'Product Manager', 'Designer'
];

const mockManagers = [
  'John Smith', 'Sarah Wilson', 'Mike Brown', 'Lisa Chen', 'HR Director',
  'David Johnson', 'Emily Davis', 'Robert Wilson', 'Jennifer Lee'
];

// Enhanced mock data for task management
const mockTasks = [
  { 
    id: 1, 
    title: 'Complete Q1 Performance Review', 
    description: 'Review and finalize all Q1 performance evaluations for the engineering team',
    assignedTo: 'Alice Johnson',
    assignedToId: 1,
    assignedBy: 'HR Manager',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-02-15',
    team: 'Engineering',
    category: 'Performance Review',
    createdAt: '2024-01-20',
    progress: 65
  },
  { 
    id: 2, 
    title: 'Update Employee Handbook', 
    description: 'Review and update the company employee handbook with new policies',
    assignedTo: 'Eva Brown',
    assignedToId: 5,
    assignedBy: 'HR Director',
    priority: 'Medium',
    status: 'Not Started',
    dueDate: '2024-03-01',
    team: 'HR',
    category: 'Documentation',
    createdAt: '2024-01-25',
    progress: 0
  },
  { 
    id: 3, 
    title: 'Conduct Training Session', 
    description: 'Organize and conduct new employee orientation training session',
    assignedTo: 'Bob Smith',
    assignedToId: 2,
    assignedBy: 'HR Manager',
    priority: 'High',
    status: 'Completed',
    dueDate: '2024-01-30',
    team: 'Marketing',
    category: 'Training',
    createdAt: '2024-01-15',
    progress: 100
  },
  { 
    id: 4, 
    title: 'Review Compensation Plans', 
    description: 'Analyze and update compensation plans for all departments',
    assignedTo: 'Frank Miller',
    assignedToId: 6,
    assignedBy: 'HR Director',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-02-28',
    team: 'Finance',
    category: 'Compensation',
    createdAt: '2024-01-22',
    progress: 40
  }
];

const taskCategories = ['Performance Review', 'Training', 'Documentation', 'Compensation', 'Recruitment', 'Compliance', 'General'];
const taskPriorities = ['Low', 'Medium', 'High', 'Urgent'];
const taskStatuses = ['Not Started', 'In Progress', 'Under Review', 'Completed', 'On Hold'];

// TaskForm Component
const TaskForm = ({ 
  task, 
  employees, 
  teams, 
  categories, 
  priorities, 
  onSave, 
  onCancel 
}: {
  task: any;
  employees: any[];
  teams: string[];
  categories: string[];
  priorities: string[];
  onSave: (taskData: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assignedTo: task?.assignedTo || '',
    assignedToId: task?.assignedToId || '',
    team: task?.team || '',
    category: task?.category || '',
    priority: task?.priority || 'Medium',
    status: task?.status || 'Not Started',
    dueDate: task?.dueDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Describe the task in detail"
          />
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assign To *
          </label>
          <select
            required
            value={formData.assignedTo}
            onChange={(e) => {
              const selectedEmployee = employees.find(emp => emp.name === e.target.value);
              handleInputChange('assignedTo', e.target.value);
              handleInputChange('assignedToId', selectedEmployee?.id?.toString() || '');
              handleInputChange('team', selectedEmployee?.team || '');
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.name}>
                {employee.name} - {employee.position} ({employee.team})
              </option>
            ))}
          </select>
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Team
          </label>
          <select
            value={formData.team}
            onChange={(e) => handleInputChange('team', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority *
          </label>
          <select
            required
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Due Date *
          </label>
          <input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {taskStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 border border-black dark:border-white transition-colors flex items-center space-x-2"
        >
          <Send className="h-4 w-4" />
          <span>{task ? 'Update Task' : 'Assign Task'}</span>
        </button>
      </div>
    </form>
  );
};

// EmployeeForm Component
const EmployeeForm = ({ 
  employee, 
  teams, 
  positions, 
  managers, 
  onSave, 
  onCancel 
}: {
  employee: any;
  teams: string[];
  positions: string[];
  managers: string[];
  onSave: (employeeData: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    team: employee?.team || '',
    position: employee?.position || '',
    manager: employee?.manager || '',
    hireDate: employee?.hireDate || '',
    salary: employee?.salary || '',
    address: employee?.address || '',
    appraisalStatus: employee?.appraisalStatus || 'Not Started',
    performance: employee?.performance || 'Meets Expectations',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter employee full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="employee@company.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Team *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              required
              value={formData.team}
              onChange={(e) => handleInputChange('team', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Position *
          </label>
          <select
            required
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Position</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        {/* Manager */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Manager
          </label>
          <select
            value={formData.manager}
            onChange={(e) => handleInputChange('manager', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Manager</option>
            {managers.map(manager => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
          </select>
        </div>

        {/* Hire Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hire Date *
          </label>
          <input
            type="date"
            required
            value={formData.hireDate}
            onChange={(e) => handleInputChange('hireDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Salary
          </label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="50000"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter employee address"
            />
          </div>
        </div>

        {/* Appraisal Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Appraisal Status
          </label>
          <select
            value={formData.appraisalStatus}
            onChange={(e) => handleInputChange('appraisalStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {['Not Started', 'Self-Review Complete', 'Manager Review Pending', 'HR Review', 'Finalized'].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Performance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Performance Rating
          </label>
          <select
            value={formData.performance}
            onChange={(e) => handleInputChange('performance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {['Exceeds Expectations', 'Meets Expectations', 'Below Expectations'].map(performance => (
              <option key={performance} value={performance}>{performance}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 border border-black dark:border-white transition-colors flex items-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>{employee ? 'Update Employee' : 'Add Employee'}</span>
        </button>
      </div>
    </form>
  );
};

export default function HRDashboard() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Task management states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskSearchTerm, setTaskSearchTerm] = useState('');
  const [taskFilterTeam, setTaskFilterTeam] = useState('all');
  const [taskFilterStatus, setTaskFilterStatus] = useState('all');
  const [taskFilterPriority, setTaskFilterPriority] = useState('all');

  // Employee management states
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employeeFilterTeam, setEmployeeFilterTeam] = useState('all');
  const [employeeFilterPosition, setEmployeeFilterPosition] = useState('all');
  const [employeeFilterManager, setEmployeeFilterManager] = useState('all');

  const handleStatusChange = (employeeId: number, newStatus: string) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === employeeId ? { ...employee, appraisalStatus: newStatus } : employee
      )
    );
  };

  const statusOptions = ['Not Started', 'Self-Review Complete', 'Manager Review Pending', 'HR Review', 'Finalized'];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Finalized':
        return 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white';
      case 'HR Review':
        return 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black border-gray-700 dark:border-gray-300';
      case 'Manager Review Pending':
        return 'bg-gray-600 dark:bg-gray-400 text-white dark:text-black border-gray-600 dark:border-gray-400';
      case 'Self-Review Complete':
        return 'bg-gray-500 dark:bg-gray-500 text-white dark:text-white border-gray-500 dark:border-gray-500';
      default:
        return 'bg-gray-400 dark:bg-gray-600 text-white dark:text-white border-gray-400 dark:border-gray-600';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Exceeds Expectations':
        return 'text-black dark:text-white';
      case 'Meets Expectations':
        return 'text-gray-700 dark:text-gray-300';
      case 'Below Expectations':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  // Task management functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-gray-400 dark:bg-gray-600 text-white dark:text-white border-gray-400 dark:border-gray-600';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-gray-500 dark:bg-gray-500 text-white dark:text-white border-gray-500 dark:border-gray-500';
      case 'Low':
        return 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white';
      case 'In Progress':
        return 'bg-gray-600 dark:bg-gray-400 text-white dark:text-black border-gray-600 dark:border-gray-400';
      case 'Under Review':
        return 'bg-gray-700 dark:bg-gray-300 text-white dark:text-black border-gray-700 dark:border-gray-300';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Not Started':
        return 'bg-gray-400 dark:bg-gray-600 text-white dark:text-white border-gray-400 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSaveTask = (taskData: any) => {
    if (selectedTask) {
      // Edit existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: Math.max(...tasks.map(t => t.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        progress: 0
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    setShowTaskModal(false);
  };

  const handleCreateEmployee = () => {
    setSelectedEmployee(null);
    setShowEmployeeModal(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
  };

  const handleSaveEmployee = (employeeData: any) => {
    if (selectedEmployee) {
      // Edit existing employee
      setEmployees(prevEmployees =>
        prevEmployees.map(emp =>
          emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp
        )
      );
    } else {
      // Create new employee
      const newEmployee = {
        ...employeeData,
        id: Math.max(...employees.map(e => e.id)) + 1,
        hireDate: employeeData.hireDate || new Date().toISOString().split('T')[0],
        appraisalStatus: employeeData.appraisalStatus || 'Not Started',
        performance: employeeData.performance || 'Meets Expectations',
      };
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    }
    setShowEmployeeModal(false);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || employee.team === selectedTeam;
    const matchesStatus = selectedStatus === 'all' || employee.appraisalStatus === selectedStatus;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(taskSearchTerm.toLowerCase());
    const matchesTeam = taskFilterTeam === 'all' || task.team === taskFilterTeam;
    const matchesStatus = taskFilterStatus === 'all' || task.status === taskFilterStatus;
    const matchesPriority = taskFilterPriority === 'all' || task.priority === taskFilterPriority;
    return matchesSearch && matchesTeam && matchesStatus && matchesPriority;
  });

  const stats = {
    totalEmployees: employees.length,
    completedAppraisals: employees.filter(e => e.appraisalStatus === 'Finalized').length,
    pendingReviews: employees.filter(e => e.appraisalStatus === 'Manager Review Pending' || e.appraisalStatus === 'HR Review').length,
    notStarted: employees.filter(e => e.appraisalStatus === 'Not Started').length,
    completionRate: Math.round((employees.filter(e => e.appraisalStatus === 'Finalized').length / employees.length) * 100),
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'Completed').length,
    pendingTasks: tasks.filter(t => t.status === 'In Progress' || t.status === 'Under Review').length,
    urgentTasks: tasks.filter(t => t.priority === 'Urgent' || t.priority === 'High').length,
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-black dark:text-white">{stats.completedAppraisals}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingReviews}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.completionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Plus className="h-5 w-5 text-indigo-600" />
            <span>Add New Employee</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <span>Create Appraisal Cycle</span>
          </button>
          <button 
            onClick={handleCreateTask}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <CheckSquare className="h-5 w-5 text-indigo-600" />
            <span>Assign New Task</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-5 w-5 text-indigo-600" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* Task Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Task Overview</h3>
          <button 
            onClick={() => setSelectedTab('tasks')}
            className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 text-sm font-medium"
          >
            View All Tasks →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.totalTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-black dark:text-white">{stats.completedTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-gray-500 dark:text-gray-400">{stats.urgentTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Urgent</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {employees.slice(0, 5).map(employee => (
            <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {employee.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{employee.team}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(employee.appraisalStatus)}`}>
                {employee.appraisalStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Teams</option>
            {mockTeams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={employee.appraisalStatus}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                      {employee.performance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.lastReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
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

  const renderAppraisalCycles = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Appraisal Cycles</h3>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Cycle</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {mockAppraisalCycles.map(cycle => (
            <div key={cycle.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{cycle.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cycle.startDate} - {cycle.endDate}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cycle.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      cycle.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {cycle.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {cycle.completionRate}% Complete
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Exceeds Expectations</span>
              <span className="font-semibold text-black dark:text-white">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Meets Expectations</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Below Expectations</span>
              <span className="font-semibold text-gray-500 dark:text-gray-400">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Team Performance</h3>
          <div className="space-y-3">
            {mockTeams.map(team => (
              <div key={team} className="flex justify-between items-center">
                <span>{team}</span>
                <span className="font-semibold text-indigo-600">85%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reports</h3>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FileText className="h-5 w-5 text-indigo-600" />
            <span>Performance Summary</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <span>Analytics Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Award className="h-5 w-5 text-indigo-600" />
            <span>Recognition Report</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">System Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <h4 className="font-medium">Appraisal Cycle Duration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set the default duration for appraisal cycles</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <h4 className="font-medium">Auto Reminders</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable automatic reminder emails</p>
            </div>
            <button className="w-12 h-6 bg-indigo-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </button>
          </div>
          
          <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <h4 className="font-medium">Performance Levels</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configure performance rating levels</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
              <Edit className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Task Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={taskSearchTerm}
                onChange={(e) => setTaskSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <select
            value={taskFilterTeam}
            onChange={(e) => setTaskFilterTeam(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Teams</option>
            {mockTeams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={taskFilterStatus}
            onChange={(e) => setTaskFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Statuses</option>
            {taskStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={taskFilterPriority}
            onChange={(e) => setTaskFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Priorities</option>
            {taskPriorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Task Management</h3>
            <button 
              onClick={handleCreateTask}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Assign New Task</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {taskStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Creation/Edit Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {selectedTask ? 'Edit Task' : 'Assign New Task'}
                </h3>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <TaskForm 
              task={selectedTask}
              employees={employees}
              teams={mockTeams}
              categories={taskCategories}
              priorities={taskPriorities}
              onSave={handleSaveTask}
              onCancel={() => setShowTaskModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderEmployeesManagement = () => (
    <div className="space-y-6">
      {/* Header with Add Employee Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Employee Management</h3>
          <button 
            onClick={handleCreateEmployee}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={employeeSearchTerm}
                onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <select
            value={employeeFilterTeam}
            onChange={(e) => setEmployeeFilterTeam(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Teams</option>
            {mockTeams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={employeeFilterPosition}
            onChange={(e) => setEmployeeFilterPosition(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Positions</option>
            {mockPositions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <select
            value={employeeFilterManager}
            onChange={(e) => setEmployeeFilterManager(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Managers</option>
            {mockManagers.map(manager => (
              <option key={manager} value={manager}>{manager}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hire Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {employees.filter(emp => {
                const matchesSearch = emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                                     emp.email.toLowerCase().includes(employeeSearchTerm.toLowerCase());
                const matchesTeam = employeeFilterTeam === 'all' || emp.team === employeeFilterTeam;
                const matchesPosition = employeeFilterPosition === 'all' || emp.position === employeeFilterPosition;
                const matchesManager = employeeFilterManager === 'all' || emp.manager === employeeFilterManager;
                return matchesSearch && matchesTeam && matchesPosition && matchesManager;
              }).map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.manager}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.hireDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.salary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={employee.appraisalStatus}
                      onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                      {employee.performance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.lastReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditEmployee(employee)}
                        className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Creation/Edit Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h3>
                <button 
                  onClick={() => setShowEmployeeModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
                         <EmployeeForm 
               employee={selectedEmployee}
               teams={mockTeams}
               positions={mockPositions}
               managers={mockManagers}
               onSave={handleSaveEmployee}
               onCancel={() => setShowEmployeeModal(false)}
             />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">HR Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage employees, appraisals, and system settings</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={handleCreateEmployee}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Add Employee
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
              { id: 'employees', label: 'Employees', icon: Users },
              { id: 'cycles', label: 'Appraisal Cycles', icon: Calendar },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
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
        {selectedTab === 'employees' && renderEmployees()}
        {selectedTab === 'cycles' && renderAppraisalCycles()}
        {selectedTab === 'reports' && renderReports()}
        {selectedTab === 'settings' && renderSettings()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'employees' && renderEmployeesManagement()}
      </div>
    </div>
  );
}