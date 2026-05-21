// Python Learning Data - Complete Chapter Content
// Each chapter contains detailed notes, exercises, and MCQs

export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  testInput: string;
  expectedOutput: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChapterData {
  title: string;
  notes: string;
  exercises: Exercise[];
  mcqs: MCQ[];
}

const pythonChapters: Record<string, ChapterData> = {
  // ==================== CHAPTER 1: VARIABLES ====================
  variables: {
    title: 'Variables & Data Types',
    notes: `## Variables in Python

A **variable** is a named reference to a value stored in memory. Unlike languages like Java or C++, Python is dynamically typed — you don't need to declare the type of a variable before using it. The interpreter infers the type at runtime.

### Creating Variables

\`\`\`python
# Simple assignments
name = "Alice"        # str
age = 25              # int
height = 5.7          # float
is_student = True     # bool

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0         # all point to same value
\`\`\`

### Variable Naming Rules
- Must start with a letter (a-z, A-Z) or underscore (_)
- Can contain letters, digits (0-9), and underscores
- Case-sensitive: \`age\`, \`Age\`, and \`AGE\` are different variables
- Cannot use Python reserved keywords (if, else, for, while, class, etc.)
- Convention: use snake_case for variables and functions

### Python Data Types

| Type | Example | Description |
|------|---------|-------------|
| int | \`42\`, \`-7\`, \`0\` | Whole numbers (unlimited precision) |
| float | \`3.14\`, \`-0.5\`, \`2.0e10\` | Decimal/floating-point numbers |
| str | \`"hello"\`, \`'world'\` | Text sequences (immutable) |
| bool | \`True\`, \`False\` | Boolean values |
| list | \`[1, 2, 3]\` | Ordered, mutable collection |
| tuple | \`(1, 2, 3)\` | Ordered, immutable collection |
| dict | \`{"key": "value"}\` | Key-value pairs |
| set | \`{1, 2, 3}\` | Unordered, unique elements |
| NoneType | \`None\` | Represents absence of value |
| complex | \`3+4j\` | Complex numbers |

### Type Checking

\`\`\`python
x = 42
print(type(x))            # <class 'int'>
print(isinstance(x, int)) # True
print(isinstance(x, (int, float)))  # True - check multiple types

# id() shows memory address
a = [1, 2, 3]
b = a
print(id(a) == id(b))  # True - same object
\`\`\`

### Type Casting (Conversion)

\`\`\`python
# String to numbers
x = int("42")        # 42
y = float("3.14")    # 3.14

# Number to string
s = str(100)         # "100"

# Float to int (truncates, doesn't round)
n = int(3.9)         # 3

# To boolean
bool(0)       # False
bool("")      # False
bool(None)    # False
bool([])      # False
bool(1)       # True
bool("hello") # True

# List/Tuple/Set conversions
list((1,2,3))    # [1, 2, 3]
tuple([1,2,3])   # (1, 2, 3)
set([1,1,2,3])   # {1, 2, 3}
\`\`\`

### Mutable vs Immutable Types
- **Immutable**: int, float, str, bool, tuple, frozenset — cannot be changed after creation
- **Mutable**: list, dict, set — can be modified in place

\`\`\`python
# Immutable example
s = "hello"
# s[0] = "H"  # TypeError! Strings are immutable
s = "H" + s[1:]  # Create new string instead

# Mutable example
lst = [1, 2, 3]
lst[0] = 10  # Works! Lists are mutable
\`\`\`

### Dynamic Typing

\`\`\`python
x = 10        # x is int
x = "hello"   # now x is str — no error!
x = [1, 2]    # now x is list
\`\`\`

### Constants (Convention)
Python doesn't have true constants, but by convention, use ALL_CAPS:
\`\`\`python
PI = 3.14159
MAX_SIZE = 100
DATABASE_URL = "localhost:5432"
\`\`\``,
    exercises: [
      {
        title: 'Swap Two Variables',
        description: 'Given two variables a and b, swap their values without using a third variable. Use Python\'s tuple unpacking.',
        starterCode: 'a = int(input())\nb = int(input())\n# Swap a and b without using a temp variable\na, b = b, a\nprint(a, b)',
        testInput: '5\n10',
        expectedOutput: '10 5'
      },
      {
        title: 'Type Converter',
        description: 'Read a number as string input, convert it to int, add 10 to it, then print the result and its type.',
        starterCode: 'num_str = input()\n# Convert to int, add 10, print result and type\nnum = int(num_str) + 10\nprint(num)\nprint(type(num).__name__)',
        testInput: '25',
        expectedOutput: '35\nint'
      },
      {
        title: 'Multi-Type Checker',
        description: 'Read input and determine if it can be converted to int, float, or remains a string. Print the most specific type.',
        starterCode: 'val = input()\n# Check if val is int, float, or str\ntry:\n    int(val)\n    print("int")\nexcept ValueError:\n    try:\n        float(val)\n        print("float")\n    except ValueError:\n        print("str")',
        testInput: '3.14',
        expectedOutput: 'float'
      },
      {
        title: 'Variable Memory Check',
        description: 'Create two variables with the same list value. Check if they point to the same memory location using id().',
        starterCode: 'a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\nprint(a is b)\nprint(a is c)',
        testInput: '',
        expectedOutput: 'False\nTrue'
      }
    ],
    mcqs: [
      { question: 'Which is NOT a valid variable name in Python?', options: ['_name', '2name', 'name_2', '__init__'], correctAnswer: '2name', explanation: 'Variable names cannot start with a digit. They must begin with a letter or underscore.' },
      { question: 'What is the output of: type(3.14).__name__?', options: ['int', 'float', 'double', 'decimal'], correctAnswer: 'float', explanation: 'In Python, decimal numbers are of type float. Python does not have a double type like Java/C++.' },
      { question: 'What does int(3.9) return?', options: ['4', '3', '3.0', 'Error'], correctAnswer: '3', explanation: 'int() truncates towards zero, it does not round. So int(3.9) = 3 and int(-3.9) = -3.' },
      { question: 'Which of these is immutable?', options: ['list', 'dict', 'tuple', 'set'], correctAnswer: 'tuple', explanation: 'Tuples are immutable — once created, their elements cannot be changed. Lists, dicts, and sets are mutable.' },
      { question: 'What is bool([]) in Python?', options: ['True', 'False', 'None', 'Error'], correctAnswer: 'False', explanation: 'Empty collections ([], {}, (), set()) are falsy in Python. Non-empty collections are truthy.' },
      { question: 'x = "5"; y = 3; print(x + str(y)) outputs:', options: ['8', '53', '"53"', 'Error'], correctAnswer: '53', explanation: 'str(3) converts 3 to "3", then "5" + "3" = "53" (string concatenation).' },
      { question: 'What does isinstance(True, int) return?', options: ['True', 'False', 'Error', 'None'], correctAnswer: 'True', explanation: 'In Python, bool is a subclass of int. True is 1 and False is 0, so isinstance(True, int) is True.' }
    ]
  },

  // ==================== CHAPTER 2: OPERATORS ====================
  operators: {
    title: 'Operators',
    notes: `## Operators in Python

Operators are special symbols that perform operations on variables and values. Python supports a rich set of operators categorized into several types.

### 1. Arithmetic Operators

\`\`\`python
a, b = 17, 5

print(a + b)   # 22  - Addition
print(a - b)   # 12  - Subtraction
print(a * b)   # 85  - Multiplication
print(a / b)   # 3.4 - Division (always returns float)
print(a // b)  # 3   - Floor division (rounds down)
print(a % b)   # 2   - Modulus (remainder)
print(a ** b)  # 1419857 - Exponentiation (17^5)

# Floor division with negatives
print(-17 // 5)   # -4 (rounds towards negative infinity)
print(17 // -5)   # -4
\`\`\`

### 2. Comparison (Relational) Operators

\`\`\`python
x, y = 10, 20

print(x == y)   # False - Equal to
print(x != y)   # True  - Not equal to
print(x > y)    # False - Greater than
print(x < y)    # True  - Less than
print(x >= y)   # False - Greater than or equal
print(x <= y)   # True  - Less than or equal

# Chained comparisons (unique to Python!)
age = 25
print(18 <= age <= 65)  # True - checks both conditions
print(1 < 2 < 3 < 4)   # True
\`\`\`

### 3. Logical Operators

\`\`\`python
a, b = True, False

print(a and b)   # False - Both must be True
print(a or b)    # True  - At least one True
print(not a)     # False - Negation

# Short-circuit evaluation
# 'and' stops at first False, 'or' stops at first True
print(0 and 5)     # 0 (short-circuits, returns first falsy)
print(3 and 5)     # 5 (both truthy, returns last)
print(0 or 5)      # 5 (first is falsy, returns second)
print(3 or 5)      # 3 (first is truthy, returns it)

# Practical use
name = input_name or "Anonymous"  # default value pattern
\`\`\`

### 4. Bitwise Operators

\`\`\`python
a, b = 12, 10  # binary: 1100, 1010

print(a & b)    # 8   (1000) - AND
print(a | b)    # 14  (1110) - OR
print(a ^ b)    # 6   (0110) - XOR
print(~a)       # -13 - NOT (inverts all bits)
print(a << 2)   # 48  (110000) - Left shift
print(a >> 2)   # 3   (11) - Right shift

# Practical uses
# Check if number is even/odd
print(7 & 1)   # 1 (odd)
print(8 & 1)   # 0 (even)

# Swap without temp variable
a, b = a ^ b, a ^ b
a = a ^ b  # XOR swap
\`\`\`

### 5. Assignment Operators

\`\`\`python
x = 10       # Simple assignment
x += 5       # x = x + 5  → 15
x -= 3       # x = x - 3  → 12
x *= 2       # x = x * 2  → 24
x /= 4       # x = x / 4  → 6.0
x //= 2      # x = x // 2 → 3.0
x **= 3      # x = x ** 3 → 27.0
x %= 5       # x = x % 5  → 2.0

# Walrus operator (:=) - Python 3.8+
# Assigns and returns value in one expression
import random
while (n := random.randint(1, 10)) != 5:
    print(f"Got {n}, trying again...")
print(f"Got 5!")
\`\`\`

### 6. Identity Operators

\`\`\`python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a is c)      # True  - same object in memory
print(a is b)      # False - different objects, same value
print(a is not b)  # True

# == checks value equality, 'is' checks identity
print(a == b)      # True  - same values
print(a is b)      # False - different objects

# Small integer caching (-5 to 256)
x = 256
y = 256
print(x is y)  # True (cached)
x = 257
y = 257
print(x is y)  # False (not cached, may vary)
\`\`\`

### 7. Membership Operators

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)       # True
print("grape" not in fruits)   # True

# Works with strings too
print("hell" in "hello")       # True

# Works with dictionaries (checks keys)
d = {"name": "Alice", "age": 25}
print("name" in d)       # True
print("Alice" in d)      # False (checks keys, not values)
print("Alice" in d.values())  # True
\`\`\`

### Operator Precedence (High to Low)
1. \`**\` (exponentiation)
2. \`~\`, \`+\`, \`-\` (unary)
3. \`*\`, \`/\`, \`//\`, \`%\`
4. \`+\`, \`-\`
5. \`<<\`, \`>>\`
6. \`&\` (bitwise AND)
7. \`^\` (bitwise XOR)
8. \`|\` (bitwise OR)
9. \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`, \`is\`, \`in\`
10. \`not\`
11. \`and\`
12. \`or\`

\`\`\`python
# Precedence example
result = 2 + 3 * 4 ** 2  # 2 + 3 * 16 = 2 + 48 = 50
print(result)  # 50
\`\`\``,
    exercises: [
      {
        title: 'Bitwise Even/Odd Checker',
        description: 'Read a number and use the bitwise AND operator to determine if it is even or odd. Print "Even" or "Odd".',
        starterCode: 'n = int(input())\n# Use bitwise AND to check even/odd\nif n & 1:\n    print("Odd")\nelse:\n    print("Even")',
        testInput: '7',
        expectedOutput: 'Odd'
      },
      {
        title: 'Operator Precedence',
        description: 'Calculate and print the result of: 2 + 3 * 4 ** 2 - 8 // 3. Do NOT use parentheses — let Python handle precedence.',
        starterCode: 'result = 2 + 3 * 4 ** 2 - 8 // 3\nprint(result)',
        testInput: '',
        expectedOutput: '48'
      },
      {
        title: 'Chained Comparison',
        description: 'Read a number and check if it falls between 1 and 100 (inclusive) using chained comparison operators.',
        starterCode: 'n = int(input())\n# Use chained comparison\nif 1 <= n <= 100:\n    print("In range")\nelse:\n    print("Out of range")',
        testInput: '50',
        expectedOutput: 'In range'
      },
      {
        title: 'Short-Circuit Logic',
        description: 'Demonstrate short-circuit evaluation. Given two numbers, use "and" and "or" to find the result without if-else.',
        starterCode: 'a = int(input())\nb = int(input())\n# Use short-circuit: print b if a is 0, else print a\nresult = a or b\nprint(result)',
        testInput: '0\n42',
        expectedOutput: '42'
      }
    ],
    mcqs: [
      { question: 'What is 17 // 5 in Python?', options: ['3.4', '3', '4', '3.0'], correctAnswer: '3', explanation: 'Floor division (//) rounds down to the nearest integer. 17/5 = 3.4, floor is 3.' },
      { question: 'What is the output of: print(2 ** 3 ** 2)?', options: ['64', '512', '36', '8'], correctAnswer: '512', explanation: 'Exponentiation is right-associative: 2 ** (3 ** 2) = 2 ** 9 = 512, not (2**3)**2 = 64.' },
      { question: 'What does "3 and 5" return?', options: ['True', '3', '5', 'False'], correctAnswer: '5', explanation: 'With "and", if first value is truthy, Python returns the second value. Both 3 and 5 are truthy, so it returns 5.' },
      { question: 'What does "0 or [] or "hello"" return?', options: ['0', '[]', 'hello', 'True'], correctAnswer: 'hello', explanation: '"or" returns the first truthy value. 0 is falsy, [] is falsy, "hello" is truthy — so it returns "hello".' },
      { question: 'What is the result of: 12 & 10?', options: ['8', '14', '6', '2'], correctAnswer: '8', explanation: '12 = 1100, 10 = 1010. AND: 1000 = 8. Only bits that are 1 in both remain.' },
      { question: 'Which operator checks object identity (same memory location)?', options: ['==', '===', 'is', 'equals'], correctAnswer: 'is', explanation: '"is" checks if two variables point to the same object in memory. "==" checks value equality.' },
      { question: 'What is -17 // 5?', options: ['-3', '-4', '-3.4', '3'], correctAnswer: '-4', explanation: 'Floor division rounds towards negative infinity. -17/5 = -3.4, floor(-3.4) = -4.' }
    ]
  },

  // ==================== CHAPTER 3: STRINGS ====================
  strings: {
    title: 'Strings',
    notes: `## Strings in Python

Strings are **immutable sequences** of characters. They can be created using single quotes, double quotes, or triple quotes for multi-line strings.

### String Creation

\`\`\`python
s1 = 'Hello'
s2 = "World"
s3 = '''Multi
line string'''
s4 = """Also multi
line"""

# Raw strings (ignore escape sequences)
path = r"C:\\Users\\name"  # backslashes treated literally

# String repetition and concatenation
print("Ha" * 3)       # HaHaHa
print("Hello" + " " + "World")  # Hello World
\`\`\`

### String Indexing and Slicing

\`\`\`python
s = "Python Programming"
#    0123456789...

# Indexing
print(s[0])     # 'P' (first character)
print(s[-1])    # 'g' (last character)
print(s[-6])    # 'm'

# Slicing: s[start:stop:step]
print(s[0:6])    # 'Python' (stop is exclusive)
print(s[7:])     # 'Programming'
print(s[:6])     # 'Python'
print(s[::2])    # 'Pto rgamn' (every 2nd char)
print(s[::-1])   # 'gnimmargorP nohtyP' (reversed)

# Slice object
sl = slice(0, 6)
print(s[sl])     # 'Python'
\`\`\`

### String Methods

\`\`\`python
s = "  Hello, World!  "

# Case methods
print(s.upper())        # "  HELLO, WORLD!  "
print(s.lower())        # "  hello, world!  "
print(s.title())        # "  Hello, World!  "
print(s.capitalize())   # "  hello, world!  "
print(s.swapcase())     # "  hELLO, wORLD!  "

# Whitespace methods
print(s.strip())        # "Hello, World!"
print(s.lstrip())       # "Hello, World!  "
print(s.rstrip())       # "  Hello, World!"

# Search methods
print(s.find("World"))     # 9 (index of first occurrence)
print(s.find("xyz"))       # -1 (not found)
print(s.index("World"))    # 9 (like find but raises ValueError if not found)
print(s.count("l"))        # 3
print(s.startswith("  He")) # True
print(s.endswith("!  "))    # True

# Replace and split
print(s.replace("World", "Python"))  # "  Hello, Python!  "
print("a,b,c".split(","))            # ['a', 'b', 'c']
print(" ".join(["Hello", "World"]))  # "Hello World"

# Validation methods
print("hello123".isalnum())   # True
print("hello".isalpha())      # True
print("12345".isdigit())      # True
print("hello".islower())      # True
print("HELLO".isupper())      # True
print("  ".isspace())         # True
\`\`\`

### String Formatting

\`\`\`python
name = "Alice"
age = 25
gpa = 3.856

# 1. f-strings (Python 3.6+) — RECOMMENDED
print(f"Name: {name}, Age: {age}")
print(f"GPA: {gpa:.2f}")           # "GPA: 3.86"
print(f"{'hello':>10}")            # "     hello" (right-align)
print(f"{'hello':<10}")            # "hello     " (left-align)
print(f"{'hello':^10}")            # "  hello   " (center)
print(f"{1000000:,}")              # "1,000,000"
print(f"{255:#x}")                 # "0xff" (hex with prefix)

# 2. format() method
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, {0} is {1}".format(name, age))
print("{name} is {age}".format(name="Bob", age=30))

# 3. % formatting (old style)
print("Name: %s, Age: %d, GPA: %.2f" % (name, age, gpa))
\`\`\`

### Escape Characters

\`\`\`python
print("Hello\\nWorld")    # Newline
print("Tab\\there")       # Tab
print("Quote: \\"hi\\"")  # Escaped quotes
print("Back\\\\slash")    # Backslash
print("\\u2764")          # Unicode heart: ❤
\`\`\`

### Regular Expressions (Basics)

\`\`\`python
import re

text = "My email is user@example.com and phone is 123-456-7890"

# re.search() - find first match
match = re.search(r'\\d{3}-\\d{3}-\\d{4}', text)
if match:
    print(match.group())  # 123-456-7890

# re.findall() - find all matches
emails = re.findall(r'[\\w.]+@[\\w.]+', text)
print(emails)  # ['user@example.com']

# re.sub() - replace
cleaned = re.sub(r'\\d', '*', text)
print(cleaned)  # replaces all digits with *

# Common patterns
# \\d - digit, \\w - word char, \\s - whitespace
# + one or more, * zero or more, ? zero or one
# ^ start, $ end, [] character class
\`\`\`

### Useful String Operations

\`\`\`python
# Check palindrome
s = "racecar"
print(s == s[::-1])  # True

# Count vowels
text = "Hello World"
vowels = sum(1 for c in text.lower() if c in 'aeiou')
print(vowels)  # 3

# Remove duplicates preserving order
s = "programming"
result = "".join(dict.fromkeys(s))
print(result)  # "progamin"
\`\`\``,
    exercises: [
      {
        title: 'Reverse Words',
        description: 'Read a sentence and print it with words in reverse order (not characters). Example: "Hello World" → "World Hello"',
        starterCode: 'sentence = input()\n# Reverse the order of words\nwords = sentence.split()\nprint(" ".join(words[::-1]))',
        testInput: 'Hello World Python',
        expectedOutput: 'Python World Hello'
      },
      {
        title: 'Count Vowels and Consonants',
        description: 'Read a string and count the number of vowels and consonants (ignore non-alphabetic characters).',
        starterCode: 's = input().lower()\nvowels = sum(1 for c in s if c in "aeiou")\nconsonants = sum(1 for c in s if c.isalpha() and c not in "aeiou")\nprint(f"Vowels: {vowels}")\nprint(f"Consonants: {consonants}")',
        testInput: 'Hello World',
        expectedOutput: 'Vowels: 3\nConsonants: 7'
      },
      {
        title: 'Palindrome Checker',
        description: 'Check if a given string is a palindrome (ignore case and spaces).',
        starterCode: 's = input().lower().replace(" ", "")\nif s == s[::-1]:\n    print("Palindrome")\nelse:\n    print("Not Palindrome")',
        testInput: 'Race Car',
        expectedOutput: 'Palindrome'
      },
      {
        title: 'String Compression',
        description: 'Implement basic string compression. "aaabbc" → "a3b2c1"',
        starterCode: 's = input()\nresult = ""\ni = 0\nwhile i < len(s):\n    count = 1\n    while i + count < len(s) and s[i] == s[i + count]:\n        count += 1\n    result += s[i] + str(count)\n    i += count\nprint(result)',
        testInput: 'aaabbc',
        expectedOutput: 'a3b2c1'
      }
    ],
    mcqs: [
      { question: 'What is "Hello"[1:4]?', options: ['Hel', 'ell', 'ello', 'Hell'], correctAnswer: 'ell', explanation: 'Slicing [1:4] gives characters at index 1, 2, 3 → "ell". Remember stop index is exclusive.' },
      { question: 'What does "hello".find("xyz") return?', options: ['None', '-1', '0', 'ValueError'], correctAnswer: '-1', explanation: 'find() returns -1 when substring is not found. index() would raise ValueError instead.' },
      { question: 'What is "Python"[::-1]?', options: ['Python', 'nohtyP', 'nothy', 'Error'], correctAnswer: 'nohtyP', explanation: '[::-1] reverses the string by stepping backwards through all characters.' },
      { question: 'Which method removes whitespace from both ends?', options: ['trim()', 'strip()', 'clean()', 'remove()'], correctAnswer: 'strip()', explanation: 'strip() removes leading and trailing whitespace. Python does not have a trim() method.' },
      { question: 'What is f"{42:08b}"?', options: ['00101010', '42', '101010', '0b101010'], correctAnswer: '00101010', explanation: 'Format spec :08b means binary representation padded to 8 digits with zeros. 42 in binary is 101010.' },
      { question: 'What does "a,b,c".split(",") return?', options: ['["a,b,c"]', '["a", "b", "c"]', '("a", "b", "c")', '"a b c"'], correctAnswer: '["a", "b", "c"]', explanation: 'split(",") splits the string at each comma and returns a list of substrings.' },
      { question: 'Strings in Python are:', options: ['Mutable', 'Immutable', 'Both', 'Depends on content'], correctAnswer: 'Immutable', explanation: 'Strings cannot be modified in place. Any operation that "changes" a string creates a new string object.' }
    ]
  },

  // ==================== CHAPTER 4: CONDITIONALS ====================
  conditionals: {
    title: 'Conditionals',
    notes: `## Conditional Statements in Python

Conditional statements allow your program to make decisions and execute different code blocks based on conditions.

### if / elif / else

\`\`\`python
age = 18

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")
\`\`\`

### Important Rules:
- Python uses **indentation** (4 spaces) instead of braces {}
- Colon (:) is required after each condition
- \`elif\` is Python's else-if (not "else if" or "elseif")
- \`else\` is optional and catches everything not matched above

### Truthy and Falsy Values

\`\`\`python
# Falsy values in Python:
# False, 0, 0.0, "", [], (), {}, set(), None, 0j

# Everything else is truthy
if []:
    print("Won't print")  # empty list is falsy

if [1, 2, 3]:
    print("Will print")   # non-empty list is truthy

if "hello":
    print("Will print")   # non-empty string is truthy

# Common pattern: check if list has items
items = get_items()
if items:  # instead of if len(items) > 0:
    process(items)
\`\`\`

### Ternary (Conditional) Expression

\`\`\`python
# Syntax: value_if_true if condition else value_if_false
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # "Adult"

# Nested ternary (use sparingly — can be hard to read)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(grade)  # "B"

# Ternary in function calls
print("Even" if 10 % 2 == 0 else "Odd")
\`\`\`

### Nested Conditions

\`\`\`python
num = 15

if num > 0:
    if num % 2 == 0:
        print("Positive Even")
    else:
        print("Positive Odd")
elif num < 0:
    print("Negative")
else:
    print("Zero")

# Better approach — flatten with logical operators
if num > 0 and num % 2 == 0:
    print("Positive Even")
elif num > 0:
    print("Positive Odd")
elif num < 0:
    print("Negative")
else:
    print("Zero")
\`\`\`

### match-case (Python 3.10+)

The structural pattern matching statement, similar to switch-case in other languages but much more powerful.

\`\`\`python
# Basic match-case
command = "quit"

match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case "quit" | "exit":  # Multiple patterns with |
        print("Goodbye!")
    case _:  # Default case (wildcard)
        print("Unknown command")

# Match with guards
def classify_number(n):
    match n:
        case n if n > 0:
            return "positive"
        case 0:
            return "zero"
        case n if n < 0:
            return "negative"

# Match with destructuring
point = (3, 4)
match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")
    case (x, y):
        print(f"Point at ({x}, {y})")

# Match with class patterns
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def describe(point):
    match point:
        case Point(x=0, y=0):
            return "Origin"
        case Point(x=x, y=0):
            return f"On x-axis"
        case Point(x=0, y=y):
            return f"On y-axis"
        case _:
            return "Somewhere else"
\`\`\`

### Conditional Best Practices

\`\`\`python
# 1. Use 'in' for multiple comparisons
color = "red"
# Bad
if color == "red" or color == "blue" or color == "green":
    pass
# Good
if color in ("red", "blue", "green"):
    pass

# 2. Guard clauses (early return)
def process_order(order):
    if not order:
        return "No order"
    if not order.is_valid():
        return "Invalid order"
    if order.is_cancelled():
        return "Cancelled"
    # Main logic here (less nesting)
    return "Processed"

# 3. Dictionary dispatch (alternative to long if-elif)
def get_day_type(day):
    day_types = {
        "Monday": "Weekday",
        "Tuesday": "Weekday",
        "Saturday": "Weekend",
        "Sunday": "Weekend",
    }
    return day_types.get(day, "Unknown")
\`\`\``,
    exercises: [
      {
        title: 'Grade Calculator',
        description: 'Read a score (0-100) and print the grade: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).',
        starterCode: 'score = int(input())\n# Determine grade\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelif score >= 60:\n    print("D")\nelse:\n    print("F")',
        testInput: '85',
        expectedOutput: 'B'
      },
      {
        title: 'Leap Year Checker',
        description: 'Read a year and determine if it is a leap year. A year is leap if divisible by 4, except centuries unless also divisible by 400.',
        starterCode: 'year = int(input())\n# Check leap year\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print("Leap Year")\nelse:\n    print("Not Leap Year")',
        testInput: '2024',
        expectedOutput: 'Leap Year'
      },
      {
        title: 'Triangle Type',
        description: 'Read three sides of a triangle and determine if it is Equilateral, Isosceles, or Scalene. First check if it forms a valid triangle.',
        starterCode: 'a = int(input())\nb = int(input())\nc = int(input())\n# Check valid triangle and type\nif a + b > c and b + c > a and a + c > b:\n    if a == b == c:\n        print("Equilateral")\n    elif a == b or b == c or a == c:\n        print("Isosceles")\n    else:\n        print("Scalene")\nelse:\n    print("Not a valid triangle")',
        testInput: '5\n5\n5',
        expectedOutput: 'Equilateral'
      }
    ],
    mcqs: [
      { question: 'What is the output of: print("Yes" if 0 else "No")?', options: ['Yes', 'No', 'True', 'Error'], correctAnswer: 'No', explanation: '0 is falsy in Python, so the ternary expression evaluates to the else branch: "No".' },
      { question: 'Which is the correct Python syntax?', options: ['if x == 5 then:', 'if (x == 5):', 'if x == 5:', 'if x = 5:'], correctAnswer: 'if x == 5:', explanation: 'Python uses "if condition:" syntax. Parentheses are optional, "then" is not used, and = is assignment not comparison.' },
      { question: 'What keyword is used for the default case in match-case?', options: ['default', 'else', '_', 'other'], correctAnswer: '_', explanation: 'The underscore _ acts as a wildcard pattern that matches anything, similar to "default" in other languages.' },
      { question: 'What is the output of: print(bool([]))?', options: ['True', 'False', '[]', 'None'], correctAnswer: 'False', explanation: 'Empty collections are falsy in Python. bool([]) returns False, while bool([1,2]) returns True.' },
      { question: 'How do you check multiple values in one condition?', options: ['if x == 1 || x == 2:', 'if x == 1 or 2:', 'if x in (1, 2):', 'if x = 1, 2:'], correctAnswer: 'if x in (1, 2):', explanation: 'Use "in" with a tuple/list to check membership. "x == 1 or 2" is a common bug — it evaluates as "(x==1) or (2)" which is always truthy.' },
      { question: 'What Python version introduced match-case?', options: ['3.8', '3.9', '3.10', '3.11'], correctAnswer: '3.10', explanation: 'Structural pattern matching (match-case) was introduced in Python 3.10 (PEP 634).' }
    ]
  },

  // ==================== CHAPTER 5: LOOPS ====================
  loops: {
    title: 'Loops',
    notes: `## Loops in Python

Loops allow you to execute a block of code repeatedly. Python provides \`for\` and \`while\` loops with powerful built-in utilities.

### for Loop

The for loop iterates over any iterable (list, string, range, tuple, dict, set, file, etc.)

\`\`\`python
# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterate over a string
for char in "Python":
    print(char, end=" ")  # P y t h o n

# Iterate over a dictionary
person = {"name": "Alice", "age": 25}
for key in person:
    print(f"{key}: {person[key]}")

# Iterate over dict items
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

### range() Function

\`\`\`python
# range(stop) - 0 to stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop) - start to stop-1
for i in range(2, 8):
    print(i)  # 2, 3, 4, 5, 6, 7

# range(start, stop, step)
for i in range(0, 20, 3):
    print(i)  # 0, 3, 6, 9, 12, 15, 18

# Counting backwards
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, ..., 1

# range is memory efficient (lazy evaluation)
r = range(1000000)  # doesn't create list in memory
print(500000 in r)  # True (O(1) lookup)
\`\`\`

### while Loop

\`\`\`python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# while with else (executes when condition becomes False naturally)
n = 5
while n > 0:
    print(n)
    n -= 1
else:
    print("Loop completed!")  # Prints if no break

# Infinite loop with break
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
    print(f"You entered: {user_input}")
\`\`\`

### enumerate() - Get Index and Value

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Without enumerate
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# With enumerate (Pythonic way)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Start from custom index
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
# 1: apple, 2: banana, 3: cherry
\`\`\`

### zip() - Iterate Multiple Sequences

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["NYC", "LA", "Chicago"]

# Zip two lists
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# Zip three lists
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")

# zip stops at shortest iterable
# Use itertools.zip_longest for longest
from itertools import zip_longest
for a, b in zip_longest([1,2,3], [4,5], fillvalue=0):
    print(a, b)  # (1,4), (2,5), (3,0)

# Unzip with zip(*)
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)  # (1, 2, 3)
print(letters)  # ('a', 'b', 'c')
\`\`\`

### break, continue, pass

\`\`\`python
# break - exit loop immediately
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - skip current iteration
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9

# pass - placeholder (do nothing)
for i in range(5):
    if i == 3:
        pass  # TODO: handle this case
    print(i)  # prints all 0-4

# for-else: else runs if loop completes without break
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} is prime")
\`\`\`

### Nested Loops

\`\`\`python
# Multiplication table
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i*j:4}", end="")
    print()  # newline after each row

# Pattern printing
n = 5
for i in range(1, n+1):
    print("*" * i)
# *
# **
# ***
# ****
# *****

# Flattening nested loops with itertools.product
from itertools import product
for i, j in product(range(3), range(3)):
    print(i, j)
\`\`\`

### List Comprehension

\`\`\`python
# Basic: [expression for item in iterable]
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition: [expression for item in iterable if condition]
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else (note: no 'if' at end)
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']

# Nested comprehension
matrix = [[i*3+j+1 for j in range(3)] for i in range(3)]
# [[1,2,3], [4,5,6], [7,8,9]]

# Flatten a matrix
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Dict comprehension
word_lengths = {word: len(word) for word in ["hello", "world", "python"]}
# {'hello': 5, 'world': 5, 'python': 6}

# Set comprehension
unique_lengths = {len(word) for word in ["hi", "hello", "hey"]}
# {2, 5, 3}
\`\`\``,
    exercises: [
      {
        title: 'Sum of N Numbers',
        description: 'Find the sum of first N natural numbers using a for loop.',
        starterCode: 'n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)',
        testInput: '10',
        expectedOutput: '55'
      },
      {
        title: 'Prime Number Checker',
        description: 'Read a number and check if it is prime. Use a for loop with break and else.',
        starterCode: 'n = int(input())\nif n < 2:\n    print("Not Prime")\nelse:\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            print("Not Prime")\n            break\n    else:\n        print("Prime")',
        testInput: '17',
        expectedOutput: 'Prime'
      },
      {
        title: 'Pattern Printing',
        description: 'Print a right-angled triangle pattern of stars with N rows.',
        starterCode: 'n = int(input())\nfor i in range(1, n + 1):\n    print("* " * i)',
        testInput: '4',
        expectedOutput: '* \n* * \n* * * \n* * * * '
      },
      {
        title: 'FizzBuzz',
        description: 'Print numbers 1 to N. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz".',
        starterCode: 'n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
        testInput: '15',
        expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'
      }
    ],
    mcqs: [
      { question: 'What does range(2, 10, 3) produce?', options: ['2, 5, 8', '2, 5, 8, 11', '2, 4, 6, 8', '3, 6, 9'], correctAnswer: '2, 5, 8', explanation: 'range(2, 10, 3) starts at 2, increments by 3, stops before 10: 2, 5, 8.' },
      { question: 'What does "break" do in a loop?', options: ['Exits the loop immediately', 'Skips current iteration', 'Pauses the loop', 'Restarts the loop'], correctAnswer: 'Exits the loop immediately', explanation: 'break terminates the innermost loop immediately and continues with the next statement after the loop.' },
      { question: 'When does the "else" clause of a for loop execute?', options: ['Always', 'When break is used', 'When loop completes without break', 'Never'], correctAnswer: 'When loop completes without break', explanation: 'The else clause of a for/while loop executes only when the loop terminates normally (not via break).' },
      { question: 'What is [x**2 for x in range(4)]?', options: ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 2, 4, 6]', '[1, 2, 3, 4]'], correctAnswer: '[0, 1, 4, 9]', explanation: 'range(4) gives 0,1,2,3. Squaring each: 0,1,4,9.' },
      { question: 'What does enumerate(["a","b","c"], 1) produce?', options: ['[(0,"a"),(1,"b"),(2,"c")]', '[(1,"a"),(2,"b"),(3,"c")]', '["a","b","c"]', 'Error'], correctAnswer: '[(1,"a"),(2,"b"),(3,"c")]', explanation: 'enumerate with start=1 begins counting from 1 instead of the default 0.' },
      { question: 'What happens with: for i in range(0): print(i)?', options: ['Prints 0', 'Infinite loop', 'Nothing prints', 'Error'], correctAnswer: 'Nothing prints', explanation: 'range(0) produces an empty sequence, so the loop body never executes.' },
      { question: 'What does zip([1,2], [3,4,5]) produce?', options: ['[(1,3),(2,4),(None,5)]', '[(1,3),(2,4)]', '[(1,3),(2,4),(2,5)]', 'Error'], correctAnswer: '[(1,3),(2,4)]', explanation: 'zip stops at the shortest iterable. Since [1,2] has 2 elements, only 2 pairs are produced.' }
    ]
  },

  // ==================== CHAPTER 6: FUNCTIONS ====================
  functions: {
    title: 'Functions',
    notes: `## Functions in Python

Functions are reusable blocks of code that perform a specific task. They help organize code, reduce repetition, and improve readability.

### Defining and Calling Functions

\`\`\`python
# Basic function
def greet(name):
    """Docstring: describes what the function does"""
    return f"Hello, {name}!"

# Call the function
message = greet("Alice")
print(message)  # Hello, Alice!

# Function with no return (returns None implicitly)
def print_stars(n):
    print("*" * n)

result = print_stars(5)
print(result)  # None
\`\`\`

### Parameters and Arguments

\`\`\`python
# Positional arguments
def add(a, b):
    return a + b

# Keyword arguments
print(add(b=5, a=3))  # 8

# Default parameters
def power(base, exp=2):
    return base ** exp

print(power(3))     # 9 (exp defaults to 2)
print(power(3, 3))  # 27

# IMPORTANT: Never use mutable default arguments!
# Bad:
def append_to(item, lst=[]):  # Bug! Same list shared across calls
    lst.append(item)
    return lst

# Good:
def append_to(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
\`\`\`

### *args and **kwargs

\`\`\`python
# *args - variable positional arguments (tuple)
def add_all(*args):
    print(type(args))  # <class 'tuple'>
    return sum(args)

print(add_all(1, 2, 3, 4, 5))  # 15

# **kwargs - variable keyword arguments (dict)
def print_info(**kwargs):
    print(type(kwargs))  # <class 'dict'>
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")

# Combining all parameter types
def func(a, b, *args, key1="default", **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"key1={key1}")
    print(f"kwargs={kwargs}")

func(1, 2, 3, 4, key1="custom", x=10, y=20)
# a=1, b=2, args=(3, 4), key1=custom, kwargs={'x': 10, 'y': 20}

# Unpacking arguments
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))  # 6 (unpacks list as positional args)

data = {'a': 1, 'b': 2, 'c': 3}
print(add(**data))  # 6 (unpacks dict as keyword args)
\`\`\`

### Lambda Functions

\`\`\`python
# Anonymous single-expression functions
square = lambda x: x ** 2
add = lambda a, b: a + b

print(square(5))   # 25
print(add(3, 4))   # 7

# Lambda with conditional
classify = lambda x: "positive" if x > 0 else "negative" if x < 0 else "zero"
print(classify(-5))  # negative
\`\`\`

### map(), filter(), reduce()

\`\`\`python
# map(function, iterable) - apply function to each element
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter(function, iterable) - keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# reduce(function, iterable) - accumulate values
from functools import reduce
total = reduce(lambda acc, x: acc + x, numbers)
print(total)  # 15

# reduce with initial value
product = reduce(lambda acc, x: acc * x, numbers, 1)
print(product)  # 120

# Practical examples
names = ["alice", "bob", "charlie"]
capitalized = list(map(str.capitalize, names))
# ['Alice', 'Bob', 'Charlie']

words = ["hello", "hi", "hey", "world", "python"]
long_words = list(filter(lambda w: len(w) > 3, words))
# ['hello', 'world', 'python']
\`\`\`

### Scope and Closures

\`\`\`python
# LEGB Rule: Local → Enclosing → Global → Built-in
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # "local"
    
    inner()
    print(x)  # "enclosing"

outer()
print(x)  # "global"

# global keyword
count = 0
def increment():
    global count
    count += 1

increment()
print(count)  # 1

# nonlocal keyword (access enclosing scope)
def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

c = counter()
print(c())  # 1
print(c())  # 2
print(c())  # 3

# Closure - function that remembers its enclosing scope
def multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = multiplier(2)
triple = multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15
\`\`\`

### Decorators (Basics)

\`\`\`python
# A decorator wraps a function to extend its behavior
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()  # prints: slow_function took 1.00xxs
\`\`\``,
    exercises: [
      {
        title: 'Factorial with Recursion',
        description: 'Write a recursive function to calculate the factorial of N.',
        starterCode: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nprint(factorial(n))',
        testInput: '5',
        expectedOutput: '120'
      },
      {
        title: 'Higher-Order Function',
        description: 'Write a function apply_operation that takes a function and two numbers, and returns the result of applying the function.',
        starterCode: 'def apply_operation(func, a, b):\n    return func(a, b)\n\nop = input()  # add or multiply\na = int(input())\nb = int(input())\n\nif op == "add":\n    print(apply_operation(lambda x, y: x + y, a, b))\nelse:\n    print(apply_operation(lambda x, y: x * y, a, b))',
        testInput: 'add\n3\n5',
        expectedOutput: '8'
      },
      {
        title: 'Closure Counter',
        description: 'Create a counter function using closures that increments by a given step each time it is called.',
        starterCode: 'def make_counter(step):\n    count = 0\n    def counter():\n        nonlocal count\n        count += step\n        return count\n    return counter\n\nstep = int(input())\ncalls = int(input())\nc = make_counter(step)\nfor _ in range(calls):\n    result = c()\nprint(result)',
        testInput: '5\n3',
        expectedOutput: '15'
      },
      {
        title: 'Map and Filter',
        description: 'Read a list of numbers, use map to square them, then filter to keep only those greater than 10. Print the result as a list.',
        starterCode: 'numbers = list(map(int, input().split()))\nsquared = list(map(lambda x: x**2, numbers))\nfiltered = list(filter(lambda x: x > 10, squared))\nprint(filtered)',
        testInput: '1 2 3 4 5',
        expectedOutput: '[16, 25]'
      }
    ],
    mcqs: [
      { question: 'What is the output of: def f(a, b=2): return a*b; print(f(3))?', options: ['6', '5', '32', 'Error'], correctAnswer: '6', explanation: 'b defaults to 2, so f(3) = 3 * 2 = 6.' },
      { question: 'What does *args represent in a function?', options: ['A list of arguments', 'A tuple of positional arguments', 'A dictionary of arguments', 'A set of arguments'], correctAnswer: 'A tuple of positional arguments', explanation: '*args collects extra positional arguments into a tuple.' },
      { question: 'What is the output of: (lambda x, y: x + y)(3, 4)?', options: ['7', '34', 'Error', 'None'], correctAnswer: '7', explanation: 'The lambda takes x and y, returns x+y. Called with 3,4 gives 7.' },
      { question: 'What does filter(None, [0, 1, "", "hi", [], [1]]) return?', options: ['[1, "hi", [1]]', '[0, 1, "", "hi", [], [1]]', '[True, True, True]', 'Error'], correctAnswer: '[1, "hi", [1]]', explanation: 'filter(None, ...) removes falsy values. 0, "", and [] are falsy.' },
      { question: 'What keyword accesses a variable in the enclosing (non-global) scope?', options: ['global', 'nonlocal', 'outer', 'enclosing'], correctAnswer: 'nonlocal', explanation: 'nonlocal allows a nested function to modify a variable in its enclosing function scope.' },
      { question: 'What is a closure?', options: ['A function inside a class', 'A function that remembers its enclosing scope', 'A function with no parameters', 'A recursive function'], correctAnswer: 'A function that remembers its enclosing scope', explanation: 'A closure is a function that retains access to variables from its enclosing scope even after the outer function has finished executing.' }
    ]
  },

  // ==================== CHAPTER 7: LISTS ====================
  lists: {
    title: 'Lists',
    notes: `## Lists in Python

Lists are **ordered, mutable** collections that can hold items of any type. They are one of the most versatile data structures in Python.

### Creating Lists

\`\`\`python
# Different ways to create lists
empty = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None]
nested = [[1, 2], [3, 4], [5, 6]]

# From other iterables
from_range = list(range(1, 6))     # [1, 2, 3, 4, 5]
from_string = list("hello")        # ['h', 'e', 'l', 'l', 'o']
from_tuple = list((1, 2, 3))       # [1, 2, 3]

# List repetition
zeros = [0] * 5  # [0, 0, 0, 0, 0]
# Warning: [[]] * 3 creates 3 references to SAME inner list!
\`\`\`

### Indexing and Slicing

\`\`\`python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Indexing (0-based)
print(fruits[0])    # "apple"
print(fruits[-1])   # "elderberry" (last element)
print(fruits[-2])   # "date"

# Slicing [start:stop:step]
print(fruits[1:4])    # ["banana", "cherry", "date"]
print(fruits[:3])     # ["apple", "banana", "cherry"]
print(fruits[2:])     # ["cherry", "date", "elderberry"]
print(fruits[::2])    # ["apple", "cherry", "elderberry"]
print(fruits[::-1])   # reversed list

# Slice assignment (modify multiple elements)
fruits[1:3] = ["blueberry", "coconut"]
print(fruits)  # ["apple", "blueberry", "coconut", "date", "elderberry"]

# Delete via slice
fruits[1:3] = []  # removes elements at index 1 and 2
\`\`\`

### List Methods

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Adding elements
nums.append(7)          # Add to end: [3,1,4,1,5,9,2,6,7]
nums.insert(0, 10)      # Insert at index: [10,3,1,4,1,5,9,2,6,7]
nums.extend([8, 0])     # Add multiple: [..., 8, 0]

# Removing elements
nums.remove(1)          # Remove first occurrence of 1
popped = nums.pop()     # Remove & return last element
popped = nums.pop(2)    # Remove & return element at index 2
nums.clear()            # Remove all elements

# Searching
nums = [3, 1, 4, 1, 5]
print(nums.index(4))    # 2 (index of first occurrence)
print(nums.count(1))    # 2 (count occurrences)
print(4 in nums)        # True

# Sorting
nums = [3, 1, 4, 1, 5, 9]
nums.sort()             # In-place sort: [1, 1, 3, 4, 5, 9]
nums.sort(reverse=True) # Descending: [9, 5, 4, 3, 1, 1]

# sorted() returns new list (doesn't modify original)
original = [3, 1, 4, 1, 5]
new_sorted = sorted(original)
print(original)    # [3, 1, 4, 1, 5] (unchanged)
print(new_sorted)  # [1, 1, 3, 4, 5]

# Sort with key function
words = ["banana", "apple", "cherry", "date"]
words.sort(key=len)  # Sort by length
print(words)  # ['date', 'apple', 'banana', 'cherry']

# Sort objects by attribute
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
students.sort(key=lambda s: s[1], reverse=True)
# [('Bob', 92), ('Alice', 85), ('Charlie', 78)]

# Reversing
nums = [1, 2, 3, 4, 5]
nums.reverse()          # In-place: [5, 4, 3, 2, 1]
rev = list(reversed(nums))  # New list
\`\`\`

### List Comprehension

\`\`\`python
# Basic comprehension
squares = [x**2 for x in range(10)]

# With filtering
evens = [x for x in range(20) if x % 2 == 0]

# With transformation and filtering
words = ["Hello", "World", "Python", "AI"]
long_lower = [w.lower() for w in words if len(w) > 3]
# ['hello', 'world', 'python']

# Nested comprehension (matrix operations)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = [[row[i] for row in matrix] for i in range(3)]
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# Flatten nested list
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### Copying Lists

\`\`\`python
# Shallow copy methods
original = [1, [2, 3], 4]
copy1 = original.copy()
copy2 = original[:]
copy3 = list(original)

# Deep copy (for nested structures)
import copy
deep = copy.deepcopy(original)

# Shallow copy pitfall
original[1][0] = 99
print(copy1)  # [1, [99, 3], 4] — inner list is shared!
print(deep)   # [1, [2, 3], 4]  — truly independent
\`\`\`

### Common List Patterns

\`\`\`python
# Remove duplicates preserving order
lst = [1, 3, 2, 3, 1, 4, 2]
unique = list(dict.fromkeys(lst))  # [1, 3, 2, 4]

# Find second largest
nums = [5, 2, 8, 1, 9, 3]
second = sorted(set(nums))[-2]  # 8

# Chunk a list
def chunk(lst, size):
    return [lst[i:i+size] for i in range(0, len(lst), size)]
print(chunk([1,2,3,4,5,6,7], 3))  # [[1,2,3], [4,5,6], [7]]
\`\`\``,
    exercises: [
      {
        title: 'Remove Duplicates',
        description: 'Read a list of numbers and print the list with duplicates removed, preserving original order.',
        starterCode: 'nums = list(map(int, input().split()))\n# Remove duplicates preserving order\nresult = list(dict.fromkeys(nums))\nprint(result)',
        testInput: '1 3 2 3 1 4 2',
        expectedOutput: '[1, 3, 2, 4]'
      },
      {
        title: 'Second Largest Element',
        description: 'Find the second largest element in a list of numbers.',
        starterCode: 'nums = list(map(int, input().split()))\n# Find second largest\nunique_sorted = sorted(set(nums), reverse=True)\nprint(unique_sorted[1])',
        testInput: '5 2 8 1 9 3 9',
        expectedOutput: '8'
      },
      {
        title: 'List Rotation',
        description: 'Rotate a list to the left by K positions. Example: [1,2,3,4,5] rotated by 2 → [3,4,5,1,2]',
        starterCode: 'nums = list(map(int, input().split()))\nk = int(input())\n# Rotate left by k\nk = k % len(nums)\nresult = nums[k:] + nums[:k]\nprint(result)',
        testInput: '1 2 3 4 5\n2',
        expectedOutput: '[3, 4, 5, 1, 2]'
      },
      {
        title: 'Flatten Nested List',
        description: 'Flatten a 2D list into a 1D list using list comprehension.',
        starterCode: 'import ast\nmatrix = ast.literal_eval(input())\n# Flatten using list comprehension\nflat = [x for row in matrix for x in row]\nprint(flat)',
        testInput: '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
        expectedOutput: '[1, 2, 3, 4, 5, 6, 7, 8, 9]'
      }
    ],
    mcqs: [
      { question: 'What does [1,2,3].append([4,5]) produce?', options: ['[1,2,3,4,5]', '[1,2,3,[4,5]]', 'Error', '[1,2,3,(4,5)]'], correctAnswer: '[1,2,3,[4,5]]', explanation: 'append() adds the entire object as a single element. Use extend() to add individual elements.' },
      { question: 'What is the difference between sort() and sorted()?', options: ['No difference', 'sort() returns new list, sorted() modifies in-place', 'sort() modifies in-place, sorted() returns new list', 'sorted() only works on strings'], correctAnswer: 'sort() modifies in-place, sorted() returns new list', explanation: 'list.sort() modifies the list in-place and returns None. sorted() creates and returns a new sorted list.' },
      { question: 'What does [1,2,3,4,5][1:4] return?', options: ['[1,2,3,4]', '[2,3,4]', '[2,3,4,5]', '[1,2,3]'], correctAnswer: '[2,3,4]', explanation: 'Slicing [1:4] returns elements at indices 1, 2, 3 (stop index is exclusive).' },
      { question: 'What is the output of: a = [1,2,3]; b = a; b.append(4); print(a)?', options: ['[1,2,3]', '[1,2,3,4]', 'Error', '[1,2,3,[4]]'], correctAnswer: '[1,2,3,4]', explanation: 'b = a creates a reference, not a copy. Both a and b point to the same list object.' },
      { question: 'How to safely copy a list?', options: ['b = a', 'b = a.copy()', 'b = a.clone()', 'b = &a'], correctAnswer: 'b = a.copy()', explanation: 'a.copy(), a[:], or list(a) create shallow copies. b = a just creates another reference to the same list.' },
      { question: 'What does [0] * 3 produce?', options: ['[0, 0, 0]', '[000]', '0', 'Error'], correctAnswer: '[0, 0, 0]', explanation: 'List repetition with * creates a new list with the element repeated n times.' }
    ]
  },

  // ==================== CHAPTER 8: TUPLES ====================
  tuples: {
    title: 'Tuples & Sets',
    notes: `## Tuples in Python

Tuples are **ordered, immutable** sequences. Once created, their elements cannot be changed, added, or removed. They are faster than lists and can be used as dictionary keys.

### Creating Tuples

\`\`\`python
# Different ways to create tuples
empty = ()
single = (42,)          # Note the comma! (42) is just an int
numbers = (1, 2, 3, 4, 5)
mixed = (1, "hello", 3.14, True)
nested = ((1, 2), (3, 4), (5, 6))

# Without parentheses (tuple packing)
coords = 10, 20, 30
print(type(coords))  # <class 'tuple'>

# From other iterables
from_list = tuple([1, 2, 3])
from_string = tuple("hello")  # ('h', 'e', 'l', 'l', 'o')
from_range = tuple(range(5))  # (0, 1, 2, 3, 4)
\`\`\`

### Tuple Immutability

\`\`\`python
t = (1, 2, 3)
# t[0] = 10  # TypeError: 'tuple' object does not support item assignment
# t.append(4)  # AttributeError: no append method

# However, if tuple contains mutable objects:
t = (1, [2, 3], 4)
t[1].append(5)  # This works! The list inside is mutable
print(t)  # (1, [2, 3, 5], 4)

# To "modify" a tuple, create a new one
t = (1, 2, 3)
t = t + (4, 5)    # (1, 2, 3, 4, 5) — new tuple
t = t[:2] + (99,) + t[3:]  # replace element at index 2
\`\`\`

### Tuple Packing and Unpacking

\`\`\`python
# Packing
point = 3, 4, 5  # tuple packing

# Unpacking
x, y, z = point
print(x, y, z)  # 3 4 5

# Swap variables (uses tuple packing/unpacking)
a, b = 1, 2
a, b = b, a  # swap!

# Extended unpacking with *
first, *middle, last = (1, 2, 3, 4, 5)
print(first)   # 1
print(middle)  # [2, 3, 4] (list, not tuple!)
print(last)    # 5

# Ignore values with _
_, y, _ = (10, 20, 30)
print(y)  # 20

# Unpacking in loops
points = [(1, 2), (3, 4), (5, 6)]
for x, y in points:
    print(f"({x}, {y})")

# Function returning multiple values (returns tuple)
def min_max(lst):
    return min(lst), max(lst)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo, hi)  # 1 9
\`\`\`

### Tuple Methods

\`\`\`python
t = (1, 2, 3, 2, 4, 2, 5)

# Only two methods (since tuples are immutable)
print(t.count(2))   # 3 (number of occurrences)
print(t.index(3))   # 2 (index of first occurrence)

# Built-in functions work with tuples
print(len(t))       # 7
print(max(t))       # 5
print(min(t))       # 1
print(sum(t))       # 19
print(sorted(t))    # [1, 2, 2, 2, 3, 4, 5] (returns list!)
\`\`\`

### Named Tuples

\`\`\`python
from collections import namedtuple

# Create a named tuple class
Point = namedtuple('Point', ['x', 'y', 'z'])
Color = namedtuple('Color', 'red green blue')  # string syntax also works

# Create instances
p = Point(3, 4, 5)
c = Color(255, 128, 0)

# Access by name or index
print(p.x, p.y, p.z)    # 3 4 5
print(p[0], p[1], p[2]) # 3 4 5

# Named tuples are still immutable
# p.x = 10  # AttributeError

# _replace creates a new instance with modified values
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4, z=5)

# Convert to dict
print(p._asdict())  # {'x': 3, 'y': 4, 'z': 5}

# Practical example
Student = namedtuple('Student', ['name', 'age', 'grade'])
students = [
    Student("Alice", 20, "A"),
    Student("Bob", 22, "B"),
    Student("Charlie", 21, "A"),
]
# Sort by grade then name
students.sort(key=lambda s: (s.grade, s.name))
\`\`\`

### Tuples vs Lists — When to Use

| Feature | Tuple | List |
|---------|-------|------|
| Mutable | No | Yes |
| Speed | Faster | Slower |
| Memory | Less | More |
| Dict key | Yes | No |
| Use case | Fixed data | Dynamic data |

\`\`\`python
# Tuples as dictionary keys (lists can't be used as keys)
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London",
}

# Tuples for fixed-structure data
rgb = (255, 128, 0)
date = (2024, 1, 15)
\`\`\`

### Sets (Bonus - Related to Tuples page)

\`\`\`python
# Sets: unordered, unique elements, mutable
s = {1, 2, 3, 4, 5}
s.add(6)
s.remove(3)  # raises KeyError if not found
s.discard(3) # no error if not found

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)  # Union: {1, 2, 3, 4, 5, 6}
print(a & b)  # Intersection: {3, 4}
print(a - b)  # Difference: {1, 2}
print(a ^ b)  # Symmetric difference: {1, 2, 5, 6}

# frozenset: immutable set (can be used as dict key)
fs = frozenset([1, 2, 3])
\`\`\``,
    exercises: [
      {
        title: 'Tuple Unpacking',
        description: 'Read 3 numbers, store in a tuple, unpack into variables, and print their sum.',
        starterCode: 'a, b, c = map(int, input().split())\nt = (a, b, c)\nx, y, z = t\nprint(x + y + z)',
        testInput: '10 20 30',
        expectedOutput: '60'
      },
      {
        title: 'Named Tuple Student',
        description: 'Create a named tuple for Student with name and grade. Read data and print the student with highest grade.',
        starterCode: 'from collections import namedtuple\n\nStudent = namedtuple("Student", ["name", "grade"])\nn = int(input())\nstudents = []\nfor _ in range(n):\n    name, grade = input().split()\n    students.append(Student(name, int(grade)))\n\nbest = max(students, key=lambda s: s.grade)\nprint(f"{best.name} {best.grade}")',
        testInput: '3\nAlice 85\nBob 92\nCharlie 78',
        expectedOutput: 'Bob 92'
      },
      {
        title: 'Set Operations',
        description: 'Read two sets of numbers and print their union, intersection, and difference.',
        starterCode: 'set1 = set(map(int, input().split()))\nset2 = set(map(int, input().split()))\nprint(sorted(set1 | set2))\nprint(sorted(set1 & set2))\nprint(sorted(set1 - set2))',
        testInput: '1 2 3 4 5\n4 5 6 7 8',
        expectedOutput: '[1, 2, 3, 4, 5, 6, 7, 8]\n[4, 5]\n[1, 2, 3]'
      }
    ],
    mcqs: [
      { question: 'How do you create a single-element tuple?', options: ['(1)', 'tuple(1)', '(1,)', '[1]'], correctAnswer: '(1,)', explanation: '(1) is just the integer 1 in parentheses. You need a trailing comma: (1,) to make it a tuple.' },
      { question: 'Can tuples be used as dictionary keys?', options: ['Yes, always', 'No, never', 'Only if they contain immutable elements', 'Only single-element tuples'], correctAnswer: 'Only if they contain immutable elements', explanation: 'Tuples can be dict keys only if all their elements are hashable (immutable). A tuple containing a list cannot be a key.' },
      { question: 'What does a, *b, c = (1,2,3,4,5) assign to b?', options: ['(2,3,4)', '[2,3,4]', '2,3,4', 'Error'], correctAnswer: '[2,3,4]', explanation: 'Extended unpacking with * always creates a list, even when unpacking a tuple.' },
      { question: 'Which is faster for iteration?', options: ['List', 'Tuple', 'Same speed', 'Depends on size'], correctAnswer: 'Tuple', explanation: 'Tuples are slightly faster than lists for iteration because they are immutable and have a simpler internal structure.' },
      { question: 'What does tuple([1,2,3]) return?', options: ['[1,2,3]', '(1,2,3)', '{1,2,3}', 'Error'], correctAnswer: '(1,2,3)', explanation: 'tuple() converts any iterable to a tuple. A list [1,2,3] becomes tuple (1,2,3).' },
      { question: 'What is frozenset?', options: ['A frozen list', 'An immutable set', 'A sorted set', 'A named tuple'], correctAnswer: 'An immutable set', explanation: 'frozenset is an immutable version of set. It cannot be modified after creation and can be used as a dictionary key.' }
    ]
  },

  // ==================== CHAPTER 9: DICTIONARIES ====================
  dictionaries: {
    title: 'Dictionaries',
    notes: `## Dictionaries in Python

Dictionaries are **unordered (insertion-ordered since 3.7), mutable** collections of key-value pairs. Keys must be unique and hashable (immutable types).

### Creating Dictionaries

\`\`\`python
# Different ways to create dictionaries
empty = {}
person = {"name": "Alice", "age": 25, "city": "NYC"}
from_pairs = dict([("a", 1), ("b", 2), ("c", 3)])
from_kwargs = dict(name="Bob", age=30)
from_keys = dict.fromkeys(["a", "b", "c"], 0)  # {'a': 0, 'b': 0, 'c': 0}

# Keys can be any immutable type
d = {
    1: "integer key",
    3.14: "float key",
    "name": "string key",
    (1, 2): "tuple key",
    True: "bool key (same as 1!)",
}
\`\`\`

### Accessing Values

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "NYC"}

# Direct access (raises KeyError if key doesn't exist)
print(person["name"])  # "Alice"
# print(person["email"])  # KeyError!

# get() method (returns None or default if key doesn't exist)
print(person.get("name"))       # "Alice"
print(person.get("email"))      # None
print(person.get("email", "N/A"))  # "N/A" (custom default)

# Check if key exists
print("name" in person)     # True
print("email" in person)    # False
print("Alice" in person)    # False (checks keys, not values)
\`\`\`

### Modifying Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 25}

# Add/Update single key
person["email"] = "alice@example.com"  # Add new key
person["age"] = 26                      # Update existing

# update() - merge another dict
person.update({"city": "NYC", "age": 27})
# Python 3.9+: merge operator
merged = person | {"phone": "123-456"}

# setdefault() - get value or set default if missing
person.setdefault("country", "USA")  # Sets and returns "USA"
person.setdefault("name", "Bob")     # Returns "Alice" (already exists)

# Remove elements
del person["email"]              # Remove key (KeyError if missing)
age = person.pop("age")         # Remove and return value
age = person.pop("age", None)   # No error if missing
last = person.popitem()         # Remove and return last inserted pair
person.clear()                  # Remove all items
\`\`\`

### Dictionary Methods

\`\`\`python
d = {"a": 1, "b": 2, "c": 3}

# Views (dynamic — reflect changes to dict)
print(d.keys())    # dict_keys(['a', 'b', 'c'])
print(d.values())  # dict_values([1, 2, 3])
print(d.items())   # dict_items([('a', 1), ('b', 2), ('c', 3)])

# Iteration
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(f"{key}: {value}")

# Copy
shallow = d.copy()
import copy
deep = copy.deepcopy(d)  # for nested dicts
\`\`\`

### Dictionary Comprehension

\`\`\`python
# Basic comprehension
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Swap keys and values
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}

# From two lists
keys = ["name", "age", "city"]
values = ["Alice", 25, "NYC"]
person = {k: v for k, v in zip(keys, values)}
# or simply: dict(zip(keys, values))

# Word frequency counter
text = "hello world hello python hello"
freq = {}
for word in text.split():
    freq[word] = freq.get(word, 0) + 1
# {'hello': 3, 'world': 1, 'python': 1}

# Using Counter (better approach)
from collections import Counter
freq = Counter(text.split())
print(freq.most_common(2))  # [('hello', 3), ('world', 1)]
\`\`\`

### Nested Dictionaries

\`\`\`python
# Nested dict
students = {
    "alice": {"age": 20, "grades": [85, 90, 92]},
    "bob": {"age": 22, "grades": [78, 82, 88]},
}

# Access nested values
print(students["alice"]["grades"][0])  # 85

# Modify nested values
students["alice"]["grades"].append(95)

# Iterate nested dict
for name, info in students.items():
    avg = sum(info["grades"]) / len(info["grades"])
    print(f"{name}: avg = {avg:.1f}")
\`\`\`

### defaultdict and OrderedDict

\`\`\`python
from collections import defaultdict, OrderedDict

# defaultdict - auto-creates default values for missing keys
word_groups = defaultdict(list)
words = ["apple", "banana", "avocado", "blueberry", "cherry"]
for word in words:
    word_groups[word[0]].append(word)
print(dict(word_groups))
# {'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}

# defaultdict with int (counter pattern)
counter = defaultdict(int)
for char in "hello world":
    counter[char] += 1

# defaultdict with set
graph = defaultdict(set)
edges = [(1, 2), (1, 3), (2, 3), (3, 4)]
for u, v in edges:
    graph[u].add(v)
    graph[v].add(u)
\`\`\`

### Common Dictionary Patterns

\`\`\`python
# Merge multiple dicts
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}
merged = {**d1, **d2}  # {'a': 1, 'b': 3, 'c': 4}

# Sort dict by value
scores = {"Alice": 85, "Bob": 92, "Charlie": 78}
sorted_scores = dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))
# {'Bob': 92, 'Alice': 85, 'Charlie': 78}

# Group by
from itertools import groupby
data = [("A", 1), ("B", 2), ("A", 3), ("B", 4)]
groups = defaultdict(list)
for key, val in data:
    groups[key].append(val)
# {'A': [1, 3], 'B': [2, 4]}
\`\`\``,
    exercises: [
      {
        title: 'Word Frequency Counter',
        description: 'Read a sentence and count the frequency of each word. Print each word and its count sorted alphabetically.',
        starterCode: 'sentence = input().lower()\nwords = sentence.split()\nfreq = {}\nfor word in words:\n    freq[word] = freq.get(word, 0) + 1\nfor word in sorted(freq):\n    print(f"{word}: {freq[word]}")',
        testInput: 'hello world hello python hello world',
        expectedOutput: 'hello: 3\npython: 1\nworld: 2'
      },
      {
        title: 'Dictionary Merge',
        description: 'Read two dictionaries (as key:value pairs) and merge them. If a key exists in both, sum the values.',
        starterCode: 'import ast\nd1 = ast.literal_eval(input())\nd2 = ast.literal_eval(input())\n# Merge with sum for common keys\nresult = d1.copy()\nfor k, v in d2.items():\n    result[k] = result.get(k, 0) + v\nprint(result)',
        testInput: '{"a": 1, "b": 2, "c": 3}\n{"b": 3, "c": 4, "d": 5}',
        expectedOutput: "{\'a\': 1, \'b\': 5, \'c\': 7, \'d\': 5}"
      },
      {
        title: 'Invert Dictionary',
        description: 'Read a dictionary and invert it (swap keys and values). Assume all values are unique.',
        starterCode: 'import ast\nd = ast.literal_eval(input())\n# Invert the dictionary\ninverted = {v: k for k, v in d.items()}\nprint(inverted)',
        testInput: '{"a": 1, "b": 2, "c": 3}',
        expectedOutput: "{1: \'a\', 2: \'b\', 3: \'c\'}"
      }
    ],
    mcqs: [
      { question: 'What happens when you access a non-existent key with d["key"]?', options: ['Returns None', 'Returns 0', 'Raises KeyError', 'Creates the key'], correctAnswer: 'Raises KeyError', explanation: 'Direct bracket access raises KeyError for missing keys. Use d.get("key") to safely return None instead.' },
      { question: 'What does d.get("x", 10) return if "x" is not in d?', options: ['None', 'KeyError', '10', '0'], correctAnswer: '10', explanation: 'get() returns the second argument (default value) when the key is not found. Here it returns 10.' },
      { question: 'Can a list be used as a dictionary key?', options: ['Yes', 'No', 'Only empty lists', 'Only single-element lists'], correctAnswer: 'No', explanation: 'Dictionary keys must be hashable (immutable). Lists are mutable and unhashable. Use tuples instead.' },
      { question: 'What does dict.fromkeys(["a","b","c"], 0) create?', options: ['{"a":0, "b":0, "c":0}', '[("a",0),("b",0)]', '{"a":"b":"c": 0}', 'Error'], correctAnswer: '{"a":0, "b":0, "c":0}', explanation: 'fromkeys() creates a dict with given keys all set to the same default value.' },
      { question: 'What is the output of: {**{"a":1}, **{"a":2}}?', options: ['{"a": 1}', '{"a": 2}', '{"a": [1,2]}', 'Error'], correctAnswer: '{"a": 2}', explanation: 'When merging dicts with **, later values overwrite earlier ones for duplicate keys.' },
      { question: 'What does popitem() do?', options: ['Removes first item', 'Removes last inserted item', 'Removes random item', 'Removes all items'], correctAnswer: 'Removes last inserted item', explanation: 'Since Python 3.7, popitem() removes and returns the last inserted key-value pair (LIFO order).' }
    ]
  },

  // ==================== CHAPTER 10: OOP ====================
  oop: {
    title: 'OOP Concepts',
    notes: `## Object-Oriented Programming in Python

OOP is a programming paradigm that organizes code into objects — instances of classes that bundle data (attributes) and behavior (methods) together.

### Classes and Objects

\`\`\`python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    # Constructor (initializer)
    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    # String representation
    def __str__(self):
        return f"{self.name}, {self.age} years old"
    
    def __repr__(self):
        return f"Dog('{self.name}', {self.age})"

# Create objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.bark())       # Buddy says Woof!
print(dog1.species)      # Canis familiaris
print(Dog.species)       # Canis familiaris (access via class)
\`\`\`

### The self Parameter
- \`self\` refers to the current instance of the class
- It must be the first parameter of every instance method
- Python passes it automatically when you call a method

### Inheritance

\`\`\`python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound
    
    def speak(self):
        return f"{self.name} says {self.sound}!"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")  # Call parent constructor
        self.breed = breed
    
    def fetch(self):
        return f"{self.name} fetches the ball!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")
    
    def purr(self):
        return f"{self.name} purrs..."

# Multiple inheritance
class GuideDog(Dog):
    def __init__(self, name, breed, owner):
        super().__init__(name, breed)
        self.owner = owner
    
    def guide(self):
        return f"{self.name} guides {self.owner}"

dog = Dog("Rex", "German Shepherd")
print(dog.speak())   # Rex says Woof!
print(dog.fetch())   # Rex fetches the ball!

# isinstance and issubclass
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(issubclass(Dog, Animal))  # True
\`\`\`

### Polymorphism

\`\`\`python
# Same interface, different implementations
class Shape:
    def area(self):
        raise NotImplementedError("Subclass must implement")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

# Polymorphic behavior
shapes = [Circle(5), Rectangle(3, 4), Circle(2)]
for shape in shapes:
    print(f"Area: {shape.area():.2f}")
# Area: 78.54, Area: 12.00, Area: 12.57
\`\`\`

### Encapsulation

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner          # Public
        self._balance = balance     # Protected (convention)
        self.__pin = "1234"         # Private (name mangling)
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self):
        return self._balance

acc = BankAccount("Alice", 1000)
acc.deposit(500)
print(acc.get_balance())  # 1500

# Name mangling: __pin becomes _BankAccount__pin
# print(acc.__pin)  # AttributeError
print(acc._BankAccount__pin)  # "1234" (still accessible, but discouraged)
\`\`\`

### @property Decorator

\`\`\`python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0
temp.fahrenheit = 100
print(temp.celsius)     # 37.78
\`\`\`

### Magic (Dunder) Methods

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2
print(v3)        # Vector(4, 6)
print(len(v1))   # 5
print(v1 == v2)  # False
\`\`\`

### Abstract Classes

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass
    
    def description(self):  # Concrete method
        return f"I am a {self.__class__.__name__}"

# shape = Shape()  # TypeError: Can't instantiate abstract class

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius
\`\`\``,
    exercises: [
      {
        title: 'Create a Student Class',
        description: 'Create a Student class with name and grades (list). Add a method average() that returns the average grade. Read student data and print the average.',
        starterCode: 'class Student:\n    def __init__(self, name, grades):\n        self.name = name\n        self.grades = grades\n    \n    def average(self):\n        return sum(self.grades) / len(self.grades)\n\nname = input()\ngrades = list(map(int, input().split()))\ns = Student(name, grades)\nprint(f"{s.name}: {s.average():.1f}")',
        testInput: 'Alice\n85 90 92 88',
        expectedOutput: 'Alice: 88.8'
      },
      {
        title: 'Inheritance - Shape Hierarchy',
        description: 'Create a Shape base class and Circle subclass. Calculate and print the area of a circle given its radius.',
        starterCode: 'class Shape:\n    def area(self):\n        return 0\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return 3.14159 * self.radius ** 2\n\nr = float(input())\nc = Circle(r)\nprint(f"{c.area():.2f}")',
        testInput: '5',
        expectedOutput: '78.54'
      },
      {
        title: 'Bank Account with Encapsulation',
        description: 'Create a BankAccount class with deposit and withdraw methods. Ensure balance cannot go negative.',
        starterCode: 'class BankAccount:\n    def __init__(self, balance=0):\n        self._balance = balance\n    \n    def deposit(self, amount):\n        self._balance += amount\n    \n    def withdraw(self, amount):\n        if amount <= self._balance:\n            self._balance -= amount\n            return True\n        return False\n    \n    def get_balance(self):\n        return self._balance\n\nacc = BankAccount(1000)\nops = input().split()\nfor op in ops:\n    action, amount = op.split(":")\n    if action == "D":\n        acc.deposit(int(amount))\n    elif action == "W":\n        acc.withdraw(int(amount))\nprint(acc.get_balance())',
        testInput: 'D:500 W:200 W:2000 D:100',
        expectedOutput: '1400'
      }
    ],
    mcqs: [
      { question: 'What is the purpose of __init__ in a class?', options: ['To destroy an object', 'To initialize object attributes', 'To create a class', 'To import modules'], correctAnswer: 'To initialize object attributes', explanation: '__init__ is the constructor method called automatically when an object is created. It initializes the instance attributes.' },
      { question: 'What does "self" refer to?', options: ['The class itself', 'The current instance', 'The parent class', 'A global variable'], correctAnswer: 'The current instance', explanation: 'self refers to the current instance of the class, allowing access to its attributes and methods.' },
      { question: 'What is the output of isinstance(True, int)?', options: ['True', 'False', 'Error', 'None'], correctAnswer: 'True', explanation: 'bool is a subclass of int in Python. True is essentially 1 and False is 0.' },
      { question: 'How do you make a method private in Python?', options: ['Using private keyword', 'Prefix with __', 'Prefix with #', 'Using @private decorator'], correctAnswer: 'Prefix with __', explanation: 'Double underscore prefix triggers name mangling (__method becomes _ClassName__method), making it harder to access from outside.' },
      { question: 'What is polymorphism?', options: ['Multiple inheritance', 'Same method name, different implementations', 'Hiding data', 'Creating objects'], correctAnswer: 'Same method name, different implementations', explanation: 'Polymorphism allows different classes to have methods with the same name but different behaviors.' },
      { question: 'What does super().__init__() do?', options: ['Creates a new class', 'Calls the parent class constructor', 'Destroys the object', 'Makes method static'], correctAnswer: 'Calls the parent class constructor', explanation: 'super() returns a proxy object of the parent class, allowing you to call its methods including __init__.' }
    ]
  },

  // ==================== CHAPTER 11: FILE HANDLING ====================
  'file-handling': {
    title: 'File Handling',
    notes: `## File Handling in Python

Python provides built-in functions to create, read, write, and manipulate files. The \`with\` statement ensures proper resource management.

### Opening Files

\`\`\`python
# Modes:
# 'r'  - Read (default). Error if file doesn't exist
# 'w'  - Write. Creates file or truncates existing
# 'a'  - Append. Creates file if doesn't exist
# 'x'  - Exclusive creation. Error if file exists
# 'b'  - Binary mode (add to other modes: 'rb', 'wb')
# '+'  - Read and write ('r+', 'w+', 'a+')

# Basic open/close
f = open("file.txt", "r")
content = f.read()
f.close()  # Must close manually!

# Using 'with' statement (RECOMMENDED - auto-closes)
with open("file.txt", "r") as f:
    content = f.read()
# File is automatically closed here, even if exception occurs
\`\`\`

### Reading Files

\`\`\`python
# Read entire file as string
with open("file.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("file.txt", "r") as f:
    line = f.readline()      # Read one line
    while line:
        print(line.strip())  # strip() removes \\n
        line = f.readline()

# Read all lines into a list
with open("file.txt", "r") as f:
    lines = f.readlines()    # ['line1\\n', 'line2\\n', ...]

# Iterate line by line (memory efficient for large files)
with open("file.txt", "r") as f:
    for line in f:           # f is iterable!
        print(line.strip())

# Read specific number of characters
with open("file.txt", "r") as f:
    chunk = f.read(100)      # Read first 100 characters
\`\`\`

### Writing Files

\`\`\`python
# Write (creates new or overwrites existing)
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Second line\\n")

# Write multiple lines
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)

# Append to existing file
with open("output.txt", "a") as f:
    f.write("Appended line\\n")

# Write with print()
with open("output.txt", "w") as f:
    print("Hello", file=f)
    print("World", file=f)
\`\`\`

### Working with CSV Files

\`\`\`python
import csv

# Writing CSV
with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age", "City"])  # Header
    writer.writerow(["Alice", 25, "NYC"])
    writer.writerow(["Bob", 30, "LA"])
    
    # Write multiple rows
    rows = [["Charlie", 35, "Chicago"], ["Diana", 28, "Boston"]]
    writer.writerows(rows)

# Reading CSV
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    for row in reader:
        name, age, city = row
        print(f"{name} ({age}) - {city}")

# DictReader/DictWriter (access by column name)
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Name"], row["Age"])

with open("output.csv", "w", newline="") as f:
    fieldnames = ["name", "score"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({"name": "Alice", "score": 95})
\`\`\`

### Working with JSON Files

\`\`\`python
import json

# Python dict to JSON file
data = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding"],
    "address": {"city": "NYC", "zip": "10001"}
}

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)  # indent for pretty printing

# Read JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # "Alice"

# JSON string operations
json_str = json.dumps(data, indent=2)  # dict → JSON string
parsed = json.loads(json_str)           # JSON string → dict

# Handle custom objects
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

def student_encoder(obj):
    if isinstance(obj, Student):
        return {"name": obj.name, "grade": obj.grade}
    raise TypeError(f"Object not serializable")

s = Student("Alice", "A")
json_str = json.dumps(s, default=student_encoder)
\`\`\`

### os Module - File System Operations

\`\`\`python
import os
import shutil

# Current directory
print(os.getcwd())

# List directory contents
print(os.listdir("."))
print(os.listdir("/home/user"))

# Check existence
print(os.path.exists("file.txt"))
print(os.path.isfile("file.txt"))
print(os.path.isdir("folder"))

# File info
print(os.path.getsize("file.txt"))  # Size in bytes
print(os.path.basename("/path/to/file.txt"))  # "file.txt"
print(os.path.dirname("/path/to/file.txt"))   # "/path/to"
print(os.path.join("folder", "sub", "file.txt"))  # "folder/sub/file.txt"

# Create/Remove directories
os.mkdir("new_folder")
os.makedirs("path/to/nested/folder", exist_ok=True)
os.rmdir("empty_folder")
shutil.rmtree("folder_with_contents")

# Rename/Move
os.rename("old.txt", "new.txt")
shutil.move("file.txt", "folder/file.txt")
shutil.copy("src.txt", "dest.txt")

# Walk directory tree
for root, dirs, files in os.walk("."):
    for file in files:
        filepath = os.path.join(root, file)
        print(filepath)
\`\`\`

### pathlib (Modern Alternative)

\`\`\`python
from pathlib import Path

# Create path objects
p = Path("folder/file.txt")
home = Path.home()
cwd = Path.cwd()

# Path operations
print(p.name)       # "file.txt"
print(p.stem)       # "file"
print(p.suffix)     # ".txt"
print(p.parent)     # "folder"
print(p.exists())   # True/False

# Read/Write with pathlib
content = Path("file.txt").read_text()
Path("output.txt").write_text("Hello!")

# Glob pattern matching
for py_file in Path(".").glob("**/*.py"):
    print(py_file)
\`\`\``,
    exercises: [
      {
        title: 'Line Counter',
        description: 'Simulate reading a file: given multi-line input, count the number of lines, words, and characters.',
        starterCode: 'import sys\nlines = []\nwhile True:\n    try:\n        line = input()\n        lines.append(line)\n    except EOFError:\n        break\n\nnum_lines = len(lines)\nnum_words = sum(len(line.split()) for line in lines)\nnum_chars = sum(len(line) for line in lines)\nprint(f"Lines: {num_lines}")\nprint(f"Words: {num_words}")\nprint(f"Characters: {num_chars}")',
        testInput: 'Hello World\nPython is great\nFile handling',
        expectedOutput: 'Lines: 3\nWords: 7\nCharacters: 38'
      },
      {
        title: 'CSV Parser',
        description: 'Parse CSV-formatted input (first line is header) and print each record as "Name: X, Age: Y".',
        starterCode: 'header = input().split(",")\nrecords = []\nwhile True:\n    try:\n        line = input()\n        if line:\n            records.append(line.split(","))\n    except EOFError:\n        break\n\nfor record in records:\n    print(f"Name: {record[0]}, Age: {record[1]}")',
        testInput: 'Name,Age\nAlice,25\nBob,30',
        expectedOutput: 'Name: Alice, Age: 25\nName: Bob, Age: 30'
      },
      {
        title: 'JSON Processor',
        description: 'Read a JSON string, parse it, and print specific fields.',
        starterCode: 'import json\n\njson_str = input()\ndata = json.loads(json_str)\nprint(f"Name: {data[\'name\']}")\nprint(f"Age: {data[\'age\']}")',
        testInput: '{"name": "Alice", "age": 25, "city": "NYC"}',
        expectedOutput: 'Name: Alice\nAge: 25'
      }
    ],
    mcqs: [
      { question: 'What does the "with" statement do for file handling?', options: ['Opens file faster', 'Automatically closes the file', 'Encrypts the file', 'Creates a backup'], correctAnswer: 'Automatically closes the file', explanation: 'The "with" statement ensures the file is properly closed after the block executes, even if an exception occurs.' },
      { question: 'What mode opens a file for writing and creates it if it doesn\'t exist?', options: ['"r"', '"w"', '"x"', '"r+"'], correctAnswer: '"w"', explanation: '"w" mode opens for writing, creates the file if it doesn\'t exist, and truncates (empties) it if it does exist.' },
      { question: 'What is the difference between json.dump() and json.dumps()?', options: ['No difference', 'dump writes to file, dumps returns string', 'dumps writes to file, dump returns string', 'dump is for lists, dumps for dicts'], correctAnswer: 'dump writes to file, dumps returns string', explanation: 'json.dump() writes JSON to a file object. json.dumps() returns a JSON-formatted string (s = string).' },
      { question: 'Which method reads all lines into a list?', options: ['read()', 'readline()', 'readlines()', 'readall()'], correctAnswer: 'readlines()', explanation: 'readlines() reads all lines and returns them as a list of strings (each ending with \\n).' },
      { question: 'What does "a" mode do?', options: ['Reads file', 'Overwrites file', 'Appends to file', 'Creates new file only'], correctAnswer: 'Appends to file', explanation: '"a" (append) mode adds content to the end of the file without erasing existing content. Creates file if it doesn\'t exist.' },
      { question: 'What does os.path.join("a", "b", "c.txt") return on Linux?', options: ['a/b/c.txt', 'a\\\\b\\\\c.txt', 'abc.txt', '/a/b/c.txt'], correctAnswer: 'a/b/c.txt', explanation: 'os.path.join() creates platform-appropriate paths. On Linux/Mac it uses forward slashes.' }
    ]
  },

  // ==================== CHAPTER 12: EXCEPTIONS ====================
  exceptions: {
    title: 'Exception Handling',
    notes: `## Exception Handling in Python

Exceptions are errors that occur during program execution. Python provides a robust mechanism to handle these errors gracefully using try/except blocks.

### Basic try/except

\`\`\`python
# Without exception handling — program crashes
# result = 10 / 0  # ZeroDivisionError

# With exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple exceptions
try:
    num = int(input("Enter a number: "))
    result = 100 / num
except ValueError:
    print("Invalid input! Not a number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple in one line
try:
    # risky code
    pass
except (ValueError, TypeError, KeyError) as e:
    print(f"Error: {e}")

# Catch ALL exceptions (use sparingly)
try:
    # risky code
    pass
except Exception as e:
    print(f"Something went wrong: {e}")
\`\`\`

### try/except/else/finally

\`\`\`python
try:
    num = int(input("Enter number: "))
    result = 100 / num
except ValueError:
    print("Not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    # Runs ONLY if no exception occurred
    print(f"Result: {result}")
finally:
    # ALWAYS runs, regardless of exception
    print("Execution complete.")

# finally is useful for cleanup
def read_file(filename):
    f = None
    try:
        f = open(filename, 'r')
        return f.read()
    except FileNotFoundError:
        return "File not found"
    finally:
        if f:
            f.close()  # Always close the file
\`\`\`

### Raising Exceptions

\`\`\`python
# raise keyword throws an exception
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    if age > 150:
        raise ValueError("Age seems unrealistic!")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(e)  # "Age cannot be negative!"

# Re-raise an exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Logging error...")
    raise  # Re-raises the same exception

# Raise with custom message
raise TypeError("Expected string, got int")
\`\`\`

### Custom Exceptions

\`\`\`python
# Create custom exception classes
class ValidationError(Exception):
    """Custom exception for validation errors"""
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw {amount}. Balance: {balance}"
        )

# Using custom exceptions
class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

try:
    acc = BankAccount(100)
    acc.withdraw(150)
except InsufficientFundsError as e:
    print(e)  # Cannot withdraw 150. Balance: 100
    print(f"Short by: {e.amount - e.balance}")
\`\`\`

### Exception Hierarchy

\`\`\`python
# Python's exception hierarchy (partial):
# BaseException
#  ├── SystemExit
#  ├── KeyboardInterrupt
#  ├── GeneratorExit
#  └── Exception
#       ├── StopIteration
#       ├── ArithmeticError
#       │    ├── ZeroDivisionError
#       │    ├── OverflowError
#       │    └── FloatingPointError
#       ├── LookupError
#       │    ├── IndexError
#       │    └── KeyError
#       ├── TypeError
#       ├── ValueError
#       ├── AttributeError
#       ├── NameError
#       ├── OSError
#       │    ├── FileNotFoundError
#       │    ├── PermissionError
#       │    └── FileExistsError
#       └── RuntimeError
#            └── RecursionError

# Order matters! Catch specific before general
try:
    x = int("abc")
except Exception:
    print("General")  # This catches everything!
except ValueError:
    print("Value")    # Never reached!

# Correct order:
try:
    x = int("abc")
except ValueError:
    print("Value")    # Specific first
except Exception:
    print("General")  # General last
\`\`\`

### Context Managers and Exception Safety

\`\`\`python
# Custom context manager
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # Return True to suppress exception, False to propagate
        return False

# Using contextlib
from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Acquiring {name}")
    try:
        yield name
    finally:
        print(f"Releasing {name}")

with managed_resource("database") as r:
    print(f"Using {r}")
\`\`\`

### Best Practices

\`\`\`python
# 1. Be specific with exceptions
# Bad:
try:
    do_something()
except:  # Catches EVERYTHING including KeyboardInterrupt
    pass

# Good:
try:
    do_something()
except (ValueError, TypeError) as e:
    handle_error(e)

# 2. EAFP vs LBYL
# LBYL (Look Before You Leap)
if key in dictionary:
    value = dictionary[key]

# EAFP (Easier to Ask Forgiveness than Permission) — Pythonic!
try:
    value = dictionary[key]
except KeyError:
    value = default_value

# 3. Don't use exceptions for flow control
# Bad: using exception as if-else
try:
    return items[index]
except IndexError:
    return None

# Better:
return items[index] if index < len(items) else None
\`\`\``,
    exercises: [
      {
        title: 'Safe Division',
        description: 'Read two numbers and perform division. Handle ZeroDivisionError and ValueError gracefully.',
        starterCode: 'try:\n    a = int(input())\n    b = int(input())\n    result = a / b\n    print(f"{result:.2f}")\nexcept ZeroDivisionError:\n    print("Error: Division by zero")\nexcept ValueError:\n    print("Error: Invalid input")',
        testInput: '10\n0',
        expectedOutput: 'Error: Division by zero'
      },
      {
        title: 'Custom Exception',
        description: 'Create a custom AgeError exception. Validate that age is between 0 and 150.',
        starterCode: 'class AgeError(Exception):\n    pass\n\ndef validate_age(age):\n    if age < 0 or age > 150:\n        raise AgeError(f"Invalid age: {age}")\n    return age\n\ntry:\n    age = int(input())\n    validate_age(age)\n    print(f"Valid age: {age}")\nexcept AgeError as e:\n    print(e)',
        testInput: '-5',
        expectedOutput: 'Invalid age: -5'
      },
      {
        title: 'Robust Input Parser',
        description: 'Keep asking for a valid integer until one is provided. Use a while loop with try/except.',
        starterCode: 'inputs = input().split()\nfor val in inputs:\n    try:\n        num = int(val)\n        print(f"Valid: {num}")\n        break\n    except ValueError:\n        print(f"Invalid: {val}")',
        testInput: 'abc 3.14 42 hello',
        expectedOutput: 'Invalid: abc\nInvalid: 3.14\nValid: 42'
      }
    ],
    mcqs: [
      { question: 'When does the "else" block execute in try/except/else?', options: ['Always', 'When an exception occurs', 'When no exception occurs', 'After finally'], correctAnswer: 'When no exception occurs', explanation: 'The else block runs only if the try block completes without raising any exception.' },
      { question: 'When does "finally" execute?', options: ['Only on success', 'Only on exception', 'Always', 'Never with else'], correctAnswer: 'Always', explanation: 'finally always executes regardless of whether an exception occurred or not. It is used for cleanup code.' },
      { question: 'What does "raise" without arguments do?', options: ['Raises TypeError', 'Re-raises the current exception', 'Does nothing', 'Raises RuntimeError'], correctAnswer: 'Re-raises the current exception', explanation: 'A bare "raise" inside an except block re-raises the exception that was caught, preserving the original traceback.' },
      { question: 'Which exception is parent of all built-in exceptions?', options: ['Exception', 'BaseException', 'Error', 'RuntimeError'], correctAnswer: 'BaseException', explanation: 'BaseException is the root of all exceptions. Exception is a subclass that covers most errors except SystemExit, KeyboardInterrupt, and GeneratorExit.' },
      { question: 'What is EAFP in Python?', options: ['Error And Failure Prevention', 'Easier to Ask Forgiveness than Permission', 'Exception Aware Function Protocol', 'Error-free Application Framework Pattern'], correctAnswer: 'Easier to Ask Forgiveness than Permission', explanation: 'EAFP is a Python coding style that uses try/except instead of checking conditions first (LBYL). It is considered more Pythonic.' },
      { question: 'What happens if you catch Exception before ValueError?', options: ['Both execute', 'Only ValueError executes', 'Only Exception executes', 'SyntaxError'], correctAnswer: 'Only Exception executes', explanation: 'Since ValueError is a subclass of Exception, the Exception handler catches it first. Always put specific exceptions before general ones.' }
    ]
  },

  // ==================== CHAPTER 13: LAMBDA ====================
  lambda: {
    title: 'Lambda & Functional Programming',
    notes: `## Lambda Functions & Functional Programming

Lambda functions are small, anonymous functions defined with the \`lambda\` keyword. Combined with map(), filter(), and reduce(), they enable a functional programming style in Python.

### Lambda Syntax

\`\`\`python
# Syntax: lambda arguments: expression
# - Can have any number of arguments
# - Can only have ONE expression (no statements)
# - Automatically returns the expression result

# Basic examples
square = lambda x: x ** 2
add = lambda a, b: a + b
greet = lambda name: f"Hello, {name}!"

print(square(5))       # 25
print(add(3, 4))       # 7
print(greet("Alice"))  # Hello, Alice!

# Lambda with conditional
classify = lambda x: "positive" if x > 0 else "negative" if x < 0 else "zero"
print(classify(-3))  # negative

# Lambda with multiple operations (using tuple trick)
swap = lambda a, b: (b, a)
print(swap(1, 2))  # (2, 1)

# Immediately invoked lambda
result = (lambda x, y: x + y)(3, 4)
print(result)  # 7
\`\`\`

### When to Use Lambda vs def

\`\`\`python
# Use lambda for:
# - Short, one-time-use functions
# - Arguments to higher-order functions (map, filter, sorted)
# - Simple transformations

# Use def for:
# - Complex logic (multiple lines)
# - Functions that need docstrings
# - Functions used multiple times
# - Functions with error handling

# Good lambda use
sorted_words = sorted(["banana", "apple", "cherry"], key=lambda w: len(w))

# Bad lambda use (too complex, use def instead)
# complex = lambda x: x if x > 0 else -x if x < -10 else 0  # Hard to read!
def classify(x):
    if x > 0:
        return x
    elif x < -10:
        return -x
    return 0
\`\`\`

### map() Function

\`\`\`python
# map(function, iterable) - applies function to every item
# Returns a map object (lazy iterator)

numbers = [1, 2, 3, 4, 5]

# Square all numbers
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Convert strings to integers
str_nums = ["1", "2", "3", "4"]
int_nums = list(map(int, str_nums))
print(int_nums)  # [1, 2, 3, 4]

# map with multiple iterables
a = [1, 2, 3]
b = [4, 5, 6]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [5, 7, 9]

# map with named function
def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

temps_c = [0, 20, 37, 100]
temps_f = list(map(celsius_to_fahrenheit, temps_c))
print(temps_f)  # [32.0, 68.0, 98.6, 212.0]

# Equivalent list comprehension (often preferred)
squared = [x**2 for x in numbers]  # More readable
\`\`\`

### filter() Function

\`\`\`python
# filter(function, iterable) - keeps items where function returns True
# Returns a filter object (lazy iterator)

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Keep non-empty strings
words = ["hello", "", "world", "", "python"]
non_empty = list(filter(None, words))  # None removes falsy values
print(non_empty)  # ['hello', 'world', 'python']

# Filter with complex condition
people = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 17},
    {"name": "Charlie", "age": 30},
    {"name": "Diana", "age": 15},
]
adults = list(filter(lambda p: p["age"] >= 18, people))
print([p["name"] for p in adults])  # ['Alice', 'Charlie']

# Combining map and filter
# Get squares of even numbers
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, range(10))))
print(result)  # [0, 4, 16, 36, 64]

# Equivalent comprehension (cleaner)
result = [x**2 for x in range(10) if x % 2 == 0]
\`\`\`

### reduce() Function

\`\`\`python
from functools import reduce

# reduce(function, iterable[, initial])
# Applies function cumulatively: f(f(f(a,b), c), d)

numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda acc, x: acc + x, numbers)
print(total)  # 15

# Product of all numbers
product = reduce(lambda acc, x: acc * x, numbers)
print(product)  # 120

# Find maximum
maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)  # 5

# With initial value
total = reduce(lambda acc, x: acc + x, numbers, 100)
print(total)  # 115 (starts from 100)

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
print(flat)  # [1, 2, 3, 4, 5, 6]

# Build a string
words = ["Hello", "World", "Python"]
sentence = reduce(lambda acc, w: f"{acc} {w}", words)
print(sentence)  # "Hello World Python"
\`\`\`

### sorted() with key Parameter

\`\`\`python
# sorted(iterable, key=function, reverse=False)

# Sort strings by length
words = ["python", "is", "awesome", "and", "fun"]
by_length = sorted(words, key=lambda w: len(w))
print(by_length)  # ['is', 'and', 'fun', 'python', 'awesome']

# Sort tuples by second element
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
by_grade = sorted(students, key=lambda s: s[1], reverse=True)
print(by_grade)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]

# Sort dicts by value
scores = {"Alice": 85, "Bob": 92, "Charlie": 78}
sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
print(sorted_scores)  # [('Bob', 92), ('Alice', 85), ('Charlie', 78)]

# Multi-key sorting
data = [("Alice", 85), ("Bob", 85), ("Charlie", 92)]
# Sort by grade desc, then name asc
result = sorted(data, key=lambda x: (-x[1], x[0]))
print(result)  # [('Charlie', 92), ('Alice', 85), ('Bob', 85)]

# Sort with operator.itemgetter (faster than lambda)
from operator import itemgetter, attrgetter
sorted_data = sorted(students, key=itemgetter(1))
\`\`\`

### Functional Programming Patterns

\`\`\`python
# Function composition
def compose(*funcs):
    return reduce(lambda f, g: lambda x: f(g(x)), funcs)

add_one = lambda x: x + 1
double = lambda x: x * 2
square = lambda x: x ** 2

transform = compose(square, double, add_one)
print(transform(3))  # square(double(add_one(3))) = square(8) = 64

# Partial application
from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))  # 25
print(cube(3))    # 27
\`\`\``,
    exercises: [
      {
        title: 'Map - Temperature Converter',
        description: 'Read a list of temperatures in Celsius and convert them to Fahrenheit using map() and lambda.',
        starterCode: 'temps = list(map(float, input().split()))\nfahrenheit = list(map(lambda c: round(c * 9/5 + 32, 1), temps))\nprint(fahrenheit)',
        testInput: '0 20 37 100',
        expectedOutput: '[32.0, 68.0, 98.6, 212.0]'
      },
      {
        title: 'Filter - Prime Numbers',
        description: 'Use filter() to find all prime numbers in a given range.',
        starterCode: 'n = int(input())\nis_prime = lambda x: x > 1 and all(x % i != 0 for i in range(2, int(x**0.5) + 1))\nprimes = list(filter(is_prime, range(2, n + 1)))\nprint(primes)',
        testInput: '20',
        expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19]'
      },
      {
        title: 'Reduce - Factorial',
        description: 'Calculate factorial of N using reduce().',
        starterCode: 'from functools import reduce\nn = int(input())\nif n == 0:\n    print(1)\nelse:\n    result = reduce(lambda acc, x: acc * x, range(1, n + 1))\n    print(result)',
        testInput: '6',
        expectedOutput: '720'
      },
      {
        title: 'Sort by Multiple Keys',
        description: 'Read student data (name, grade) and sort by grade descending, then name ascending.',
        starterCode: 'n = int(input())\nstudents = []\nfor _ in range(n):\n    parts = input().split()\n    students.append((parts[0], int(parts[1])))\n\nsorted_students = sorted(students, key=lambda s: (-s[1], s[0]))\nfor name, grade in sorted_students:\n    print(f"{name} {grade}")',
        testInput: '4\nAlice 85\nBob 92\nCharlie 85\nDiana 92',
        expectedOutput: 'Bob 92\nDiana 92\nAlice 85\nCharlie 85'
      }
    ],
    mcqs: [
      { question: 'What is the correct lambda syntax?', options: ['lambda: x => x + 1', 'lambda x: x + 1', 'lambda(x): x + 1', 'def lambda(x): return x + 1'], correctAnswer: 'lambda x: x + 1', explanation: 'Lambda syntax is: lambda arguments: expression. No parentheses around arguments, no return keyword.' },
      { question: 'What does map() return?', options: ['A list', 'A map object (iterator)', 'A tuple', 'A generator'], correctAnswer: 'A map object (iterator)', explanation: 'map() returns a lazy iterator (map object). Use list() to convert it to a list.' },
      { question: 'What does filter(None, [0, 1, "", "hi", [], [1]]) return as a list?', options: ['[0, 1, "", "hi", [], [1]]', '[1, "hi", [1]]', '[True, True, True]', '[None]'], correctAnswer: '[1, "hi", [1]]', explanation: 'filter(None, ...) removes all falsy values (0, "", [], None, False). Only truthy values remain.' },
      { question: 'Which module contains reduce()?', options: ['builtins', 'functools', 'itertools', 'operator'], correctAnswer: 'functools', explanation: 'reduce() was moved from builtins to functools in Python 3. You must import it: from functools import reduce.' },
      { question: 'What is reduce(lambda a,b: a+b, [1,2,3,4])?', options: ['[1,2,3,4]', '10', '24', '4'], correctAnswer: '10', explanation: 'reduce applies cumulatively: ((1+2)+3)+4 = 10.' },
      { question: 'How many expressions can a lambda have?', options: ['Unlimited', 'One', 'Two', 'Three'], correctAnswer: 'One', explanation: 'Lambda functions can only contain a single expression. For multiple statements, use a regular def function.' }
    ]
  },

  // ==================== CHAPTER 14: MODULES ====================
  modules: {
    title: 'Modules & Packages',
    notes: `## Modules and Packages in Python

A module is a Python file (.py) containing functions, classes, and variables. Packages are directories containing multiple modules. They help organize code into reusable, maintainable units.

### Importing Modules

\`\`\`python
# Import entire module
import math
print(math.pi)        # 3.141592653589793
print(math.sqrt(16))  # 4.0

# Import specific items
from math import pi, sqrt, ceil, floor
print(pi)       # 3.141592653589793
print(sqrt(25)) # 5.0

# Import with alias
import numpy as np
import pandas as pd
from datetime import datetime as dt

# Import all (avoid in production — pollutes namespace)
from math import *
print(sin(pi/2))  # 1.0

# Import from submodule
from os.path import join, exists
from collections import defaultdict, Counter
\`\`\`

### Creating Your Own Module

\`\`\`python
# mymodule.py
\"\"\"My custom utility module.\"\"\"

PI = 3.14159
VERSION = "1.0.0"

def add(a, b):
    \"\"\"Add two numbers.\"\"\"
    return a + b

def multiply(a, b):
    \"\"\"Multiply two numbers.\"\"\"
    return a * b

class Calculator:
    def __init__(self):
        self.history = []
    
    def compute(self, expr):
        result = eval(expr)
        self.history.append((expr, result))
        return result

# Using the module in another file:
# import mymodule
# print(mymodule.add(3, 4))
# print(mymodule.PI)
\`\`\`

### __name__ == "__main__"

\`\`\`python
# utils.py
def helper():
    return "I'm a helper function"

def main():
    print("Running utils.py directly")
    print(helper())

# This block only runs when file is executed directly
# NOT when imported as a module
if __name__ == "__main__":
    main()

# When imported: __name__ == "utils"
# When run directly: __name__ == "__main__"

# This pattern allows a file to be both:
# 1. A reusable module (import utils)
# 2. A standalone script (python utils.py)
\`\`\`

### Package Structure

\`\`\`python
# Package directory structure:
# mypackage/
#   __init__.py      (makes it a package)
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

# __init__.py can be empty or contain initialization code
# It runs when the package is imported

# __init__.py example:
# from .module1 import func1
# from .module2 import func2
# __all__ = ['func1', 'func2']  # controls "from package import *"

# Importing from packages
# import mypackage.module1
# from mypackage import module1
# from mypackage.module1 import func1
# from mypackage.subpackage import module3
\`\`\`

### pip - Package Manager

\`\`\`python
# Install packages
# pip install requests
# pip install numpy pandas matplotlib
# pip install flask==2.0.1  (specific version)
# pip install "requests>=2.25,<3.0"  (version range)

# Uninstall
# pip uninstall requests

# List installed packages
# pip list
# pip freeze  (shows versions, useful for requirements.txt)

# Requirements file
# pip freeze > requirements.txt
# pip install -r requirements.txt

# Virtual environments (isolate project dependencies)
# python -m venv myenv
# source myenv/bin/activate  (Linux/Mac)
# myenv\\Scripts\\activate  (Windows)
# deactivate
\`\`\`

### Commonly Used Standard Library Modules

\`\`\`python
# os - Operating system interface
import os
print(os.getcwd())
print(os.listdir('.'))

# sys - System-specific parameters
import sys
print(sys.version)
print(sys.path)  # Module search paths
sys.exit(0)      # Exit program

# datetime - Date and time
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
tomorrow = now + timedelta(days=1)

# random - Random number generation
import random
print(random.randint(1, 10))
print(random.choice(["a", "b", "c"]))
random.shuffle([1, 2, 3, 4, 5])

# collections - Specialized containers
from collections import Counter, defaultdict, deque, namedtuple
counter = Counter("hello world")
print(counter.most_common(3))

# itertools - Iterator utilities
from itertools import chain, combinations, permutations, product
print(list(combinations([1,2,3], 2)))  # [(1,2), (1,3), (2,3)]

# json - JSON encoding/decoding
import json
data = json.dumps({"key": "value"})
parsed = json.loads(data)

# re - Regular expressions
import re
matches = re.findall(r'\\d+', "I have 3 cats and 2 dogs")
print(matches)  # ['3', '2']

# math - Mathematical functions
import math
print(math.factorial(5))  # 120
print(math.gcd(12, 8))   # 4
print(math.log2(8))      # 3.0
\`\`\`

### Module Search Path

\`\`\`python
import sys

# Python searches for modules in this order:
# 1. Current directory
# 2. PYTHONPATH environment variable
# 3. Standard library directories
# 4. Site-packages (third-party)

print(sys.path)  # Shows all search paths

# Add custom path
sys.path.append('/path/to/my/modules')

# Check where a module is located
import os
print(os.__file__)  # Shows file path of os module
\`\`\``,
    exercises: [
      {
        title: 'Math Module Usage',
        description: 'Use the math module to calculate the hypotenuse of a right triangle given two sides.',
        starterCode: 'import math\na = float(input())\nb = float(input())\nhypotenuse = math.sqrt(a**2 + b**2)\nprint(f"{hypotenuse:.2f}")',
        testInput: '3\n4',
        expectedOutput: '5.00'
      },
      {
        title: 'Random Password Generator',
        description: 'Generate a random password of given length using random module. Use letters and digits.',
        starterCode: 'import random\nimport string\n\nlength = int(input())\nrandom.seed(42)  # Fixed seed for testing\nchars = string.ascii_letters + string.digits\npassword = "".join(random.choice(chars) for _ in range(length))\nprint(len(password))\nprint(password.isalnum())',
        testInput: '12',
        expectedOutput: '12\nTrue'
      },
      {
        title: 'Date Calculator',
        description: 'Read a date string and number of days, then print the date after adding those days.',
        starterCode: 'from datetime import datetime, timedelta\n\ndate_str = input()\ndays = int(input())\n\ndate = datetime.strptime(date_str, "%Y-%m-%d")\nnew_date = date + timedelta(days=days)\nprint(new_date.strftime("%Y-%m-%d"))',
        testInput: '2024-01-15\n30',
        expectedOutput: '2024-02-14'
      }
    ],
    mcqs: [
      { question: 'What does "if __name__ == \\"__main__\\":" do?', options: ['Imports the module', 'Runs code only when file is executed directly', 'Creates a main function', 'Defines the module name'], correctAnswer: 'Runs code only when file is executed directly', explanation: 'When a file is run directly, __name__ is "__main__". When imported, __name__ is the module name. This guard prevents code from running on import.' },
      { question: 'What is the correct way to import only sqrt from math?', options: ['import sqrt from math', 'from math import sqrt', 'import math.sqrt', 'using math import sqrt'], correctAnswer: 'from math import sqrt', explanation: 'The syntax is "from module import item". This allows using sqrt() directly without the math. prefix.' },
      { question: 'What does pip freeze do?', options: ['Stops pip', 'Lists installed packages with versions', 'Freezes package updates', 'Creates a virtual environment'], correctAnswer: 'Lists installed packages with versions', explanation: 'pip freeze outputs all installed packages in requirements format (package==version), useful for creating requirements.txt.' },
      { question: 'What file makes a directory a Python package?', options: ['main.py', '__init__.py', 'setup.py', 'package.json'], correctAnswer: '__init__.py', explanation: '__init__.py (can be empty) tells Python that the directory should be treated as a package, allowing imports from it.' },
      { question: 'What is a virtual environment?', options: ['A VM for Python', 'An isolated Python environment with its own packages', 'A Docker container', 'A testing framework'], correctAnswer: 'An isolated Python environment with its own packages', explanation: 'Virtual environments create isolated Python installations so different projects can have different dependency versions without conflicts.' },
      { question: 'Which module provides Counter and defaultdict?', options: ['itertools', 'functools', 'collections', 'operator'], correctAnswer: 'collections', explanation: 'The collections module provides specialized container datatypes: Counter, defaultdict, deque, namedtuple, OrderedDict.' }
    ]
  },

  // ==================== CHAPTER 15: DECORATORS ====================
  decorators: {
    title: 'Decorators',
    notes: `## Decorators in Python

Decorators are a powerful way to modify or extend the behavior of functions or classes without changing their source code. They are functions that take another function as input and return a modified version.

### Understanding Decorators

\`\`\`python
# A decorator is just a function that wraps another function
def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

# Without @ syntax
def say_hello():
    print("Hello!")

say_hello = my_decorator(say_hello)  # Manual decoration
say_hello()
# Before function call
# Hello!
# After function call

# With @ syntax (syntactic sugar)
@my_decorator
def say_hi():
    print("Hi!")

say_hi()  # Same result as above
\`\`\`

### Decorators with Arguments

\`\`\`python
# Decorator that handles function arguments
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

add(3, 5)
# Calling add with args=(3, 5), kwargs={}
# add returned 8

# Preserving function metadata with functools.wraps
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    \"\"\"Greet someone by name.\"\"\"
    return f"Hello, {name}!"

print(greet.__name__)  # "greet" (without @wraps, it would be "wrapper")
print(greet.__doc__)   # "Greet someone by name."
\`\`\`

### Practical Decorator Examples

\`\`\`python
import time
from functools import wraps

# 1. Timer decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

# 2. Retry decorator
def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt+1} failed: {e}")
        return wrapper
    return decorator

@retry(max_attempts=3)
def unreliable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("API timeout")
    return "Success"

# 3. Cache/Memoize decorator
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Instant! Without memoize, would take forever

# 4. Validation decorator
def validate_types(*types):
    def decorator(func):
        @wraps(func)
        def wrapper(*args):
            for arg, expected_type in zip(args, types):
                if not isinstance(arg, expected_type):
                    raise TypeError(f"Expected {expected_type}, got {type(arg)}")
            return func(*args)
        return wrapper
    return decorator

@validate_types(int, int)
def add(a, b):
    return a + b

add(3, 5)      # Works
# add("3", 5)  # TypeError!
\`\`\`

### @staticmethod and @classmethod

\`\`\`python
class MyClass:
    class_var = "I'm a class variable"
    
    def __init__(self, value):
        self.value = value
    
    # Regular method - has access to instance (self)
    def instance_method(self):
        return f"Instance: {self.value}"
    
    # Class method - has access to class (cls), not instance
    @classmethod
    def class_method(cls):
        return f"Class: {cls.class_var}"
    
    # Alternative constructor using classmethod
    @classmethod
    def from_string(cls, string):
        value = int(string)
        return cls(value)
    
    # Static method - no access to instance or class
    @staticmethod
    def static_method(x, y):
        return x + y  # Just a utility function

obj = MyClass(42)
print(obj.instance_method())    # Instance: 42
print(MyClass.class_method())   # Class: I'm a class variable
print(MyClass.static_method(3, 4))  # 7
print(MyClass.from_string("100").value)  # 100
\`\`\`

### @property Decorator

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        \"\"\"Getter for radius.\"\"\"
        return self._radius
    
    @radius.setter
    def radius(self, value):
        \"\"\"Setter with validation.\"\"\"
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @radius.deleter
    def radius(self):
        \"\"\"Deleter.\"\"\"
        print("Deleting radius")
        del self._radius
    
    @property
    def area(self):
        \"\"\"Read-only computed property.\"\"\"
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)    # 5 (uses getter)
c.radius = 10      # Uses setter
print(c.area)      # 314.159 (computed property)
# c.radius = -1    # ValueError!
\`\`\`

### Chaining (Stacking) Decorators

\`\`\`python
def bold(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello, {name}"

print(greet("World"))  # <b><i>Hello, World</i></b>
# Decorators apply bottom-up: italic first, then bold

# Equivalent to:
# greet = bold(italic(greet))
\`\`\`

### Class Decorators

\`\`\`python
# Decorator that adds methods to a class
def add_repr(cls):
    def __repr__(self):
        attrs = ', '.join(f'{k}={v!r}' for k, v in self.__dict__.items())
        return f'{cls.__name__}({attrs})'
    cls.__repr__ = __repr__
    return cls

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p)  # Point(x=3, y=4)

# dataclass decorator (Python 3.7+)
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int
    grade: float = 0.0

s = Student("Alice", 20, 3.8)
print(s)  # Student(name='Alice', age=20, grade=3.8)
\`\`\``,
    exercises: [
      {
        title: 'Timer Decorator',
        description: 'Create a decorator that measures and prints the execution time of a function. Test with a function that computes sum of range(n).',
        starterCode: 'import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        elapsed = time.time() - start\n        print(f"Time: {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef compute_sum(n):\n    return sum(range(n))\n\nn = int(input())\nresult = compute_sum(n)\nprint(f"Sum: {result}")',
        testInput: '1000000',
        expectedOutput: 'Time: 0.0000s\nSum: 499999500000'
      },
      {
        title: 'Memoize Decorator',
        description: 'Implement a memoize decorator and use it to optimize recursive Fibonacci.',
        starterCode: 'from functools import wraps\n\ndef memoize(func):\n    cache = {}\n    @wraps(func)\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\n\n@memoize\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nn = int(input())\nprint(fib(n))',
        testInput: '10',
        expectedOutput: '55'
      },
      {
        title: 'Class with Property',
        description: 'Create a Rectangle class with width and height properties that validate positive values. Add a read-only area property.',
        starterCode: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    @property\n    def width(self):\n        return self._width\n    \n    @width.setter\n    def width(self, value):\n        if value <= 0:\n            raise ValueError("Width must be positive")\n        self._width = value\n    \n    @property\n    def height(self):\n        return self._height\n    \n    @height.setter\n    def height(self, value):\n        if value <= 0:\n            raise ValueError("Height must be positive")\n        self._height = value\n    \n    @property\n    def area(self):\n        return self._width * self._height\n\nw, h = map(int, input().split())\nr = Rectangle(w, h)\nprint(f"Area: {r.area}")',
        testInput: '5 3',
        expectedOutput: 'Area: 15'
      }
    ],
    mcqs: [
      { question: 'What is a decorator in Python?', options: ['A design pattern', 'A function that modifies another function', 'A class method', 'A type of loop'], correctAnswer: 'A function that modifies another function', explanation: 'A decorator is a function that takes another function as argument, extends its behavior, and returns the modified function.' },
      { question: 'What does @staticmethod mean?', options: ['Method cannot be overridden', 'Method belongs to class, not instance, and has no access to self or cls', 'Method is private', 'Method runs at compile time'], correctAnswer: 'Method belongs to class, not instance, and has no access to self or cls', explanation: '@staticmethod creates a method that doesn\'t receive self or cls. It\'s like a regular function that lives inside a class for organizational purposes.' },
      { question: 'In @bold @italic def f(): ..., which decorator applies first?', options: ['bold', 'italic', 'Both simultaneously', 'Depends on Python version'], correctAnswer: 'italic', explanation: 'Decorators apply bottom-up (closest to function first). It\'s equivalent to f = bold(italic(f)).' },
      { question: 'What does @classmethod provide access to?', options: ['Instance (self)', 'Class (cls)', 'Both self and cls', 'Neither'], correctAnswer: 'Class (cls)', explanation: '@classmethod receives the class as first argument (cls), not the instance. It can access class variables and create instances.' },
      { question: 'What does functools.wraps do?', options: ['Makes function faster', 'Preserves original function metadata', 'Adds error handling', 'Creates a copy of the function'], correctAnswer: 'Preserves original function metadata', explanation: '@wraps(func) copies __name__, __doc__, and other attributes from the original function to the wrapper, maintaining proper introspection.' },
      { question: 'What is @property used for?', options: ['Making attributes private', 'Creating getter/setter with attribute-like syntax', 'Static typing', 'Memory optimization'], correctAnswer: 'Creating getter/setter with attribute-like syntax', explanation: '@property allows you to define methods that are accessed like attributes (obj.x instead of obj.get_x()), enabling validation and computed properties.' }
    ]
  },

  // ==================== CHAPTER 16: GENERATORS ====================
  generators: {
    title: 'Generators & Iterators',
    notes: `## Generators and Iterators in Python

Generators are a special type of iterator that generate values on-the-fly using the \`yield\` keyword. They are memory-efficient because they produce values one at a time (lazy evaluation) instead of storing all values in memory.

### Understanding Iterators

\`\`\`python
# An iterator is any object with __iter__() and __next__() methods
class CountUp:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# Using the iterator
counter = CountUp(1, 5)
for num in counter:
    print(num)  # 1, 2, 3, 4

# Built-in iter() and next()
nums = [10, 20, 30]
it = iter(nums)
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# next(it)  # StopIteration
\`\`\`

### Generator Functions (yield)

\`\`\`python
# A generator function uses 'yield' instead of 'return'
def count_up(start, end):
    current = start
    while current < end:
        yield current  # Pauses here, resumes on next()
        current += 1

# Using the generator
gen = count_up(1, 5)
print(type(gen))    # <class 'generator'>
print(next(gen))    # 1
print(next(gen))    # 2

# In a for loop
for num in count_up(1, 5):
    print(num)  # 1, 2, 3, 4

# Generator for Fibonacci sequence
def fibonacci():
    a, b = 0, 1
    while True:  # Infinite generator!
        yield a
        a, b = b, a + b

# Get first 10 Fibonacci numbers
fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator that reads large files line by line
def read_large_file(filepath):
    with open(filepath, 'r') as f:
        for line in f:
            yield line.strip()

# Process without loading entire file into memory
# for line in read_large_file("huge_file.txt"):
#     process(line)
\`\`\`

### yield vs return

\`\`\`python
# return: terminates function, returns value
def get_squares_list(n):
    result = []
    for i in range(n):
        result.append(i ** 2)
    return result  # All values computed and stored in memory

# yield: pauses function, produces value one at a time
def get_squares_gen(n):
    for i in range(n):
        yield i ** 2  # Produces one value, pauses

# Memory comparison
import sys
list_squares = get_squares_list(1000000)
gen_squares = get_squares_gen(1000000)

print(sys.getsizeof(list_squares))  # ~8 MB
print(sys.getsizeof(gen_squares))   # ~120 bytes!

# yield from - delegate to sub-generator
def chain(*iterables):
    for iterable in iterables:
        yield from iterable  # Same as: for item in iterable: yield item

result = list(chain([1, 2], [3, 4], [5, 6]))
print(result)  # [1, 2, 3, 4, 5, 6]
\`\`\`

### Generator Expressions

\`\`\`python
# Like list comprehension but with () instead of []
# Creates a generator (lazy evaluation)

# List comprehension - creates entire list in memory
squares_list = [x**2 for x in range(1000000)]

# Generator expression - creates values on demand
squares_gen = (x**2 for x in range(1000000))

# Use in functions that accept iterables
total = sum(x**2 for x in range(100))  # No extra [] needed
print(total)  # 328350

# Check if any/all
has_even = any(x % 2 == 0 for x in [1, 3, 4, 7])
print(has_even)  # True

all_positive = all(x > 0 for x in [1, 2, 3, 4])
print(all_positive)  # True

# Find first match
numbers = (x for x in range(1, 100) if x % 7 == 0 and x % 5 == 0)
print(next(numbers))  # 35

# Chaining generator expressions
lines = ["  hello  ", "  world  ", "  python  "]
stripped = (line.strip() for line in lines)
upper = (line.upper() for line in stripped)
print(list(upper))  # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

### itertools Module

\`\`\`python
import itertools

# count - infinite counter
counter = itertools.count(start=1, step=2)
print([next(counter) for _ in range(5)])  # [1, 3, 5, 7, 9]

# cycle - infinite cycling
colors = itertools.cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(5)])  # ['red', 'green', 'blue', 'red', 'green']

# repeat - repeat value
fives = itertools.repeat(5, times=3)
print(list(fives))  # [5, 5, 5]

# chain - concatenate iterables
combined = itertools.chain([1, 2], [3, 4], [5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]

# islice - slice an iterator
fib = fibonacci()  # Our infinite fibonacci generator
first_5 = list(itertools.islice(fib, 5))
print(first_5)  # [0, 1, 1, 2, 3]

# combinations and permutations
print(list(itertools.combinations('ABC', 2)))
# [('A','B'), ('A','C'), ('B','C')]

print(list(itertools.permutations('AB', 2)))
# [('A','B'), ('B','A')]

# product - cartesian product
print(list(itertools.product([1,2], ['a','b'])))
# [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# groupby - group consecutive elements
data = [('A', 1), ('A', 2), ('B', 3), ('B', 4), ('A', 5)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(f"{key}: {list(group)}")
# A: [('A', 1), ('A', 2)]
# B: [('B', 3), ('B', 4)]
# A: [('A', 5)]

# accumulate - running totals
nums = [1, 2, 3, 4, 5]
running_sum = list(itertools.accumulate(nums))
print(running_sum)  # [1, 3, 6, 10, 15]

# takewhile / dropwhile
nums = [2, 4, 6, 7, 8, 10]
result = list(itertools.takewhile(lambda x: x % 2 == 0, nums))
print(result)  # [2, 4, 6] (stops at first odd)
\`\`\`

### Lazy Evaluation Benefits

\`\`\`python
# 1. Memory efficiency - process huge datasets
def read_csv_rows(filename):
    with open(filename) as f:
        header = f.readline().strip().split(',')
        for line in f:
            values = line.strip().split(',')
            yield dict(zip(header, values))

# 2. Infinite sequences
def primes():
    \"\"\"Infinite prime number generator.\"\"\"
    yield 2
    candidate = 3
    while True:
        if all(candidate % p != 0 for p in range(2, int(candidate**0.5) + 1)):
            yield candidate
        candidate += 2

# Get primes until > 50
prime_gen = primes()
small_primes = list(itertools.takewhile(lambda p: p <= 50, prime_gen))
print(small_primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

# 3. Pipeline processing
def pipeline():
    data = range(1000000)
    evens = (x for x in data if x % 2 == 0)
    squared = (x**2 for x in evens)
    small = (x for x in squared if x < 100)
    return list(small)  # Only materializes final result

# 4. send() - send values into generator
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)        # Initialize (advance to first yield)
print(acc.send(10))  # 10
print(acc.send(20))  # 30
print(acc.send(5))   # 35
\`\`\``,
    exercises: [
      {
        title: 'Fibonacci Generator',
        description: 'Create a generator that yields the first N Fibonacci numbers.',
        starterCode: 'def fibonacci(n):\n    a, b = 0, 1\n    count = 0\n    while count < n:\n        yield a\n        a, b = b, a + b\n        count += 1\n\nn = int(input())\nprint(list(fibonacci(n)))',
        testInput: '8',
        expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]'
      },
      {
        title: 'Infinite Prime Generator',
        description: 'Create a generator that yields prime numbers. Use itertools.islice to get the first N primes.',
        starterCode: 'import itertools\n\ndef primes():\n    yield 2\n    candidate = 3\n    while True:\n        if all(candidate % p != 0 for p in range(2, int(candidate**0.5) + 1)):\n            yield candidate\n        candidate += 2\n\nn = int(input())\nresult = list(itertools.islice(primes(), n))\nprint(result)',
        testInput: '5',
        expectedOutput: '[2, 3, 5, 7, 11]'
      },
      {
        title: 'Generator Expression vs List',
        description: 'Compare memory usage of a generator expression vs list comprehension for squares of numbers 1 to N.',
        starterCode: 'import sys\n\nn = int(input())\nlist_comp = [x**2 for x in range(n)]\ngen_exp = (x**2 for x in range(n))\n\nprint(f"List size: {sys.getsizeof(list_comp)}")\nprint(f"Generator size: {sys.getsizeof(gen_exp)}")\nprint(f"Sum: {sum(x**2 for x in range(n))}")',
        testInput: '10',
        expectedOutput: 'List size: 184\nGenerator size: 104\nSum: 285'
      },
      {
        title: 'Chunked Iterator',
        description: 'Create a generator that yields chunks of a given size from a list.',
        starterCode: 'def chunks(lst, size):\n    for i in range(0, len(lst), size):\n        yield lst[i:i + size]\n\ndata = list(map(int, input().split()))\nsize = int(input())\nfor chunk in chunks(data, size):\n    print(chunk)',
        testInput: '1 2 3 4 5 6 7 8 9 10\n3',
        expectedOutput: '[1, 2, 3]\n[4, 5, 6]\n[7, 8, 9]\n[10]'
      }
    ],
    mcqs: [
      { question: 'What keyword makes a function a generator?', options: ['return', 'yield', 'generate', 'next'], correctAnswer: 'yield', explanation: 'The presence of "yield" in a function body makes it a generator function. When called, it returns a generator object.' },
      { question: 'What is the main advantage of generators over lists?', options: ['Faster computation', 'Memory efficiency', 'Type safety', 'Thread safety'], correctAnswer: 'Memory efficiency', explanation: 'Generators produce values one at a time (lazy evaluation), using constant memory regardless of sequence size. Lists store all values in memory.' },
      { question: 'What does next() do on a generator?', options: ['Restarts the generator', 'Gets the next yielded value', 'Skips a value', 'Closes the generator'], correctAnswer: 'Gets the next yielded value', explanation: 'next() resumes the generator, executes until the next yield, and returns the yielded value. Raises StopIteration when exhausted.' },
      { question: 'What is a generator expression?', options: ['A list comprehension', 'A comprehension with () that creates a lazy iterator', 'A lambda function', 'A regular expression'], correctAnswer: 'A comprehension with () that creates a lazy iterator', explanation: 'Generator expressions use parentheses instead of brackets: (x**2 for x in range(10)). They create lazy iterators, not lists.' },
      { question: 'What happens when a generator is exhausted?', options: ['It restarts', 'It raises StopIteration', 'It returns None', 'It raises GeneratorExit'], correctAnswer: 'It raises StopIteration', explanation: 'When a generator has no more values to yield, calling next() raises StopIteration. For loops handle this automatically.' },
      { question: 'What does "yield from" do?', options: ['Yields a value from another function', 'Delegates to a sub-generator', 'Creates a new generator', 'Returns from a generator'], correctAnswer: 'Delegates to a sub-generator', explanation: '"yield from iterable" delegates iteration to another iterable/generator, yielding each of its values. It simplifies nested generators.' }
    ]
  },

};


// ==================== EXPORT FUNCTION ====================

const defaultChapter: ChapterData = {
  title: 'Chapter',
  notes: '## Content Coming Soon\n\nThis chapter is being prepared with detailed notes, examples, and exercises. Check back soon!',
  exercises: [],
  mcqs: [],
};

/**
 * Get chapter data by chapter ID.
 * Returns the full chapter content including notes, exercises, and MCQs.
 * Falls back to a default placeholder if chapter is not found.
 */
export function getChapterData(chapterId: string): ChapterData {
  return pythonChapters[chapterId] || defaultChapter;
}

/**
 * Get all available chapter IDs.
 */
export function getAllChapterIds(): string[] {
  return Object.keys(pythonChapters);
}

/**
 * Check if a chapter exists.
 */
export function hasChapter(chapterId: string): boolean {
  return chapterId in pythonChapters;
}

export default pythonChapters;
