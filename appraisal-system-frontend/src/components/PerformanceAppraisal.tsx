'use client';
import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  X, 
  Save, 
  Send, 
  Star, 
  Target, 
  Percent, 
  Calendar,
  User,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  mockUserObjectives, 
  mockSelfAppraisals, 
  mockPerformanceAppraisals, 
  mockUsers, 
  getCurrentPeriod, 
  getObjectiveById,
  getUserById,
  getDirectReports
} from '../lib/mock-data';

interface PerformanceAppraisalProps {
  reviewerId: number;
  onClose: () => void;
  onSubmit: (userId: number, data: any) => void;
}

export default function PerformanceAppraisal({ 
  reviewerId, 
  onClose, 
  onSubmit 
}: PerformanceAppraisalProps) {
  const [currentPeriod, setCurrentPeriod] = useState(getCurrentPeriod());
  const [usersForAppraisal, setUsersForAppraisal] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserObjectives, setSelectedUserObjectives] = useState<any>(null);
  const [selectedUserSelfAppraisal, setSelectedUserSelfAppraisal] = useState<any>(null);
  const [appraisalData, setAppraisalData] = useState<{[key: number]: {
    rating: string;
    comments: string;
    weightAchieved: number;
  }}>({});
  const [overallRating, setOverallRating] = useState('Meets');
  const [overallComments, setOverallComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rating options
  const ratingOptions = ['Exceeds Expectations', 'Meets Expectations', 'Needs Improvement'];

  useEffect(() => {
    // Get direct reports for the reviewer
    const directReports = getDirectReports(reviewerId);
    
    // Get users who have submitted self-appraisals for the current period
    const usersWithSelfAppraisals = directReports.filter(user => {
      const selfAppraisal = mockSelfAppraisals.find(
        sa => sa.userId === user.id && 
        sa.periodId === currentPeriod?.id && 
        sa.status === 'Submitted'
      );
      return selfAppraisal;
    });

    setUsersForAppraisal(usersWithSelfAppraisals);
  }, [reviewerId, currentPeriod]);

  useEffect(() => {
    if (selectedUser) {
      // Get user's approved objectives
      const objectives = mockUserObjectives.find(
        uo => uo.userId === selectedUser.id && 
        uo.periodId === currentPeriod?.id && 
        uo.status === 'Approved'
      );
      setSelectedUserObjectives(objectives);

      // Get user's self-appraisal
      const selfAppraisal = mockSelfAppraisals.find(
        sa => sa.userId === selectedUser.id && 
        sa.periodId === currentPeriod?.id
      );
      setSelectedUserSelfAppraisal(selfAppraisal);

      // Initialize appraisal data with default values
      if (objectives) {
        const initialData: {[key: number]: any} = {};
        objectives.objectives.forEach((obj: any) => {
          initialData[obj.objectiveId] = {
            rating: 'Meets Expectations',
            comments: '',
            weightAchieved: 0
          };
        });
        setAppraisalData(initialData);
      }
    }
  }, [selectedUser, currentPeriod]);

  const handleAppraisalChange = (objectiveId: number, field: string, value: string | number) => {
    setAppraisalData(prev => ({
      ...prev,
      [objectiveId]: {
        ...prev[objectiveId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    if (!selectedUser || !selectedUserObjectives) return;

    setIsSubmitting(true);
    
    const performanceAppraisalData = {
      id: Math.max(...mockPerformanceAppraisals.map(pa => pa.id)) + 1,
      userId: selectedUser.id,
      periodId: currentPeriod?.id || 1,
      reviewerId,
      objectives: Object.entries(appraisalData).map(([objectiveId, data]) => ({
        objectiveId: parseInt(objectiveId),
        ...data
      })),
      overallRating,
      overallComments,
      status: 'Completed',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    try {
      // In a real app, this would be saved to the backend
      console.log('Performance appraisal submitted:', performanceAppraisalData);
      onSubmit(selectedUser.id, performanceAppraisalData);
    } catch (error) {
      console.error('Error submitting performance appraisal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getObjectiveDetails = (objectiveId: number) => {
    return getObjectiveById(objectiveId);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Exceeds Expectations':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Meets Expectations':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Needs Improvement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const calculateOverallScore = () => {
    if (!selectedUserObjectives) return 0;
    
    let totalScore = 0;
    let totalWeight = 0;
    
    selectedUserObjectives.objectives.forEach((userObj: any) => {
      const appraisal = appraisalData[userObj.objectiveId];
      if (appraisal) {
        const score = appraisal.weightAchieved * (userObj.weight / 100);
        totalScore += score;
        totalWeight += userObj.weight;
      }
    });
    
    return totalWeight > 0 ? Math.round(totalScore) : 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Performance Appraisal</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentPeriod?.quarter} {currentPeriod?.year} - Conduct performance reviews for direct reports
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - User List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Users for Appraisal</h3>
            
            {usersForAppraisal.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No users ready for appraisal</p>
              </div>
            ) : (
              <div className="space-y-3">
                {usersForAppraisal.map(user => {
                  const selfAppraisal = mockSelfAppraisals.find(
                    sa => sa.userId === user.id && 
                    sa.periodId === currentPeriod?.id
                  );
                  
                  return (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedUser?.id === user.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Self-appraisal submitted: {selfAppraisal?.submittedAt}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Ready
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Panel - Appraisal Form */}
          <div className="flex-1 p-6">
            {!selectedUser ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select a User</h3>
                <p>Choose a user from the list to conduct their performance appraisal</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{selectedUser.department} • {selectedUser.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{calculateOverallScore()}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                  </div>
                </div>

                {/* Self-Appraisal Summary */}
                {selectedUserSelfAppraisal && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Self-Appraisal Summary</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      {selectedUserSelfAppraisal.overallComments}
                    </p>
                  </div>
                )}

                {/* Objectives Performance Review */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Performance Review by Objective</h4>
                  
                  {selectedUserObjectives?.objectives.map((userObj: any) => {
                    const objective = getObjectiveDetails(userObj.objectiveId);
                    const selfAppraisal = selectedUserSelfAppraisal?.objectives.find(
                      (sa: any) => sa.objectiveId === userObj.objectiveId
                    );
                    if (!objective) return null;

                    return (
                      <div key={userObj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                        <div className="mb-4">
                          <h5 className="font-semibold text-lg mb-2">{objective.name}</h5>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{objective.description}</p>
                          
                          {/* Self-Appraisal Info */}
                          {selfAppraisal && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                              <h6 className="font-medium text-sm mb-2">Self-Assessment:</h6>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Weight Achieved:</span>
                                  <span className="ml-2 font-medium">{selfAppraisal.weightAchieved}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Self Rating:</span>
                                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getRatingColor(selfAppraisal.selfRating)}`}>
                                    {selfAppraisal.selfRating}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Comments:</span>
                                  <span className="ml-2">{selfAppraisal.comments}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Manager Assessment */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Performance Rating */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Performance Rating
                            </label>
                            <select
                              value={appraisalData[userObj.objectiveId]?.rating || 'Meets Expectations'}
                              onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'rating', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                              {ratingOptions.map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                              ))}
                            </select>
                          </div>

                          {/* Weight Achieved */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Weight Achieved (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={appraisalData[userObj.objectiveId]?.weightAchieved || 0}
                              onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'weightAchieved', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              placeholder="Enter percentage achieved"
                            />
                          </div>

                          {/* Comments */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Comments
                            </label>
                            <textarea
                              value={appraisalData[userObj.objectiveId]?.comments || ''}
                              onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'comments', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              rows={3}
                              placeholder="Provide feedback and evidence..."
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Overall Assessment */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Overall Assessment</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Overall Rating
                      </label>
                      <select
                        value={overallRating}
                        onChange={(e) => setOverallRating(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        {ratingOptions.map(rating => (
                          <option key={rating} value={rating}>{rating}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Overall Comments
                    </label>
                    <textarea
                      value={overallComments}
                      onChange={(e) => setOverallComments(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={4}
                      placeholder="Provide overall assessment, strengths, areas for improvement, and development recommendations..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Appraisal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


