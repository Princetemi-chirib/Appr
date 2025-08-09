'use client';
import { useState } from 'react';
import { 
  User, 
  FileText, 
  Calendar, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Award, 
  BookOpen, 
  MessageSquare,
  Bell,
  Plus,
  Edit,
  Eye,
  Download,
  Star,
  BarChart3,
  CalendarDays,
  AlertCircle,
  ThumbsUp,
  Save,
  Send
} from 'lucide-react';

// Enhanced mock data for worker dashboard
const mockGoals = [
  { id: 1, title: 'Complete Advanced React Course', category: 'Learning', progress: 75, target: 100, dueDate: '2024-03-15', status: 'In Progress' },
  { id: 2, title: 'Lead 3 team meetings', category: 'Leadership', progress: 2, target: 3, dueDate: '2024-02-28', status: 'In Progress' },
  { id: 3, title: 'Improve code review quality', category: 'Quality', progress: 90, target: 100, dueDate: '2024-01-31', status: 'Completed' },
];

const mockTasks = [
  { id: 1, title: 'Complete Q1 self-appraisal', priority: 'High', dueDate: '2024-01-31', status: 'Completed', category: 'Appraisal' },
  { id: 2, title: 'Submit project documentation', priority: 'Medium', dueDate: '2024-02-15', status: 'In Progress', category: 'Project' },
  { id: 3, title: 'Attend team training session', priority: 'Low', dueDate: '2024-02-20', status: 'Not Started', category: 'Training' },
  { id: 4, title: 'Review peer code submissions', priority: 'Medium', dueDate: '2024-02-10', status: 'In Progress', category: 'Collaboration' },
];

const mockPerformanceHistory = [
  { period: 'Q4 2023', rating: 'Exceeds Expectations', score: 4.2, feedback: 'Excellent work on the new feature implementation' },
  { period: 'Q3 2023', rating: 'Meets Expectations', score: 3.8, feedback: 'Good progress on assigned tasks' },
  { period: 'Q2 2023', rating: 'Exceeds Expectations', score: 4.1, feedback: 'Outstanding collaboration and innovation' },
];

const mockNotifications = [
  { id: 1, message: 'Your manager has reviewed your appraisal', time: '2 hours ago', type: 'info' },
  { id: 2, message: 'New goal assigned: Complete React certification', time: '1 day ago', type: 'goal' },
  { id: 3, message: 'Team meeting scheduled for tomorrow', time: '2 days ago', type: 'meeting' },
];

// Appraisal sections data
const appraisalSections = [
  {
    id: 'goals',
    title: 'Goals & Achievements',
    description: 'Review your goals and document your achievements',
    status: 'completed',
    progress: 100,
    questions: [
      'What were your main goals for this period?',
      'Which goals did you achieve?',
      'What challenges did you face?',
      'How did you overcome obstacles?'
    ]
  },
  {
    id: 'skills',
    title: 'Skills Assessment',
    description: 'Evaluate your current skills and areas for improvement',
    status: 'in-progress',
    progress: 60,
    questions: [
      'What new skills have you developed?',
      'Which skills need improvement?',
      'What training would be beneficial?',
      'How do you plan to enhance your skills?'
    ]
  },
  {
    id: 'future',
    title: 'Future Goals',
    description: 'Set objectives for the next period',
    status: 'not-started',
    progress: 0,
    questions: [
      'What are your goals for the next period?',
      'What skills do you want to develop?',
      'How can the company support your growth?',
      'What career aspirations do you have?'
    ]
  }
];

