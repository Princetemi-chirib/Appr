'use client';
import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  X, 
  Edit, 
  Eye, 
  Send, 
  AlertTriangle, 
  Clock,
  User,
  Target,
  Percent,
  Calendar,
  ChevronDown,
  ChevronUp,
  Save,
  MessageSquare
} from 'lucide-react';
import { 
  mockUserObjectives, 
  mockUsers, 
  getCurrentPeriod, 
  getObjectiveById,
  getUserById,
  getDirectReports
} from '../lib/mock-data';

interface ObjectiveApprovalProps {
  approverId: number;
  onClose: () => void;
  onApprove: (userId: number, data: any) => void;
  onEdit: (userId: number, data: any) => void;
  onReject: (userId: number, reason: string) => void;
}

export default function ObjectiveApproval({ 
  approverId, 
  onClose, 
  onApprove, 
  onEdit, 
  onReject 
}: ObjectiveApprovalProps) {
  const [currentPeriod, setCurrentPeriod] = useState(getCurrentPeriod());
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserObjectives, setSelectedUserObjectives] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedObjectives, setEditedObjectives] = useState<any>(null);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    // Get direct reports for the approver
    const directReports = getDirectReports(approverId);
    
    // Get pending objectives for direct reports
    const pending = directReports.filter(user => {
      const userObj = mockUserObjectives.find(
        uo => uo.userId === user.id && 
        uo.periodId === currentPeriod?.id && 
        uo.status === 'Pending Approval'
      );
      return userObj;
    });

    setPendingUsers(pending);
  }, [approverId, currentPeriod]);

  useEffect(() => {
    if (selectedUser) {
      const objectives = mockUserObjectives.find(
        uo => uo.userId === selectedUser.id && 
        uo.periodId === currentPeriod?.id
      );
      setSelectedUserObjectives(objectives);
      setEditedObjectives(objectives);
      
      // Calculate total weight
      if (objectives) {
        const total = objectives.objectives.reduce((sum: number, obj: any) => sum + obj.weight, 0);
        setTotalWeight(total);
      }
    }
  }, [selectedUser, currentPeriod]);

  const handleApprove = () => {
    if (selectedUser && selectedUserObjectives) {
      onApprove(selectedUser.id, selectedUserObjectives);
      setSelectedUser(null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedUser && editedObjectives) {
      onEdit(selectedUser.id, editedObjectives);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedObjectives(selectedUserObjectives);
  };

  const handleReject = () => {
    if (selectedUser && rejectReason.trim()) {
      onReject(selectedUser.id, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedUser(null);
    }
  };

  const handleObjectiveWeightChange = (objectiveId: number, weight: number) => {
    if (editedObjectives) {
      const updated = {
        ...editedObjectives,
        objectives: editedObjectives.objectives.map((obj: any) =>
          obj.objectiveId === objectiveId ? { ...obj, weight } : obj
        )
      };
      setEditedObjectives(updated);
      
      // Recalculate total weight
      const total = updated.objectives.reduce((sum: number, obj: any) => sum + obj.weight, 0);
      setTotalWeight(total);
    }
  };

  const getObjectiveDetails = (objectiveId: number) => {
    return getObjectiveById(objectiveId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Pending Approval':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Objective Approval</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentPeriod?.quarter} {currentPeriod?.year} - Review and approve direct reports' objectives
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
            <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
            
            {pendingUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map(user => {
                  const userObj = mockUserObjectives.find(
                    uo => uo.userId === user.id && 
                    uo.periodId === currentPeriod?.id
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
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {userObj?.objectives.length || 0} objectives • {userObj?.totalWeight || 0}% total weight
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userObj?.status || 'Pending Approval')}`}>
                            {userObj?.status || 'Pending Approval'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Panel - User Objectives */}
          <div className="flex-1 p-6">
            {!selectedUser ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select a User</h3>
                <p>Choose a user from the list to review their objectives</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{selectedUser.department} • {selectedUser.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{totalWeight}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Weight</div>
                  </div>
                </div>

                {/* Weight Validation */}
                {totalWeight !== 100 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 dark:text-red-200 font-medium">
                        Total weight must be 100%. Current total: {totalWeight}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Objectives List */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Selected Objectives</h4>
                  
                  {selectedUserObjectives?.objectives.map((userObj: any) => {
                    const objective = getObjectiveDetails(userObj.objectiveId);
                    if (!objective) return null;

                    return (
                      <div key={userObj.objectiveId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="mb-3">
                          <h5 className="font-medium">{objective.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{objective.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Target className="h-4 w-4" />
                              <span>Default: {objective.defaultWeight}%</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4" />
                              <span>Status: {userObj.status}</span>
                            </span>
                          </div>
                          
                          {isEditing ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Weight:</span>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={editedObjectives?.objectives.find((obj: any) => obj.objectiveId === userObj.objectiveId)?.weight || userObj.weight}
                                onChange={(e) => handleObjectiveWeightChange(userObj.objectiveId, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              />
                              <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Percent className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{userObj.weight}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        disabled={totalWeight !== 100}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={handleApprove}
                        disabled={totalWeight !== 100}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Reject Objectives</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please provide a reason for rejecting {selectedUser?.name}'s objectives:
                </p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={4}
                  placeholder="Enter rejection reason..."
                />
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowRejectModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={!rejectReason.trim()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


