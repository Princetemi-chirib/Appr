'use client';
import { useState, useEffect } from 'react';
import { 
  User, 
  Target, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  Star,
  Plus,
  Minus,
  Save,
  X,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Percent,
  CheckSquare,
  Square,
  Send,
  Edit,
  Eye,
  BarChart3,
  Bell,
  MessageSquare
} from 'lucide-react';
import { 
  mockPerspectives, 
  mockAppraisalPeriods, 
  mockUserObjectives,
  mockSelfAppraisals,
  getCurrentPeriod,
  getObjectiveById
} from '../../lib/mock-data';

// Enhanced mock data for worker dashboard with better structure
const mockGoals = [
  { 
    id: 1, 
    title: 'Complete Advanced React Course', 
    category: 'Learning', 
    progress: 75, 
    target: 100, 
    dueDate: '2024-03-15', 
    status: 'In Progress',
    description: 'Master advanced React concepts including hooks, context, and performance optimization',
    milestones: ['Complete Hooks module', 'Build advanced project', 'Pass final assessment'],
    completedMilestones: 2
  },
  { 
    id: 2, 
    title: 'Lead 3 team meetings', 
    category: 'Leadership', 
    progress: 2, 
    target: 3, 
    dueDate: '2024-02-28', 
    status: 'In Progress',
    description: 'Take initiative in leading team discussions and project planning',
    milestones: ['Schedule meetings', 'Prepare agendas', 'Facilitate discussions'],
    completedMilestones: 2
  },
  { 
    id: 3, 
    title: 'Improve code review quality', 
    category: 'Quality', 
    progress: 90, 
    target: 100, 
    dueDate: '2024-01-31', 
    status: 'Completed',
    description: 'Enhance code review process and provide constructive feedback',
    milestones: ['Review 50+ PRs', 'Provide detailed feedback', 'Mentor junior developers'],
    completedMilestones: 3
  },
];

const mockTasks = [
  { 
    id: 1, 
    title: 'Complete Q1 self-appraisal', 
    priority: 'High', 
    dueDate: '2024-01-31', 
    status: 'Completed', 
    category: 'Appraisal',
    description: 'Submit comprehensive self-assessment for Q1 performance review',
    estimatedHours: 4,
    actualHours: 3.5,
    assignedBy: 'Manager',
    relatedGoal: 'Performance Review'
  },
  { 
    id: 2, 
    title: 'Submit project documentation', 
    priority: 'Medium', 
    dueDate: '2024-02-15', 
    status: 'In Progress', 
    category: 'Project',
    description: 'Complete technical documentation for the new feature implementation',
    estimatedHours: 8,
    actualHours: 5,
    assignedBy: 'Project Lead',
    relatedGoal: 'Project Delivery'
  },
  { 
    id: 3, 
    title: 'Attend team training session', 
    priority: 'Low', 
    dueDate: '2024-02-20', 
    status: 'Not Started', 
    category: 'Training',
    description: 'Participate in the new development workflow training',
    estimatedHours: 2,
    actualHours: 0,
    assignedBy: 'HR',
    relatedGoal: 'Skill Development'
  },
  { 
    id: 4, 
    title: 'Review peer code submissions', 
    priority: 'Medium', 
    dueDate: '2024-02-10', 
    status: 'In Progress', 
    category: 'Collaboration',
    description: 'Review and provide feedback on team member code submissions',
    estimatedHours: 6,
    actualHours: 4,
    assignedBy: 'Team Lead',
    relatedGoal: 'Team Collaboration'
  },
];

const mockPerformanceHistory = [
  { 
    period: 'Q4 2023', 
    rating: 'Exceeds Expectations', 
    score: 4.2, 
    feedback: 'Excellent work on the new feature implementation. Demonstrated strong technical skills and leadership qualities.',
    goalsAchieved: 4,
    totalGoals: 4,
    skillsImproved: ['React', 'TypeScript', 'Leadership'],
    areasForGrowth: ['Public Speaking', 'Advanced Architecture']
  },
  { 
    period: 'Q3 2023', 
    rating: 'Meets Expectations', 
    score: 3.8, 
    feedback: 'Good progress on assigned tasks. Showed improvement in team collaboration and project delivery.',
    goalsAchieved: 3,
    totalGoals: 4,
    skillsImproved: ['Teamwork', 'Time Management'],
    areasForGrowth: ['Technical Leadership', 'Mentoring']
  },
  { 
    period: 'Q2 2023', 
    rating: 'Exceeds Expectations', 
    score: 4.1, 
    feedback: 'Outstanding collaboration and innovation. Led successful project delivery and mentored junior team members.',
    goalsAchieved: 5,
    totalGoals: 4,
    skillsImproved: ['Project Management', 'Mentoring', 'Innovation'],
    areasForGrowth: ['Strategic Thinking']
  },
];

const mockNotifications = [
  { 
    id: 1, 
    message: 'Your manager has reviewed your appraisal', 
    time: '2 hours ago', 
    type: 'info',
    read: false,
    action: 'View Details'
  },
  { 
    id: 2, 
    message: 'New goal assigned: Complete React certification', 
    time: '1 day ago', 
    type: 'goal',
    read: false,
    action: 'Accept Goal'
  },
  { 
    id: 3, 
    message: 'Team meeting scheduled for tomorrow', 
    time: '2 days ago', 
    type: 'meeting',
    read: true,
    action: 'Add to Calendar'
  },
];