export default function WorkerDashboard() {
  const [appraisalStatus, setAppraisalStatus] = useState('Not Started');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [appraisalData, setAppraisalData] = useState({
    goals: { answers: ['', '', '', ''], completed: true },
    skills: { answers: ['', '', '', ''], completed: false },
    future: { answers: ['', '', '', ''], completed: false }
  });
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const handleStartAppraisal = () => {
    setAppraisalStatus('In Progress');
  };

  const handleContinueAppraisal = () => {
    // Find the next incomplete section
    const nextSection = appraisalSections.find(section => 
      appraisalData[section.id as keyof typeof appraisalData]?.completed === false
    );
    if (nextSection) {
      setCurrentSection(nextSection.id);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  const handleSaveSection = (sectionId: string) => {
    setAppraisalData(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId as keyof typeof prev], completed: true }
    }));
    setCurrentSection(null);
    
    // Check if all sections are completed
    const allCompleted = appraisalSections.every(section => 
      appraisalData[section.id as keyof typeof appraisalData]?.completed
    );
    if (allCompleted) {
      setAppraisalStatus('Ready to Submit');
    }
  };

  const handleSubmitAppraisal = () => {
    setAppraisalStatus('Submitted');
    // TODO: Send to backend
    console.log('Appraisal submitted:', appraisalData);
  };

  const handleAnswerChange = (sectionId: string, questionIndex: number, value: string) => {
    setAppraisalData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId as keyof typeof prev],
        answers: prev[sectionId as keyof typeof prev].answers.map((answer, index) => 
          index === questionIndex ? value : answer
        )
      }
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
      case 'Medium':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
      case 'Low':
        return 'text-black dark:text-white bg-gray-100 dark:bg-gray-800';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-white dark:text-black bg-black dark:bg-white';
      case 'In Progress':
        return 'text-black dark:text-white bg-gray-200 dark:bg-gray-700';
      case 'Not Started':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
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

  const renderAppraisalSection = (section: typeof appraisalSections[0]) => {
    const sectionData = appraisalData[section.id as keyof typeof appraisalData];
    const isActive = currentSection === section.id;

    return (
      <div 
        key={section.id}
        className={`p-4 border rounded-lg cursor-pointer transition-all ${
          isActive 
            ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-900' 
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
        }`}
        onClick={() => handleSectionClick(section.id)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {section.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-black dark:text-white" />
            ) : section.status === 'in-progress' ? (
              <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
            <div>
              <h4 className="font-semibold">{section.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{section.progress}%</div>
            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${
                  section.progress === 100 ? 'bg-black dark:bg-white' : 
                  section.progress > 0 ? 'bg-gray-600 dark:bg-gray-400' : 'bg-gray-400'
                }`}
                style={{ width: `${section.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="mt-4 space-y-4">
            {section.questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {question}
                </label>
                <textarea
                  value={sectionData.answers[index] || ''}
                  onChange={(e) => handleAnswerChange(section.id, index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={3}
                  placeholder="Enter your response..."
                />
              </div>
            ))}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setCurrentSection(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveSection(section.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
              >
                <Save className="h-4 w-4" />
                <span>Save Section</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="text-gray-100 dark:text-gray-200">Here's your performance overview for this quarter</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">4.2</div>
            <div className="text-gray-100 dark:text-gray-200">Current Rating</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Appraisal Status</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{appraisalStatus}</p>
            </div>
            <FileText className="h-8 w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Goals Progress</p>
              <p className="text-2xl font-bold text-black dark:text-white">75%</p>
            </div>
            <Target className="h-8 w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Due</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">3</p>
            </div>
            <Clock className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance Trend</p>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">+12%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Appraisal Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-black dark:text-white" />
          <span>Self-Appraisal</span>
        </h3>
        
        {appraisalStatus === 'Not Started' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Ready to start your appraisal?</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete your self-assessment to help your manager provide better feedback</p>
            <button
              onClick={handleStartAppraisal}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
            >
              Start Self-Appraisal
            </button>
          </div>
        )}

        {appraisalStatus === 'In Progress' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <div>
                  <p className="font-medium">Appraisal in Progress</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete all sections to submit for review</p>
                </div>
              </div>
              <button 
                onClick={handleContinueAppraisal}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
              >
                Continue
              </button>
            </div>
            
            <div className="space-y-3">
              {appraisalSections.map(renderAppraisalSection)}
            </div>
          </div>
        )}

        {appraisalStatus === 'Ready to Submit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-black dark:text-white" />
                <div>
                  <p className="font-medium">Appraisal Complete!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All sections have been completed. Ready to submit for review.</p>
                </div>
              </div>
              <button
                onClick={handleSubmitAppraisal}
                className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
              >
                <Send className="h-4 w-4" />
                <span>Submit Appraisal</span>
              </button>
            </div>
          </div>
        )}

        {appraisalStatus === 'Submitted' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-black dark:text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">Appraisal Submitted!</h4>
            <p className="text-gray-600 dark:text-gray-400">Your self-appraisal has been submitted for manager review.</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockNotifications.slice(0, 3).map(notification => (
            <div key={notification.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Goals</h3>
        <button className="flex items-center space-x-2 bg-black dark:bg-white text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map(goal => (
          <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</span>
            </div>
            
            <h4 className="font-semibold mb-2">{goal.title}</h4>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{goal.progress}/{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Due: {goal.dueDate}</span>
              <button className="text-black dark:text-white hover:text-indigo-700">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Tasks</h3>
        <button className="flex items-center space-x-2 bg-black dark:bg-white text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-black dark:text-white hover:text-indigo-900 dark:hover:text-indigo-400">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400">
                        <Edit className="h-4 w-4" />
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

  const renderPerformance = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Performance History</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Performance Trend</h4>
          <div className="space-y-4">
            {mockPerformanceHistory.map((performance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">{performance.period}</p>
                  <p className={`text-sm font-medium ${getRatingColor(performance.rating)}`}>
                    {performance.rating}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black dark:text-white">{performance.score}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="font-semibold mb-4">Recent Feedback</h4>
          <div className="space-y-4">
            {mockPerformanceHistory.map((performance, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{performance.period}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{performance.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Skills Assessment</h4>
          <button className="text-black dark:text-white hover:text-indigo-700 text-sm">Update Skills</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">React Development</span>
              <span className="text-sm font-medium text-black dark:text-white">Advanced</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-black dark:bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Project Management</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Intermediate</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-gray-700 dark:bg-gray-300 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Communication</span>
              <span className="text-sm font-medium text-black dark:text-white">Advanced</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-black dark:bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Leadership</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Beginner</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-gray-600 dark:bg-gray-400 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your performance, goals, and progress</p>
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
              onClick={() => alert('Contact Manager functionality - Connect with backend')}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Contact Manager
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
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'tasks', label: 'Tasks', icon: CheckCircle },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-indigo-500 text-black dark:text-white'
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
        {selectedTab === 'goals' && renderGoals()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'performance' && renderPerformance()}
      </div>
    </div>
  );
}

