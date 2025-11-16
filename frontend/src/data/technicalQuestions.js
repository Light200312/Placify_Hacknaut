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
 ,
 // src/data/technicalQuestions.js

  // ----------------------------------------------------
  //                     TCS TECHNICAL
  // ----------------------------------------------------

  {
    id: 'tcs_tq1',
    company: 'tcs',
    round: 'technical',
    title: "Reverse a Number",
    problem: "Given an integer, reverse the digits of the number without converting it to a string.",
    exampleInput: "1234",
    exampleOutput: "4321",
    testCases: [
      { input: "987", expectedOutput: "789" },
      { input: "5600", expectedOutput: "65" }
    ],
    starterCode: {
      javascript: `function reverseNumber(n) {
  // Write your logic here
}`,
      python: `def reverse_number(n):
    # Write your logic here
`,
      java: `class Solution {
    public int reverseNumber(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq2',
    company: 'tcs',
    round: 'technical',
    title: "Sum of Digits",
    problem: "Write a function to compute the sum of digits of a given number.",
    exampleInput: "567",
    exampleOutput: "18",
    testCases: [
      { input: "1234", expectedOutput: "10" },
      { input: "9999", expectedOutput: "36" }
    ],
    starterCode: {
      javascript: `function sumDigits(n) {
  // Write your logic here
}`,
      python: `def sum_digits(n):
    # Write your logic here
`,
      java: `class Solution {
    public int sumDigits(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq3',
    company: 'tcs',
    round: 'technical',
    title: "Check Prime Number",
    problem: "Determine whether a number is prime or not.",
    exampleInput: "11",
    exampleOutput: "True",
    testCases: [
      { input: "15", expectedOutput: "False" },
      { input: "29", expectedOutput: "True" }
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
    id: 'tcs_tq4',
    company: 'tcs',
    round: 'technical',
    title: "Fibonacci Number",
    problem: "Return the nth Fibonacci number (0-indexed).",
    exampleInput: "5",
    exampleOutput: "5",
    testCases: [
      { input: "7", expectedOutput: "13" },
      { input: "10", expectedOutput: "55" }
    ],
    starterCode: {
      javascript: `function fibonacci(n) {
  // Write your logic here
}`,
      python: `def fibonacci(n):
    # Write your logic here
`,
      java: `class Solution {
    public int fibonacci(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq5',
    company: 'tcs',
    round: 'technical',
    title: "Count Vowels in a String",
    problem: "Write a program to count the total number of vowels in a string.",
    exampleInput: "education",
    exampleOutput: "5",
    testCases: [
      { input: "tcs", expectedOutput: "0" },
      { input: "hello", expectedOutput: "2" }
    ],
    starterCode: {
      javascript: `function countVowels(s) {
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
    id: 'tcs_tq6',
    company: 'tcs',
    round: 'technical',
    title: "Armstrong Number Check",
    problem: "Determine whether a given number is an Armstrong number.",
    exampleInput: "153",
    exampleOutput: "True",
    testCases: [
      { input: "370", expectedOutput: "True" },
      { input: "125", expectedOutput: "False" }
    ],
    starterCode: {
      javascript: `function isArmstrong(n) {
  // Write your logic here
}`,
      python: `def is_armstrong(n):
    # Write your logic here
`,
      java: `class Solution {
    public boolean isArmstrong(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq7',
    company: 'tcs',
    round: 'technical',
    title: "Find Missing Number (0 to n)",
    problem: "Given an array containing n distinct numbers from 0..n, find the missing number.",
    exampleInput: "[3,0,1]",
    exampleOutput: "2",
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "0" },
      { input: "[0,1]", expectedOutput: "2" }
    ],
    starterCode: {
      javascript: `function findMissing(nums) {
  // Write your logic here
}`,
      python: `def find_missing(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int findMissing(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq8',
    company: 'tcs',
    round: 'technical',
    title: "Find Second Largest Number",
    problem: "Return the second largest unique number in an array.",
    exampleInput: "[10, 20, 4, 45, 99]",
    exampleOutput: "45",
    testCases: [
      { input: "[3,1,2]", expectedOutput: "2" },
      { input: "[7,7,7]", expectedOutput: "None" }
    ],
    starterCode: {
      javascript: `function secondLargest(nums) {
  // Write your logic here
}`,
      python: `def second_largest(nums):
    # Write your logic here
`,
      java: `class Solution {
    public Integer secondLargest(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq9',
    company: 'tcs',
    round: 'technical',
    title: "Factorial of a Number",
    problem: "Compute factorial of a number using iteration.",
    exampleInput: "5",
    exampleOutput: "120",
    testCases: [
      { input: "3", expectedOutput: "6" },
      { input: "7", expectedOutput: "5040" }
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
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq10',
    company: 'tcs',
    round: 'technical',
    title: "Check Palindrome String",
    problem: "Return True if a string is palindrome.",
    exampleInput: "level",
    exampleOutput: "True",
    testCases: [
      { input: "madam", expectedOutput: "True" },
      { input: "apple", expectedOutput: "False" }
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

  // ----------------------------------------------------
  //    Below are remaining 30 TCS Questions (11–40)
  // ----------------------------------------------------

  {
    id: 'tcs_tq11',
    company: 'tcs',
    round: 'technical',
    title: "GCD of Two Numbers",
    problem: "Find the greatest common divisor (GCD) of two numbers.",
    exampleInput: "12 18",
    exampleOutput: "6",
    testCases: [
      { input: "7 13", expectedOutput: "1" },
      { input: "100 80", expectedOutput: "20" }
    ],
    starterCode: {
      javascript: `function gcd(a, b) {
  // Write your logic here
}`,
      python: `def gcd(a, b):
    # Write your logic here
`,
      java: `class Solution {
    public int gcd(int a, int b) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq12',
    company: 'tcs',
    round: 'technical',
    title: "LCM of Two Numbers",
    problem: "Calculate the LCM of two integers.",
    exampleInput: "4 6",
    exampleOutput: "12",
    testCases: [
      { input: "3 5", expectedOutput: "15" },
      { input: "10 20", expectedOutput: "20" }
    ],
    starterCode: {
      javascript: `function lcm(a, b) {
  // Write your logic here
}`,
      python: `def lcm(a, b):
    # Write your logic here
`,
      java: `class Solution {
    public int lcm(int a, int b) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq13',
    company: 'tcs',
    round: 'technical',
    title: "Count Words in a Sentence",
    problem: "Return the number of words in a sentence (split by spaces).",
    exampleInput: "TCS interview round",
    exampleOutput: "3",
    testCases: [
      { input: "hello world", expectedOutput: "2" },
      { input: "a b c d", expectedOutput: "4" }
    ],
    starterCode: {
      javascript: `function countWords(s) {
  // Write your logic here
}`,
      python: `def count_words(s):
    # Write your logic here
`,
      java: `class Solution {
    public int countWords(String s) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq14',
    company: 'tcs',
    round: 'technical',
    title: "Remove Duplicates from Array",
    problem: "Return a new array without duplicates.",
    exampleInput: "[1,2,2,3,4,4]",
    exampleOutput: "[1,2,3,4]",
    testCases: [
      { input: "[5,5,5]", expectedOutput: "[5]" },
      { input: "[1,2,3]", expectedOutput: "[1,2,3]" }
    ],
    starterCode: {
      javascript: `function removeDuplicates(nums) {
  // Write your logic here
}`,
      python: `def remove_duplicates(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int[] removeDuplicates(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq15',
    company: 'tcs',
    round: 'technical',
    title: "Find Frequency of Characters",
    problem: "Return a dictionary of character frequencies.",
    exampleInput: "banana",
    exampleOutput: "{b:1, a:3, n:2}",
    testCases: [
      { input: "apple", expectedOutput: "{a:1, p:2, l:1, e:1}" },
      { input: "aaa", expectedOutput: "{a:3}" }
    ],
    starterCode: {
      javascript: `function charFrequency(s) {
  // Write your logic here
}`,
      python: `def char_frequency(s):
    # Write your logic here
`,
      java: `class Solution {
    public Map<Character, Integer> charFrequency(String s) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq16',
    company: 'tcs',
    round: 'technical',
    title: "Binary to Decimal",
    problem: "Convert a binary string to decimal.",
    exampleInput: "1010",
    exampleOutput: "10",
    testCases: [
      { input: "111", expectedOutput: "7" },
      { input: "1001", expectedOutput: "9" }
    ],
    starterCode: {
      javascript: `function binaryToDecimal(b) {
  // Write your logic here
}`,
      python: `def binary_to_decimal(b):
    # Write your logic here
`,
      java: `class Solution {
    public int binaryToDecimal(String b) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq17',
    company: 'tcs',
    round: 'technical',
    title: "Decimal to Binary",
    problem: "Convert a decimal number to binary string.",
    exampleInput: "10",
    exampleOutput: "1010",
    testCases: [
      { input: "5", expectedOutput: "101" },
      { input: "8", expectedOutput: "1000" }
    ],
    starterCode: {
      javascript: `function decimalToBinary(n) {
  // Write your logic here
}`,
      python: `def decimal_to_binary(n):
    # Write your logic here
`,
      java: `class Solution {
    public String decimalToBinary(int n) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq18',
    company: 'tcs',
    round: 'technical',
    title: "Rotate Array Right",
    problem: "Rotate an array k steps to the right.",
    exampleInput: "[1,2,3,4,5], k=2",
    exampleOutput: "[4,5,1,2,3]",
    testCases: [
      { input: "[1,2], k=3", expectedOutput: "[2,1]" },
      { input: "[10,20,30], k=1", expectedOutput: "[30,10,20]" }
    ],
    starterCode: {
      javascript: `function rotateRight(nums, k) {
  // Write your logic here
}`,
      python: `def rotate_right(nums, k):
    # Write your logic here
`,
      java: `class Solution {
    public int[] rotateRight(int[] nums, int k) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },

  {
    id: 'tcs_tq19',
    company: 'tcs',
    round: 'technical',
    title: "Sum of Array Elements",
    problem: "Return the total sum of elements in an array.",
    exampleInput: "[1,2,3]",
    exampleOutput: "6",
    testCases: [
      { input: "[10,20,30]", expectedOutput: "60" },
      { input: "[5]", expectedOutput: "5" }
    ],
    starterCode: {
      javascript: `function arraySum(nums) {
  // Write your logic here
}`,
      python: `def array_sum(nums):
    # Write your logic here
`,
      java: `class Solution {
    public int arraySum(int[] nums) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Easy",
  },

  {
    id: 'tcs_tq20',
    company: 'tcs',
    round: 'technical',
    title: "Check Anagram",
    problem: "Check whether two strings are anagrams.",
    exampleInput: "listen, silent",
    exampleOutput: "True",
    testCases: [
      { input: "rat, car", expectedOutput: "False" },
      { input: "triangle, integral", expectedOutput: "True" }
    ],
    starterCode: {
      javascript: `function isAnagram(a, b) {
  // Write your logic here
}`,
      python: `def is_anagram(a, b):
    # Write your logic here
`,
      java: `class Solution {
    public boolean isAnagram(String a, String b) {
        // Write your logic here
    }
}`,
    },
    difficulty: "Medium",
  },
  // =======================
//   TCS TECHNICAL Q21
// =======================
{
  id: 'tcq21',
  company: 'tcs',
  round: 'technical',
  title: "Sum of Even Numbers in an Array",
  problem: "Given an array of integers, return the sum of all even numbers.",
  exampleInput: "[1,2,3,4,5,6]",
  exampleOutput: "12",
  testCases: [
    { input: "[10,11,12]", expectedOutput: "22" },
    { input: "[7,3,5]", expectedOutput: "0" }
  ],
  starterCode: {
    javascript: `function sumEven(nums) {
  // Write your logic here
}`,
    python: `def sum_even(nums):
    # Write your logic here
`,
    java: `class Solution {
    public int sumEven(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q22
// =======================
{
  id: 'tcq22',
  company: 'tcs',
  round: 'technical',
  title: "Remove Duplicates from Array",
  problem: "Given an array, return a new array with duplicates removed.",
  exampleInput: "[1,2,2,3,4,4]",
  exampleOutput: "[1,2,3,4]",
  testCases: [
    { input: "[5,5,5,5]", expectedOutput: "[5]" },
    { input: "[1,2,3]", expectedOutput: "[1,2,3]" }
  ],
  starterCode: {
    javascript: `function removeDuplicates(nums) {
  // Write your logic here
}`,
    python: `def remove_duplicates(nums):
    # Write your logic here
`,
    java: `class Solution {
    public int[] removeDuplicates(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q23
// =======================
{
  id: 'tcq23',
  company: 'tcs',
  round: 'technical',
  title: "Check Armstrong Number",
  problem: "Check if a number is Armstrong. (Sum of cubes of digits equals number)",
  exampleInput: "153",
  exampleOutput: "True",
  testCases: [
    { input: "370", expectedOutput: "True" },
    { input: "123", expectedOutput: "False" }
  ],
  starterCode: {
    javascript: `function isArmstrong(n) {
  // Write your logic here
}`,
    python: `def is_armstrong(n):
    # Write your logic here
`,
    java: `class Solution {
    public boolean isArmstrong(int n) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q24
// =======================
{
  id: 'tcq24',
  company: 'tcs',
  round: 'technical',
  title: "Find Index of First Occurrence",
  problem: "Given an array and a target number, return the index of first occurrence or -1.",
  exampleInput: "nums=[1,2,3,2], target=2",
  exampleOutput: "1",
  testCases: [
    { input: "nums=[5,6,7], target=4", expectedOutput: "-1" },
    { input: "nums=[1,1,1], target=1", expectedOutput: "0" }
  ],
  starterCode: {
    javascript: `function firstOccurrence(nums, target) {
  // Write your logic here
}`,
    python: `def first_occurrence(nums, target):
    # Write your logic here
`,
    java: `class Solution {
    public int firstOccurrence(int[] nums, int target) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q25
// =======================
{
  id: 'tcq25',
  company: 'tcs',
  round: 'technical',
  title: "Sort Array Without Using Sort Function",
  problem: "Sort the array in ascending order without using built-in sort.",
  exampleInput: "[5,3,8,1]",
  exampleOutput: "[1,3,5,8]",
  testCases: [
    { input: "[9,7,5]", expectedOutput: "[5,7,9]" },
    { input: "[1]", expectedOutput: "[1]" }
  ],
  starterCode: {
    javascript: `function sortArray(nums) {
  // Write your logic here
}`,
    python: `def sort_array(nums):
    # Write your logic here
`,
    java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q26
// =======================
{
  id: 'tcq26',
  company: 'tcs',
  round: 'technical',
  title: "Count Consonants in a String",
  problem: "Count and return the number of consonants in the string.",
  exampleInput: "hello",
  exampleOutput: "3",
  testCases: [
    { input: "aeiou", expectedOutput: "0" },
    { input: "sky", expectedOutput: "3" }
  ],
  starterCode: {
    javascript: `function countConsonants(str) {
  // Write your logic here
}`,
    python: `def count_consonants(s):
    # Write your logic here
`,
    java: `class Solution {
    public int countConsonants(String s) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q27
// =======================
{
  id: 'tcq27',
  company: 'tcs',
  round: 'technical',
  title: "Check Anagram",
  problem: "Given two strings, determine if they are anagrams.",
  exampleInput: "listen, silent",
  exampleOutput: "True",
  testCases: [
    { input: "race, care", expectedOutput: "True" },
    { input: "hello, world", expectedOutput: "False" }
  ],
  starterCode: {
    javascript: `function isAnagram(a, b) {
  // Write your logic here
}`,
    python: `def is_anagram(a, b):
    # Write your logic here
`,
    java: `class Solution {
    public boolean isAnagram(String a, String b) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q28
// =======================
{
  id: 'tcq28',
  company: 'tcs',
  round: 'technical',
  title: "Find GCD of Two Numbers",
  problem: "Compute and return the greatest common divisor (GCD) of two numbers.",
  exampleInput: "a=12, b=18",
  exampleOutput: "6",
  testCases: [
    { input: "a=7, b=3", expectedOutput: "1" },
    { input: "a=20, b=100", expectedOutput: "20" }
  ],
  starterCode: {
    javascript: `function gcd(a, b) {
  // Write your logic here
}`,
    python: `def gcd(a, b):
    # Write your logic here
`,
    java: `class Solution {
    public int gcd(int a, int b) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q29
// =======================
{
  id: 'tcq29',
  company: 'tcs',
  round: 'technical',
  title: "Move All Zeros to End",
  problem: "Given an array, move all zeroes to the end while maintaining order.",
  exampleInput: "[0,1,0,3,12]",
  exampleOutput: "[1,3,12,0,0]",
  testCases: [
    { input: "[0,0,1]", expectedOutput: "[1,0,0]" },
    { input: "[1,2,3]", expectedOutput: "[1,2,3]" }
  ],
  starterCode: {
    javascript: `function moveZeros(nums) {
  // Write your logic here
}`,
    python: `def move_zeros(nums):
    # Write your logic here
`,
    java: `class Solution {
    public int[] moveZeros(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q30
// =======================
{
  id: 'tcq30',
  company: 'tcs',
  round: 'technical',
  title: "Binary to Decimal Conversion",
  problem: "Convert a binary string to its decimal value.",
  exampleInput: "1010",
  exampleOutput: "10",
  testCases: [
    { input: "1111", expectedOutput: "15" },
    { input: "100", expectedOutput: "4" }
  ],
  starterCode: {
    javascript: `function binaryToDecimal(s) {
  // Write your logic here
}`,
    python: `def binary_to_decimal(s):
    # Write your logic here
`,
    java: `class Solution {
    public int binaryToDecimal(String s) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q31
// =======================
{
  id: 'tcq31',
  company: 'tcs',
  round: 'technical',
  title: "Decimal to Binary Conversion",
  problem: "Convert a decimal number to binary string.",
  exampleInput: "10",
  exampleOutput: "1010",
  testCases: [
    { input: "7", expectedOutput: "111" },
    { input: "4", expectedOutput: "100" }
  ],
  starterCode: {
    javascript: `function decimalToBinary(n) {
  // Write your logic here
}`,
    python: `def decimal_to_binary(n):
    # Write your logic here
`,
    java: `class Solution {
    public String decimalToBinary(int n) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q32
// =======================
{
  id: 'tcq32',
  company: 'tcs',
  round: 'technical',
  title: "Sum of First N Natural Numbers",
  problem: "Given n, return the sum of first n natural numbers.",
  exampleInput: "5",
  exampleOutput: "15",
  testCases: [
    { input: "10", expectedOutput: "55" },
    { input: "1", expectedOutput: "1" }
  ],
  starterCode: {
    javascript: `function sumNatural(n) {
  // Write your logic here
}`,
    python: `def sum_natural(n):
    # Write your logic here
`,
    java: `class Solution {
    public int sumNatural(int n) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q33
// =======================
{
  id: 'tcq33',
  company: 'tcs',
  round: 'technical',
  title: "Find Maximum Occurring Character",
  problem: "Return the character that appears the most times in a string.",
  exampleInput: "banana",
  exampleOutput: "a",
  testCases: [
    { input: "hello", expectedOutput: "l" },
    { input: "aabbc", expectedOutput: "a" }
  ],
  starterCode: {
    javascript: `function maxChar(str) {
  // Write your logic here
}`,
    python: `def max_char(s):
    # Write your logic here
`,
    java: `class Solution {
    public char maxChar(String s) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q34
// =======================
{
  id: 'tcq34',
  company: 'tcs',
  round: 'technical',
  title: "Sum of Digits Until Single Digit (Digital Root)",
  problem: "Reduce a number to a single digit by repeatedly summing its digits.",
  exampleInput: "9875",
  exampleOutput: "2",
  testCases: [
    { input: "38", expectedOutput: "2" },
    { input: "9999", expectedOutput: "9" }
  ],
  starterCode: {
    javascript: `function digitalRoot(n) {
  // Write your logic here
}`,
    python: `def digital_root(n):
    # Write your logic here
`,
    java: `class Solution {
    public int digitalRoot(int n) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q35
// =======================
{
  id: 'tcq35',
  company: 'tcs',
  round: 'technical',
  title: "Find All Factors of a Number",
  problem: "Return all factors of a number in ascending order.",
  exampleInput: "12",
  exampleOutput: "[1,2,3,4,6,12]",
  testCases: [
    { input: "7", expectedOutput: "[1,7]" },
    { input: "15", expectedOutput: "[1,3,5,15]" }
  ],
  starterCode: {
    javascript: `function findFactors(n) {
  // Write your logic here
}`,
    python: `def find_factors(n):
    # Write your logic here
`,
    java: `class Solution {
    public int[] findFactors(int n) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q36
// =======================
{
  id: 'tcq36',
  company: 'tcs',
  round: 'technical',
  title: "Check if Array is Sorted",
  problem: "Return true if the array is sorted in non-decreasing order.",
  exampleInput: "[1,2,2,3]",
  exampleOutput: "True",
  testCases: [
    { input: "[3,2,1]", expectedOutput: "False" },
    { input: "[5,5,5]", expectedOutput: "True" }
  ],
  starterCode: {
    javascript: `function isSorted(nums) {
  // Write your logic here
}`,
    python: `def is_sorted(nums):
    # Write your logic here
`,
    java: `class Solution {
    public boolean isSorted(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q37
// =======================
{
  id: 'tcq37',
  company: 'tcs',
  round: 'technical',
  title: "Count Words in a Sentence",
  problem: "Return the number of words separated by spaces.",
  exampleInput: "Hello world",
  exampleOutput: "2",
  testCases: [
    { input: "This is TCS exam", expectedOutput: "4" },
    { input: "Hi", expectedOutput: "1" }
  ],
  starterCode: {
    javascript: `function countWords(s) {
  // Write your logic here
}`,
    python: `def count_words(s):
    # Write your logic here
`,
    java: `class Solution {
    public int countWords(String s) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},

// =======================
//   TCS TECHNICAL Q38
// =======================
{
  id: 'tcq38',
  company: 'tcs',
  round: 'technical',
  title: "Count Frequency of Each Element",
  problem: "Return a mapping of element → frequency in an array.",
  exampleInput: "[1,2,2,3]",
  exampleOutput: "{1:1,2:2,3:1}",
  testCases: [
    { input: "[5,5,5]", expectedOutput: "{5:3}" },
    { input: "[1,2,3]", expectedOutput: "{1:1,2:1,3:1}" }
  ],
  starterCode: {
    javascript: `function frequencyMap(nums) {
  // Write your logic here
}`,
    python: `def frequency_map(nums):
    # Write your logic here
`,
    java: `class Solution {
    public Map<Integer, Integer> frequencyMap(int[] nums) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q39
// =======================
{
  id: 'tcq39',
  company: 'tcs',
  round: 'technical',
  title: "Find Intersection of Two Arrays",
  problem: "Return the common elements between two arrays.",
  exampleInput: "[1,2,3], [2,3,4]",
  exampleOutput: "[2,3]",
  testCases: [
    { input: "[5,6],[7,8]", expectedOutput: "[]" },
    { input: "[3,4,5],[5,6,7]", expectedOutput: "[5]" }
  ],
  starterCode: {
    javascript: `function intersection(a, b) {
  // Write your logic here
}`,
    python: `def intersection(a, b):
    # Write your logic here
`,
    java: `class Solution {
    public int[] intersection(int[] a, int[] b) {
        // Write your logic here
    }
}`
  },
  difficulty: "Medium",
},

// =======================
//   TCS TECHNICAL Q40
// =======================
{
  id: 'tcq40',
  company: 'tcs',
  round: 'technical',
  title: "Longest Word in a Sentence",
  problem: "Return the longest word from a sentence.",
  exampleInput: "I love programming",
  exampleOutput: "programming",
  testCases: [
    { input: "TCS exam preparation", expectedOutput: "preparation" },
    { input: "Hi hello", expectedOutput: "hello" }
  ],
  starterCode: {
    javascript: `function longestWord(s) {
  // Write your logic here
}`,
    python: `def longest_word(s):
    # Write your logic here
`,
    java: `class Solution {
    public String longestWord(String s) {
        // Write your logic here
    }
}`
  },
  difficulty: "Easy",
},




 
 
];
