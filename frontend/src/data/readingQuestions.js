// src/data/readingQuestions.js

export const readingQuestions = [
  // --------------- WIPRO PASSAGE ----------------
  {
    id: 'rcq1',
    company: 'wipro',
    round: 'communication',
    passage: `Artificial intelligence (AI) is rapidly transforming various aspects of our lives, from healthcare to entertainment. While offering immense potential for progress and efficiency, its rapid development also raises critical ethical questions. One primary concern is job displacement, as AI-powered automation could render many traditional roles obsolete. Another significant issue is algorithmic bias, where AI systems, trained on flawed or incomplete data, can perpetuate and even amplify societal inequalities. Furthermore, the question of accountability arises: who is responsible when an autonomous AI system makes a critical error? Addressing these challenges requires careful consideration, robust regulatory frameworks, and a multidisciplinary approach involving technologists, ethicists, policymakers, and the public to ensure AI develops in a way that benefits all of humanity.`,
    questions: [
      {
        qId: 'q1',
        questionText: "According to the passage, what is one primary concern regarding AI's rapid development?",
        options: [
          "Its inability to process large datasets.",
          "The potential for job displacement.",
          "Lack of innovation in new technologies.",
          "The high cost of AI implementation.",
        ],
        correctAnswer: "The potential for job displacement.",
      },
      {
        qId: 'q2',
        questionText: "What can lead to algorithmic bias in AI systems?",
        options: [
          "Lack of computational power.",
          "Training on flawed or incomplete data.",
          "Excessive human intervention.",
          "Slow processing speeds.",
        ],
        correctAnswer: "Training on flawed or incomplete data.",
      },
      {
        qId: 'q3',
        questionText: "Who does the author suggest should be involved in addressing AI challenges?",
        options: [
          "Only software engineers.",
          "Technologists, ethicists, policymakers, and the public.",
          "Government regulators alone.",
          "Private companies only.",
        ],
        correctAnswer: "Technologists, ethicists, policymakers, and the public.",
      },
      {
        qId: 'q4',
        questionText: "The tone of the passage can best be described as:",
        options: [
          "Cautionary and analytical.",
          "Emotional and biased.",
          "Casual and humorous.",
          "Indifferent and neutral.",
        ],
        correctAnswer: "Cautionary and analytical.",
      },
    ],
  },

  // --------------- INFOSYS PASSAGE ----------------
  {
    id: 'rcq2',
    company: 'infosys',
    round: 'communication',
    passage: `Remote work has become one of the most significant transformations in the modern workplace. Enabled by high-speed internet and digital collaboration tools, employees can now contribute from anywhere in the world. While this flexibility has improved work-life balance for many, it has also blurred the line between personal and professional life. Moreover, organizations face challenges in maintaining productivity, collaboration, and company culture when teams are dispersed. The future of work will likely involve a hybrid model, combining the advantages of remote flexibility with the benefits of in-person interaction.`,
    questions: [
      {
        qId: 'q1',
        questionText: "What has enabled the rise of remote work according to the passage?",
        options: [
          "Decline in office spaces.",
          "High-speed internet and collaboration tools.",
          "Increased corporate layoffs.",
          "Lack of commuting options.",
        ],
        correctAnswer: "High-speed internet and collaboration tools.",
      },
      {
        qId: 'q2',
        questionText: "What is one challenge organizations face with remote teams?",
        options: [
          "Higher rent costs.",
          "Difficulty maintaining collaboration and culture.",
          "Decreased technological dependency.",
          "Too much in-person interaction.",
        ],
        correctAnswer: "Difficulty maintaining collaboration and culture.",
      },
      {
        qId: 'q3',
        questionText: "The author predicts the future of work will involve:",
        options: [
          "Completely remote teams.",
          "Traditional office-based setups.",
          "Hybrid models combining both remote and in-person work.",
          "Elimination of remote work entirely.",
        ],
        correctAnswer: "Hybrid models combining both remote and in-person work.",
      },
    ],
  },

  // --------------- TCS PASSAGE ----------------
  {
    id: 'rcq3',
    company: 'tcs',
    round: 'communication',
    passage: `Climate change has emerged as one of the most pressing global challenges of the 21st century. Rising sea levels, unpredictable weather patterns, and extreme temperature variations are affecting millions worldwide. Governments, corporations, and individuals must act collectively to reduce carbon emissions and promote sustainable practices. While technological advancements in renewable energy are promising, real progress requires behavioral change and political will at a global scale.`,
    questions: [
      {
        qId: 'q1',
        questionText: "Which of the following is NOT mentioned as a consequence of climate change?",
        options: [
          "Rising sea levels.",
          "Extreme weather conditions.",
          "Improved agricultural productivity.",
          "Temperature fluctuations.",
        ],
        correctAnswer: "Improved agricultural productivity.",
      },
      {
        qId: 'q2',
        questionText: "What does the author suggest is necessary for real progress?",
        options: [
          "Government policies alone.",
          "Technological advancement only.",
          "Behavioral change and global cooperation.",
          "Corporate funding for renewable energy.",
        ],
        correctAnswer: "Behavioral change and global cooperation.",
      },
      {
        qId: 'q3',
        questionText: "What is the tone of the passage?",
        options: [
          "Urgent and persuasive.",
          "Indifferent and skeptical.",
          "Humorous and casual.",
          "Technical and scientific.",
        ],
        correctAnswer: "Urgent and persuasive.",
      },
    ],
  },

  // --------------- ACCENTURE PASSAGE ----------------
  {
    id: 'rcq4',
    company: 'accenture',
    round: 'communication',
    passage: `Cybersecurity threats have become increasingly sophisticated, targeting not only large corporations but also small businesses and individuals. Phishing, ransomware, and data breaches have highlighted the importance of digital vigilance. Many organizations are investing heavily in employee training and secure infrastructure to combat these threats. However, cybersecurity is not merely a technical issue — it requires awareness, ethics, and responsibility from every user connected to the digital ecosystem.`,
    questions: [
      {
        qId: 'q1',
        questionText: "Which of the following is NOT mentioned as a type of cybersecurity threat?",
        options: [
          "Phishing.",
          "Ransomware.",
          "Data breaches.",
          "Identity theft.",
        ],
        correctAnswer: "Identity theft.",
      },
      {
        qId: 'q2',
        questionText: "What are organizations doing to address cybersecurity issues?",
        options: [
          "Hiring only technical experts.",
          "Investing in training and secure infrastructure.",
          "Eliminating all digital tools.",
          "Outsourcing all operations.",
        ],
        correctAnswer: "Investing in training and secure infrastructure.",
      },
      {
        qId: 'q3',
        questionText: "According to the passage, cybersecurity requires:",
        options: [
          "Only government policies.",
          "Technical skills and ethical responsibility.",
          "Physical security systems.",
          "Financial investment alone.",
        ],
        correctAnswer: "Technical skills and ethical responsibility.",
      },
    ],
  },

  // --------------- COGNIZANT PASSAGE ----------------
  {
    id: 'rcq5',
    company: 'cognizant',
    round: 'communication',
    passage: `Emotional intelligence (EI) refers to the ability to recognize, understand, and manage our own emotions, as well as to recognize and influence the emotions of others. In the workplace, EI plays a crucial role in leadership, teamwork, and conflict resolution. Unlike technical skills, emotional intelligence is not easily measurable but is often what differentiates effective leaders from average ones. Cultivating EI involves self-awareness, empathy, and consistent reflection on personal behavior.`,
    questions: [
      {
        qId: 'q1',
        questionText: "What does Emotional Intelligence primarily involve?",
        options: [
          "Analyzing data efficiently.",
          "Recognizing and managing emotions.",
          "Improving technical skills.",
          "Enhancing physical fitness.",
        ],
        correctAnswer: "Recognizing and managing emotions.",
      },
      {
        qId: 'q2',
        questionText: "According to the passage, what differentiates effective leaders from average ones?",
        options: [
          "Experience and age.",
          "Technical expertise.",
          "High emotional intelligence.",
          "Strictness and control.",
        ],
        correctAnswer: "High emotional intelligence.",
      },
      {
        qId: 'q3',
        questionText: "Which of the following is NOT a component of Emotional Intelligence as per the passage?",
        options: [
          "Self-awareness.",
          "Empathy.",
          "Consistent reflection.",
          "Physical strength.",
        ],
        correctAnswer: "Physical strength.",
      },
    ],
  },
];
