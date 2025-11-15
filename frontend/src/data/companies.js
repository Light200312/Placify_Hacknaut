// src/data/companies.js

// REMOVE all import statements, as the logos are now accessed from the public directory.
// import tcsLogo from '../assets/tcs.png';
// import infosysLogo from '../assets/infosys.png';
// ... etc.

export const companies = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    // Updated to use the public path string
    logo: '/tcss.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Round', description: 'Quantitative, Logical, Verbal' },
      { id: 'technical', name: 'Technical Round', description: 'Coding, Data Structures, Algorithms' },
      { id: 'communication', name: 'Communication Round', description: 'Reading, Writing, Speaking' },
      { id: 'hr', name: 'HR Interview', description: 'Behavioral and Fit Assessment' },
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    // Updated to use the public path string
    logo: '/infosys.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Round', description: 'Quantitative, Logical Reasoning' },
      { id: 'technical', name: 'Technical Round', description: 'Pseudo-code, Programming Concepts' },
      { id: 'communication', name: 'Communication Round', description: 'Verbal Ability' },
    ],
  },
  {
    id: 'wipro',
    name: 'Wipro',
    // Updated to use the public path string
    logo: '/wipro.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Round', description: 'Numerical, Verbal, Reasoning' },
      { id: 'coding', name: 'Coding Round', description: '2 Coding Problems' },
      { id: 'technicalInterview', name: 'Technical Interview', description: 'Project, CS Fundamentals' },
      { id: 'hrInterview', name: 'Personality, Company Fit' },
    ],
  },
  {
    id: 'accenture',
    name: 'Accenture',
    // Updated to use the public path string
    logo: '/accenture.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Test', description: 'Numerical, Verbal, Logical' },
      { id: 'technical', name: 'Technical Assessment', description: 'Pseudo-code, Debugging, SQL' },
      { id: 'communication', name: 'Communication Assessment', description: 'Grammar, Fluency, Comprehension' },
      { id: 'interview', name: 'Interview Round', description: 'Technical + HR Discussion' },
    ],
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    // Updated to use the public path string
    logo: '/cognizant.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Round', description: 'Quantitative, Logical, Verbal' },
      { id: 'technical', name: 'Technical Round', description: 'Coding, CS Concepts' },
      { id: 'hr', name: 'HR Interview', description: 'Behavioral & Career Goals' },
    ],
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    // Updated to use the public path string
    logo: '/capgemini.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Test', description: 'Analytical, Quantitative, Logical' },
      { id: 'technical', name: 'Technical Assessment', description: 'Coding + Domain Questions' },
      { id: 'communication', name: 'Communication Test', description: 'Listening and Grammar' },
      { id: 'interview', name: 'Interview Round', description: 'Managerial + HR' },
    ],
  },
  {
    id: 'hcl',
    name: 'HCL Technologies',
    // Updated to use the public path string
    logo: '/hclTech.png', 
    rounds: [
      { id: 'aptitude', name: 'Aptitude Test', description: 'Maths, Reasoning, Verbal' },
      { id: 'technical', name: 'Technical Round', description: 'Coding, Problem Solving' },
      { id: 'hr', name: 'HR Interview', description: 'Personal & Career Questions' },
    ],
  },
];