// Skills assessment data
const mockSkills = {
  technical: [
    { name: 'React Development', level: 'Advanced', progress: 90, lastAssessed: '2024-01-15' },
    { name: 'TypeScript', level: 'Intermediate', progress: 75, lastAssessed: '2024-01-10' },
    { name: 'Node.js', level: 'Intermediate', progress: 70, lastAssessed: '2024-01-05' },
    { name: 'Database Design', level: 'Beginner', progress: 45, lastAssessed: '2024-01-20' }
  ],
  soft: [
    { name: 'Communication', level: 'Advanced', progress: 85, lastAssessed: '2024-01-12' },
    { name: 'Leadership', level: 'Intermediate', progress: 65, lastAssessed: '2024-01-08' },
    { name: 'Problem Solving', level: 'Advanced', progress: 80, lastAssessed: '2024-01-14' },
    { name: 'Teamwork', level: 'Advanced', progress: 88, lastAssessed: '2024-01-16' }
  ]
};

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
  // Core dashboard state
  const [appraisalStatus, setAppraisalStatus] = useState('Not Started');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  // Modal states for forms
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUpdateSkillsModal, setShowUpdateSkillsModal] = useState(false);
  const [showContactManagerModal, setShowContactManagerModal] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [viewingTask, setViewingTask] = useState<any>(null);
  
  // Form states
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'Learning',
    description: '',
    target: 100,
    dueDate: '',
    milestones: ['']
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Project',
    dueDate: '',
    estimatedHours: 4
  });
  
  const [contactMessage, setContactMessage] = useState({
    subject: '',
    message: ''
  });
  
  const [skillsFormData, setSkillsFormData] = useState({
    technical: mockSkills.technical.map(skill => ({ ...skill })),
    soft: mockSkills.soft.map(skill => ({ ...skill }))
  });
  
  // Enhanced data state with real-time updates
  const [goals, setGoals] = useState(mockGoals);
  const [tasks, setTasks] = useState(mockTasks);
  const [performanceHistory, setPerformanceHistory] = useState(mockPerformanceHistory);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [skills, setSkills] = useState(mockSkills);
  
  // Dashboard metrics state
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalGoals: mockGoals.length,
    completedGoals: mockGoals.filter(g => g.status === 'Completed').length,
    totalTasks: mockTasks.length,
    completedTasks: mockTasks.filter(t => t.status === 'Completed').length,
    overdueTasks: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
    currentRating: 4.2,
    performanceTrend: 12
  });
  
  // Appraisal data state
  const [appraisalData, setAppraisalData] = useState({
    goals: { answers: ['', '', '', ''], completed: true },
    skills: { answers: ['', '', '', ''], completed: false },
    future: { answers: ['', '', '', ''], completed: false }
  });

  // User Objective Selection & Weighting state
  const [selectedPerspective, setSelectedPerspective] = useState<number | null>(null);
  const [selectedObjectives, setSelectedObjectives] = useState<{[key: number]: number}>({});
  const [objectiveWeights, setObjectiveWeights] = useState<{[key: number]: number}>({});
  const [totalWeight, setTotalWeight] = useState(0);
  const [weightError, setWeightError] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(getCurrentPeriod());
  const [userObjectives, setUserObjectives] = useState<any>(null);
  const [showObjectiveSelection, setShowObjectiveSelection] = useState(false);

  // Self-Appraisal state
  const [selfAppraisalData, setSelfAppraisalData] = useState<{[key: number]: {
    weightAchieved: number;
    selfRating: string;
    comments: string;
    achievements: string;
    challenges: string;
    improvements: string;
  }}>({});
  const [overallComments, setOverallComments] = useState('');
  const [showSelfAppraisal, setShowSelfAppraisal] = useState(false);
  const [appraisalStep, setAppraisalStep] = useState<'objectives' | 'achievements' | 'skills' | 'future' | 'review'>('objectives');
  const [appraisalProgress, setAppraisalProgress] = useState(0);

  // Initialize user objectives for current period
  useEffect(() => {
    if (currentPeriod) {
      const existingObjectives = mockUserObjectives.find(
        obj => obj.periodId === currentPeriod.id && obj.userId === 1 // Assuming current user ID is 1
      );
      setUserObjectives(existingObjectives);
      
      if (existingObjectives) {
        const selected: {[key: number]: number} = {};
        const weights: {[key: number]: number} = {};
        existingObjectives.objectives.forEach((obj: any) => {
          selected[obj.objectiveId] = obj.weight;
          weights[obj.objectiveId] = obj.weight;
        });
        setSelectedObjectives(selected);
        setObjectiveWeights(weights);
        setTotalWeight(existingObjectives.totalWeight);
      }
    }
  }, [currentPeriod]);

  // Calculate total weight when objectives or weights change
  useEffect(() => {
    const total = Object.values(objectiveWeights).reduce((sum, weight) => sum + weight, 0);
    setTotalWeight(total);
    
    if (total !== 100 && Object.keys(selectedObjectives).length > 0) {
      setWeightError(`Total weight must be 100. Current total: ${total}`);
    } else {
      setWeightError('');
    }
  }, [objectiveWeights, selectedObjectives]);

  const handleObjectiveSelection = (objectiveId: number, isSelected: boolean) => {
    if (isSelected) {
      const objective = getObjectiveById(objectiveId);
      if (objective) {
        setSelectedObjectives(prev => ({ ...prev, [objectiveId]: objective.defaultWeight }));
        setObjectiveWeights(prev => ({ ...prev, [objectiveId]: objective.defaultWeight }));
      }
    } else {
      setSelectedObjectives(prev => {
        const newSelected = { ...prev };
        delete newSelected[objectiveId];
        return newSelected;
      });
      setObjectiveWeights(prev => {
        const newWeights = { ...prev };
        delete newWeights[objectiveId];
        return newWeights;
      });
    }
  };

  const handleWeightChange = (objectiveId: number, weight: number) => {
    setObjectiveWeights(prev => ({ ...prev, [objectiveId]: weight }));
  };

  const calculateTotalWeight = () => {
    const total = Object.values(objectiveWeights).reduce((sum, weight) => sum + weight, 0);
    setTotalWeight(total);
    
    if (total !== 100) {
      setWeightError(`Total weight must be 100. Current total: ${total}`);
    } else {
      setWeightError('');
    }
  };

  useEffect(() => {
    calculateTotalWeight();
  }, [objectiveWeights]);

  const handleSaveObjectives = () => {
    if (totalWeight !== 100) {
      setWeightError('Total weight must be exactly 100%');
      return;
    }

    const objectivesData = Object.entries(objectiveWeights).map(([objectiveId, weight]) => ({
      objectiveId: parseInt(objectiveId),
      weight,
      status: 'Pending Approval'
    }));

    const newUserObjectives = {
      id: Math.max(...mockUserObjectives.map(uo => uo.id)) + 1,
      userId: 1, // Mock user ID
      periodId: currentPeriod?.id || 1,
      objectives: objectivesData,
      totalWeight: 100,
      status: 'Pending Approval',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setUserObjectives(newUserObjectives);
    setShowObjectiveSelection(false);
    // In a real app, this would be saved to the backend
    console.log('Objectives saved:', newUserObjectives);
  };



  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
  };

  const handleSaveSection = (sectionId: string) => {
    const updatedData = {
      ...appraisalData,
      [sectionId]: { ...appraisalData[sectionId as keyof typeof appraisalData], completed: true }
    };
    setAppraisalData(updatedData);
    setCurrentSection(null);
    
    // Check if all sections are completed using the updated data
    const allCompleted = appraisalSections.every(section => 
      updatedData[section.id as keyof typeof updatedData]?.completed
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

  // Self-Appraisal functions
  const handleSelfAppraisalChange = (objectiveId: number, field: string, value: string | number) => {
    setSelfAppraisalData(prev => ({
      ...prev,
      [objectiveId]: {
        ...prev[objectiveId],
        [field]: value
      }
    }));
  };

  const handleSubmitSelfAppraisal = () => {
    const appraisalData = {
      id: Math.max(...mockSelfAppraisals.map(sa => sa.id)) + 1,
      userId: 1, // Mock user ID
      periodId: currentPeriod?.id || 1,
      objectives: Object.entries(selfAppraisalData).map(([objectiveId, data]) => ({
        objectiveId: parseInt(objectiveId),
        ...data
      })),
      overallComments,
      status: 'Submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setShowSelfAppraisal(false);
    setAppraisalStatus('Submitted');
    // In a real app, this would be saved to the backend
    console.log('Self-appraisal submitted:', appraisalData);
  };

  const handleNextStep = () => {
    const steps = ['objectives', 'achievements', 'skills', 'future', 'review'];
    const currentIndex = steps.indexOf(appraisalStep);
    if (currentIndex < steps.length - 1) {
      setAppraisalStep(steps[currentIndex + 1] as any);
    }
  };

  const handlePreviousStep = () => {
    const steps = ['objectives', 'achievements', 'skills', 'future', 'review'];
    const currentIndex = steps.indexOf(appraisalStep);
    if (currentIndex > 0) {
      setAppraisalStep(steps[currentIndex - 1] as any);
    }
  };

  const handleStartAppraisal = () => {
    setShowSelfAppraisal(true);
    setAppraisalStatus('In Progress');
    setAppraisalStep('objectives');
    
    // Initialize self-appraisal data
    const approvedObjectives = getApprovedObjectives();
    if (approvedObjectives) {
      const initialData: {[key: number]: any} = {};
      approvedObjectives.objectives.forEach((obj: any) => {
        initialData[obj.objectiveId] = {
          weightAchieved: 0,
          selfRating: 'Meets',
          comments: '',
          achievements: '',
          challenges: '',
          improvements: ''
        };
      });
      setSelfAppraisalData(initialData);
    }
  };

  const handleContinueAppraisal = () => {
    setShowSelfAppraisal(true);
  };

  // Step rendering functions
  const renderObjectivesStep = (approvedObjectives: any) => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2 md:mb-4">Review Your Objectives</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
          Review your approved objectives and provide initial feedback on your progress.
        </p>
      </div>

      {approvedObjectives.objectives.map((obj: any) => {
        const objective = getObjectiveById(obj.objectiveId);
        const appraisalData = selfAppraisalData[obj.objectiveId] || {
          weightAchieved: 0,
          selfRating: 'Meets',
          comments: '',
          achievements: '',
          challenges: '',
          improvements: ''
        };

        return (
          <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 md:p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 space-y-1 md:space-y-0">
              <h5 className="font-semibold text-sm md:text-base">{objective?.name}</h5>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Weight: {obj.weight}%</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={appraisalData.weightAchieved}
                  onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'weightAchieved', parseInt(e.target.value) || 0)}
                  className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Self Rating</label>
                <select
                  value={appraisalData.selfRating}
                  onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'selfRating', e.target.value)}
                  className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                >
                  <option value="Exceeds">Exceeds Expectations</option>
                  <option value="Meets">Meets Expectations</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Initial Comments</label>
              <textarea
                value={appraisalData.comments}
                onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'comments', e.target.value)}
                className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                rows={3}
                placeholder="Brief overview of your progress..."
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAchievementsStep = (approvedObjectives: any) => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2 md:mb-4">Document Your Achievements</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
          Detail your key achievements and accomplishments for each objective.
        </p>
      </div>

      {approvedObjectives.objectives.map((obj: any) => {
        const objective = getObjectiveById(obj.objectiveId);
        const appraisalData = selfAppraisalData[obj.objectiveId] || {};

        return (
          <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 md:p-4">
            <h5 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">{objective?.name}</h5>
            
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Key Achievements</label>
              <textarea
                value={appraisalData.achievements || ''}
                onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'achievements', e.target.value)}
                className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                rows={4}
                placeholder="Describe your key achievements, milestones reached, and positive outcomes..."
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSkillsStep = () => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2 md:mb-4">Skills Assessment</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
          Evaluate your current skills and identify areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-3 md:space-y-4">
          <h5 className="font-semibold text-sm md:text-base">Technical Skills</h5>
          {['React Development', 'TypeScript', 'Node.js', 'Database Design'].map(skill => (
            <div key={skill} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-xs md:text-sm">{skill}</span>
                <select className="text-xs md:text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 w-full sm:w-auto">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 md:space-y-4">
          <h5 className="font-semibold text-sm md:text-base">Soft Skills</h5>
          {['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].map(skill => (
            <div key={skill} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-xs md:text-sm">{skill}</span>
                <select className="text-xs md:text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 w-full sm:w-auto">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFutureStep = () => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2 md:mb-4">Future Goals & Development</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
          Outline your goals for the next period and development needs.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Career Goals</label>
          <textarea
            className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            rows={3}
            placeholder="What are your career goals for the next 6-12 months?"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Skills to Develop</label>
          <textarea
            className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            rows={3}
            placeholder="What skills would you like to develop or improve?"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Support Needed</label>
          <textarea
            className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            rows={3}
            placeholder="What support or resources do you need to achieve your goals?"
          />
        </div>
      </div>
    </div>
  );

  const renderReviewStep = (approvedObjectives: any) => (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2 md:mb-4">Review & Summary</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
          Review your self-appraisal before submitting it for manager review.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {approvedObjectives.objectives.map((obj: any) => {
          const objective = getObjectiveById(obj.objectiveId);
          const appraisalData = selfAppraisalData[obj.objectiveId] || {};

          return (
            <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 md:p-4">
              <h5 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">{objective?.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                <div>
                  <span className="font-medium">Progress:</span> {appraisalData.weightAchieved || 0}%
                </div>
                <div>
                  <span className="font-medium">Rating:</span> {appraisalData.selfRating || 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Weight:</span> {obj.weight}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Overall Comments</label>
        <textarea
          value={overallComments}
          onChange={(e) => setOverallComments(e.target.value)}
          className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          rows={4}
          placeholder="Provide overall feedback about your performance, achievements, and areas for growth..."
        />
      </div>
    </div>
  );

  // Utility functions for data management
  const getApprovedObjectives = () => {
    // In a real app, this would fetch from backend
    return mockUserObjectives.find(uo => uo.userId === 1 && uo.status === 'Approved');
  };

  const isObjectiveSelected = (objectiveId: number) => {
    return objectiveId in selectedObjectives;
  };

  // Update dashboard metrics when data changes
  const updateDashboardMetrics = () => {
    const completedGoals = goals.filter(g => g.status === 'Completed').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;
    
    // Calculate performance trend based on actual data
    const goalCompletionRate = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;
    const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    const performanceTrend = Math.round((goalCompletionRate + taskCompletionRate) / 2);
    
    // Calculate current rating based on actual performance
    const avgGoalProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + (goal.progress / goal.target), 0) / goals.length : 0;
    const currentRating = Math.min(5, Math.max(1, avgGoalProgress * 5));
    
    setDashboardMetrics({
      totalGoals: goals.length,
      completedGoals,
      totalTasks: tasks.length,
      completedTasks,
      overdueTasks,
      currentRating: Math.round(currentRating * 10) / 10,
      performanceTrend
    });
  };

  // Goal management functions
  const updateGoalProgress = (goalId: number, progress: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { 
              ...goal, 
              progress, 
              status: progress >= goal.target ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started' 
            }
          : goal
      )
    );
  };

  const updateMilestoneProgress = (goalId: number, completedMilestones: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { ...goal, completedMilestones }
          : goal
      )
    );
  };

  const addGoal = (newGoal: any) => {
    const goal = { ...newGoal, id: Math.max(...goals.map(g => g.id)) + 1 };
    setGoals(prev => [...prev, goal]);
  };

  // Task management functions
  const updateTaskStatus = (taskId: number, status: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const addTask = (newTask: any) => {
    const task = { ...newTask, id: Math.max(...tasks.map(t => t.id)) + 1 };
    setTasks(prev => [...prev, task]);
  };

  // Notification management
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleNotificationAction = (notification: any) => {
    // Mark as read first
    markNotificationAsRead(notification.id);
    
    // Handle different notification types
    switch (notification.type) {
      case 'goal':
        // Navigate to goals tab and show add goal modal
        setSelectedTab('goals');
        setShowAddGoalModal(true);
        break;
      case 'info':
        // Show notification details
        alert(`Notification: ${notification.message}`);
        break;
      case 'meeting':
        // Add to calendar (mock functionality)
        alert('Meeting added to calendar!');
        break;
      default:
        // Default action
        alert(`Action: ${notification.action}`);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  // Skills management
  const updateSkillLevel = (skillName: string, newLevel: string, newProgress: number) => {
    setSkills(prev => ({
      technical: prev.technical.map(skill => 
        skill.name === skillName 
          ? { ...skill, level: newLevel, progress: newProgress, lastAssessed: new Date().toISOString().split('T')[0] }
          : skill
      ),
      soft: prev.soft.map(skill => 
        skill.name === skillName 
          ? { ...skill, level: newLevel, progress: newProgress, lastAssessed: new Date().toISOString().split('T')[0] }
          : skill
      )
    }));
  };

  // Form handling functions
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const goal = {
      id: Math.max(...goals.map(g => g.id)) + 1,
      title: newGoal.title,
      category: newGoal.category,
      progress: 0,
      target: newGoal.target,
      dueDate: newGoal.dueDate,
      status: 'Not Started',
      description: newGoal.description,
      milestones: newGoal.milestones.filter(m => m.trim() !== ''),
      completedMilestones: 0
    };
    
    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      category: 'Learning',
      description: '',
      target: 100,
      dueDate: '',
      milestones: ['']
    });
    setShowAddGoalModal(false);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      status: 'Not Started',
      category: newTask.category,
      description: newTask.description,
      estimatedHours: newTask.estimatedHours,
      actualHours: 0,
      assignedBy: 'Self',
      relatedGoal: 'Personal'
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Project',
      dueDate: '',
      estimatedHours: 4
    });
    setShowAddTaskModal(false);
  };

  const handleUpdateSkills = () => {
    setSkills(skillsFormData);
    setShowUpdateSkillsModal(false);
    alert('Skills updated successfully!');
  };

  const handleContactManager = () => {
    if (!contactMessage.subject || !contactMessage.message) {
      alert('Please fill in both subject and message');
      return;
    }
    
    // In a real app, this would send to backend
    console.log('Contact message:', contactMessage);
    alert('Message sent to manager successfully!');
    setContactMessage({ subject: '', message: '' });
    setShowContactManagerModal(false);
  };

  const addMilestone = () => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, '']
    }));
  };

  const removeMilestone = (index: number) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const updateMilestone = (index: number, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => i === index ? value : milestone)
    }));
  };

  // Edit and view functions
  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      category: goal.category,
      description: goal.description,
      target: goal.target,
      dueDate: goal.dueDate,
      milestones: goal.milestones || ['']
    });
    setShowEditGoalModal(true);
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task clicked:', task);
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours
    });
    setShowEditTaskModal(true);
    console.log('Modal state set to true');
  };

  const handleViewTask = (task: any) => {
    setViewingTask(task);
    setShowViewTaskModal(true);
  };

  const handleUpdateGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const updatedGoal = {
      ...editingGoal,
      title: newGoal.title,
      category: newGoal.category,
      description: newGoal.description,
      target: newGoal.target,
      dueDate: newGoal.dueDate,
      milestones: newGoal.milestones.filter(m => m.trim() !== '')
    };
    
    setGoals(prev => prev.map(goal => goal.id === editingGoal.id ? updatedGoal : goal));
    setShowEditGoalModal(false);
    setEditingGoal(null);
  };

  const handleUpdateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    const updatedTask = {
      ...editingTask,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: newTask.dueDate,
      estimatedHours: newTask.estimatedHours
    };
    
    setTasks(prev => prev.map(task => task.id === editingTask.id ? updatedTask : task));
    setShowEditTaskModal(false);
    setEditingTask(null);
  };

  const handleDeleteGoal = (goalId: number) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const updateTaskHours = (taskId: number, hours: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, actualHours: hours } : task
    ));
  };

  // Update metrics when data changes
  useEffect(() => {
    updateDashboardMetrics();
  }, [goals, tasks, performanceHistory]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showNotifications && !target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Debug modal states
  useEffect(() => {
    console.log('Edit task modal state:', { showEditTaskModal, editingTask });
  }, [showEditTaskModal, editingTask]);

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

      {/* Edit Goal Modal */}
      {showEditGoalModal && editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Goal</h3>
                <button 
                  onClick={() => setShowEditGoalModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Title *</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter goal title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Quality">Quality</option>
                    <option value="Project">Project</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Describe your goal"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Value</label>
                    <input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 100 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Milestones</label>
                  <div className="space-y-2">
                    {newGoal.milestones.map((milestone, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={milestone}
                          onChange={(e) => updateMilestone(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          placeholder={`Milestone ${index + 1}`}
                        />
                        <button
                          onClick={() => removeMilestone(index)}
                          className="px-2 py-2 text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addMilestone}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Milestone
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditGoalModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateGoal}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Update Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* View Task Modal */}
      {showViewTaskModal && viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Task Details</h3>
                <button 
                  onClick={() => setShowViewTaskModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Title</label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{viewingTask.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <p className="text-gray-600 dark:text-gray-400">{viewingTask.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(viewingTask.priority)}`}>
                      {viewingTask.priority}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingTask.category}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingTask.dueDate}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingTask.status)}`}>
                      {viewingTask.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Estimated Hours</label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingTask.estimatedHours}h</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Actual Hours</label>
                    <input
                      type="number"
                      value={viewingTask.actualHours}
                      onChange={(e) => updateTaskHours(viewingTask.id, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter actual hours"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assigned By</label>
                  <p className="text-gray-900 dark:text-gray-100">{viewingTask.assignedBy}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowViewTaskModal(false)}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-black rounded-xl shadow p-4 md:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-sm md:text-base text-gray-300">Here's your performance overview for Q1 2024</p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-2xl md:text-3xl font-bold">{dashboardMetrics.currentRating}</div>
            <div className="text-sm md:text-base text-gray-300">Current Rating</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Goals</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">
                {dashboardMetrics.completedGoals}/{dashboardMetrics.totalGoals}
              </p>
            </div>
            <Target className="h-5 w-5 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Tasks</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">
                {dashboardMetrics.completedTasks}/{dashboardMetrics.totalTasks}
              </p>
            </div>
            <CheckSquare className="h-5 w-5 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Due</p>
              <p className="text-lg md:text-2xl font-bold text-gray-600 dark:text-gray-400">
                {dashboardMetrics.overdueTasks}
              </p>
            </div>
            <Clock className="h-5 w-5 md:h-8 md:w-8 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Trend</p>
              <p className="text-lg md:text-2xl font-bold text-gray-700 dark:text-gray-300">
                +{dashboardMetrics.performanceTrend}%
              </p>
            </div>
            <TrendingUp className="h-5 w-5 md:h-8 md:w-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Enhanced Self-Appraisal Section */}
      {showSelfAppraisal ? (
        renderEnhancedSelfAppraisal()
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-black dark:text-white" />
            <span>Self-Appraisal</span>
          </h3>
          
          {appraisalStatus === 'Not Started' && (
            <div className="text-center py-6 md:py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2">Ready to start your appraisal?</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 px-2">Complete your comprehensive self-assessment with our new step-by-step process</p>
              <button
                onClick={handleStartAppraisal}
                className="bg-black dark:bg-white text-white dark:text-black px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white text-sm md:text-base"
              >
                Start Self-Appraisal
              </button>
            </div>
          )}

          {appraisalStatus === 'In Progress' && (
            <div className="text-center py-6 md:py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2">Appraisal in Progress</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 px-2">Continue with your self-appraisal where you left off</p>
              <button
                onClick={handleContinueAppraisal}
                className="bg-black dark:bg-white text-white dark:text-black px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white text-sm md:text-base"
              >
                Continue Appraisal
              </button>
            </div>
          )}

          {appraisalStatus === 'Submitted' && (
            <div className="text-center py-6 md:py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-2 text-black dark:text-white">Appraisal Submitted!</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 px-2">Your comprehensive self-appraisal has been submitted for manager review.</p>
            </div>
          )}
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            {getUnreadCount() > 0 && (
              <button 
                onClick={markAllNotificationsAsRead}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Mark all read
              </button>
            )}
            <button 
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              {showAllNotifications ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {(showAllNotifications ? notifications : notifications.slice(0, 3)).map(notification => (
            <div 
              key={notification.id} 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${
                notification.read 
                  ? 'bg-gray-50 dark:bg-gray-700' 
                  : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
              }`}
              onClick={() => handleNotificationAction(notification)}
            >
              <div className={`w-2 h-2 rounded-full ${
                notification.read 
                  ? 'bg-gray-400 dark:bg-gray-500' 
                  : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">{notification.message}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{notification.time}</p>
                  {!notification.read && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{notification.action}</span>
                  )}
                </div>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEnhancedSelfAppraisal = () => {
    const approvedObjectives = getApprovedObjectives();
    if (!approvedObjectives) {
      return (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Approved Objectives</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to have approved objectives before you can complete your self-appraisal.
          </p>
          <button 
            onClick={() => setShowObjectiveSelection(true)}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
          >
            Set Objectives
          </button>
        </div>
      );
    }

    const steps = [
      { id: 'objectives', label: 'Objectives Review', icon: Target },
      { id: 'achievements', label: 'Achievements', icon: Award },
      { id: 'skills', label: 'Skills Assessment', icon: Star },
      { id: 'future', label: 'Future Goals', icon: TrendingUp },
      { id: 'review', label: 'Review & Submit', icon: CheckCircle }
    ];

    return (
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Self-Appraisal</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Step {steps.findIndex(s => s.id === appraisalStep) + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-6">
            <div 
              className="bg-black dark:bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((steps.findIndex(s => s.id === appraisalStep) + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === appraisalStep;
              const isCompleted = steps.findIndex(s => s.id === appraisalStep) > index;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isActive 
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                      : isCompleted
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 border-gray-300 dark:border-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          {appraisalStep === 'objectives' && renderObjectivesStep(approvedObjectives)}
          {appraisalStep === 'achievements' && renderAchievementsStep(approvedObjectives)}
          {appraisalStep === 'skills' && renderSkillsStep()}
          {appraisalStep === 'future' && renderFutureStep()}
          {appraisalStep === 'review' && renderReviewStep(approvedObjectives)}

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-600 space-y-3 md:space-y-0">
            <button
              onClick={handlePreviousStep}
              disabled={appraisalStep === 'objectives'}
              className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4 transform rotate-90" />
              <span>Previous</span>
            </button>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
              <button
                onClick={() => setShowSelfAppraisal(false)}
                className="w-full md:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Save Draft
              </button>
              
              {appraisalStep === 'review' ? (
                <button
                  onClick={handleSubmitSelfAppraisal}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Appraisal</span>
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
                >
                  <span>Next</span>
                  <ChevronUp className="h-4 w-4 transform rotate-90" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGoals = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h3 className="text-lg md:text-xl font-semibold">My Goals</h3>
        <button 
          onClick={() => setShowAddGoalModal(true)}
          className="flex items-center justify-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white text-sm md:text-base"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{goal.category}</span>
            </div>
            
            <h4 className="font-semibold mb-2 text-sm md:text-base">{goal.title}</h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
            
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

            {/* Milestones */}
            {goal.milestones && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Milestones ({goal.completedMilestones}/{goal.milestones.length})
                </p>
                <div className="space-y-1">
                  {goal.milestones.map((milestone: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        index < goal.completedMilestones 
                          ? 'bg-green-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Due: {goal.dueDate}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const newProgress = Math.min(goal.progress + 10, goal.target);
                    updateGoalProgress(goal.id, newProgress);
                  }}
                  className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  title="Update Progress"
                >
                  <TrendingUp className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleEditGoal(goal)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  title="Edit Goal"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Goal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h3 className="text-lg md:text-xl font-semibold">My Tasks</h3>
        <button 
          onClick={() => setShowAddTaskModal(true)}
          className="flex items-center justify-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white text-sm md:text-base"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mobile-no-overflow">
        <div className="overflow-x-auto mobile-no-overflow">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hours</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 md:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{task.description}</div>
                    <div className="md:hidden mt-2 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Category:</span>
                        <span className="text-xs text-gray-900 dark:text-gray-100">{task.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Priority:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Due:</span>
                        <span className="text-xs text-gray-900 dark:text-gray-100">{task.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Hours:</span>
                        <span className="text-xs text-gray-900 dark:text-gray-100">{task.actualHours}/{task.estimatedHours}h</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.category}</td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{task.dueDate}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(task.status)}`}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {task.actualHours}/{task.estimatedHours}h
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 md:space-x-2">
                      <button 
                        onClick={() => handleViewTask(task)}
                        className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                        title="View Task"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                        title="Edit Task"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Task"
                      >
                        <X className="h-4 w-4" />
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
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-semibold">Performance History</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Performance Trend</h4>
          <div className="space-y-3 md:space-y-4">
            {performanceHistory.map((performance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-sm md:text-base">{performance.period}</p>
                  <p className={`text-xs md:text-sm font-medium ${getRatingColor(performance.rating)}`}>
                    {performance.rating}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Goals: {performance.goalsAchieved}/{performance.totalGoals}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl md:text-2xl font-bold text-black dark:text-white">{performance.score}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Recent Feedback</h4>
          <div className="space-y-3 md:space-y-4">
            {performanceHistory.map((performance, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-sm md:text-base">{performance.period}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">{performance.feedback}</p>
                <div className="flex flex-wrap gap-1">
                  {performance.skillsImproved.map((skill: string) => (
                    <span key={skill} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded">
                      +{skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h4 className="font-semibold text-sm md:text-base">Skills Assessment</h4>
          <button 
            onClick={() => setShowUpdateSkillsModal(true)}
            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 text-sm"
          >
            Update Skills
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h5 className="font-medium mb-3 text-sm text-gray-700 dark:text-gray-300">Technical Skills</h5>
            <div className="space-y-3">
              {skills.technical.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm font-medium text-black dark:text-white">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last assessed: {skill.lastAssessed}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3 text-sm text-gray-700 dark:text-gray-300">Soft Skills</h5>
            <div className="space-y-3">
              {skills.soft.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm font-medium text-black dark:text-white">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last assessed: {skill.lastAssessed}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderObjectiveSelection = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Objective Selection & Weighting</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Select objectives from different perspectives and assign weights (Total must equal 100%)
            </p>
            {currentPeriod && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Current Period: {currentPeriod.quarter} {currentPeriod.year}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-black dark:text-white">{totalWeight}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Weight</div>
            </div>
            {weightError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{weightError}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Perspectives and Objectives */}
      <div className="space-y-4">
        {mockPerspectives.map(perspective => (
          <div key={perspective.id} className="bg-white dark:bg-gray-800 rounded-xl shadow">
            {/* Perspective Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">{perspective.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{perspective.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPerspective(
                    selectedPerspective === perspective.id ? null : perspective.id
                  )}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {selectedPerspective === perspective.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Objectives List */}
            {selectedPerspective === perspective.id && (
              <div className="p-6">
                <div className="space-y-4">
                  {perspective.objectives.map(objective => (
                    <div key={objective.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-3 flex-1">
                          <button
                            onClick={() => handleObjectiveSelection(objective.id, !isObjectiveSelected(objective.id))}
                            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {isObjectiveSelected(objective.id) ? (
                              <CheckSquare className="h-5 w-5" />
                            ) : (
                              <Square className="h-5 w-5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h5 className="font-medium">{objective.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {objective.description}
                            </p>
                          </div>
                        </div>
                        
                        {isObjectiveSelected(objective.id) && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Weight:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={objectiveWeights[objective.id] || objective.defaultWeight}
                              onChange={(e) => handleWeightChange(objective.id, parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowObjectiveSelection(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Object.keys(selectedObjectives).length} objectives selected
            </div>
            <button
              onClick={handleSaveObjectives}
              disabled={totalWeight !== 100 || Object.keys(selectedObjectives).length === 0}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save My Objectives</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 mobile-container">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-no-overflow {
            overflow: hidden;
            max-width: 100vw;
          }
          .mobile-container {
            padding-left: 1rem;
            padding-right: 1rem;
            max-width: 100%;
          }
        }
      `}</style>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">My Dashboard</h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Track your performance, goals, and progress</p>
          </div>
          <div className="flex items-center justify-between md:justify-end space-x-2 md:space-x-4">
            <div className="relative">
              <button 
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 md:h-6 md:w-6" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {getUnreadCount() > 9 ? '9+' : getUnreadCount()}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {getUnreadCount() > 0 && (
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-2">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            notification.read 
                              ? 'bg-gray-50 dark:bg-gray-700' 
                              : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                          }`}
                          onClick={() => handleNotificationAction(notification)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.read 
                                ? 'bg-gray-400 dark:bg-gray-500' 
                                : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notification.message}</p>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-600 dark:text-gray-400">{notification.time}</p>
                                {!notification.read && (
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{notification.action}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => setShowContactManagerModal(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white text-sm md:text-base"
            >
              <MessageSquare className="h-4 w-4 inline mr-1 md:mr-2" />
              <span className="hidden sm:inline">Contact Manager</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow mobile-no-overflow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto scrollbar-hide px-4 md:px-6 mobile-no-overflow">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'objectives', label: 'Objectives', icon: Target },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-1 md:space-x-2 py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap ${
                    selectedTab === tab.id
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.substring(0, 3)}</span>
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
        {selectedTab === 'objectives' && renderObjectiveSelection()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'performance' && renderPerformance()}
        {showObjectiveSelection && renderObjectiveSelection()}
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Goal</h3>
                <button 
                  onClick={() => setShowAddGoalModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Title *</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter goal title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Quality">Quality</option>
                    <option value="Project">Project</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Describe your goal"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Value</label>
                    <input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 100 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Milestones</label>
                  <div className="space-y-2">
                    {newGoal.milestones.map((milestone, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={milestone}
                          onChange={(e) => updateMilestone(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          placeholder={`Milestone ${index + 1}`}
                        />
                        <button
                          onClick={() => removeMilestone(index)}
                          className="px-2 py-2 text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addMilestone}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Milestone
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Task</h3>
                <button 
                  onClick={() => setShowAddTaskModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Describe the task"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Project">Project</option>
                      <option value="Training">Training</option>
                      <option value="Appraisal">Appraisal</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estimated Hours</label>
                    <input
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 4 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Skills Modal */}
      {showUpdateSkillsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Update Skills Assessment</h3>
                <button 
                  onClick={() => setShowUpdateSkillsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Technical Skills</h4>
                  <div className="space-y-4">
                    {skillsFormData.technical.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <select
                            value={skill.level}
                            onChange={(e) => {
                              const newSkills = { ...skillsFormData };
                              newSkills.technical[index].level = e.target.value;
                              newSkills.technical[index].progress = 
                                e.target.value === 'beginner' ? 25 :
                                e.target.value === 'intermediate' ? 50 :
                                e.target.value === 'advanced' ? 75 : 100;
                              setSkillsFormData(newSkills);
                            }}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Soft Skills</h4>
                  <div className="space-y-4">
                    {skillsFormData.soft.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <select
                            value={skill.level}
                            onChange={(e) => {
                              const newSkills = { ...skillsFormData };
                              newSkills.soft[index].level = e.target.value;
                              newSkills.soft[index].progress = 
                                e.target.value === 'beginner' ? 25 :
                                e.target.value === 'intermediate' ? 50 :
                                e.target.value === 'advanced' ? 75 : 100;
                              setSkillsFormData(newSkills);
                            }}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUpdateSkillsModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSkills}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Update Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditTaskModal && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Task</h3>
                <button 
                  onClick={() => setShowEditTaskModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Task Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Describe the task"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Project">Project</option>
                      <option value="Training">Training</option>
                      <option value="Appraisal">Appraisal</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estimated Hours</label>
                    <input
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 4 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditTaskModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTask}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Manager Modal */}
      {showContactManagerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Manager</h3>
                <button 
                  onClick={() => setShowContactManagerModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject *</label>
                  <input
                    type="text"
                    value={contactMessage.subject}
                    onChange={(e) => setContactMessage(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    value={contactMessage.message}
                    onChange={(e) => setContactMessage(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={5}
                    placeholder="Enter your message"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowContactManagerModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactManager}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

