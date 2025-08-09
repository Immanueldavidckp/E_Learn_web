//import React from 'react';

"use client";
import React from "react";

function Basic_electronics() {
  const [currentLesson, setCurrentLesson] = React.useState(0);
  const [showTest, setShowTest] = React.useState(false);
  const [completedLessons, setCompletedLessons] = React.useState(new Set());
  const [testAnswers, setTestAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [testScore, setTestScore] = React.useState(0);

  const lessons = [
    {
      id: 0,
      title: "Introduction to C Programming",
      content: {
        theory:
          "C is a powerful, low-level programming language perfect for embedded systems. It provides direct hardware access and efficient memory management. Developed by Dennis Ritchie in 1972, C has become the foundation for many modern programming languages.",
        codeExample: `#include <stdio.h>

int main() {
    printf("Hello, Embedded World!\\n");
    printf("Welcome to C Programming!\\n");
    return 0;
}`,
        keyPoints: [
          "C is close to hardware level",
          "Efficient memory usage",
          "Direct hardware control",
          "Widely used in embedded systems",
          "Foundation for many other languages",
        ],
      },
      test: {
        questions: [
          {
            question: "Who developed the C programming language?",
            options: [
              "Dennis Ritchie",
              "Bjarne Stroustrup",
              "James Gosling",
              "Guido van Rossum",
            ],
            correct: 0,
          },
          {
            question: "What does #include <stdio.h> do?",
            options: [
              "Defines variables",
              "Includes standard input/output functions",
              "Creates loops",
              "Handles memory",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 1,
      title: "Basic Elements of C",
      content: {
        theory:
          "C programs consist of basic elements like keywords, identifiers, constants, and variables. Understanding these building blocks is essential for writing effective C code for embedded systems.",
        codeExample: `// Keywords: int, char, if, while, etc.
// Identifiers: variable names, function names
int temperature;     // identifier
char status = 'A';   // character constant
const int MAX = 100; // constant identifier

// Comments - single line and multi-line
/* This is a 
   multi-line comment */`,
        keyPoints: [
          "Keywords are reserved words in C",
          "Identifiers name variables and functions",
          "Constants have fixed values",
          "Comments explain code functionality",
          "Case-sensitive language",
        ],
      },
      test: {
        questions: [
          {
            question: "Which of these is a valid identifier in C?",
            options: ["2variable", "int", "_temperature", "char-value"],
            correct: 2,
          },
          {
            question: "How do you write a single-line comment in C?",
            options: [
              "/* comment */",
              "// comment",
              "# comment",
              "<!-- comment -->",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 2,
      title: "Operators in C",
      content: {
        theory:
          "C provides various operators for arithmetic, logical, relational, and bitwise operations. Understanding operator precedence, associativity, and advanced bit manipulation techniques is crucial for embedded programming where efficient calculations and hardware control are common. This comprehensive lesson covers all essential operator concepts with detailed explanations and practical examples.",
        codeExample: `/*
=============================================================================
                    COMPREHENSIVE GUIDE TO OPERATORS IN C
=============================================================================
*/

/*
-----------------------------------------------------------------------------
1. INTRODUCTION OF OPERATORS IN C
-----------------------------------------------------------------------------
Operators are special symbols that perform operations on operands (variables 
and values). C provides a rich set of operators categorized into different types:

Types of Operators:
- Arithmetic Operators: +, -, *, /, %
- Relational Operators: <, >, <=, >=, ==, !=
- Logical Operators: &&, ||, !
- Bitwise Operators: &, |, ^, ~, <<, >>
- Assignment Operators: =, +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=
- Unary Operators: +, -, ++, --, !, ~, sizeof, &, *
- Ternary Operator: ? :
- Comma Operator: ,
*/

#include <stdio.h>

// Arithmetic Operators - Perform mathematical operations
int a = 15, b = 4;
int addition = a + b;        // 19 - Addition
int subtraction = a - b;     // 11 - Subtraction  
int multiplication = a * b;  // 60 - Multiplication
int division = a / b;        // 3 - Integer division (truncated)
int modulus = a % b;         // 3 - Remainder after division

// Relational Operators - Compare two values, return 1 (true) or 0 (false)
int greater = a > b;         // 1 (true) - 15 > 4
int lesser = a < b;          // 0 (false) - 15 < 4
int equal = a == b;          // 0 (false) - 15 == 4
int not_equal = a != b;      // 1 (true) - 15 != 4
int greater_equal = a >= b;  // 1 (true) - 15 >= 4
int lesser_equal = a <= b;   // 0 (false) - 15 <= 4

// Logical Operators - Perform logical operations
int logical_and = (a > 10) && (b < 10);  // 1 - Both conditions true
int logical_or = (a > 20) || (b < 10);   // 1 - At least one condition true
int logical_not = !(a > 20);             // 1 - Negation of false condition

// Bitwise Operators - Work on individual bits
int bitwise_and = a & b;     // 0 - 1111 & 0100 = 0100 = 4
int bitwise_or = a | b;      // 15 - 1111 | 0100 = 1111 = 15
int bitwise_xor = a ^ b;     // 11 - 1111 ^ 0100 = 1011 = 11
int bitwise_not = ~a;        // -16 - One's complement of 15
int left_shift = a << 2;     // 60 - 15 shifted left by 2 positions
int right_shift = a >> 2;    // 3 - 15 shifted right by 2 positions

/*
-----------------------------------------------------------------------------
2. OPERATORS PRECEDENCE AND ASSOCIATIVITY IN C
-----------------------------------------------------------------------------
Operator precedence determines the order in which operators are evaluated in 
an expression. Higher precedence operators are evaluated first.

Associativity determines the order of evaluation when operators have the same 
precedence level.

PRECEDENCE TABLE (Highest to Lowest):
1. () [] -> .                    (Left to Right)
2. ! ~ ++ -- + - * & (type) sizeof  (Right to Left)
3. * / %                         (Left to Right)
4. + -                           (Left to Right)
5. << >>                         (Left to Right)
6. < <= > >=                     (Left to Right)
7. == !=                         (Left to Right)
8. &                             (Left to Right)
9. ^                             (Left to Right)
10. |                            (Left to Right)
11. &&                           (Left to Right)
12. ||                           (Left to Right)
13. ?:                           (Right to Left)
14. = += -= *= /= %= &= |= ^= <<= >>= (Right to Left)
15. ,                            (Left to Right)
*/

// Examples of Precedence and Associativity
int x = 10, y = 5, z = 2;

// Precedence Example 1: * has higher precedence than +
int result1 = x + y * z;        // 20, not 30 (evaluated as x + (y * z))

// Precedence Example 2: Parentheses override precedence
int result2 = (x + y) * z;      // 30 (parentheses force addition first)

// Associativity Example 1: Left-to-right for same precedence
int result3 = x - y - z;        // 3 (evaluated as (x - y) - z)

// Associativity Example 2: Right-to-left for assignment
int p, q, r;
p = q = r = 5;                  // All variables get value 5 (right-to-left)

// Complex Expression Analysis
int complex = x + y * z / 2 - 1; // Step-by-step: y*z=10, 10/2=5, x+5=15, 15-1=14

/*
-----------------------------------------------------------------------------
3. UNDERSTANDING INCREMENT AND DECREMENT OPERATORS
-----------------------------------------------------------------------------
Increment (++) and Decrement (--) operators are unary operators that increase 
or decrease the value of a variable by 1. They can be used in two forms:

PREFIX FORM: ++var or --var (increment/decrement first, then use value)
POSTFIX FORM: var++ or var-- (use current value first, then increment/decrement)

These operators are crucial in loops, array indexing, and pointer arithmetic.
*/

// Increment and Decrement Examples
int counter = 5;

// Pre-increment: Increment first, then use the value
int pre_inc_result = ++counter;  // counter becomes 6, pre_inc_result = 6
printf("After pre-increment: counter=%d, result=%d\\n", counter, pre_inc_result);

// Reset counter
counter = 5;

// Post-increment: Use current value first, then increment
int post_inc_result = counter++; // post_inc_result = 5, then counter becomes 6
printf("After post-increment: counter=%d, result=%d\\n", counter, post_inc_result);

// Pre-decrement and Post-decrement work similarly
counter = 5;
int pre_dec = --counter;         // counter becomes 4, pre_dec = 4
counter = 5;
int post_dec = counter--;        // post_dec = 5, then counter becomes 4

/*
-----------------------------------------------------------------------------
4. PRE-INCREMENT AND POST-INCREMENT IN DETAIL
-----------------------------------------------------------------------------
Understanding the difference between pre and post increment is crucial for 
writing correct C code, especially in complex expressions and loops.

MEMORY PERSPECTIVE:
- Pre-increment: Value is incremented in memory before being used in expression
- Post-increment: Current value is used in expression, then incremented in memory

PERFORMANCE CONSIDERATION:
- For simple variables (int, char, etc.): No significant difference
- For complex objects in C++: Pre-increment can be more efficient
*/

// Detailed Pre vs Post Increment Examples
int arr[5] = {10, 20, 30, 40, 50};
int index = 0;

// Using post-increment in array access
printf("Element at index %d: %d\\n", index, arr[index++]); // Uses index 0, then increments
printf("Next index is now: %d\\n", index); // index is now 1

// Reset index
index = 0;

// Using pre-increment in array access  
printf("Element at index %d: %d\\n", ++index, arr[index]); // Increments to 1, then uses index 1

// Complex expression with mixed increment operators
int m = 5, n = 5;
int complex_expr = ++m + n++ + m + n; // Step by step:
// ++m: m becomes 6, use 6
// n++: use 5, then n becomes 6  
// m: use current value 6
// n: use current value 6
// Result: 6 + 5 + 6 + 6 = 23

/*
-----------------------------------------------------------------------------
5. TOKEN PASTING OPERATOR (##) IN C
-----------------------------------------------------------------------------
The token pasting operator (##) is a preprocessor operator that concatenates 
two tokens into a single token during preprocessing. It's used in macro 
definitions to create new identifiers dynamically.

SYNTAX: token1##token2

USES:
- Creating variable names dynamically
- Generating function names
- Building string literals
- Creating enumeration constants
*/

// Token Pasting Examples
#define CONCAT(a, b) a##b
#define MAKE_VAR(name, num) int name##num
#define MAKE_FUNCTION(type, name) type get##name()

// Using token pasting to create variables
MAKE_VAR(sensor, 1);        // Creates: int sensor1;
MAKE_VAR(sensor, 2);        // Creates: int sensor2;
MAKE_VAR(temperature, 25);  // Creates: int temperature25;

// Using token pasting to create identifiers
int CONCAT(var, 123) = 50;  // Creates: int var123 = 50;
int CONCAT(temp, _sensor) = 25; // Creates: int temp_sensor = 25;

// Advanced token pasting for function generation
#define DECLARE_GETTER(type, name) \\
    type get_##name() { \\
        return name; \\
    }

int temperature = 25;
DECLARE_GETTER(int, temperature) // Creates: int get_temperature() { return temperature; }

// Token pasting with strings (requires additional stringification)
#define STRINGIFY(x) #x
#define PASTE_AND_STRINGIFY(a, b) STRINGIFY(a##b)

/*
-----------------------------------------------------------------------------
6. HOW TO SET, CLEAR, OR TOGGLE A SINGLE BIT
-----------------------------------------------------------------------------
Bit manipulation is fundamental in embedded programming for controlling 
hardware registers, flags, and optimizing memory usage.

BIT OPERATIONS:
- SET BIT: Use OR operator with bit mask (bit |= (1 << position))
- CLEAR BIT: Use AND operator with inverted mask (bit &= ~(1 << position))
- TOGGLE BIT: Use XOR operator with bit mask (bit ^= (1 << position))
- CHECK BIT: Use AND operator with bit mask (if (bit & (1 << position)))
*/

// Bit Manipulation Examples
unsigned char register_value = 0x0F; // Binary: 00001111

printf("Initial value: 0x%02X (Binary: ", register_value);
for(int i = 7; i >= 0; i--) {
    printf("%d", (register_value >> i) & 1);
}
printf(")\\n");

// SET BIT - Turn ON a specific bit
// To set bit 4 (make it 1)
register_value |= (1 << 4);  // OR with 00010000
printf("After setting bit 4: 0x%02X\\n", register_value); // 0x1F (00011111)

// CLEAR BIT - Turn OFF a specific bit  
// To clear bit 2 (make it 0)
register_value &= ~(1 << 2); // AND with 11111011 (inverted 00000100)
printf("After clearing bit 2: 0x%02X\\n", register_value); // 0x1B (00011011)

// TOGGLE BIT - Flip a specific bit
// To toggle bit 1 (flip its current state)
register_value ^= (1 << 1);  // XOR with 00000010
printf("After toggling bit 1: 0x%02X\\n", register_value); // 0x19 (00011001)

// CHECK BIT - Test if a specific bit is set
if (register_value & (1 << 3)) {
    printf("Bit 3 is SET\\n");
} else {
    printf("Bit 3 is CLEAR\\n");
}

// Multiple bit operations
#define SET_BIT(reg, bit)    ((reg) |= (1 << (bit)))
#define CLEAR_BIT(reg, bit)  ((reg) &= ~(1 << (bit)))
#define TOGGLE_BIT(reg, bit) ((reg) ^= (1 << (bit)))
#define CHECK_BIT(reg, bit)  ((reg) & (1 << (bit)))

/*
-----------------------------------------------------------------------------
7. FIVE WAYS TO CHECK IF TWO INTEGERS HAVE OPPOSITE SIGNS
-----------------------------------------------------------------------------
Determining if two integers have opposite signs is a common programming task.
Here are five different approaches with their trade-offs:

METHOD COMPARISON:
1. XOR Method: Fastest, works with sign bit
2. Multiplication: Simple but risk of overflow
3. Addition: Creative but complex logic
4. Bitwise AND: Direct sign bit comparison
5. Direct Comparison: Most readable, multiple conditions
*/

// Five Methods to Check Opposite Signs
int num1 = 15, num2 = -7;  // Positive and negative numbers
printf("Checking if %d and %d have opposite signs:\\n", num1, num2);

// METHOD 1: XOR Method (Most Efficient)
// XOR of two numbers with opposite signs will be negative
// This works because XOR of sign bits will be 1 for opposite signs
if ((num1 ^ num2) < 0) {
    printf("Method 1 (XOR): Numbers have opposite signs\\n");
}
// Time Complexity: O(1), Space: O(1)
// Pros: Fastest, no overflow risk
// Cons: Less readable for beginners

// METHOD 2: Multiplication Method
// Product of numbers with opposite signs is always negative
if ((long long)num1 * num2 < 0) {  // Using long long to prevent overflow
    printf("Method 2 (Multiplication): Numbers have opposite signs\\n");
}
// Time Complexity: O(1), Space: O(1)  
// Pros: Simple logic, easy to understand
// Cons: Risk of integer overflow for large numbers

// METHOD 3: Addition with Comparison
// If signs are opposite, (a+b)*a will have different sign than a*a
if (((long long)num1 + num2) * num1 < (long long)num1 * num1 && num1 != 0) {
    printf("Method 3 (Addition): Numbers have opposite signs\\n");
}
// Time Complexity: O(1), Space: O(1)
// Pros: Creative approach
// Cons: Complex logic, overflow risk, special case for zero

// METHOD 4: Bitwise AND with Sign Bits
// Compare the most significant bits (sign bits) directly
if ((num1 & 0x80000000) != (num2 & 0x80000000)) {
    printf("Method 4 (Bitwise AND): Numbers have opposite signs\\n");
}
// Time Complexity: O(1), Space: O(1)
// Pros: Direct sign bit comparison
// Cons: Assumes 32-bit integers, not portable

// METHOD 5: Direct Comparison (Most Readable)
// Explicitly check all combinations of positive/negative
if ((num1 > 0 && num2 < 0) || (num1 < 0 && num2 > 0)) {
    printf("Method 5 (Direct): Numbers have opposite signs\\n");
}
// Time Complexity: O(1), Space: O(1)
// Pros: Most readable, handles zero correctly
// Cons: Multiple comparisons, slightly slower

/*
-----------------------------------------------------------------------------
8. FIVE WAYS TO REVERSE BITS OF AN INTEGER
-----------------------------------------------------------------------------
Bit reversal is important in digital signal processing, cryptography, and 
embedded systems. Each method has different time/space trade-offs.

COMPLEXITY ANALYSIS:
1. Bit-by-bit: O(log n) time, O(1) space - Simple but slower
2. Lookup Table: O(1) time, O(n) space - Fast but memory intensive  
3. Divide & Conquer: O(log log n) time, O(1) space - Optimal for large numbers
4. Modulo Division: O(log n) time, O(1) space - Alternative approach
5. Recursive: O(log n) time, O(log n) space - Educational value
*/

unsigned int original_number = 12; // Binary: 00000000000000000000000000001100
printf("\\nReversing bits of %u (Binary: 1100):\\n", original_number);

// METHOD 1: Bit-by-bit Reversal
// Check each bit from right to left, set corresponding bit from left to right
unsigned int reversed1 = 0;
unsigned int temp1 = original_number;
for (int i = 0; i < 32; i++) {
    if (temp1 & (1 << i)) {           // If bit i is set in original
        reversed1 |= (1 << (31 - i)); // Set bit (31-i) in result
    }
}
printf("Method 1 (Bit-by-bit): %u\\n", reversed1);

// METHOD 2: Lookup Table Approach (for 8-bit demonstration)
// Pre-computed table for 4-bit values, combine for 8-bit
unsigned char lookup_table[16] = {
    0x0, 0x8, 0x4, 0xC, 0x2, 0xA, 0x6, 0xE,  // 0000->0000, 0001->1000, etc.
    0x1, 0x9, 0x5, 0xD, 0x3, 0xB, 0x7, 0xF   // 1000->0001, 1001->1001, etc.
};
unsigned char byte_to_reverse = (unsigned char)original_number;
unsigned char reversed2 = (lookup_table[byte_to_reverse & 0x0F] << 4) | 
                         lookup_table[byte_to_reverse >> 4];
printf("Method 2 (Lookup Table - 8bit): %u\\n", reversed2);

// METHOD 3: Divide and Conquer (Brian Kernighan's method)
// Swap adjacent bits, then adjacent pairs, then adjacent quads, etc.
unsigned int reversed3 = original_number;
// Swap adjacent single bits
reversed3 = ((reversed3 & 0xAAAAAAAA) >> 1) | ((reversed3 & 0x55555555) << 1);
// Swap adjacent 2-bit groups  
reversed3 = ((reversed3 & 0xCCCCCCCC) >> 2) | ((reversed3 & 0x33333333) << 2);
// Swap adjacent 4-bit groups
reversed3 = ((reversed3 & 0xF0F0F0F0) >> 4) | ((reversed3 & 0x0F0F0F0F) << 4);
// Swap adjacent 8-bit groups
reversed3 = ((reversed3 & 0xFF00FF00) >> 8) | ((reversed3 & 0x00FF00FF) << 8);
// Swap adjacent 16-bit groups
reversed3 = (reversed3 >> 16) | (reversed3 << 16);
printf("Method 3 (Divide & Conquer): %u\\n", reversed3);

// METHOD 4: Using Modulo and Division
// Extract bits using modulo, build result using multiplication
unsigned int reversed4 = 0;
unsigned int temp4 = original_number;
while (temp4 > 0) {
    reversed4 = (reversed4 << 1) | (temp4 & 1); // Add rightmost bit to result
    temp4 >>= 1;                                // Remove rightmost bit
}
// Shift to proper position for 32-bit number
reversed4 <<= (32 - __builtin_clz(original_number ? original_number : 1));
printf("Method 4 (Modulo/Division): %u\\n", reversed4);

// METHOD 5: Recursive Approach
unsigned int reverse_bits_recursive(unsigned int n, int total_bits) {
    if (total_bits == 1) {
        return n;
    }
    // Split number into two halves, reverse each half, then swap
    int half_bits = total_bits / 2;
    unsigned int mask = (1U << half_bits) - 1;
    unsigned int left_half = n >> half_bits;
    unsigned int right_half = n & mask;
    
    return (reverse_bits_recursive(right_half, half_bits) << half_bits) |
           reverse_bits_recursive(left_half, half_bits);
}
unsigned int reversed5 = reverse_bits_recursive(original_number, 32);
printf("Method 5 (Recursive): %u\\n", reversed5);

/*
PERFORMANCE COMPARISON:
- Method 1: Simple, O(32) operations
- Method 2: Fastest for small numbers, requires memory
- Method 3: Most efficient for 32-bit, constant time
- Method 4: Variable time based on number of set bits
- Method 5: Educational, uses recursion stack
*/`,
        keyPoints: [
          "Operators are symbols that perform operations on operands (variables/values)",
          "C has 8 main operator categories: arithmetic, relational, logical, bitwise, assignment, unary, ternary, comma",
          "Operator precedence determines evaluation order - higher precedence operators execute first",
          "Associativity determines order when operators have same precedence (left-to-right or right-to-left)",
          "Pre-increment (++var): increment first, then use value in expression",
          "Post-increment (var++): use current value first, then increment",
          "Token pasting operator (##) concatenates tokens during preprocessing to create new identifiers",
          "Bit manipulation: |= sets bits, &= ~ clears bits, ^= toggles bits",
          "XOR method is fastest way to check opposite signs: (a ^ b) < 0",
          "Five bit reversal methods: bit-by-bit, lookup table, divide & conquer, modulo/division, recursive",
          "Divide & conquer method most efficient for 32-bit numbers with O(log log n) complexity",
          "Understanding these concepts is crucial for embedded programming and hardware control",
        ],
      },
      test: {
        questions: [
          {
            question: "What is the result of: int x=5; int y = ++x + x++?",
            options: ["11", "12", "13", "10"],
            correct: 2,
          },
          {
            question: "Which operator is used to set a specific bit?",
            options: ["&", "|", "^", "~"],
            correct: 1,
          },
          {
            question: "What does the token pasting operator ## do?",
            options: [
              "Adds numbers",
              "Combines tokens during preprocessing",
              "Creates comments",
              "Defines macros",
            ],
            correct: 1,
          },
          {
            question:
              "Which is the fastest way to check if two integers have opposite signs?",
            options: [
              "Multiplication method",
              "XOR operation (a ^ b) < 0",
              "Addition method",
              "Direct comparison",
            ],
            correct: 1,
          },
          {
            question: "In operator precedence, which has higher precedence?",
            options: [
              "Addition (+) over Multiplication (*)",
              "Multiplication (*) over Addition (+)",
              "Both have equal precedence",
              "Depends on associativity",
            ],
            correct: 1,
          },
          {
            question: "What happens in post-increment (var++)?",
            options: [
              "Increment first, then use value",
              "Use current value first, then increment",
              "Only increments, doesn't return value",
              "Same as pre-increment",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 3,
      title: "Decision Making and Looping",
      content: {
        theory:
          "Control structures allow programs to make decisions and repeat operations. In embedded systems, these are essential for sensor monitoring, data processing, and system control.",
        codeExample: `// Decision making
int sensorValue = readSensor();

if (sensorValue > 50) {
    turnOnLED();
    printf("Warning: High temperature!\\n");
} else if (sensorValue > 30) {
    printf("Normal temperature\\n");
} else {
    turnOffLED();
}

// Looping structures
for (int i = 0; i < 10; i++) {
    delay(1000);  // Wait 1 second
    checkStatus();
}

int count = 0;
while (count < 5) {
    processData();
    count++;
}

// Switch statement
switch (sensorValue) {
    case 1: printf("Low\\n"); break;
    case 2: printf("Medium\\n"); break;
    default: printf("High\\n");
}`,
        keyPoints: [
          "if-else: Conditional execution",
          "for loops: Known iterations",
          "while loops: Condition-based repetition",
          "do-while: Execute at least once",
          "switch: Multiple choice selection",
        ],
      },
      test: {
        questions: [
          {
            question: "Which loop executes at least once?",
            options: ["for", "while", "do-while", "if"],
            correct: 2,
          },
          {
            question: "What keyword is used to exit a switch case?",
            options: ["exit", "break", "continue", "return"],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 4,
      title: "Functions in C",
      content: {
        theory:
          "Functions organize code into reusable blocks, essential for modular programming in embedded systems. They help manage different hardware components and create clean, maintainable code.",
        codeExample: `// Function declaration
float readTemperature(void);
void controlMotor(int speed, char direction);

// Function definition
float readTemperature(void) {
    int adcValue = readADC();
    float temp = (adcValue * 3.3 / 1024) * 100;
    return temp;
}

void controlMotor(int speed, char direction) {
    if (direction == 'F') {
        setMotorForward();
    } else {
        setMotorReverse();
    }
    setMotorSpeed(speed);
}

// Recursive function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    float temp = readTemperature();
    controlMotor(150, 'F');
    int fact = factorial(5);
    return 0;
}`,
        keyPoints: [
          "Functions organize code into blocks",
          "Parameters pass data to functions",
          "Return values send data back",
          "void functions don't return values",
          "Recursion: functions calling themselves",
        ],
      },
      test: {
        questions: [
          {
            question: "What keyword indicates a function returns no value?",
            options: ["int", "char", "void", "null"],
            correct: 2,
          },
          {
            question: "What is a function calling itself called?",
            options: ["Iteration", "Recursion", "Loop", "Callback"],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 5,
      title: "Pointers and Dynamic Memory Allocation",
      content: {
        theory:
          "Pointers provide direct memory access, crucial for embedded systems. Dynamic memory allocation allows flexible memory management during runtime, though it should be used carefully in embedded systems.",
        codeExample: `#include <stdlib.h>

// Pointer basics
int value = 42;
int *ptr = &value;  // ptr points to value's address

printf("Value: %d\\n", value);      // 42
printf("Address: %p\\n", &value);   // Memory address
printf("Via pointer: %d\\n", *ptr); // 42

// Dynamic memory allocation
int *dynamicArray = (int*)malloc(5 * sizeof(int));
if (dynamicArray != NULL) {
    for (int i = 0; i < 5; i++) {
        dynamicArray[i] = i * 10;
    }
    
    // Don't forget to free memory!
    free(dynamicArray);
    dynamicArray = NULL;
}

// Hardware register access (embedded specific)
volatile unsigned char *PORTB = (unsigned char *)0x25;
*PORTB = 0xFF;  // Set all pins high`,
        keyPoints: [
          "& operator gets address of variable",
          "* operator dereferences pointer",
          "malloc() allocates dynamic memory",
          "free() releases allocated memory",
          "Always check for NULL pointers",
        ],
      },
      test: {
        questions: [
          {
            question: "Which function is used to allocate dynamic memory?",
            options: ["alloc()", "malloc()", "new()", "create()"],
            correct: 1,
          },
          {
            question: "What should you do after using malloc()?",
            options: [
              "Nothing",
              "Call free()",
              "Call delete()",
              "Reset pointer",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 6,
      title: "Arrays and Strings in C",
      content: {
        theory:
          "Arrays store multiple elements of the same type, while strings are arrays of characters. Both are fundamental for data storage and manipulation in embedded systems.",
        codeExample: `// Array declaration and initialization
int temperatures[7] = {25, 26, 24, 27, 25, 23, 22};
char sensorData[100];  // Uninitialized array

// Accessing array elements
temperatures[0] = 30;  // First element
int lastTemp = temperatures[6];  // Last element

// String handling
char message[] = "Hello World";
char buffer[50];

// String functions
strcpy(buffer, "Embedded");  // Copy string
strcat(buffer, " Systems");  // Concatenate
int len = strlen(buffer);    // Get length

// Multi-dimensional arrays
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Processing arrays
for (int i = 0; i < 7; i++) {
    printf("Day %d: %d°C\\n", i+1, temperatures[i]);
}`,
        keyPoints: [
          "Arrays store multiple elements",
          "Index starts from 0",
          "Strings are character arrays",
          "Use string.h for string functions",
          "Multi-dimensional arrays possible",
        ],
      },
      test: {
        questions: [
          {
            question: "What is the index of the first element in an array?",
            options: ["1", "0", "-1", "Depends on declaration"],
            correct: 1,
          },
          {
            question: "Which function copies one string to another?",
            options: ["strcpy()", "strcat()", "strlen()", "strcmp()"],
            correct: 0,
          },
        ],
      },
    },
    {
      id: 7,
      title: "Structures and Unions in C",
      content: {
        theory:
          "Structures group related data together, while unions allow different data types to share the same memory location. Both are essential for organizing complex data in embedded systems.",
        codeExample: `// Structure definition
struct Sensor {
    int id;
    float temperature;
    float humidity;
    char status;
};

// Structure usage
struct Sensor sensor1 = {1, 25.5, 60.2, 'A'};
struct Sensor sensors[10];  // Array of structures

// Accessing structure members
sensor1.temperature = 26.0;
printf("Sensor %d: %.1f°C\\n", sensor1.id, sensor1.temperature);

// Pointer to structure
struct Sensor *sensorPtr = &sensor1;
sensorPtr->humidity = 65.0;  // Arrow operator

// Union definition
union Data {
    int intValue;
    float floatValue;
    char charValue;
};

union Data data;
data.intValue = 42;
printf("Int: %d\\n", data.intValue);

// Typedef for cleaner code
typedef struct {
    int x, y;
} Point;

Point p1 = {10, 20};`,
        keyPoints: [
          "Structures group related variables",
          "Use dot (.) for direct access",
          "Use arrow (->) for pointer access",
          "Unions share memory space",
          "typedef creates type aliases",
        ],
      },
      test: {
        questions: [
          {
            question:
              "Which operator is used to access structure members via pointer?",
            options: [".", "->", "*", "&"],
            correct: 1,
          },
          {
            question: "What is the main difference between struct and union?",
            options: [
              "No difference",
              "Union shares memory",
              "Struct is faster",
              "Union is deprecated",
            ],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 8,
      title: "File Handling in C",
      content: {
        theory:
          "File handling allows programs to read from and write to files, essential for data logging, configuration storage, and data processing in embedded systems.",
        codeExample: `#include <stdio.h>

// Writing to a file
FILE *file = fopen("sensor_data.txt", "w");
if (file != NULL) {
    fprintf(file, "Temperature: %.1f\\n", 25.5);
    fprintf(file, "Humidity: %.1f\\n", 60.2);
    fclose(file);
}

// Reading from a file
file = fopen("config.txt", "r");
if (file != NULL) {
    char buffer[100];
    while (fgets(buffer, sizeof(buffer), file)) {
        printf("Read: %s", buffer);
    }
    fclose(file);
}

// Binary file operations
FILE *binFile = fopen("data.bin", "wb");
if (binFile != NULL) {
    int data[] = {1, 2, 3, 4, 5};
    fwrite(data, sizeof(int), 5, binFile);
    fclose(binFile);
}

// Reading binary data
binFile = fopen("data.bin", "rb");
if (binFile != NULL) {
    int readData[5];
    fread(readData, sizeof(int), 5, binFile);
    fclose(binFile);
}`,
        keyPoints: [
          "fopen() opens files with modes",
          "fprintf() writes formatted data",
          "fgets() reads lines from files",
          "fwrite()/fread() for binary data",
          "Always close files with fclose()",
        ],
      },
      test: {
        questions: [
          {
            question: "Which function is used to open a file?",
            options: ["open()", "fopen()", "file_open()", "create()"],
            correct: 1,
          },
          {
            question: "What does the 'w' mode do when opening a file?",
            options: ["Read only", "Write only", "Append", "Read and write"],
            correct: 1,
          },
        ],
      },
    },
    {
      id: 9,
      title: "Linked List Data Structure",
      content: {
        theory:
          "Linked lists are dynamic data structures where elements are connected through pointers. They're useful in embedded systems for managing variable amounts of data efficiently.",
        codeExample: `#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode != NULL) {
        newNode->data = data;
        newNode->next = NULL;
    }
    return newNode;
}

// Insert at beginning
struct Node* insertAtBeginning(struct Node* head, int data) {
    struct Node* newNode = createNode(data);
    if (newNode != NULL) {
        newNode->next = head;
        head = newNode;
    }
    return head;
}

// Display list
void displayList(struct Node* head) {
    struct Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

// Delete a node
struct Node* deleteNode(struct Node* head, int data) {
    if (head == NULL) return head;
    
    if (head->data == data) {
        struct Node* temp = head;
        head = head->next;
        free(temp);
        return head;
    }
    
    struct Node* current = head;
    while (current->next && current->next->data != data) {
        current = current->next;
    }
    
    if (current->next) {
        struct Node* temp = current->next;
        current->next = current->next->next;
        free(temp);
    }
    
    return head;
}`,
        keyPoints: [
          "Nodes contain data and pointer to next",
          "Dynamic memory allocation required",
          "Head pointer tracks first element",
          "Traversal using pointer following",
          "Memory must be freed when deleting",
        ],
      },
      test: {
        questions: [
          {
            question: "What does each node in a linked list contain?",
            options: [
              "Only data",
              "Only pointer",
              "Data and pointer",
              "Index and data",
            ],
            correct: 2,
          },
          {
            question: "What should you do when deleting a node?",
            options: [
              "Set pointer to NULL",
              "Free the memory",
              "Reset data",
              "Nothing special",
            ],
            correct: 1,
          },
        ],
      },
    },
  ];

  const handleTestAnswer = (questionIndex, answerIndex) => {
    setTestAnswers({
      ...testAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const submitTest = () => {
    const currentTest = lessons[currentLesson].test;
    let score = 0;

    currentTest.questions.forEach((question, index) => {
      if (testAnswers[index] === question.correct) {
        score++;
      }
    });

    setTestScore(score);
    setShowResults(true);

    if (score >= currentTest.questions.length * 0.7) {
      // 70% pass rate
      setCompletedLessons(new Set([...completedLessons, currentLesson]));
    }
  };

  const nextLesson = () => {
    setShowTest(false);
    setShowResults(false);
    setTestAnswers({});
    setCurrentLesson(currentLesson + 1);
  };

  const resetTest = () => {
    setShowTest(false);
    setShowResults(false);
    setTestAnswers({});
  };

  const progressPercentage = (completedLessons.size / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚀 C Programming for Embedded Systems
          </h1>
          <p className="text-lg text-gray-600">
            Master C programming step by step
          </p>

          {/* Progress Bar */}
          <div className="mt-6 bg-white rounded-full p-2 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => {
                setCurrentLesson(index);
                setShowTest(false);
                setShowResults(false);
                setTestAnswers({});
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                index === currentLesson
                  ? "bg-blue-600 text-white shadow-lg"
                  : completedLessons.has(index)
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-gray-700 shadow-md hover:shadow-lg"
              }`}
            >
              {completedLessons.has(index) && "✓ "}
              Lesson {index + 1}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {!showTest && !showResults && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                📖 {lessons[currentLesson].title}
              </h2>

              {/* Theory Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  💡 Theory
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {lessons[currentLesson].content.theory}
                </p>
              </div>

              {/* Code Example */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  💻 Code Example
                </h3>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 font-mono text-sm">
                    {lessons[currentLesson].content.codeExample}
                  </pre>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  🎯 Key Points
                </h3>
                <ul className="space-y-2">
                  {lessons[currentLesson].content.keyPoints.map(
                    (point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">▶</span>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Take Test Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowTest(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  📝 Take Test for This Lesson
                </button>
              </div>
            </div>
          )}

          {showTest && !showResults && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                📝 Test: {lessons[currentLesson].title}
              </h2>

              {lessons[currentLesson].test.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Question {qIndex + 1}: {question.question}
                  </h4>

                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={oIndex}
                          onChange={() => handleTestAnswer(qIndex, oIndex)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center space-x-4">
                <button
                  onClick={resetTest}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  ← Back to Lesson
                </button>
                <button
                  onClick={submitTest}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Submit Test ✓
                </button>
              </div>
            </div>
          )}

          {showResults && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                📊 Test Results
              </h2>

              <div className="mb-8">
                <div
                  className={`text-6xl mb-4 ${
                    testScore >=
                    lessons[currentLesson].test.questions.length * 0.7
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {testScore >=
                  lessons[currentLesson].test.questions.length * 0.7
                    ? "🎉"
                    : "😅"}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Score: {testScore}/
                  {lessons[currentLesson].test.questions.length}
                </h3>
                <p className="text-lg text-gray-600">
                  {testScore >=
                  lessons[currentLesson].test.questions.length * 0.7
                    ? "🎊 Congratulations! You passed!"
                    : "📚 Keep studying and try again!"}
                </p>
              </div>

              <div className="space-x-4">
                <button
                  onClick={resetTest}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  📖 Review Lesson
                </button>

                {testScore <
                  lessons[currentLesson].test.questions.length * 0.7 && (
                  <button
                    onClick={() => {
                      setShowTest(true);
                      setShowResults(false);
                      setTestAnswers({});
                    }}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  >
                    🔄 Retake Test
                  </button>
                )}

                {testScore >=
                  lessons[currentLesson].test.questions.length * 0.7 &&
                  currentLesson < lessons.length - 1 && (
                    <button
                      onClick={nextLesson}
                      className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                      Next Lesson →
                    </button>
                  )}

                {testScore >=
                  lessons[currentLesson].test.questions.length * 0.7 &&
                  currentLesson === lessons.length - 1 && (
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-green-600">
                        🏆 Course Completed!
                      </h3>
                      <p className="text-gray-600">
                        You've mastered C programming for embedded systems!
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>💡 Master embedded C programming one step at a time!</p>
        </div>
      </div>
    </div>
  );
}

export default Basic_electronics;
