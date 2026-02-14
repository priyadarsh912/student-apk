export interface Subject {
    id: string;
    name: string;
    code: string;
    semester: number;
    branch: string;
    units: number;
    color: string;
}

export interface Unit {
    id: string;
    subjectId: string;
    name: string;
    unitNumber: number;
    filesCount: number;
}

export interface LMSFile {
    id: string;
    unitId: string;
    name: string;
    type: 'pdf' | 'ppt' | 'notes';
    size: string;
    uploadDate: string;
    uploadedBy: string;
    url: string;
}

export const subjects: Subject[] = [
    {
        id: 's1',
        name: 'Mathematics I',
        code: 'MATH101',
        semester: 1,
        branch: 'Computer Science',
        units: 4,
        color: 'blue',
    },
    {
        id: 's2',
        name: 'Physics',
        code: 'PHY101',
        semester: 1,
        branch: 'Computer Science',
        units: 4,
        color: 'purple',
    },
    {
        id: 's3',
        name: 'Computer Programming',
        code: 'CS101',
        semester: 1,
        branch: 'Computer Science',
        units: 3,
        color: 'green',
    },
    {
        id: 's4',
        name: 'Data Structures',
        code: 'CS201',
        semester: 2,
        branch: 'Computer Science',
        units: 4,
        color: 'orange',
    },
    {
        id: 's5',
        name: 'Database Management',
        code: 'CS202',
        semester: 2,
        branch: 'Computer Science',
        units: 4,
        color: 'red',
    },
    {
        id: 's6',
        name: 'Mathematics II',
        code: 'MATH102',
        semester: 2,
        branch: 'Computer Science',
        units: 4,
        color: 'cyan',
    },
];

export const units: Unit[] = [
    // Mathematics I
    { id: 'u1', subjectId: 's1', name: 'Differential Calculus', unitNumber: 1, filesCount: 6 },
    { id: 'u2', subjectId: 's1', name: 'Integral Calculus', unitNumber: 2, filesCount: 5 },
    { id: 'u3', subjectId: 's1', name: 'Matrices and Determinants', unitNumber: 3, filesCount: 7 },
    { id: 'u4', subjectId: 's1', name: 'Vector Calculus', unitNumber: 4, filesCount: 6 },

    // Physics
    { id: 'u5', subjectId: 's2', name: 'Mechanics', unitNumber: 1, filesCount: 8 },
    { id: 'u6', subjectId: 's2', name: 'Thermodynamics', unitNumber: 2, filesCount: 6 },
    { id: 'u7', subjectId: 's2', name: 'Electromagnetism', unitNumber: 3, filesCount: 7 },
    { id: 'u8', subjectId: 's2', name: 'Optics', unitNumber: 4, filesCount: 5 },

    // Computer Programming
    { id: 'u9', subjectId: 's3', name: 'Introduction to Programming', unitNumber: 1, filesCount: 8 },
    { id: 'u10', subjectId: 's3', name: 'Control Structures', unitNumber: 2, filesCount: 7 },
    { id: 'u11', subjectId: 's3', name: 'Functions and Arrays', unitNumber: 3, filesCount: 6 },

    // Data Structures
    { id: 'u12', subjectId: 's4', name: 'Arrays and Linked Lists', unitNumber: 1, filesCount: 8 },
    { id: 'u13', subjectId: 's4', name: 'Stacks and Queues', unitNumber: 2, filesCount: 7 },
    { id: 'u14', subjectId: 's4', name: 'Trees and Graphs', unitNumber: 3, filesCount: 9 },
    { id: 'u15', subjectId: 's4', name: 'Sorting and Searching', unitNumber: 4, filesCount: 6 },

    // Database Management
    { id: 'u16', subjectId: 's5', name: 'Introduction to DBMS', unitNumber: 1, filesCount: 7 },
    { id: 'u17', subjectId: 's5', name: 'SQL and Queries', unitNumber: 2, filesCount: 8 },
    { id: 'u18', subjectId: 's5', name: 'Normalization', unitNumber: 3, filesCount: 6 },
    { id: 'u19', subjectId: 's5', name: 'Transactions and Concurrency', unitNumber: 4, filesCount: 5 },

    // Mathematics II
    { id: 'u20', subjectId: 's6', name: 'Differential Equations', unitNumber: 1, filesCount: 7 },
    { id: 'u21', subjectId: 's6', name: 'Laplace Transforms', unitNumber: 2, filesCount: 6 },
    { id: 'u22', subjectId: 's6', name: 'Fourier Series', unitNumber: 3, filesCount: 5 },
    { id: 'u23', subjectId: 's6', name: 'Probability and Statistics', unitNumber: 4, filesCount: 8 },
];

