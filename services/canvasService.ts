
export const canvasApi = {
  getAssignments: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { id: 1, title: 'Calculus: Derivatives Quiz', dueDate: 'Tomorrow, 11:59 PM', priority: 'high', status: 'pending' },
      { id: 2, title: 'Physics Lab Report: Pendulums', dueDate: 'Friday, 5:00 PM', priority: 'medium', status: 'pending' },
      { id: 3, title: 'History Essay: Industrial Revolution', dueDate: 'Next Monday', priority: 'low', status: 'submitted' }
    ];
  },
  
  getGrades: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      'Mathematics': '92% (A)',
      'Physics': '88% (A)',
      'Chemistry': '85% (A)',
      'History': '90% (A*)',
      'English Literature': '78% (B)'
    };
  },

  getRecommendations: async (interest: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { subject: 'Advanced Math', level: 'Enrichment', reason: `Based on your interest in ${interest}, try the Khan Academy module on Multivariable Calculus.` },
      { subject: 'Physics Simulation', level: 'Interactive', reason: 'Check out the new PhET simulation on Canvas regarding forces and motion.' },
      { subject: 'Study Group', level: 'Social', reason: 'Join the "Stem Enthusiasts" group on BigBlueButton this Thursday.' }
    ];
  }
};
