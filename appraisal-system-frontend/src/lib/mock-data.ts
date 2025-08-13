import { User, Briefcase, UserCheck, BarChart } from 'lucide-react';

// Enhanced mock data for comprehensive appraisal system
export const mockTasks = [
  { id: 1, title: 'Complete Q3 Marketing Report', dueDate: '2025-09-30', status: 'In Progress' },
  { id: 2, title: 'Onboard new intern', dueDate: '2025-08-15', status: 'Completed' },
  { id: 3, title: 'Review project specifications', dueDate: '2025-08-20', status: 'Not Started' },
];

export const mockGoals = [
  { id: 1, title: 'Increase website traffic by 15%', progress: '75%' },
  { id: 2, title: 'Complete Next.js certification', progress: '50%' },
];

export const mockTeamMembers = [
  { id: 1, name: 'Alice Smith', role: 'Worker', appraisalStatus: 'Self-Review Complete' },
  { id: 2, name: 'Bob Johnson', role: 'Worker', appraisalStatus: 'Manager Review Pending' },
  { id: 3, name: 'Charlie Brown', role: 'Worker', appraisalStatus: 'Finalized' },
];

export const mockEmployees = [
  { id: 1, name: 'Alice Smith', team: 'Marketing', appraisalStatus: 'Self-Review Complete' },
  { id: 2, name: 'Bob Johnson', team: 'Engineering', appraisalStatus: 'Manager Review Pending' },
  { id: 3, name: 'Charlie Brown', team: 'Marketing', appraisalStatus: 'Finalized' },
  { id: 4, name: 'Diana Prince', team: 'HR', appraisalStatus: 'Not Started' },
];

export const mockTeams = ['Marketing', 'Engineering', 'HR', 'Sales'];

export const mockRoles = [
  { name: 'Worker', iconName: 'User' },
  { name: 'Manager', iconName: 'Briefcase' },
  { name: 'HR', iconName: 'UserCheck' },
  { name: 'MD', iconName: 'BarChart' },
];

// Export the icon components separately for use in components
export const roleIcons = {
  User,
  Briefcase,
  UserCheck,
  BarChart,
};

// Enhanced user data with hierarchy and roles
export const mockUsers = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice@company.com',
    role: 'Worker',
    department: 'Marketing',
    managerId: 5,
    hireDate: '2022-03-15',
    salary: '65000',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@company.com',
    role: 'Worker',
    department: 'Engineering',
    managerId: 6,
    hireDate: '2021-06-20',
    salary: '70000',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@company.com',
    role: 'Worker',
    department: 'Marketing',
    managerId: 5,
    hireDate: '2023-01-10',
    salary: '55000',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@company.com',
    role: 'Worker',
    department: 'HR',
    managerId: 7,
    hireDate: '2022-11-05',
    salary: '60000',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Eva Wilson',
    email: 'eva@company.com',
    role: 'Manager',
    department: 'Marketing',
    managerId: 8,
    hireDate: '2020-09-15',
    salary: '85000',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@company.com',
    role: 'Manager',
    department: 'Engineering',
    managerId: 8,
    hireDate: '2019-12-01',
    salary: '90000',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Grace Chen',
    email: 'grace@company.com',
    role: 'Manager',
    department: 'HR',
    managerId: 9,
    hireDate: '2021-03-20',
    salary: '80000',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Henry Davis',
    email: 'henry@company.com',
    role: 'HOD',
    department: 'Technology',
    managerId: 10,
    hireDate: '2018-06-10',
    salary: '120000',
    status: 'Active'
  },
  {
    id: 9,
    name: 'Ivy Johnson',
    email: 'ivy@company.com',
    role: 'HOD',
    department: 'Operations',
    managerId: 10,
    hireDate: '2019-01-15',
    salary: '110000',
    status: 'Active'
  },
  {
    id: 10,
    name: 'Jack Wilson',
    email: 'jack@company.com',
    role: 'MD',
    department: 'Executive',
    managerId: null,
    hireDate: '2017-03-01',
    salary: '200000',
    status: 'Active'
  }
];

