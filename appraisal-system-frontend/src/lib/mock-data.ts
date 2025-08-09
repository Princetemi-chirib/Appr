import { User, Briefcase, UserCheck, BarChart } from 'lucide-react';

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