export const files: LMSFile[] = [
    // Unit 1 - Differential Calculus
    { id: 'f1', unitId: 'u1', name: 'Introduction to Derivatives', type: 'pdf', size: '2.4 MB', uploadDate: '2024-01-15', uploadedBy: 'Dr. Sharma', url: '#' },
    { id: 'f2', unitId: 'u1', name: 'Limits and Continuity', type: 'ppt', size: '3.1 MB', uploadDate: '2024-01-16', uploadedBy: 'Dr. Sharma', url: '#' },
    { id: 'f3', unitId: 'u1', name: 'Differentiation Rules', type: 'notes', size: '1.8 MB', uploadDate: '2024-01-18', uploadedBy: 'Dr. Sharma', url: '#' },
    { id: 'f4', unitId: 'u1', name: 'Applications of Derivatives', type: 'pdf', size: '2.9 MB', uploadDate: '2024-01-20', uploadedBy: 'Dr. Sharma', url: '#' },
    { id: 'f5', unitId: 'u1', name: 'Practice Problems', type: 'pdf', size: '1.5 MB', uploadDate: '2024-01-22', uploadedBy: 'Dr. Sharma', url: '#' },
    { id: 'f6', unitId: 'u1', name: 'Solved Examples', type: 'notes', size: '2.2 MB', uploadDate: '2024-01-25', uploadedBy: 'Dr. Sharma', url: '#' },

    // Unit 9 - Introduction to Programming
    { id: 'f7', unitId: 'u9', name: 'Programming Fundamentals', type: 'pdf', size: '3.5 MB', uploadDate: '2024-01-10', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f8', unitId: 'u9', name: 'Variables and Data Types', type: 'ppt', size: '2.8 MB', uploadDate: '2024-01-12', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f9', unitId: 'u9', name: 'Input Output Operations', type: 'notes', size: '1.6 MB', uploadDate: '2024-01-14', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f10', unitId: 'u9', name: 'Operators and Expressions', type: 'pdf', size: '2.1 MB', uploadDate: '2024-01-16', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f11', unitId: 'u9', name: 'First Program Tutorial', type: 'ppt', size: '4.2 MB', uploadDate: '2024-01-18', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f12', unitId: 'u9', name: 'Lab Exercises', type: 'notes', size: '1.9 MB', uploadDate: '2024-01-20', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f13', unitId: 'u9', name: 'Code Examples', type: 'pdf', size: '2.7 MB', uploadDate: '2024-01-22', uploadedBy: 'Prof. Kumar', url: '#' },
    { id: 'f14', unitId: 'u9', name: 'Assignment Questions', type: 'notes', size: '1.3 MB', uploadDate: '2024-01-24', uploadedBy: 'Prof. Kumar', url: '#' },

    // Unit 12 - Arrays and Linked Lists
    { id: 'f15', unitId: 'u12', name: 'Array Basics', type: 'pdf', size: '2.6 MB', uploadDate: '2024-02-01', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f16', unitId: 'u12', name: 'Array Operations', type: 'ppt', size: '3.4 MB', uploadDate: '2024-02-03', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f17', unitId: 'u12', name: 'Linked List Introduction', type: 'notes', size: '2.0 MB', uploadDate: '2024-02-05', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f18', unitId: 'u12', name: 'Singly Linked Lists', type: 'pdf', size: '2.8 MB', uploadDate: '2024-02-07', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f19', unitId: 'u12', name: 'Doubly Linked Lists', type: 'ppt', size: '3.1 MB', uploadDate: '2024-02-09', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f20', unitId: 'u12', name: 'Circular Linked Lists', type: 'notes', size: '1.7 MB', uploadDate: '2024-02-11', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f21', unitId: 'u12', name: 'Implementation Examples', type: 'pdf', size: '3.6 MB', uploadDate: '2024-02-13', uploadedBy: 'Dr. Patel', url: '#' },
    { id: 'f22', unitId: 'u12', name: 'Practice Problems', type: 'notes', size: '2.3 MB', uploadDate: '2024-02-15', uploadedBy: 'Dr. Patel', url: '#' },

    // Unit 16 - Introduction to DBMS
    { id: 'f23', unitId: 'u16', name: 'Database Concepts', type: 'pdf', size: '3.2 MB', uploadDate: '2024-02-01', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f24', unitId: 'u16', name: 'DBMS Architecture', type: 'ppt', size: '4.1 MB', uploadDate: '2024-02-03', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f25', unitId: 'u16', name: 'Data Models', type: 'notes', size: '2.5 MB', uploadDate: '2024-02-05', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f26', unitId: 'u16', name: 'ER Diagrams', type: 'pdf', size: '2.9 MB', uploadDate: '2024-02-07', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f27', unitId: 'u16', name: 'Relational Model', type: 'ppt', size: '3.7 MB', uploadDate: '2024-02-09', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f28', unitId: 'u16', name: 'Keys and Constraints', type: 'notes', size: '1.9 MB', uploadDate: '2024-02-11', uploadedBy: 'Prof. Singh', url: '#' },
    { id: 'f29', unitId: 'u16', name: 'Case Studies', type: 'pdf', size: '3.3 MB', uploadDate: '2024-02-13', uploadedBy: 'Prof. Singh', url: '#' },

    // Unit 5 - Mechanics
    { id: 'f30', unitId: 'u5', name: 'Newtons Laws', type: 'pdf', size: '2.7 MB', uploadDate: '2024-01-10', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f31', unitId: 'u5', name: 'Force and Motion', type: 'ppt', size: '3.9 MB', uploadDate: '2024-01-12', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f32', unitId: 'u5', name: 'Work Energy Power', type: 'notes', size: '2.1 MB', uploadDate: '2024-01-14', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f33', unitId: 'u5', name: 'Momentum Conservation', type: 'pdf', size: '2.4 MB', uploadDate: '2024-01-16', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f34', unitId: 'u5', name: 'Rotational Motion', type: 'ppt', size: '4.3 MB', uploadDate: '2024-01-18', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f35', unitId: 'u5', name: 'Gravitation', type: 'notes', size: '1.8 MB', uploadDate: '2024-01-20', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f36', unitId: 'u5', name: 'Solved Numericals', type: 'pdf', size: '3.1 MB', uploadDate: '2024-01-22', uploadedBy: 'Dr. Verma', url: '#' },
    { id: 'f37', unitId: 'u5', name: 'Lab Manual', type: 'notes', size: '2.6 MB', uploadDate: '2024-01-24', uploadedBy: 'Dr. Verma', url: '#' },
];