// Strategic Perspectives and Objectives
export const mockPerspectives = [
  {
    id: 1,
    name: 'Financial',
    description: 'Financial performance and growth objectives',
    objectives: [
      {
        id: 1,
        name: 'Increase Revenue Growth',
        description: 'Achieve 15% year-over-year revenue growth',
        defaultWeight: 30,
        isActive: true
      },
      {
        id: 2,
        name: 'Improve Profit Margins',
        description: 'Increase profit margins by 5% through cost optimization',
        defaultWeight: 25,
        isActive: true
      },
      {
        id: 3,
        name: 'Reduce Operational Costs',
        description: 'Reduce operational costs by 10% through process improvements',
        defaultWeight: 20,
        isActive: true
      },
      {
        id: 4,
        name: 'Increase Market Share',
        description: 'Grow market share by 8% in target markets',
        defaultWeight: 25,
        isActive: true
      }
    ]
  },
  {
    id: 2,
    name: 'Customer',
    description: 'Customer satisfaction and market position objectives',
    objectives: [
      {
        id: 5,
        name: 'Improve Customer Satisfaction',
        description: 'Achieve customer satisfaction score of 4.5/5',
        defaultWeight: 35,
        isActive: true
      },
      {
        id: 6,
        name: 'Increase Customer Retention',
        description: 'Improve customer retention rate to 95%',
        defaultWeight: 30,
        isActive: true
      },
      {
        id: 7,
        name: 'Expand Customer Base',
        description: 'Acquire 500 new customers in target segments',
        defaultWeight: 20,
        isActive: true
      },
      {
        id: 8,
        name: 'Enhance Customer Support',
        description: 'Reduce customer support response time to under 2 hours',
        defaultWeight: 15,
        isActive: true
      }
    ]
  },
  {
    id: 3,
    name: 'Internal Process',
    description: 'Operational efficiency and process improvement objectives',
    objectives: [
      {
        id: 9,
        name: 'Improve Process Efficiency',
        description: 'Reduce process cycle time by 20%',
        defaultWeight: 30,
        isActive: true
      },
      {
        id: 10,
        name: 'Enhance Quality Management',
        description: 'Achieve 99.5% quality compliance rate',
        defaultWeight: 25,
        isActive: true
      },
      {
        id: 11,
        name: 'Optimize Resource Utilization',
        description: 'Improve resource utilization to 85%',
        defaultWeight: 25,
        isActive: true
      },
      {
        id: 12,
        name: 'Implement Innovation Initiatives',
        description: 'Launch 3 new innovation projects',
        defaultWeight: 20,
        isActive: true
      }
    ]
  },
  {
    id: 4,
    name: 'Learning & Growth',
    description: 'Employee development and organizational learning objectives',
    objectives: [
      {
        id: 13,
        name: 'Employee Skill Development',
        description: 'Complete 40 hours of training per employee',
        defaultWeight: 30,
        isActive: true
      },
      {
        id: 14,
        name: 'Improve Employee Engagement',
        description: 'Achieve employee engagement score of 4.2/5',
        defaultWeight: 25,
        isActive: true
      },
      {
        id: 15,
        name: 'Knowledge Management',
        description: 'Implement knowledge sharing platform',
        defaultWeight: 25,
        isActive: true
      },
      {
        id: 16,
        name: 'Leadership Development',
        description: 'Develop 5 new leaders through mentorship program',
        defaultWeight: 20,
        isActive: true
      }
    ]
  }
];

// Appraisal Periods
export const mockAppraisalPeriods = [
  {
    id: 1,
    quarter: 'Q1',
    year: 2024,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'Active',
    objectiveSettingStart: '2024-01-01',
    objectiveSettingEnd: '2024-01-15',
    selfAppraisalStart: '2024-03-15',
    selfAppraisalEnd: '2024-03-31',
    managerReviewStart: '2024-04-01',
    managerReviewEnd: '2024-04-15'
  },
  {
    id: 2,
    quarter: 'Q2',
    year: 2024,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    status: 'Scheduled',
    objectiveSettingStart: '2024-04-01',
    objectiveSettingEnd: '2024-04-15',
    selfAppraisalStart: '2024-06-15',
    selfAppraisalEnd: '2024-06-30',
    managerReviewStart: '2024-07-01',
    managerReviewEnd: '2024-07-15'
  },
  {
    id: 3,
    quarter: 'Q3',
    year: 2024,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    status: 'Scheduled',
    objectiveSettingStart: '2024-07-01',
    objectiveSettingEnd: '2024-07-15',
    selfAppraisalStart: '2024-09-15',
    selfAppraisalEnd: '2024-09-30',
    managerReviewStart: '2024-10-01',
    managerReviewEnd: '2024-10-15'
  },
  {
    id: 4,
    quarter: 'Q4',
    year: 2024,
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    status: 'Scheduled',
    objectiveSettingStart: '2024-10-01',
    objectiveSettingEnd: '2024-10-15',
    selfAppraisalStart: '2024-12-15',
    selfAppraisalEnd: '2024-12-31',
    managerReviewStart: '2025-01-01',
    managerReviewEnd: '2025-01-15'
  }
];

