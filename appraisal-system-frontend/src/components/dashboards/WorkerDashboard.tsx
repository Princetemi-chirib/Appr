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
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Review Your Objectives</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
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
          <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold">{objective?.name}</h5>
              <span className="text-sm text-gray-600 dark:text-gray-400">Weight: {obj.weight}%</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={appraisalData.weightAchieved}
                  onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'weightAchieved', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Self Rating</label>
                <select
                  value={appraisalData.selfRating}
                  onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'selfRating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="Exceeds">Exceeds Expectations</option>
                  <option value="Meets">Meets Expectations</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Initial Comments</label>
              <textarea
                value={appraisalData.comments}
                onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'comments', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Document Your Achievements</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Detail your key achievements and accomplishments for each objective.
        </p>
      </div>

      {approvedObjectives.objectives.map((obj: any) => {
        const objective = getObjectiveById(obj.objectiveId);
        const appraisalData = selfAppraisalData[obj.objectiveId] || {};

        return (
          <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h5 className="font-semibold mb-3">{objective?.name}</h5>
            
            <div>
              <label className="block text-sm font-medium mb-2">Key Achievements</label>
              <textarea
                value={appraisalData.achievements || ''}
                onChange={(e) => handleSelfAppraisalChange(obj.objectiveId, 'achievements', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Skills Assessment</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Evaluate your current skills and identify areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h5 className="font-semibold">Technical Skills</h5>
          {['React Development', 'TypeScript', 'Node.js', 'Database Design'].map(skill => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{skill}</span>
                <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h5 className="font-semibold">Soft Skills</h5>
          {['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].map(skill => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{skill}</span>
                <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700">
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
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Future Goals & Development</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Outline your goals for the next period and development needs.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Career Goals</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
            placeholder="What are your career goals for the next 6-12 months?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills to Develop</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
            placeholder="What skills would you like to develop or improve?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Support Needed</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
            placeholder="What support or resources do you need to achieve your goals?"
          />
        </div>
      </div>
    </div>
  );

  const renderReviewStep = (approvedObjectives: any) => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-4">Review & Summary</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Review your self-appraisal before submitting it for manager review.
        </p>
      </div>

      <div className="space-y-4">
        {approvedObjectives.objectives.map((obj: any) => {
          const objective = getObjectiveById(obj.objectiveId);
          const appraisalData = selfAppraisalData[obj.objectiveId] || {};

          return (
            <div key={obj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h5 className="font-semibold mb-3">{objective?.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
        <label className="block text-sm font-medium mb-2">Overall Comments</label>
        <textarea
          value={overallComments}
          onChange={(e) => setOverallComments(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows={4}
          placeholder="Provide overall feedback about your performance, achievements, and areas for growth..."
        />
      </div>
    </div>
  );

  const getApprovedObjectives = () => {
    // In a real app, this would fetch from backend
    return mockUserObjectives.find(uo => uo.userId === 1 && uo.status === 'Approved');
  };

  const isObjectiveSelected = (objectiveId: number) => {
    return objectiveId in selectedObjectives;
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
      <div className="bg-black rounded-xl shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-gray-300">Here's your performance overview for Q1 2024</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">4.2</div>
            <div className="text-gray-300">Current Rating</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Goals</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">3/4</p>
            </div>
            <Target className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Tasks</p>
              <p className="text-lg md:text-2xl font-bold text-black dark:text-white">8/10</p>
            </div>
            <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-black dark:text-white" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Due</p>
              <p className="text-lg md:text-2xl font-bold text-gray-600 dark:text-gray-400">3</p>
            </div>
            <Clock className="h-6 w-6 md:h-8 md:w-8 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Performance Trend</p>
              <p className="text-lg md:text-2xl font-bold text-gray-700 dark:text-gray-300">+12%</p>
            </div>
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Enhanced Self-Appraisal Section */}
      {showSelfAppraisal ? (
        renderEnhancedSelfAppraisal()
      ) : (
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">Complete your comprehensive self-assessment with our new step-by-step process</p>
              <button
                onClick={handleStartAppraisal}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
              >
                Start Self-Appraisal
              </button>
            </div>
          )}

          {appraisalStatus === 'In Progress' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Appraisal in Progress</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Continue with your self-appraisal where you left off</p>
              <button
                onClick={handleContinueAppraisal}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
              >
                Continue Appraisal
              </button>
            </div>
          )}

          {appraisalStatus === 'Submitted' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">Appraisal Submitted!</h4>
              <p className="text-gray-600 dark:text-gray-400">Your comprehensive self-appraisal has been submitted for manager review.</p>
            </div>
          )}
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockNotifications.map(notification => (
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isActive 
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                      : isCompleted
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 border-gray-300 dark:border-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          {appraisalStep === 'objectives' && renderObjectivesStep(approvedObjectives)}
          {appraisalStep === 'achievements' && renderAchievementsStep(approvedObjectives)}
          {appraisalStep === 'skills' && renderSkillsStep()}
          {appraisalStep === 'future' && renderFutureStep()}
          {appraisalStep === 'review' && renderReviewStep(approvedObjectives)}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={handlePreviousStep}
              disabled={appraisalStep === 'objectives'}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4 transform rotate-90" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSelfAppraisal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Save Draft
              </button>
              
              {appraisalStep === 'review' ? (
                <button
                  onClick={handleSubmitSelfAppraisal}
                  className="flex items-center space-x-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Appraisal</span>
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
                >
                  <span>Next</span>
                  <ChevronUp className="h-4 w-4 transform -rotate-90" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                            className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
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
                              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
              { id: 'objectives', label: 'Objectives', icon: Target },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
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
        {selectedTab === 'objectives' && renderObjectiveSelection()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'performance' && renderPerformance()}
        {showObjectiveSelection && renderObjectiveSelection()}
      </div>
    </div>
  );
}

