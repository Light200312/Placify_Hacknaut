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
  // ---------------- PASSAGE 1 ----------------
  {
    id: 'tcs_rcq1',
    company: 'tcs',
    round: 'communication',
    passage:
      "The rapid adoption of electric vehicles (EVs) is considered a major step toward reducing global carbon emissions. Governments across the world are offering incentives, while automobile manufacturers are investing heavily in battery technology. However, challenges such as limited charging infrastructure, long charging times, and the environmental impact of battery disposal still concern industry experts. Despite these hurdles, the transition to EVs is seen as essential for a sustainable future.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is one major challenge mentioned regarding electric vehicles?",
        options: [
          "High vehicle speed",
          "Limited charging infrastructure",
          "Lack of government interest",
          "Decline in battery research"
        ],
        correctAnswer: "Limited charging infrastructure"
      },
      {
        qId: 'q2',
        questionText: "Why are governments offering incentives?",
        options: [
          "To reduce carbon emissions",
          "To increase fuel prices",
          "To promote air travel",
          "To limit vehicle ownership"
        ],
        correctAnswer: "To reduce carbon emissions"
      },
      {
        qId: 'q3',
        questionText: "What is the tone of the passage?",
        options: [
          "Optimistic but cautious",
          "Humorous",
          "Aggressive",
          "Indifferent"
        ],
        correctAnswer: "Optimistic but cautious"
      },
      {
        qId: 'q4',
        questionText: "Which factor still worries experts?",
        options: [
          "Falling EV prices",
          "Battery disposal impact",
          "Excessive charging stations",
          "Long vehicle lifespan"
        ],
        correctAnswer: "Battery disposal impact"
      }
    ]
  },

  // ---------------- PASSAGE 2 ----------------
  {
    id: 'tcs_rcq2',
    company: 'tcs',
    round: 'communication',
    passage:
      "Space tourism, once considered science fiction, is now becoming a commercial reality. Companies such as SpaceX and Blue Origin are offering suborbital flights to civilians, promising a unique view of Earth. Although extremely expensive today, experts believe prices will gradually fall as technology improves. Critics argue that space tourism contributes to atmospheric pollution and serves only the wealthy, raising ethical questions about its long-term implications.",
    questions: [
      {
        qId: 'q1',
        questionText: "Which companies are mentioned as offering space tourism?",
        options: [
          "NASA and ISRO",
          "SpaceX and Blue Origin",
          "Virgin Atlantic and Emirates",
          "Tesla and Boeing"
        ],
        correctAnswer: "SpaceX and Blue Origin"
      },
      {
        qId: 'q2',
        questionText: "What is one criticism of space tourism?",
        options: [
          "It reduces global travel",
          "It increases competition among airlines",
          "It causes atmospheric pollution",
          "It lowers fuel consumption"
        ],
        correctAnswer: "It causes atmospheric pollution"
      },
      {
        qId: 'q3',
        questionText: "Why is space tourism currently limited?",
        options: [
          "Lack of government support",
          "Extremely high cost",
          "Low public interest",
          "Poor safety records"
        ],
        correctAnswer: "Extremely high cost"
      },
      {
        qId: 'q4',
        questionText: "What is the central idea of the passage?",
        options: [
          "Space tourism is becoming a reality but raises ethical concerns.",
          "Space research should be stopped completely.",
          "Earth is becoming uninhabitable soon.",
          "Public transportation should be improved."
        ],
        correctAnswer:
          "Space tourism is becoming a reality but raises ethical concerns."
      }
    ]
  },

  // ---------------- PASSAGE 3 ----------------
  {
    id: 'tcs_rcq3',
    company: 'tcs',
    round: 'communication',
    passage:
      "Digital payments have revolutionized the global economy by enabling faster, more secure transactions. Platforms like UPI, PayPal, and digital wallets have made money transfers accessible to millions. However, cybersecurity threats, fraudulent transactions, and data privacy issues remain major challenges. Financial institutions are investing heavily in encryption and authentication technologies to safeguard users and build trust in the digital ecosystem.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is the primary benefit of digital payments mentioned?",
        options: [
          "Slower transactions",
          "Faster and more secure transactions",
          "Reduced internet usage",
          "Less dependency on technology"
        ],
        correctAnswer: "Faster and more secure transactions"
      },
      {
        qId: 'q2',
        questionText: "Which of the following is a concern regarding digital payments?",
        options: [
          "Limited smartphone production",
          "Cybersecurity threats",
          "High printing cost of currency",
          "Decrease in online shopping"
        ],
        correctAnswer: "Cybersecurity threats"
      },
      {
        qId: 'q3',
        questionText: "How are financial institutions responding to risks?",
        options: [
          "Avoiding digital payments",
          "Investing in encryption technologies",
          "Shutting down online services",
          "Reducing user access"
        ],
        correctAnswer: "Investing in encryption technologies"
      },
      {
        qId: 'q4',
        questionText: "What tone does the passage convey?",
        options: ["Critical", "Balanced", "Humorous", "Fearful"],
        correctAnswer: "Balanced"
      }
    ]
  },

  // ---------------- PASSAGE 4 ----------------
  {
    id: 'tcs_rcq4',
    company: 'tcs',
    round: 'communication',
    passage:
      "The growing popularity of online education platforms has reshaped the learning landscape. Students can now access high-quality courses offered by top institutions without geographic limitations. However, critics argue that digital learning lacks personal interaction and may reduce student engagement. Blended learning models, which combine online and classroom teaching, are emerging as a practical solution.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is one advantage of online education?",
        options: [
          "Limited course availability",
          "Access to high-quality courses from anywhere",
          "High travel expenses",
          "Strict classroom schedules"
        ],
        correctAnswer:
          "Access to high-quality courses from anywhere"
      },
      {
        qId: 'q2',
        questionText: "What is one drawback mentioned?",
        options: [
          "Too many assignments",
          "Lack of personal interaction",
          "Insufficient internet data",
          "High course fees"
        ],
        correctAnswer: "Lack of personal interaction"
      },
      {
        qId: 'q3',
        questionText: "What is the proposed solution?",
        options: [
          "Eliminating online learning",
          "Blended learning models",
          "Reducing classroom teaching",
          "Stopping digital content"
        ],
        correctAnswer: "Blended learning models"
      },
      {
        qId: 'q4',
        questionText: "The passage primarily discusses:",
        options: [
          "Benefits and challenges of online education",
          "Importance of traditional classrooms",
          "Failures in online learning",
          "Only disadvantages of digital education"
        ],
        correctAnswer: "Benefits and challenges of online education"
      }
    ]
  },

  // ---------------- PASSAGE 5 ----------------
  {
    id: 'tcs_rcq5',
    company: 'tcs',
    round: 'communication',
    passage:
      "Urbanization has led to the rapid expansion of cities, bringing economic growth and improved infrastructure. However, it has also increased traffic congestion, pollution, and pressure on housing. City planners are focusing on sustainable development strategies, including green spaces, efficient public transport, and smart city technologies to create livable urban environments.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is one positive outcome of urbanization?",
        options: [
          "Increased pollution",
          "Economic growth",
          "Scarcity of resources",
          "Traffic jams"
        ],
        correctAnswer: "Economic growth"
      },
      {
        qId: 'q2',
        questionText: "Which challenge is associated with urbanization?",
        options: [
          "More green spaces",
          "Traffic congestion",
          "Improved healthcare",
          "Better connectivity"
        ],
        correctAnswer: "Traffic congestion"
      },
      {
        qId: 'q3',
        questionText: "What are city planners focusing on?",
        options: [
          "Traditional farming methods",
          "Sustainable development strategies",
          "Reducing public transport",
          "Eliminating technology usage"
        ],
        correctAnswer: "Sustainable development strategies"
      },
      {
        qId: 'q4',
        questionText: "The purpose of smart city technologies is to:",
        options: [
          "Increase pollution",
          "Enhance livability",
          "Reduce digital usage",
          "Promote rural migration"
        ],
        correctAnswer: "Enhance livability"
      }
    ]
  },

  // ---------------- PASSAGE 6 ----------------
  {
    id: 'tcs_rcq6',
    company: 'tcs',
    round: 'communication',
    passage:
      "Mental health awareness has increased significantly in recent years. More people are openly discussing issues like anxiety and depression. Organizations are offering counseling services and wellness programs to support employees. Despite progress, stigma still prevents many from seeking help. Experts emphasize the need for early intervention and emotional support.",
    questions: [
      {
        qId: 'q1',
        questionText: "What positive trend is mentioned in the passage?",
        options: [
          "Decrease in therapy services",
          "More people openly discussing mental health",
          "Less awareness about anxiety",
          "Decline in wellness programs"
        ],
        correctAnswer:
          "More people openly discussing mental health"
      },
      {
        qId: 'q2',
        questionText: "What still prevents people from seeking help?",
        options: ["High costs", "Stigma", "Lack of doctors", "Time shortage"],
        correctAnswer: "Stigma"
      },
      {
        qId: 'q3',
        questionText: "What are organizations doing?",
        options: [
          "Increasing workload",
          "Providing counseling and wellness programs",
          "Discouraging discussions",
          "Reducing health benefits"
        ],
        correctAnswer:
          "Providing counseling and wellness programs"
      },
      {
        qId: 'q4',
        questionText: "Experts recommend:",
        options: [
          "Reducing conversations",
          "Early intervention and emotional support",
          "Rejecting therapy",
          "Ignoring symptoms"
        ],
        correctAnswer:
          "Early intervention and emotional support"
      }
    ]
  },

  // ---------------- PASSAGE 7 ----------------
  {
    id: 'tcs_rcq7',
    company: 'tcs',
    round: 'communication',
    passage:
      "With rising healthcare costs, preventive healthcare has gained importance. Regular exercise, balanced nutrition, and early screening can significantly reduce the risk of chronic diseases. Governments are promoting awareness campaigns and encouraging citizens to take responsibility for their health. Preventive care not only improves quality of life but also reduces long-term medical expenses.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is the main focus of preventive healthcare?",
        options: [
          "Treating diseases",
          "Reducing risk of chronic illnesses",
          "Increasing hospital visits",
          "Increasing medication usage"
        ],
        correctAnswer: "Reducing risk of chronic illnesses"
      },
      {
        qId: 'q2',
        questionText: "What action is the government taking?",
        options: [
          "Closing hospitals",
          "Creating awareness campaigns",
          "Discouraging fitness activities",
          "Reducing health education"
        ],
        correctAnswer: "Creating awareness campaigns"
      },
      {
        qId: 'q3',
        questionText: "How does preventive care affect long-term expenses?",
        options: [
          "Increases costs",
          "Reduces expenses",
          "Has no impact",
          "Doubles medical bills"
        ],
        correctAnswer: "Reduces expenses"
      },
      {
        qId: 'q4',
        questionText: "Which is NOT part of preventive healthcare?",
        options: [
          "Balanced diet",
          "Regular exercise",
          "Early screening",
          "Ignoring symptoms"
        ],
        correctAnswer: "Ignoring symptoms"
      }
    ]
  },

  // ---------------- PASSAGE 8 ----------------
  {
    id: 'tcs_rcq8',
    company: 'tcs',
    round: 'communication',
    passage:
      "The rise of social media has drastically changed the way people communicate. While it enables instant connection, it also contributes to misinformation and reduced face-to-face interaction. Psychologists warn that excessive usage can affect mental well-being, leading to anxiety and low self-esteem. Users are encouraged to maintain a healthy balance between online and offline activities.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is one negative effect of social media?",
        options: [
          "Better offline communication",
          "Misinformation spread",
          "Higher internet speeds",
          "Improved physical fitness"
        ],
        correctAnswer: "Misinformation spread"
      },
      {
        qId: 'q2',
        questionText: "What do psychologists warn about?",
        options: [
          "More job opportunities",
          "Mental health issues",
          "Higher academic performance",
          "Improved attention span"
        ],
        correctAnswer: "Mental health issues"
      },
      {
        qId: 'q3',
        questionText: "What is suggested for users?",
        options: [
          "Complete digital withdrawal",
          "Balancing online and offline life",
          "Increasing social media usage",
          "Avoiding offline communication"
        ],
        correctAnswer:
          "Balancing online and offline life"
      },
      {
        qId: 'q4',
        questionText: "What is one benefit of social media?",
        options: [
          "Instant connection",
          "Reduced communication",
          "Guaranteed accurate news",
          "Lower digital literacy"
        ],
        correctAnswer: "Instant connection"
      }
    ]
  },

  // ---------------- PASSAGE 9 ----------------
  {
    id: 'tcs_rcq9',
    company: 'tcs',
    round: 'communication',
    passage:
      "The global demand for renewable energy is rising due to climate concerns and the depletion of fossil fuels. Solar and wind energy have become cost-effective and widely adopted sources of power. However, energy storage remains a major challenge, as renewable sources are inconsistent. Researchers are working on advanced battery technologies to store surplus energy efficiently.",
    questions: [
      {
        qId: 'q1',
        questionText: "Why is renewable energy demand increasing?",
        options: [
          "Increase in fossil fuel reserves",
          "Climate concerns and fossil fuel depletion",
          "Unavailability of solar panels",
          "Decline in global energy usage"
        ],
        correctAnswer:
          "Climate concerns and fossil fuel depletion"
      },
      {
        qId: 'q2',
        questionText: "What remains a challenge for renewable energy?",
        options: [
          "High fuel prices",
          "Energy storage",
          "Excessive solar power availability",
          "Lack of sunlight on Earth"
        ],
        correctAnswer: "Energy storage"
      },
      {
        qId: 'q3',
        questionText: "What are researchers working on?",
        options: [
          "Reducing electricity demand",
          "Advanced battery technologies",
          "Banning wind farms",
          "Developing more fossil fuels"
        ],
        correctAnswer: "Advanced battery technologies"
      },
      {
        qId: 'q4',
        questionText: "Which energy sources are mentioned?",
        options: ["Solar and wind", "Coal and oil", "Nuclear and gas", "Hydrogen only"],
        correctAnswer: "Solar and wind"
      }
    ]
  },

  // ---------------- PASSAGE 10 ----------------
  {
    id: 'tcs_rcq10',
    company: 'tcs',
    round: 'communication',
    passage:
      "E-commerce platforms have revolutionized shopping by offering convenience, variety, and competitive prices. The rise of digital payments and fast delivery services has further accelerated online purchases. However, challenges like return fraud, delivery delays, and increased packaging waste continue to trouble retailers. As consumers increasingly shift to online shopping, companies must innovate to provide sustainable and reliable services.",
    questions: [
      {
        qId: 'q1',
        questionText: "What is one major advantage of e-commerce?",
        options: [
          "Limited choice",
          "Convenient shopping experience",
          "Mandatory store visits",
          "Extensive travel"
        ],
        correctAnswer: "Convenient shopping experience"
      },
      {
        qId: 'q2',
        questionText: "What challenge is mentioned for retailers?",
        options: [
          "High walk-in crowd",
          "Return fraud",
          "Decreased online transactions",
          "Lack of digital payments"
        ],
        correctAnswer: "Return fraud"
      },
      {
        qId: 'q3',
        questionText: "What is increasing packaging waste a result of?",
        options: [
          "Physical stores",
          "Online shopping deliveries",
          "Reduced shipping",
          "Decreased consumer demand"
        ],
        correctAnswer: "Online shopping deliveries"
      },
      {
        qId: 'q4',
        questionText: "What must companies focus on?",
        options: [
          "Stopping online sales",
          "Reducing product variety",
          "Innovating for sustainability and reliability",
          "Increasing delivery times"
        ],
        correctAnswer:
          "Innovating for sustainability and reliability"
      }
    ]
  },
  
  {
    id: "tcs_read_01",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: The increasing use of automation in industries has boosted productivity, yet many experts argue that it may reduce the need for manual labor. However, new job roles requiring technical skills are also emerging.\n\nWhat is the main idea of the passage?",
    options: [
      "Automation will destroy all jobs in future.",
      "Automation increases productivity but also changes job demands.",
      "Automation reduces productivity.",
      "There are no benefits of automation."
    ],
    correctAnswer: "Automation increases productivity but also changes job demands.",
    explanation: "The passage highlights both the advantages and job-related changes caused by automation."
  },
  {
    id: "tcs_read_02",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Due to rapid urbanization, cities are facing increased air pollution. Governments are now promoting electric vehicles as a cleaner alternative.\n\nAccording to the passage, why are electric vehicles promoted?",
    options: [
      "They reduce air pollution.",
      "They are cheaper to produce.",
      "They increase traffic.",
      "They require no maintenance."
    ],
    correctAnswer: "They reduce air pollution.",
    explanation: "Electric vehicles are mentioned as a cleaner alternative."
  },
  {
    id: "tcs_read_03",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Many organizations encourage employees to work remotely. This helps save office space and allows employees more flexibility, though it may reduce face-to-face communication.\n\nWhich of the following is a disadvantage mentioned?",
    options: [
      "Reduced flexibility",
      "Increased office cost",
      "Reduced face-to-face communication",
      "Lower productivity"
    ],
    correctAnswer: "Reduced face-to-face communication",
    explanation: "The passage identifies limited physical interaction as a drawback."
  },
  {
    id: "tcs_read_04",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Climate change has led to unpredictable weather patterns. Scientists warn that unless immediate action is taken, global temperatures may rise dangerously.\n\nWhat do scientists suggest?",
    options: [
      "No action is needed.",
      "Immediate steps must be taken to control climate change.",
      "Weather changes are temporary.",
      "Temperature rise is beneficial."
    ],
    correctAnswer: "Immediate steps must be taken to control climate change.",
    explanation: "The passage stresses urgency to prevent dangerous temperature rise."
  },
  {
    id: "tcs_read_05",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: With the growth of online education, students can access courses from top universities anywhere in the world. However, self-discipline is necessary for successful learning.\n\nWhat is required for success in online learning?",
    options: ["High fees", "Self-discipline", "Offline classes", "Multiple teachers"],
    correctAnswer: "Self-discipline",
    explanation: "The passage specifically states that self-discipline is essential."
  },
  {
    id: "tcs_read_06",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Renewable energy sources like solar and wind are becoming more popular due to their low environmental impact. Yet, their efficiency depends heavily on weather conditions.\n\nWhat is the limitation of renewable energy mentioned?",
    options: [
      "High pollution levels",
      "Weather-dependent efficiency",
      "Unlimited power generation",
      "High maintenance requirements"
    ],
    correctAnswer: "Weather-dependent efficiency",
    explanation: "The passage highlights that renewable energy depends on weather."
  },
  {
    id: "tcs_read_07",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Many people prefer online shopping due to convenience and wide product variety. However, the inability to physically inspect products remains a concern.\n\nWhat is the concern about online shopping?",
    options: [
      "High product variety",
      "Convenience",
      "Inability to physically check items",
      "Fast delivery"
    ],
    correctAnswer: "Inability to physically check items",
    explanation: "The passage mentions this as the main drawback."
  },
  {
    id: "tcs_read_08",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Robotics is increasingly used in healthcare for assisting surgeries and automating routine tasks. While it improves accuracy, it also raises concerns about cost and technical failures.\n\nWhich is an advantage mentioned?",
    options: [
      "Higher cost",
      "Technical failure",
      "Improved accuracy",
      "Reduced innovation"
    ],
    correctAnswer: "Improved accuracy",
    explanation: "The passage states robotics improves precision in healthcare."
  },
  {
    id: "tcs_read_09",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Social media platforms allow people to connect globally. However, excessive use may affect productivity and mental well-being.\n\nWhat is the negative effect mentioned?",
    options: [
      "Global connectivity",
      "Better communication",
      "High productivity",
      "Reduced productivity and mental issues"
    ],
    correctAnswer: "Reduced productivity and mental issues",
    explanation: "The passage clearly states excessive use impacts productivity and mental health."
  },
  {
    id: "tcs_read_10",
    company: "tcs",
    round: "aptitude",
    type: "reading_comprehension",
    question: "Passage: Artificial Intelligence is transforming industries by enabling faster decision-making. Yet, it cannot replace human judgment in emotional or ethical situations.\n\nWhich task is AI NOT suitable for?",
    options: ["Fast data processing", "Ethical decision-making", "Pattern recognition", "Automation"],
    correctAnswer: "Ethical decision-making",
    explanation: "The passage mentions AI cannot handle emotional or ethical judgments."
  }
]