// User Objectives (selected by users)
export const mockUserObjectives = [
  {
    id: 1,
    userId: 1,
    periodId: 1,
    objectives: [
      { objectiveId: 1, weight: 30, status: 'Approved' },
      { objectiveId: 5, weight: 35, status: 'Approved' },
      { objectiveId: 9, weight: 20, status: 'Approved' },
      { objectiveId: 13, weight: 15, status: 'Approved' }
    ],
    totalWeight: 100,
    status: 'Approved',
    submittedAt: '2024-01-10',
    approvedAt: '2024-01-12',
    approvedBy: 5
  },
  {
    id: 2,
    userId: 2,
    periodId: 1,
    objectives: [
      { objectiveId: 2, weight: 25, status: 'Approved' },
      { objectiveId: 6, weight: 30, status: 'Approved' },
      { objectiveId: 10, weight: 25, status: 'Approved' },
      { objectiveId: 14, weight: 20, status: 'Approved' }
    ],
    totalWeight: 100,
    status: 'Approved',
    submittedAt: '2024-01-08',
    approvedAt: '2024-01-11',
    approvedBy: 6
  }
];

// Self Appraisals
export const mockSelfAppraisals = [
  {
    id: 1,
    userId: 1,
    periodId: 1,
    objectives: [
      {
        objectiveId: 1,
        weightAchieved: 85,
        selfRating: 'Exceeds',
        comments: 'Successfully exceeded revenue targets by implementing new strategies'
      },
      {
        objectiveId: 5,
        weightAchieved: 90,
        selfRating: 'Exceeds',
        comments: 'Customer satisfaction improved significantly through enhanced support'
      },
      {
        objectiveId: 9,
        weightAchieved: 75,
        selfRating: 'Meets',
        comments: 'Process improvements implemented successfully'
      },
      {
        objectiveId: 13,
        weightAchieved: 80,
        selfRating: 'Meets',
        comments: 'Completed required training and additional certifications'
      }
    ],
    overallComments: 'Strong performance across all objectives with notable achievements in customer satisfaction and revenue growth.',
    status: 'Submitted',
    submittedAt: '2024-03-25'
  }
];

// Performance Appraisals (Manager Reviews)
export const mockPerformanceAppraisals = [
  {
    id: 1,
    userId: 1,
    periodId: 1,
    reviewerId: 5,
    objectives: [
      {
        objectiveId: 1,
        rating: 'Exceeds',
        comments: 'Excellent work in revenue growth, exceeded expectations',
        weightAchieved: 85
      },
      {
        objectiveId: 5,
        rating: 'Exceeds',
        comments: 'Outstanding customer satisfaction results',
        weightAchieved: 90
      },
      {
        objectiveId: 9,
        rating: 'Meets',
        comments: 'Good process improvements, room for further optimization',
        weightAchieved: 75
      },
      {
        objectiveId: 13,
        rating: 'Meets',
        comments: 'Satisfactory training completion',
        weightAchieved: 80
      }
    ],
    overallRating: 'Exceeds',
    overallComments: 'Strong performer with excellent results in key areas. Shows great potential for growth.',
    status: 'Completed',
    submittedAt: '2024-04-10'
  }
];

// Notifications
export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: 'Objective Approved',
    title: 'Your Q1 objectives have been approved',
    message: 'Your manager has approved your Q1 2024 objectives. You can now proceed with your work.',
    isRead: false,
    createdAt: '2024-01-12T10:30:00Z',
    relatedId: 1,
    relatedType: 'userObjective'
  },
  {
    id: 2,
    userId: 1,
    type: 'Appraisal Due',
    title: 'Q1 Self-Appraisal is now open',
    message: 'You can now submit your Q1 2024 self-appraisal. Please complete it by March 31st.',
    isRead: false,
    createdAt: '2024-03-15T09:00:00Z',
    relatedId: 1,
    relatedType: 'selfAppraisal'
  },
  {
    id: 3,
    userId: 5,
    type: 'Review Required',
    title: 'New appraisal to review',
    message: 'Alice Smith has submitted her Q1 self-appraisal for your review.',
    isRead: false,
    createdAt: '2024-03-25T14:20:00Z',
    relatedId: 1,
    relatedType: 'performanceAppraisal'
  }
];

// Helper functions
export const getCurrentPeriod = () => {
  const now = new Date();
  return mockAppraisalPeriods.find(period => {
    const start = new Date(period.startDate);
    const end = new Date(period.endDate);
    return now >= start && now <= end;
  });
};

export const getUserById = (id: number) => {
  return mockUsers.find(user => user.id === id);
};

export const getDirectReports = (managerId: number) => {
  return mockUsers.filter(user => user.managerId === managerId);
};

export const getObjectiveById = (id: number) => {
  for (const perspective of mockPerspectives) {
    const objective = perspective.objectives.find(obj => obj.id === id);
    if (objective) return objective;
  }
  return null;
};

export const getPerspectiveByObjectiveId = (objectiveId: number) => {
  return mockPerspectives.find(perspective => 
    perspective.objectives.some(obj => obj.id === objectiveId)
  );
};
