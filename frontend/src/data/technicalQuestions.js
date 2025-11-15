// src/data/technicalQuestions.js
export const technicalQuestions = [
  {
    id: 'tcq1',
    company: 'infosys',
    round: 'technical',
    title: "Reverse a String",
    problem: "Write a function that takes a string as input and returns the string reversed.",
    exampleInput: "hello",
    exampleOutput: "olleh",
    testCases: [
      { input: "world", expectedOutput: "dlrow" },
      { input: "React", expectedOutput: "tcaer" },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your logic here
}`,
      python: `def reverse_string(s):
    # Write your logic here
`,
      java: `class Solution {
    public String reverseString(String s) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcq2',
    company: 'tcs',
    round: 'technical',
    title: "Find the Missing Number",
    problem: "Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.",
    exampleInput: "[3,0,1]",
    exampleOutput: "2",
    testCases: [
      { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8" },
      { input: "[0,1]", expectedOutput: "2" },
    ],
    starterCode: {
      javascript: `function findMissingNumber(nums) {
  // Write your logic here
}`,
      python: `def find_missing_number(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int findMissingNumber(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcq3',
    company: 'wipro',
    round: 'technical',
    title: "Check for Palindrome",
    problem: "Write a program to check whether a given string is a palindrome or not.",
    exampleInput: "madam",
    exampleOutput: "True",
    testCases: [
      { input: "level", expectedOutput: "True" },
      { input: "hello", expectedOutput: "False" },
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your logic here
}`,
      python: `def is_palindrome(s):
    # Write your logic here
`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcq4',
    company: 'accenture',
    round: 'technical',
    title: "Sum of Digits",
    problem: "Write a function to find the sum of digits of a given number.",
    exampleInput: "12345",
    exampleOutput: "15",
    testCases: [
      { input: "987", expectedOutput: "24" },
      { input: "1234", expectedOutput: "10" },
    ],
    starterCode: {
      javascript: `function sumOfDigits(n) {
  // Write your logic here
}`,
      python: `def sum_of_digits(n):
    # Write your logic here
`,
      java: `class Solution {
    public int sumOfDigits(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcq5',
    company: 'cognizant',
    round: 'technical',
    title: "Count Vowels in a String",
    problem: "Write a function to count the number of vowels (a, e, i, o, u) in a given string.",
    exampleInput: "education",
    exampleOutput: "5",
    testCases: [
      { input: "apple", expectedOutput: "2" },
      { input: "sky", expectedOutput: "0" },
    ],
    starterCode: {
      javascript: `function countVowels(str) {
  // Write your logic here
}`,
      python: `def count_vowels(s):
    # Write your logic here
`,
      java: `class Solution {
    public int countVowels(String s) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcq6',
    company: 'infosys',
    round: 'technical',
    title: "Find the Largest Element in an Array",
    problem: "Given an array of integers, find the largest element.",
    exampleInput: "[2, 5, 1, 9, 7]",
    exampleOutput: "9",
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "5" },
      { input: "[10,9,8]", expectedOutput: "10" },
    ],
    starterCode: {
      javascript: `function findLargest(nums) {
  // Write your logic here
}`,
      python: `def find_largest(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int findLargest(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcq7',
    company: 'tcs',
    round: 'technical',
    title: "Fibonacci Series up to N Terms",
    problem: "Generate the Fibonacci series up to n terms and return as an array or list.",
    exampleInput: "5",
    exampleOutput: "[0, 1, 1, 2, 3]",
    testCases: [
      { input: "6", expectedOutput: "[0,1,1,2,3,5]" },
      { input: "3", expectedOutput: "[0,1,1]" },
    ],
    starterCode: {
      javascript: `function fibonacci(n) {
  // Write your logic here
}`,
      python: `def fibonacci(n):
    # Write your logic here
`,
      java: `class Solution {
    public int[] fibonacci(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcq8',
    company: 'accenture',
    round: 'technical',
    title: "Check Prime Number",
    problem: "Write a function to check whether a given number is prime or not.",
    exampleInput: "7",
    exampleOutput: "True",
    testCases: [
      { input: "9", expectedOutput: "False" },
      { input: "13", expectedOutput: "True" },
    ],
    starterCode: {
      javascript: `function isPrime(n) {
  // Write your logic here
}`,
      python: `def is_prime(n):
    # Write your logic here
`,
      java: `class Solution {
    public boolean isPrime(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcq9',
    company: 'wipro',
    round: 'technical',
    title: "Factorial of a Number",
    problem: "Write a function that calculates the factorial of a given number n.",
    exampleInput: "5",
    exampleOutput: "120",
    testCases: [
      { input: "4", expectedOutput: "24" },
      { input: "6", expectedOutput: "720" },
    ],
    starterCode: {
      javascript: `function factorial(n) {
  // Write your logic here
}`,
      python: `def factorial(n):
    # Write your logic here
`,
      java: `class Solution {
    public int factorial(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcq10',
    company: 'cognizant',
    round: 'technical',
    title: "Find Second Largest Element",
    problem: "Write a program to find the second largest number in an array.",
    exampleInput: "[10, 20, 4, 45, 99]",
    exampleOutput: "45",
    testCases: [
      { input: "[3,2,1,5,4]", expectedOutput: "4" },
      { input: "[12,35,1,10,34,1]", expectedOutput: "34" },
    ],
    starterCode: {
      javascript: `function secondLargest(nums) {
  // Write your logic here
}`,
      python: `def second_largest(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int secondLargest(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },
];
