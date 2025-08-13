import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types for PDF export data
export interface EmployeeData {
  id: number;
  name: string;
  email: string;
  team: string;
  position: string;
  appraisalStatus: string;
  performance: string;
  lastReview: string;
  manager: string;
  hireDate: string;
  salary: string;
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  team: string;
  priority: string;
  status: string;
  dueDate: string;
  progress: number;
}

export interface PerformanceData {
  period: string;
  rating: string;
  score: number;
  feedback: string;
}

export interface ObjectiveData {
  id: number;
  name: string;
  description: string;
  perspective: string;
  defaultWeight: number;
  isActive: boolean;
}

export interface AppraisalData {
  userId: number;
  periodId: number;
  objectives: Array<{
    objectiveId: number;
    weight: number;
    status: string;
  }>;
  status: string;
  submittedAt: string;
}

// PDF Export Utility Class
export class PDFExporter {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  // Add header to PDF
  private addHeader(title: string, subtitle?: string) {
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Performance Appraisal System', 20, 20);
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(title, 20, 35);
    
    if (subtitle) {
      this.doc.setFontSize(12);
      this.doc.text(subtitle, 20, 45);
    }
    
    this.doc.setFontSize(10);
    this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55);
    
    // Add line separator
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(20, 60, 190, 60);
  }

  // Export Employee List
  exportEmployeeList(employees: EmployeeData[], filters?: { team?: string; status?: string }) {
    this.addHeader('Employee Directory', filters ? `Filtered by: ${Object.values(filters).filter(Boolean).join(', ')}` : undefined);
    
    const tableData = employees.map(emp => [
      emp.name,
      emp.email,
      emp.team,
      emp.position,
      emp.appraisalStatus,
      emp.performance,
      emp.lastReview
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['Name', 'Email', 'Team', 'Position', 'Status', 'Performance', 'Last Review']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
        6: { cellWidth: 20 }
      }
    });

    this.savePDF('employee-directory.pdf');
  }

  // Export Task Management Report
  exportTaskReport(tasks: TaskData[], filters?: { team?: string; status?: string; priority?: string }) {
    this.addHeader('Task Management Report', filters ? `Filtered by: ${Object.values(filters).filter(Boolean).join(', ')}` : undefined);
    
    const tableData = tasks.map(task => [
      task.title,
      task.assignedTo,
      task.team,
      task.priority,
      task.status,
      task.dueDate,
      `${task.progress}%`
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['Task', 'Assigned To', 'Team', 'Priority', 'Status', 'Due Date', 'Progress']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 15 }
      }
    });

    this.savePDF('task-management-report.pdf');
  }

  // Export Performance Summary
  exportPerformanceSummary(employees: EmployeeData[], performanceData: PerformanceData[]) {
    this.addHeader('Performance Summary Report');
    
    // Employee Performance Table
    const employeeTableData = employees.map(emp => [
      emp.name,
      emp.team,
      emp.appraisalStatus,
      emp.performance,
      emp.lastReview
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['Employee', 'Team', 'Appraisal Status', 'Performance', 'Last Review']],
      body: employeeTableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 }
      }
    });

    // Performance History
    if (performanceData.length > 0) {
      const performanceTableData = performanceData.map(perf => [
        perf.period,
        perf.rating,
        perf.score.toString(),
        perf.feedback
      ]);

      autoTable(this.doc, {
        startY: (this.doc as any).lastAutoTable.finalY + 20,
        head: [['Period', 'Rating', 'Score', 'Feedback']],
        body: performanceTableData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 30 },
          2: { cellWidth: 20 },
          3: { cellWidth: 80 }
        }
      });
    }

    this.savePDF('performance-summary.pdf');
  }

  // Export Company Objectives
  exportCompanyObjectives(objectives: ObjectiveData[]) {
    this.addHeader('Company Objectives & Perspectives');
    
    const tableData = objectives.map(obj => [
      obj.name,
      obj.description,
      obj.perspective,
      `${obj.defaultWeight}%`,
      obj.isActive ? 'Active' : 'Inactive'
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['Objective', 'Description', 'Perspective', 'Default Weight', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 50 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 }
      }
    });

    this.savePDF('company-objectives.pdf');
  }

  // Export Appraisal Data
  exportAppraisalData(appraisals: AppraisalData[], periodInfo?: { quarter: string; year: number }) {
    const periodTitle = periodInfo ? `${periodInfo.quarter} ${periodInfo.year}` : 'All Periods';
    this.addHeader('Appraisal Data Report', periodTitle);
    
    const tableData = appraisals.map(appraisal => [
      `User ${appraisal.userId}`,
      `Period ${appraisal.periodId}`,
      appraisal.objectives.length.toString(),
      appraisal.status,
      appraisal.submittedAt
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['User ID', 'Period ID', 'Objectives Count', 'Status', 'Submitted Date']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 }
      }
    });

    this.savePDF('appraisal-data.pdf');
  }

  // Export Analytics Report
  exportAnalyticsReport(data: any) {
    this.addHeader('Analytics Report');
    
    // Add summary statistics
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Summary Statistics', 20, 80);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Total Employees: ${data.totalEmployees || 0}`, 20, 95);
    this.doc.text(`Completed Appraisals: ${data.completedAppraisals || 0}`, 20, 105);
    this.doc.text(`Completion Rate: ${data.completionRate || 0}%`, 20, 115);
    this.doc.text(`Average Performance Score: ${data.averageScore || 0}`, 20, 125);
    
    // Add performance distribution if available
    if (data.performanceDistribution) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Performance Distribution', 20, 145);
      
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      Object.entries(data.performanceDistribution).forEach(([rating, count], index) => {
        this.doc.text(`${rating}: ${count}`, 20, 155 + (index * 10));
      });
    }

    this.savePDF('analytics-report.pdf');
  }

  // Export Recognition Report
  exportRecognitionReport(employees: EmployeeData[]) {
    this.addHeader('Recognition Report');
    
    // Filter employees with high performance
    const highPerformers = employees.filter(emp => 
      emp.performance === 'Exceeds Expectations' || emp.performance === 'Outstanding'
    );
    
    const tableData = highPerformers.map(emp => [
      emp.name,
      emp.team,
      emp.position,
      emp.performance,
      emp.lastReview
    ]);

    autoTable(this.doc, {
      startY: 70,
      head: [['Employee', 'Team', 'Position', 'Performance', 'Last Review']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [46, 204, 113], textColor: 255 },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 }
      }
    });

    this.savePDF('recognition-report.pdf');
  }

  // Export All Reports (Combined)
  exportAllReports(data: {
    employees: EmployeeData[];
    tasks: TaskData[];
    performance: PerformanceData[];
    objectives: ObjectiveData[];
    appraisals: AppraisalData[];
  }) {
    this.addHeader('Comprehensive System Report');
    
    // Summary page
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('System Overview', 20, 80);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Total Employees: ${data.employees.length}`, 20, 95);
    this.doc.text(`Total Tasks: ${data.tasks.length}`, 20, 105);
    this.doc.text(`Total Objectives: ${data.objectives.length}`, 20, 115);
    this.doc.text(`Total Appraisals: ${data.appraisals.length}`, 20, 125);
    
    // Add page break for detailed tables
    this.doc.addPage();
    
    // Employee summary
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Employee Summary', 20, 20);
    
    const employeeSummary = data.employees.slice(0, 10).map(emp => [
      emp.name,
      emp.team,
      emp.appraisalStatus,
      emp.performance
    ]);

    autoTable(this.doc, {
      startY: 30,
      head: [['Name', 'Team', 'Status', 'Performance']],
      body: employeeSummary,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 8 }
    });

    this.savePDF('comprehensive-system-report.pdf');
  }

  // Save PDF with proper filename
  private savePDF(filename: string) {
    this.doc.save(filename);
  }

  // Reset document for new export
  reset() {
    this.doc = new jsPDF();
  }
}

// Export utility functions for easy use
export const exportEmployeeList = (employees: EmployeeData[], filters?: { team?: string; status?: string }) => {
  const exporter = new PDFExporter();
  exporter.exportEmployeeList(employees, filters);
};

export const exportTaskReport = (tasks: TaskData[], filters?: { team?: string; status?: string; priority?: string }) => {
  const exporter = new PDFExporter();
  exporter.exportTaskReport(tasks, filters);
};

export const exportPerformanceSummary = (employees: EmployeeData[], performanceData: PerformanceData[]) => {
  const exporter = new PDFExporter();
  exporter.exportPerformanceSummary(employees, performanceData);
};

export const exportCompanyObjectives = (objectives: ObjectiveData[]) => {
  const exporter = new PDFExporter();
  exporter.exportCompanyObjectives(objectives);
};

export const exportAppraisalData = (appraisals: AppraisalData[], periodInfo?: { quarter: string; year: number }) => {
  const exporter = new PDFExporter();
  exporter.exportAppraisalData(appraisals, periodInfo);
};

export const exportAnalyticsReport = (data: any) => {
  const exporter = new PDFExporter();
  exporter.exportAnalyticsReport(data);
};

export const exportRecognitionReport = (employees: EmployeeData[]) => {
  const exporter = new PDFExporter();
  exporter.exportRecognitionReport(employees);
};

export const exportAllReports = (data: {
  employees: EmployeeData[];
  tasks: TaskData[];
  performance: PerformanceData[];
  objectives: ObjectiveData[];
  appraisals: AppraisalData[];
}) => {
  const exporter = new PDFExporter();
  exporter.exportAllReports(data);
};





