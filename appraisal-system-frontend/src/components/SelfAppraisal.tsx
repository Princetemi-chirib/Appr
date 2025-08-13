'use client';
import { useState, useEffect } from 'react';
import { 
  FileText, 
  Save, 
  Send, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Star,
  Percent,
  Calendar,
  User,
  Target
} from 'lucide-react';
import { 
  mockUserObjectives, 
  mockSelfAppraisals, 
  getCurrentPeriod, 
  getObjectiveById,
  getUserById
} from '../lib/mock-data';

interface SelfAppraisalProps {
  userId: number;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SelfAppraisal({ userId, onClose, onSubmit }: SelfAppraisalProps) {
  const [currentPeriod, setCurrentPeriod] = useState(getCurrentPeriod());
  const [approvedObjectives, setApprovedObjectives] = useState<any>(null);
  const [selfAppraisalData, setSelfAppraisalData] = useState<{[key: number]: {
    weightAchieved: number;
    selfRating: string;
    comments: string;
  }}>({});
  const [overallComments, setOverallComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rating options
  const ratingOptions = ['Exceeds', 'Meets', 'Needs Improvement'];

  useEffect(() => {
    // Get approved objectives for current user and period
    const objectives = mockUserObjectives.find(
      uo => uo.userId === userId && uo.periodId === currentPeriod?.id && uo.status === 'Approved'
    );
    setApprovedObjectives(objectives);

    // Initialize self-appraisal data with default values
    if (objectives) {
      const initialData: {[key: number]: any} = {};
      objectives.objectives.forEach((obj: any) => {
        initialData[obj.objectiveId] = {
          weightAchieved: 0,
          selfRating: 'Meets',
          comments: ''
        };
      });
      setSelfAppraisalData(initialData);
    }
  }, [userId, currentPeriod]);

  const handleAppraisalChange = (objectiveId: number, field: string, value: string | number) => {
    setSelfAppraisalData(prev => ({
      ...prev,
      [objectiveId]: {
        ...prev[objectiveId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const appraisalData = {
      id: Math.max(...mockSelfAppraisals.map(sa => sa.id)) + 1,
      userId,
      periodId: currentPeriod?.id || 1,
      objectives: Object.entries(selfAppraisalData).map(([objectiveId, data]) => ({
        objectiveId: parseInt(objectiveId),
        ...data
      })),
      overallComments,
      status: 'Submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    try {
      // In a real app, this would be saved to the backend
      console.log('Self-appraisal submitted:', appraisalData);
      onSubmit(appraisalData);
    } catch (error) {
      console.error('Error submitting self-appraisal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getObjectiveDetails = (objectiveId: number) => {
    return getObjectiveById(objectiveId);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Exceeds':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Meets':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Needs Improvement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!approvedObjectives) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="text-center py-8">
              <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No Approved Objectives</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You don't have any approved objectives for the current period yet.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Self-Appraisal</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentPeriod?.quarter} {currentPeriod?.year} - {getUserById(userId)?.name}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Period Display */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Current Appraisal Period
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  {currentPeriod?.quarter} {currentPeriod?.year} ({currentPeriod?.startDate} - {currentPeriod?.endDate})
                </p>
              </div>
            </div>
          </div>

          {/* Approved Objectives List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Your Approved Objectives</span>
            </h3>
            
            {approvedObjectives.objectives.map((userObj: any) => {
              const objective = getObjectiveDetails(userObj.objectiveId);
              if (!objective) return null;

              return (
                <div key={userObj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg mb-2">{objective.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{objective.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Percent className="h-4 w-4" />
                        <span>Assigned Weight: {userObj.weight}%</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Status: {userObj.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Self-Appraisal Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Weight Achieved */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Weight Achieved (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selfAppraisalData[userObj.objectiveId]?.weightAchieved || 0}
                        onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'weightAchieved', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter percentage achieved"
                      />
                    </div>

                    {/* Self Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Self Rating
                      </label>
                      <select
                        value={selfAppraisalData[userObj.objectiveId]?.selfRating || 'Meets'}
                        onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'selfRating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        {ratingOptions.map(rating => (
                          <option key={rating} value={rating}>{rating}</option>
                        ))}
                      </select>
                    </div>

                    {/* Comments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Comments
                      </label>
                      <textarea
                        value={selfAppraisalData[userObj.objectiveId]?.comments || ''}
                        onChange={(e) => handleAppraisalChange(userObj.objectiveId, 'comments', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        rows={3}
                        placeholder="Describe your achievements and challenges..."
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Overall Self-Assessment Comments
            </label>
            <textarea
              value={overallComments}
              onChange={(e) => setOverallComments(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={4}
              placeholder="Provide an overall assessment of your performance, achievements, challenges, and areas for improvement..."
            />
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
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Self-Appraisal</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


