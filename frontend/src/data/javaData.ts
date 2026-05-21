// Java Learning Data - Complete Chapter Content for Infosys Interview Preparation
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

const javaChapters: Record<string, ChapterData> = {
  // ==================== CHAPTER 1: JAVA BASICS ====================
  basics: {
    title: 'Java Basics',
    notes: `## Introduction to Java

Java is a **high-level, object-oriented, platform-independent** programming language developed by James Gosling at Sun Microsystems in 1995 (now owned by Oracle). Java follows the principle of **WORA** — Write Once, Run Anywhere.

### JDK, JRE, and JVM

| Component | Full Form | Purpose |
|-----------|-----------|---------|
| JDK | Java Development Kit | Complete development environment (JRE + compiler + tools) |
| JRE | Java Runtime Environment | Runtime libraries + JVM (needed to run Java programs) |
| JVM | Java Virtual Machine | Executes bytecode, provides platform independence |

**Relationship:** JDK ⊃ JRE ⊃ JVM

\`\`\`
JDK = JRE + Development Tools (javac, javadoc, jar, etc.)
JRE = JVM + Runtime Libraries (java.lang, java.util, etc.)
JVM = Class Loader + Bytecode Verifier + Execution Engine
\`\`\`

### How Java Program Executes

\`\`\`
Source Code (.java) → javac compiler → Bytecode (.class) → JVM → Machine Code
\`\`\`

1. Write source code in \`.java\` file
2. Compile using \`javac\` → produces \`.class\` bytecode
3. JVM interprets/JIT-compiles bytecode to native machine code

### Your First Java Program

\`\`\`java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**Compilation & Execution:**
\`\`\`bash
javac HelloWorld.java    # Compiles to HelloWorld.class
java HelloWorld          # Runs the program
\`\`\`

### Understanding the main() Method

\`\`\`java
public static void main(String[] args)
\`\`\`

| Keyword | Purpose |
|---------|---------|
| public | Accessible from anywhere (JVM needs to call it) |
| static | Can be called without creating an object |
| void | Returns nothing |
| main | Entry point recognized by JVM |
| String[] args | Command-line arguments |

### Comments in Java

\`\`\`java
// Single-line comment

/* Multi-line
   comment */

/** 
 * Javadoc comment - used for documentation
 * @param args command line arguments
 * @return void
 */
\`\`\`

### Taking User Input with Scanner

\`\`\`java
import java.util.Scanner;

public class InputExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        
        System.out.print("Enter your GPA: ");
        double gpa = sc.nextDouble();
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        
        sc.close();
    }
}
\`\`\`

### Scanner Methods

| Method | Reads |
|--------|-------|
| nextInt() | Integer |
| nextDouble() | Double |
| nextFloat() | Float |
| nextLong() | Long |
| nextLine() | Entire line (String) |
| next() | Single word (String) |
| nextBoolean() | Boolean |

### Important: nextLine() after nextInt() Issue

\`\`\`java
int num = sc.nextInt();
sc.nextLine(); // Consume the leftover newline character
String str = sc.nextLine(); // Now reads correctly
\`\`\`

### System.out Methods

\`\`\`java
System.out.println("With newline");   // prints + newline
System.out.print("No newline");       // prints without newline
System.out.printf("Formatted: %d, %.2f, %s%n", 10, 3.14, "Java");
\`\`\`

### Java Identifiers and Keywords

- Identifiers must start with a letter, \`$\`, or \`_\`
- Cannot use reserved keywords (abstract, assert, boolean, break, byte, case, catch, char, class, continue, default, do, double, else, enum, extends, final, finally, float, for, if, implements, import, instanceof, int, interface, long, native, new, package, private, protected, public, return, short, static, super, switch, synchronized, this, throw, throws, transient, try, void, volatile, while)
- Java is **case-sensitive**

### Key Points for Interviews
- Java is **not 100% object-oriented** because it uses primitive types
- Java does **not support multiple inheritance** through classes (uses interfaces)
- Java uses **automatic garbage collection** (no manual memory management)
- The \`main\` method can be overloaded but JVM always calls \`public static void main(String[] args)\`
`,
    exercises: [
      {
        title: 'Hello World Program',
        description: 'Write a Java program that prints "Hello, Infosys!" to the console. Make sure the class name matches the file name convention.',
        starterCode: `public class HelloInfosys {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
        testInput: '',
        expectedOutput: 'Hello, Infosys!'
      },
      {
        title: 'User Input Calculator',
        description: 'Write a program that reads two integers from the user and prints their sum, difference, product, and quotient.',
        starterCode: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Read two integers and perform operations
        
        sc.close();
    }
}`,
        testInput: '10\n3',
        expectedOutput: 'Sum: 13\nDifference: 7\nProduct: 30\nQuotient: 3'
      },
      {
        title: 'Personal Details',
        description: 'Write a program that takes name (String), age (int), and salary (double) as input and displays them in a formatted manner using printf.',
        starterCode: `import java.util.Scanner;

public class PersonalDetails {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Read name, age, salary and display formatted output
        
        sc.close();
    }
}`,
        testInput: 'John\n25\n45000.50',
        expectedOutput: 'Name: John\nAge: 25\nSalary: Rs.45000.50'
      },
      {
        title: 'Command Line Arguments',
        description: 'Write a program that accepts command-line arguments and prints each argument with its index.',
        starterCode: `public class CLIArgs {
    public static void main(String[] args) {
        // Print each command line argument with its index
        // Example: args[0] = Hello
        
    }
}`,
        testInput: 'Hello World Java',
        expectedOutput: 'args[0] = Hello\nargs[1] = World\nargs[2] = Java'
      }
    ],
    mcqs: [
      {
        question: 'Which component is responsible for converting bytecode to machine code?',
        options: ['JDK', 'JRE', 'JVM', 'javac'],
        correctAnswer: 'JVM',
        explanation: 'JVM (Java Virtual Machine) is responsible for interpreting/JIT-compiling bytecode into platform-specific machine code at runtime.'
      },
      {
        question: 'What is the correct signature of the main method in Java?',
        options: ['public void main(String args[])', 'public static void main(String[] args)', 'static public void main(String args)', 'public static int main(String[] args)'],
        correctAnswer: 'public static void main(String[] args)',
        explanation: 'The main method must be public (accessible by JVM), static (called without object), void (returns nothing), and accept String array parameter.'
      },
      {
        question: 'What does JDK stand for?',
        options: ['Java Development Kit', 'Java Deployment Kit', 'Java Debug Kit', 'Java Design Kit'],
        correctAnswer: 'Java Development Kit',
        explanation: 'JDK stands for Java Development Kit. It includes the JRE plus development tools like javac compiler, javadoc, jar, etc.'
      },
      {
        question: 'Which Scanner method is used to read an entire line of text?',
        options: ['next()', 'nextLine()', 'readLine()', 'getLine()'],
        correctAnswer: 'nextLine()',
        explanation: 'nextLine() reads the entire line including spaces until a newline character. next() only reads until the first whitespace.'
      },
      {
        question: 'What is the file extension of compiled Java bytecode?',
        options: ['.java', '.class', '.byte', '.jvm'],
        correctAnswer: '.class',
        explanation: 'When javac compiles a .java file, it produces a .class file containing platform-independent bytecode that the JVM can execute.'
      },
      {
        question: 'Which of the following is NOT a valid Java comment?',
        options: ['// comment', '/* comment */', '/** comment */', '<!-- comment -->'],
        correctAnswer: '<!-- comment -->',
        explanation: '<!-- comment --> is HTML comment syntax. Java supports single-line (//), multi-line (/* */), and Javadoc (/** */) comments.'
      },
      {
        question: 'What happens if the main method is declared as private?',
        options: ['Compilation error', 'Runtime error', 'Program runs normally', 'Warning but runs'],
        correctAnswer: 'Runtime error',
        explanation: 'The code will compile successfully, but at runtime JVM will throw an error: "Main method not found in class" because it looks for a public main method.'
      }
    ]
  },

  // ==================== CHAPTER 2: DATA TYPES & VARIABLES ====================
  'data-types': {
    title: 'Data Types & Variables',
    notes: `## Data Types in Java

Java is a **statically-typed** language — every variable must be declared with a data type before use. Java has two categories of data types: **Primitive** and **Reference** (Non-Primitive).

### Primitive Data Types (8 types)

| Type | Size | Range | Default | Example |
|------|------|-------|---------|---------|
| byte | 1 byte | -128 to 127 | 0 | \`byte b = 100;\` |
| short | 2 bytes | -32,768 to 32,767 | 0 | \`short s = 30000;\` |
| int | 4 bytes | -2³¹ to 2³¹-1 | 0 | \`int i = 100000;\` |
| long | 8 bytes | -2⁶³ to 2⁶³-1 | 0L | \`long l = 100000L;\` |
| float | 4 bytes | ~7 decimal digits | 0.0f | \`float f = 3.14f;\` |
| double | 8 bytes | ~15 decimal digits | 0.0d | \`double d = 3.14159;\` |
| char | 2 bytes | 0 to 65,535 (Unicode) | '\\u0000' | \`char c = 'A';\` |
| boolean | 1 bit* | true or false | false | \`boolean b = true;\` |

*Note: boolean size is JVM-dependent, typically 1 byte in practice.

### Variable Declaration and Initialization

\`\`\`java
// Declaration
int age;
double salary;

// Initialization
age = 25;
salary = 50000.0;

// Declaration + Initialization
String name = "Java";
final double PI = 3.14159; // constant

// Multiple declarations
int x = 1, y = 2, z = 3;
\`\`\`

### Literals in Java

\`\`\`java
// Integer literals
int decimal = 100;        // Decimal (base 10)
int binary = 0b1010;      // Binary (base 2) = 10
int octal = 0144;         // Octal (base 8) = 100
int hex = 0x64;           // Hexadecimal (base 16) = 100
int million = 1_000_000;  // Underscore for readability (Java 7+)

// Floating-point literals
double d1 = 3.14;
double d2 = 3.14e2;      // Scientific notation = 314.0
float f1 = 3.14f;        // Must use 'f' suffix for float

// Character literals
char ch1 = 'A';
char ch2 = 65;           // ASCII value of 'A'
char ch3 = '\\u0041';     // Unicode for 'A'

// String literal
String s = "Hello Java";

// Boolean literals
boolean flag = true;
\`\`\`

### Type Casting (Type Conversion)

**Widening (Implicit) — Automatic, no data loss:**
\`\`\`java
byte → short → int → long → float → double

int i = 100;
long l = i;        // Automatic widening
double d = l;      // Automatic widening
\`\`\`

**Narrowing (Explicit) — Manual, possible data loss:**
\`\`\`java
double → float → long → int → short → byte

double d = 9.78;
int i = (int) d;   // Explicit cast, i = 9 (truncated)

long l = 100000L;
int j = (int) l;   // Explicit cast

int big = 130;
byte b = (byte) big; // b = -126 (overflow!)
\`\`\`

### Wrapper Classes

Each primitive type has a corresponding wrapper class in \`java.lang\`:

| Primitive | Wrapper Class |
|-----------|--------------|
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

\`\`\`java
// Autoboxing: primitive → wrapper
int num = 10;
Integer obj = num;  // Autoboxing (Java 5+)

// Unboxing: wrapper → primitive
Integer obj2 = Integer.valueOf(20);
int num2 = obj2;    // Unboxing

// Useful methods
int parsed = Integer.parseInt("123");
String str = Integer.toString(123);
int max = Integer.MAX_VALUE;  // 2147483647
int min = Integer.MIN_VALUE;  // -2147483648

// Comparing
Integer a = 127, b = 127;
System.out.println(a == b);      // true (Integer cache: -128 to 127)
Integer c = 128, d = 128;
System.out.println(c == d);      // false (outside cache range!)
System.out.println(c.equals(d)); // true (always use equals for objects)
\`\`\`

### The var Keyword (Java 10+)

\`\`\`java
// Local Variable Type Inference
var name = "Java";        // inferred as String
var list = new ArrayList<String>(); // inferred as ArrayList<String>
var count = 10;           // inferred as int

// Restrictions:
// var x;              // ERROR: cannot infer without initializer
// var y = null;       // ERROR: cannot infer from null
// var cannot be used for method parameters, return types, or fields
\`\`\`

### Type Promotion in Expressions

\`\`\`java
byte a = 10, b = 20;
// byte c = a + b;    // ERROR! Result is promoted to int
int c = a + b;        // Correct

// Rules:
// 1. byte, short, char are promoted to int in expressions
// 2. If one operand is long, whole expression becomes long
// 3. If one operand is float, whole expression becomes float
// 4. If one operand is double, whole expression becomes double
\`\`\`

### String to Primitive Conversion

\`\`\`java
int i = Integer.parseInt("123");
double d = Double.parseDouble("3.14");
boolean b = Boolean.parseBoolean("true");
long l = Long.parseLong("123456789");

// Primitive to String
String s1 = String.valueOf(123);
String s2 = Integer.toString(123);
String s3 = 123 + "";  // Concatenation trick
\`\`\`

### Key Interview Points
- Java does NOT have unsigned types (unlike C/C++)
- \`char\` in Java is 2 bytes (Unicode), not 1 byte like C
- Integer cache range is -128 to 127 (use \`.equals()\` for comparison)
- \`float\` requires \`f\` suffix; \`long\` requires \`L\` suffix
- Default value of instance variables is type-dependent; local variables have NO default
`,
    exercises: [
      {
        title: 'Type Casting Practice',
        description: 'Write a program that demonstrates both widening and narrowing type casting. Convert an int to double (widening) and a double to int (narrowing). Print the results.',
        starterCode: `public class TypeCasting {
    public static void main(String[] args) {
        int intVal = 42;
        double doubleVal = 9.99;
        
        // Perform widening: int to double
        
        // Perform narrowing: double to int
        
        // Print both results
    }
}`,
        testInput: '',
        expectedOutput: 'Widening (int to double): 42.0\nNarrowing (double to int): 9'
      },
      {
        title: 'Wrapper Class Operations',
        description: 'Write a program that parses string inputs to different numeric types, performs arithmetic, and demonstrates autoboxing/unboxing.',
        starterCode: `public class WrapperDemo {
    public static void main(String[] args) {
        String numStr = "100";
        String doubleStr = "3.14";
        
        // Parse strings to primitives
        
        // Demonstrate autoboxing
        
        // Print MAX_VALUE and MIN_VALUE for Integer
    }
}`,
        testInput: '',
        expectedOutput: 'Parsed int: 100\nParsed double: 3.14\nSum: 103.14\nInteger MAX: 2147483647\nInteger MIN: -2147483648'
      },
      {
        title: 'Data Type Sizes',
        description: 'Write a program that prints the size (in bytes) and range of all primitive data types using wrapper class constants.',
        starterCode: `public class DataTypeSizes {
    public static void main(String[] args) {
        // Print size and range for: byte, short, int, long, float, double
        // Use Byte.SIZE, Byte.MIN_VALUE, Byte.MAX_VALUE etc.
        
    }
}`,
        testInput: '',
        expectedOutput: 'byte: 1 bytes, range: -128 to 127\nshort: 2 bytes, range: -32768 to 32767\nint: 4 bytes, range: -2147483648 to 2147483647\nlong: 8 bytes, range: -9223372036854775808 to 9223372036854775807'
      }
    ],
    mcqs: [
      {
        question: 'What is the size of int in Java?',
        options: ['2 bytes', '4 bytes', '8 bytes', 'Platform dependent'],
        correctAnswer: '4 bytes',
        explanation: 'In Java, int is always 4 bytes (32 bits) regardless of the platform. This is part of Java\'s platform independence guarantee.'
      },
      {
        question: 'What is the default value of a boolean instance variable?',
        options: ['true', 'false', '0', 'null'],
        correctAnswer: 'false',
        explanation: 'The default value of a boolean instance variable is false. Note: local variables do not have default values and must be initialized before use.'
      },
      {
        question: 'Which of the following is a valid float literal?',
        options: ['3.14', '3.14f', '3.14d', 'Both A and B'],
        correctAnswer: '3.14f',
        explanation: '3.14 without suffix is treated as double by default. To specify a float literal, you must append f or F suffix. 3.14d is explicitly double.'
      },
      {
        question: 'What is the output of: Integer a = 128; Integer b = 128; System.out.println(a == b);',
        options: ['true', 'false', 'Compilation error', 'Runtime error'],
        correctAnswer: 'false',
        explanation: 'Integer caches values from -128 to 127. For values outside this range, new objects are created. == compares references, not values. Use .equals() for value comparison.'
      },
      {
        question: 'What happens when you cast (byte) 130?',
        options: ['130', '-126', '0', 'Compilation error'],
        correctAnswer: '-126',
        explanation: 'byte range is -128 to 127. 130 in binary is 10000010. When truncated to byte (signed), it wraps around: 130 - 256 = -126.'
      },
      {
        question: 'Which keyword is used for local variable type inference in Java 10+?',
        options: ['auto', 'var', 'let', 'dynamic'],
        correctAnswer: 'var',
        explanation: 'Java 10 introduced var for local variable type inference. The compiler infers the type from the initializer. It cannot be used for fields, method parameters, or return types.'
      },
      {
        question: 'What is the result of: byte a = 10; byte b = 20; byte c = a + b;',
        options: ['30', '0', 'Compilation error', 'Runtime error'],
        correctAnswer: 'Compilation error',
        explanation: 'In expressions, byte values are promoted to int. The result of a + b is int, which cannot be assigned to byte without explicit casting: byte c = (byte)(a + b);'
      }
    ]
  },


  // ==================== CHAPTER 3: CONTROL FLOW ====================
  'control-flow': {
    title: 'Control Flow',
    notes: `## Control Flow Statements in Java

Control flow statements determine the order in which statements are executed. Java provides **decision-making**, **looping**, and **branching** statements.

### If-Else Statements

\`\`\`java
// Simple if
if (condition) {
    // executed if condition is true
}

// if-else
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}

// if-else-if ladder
int marks = 85;
if (marks >= 90) {
    System.out.println("Grade A");
} else if (marks >= 80) {
    System.out.println("Grade B");
} else if (marks >= 70) {
    System.out.println("Grade C");
} else {
    System.out.println("Grade D");
}

// Ternary operator (shorthand if-else)
String result = (marks >= 50) ? "Pass" : "Fail";
\`\`\`

### Switch Statement

\`\`\`java
// Traditional switch
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Other day");
}

// Switch with String (Java 7+)
String command = "start";
switch (command) {
    case "start":
        System.out.println("Starting...");
        break;
    case "stop":
        System.out.println("Stopping...");
        break;
    default:
        System.out.println("Unknown command");
}

// Enhanced switch expression (Java 14+)
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    default -> "Weekend";
};
\`\`\`

**Switch Rules:**
- Supports: byte, short, int, char, String (Java 7+), enum
- Does NOT support: long, float, double, boolean
- \`break\` prevents fall-through
- \`default\` is optional but recommended

### For Loop

\`\`\`java
// Standard for loop
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Multiple variables
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println(i + " " + j);
}

// Infinite loop
for (;;) {
    // runs forever until break
}
\`\`\`

### While Loop

\`\`\`java
// while loop - checks condition BEFORE execution
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}

// Infinite while
while (true) {
    // runs forever until break
}
\`\`\`

### Do-While Loop

\`\`\`java
// do-while - executes AT LEAST ONCE, checks condition AFTER
int num = 10;
do {
    System.out.println(num);
    num++;
} while (num < 5);
// Prints 10 (executes once even though condition is false)
\`\`\`

### Enhanced For Loop (For-Each)

\`\`\`java
// Used for arrays and collections
int[] numbers = {1, 2, 3, 4, 5};
for (int n : numbers) {
    System.out.println(n);
}

// With collections
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
for (String name : names) {
    System.out.println(name);
}
\`\`\`

**Limitation:** Cannot modify the array/collection or access index in enhanced for loop.

### Break and Continue

\`\`\`java
// break - exits the loop entirely
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    System.out.println(i); // prints 0 to 4
}

// continue - skips current iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    System.out.println(i); // prints odd numbers: 1, 3, 5, 7, 9
}
\`\`\`

### Labeled Loops (Break/Continue with Labels)

\`\`\`java
// Labeled break - exits outer loop
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
            break outer; // exits both loops
        }
        System.out.println(i + "," + j);
    }
}
// Output: 0,0  0,1  0,2  1,0

// Labeled continue - continues outer loop
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            continue outer; // skips to next i
        }
        System.out.println(i + "," + j);
    }
}
// Output: 0,0  1,0  2,0
\`\`\`

### Nested Loops - Common Patterns

\`\`\`java
// Pattern: Right triangle
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
/*
* 
* * 
* * * 
* * * * 
* * * * * 
*/

// Multiplication table
for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        System.out.printf("%4d", i * j);
    }
    System.out.println();
}
\`\`\`

### Key Interview Points
- \`do-while\` always executes at least once
- Switch does NOT support long, float, double, boolean
- Enhanced for loop cannot modify elements or access index
- Labeled break/continue are useful for nested loops
- An empty for loop \`for(;;)\` is an infinite loop
- Switch without break causes "fall-through" to next case
`,
    exercises: [
      {
        title: 'FizzBuzz',
        description: 'Write a program that prints numbers from 1 to 20. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".',
        starterCode: `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            // Implement FizzBuzz logic
            
        }
    }
}`,
        testInput: '',
        expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz'
      },
      {
        title: 'Number Pyramid',
        description: 'Write a program that prints a number pyramid of height 5 using nested loops.',
        starterCode: `public class NumberPyramid {
    public static void main(String[] args) {
        int rows = 5;
        // Print number pyramid
        // Row 1: 1
        // Row 2: 1 2
        // Row 3: 1 2 3
        // etc.
        
    }
}`,
        testInput: '',
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5'
      },
      {
        title: 'Prime Number Checker',
        description: 'Write a program that reads a number and determines if it is prime. Use an efficient algorithm (check up to square root).',
        starterCode: `import java.util.Scanner;

public class PrimeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        
        // Check if num is prime
        
        sc.close();
    }
}`,
        testInput: '17',
        expectedOutput: '17 is a prime number'
      },
      {
        title: 'Grade Calculator with Switch',
        description: 'Write a program that takes a percentage (0-100) and prints the grade using switch statement. A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60.',
        starterCode: `import java.util.Scanner;

public class GradeCalc {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int percentage = sc.nextInt();
        
        // Use switch(percentage / 10) to determine grade
        
        sc.close();
    }
}`,
        testInput: '85',
        expectedOutput: 'Grade: B'
      }
    ],
    mcqs: [
      {
        question: 'What is the output of a do-while loop when the condition is initially false?',
        options: ['No output', 'Executes once', 'Infinite loop', 'Compilation error'],
        correctAnswer: 'Executes once',
        explanation: 'A do-while loop always executes the body at least once before checking the condition. Even if the condition is false initially, the body runs once.'
      },
      {
        question: 'Which data type is NOT supported in a switch statement?',
        options: ['int', 'String', 'long', 'char'],
        correctAnswer: 'long',
        explanation: 'Switch supports byte, short, int, char, String (Java 7+), and enum. It does NOT support long, float, double, or boolean.'
      },
      {
        question: 'What does "break outer;" do in a labeled loop?',
        options: ['Breaks the inner loop only', 'Breaks the outer loop', 'Causes compilation error', 'Breaks all loops in the method'],
        correctAnswer: 'Breaks the outer loop',
        explanation: 'A labeled break exits the loop that is marked with the specified label. "break outer;" exits the loop labeled as "outer:", including any inner loops.'
      },
      {
        question: 'What is the output of: for(int i=0; i<5; i++){ if(i==3) continue; System.out.print(i+" "); }',
        options: ['0 1 2 3 4', '0 1 2 4', '0 1 2', '3'],
        correctAnswer: '0 1 2 4',
        explanation: 'continue skips the rest of the current iteration. When i==3, the print statement is skipped, but the loop continues with i=4.'
      },
      {
        question: 'What happens if you omit break in a switch case?',
        options: ['Compilation error', 'Only that case executes', 'Fall-through to next cases', 'Runtime error'],
        correctAnswer: 'Fall-through to next cases',
        explanation: 'Without break, execution "falls through" to subsequent cases until a break is encountered or the switch block ends. This is a common source of bugs.'
      },
      {
        question: 'Which loop is best for iterating over an array when you do NOT need the index?',
        options: ['for loop', 'while loop', 'enhanced for loop', 'do-while loop'],
        correctAnswer: 'enhanced for loop',
        explanation: 'The enhanced for loop (for-each) is designed for iterating over arrays and collections when you only need the elements, not their indices.'
      }
    ]
  },

  // ==================== CHAPTER 4: ARRAYS & STRINGS ====================
  arrays: {
    title: 'Arrays & Strings',
    notes: `## Arrays in Java

An array is a **fixed-size**, **indexed** collection of elements of the **same data type**. Arrays in Java are objects stored in heap memory.

### One-Dimensional Arrays

\`\`\`java
// Declaration
int[] numbers;        // Preferred style
int numbers2[];       // C-style (valid but not preferred)

// Instantiation
numbers = new int[5]; // Creates array of size 5, default values: 0

// Declaration + Initialization
int[] arr = {10, 20, 30, 40, 50};
int[] arr2 = new int[]{1, 2, 3, 4, 5};

// Accessing elements
System.out.println(arr[0]);  // 10 (0-indexed)
arr[2] = 99;                 // Modify element

// Array length
System.out.println(arr.length); // 5 (length is a field, not method)
\`\`\`

### Two-Dimensional Arrays

\`\`\`java
// Declaration and initialization
int[][] matrix = new int[3][4]; // 3 rows, 4 columns

// Literal initialization
int[][] grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Jagged array (rows with different lengths)
int[][] jagged = new int[3][];
jagged[0] = new int[2];  // first row has 2 columns
jagged[1] = new int[4];  // second row has 4 columns
jagged[2] = new int[3];  // third row has 3 columns

// Iterating 2D array
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        System.out.print(grid[i][j] + " ");
    }
    System.out.println();
}
\`\`\`

### Arrays Utility Class (java.util.Arrays)

\`\`\`java
import java.util.Arrays;

int[] arr = {5, 2, 8, 1, 9};

Arrays.sort(arr);                    // Sorts in ascending order
System.out.println(Arrays.toString(arr)); // [1, 2, 5, 8, 9]

int index = Arrays.binarySearch(arr, 5); // Returns index (array must be sorted)
int[] copy = Arrays.copyOf(arr, 10);     // Copy with new length
int[] range = Arrays.copyOfRange(arr, 1, 4); // Copy range [1, 4)
Arrays.fill(arr, 0);                    // Fill all elements with 0
boolean equal = Arrays.equals(arr, copy); // Compare arrays

// For 2D arrays
System.out.println(Arrays.deepToString(grid)); // [[1,2,3],[4,5,6],[7,8,9]]
boolean deepEqual = Arrays.deepEquals(grid1, grid2);
\`\`\`

### Strings in Java

Strings in Java are **immutable** objects of the \`java.lang.String\` class. Once created, their value cannot be changed.

\`\`\`java
// String creation
String s1 = "Hello";              // String literal (stored in String Pool)
String s2 = new String("Hello");  // New object in heap
String s3 = "Hello";              // Same reference as s1 (from pool)

System.out.println(s1 == s3);     // true (same pool reference)
System.out.println(s1 == s2);     // false (different objects)
System.out.println(s1.equals(s2)); // true (same content)
\`\`\`

### Important String Methods

\`\`\`java
String str = "Hello, World!";

// Length and access
str.length()              // 13
str.charAt(0)             // 'H'
str.indexOf('o')          // 4
str.lastIndexOf('o')      // 8

// Substring
str.substring(7)          // "World!"
str.substring(0, 5)       // "Hello"

// Comparison
str.equals("hello, world!")        // false
str.equalsIgnoreCase("hello, world!") // true
str.compareTo("Hello")             // positive (lexicographic)
str.startsWith("Hello")            // true
str.endsWith("!")                   // true
str.contains("World")              // true

// Modification (returns NEW string)
str.toUpperCase()         // "HELLO, WORLD!"
str.toLowerCase()         // "hello, world!"
str.trim()                // Removes leading/trailing whitespace
str.strip()               // Java 11+ (handles Unicode whitespace)
str.replace('l', 'L')    // "HeLLo, WorLd!"
str.replaceAll("[aeiou]", "*") // Regex replacement

// Splitting and joining
String[] parts = str.split(", ");  // ["Hello", "World!"]
String joined = String.join("-", "a", "b", "c"); // "a-b-c"

// Conversion
char[] chars = str.toCharArray();
String fromChars = new String(chars);
String numStr = String.valueOf(123);
\`\`\`

### StringBuilder and StringBuffer

Since Strings are immutable, concatenation creates new objects. Use **StringBuilder** (not thread-safe, faster) or **StringBuffer** (thread-safe, slower) for mutable strings.

\`\`\`java
// StringBuilder (preferred for single-threaded)
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");       // "Hello World"
sb.insert(5, ",");         // "Hello, World"
sb.delete(5, 6);           // "Hello World"
sb.reverse();              // "dlroW olleH"
sb.replace(0, 5, "Java"); // "Java olleH"
String result = sb.toString();

// Performance comparison
// BAD: O(n²) due to immutable String concatenation
String s = "";
for (int i = 0; i < 10000; i++) {
    s += i; // Creates new String object each time!
}

// GOOD: O(n) with StringBuilder
StringBuilder sb2 = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb2.append(i);
}
String result2 = sb2.toString();
\`\`\`

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes (synchronized) |
| Performance | Slow for concat | Fast | Slower than StringBuilder |
| Storage | String Pool + Heap | Heap | Heap |

### Key Interview Points
- Arrays have fixed size; use ArrayList for dynamic sizing
- String Pool: literals are stored in a special memory area for reuse
- \`==\` compares references; \`.equals()\` compares content for Strings
- StringBuilder is preferred over StringBuffer in single-threaded code
- String is immutable for security, caching, and thread-safety reasons
- \`str.length()\` is a method; \`arr.length\` is a field (no parentheses)
`,
    exercises: [
      {
        title: 'Array Rotation',
        description: 'Write a program that rotates an array to the left by a given number of positions. For example, rotating [1,2,3,4,5] by 2 gives [3,4,5,1,2].',
        starterCode: `import java.util.Arrays;

public class ArrayRotation {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int positions = 2;
        
        // Rotate array left by 'positions'
        
        System.out.println(Arrays.toString(arr));
    }
}`,
        testInput: '',
        expectedOutput: '[3, 4, 5, 1, 2]'
      },
      {
        title: 'String Palindrome Check',
        description: 'Write a program that checks if a given string is a palindrome (ignoring case and non-alphanumeric characters).',
        starterCode: `import java.util.Scanner;

public class PalindromeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        
        // Check if input is palindrome (ignore case and special chars)
        
        sc.close();
    }
}`,
        testInput: 'A man, a plan, a canal: Panama',
        expectedOutput: 'true'
      },
      {
        title: 'Matrix Transpose',
        description: 'Write a program that computes the transpose of a 3x3 matrix (swap rows and columns).',
        starterCode: `import java.util.Arrays;

public class MatrixTranspose {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Compute transpose
        int[][] transpose = new int[3][3];
        
        // Print result
        for (int[] row : transpose) {
            System.out.println(Arrays.toString(row));
        }
    }
}`,
        testInput: '',
        expectedOutput: '[1, 4, 7]\n[2, 5, 8]\n[3, 6, 9]'
      },
      {
        title: 'Word Frequency Counter',
        description: 'Write a program that counts the frequency of each word in a given sentence using String methods and arrays.',
        starterCode: `public class WordFrequency {
    public static void main(String[] args) {
        String sentence = "java is great and java is fun";
        
        // Split sentence into words
        // Count frequency of each unique word
        // Print each word and its count
        
    }
}`,
        testInput: '',
        expectedOutput: 'java: 2\nis: 2\ngreat: 1\nand: 1\nfun: 1'
      }
    ],
    mcqs: [
      {
        question: 'What is the default value of elements in a new int array?',
        options: ['null', '0', '-1', 'undefined'],
        correctAnswer: '0',
        explanation: 'Numeric primitive arrays are initialized with 0 (int, long, short, byte), 0.0 (float, double), false (boolean), or \'\\u0000\' (char).'
      },
      {
        question: 'What is the difference between String s1 = "Hello" and String s2 = new String("Hello")?',
        options: ['No difference', 's1 is in String Pool, s2 is in heap', 's1 is in heap, s2 is in String Pool', 's1 is mutable, s2 is immutable'],
        correctAnswer: 's1 is in String Pool, s2 is in heap',
        explanation: 'String literals are stored in the String Pool (a special area in heap). Using new always creates a new object in the regular heap, even if the same value exists in the pool.'
      },
      {
        question: 'Which class should be used for string manipulation in a single-threaded environment?',
        options: ['String', 'StringBuilder', 'StringBuffer', 'CharSequence'],
        correctAnswer: 'StringBuilder',
        explanation: 'StringBuilder is mutable and not synchronized, making it faster than StringBuffer in single-threaded environments. String is immutable and creates new objects on modification.'
      },
      {
        question: 'What does Arrays.copyOfRange(arr, 2, 5) return?',
        options: ['Elements at index 2, 3, 4, 5', 'Elements at index 2, 3, 4', 'Elements at index 2 to end', '3 elements starting from index 2'],
        correctAnswer: 'Elements at index 2, 3, 4',
        explanation: 'Arrays.copyOfRange(arr, from, to) copies elements from index "from" (inclusive) to index "to" (exclusive). So indices 2, 3, 4 are copied.'
      },
      {
        question: 'How do you get the length of an array vs a String?',
        options: ['arr.length() and str.length()', 'arr.length and str.length()', 'arr.size() and str.length()', 'arr.length and str.size()'],
        correctAnswer: 'arr.length and str.length()',
        explanation: 'Array length is accessed via the field "length" (no parentheses). String length is accessed via the method "length()" (with parentheses). This is a common interview question.'
      },
      {
        question: 'What is a jagged array in Java?',
        options: ['An array with null elements', 'A 2D array where rows have different lengths', 'An array that grows dynamically', 'An array of different data types'],
        correctAnswer: 'A 2D array where rows have different lengths',
        explanation: 'A jagged array is a 2D array where each row can have a different number of columns. In Java, a 2D array is actually an array of arrays, allowing different row lengths.'
      }
    ]
  },


  // ==================== CHAPTER 5: OOP IN JAVA ====================
  oop: {
    title: 'OOP in Java',
    notes: `## Object-Oriented Programming in Java

Java is fundamentally an **object-oriented** language. Everything revolves around **classes** and **objects**. The four pillars of OOP are: Encapsulation, Inheritance, Polymorphism, and Abstraction.

### Classes and Objects

A **class** is a blueprint/template. An **object** is an instance of a class.

\`\`\`java
// Class definition
public class Student {
    // Instance variables (fields)
    String name;
    int age;
    double gpa;
    
    // Method
    void display() {
        System.out.println(name + " - Age: " + age + " - GPA: " + gpa);
    }
}

// Creating objects
Student s1 = new Student();
s1.name = "Alice";
s1.age = 20;
s1.gpa = 3.8;
s1.display();

Student s2 = new Student();
s2.name = "Bob";
\`\`\`

### Constructors

A constructor is a special method that initializes an object. It has the **same name as the class** and **no return type**.

\`\`\`java
public class Employee {
    String name;
    int id;
    double salary;
    
    // Default constructor
    public Employee() {
        this.name = "Unknown";
        this.id = 0;
        this.salary = 0.0;
    }
    
    // Parameterized constructor
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    // Copy constructor
    public Employee(Employee other) {
        this.name = other.name;
        this.id = other.id;
        this.salary = other.salary;
    }
}

// Using constructors
Employee e1 = new Employee();                    // Default
Employee e2 = new Employee("Alice", 101, 50000); // Parameterized
Employee e3 = new Employee(e2);                  // Copy
\`\`\`

**Constructor Rules:**
- If you don't define any constructor, Java provides a default no-arg constructor
- If you define ANY constructor, the default is NOT provided automatically
- Constructors can be overloaded (multiple constructors with different parameters)
- Constructors cannot be abstract, static, final, or synchronized

### The 'this' Keyword

\`\`\`java
public class Person {
    String name;
    int age;
    
    // 'this' refers to current object
    public Person(String name, int age) {
        this.name = name;   // this.name = instance variable
        this.age = age;     // name = parameter
    }
    
    // Constructor chaining using this()
    public Person(String name) {
        this(name, 0);  // Calls the 2-param constructor
    }
    
    // Returning current object
    public Person setName(String name) {
        this.name = name;
        return this;  // Method chaining
    }
}
\`\`\`

### Static Keyword

\`\`\`java
public class Counter {
    static int count = 0;  // Shared across all objects
    int id;
    
    // Static block - runs once when class is loaded
    static {
        System.out.println("Class loaded!");
    }
    
    public Counter() {
        count++;
        this.id = count;
    }
    
    // Static method - belongs to class, not object
    public static int getCount() {
        return count;
        // Cannot use 'this' or access instance variables here
    }
}

// Usage
Counter c1 = new Counter();
Counter c2 = new Counter();
System.out.println(Counter.getCount()); // 2 (called on class)
\`\`\`

**Static Rules:**
- Static variables are shared among all instances
- Static methods can only access static members directly
- Static methods cannot use \`this\` or \`super\`
- Static blocks execute when the class is first loaded

### Final Keyword

\`\`\`java
// Final variable - constant (cannot be reassigned)
final double PI = 3.14159;
// PI = 3.14; // ERROR!

// Final method - cannot be overridden
public final void display() { }

// Final class - cannot be extended
public final class MathUtils { }

// Final reference - reference can't change, but object can be modified
final int[] arr = {1, 2, 3};
arr[0] = 10;        // OK - modifying object
// arr = new int[5]; // ERROR - changing reference

// Blank final - must be initialized in constructor
class Config {
    final String dbUrl;
    Config(String url) {
        this.dbUrl = url; // Must initialize here
    }
}
\`\`\`

### Packages

\`\`\`java
// Package declaration (must be first statement)
package com.infosys.training;

// Import statements
import java.util.ArrayList;
import java.util.List;
import java.util.*;  // Import all classes from java.util

// Static import
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
\`\`\`

### Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | ✓ | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✓ | ✗ |
| default (no modifier) | ✓ | ✓ | ✗ | ✗ |
| private | ✓ | ✗ | ✗ | ✗ |

\`\`\`java
public class BankAccount {
    private double balance;        // Only within this class
    protected String accountType;  // Class + package + subclass
    String branch;                 // Default: class + package only
    public String ownerName;       // Accessible everywhere
    
    // Encapsulation: private fields + public getters/setters
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}
\`\`\`

### Encapsulation (Data Hiding)

\`\`\`java
public class Student {
    // Private fields
    private String name;
    private int age;
    
    // Public getter
    public String getName() {
        return name;
    }
    
    // Public setter with validation
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Invalid age");
        }
    }
}
\`\`\`

### Key Interview Points
- A class can have multiple constructors (overloading)
- \`this()\` must be the first statement in a constructor
- Static methods cannot be overridden (they can be hidden)
- A \`.java\` file can have only ONE public class
- The public class name must match the file name
- Default constructor is provided only if NO constructor is defined
- Encapsulation = private fields + public getters/setters
`,
    exercises: [
      {
        title: 'Bank Account Class',
        description: 'Create a BankAccount class with private fields (accountNumber, balance, ownerName), constructors, getters/setters, and methods for deposit, withdraw, and display balance.',
        starterCode: `public class BankAccount {
    // Private fields
    
    // Constructor
    
    // Getters and Setters
    
    // deposit method
    
    // withdraw method (check sufficient balance)
    
    // display method
    
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC001", "Alice", 1000.0);
        acc.deposit(500);
        acc.withdraw(200);
        acc.display();
    }
}`,
        testInput: '',
        expectedOutput: 'Account: ACC001 | Owner: Alice | Balance: 1300.0'
      },
      {
        title: 'Static Counter',
        description: 'Create a class that tracks how many objects have been created using a static counter. Each object should have a unique ID assigned from the counter.',
        starterCode: `public class ObjectCounter {
    // Static counter
    
    // Instance ID
    
    // Constructor that increments counter and assigns ID
    
    // Static method to get total count
    
    public static void main(String[] args) {
        ObjectCounter o1 = new ObjectCounter();
        ObjectCounter o2 = new ObjectCounter();
        ObjectCounter o3 = new ObjectCounter();
        System.out.println("Total objects: " + ObjectCounter.getCount());
        System.out.println("o1 ID: " + o1.getId());
        System.out.println("o3 ID: " + o3.getId());
    }
}`,
        testInput: '',
        expectedOutput: 'Total objects: 3\no1 ID: 1\no3 ID: 3'
      },
      {
        title: 'Constructor Chaining',
        description: 'Create a Rectangle class with multiple constructors demonstrating constructor chaining using this(). Include constructors for: default (1x1), square (side), and rectangle (length, width).',
        starterCode: `public class Rectangle {
    private double length;
    private double width;
    
    // Default constructor (1x1)
    
    // Square constructor (side)
    
    // Full constructor (length, width)
    
    // Area and perimeter methods
    
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        Rectangle r2 = new Rectangle(5);
        Rectangle r3 = new Rectangle(4, 6);
        System.out.println("r1 area: " + r1.area());
        System.out.println("r2 area: " + r2.area());
        System.out.println("r3 area: " + r3.area());
    }
}`,
        testInput: '',
        expectedOutput: 'r1 area: 1.0\nr2 area: 25.0\nr3 area: 24.0'
      }
    ],
    mcqs: [
      {
        question: 'What happens if you define a parameterized constructor but no default constructor?',
        options: ['Java provides a default constructor automatically', 'You cannot create objects without arguments', 'Compilation error in the class', 'Runtime error'],
        correctAnswer: 'You cannot create objects without arguments',
        explanation: 'If you define any constructor, Java does NOT provide the default no-arg constructor. You must explicitly define it if you want to create objects without arguments.'
      },
      {
        question: 'Which access modifier makes a member accessible only within the same package?',
        options: ['private', 'protected', 'default (no modifier)', 'public'],
        correctAnswer: 'default (no modifier)',
        explanation: 'Default access (no modifier) restricts access to the same package only. Protected allows same package + subclasses in other packages.'
      },
      {
        question: 'Can a static method access instance variables directly?',
        options: ['Yes', 'No', 'Only if the variable is final', 'Only with this keyword'],
        correctAnswer: 'No',
        explanation: 'Static methods belong to the class, not any specific object. They cannot access instance variables or use "this" keyword directly. They can only access static members.'
      },
      {
        question: 'What is the purpose of the "this" keyword in Java?',
        options: ['To create a new object', 'To refer to the current object', 'To call the parent class', 'To import packages'],
        correctAnswer: 'To refer to the current object',
        explanation: '"this" refers to the current object instance. It is used to distinguish instance variables from parameters, call other constructors (this()), and return the current object.'
      },
      {
        question: 'How many public classes can a single .java file contain?',
        options: ['Unlimited', 'One', 'Two', 'Depends on JVM'],
        correctAnswer: 'One',
        explanation: 'A .java file can contain only ONE public class, and its name must match the file name. It can have multiple non-public (default access) classes.'
      },
      {
        question: 'What does the final keyword mean when applied to a variable?',
        options: ['The variable is static', 'The variable cannot be reassigned', 'The variable is private', 'The variable is constant at compile time'],
        correctAnswer: 'The variable cannot be reassigned',
        explanation: 'A final variable cannot be reassigned after initialization. For reference types, the reference cannot change but the object it points to can still be modified.'
      }
    ]
  },


  // ==================== CHAPTER 6: INHERITANCE ====================
  inheritance: {
    title: 'Inheritance',
    notes: `## Inheritance in Java

Inheritance is a mechanism where a **child class** (subclass) acquires the properties and behaviors of a **parent class** (superclass). It promotes **code reuse** and establishes an **IS-A** relationship.

### Types of Inheritance in Java

| Type | Description | Supported? |
|------|-------------|-----------|
| Single | One parent, one child | ✓ |
| Multilevel | A → B → C (chain) | ✓ |
| Hierarchical | One parent, multiple children | ✓ |
| Multiple | Multiple parents, one child | ✗ (via classes) |
| Hybrid | Combination of above | ✗ (via classes) |

**Note:** Multiple inheritance is supported through **interfaces** only.

### extends Keyword

\`\`\`java
// Parent class (Superclass)
class Animal {
    String name;
    int age;
    
    void eat() {
        System.out.println(name + " is eating");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (Subclass)
class Dog extends Animal {
    String breed;
    
    void bark() {
        System.out.println(name + " is barking!");
    }
    
    // Dog inherits eat() and sleep() from Animal
}

// Usage
Dog d = new Dog();
d.name = "Buddy";
d.breed = "Labrador";
d.eat();   // Inherited method
d.bark();  // Own method
\`\`\`

### super Keyword

\`\`\`java
class Vehicle {
    String brand;
    int speed;
    
    Vehicle(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }
    
    void display() {
        System.out.println("Brand: " + brand + ", Speed: " + speed);
    }
}

class Car extends Vehicle {
    int doors;
    
    Car(String brand, int speed, int doors) {
        super(brand, speed);  // Call parent constructor (MUST be first line)
        this.doors = doors;
    }
    
    @Override
    void display() {
        super.display();  // Call parent method
        System.out.println("Doors: " + doors);
    }
}
\`\`\`

**super uses:**
1. \`super.variable\` — access parent's field (when shadowed)
2. \`super.method()\` — call parent's method (when overridden)
3. \`super()\` — call parent's constructor (must be first statement)

### Method Overriding

\`\`\`java
class Shape {
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override  // Annotation (optional but recommended)
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    double length, width;
    
    Rectangle(double l, double w) {
        this.length = l;
        this.width = w;
    }
    
    @Override
    double area() {
        return length * width;
    }
}
\`\`\`

**Overriding Rules:**
- Method signature must be exactly the same
- Return type must be same or covariant (subtype)
- Access modifier cannot be more restrictive
- Cannot override static, final, or private methods
- \`@Override\` annotation helps catch errors at compile time

### Abstract Classes

\`\`\`java
// Cannot be instantiated directly
abstract class Shape {
    String color;
    
    // Abstract method - no body, must be implemented by subclass
    abstract double area();
    abstract double perimeter();
    
    // Concrete method - has implementation
    void displayColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    @Override
    double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double perimeter() {
        return 2 * Math.PI * radius;
    }
}

// Shape s = new Shape(); // ERROR! Cannot instantiate abstract class
Shape s = new Circle(5, "Red"); // OK - polymorphic reference
\`\`\`

**Abstract Class Rules:**
- Declared with \`abstract\` keyword
- Can have abstract AND concrete methods
- Cannot be instantiated
- Can have constructors (called by subclass via super)
- If a class has even ONE abstract method, the class MUST be abstract
- A subclass MUST implement all abstract methods OR be declared abstract itself

### The Object Class

Every class in Java implicitly extends \`java.lang.Object\`. Important methods:

\`\`\`java
public class Person {
    String name;
    int age;
    
    // toString() - string representation
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
    
    // equals() - logical equality
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person other = (Person) obj;
        return age == other.age && name.equals(other.name);
    }
    
    // hashCode() - must override if equals is overridden
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
\`\`\`

### instanceof Operator

\`\`\`java
Animal a = new Dog();
System.out.println(a instanceof Dog);    // true
System.out.println(a instanceof Animal); // true
System.out.println(a instanceof Object); // true

// Safe casting
if (a instanceof Dog) {
    Dog d = (Dog) a;  // Downcasting
    d.bark();
}

// Pattern matching instanceof (Java 16+)
if (a instanceof Dog d) {
    d.bark();  // No explicit cast needed
}
\`\`\`

### Constructor Chaining in Inheritance

\`\`\`java
class A {
    A() { System.out.println("A constructor"); }
}
class B extends A {
    B() { System.out.println("B constructor"); }
}
class C extends B {
    C() { System.out.println("C constructor"); }
}

new C();
// Output:
// A constructor
// B constructor  
// C constructor
// (Parent constructors are called first, top-down)
\`\`\`

### Key Interview Points
- Java does NOT support multiple inheritance through classes (diamond problem)
- Constructor chaining: parent constructor is always called first
- \`super()\` is implicitly added if not explicitly written
- Private members are inherited but NOT accessible in subclass
- A final class cannot be extended; a final method cannot be overridden
- Abstract class can have 0 abstract methods (but then why make it abstract?)
- \`instanceof\` returns false for null references
`,
    exercises: [
      {
        title: 'Shape Hierarchy',
        description: 'Create an abstract Shape class with abstract methods area() and perimeter(). Implement Circle and Rectangle subclasses. Demonstrate polymorphism by storing different shapes in a Shape array.',
        starterCode: `abstract class Shape {
    // Abstract methods
    
    // Concrete method to display info
}

class Circle extends Shape {
    // Implementation
}

class Rectangle extends Shape {
    // Implementation
}

public class ShapeDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle(5);
        shapes[1] = new Rectangle(4, 6);
        shapes[2] = new Circle(3);
        
        for (Shape s : shapes) {
            System.out.printf("Area: %.2f, Perimeter: %.2f%n", s.area(), s.perimeter());
        }
    }
}`,
        testInput: '',
        expectedOutput: 'Area: 78.54, Perimeter: 31.42\nArea: 24.00, Perimeter: 20.00\nArea: 28.27, Perimeter: 18.85'
      },
      {
        title: 'Employee Hierarchy',
        description: 'Create a class hierarchy: Employee (base) → Manager and Developer (subclasses). Override a calculateSalary() method that adds bonus for Manager and overtime for Developer.',
        starterCode: `class Employee {
    String name;
    double baseSalary;
    
    // Constructor and methods
    
    double calculateSalary() {
        return baseSalary;
    }
}

class Manager extends Employee {
    double bonus;
    // Override calculateSalary to include bonus
}

class Developer extends Employee {
    int overtimeHours;
    double overtimeRate;
    // Override calculateSalary to include overtime
}

public class EmployeeDemo {
    public static void main(String[] args) {
        Employee[] employees = {
            new Manager("Alice", 80000, 10000),
            new Developer("Bob", 70000, 10, 500)
        };
        for (Employee e : employees) {
            System.out.println(e.name + ": " + e.calculateSalary());
        }
    }
}`,
        testInput: '',
        expectedOutput: 'Alice: 90000.0\nBob: 75000.0'
      },
      {
        title: 'instanceof and Casting',
        description: 'Create an Animal hierarchy (Animal → Dog, Cat). Write a method that accepts an Animal and uses instanceof to call specific methods (bark for Dog, meow for Cat).',
        starterCode: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void makeSound() { System.out.println(name + " makes a sound"); }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    void bark() { System.out.println(name + " barks: Woof!"); }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    void meow() { System.out.println(name + " meows: Meow!"); }
}

public class AnimalDemo {
    static void identifyAndAct(Animal a) {
        // Use instanceof to identify type and call specific method
    }
    
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Rex"), new Cat("Whiskers"), new Dog("Max") };
        for (Animal a : animals) {
            identifyAndAct(a);
        }
    }
}`,
        testInput: '',
        expectedOutput: 'Rex barks: Woof!\nWhiskers meows: Meow!\nMax barks: Woof!'
      }
    ],
    mcqs: [
      {
        question: 'Which type of inheritance is NOT supported in Java through classes?',
        options: ['Single', 'Multilevel', 'Multiple', 'Hierarchical'],
        correctAnswer: 'Multiple',
        explanation: 'Java does not support multiple inheritance through classes to avoid the diamond problem. However, a class can implement multiple interfaces to achieve similar functionality.'
      },
      {
        question: 'What is the order of constructor execution in inheritance?',
        options: ['Child first, then parent', 'Parent first, then child', 'Only child constructor', 'Random order'],
        correctAnswer: 'Parent first, then child',
        explanation: 'Constructors execute from top to bottom in the inheritance hierarchy. The parent constructor is always called first (implicitly via super() or explicitly).'
      },
      {
        question: 'Can an abstract class have a constructor?',
        options: ['No, abstract classes cannot have constructors', 'Yes, and it is called when subclass is instantiated', 'Yes, but it is never called', 'Only if it has no abstract methods'],
        correctAnswer: 'Yes, and it is called when subclass is instantiated',
        explanation: 'Abstract classes can have constructors. They are called via super() when a concrete subclass is instantiated. This is useful for initializing common fields.'
      },
      {
        question: 'What does @Override annotation do?',
        options: ['Makes the method override mandatory', 'Causes a compile error if method does not actually override', 'Improves performance', 'Makes the method final'],
        correctAnswer: 'Causes a compile error if method does not actually override',
        explanation: '@Override is a compile-time check. If the annotated method does not actually override a superclass method (e.g., due to typo), the compiler reports an error.'
      },
      {
        question: 'What is the result of: Animal a = new Dog(); a instanceof Object?',
        options: ['true', 'false', 'Compilation error', 'Runtime error'],
        correctAnswer: 'true',
        explanation: 'Every class in Java extends Object (directly or indirectly). Since Dog extends Animal which extends Object, any non-null reference is an instanceof Object.'
      },
      {
        question: 'Can a subclass override a private method of the parent class?',
        options: ['Yes', 'No, private methods are not inherited', 'Only if the subclass is in the same package', 'Only with @Override annotation'],
        correctAnswer: 'No, private methods are not inherited',
        explanation: 'Private methods are not visible to subclasses, so they cannot be overridden. If a subclass defines a method with the same name, it is a completely new method, not an override.'
      }
    ]
  },

  // ==================== CHAPTER 7: POLYMORPHISM ====================
  polymorphism: {
    title: 'Polymorphism',
    notes: `## Polymorphism in Java

Polymorphism means "many forms." It allows objects to be treated as instances of their parent class while executing behavior specific to their actual class. There are two types: **Compile-time** (static) and **Runtime** (dynamic) polymorphism.

### Compile-Time Polymorphism (Method Overloading)

Method overloading allows multiple methods with the **same name** but **different parameters** in the same class.

\`\`\`java
public class Calculator {
    // Different number of parameters
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Different parameter types
    double add(double a, double b) {
        return a + b;
    }
    
    // Different parameter order
    String add(String a, int b) {
        return a + b;
    }
    
    String add(int a, String b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(2, 3);        // calls add(int, int) → 5
calc.add(2, 3, 4);    // calls add(int, int, int) → 9
calc.add(2.5, 3.5);   // calls add(double, double) → 6.0
\`\`\`

**Overloading Rules:**
- Must have different parameter list (number, type, or order)
- Return type alone is NOT sufficient to overload
- Access modifiers can be different
- Can throw different exceptions
- Resolved at **compile time** based on reference type

### Runtime Polymorphism (Method Overriding + Dynamic Dispatch)

Runtime polymorphism occurs when a subclass provides a specific implementation of a method already defined in its parent class. The method to call is determined at **runtime** based on the actual object type.

\`\`\`java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

// Dynamic Method Dispatch
Animal a;

a = new Dog();
a.sound();  // "Dog barks" (runtime decision)

a = new Cat();
a.sound();  // "Cat meows" (runtime decision)

// Polymorphic array
Animal[] animals = { new Dog(), new Cat(), new Dog() };
for (Animal animal : animals) {
    animal.sound();  // Calls appropriate overridden method
}
\`\`\`

### Dynamic Method Dispatch

The JVM determines which method to call based on the **actual object type** (not the reference type) at runtime.

\`\`\`java
class Parent {
    void show() { System.out.println("Parent"); }
}

class Child extends Parent {
    @Override
    void show() { System.out.println("Child"); }
}

Parent p = new Child();  // Upcasting
p.show();  // "Child" — determined at runtime

// The reference type determines WHAT methods can be called
// The object type determines WHICH implementation runs
\`\`\`

### Method Overloading vs Overriding

| Feature | Overloading | Overriding |
|---------|-------------|-----------|
| Where | Same class | Parent-child classes |
| Parameters | Must differ | Must be same |
| Return type | Can differ | Same or covariant |
| Access modifier | Can differ | Cannot be more restrictive |
| Static methods | Can be overloaded | Cannot be overridden (hidden) |
| Binding | Compile-time (static) | Runtime (dynamic) |
| Also called | Static polymorphism | Dynamic polymorphism |

### Covariant Return Types

\`\`\`java
class Animal {
    Animal create() {
        return new Animal();
    }
}

class Dog extends Animal {
    @Override
    Dog create() {  // Covariant return: Dog is subtype of Animal
        return new Dog();
    }
}
\`\`\`

The overriding method can return a **subtype** of the return type declared in the parent method. This is called covariant return type (Java 5+).

### Upcasting and Downcasting

\`\`\`java
// Upcasting (implicit) - child to parent reference
Animal a = new Dog();  // Automatic, always safe
// Can only call Animal methods through 'a'

// Downcasting (explicit) - parent reference to child type
Dog d = (Dog) a;  // Manual cast, can throw ClassCastException
d.bark();  // Now can access Dog-specific methods

// Safe downcasting
if (a instanceof Dog) {
    Dog d2 = (Dog) a;
    d2.bark();
}

// DANGEROUS:
Animal a2 = new Cat();
// Dog d3 = (Dog) a2;  // ClassCastException at runtime!
\`\`\`

### Polymorphism with Method Parameters

\`\`\`java
class Printer {
    // Accepts any Shape subclass
    void printArea(Shape s) {
        System.out.println("Area: " + s.area());
    }
}

Printer p = new Printer();
p.printArea(new Circle(5));      // Works with Circle
p.printArea(new Rectangle(3, 4)); // Works with Rectangle
\`\`\`

### Static Method Hiding (NOT Overriding)

\`\`\`java
class Parent {
    static void greet() {
        System.out.println("Hello from Parent");
    }
}

class Child extends Parent {
    static void greet() {  // This HIDES parent's method, not overrides
        System.out.println("Hello from Child");
    }
}

Parent p = new Child();
p.greet();  // "Hello from Parent" — static binding (reference type)
// Static methods are resolved at compile time based on reference type
\`\`\`

### Key Interview Points
- Overloading is compile-time; overriding is runtime polymorphism
- Static methods cannot be overridden, only hidden
- Private methods cannot be overridden (not inherited)
- Final methods cannot be overridden
- Constructors cannot be overridden (they are not inherited)
- The reference type determines accessible methods; object type determines implementation
- Covariant return types allow returning subtypes in overriding methods
- \`==\` checks reference equality; polymorphism doesn't affect this
`,
    exercises: [
      {
        title: 'Method Overloading',
        description: 'Create a MathUtils class with overloaded methods: multiply(int, int), multiply(int, int, int), multiply(double, double), and multiply(int, double). Demonstrate each.',
        starterCode: `public class MathUtils {
    // Overloaded multiply methods
    
    public static void main(String[] args) {
        MathUtils m = new MathUtils();
        System.out.println(m.multiply(3, 4));
        System.out.println(m.multiply(2, 3, 4));
        System.out.println(m.multiply(2.5, 3.0));
        System.out.println(m.multiply(3, 2.5));
    }
}`,
        testInput: '',
        expectedOutput: '12\n24\n7.5\n7.5'
      },
      {
        title: 'Payment System Polymorphism',
        description: 'Create a Payment base class with a processPayment(double amount) method. Create subclasses CreditCard, DebitCard, and UPI that override this method with specific implementations.',
        starterCode: `class Payment {
    String holder;
    Payment(String holder) { this.holder = holder; }
    
    void processPayment(double amount) {
        System.out.println("Processing payment of Rs." + amount);
    }
}

class CreditCard extends Payment {
    // Add credit limit check, override processPayment
}

class DebitCard extends Payment {
    // Add balance check, override processPayment
}

class UPI extends Payment {
    // Add UPI ID, override processPayment
}

public class PaymentDemo {
    public static void main(String[] args) {
        Payment[] payments = {
            new CreditCard("Alice", 100000),
            new DebitCard("Bob", 50000),
            new UPI("Charlie", "charlie@upi")
        };
        for (Payment p : payments) {
            p.processPayment(5000);
        }
    }
}`,
        testInput: '',
        expectedOutput: 'CreditCard payment of Rs.5000.0 by Alice\nDebitCard payment of Rs.5000.0 by Bob\nUPI payment of Rs.5000.0 by Charlie via charlie@upi'
      },
      {
        title: 'Dynamic Dispatch Demo',
        description: 'Create a scenario demonstrating dynamic method dispatch where the same reference variable calls different implementations based on the assigned object.',
        starterCode: `class Notification {
    void send(String message) {
        System.out.println("Notification: " + message);
    }
}

class EmailNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class PushNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("Push: " + message);
    }
}

public class NotificationDemo {
    public static void main(String[] args) {
        Notification n;
        
        // Demonstrate dynamic dispatch
        n = new EmailNotification();
        n.send("Welcome!");
        
        n = new SMSNotification();
        n.send("OTP: 1234");
        
        n = new PushNotification();
        n.send("New message");
    }
}`,
        testInput: '',
        expectedOutput: 'Email: Welcome!\nSMS: OTP: 1234\nPush: New message'
      }
    ],
    mcqs: [
      {
        question: 'Which type of polymorphism is method overloading?',
        options: ['Runtime polymorphism', 'Compile-time polymorphism', 'Dynamic polymorphism', 'Late binding'],
        correctAnswer: 'Compile-time polymorphism',
        explanation: 'Method overloading is resolved at compile time based on the method signature (number, type, order of parameters). It is also called static polymorphism or early binding.'
      },
      {
        question: 'What determines which overridden method is called at runtime?',
        options: ['Reference type', 'Object type', 'Return type', 'Access modifier'],
        correctAnswer: 'Object type',
        explanation: 'In dynamic method dispatch, the actual object type (not the reference type) determines which overridden method is called. This decision is made at runtime by the JVM.'
      },
      {
        question: 'Can we overload methods by changing only the return type?',
        options: ['Yes', 'No', 'Only for void methods', 'Only for static methods'],
        correctAnswer: 'No',
        explanation: 'Return type alone is not sufficient for method overloading. The parameter list must differ. Having same name and parameters but different return type causes a compilation error.'
      },
      {
        question: 'What is a covariant return type?',
        options: ['Returning void', 'Returning the same type as parent', 'Returning a subtype of parent method return type', 'Returning Object type'],
        correctAnswer: 'Returning a subtype of parent method return type',
        explanation: 'Covariant return type allows an overriding method to return a subtype of the type returned by the overridden method. E.g., parent returns Animal, child can return Dog.'
      },
      {
        question: 'What happens when a static method in child class has same signature as parent?',
        options: ['Method overriding', 'Method hiding', 'Compilation error', 'Runtime error'],
        correctAnswer: 'Method hiding',
        explanation: 'Static methods cannot be overridden. When a child class defines a static method with the same signature, it hides the parent method. The method called depends on the reference type, not object type.'
      },
      {
        question: 'Parent p = new Child(); p.method(); — Which method() is called?',
        options: ['Parent version always', 'Child version (if overridden)', 'Depends on return type', 'Compilation error'],
        correctAnswer: 'Child version (if overridden)',
        explanation: 'Due to dynamic method dispatch, the JVM calls the method based on the actual object type (Child), not the reference type (Parent). If Child overrides method(), Child version is called.'
      }
    ]
  },


  // ==================== CHAPTER 8: INTERFACES & ABSTRACT CLASSES ====================
  interfaces: {
    title: 'Interfaces & Abstract Classes',
    notes: `## Interfaces in Java

An interface is a **contract** that defines what a class must do, without specifying how. It achieves **100% abstraction** (prior to Java 8) and enables **multiple inheritance** of type.

### Defining and Implementing Interfaces

\`\`\`java
// Interface definition
public interface Drawable {
    // Abstract method (implicitly public abstract)
    void draw();
    
    // Constants (implicitly public static final)
    int MAX_SIZE = 100;
}

public interface Resizable {
    void resize(double factor);
}

// Implementing interfaces
public class Circle implements Drawable, Resizable {
    double radius;
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
    }
}
\`\`\`

### Interface Features (Java 8+)

\`\`\`java
public interface Vehicle {
    // Abstract method
    void start();
    void stop();
    
    // Default method (Java 8+) - has implementation
    default void honk() {
        System.out.println("Beep beep!");
    }
    
    // Static method (Java 8+)
    static int getMaxSpeed() {
        return 200;
    }
    
    // Private method (Java 9+) - helper for default methods
    private void log(String msg) {
        System.out.println("[LOG] " + msg);
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starting...");
    }
    
    @Override
    public void stop() {
        System.out.println("Car stopping...");
    }
    
    // Can optionally override default method
    @Override
    public void honk() {
        System.out.println("Car horn: HONK!");
    }
}
\`\`\`

### Multiple Interface Inheritance

\`\`\`java
interface Flyable {
    default void move() {
        System.out.println("Flying");
    }
}

interface Swimmable {
    default void move() {
        System.out.println("Swimming");
    }
}

// Must resolve conflict when two interfaces have same default method
class Duck implements Flyable, Swimmable {
    @Override
    public void move() {
        // Must override to resolve ambiguity
        Flyable.super.move();  // Call specific interface's default
        System.out.println("Duck can fly and swim!");
    }
}
\`\`\`

### Functional Interfaces (Java 8+)

A functional interface has **exactly one abstract method**. Used with lambda expressions.

\`\`\`java
@FunctionalInterface
public interface Calculator {
    double calculate(double a, double b);
    
    // Can have default and static methods
    default void printResult(double a, double b) {
        System.out.println("Result: " + calculate(a, b));
    }
}

// Using with lambda expression
Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;

System.out.println(add.calculate(5, 3));      // 8.0
System.out.println(multiply.calculate(5, 3)); // 15.0

// Built-in functional interfaces (java.util.function)
// Predicate<T>    : T → boolean     (test)
// Function<T,R>   : T → R           (apply)
// Consumer<T>     : T → void        (accept)
// Supplier<T>     : () → T          (get)
// BiFunction<T,U,R>: (T, U) → R    (apply)
\`\`\`

### Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|---------------|
| Methods | Abstract + default + static | Abstract + concrete |
| Variables | Only public static final | Any type |
| Constructor | No | Yes |
| Multiple inheritance | Yes (implements multiple) | No (extends one) |
| Access modifiers | Public only (methods) | Any |
| When to use | Define capability/contract | Share code among related classes |
| Keyword | implements | extends |
| State | No instance state | Can have instance state |

### When to Use What?

\`\`\`java
// Use INTERFACE when:
// - Defining a contract/capability (Comparable, Serializable, Runnable)
// - Need multiple inheritance
// - Unrelated classes need same behavior

// Use ABSTRACT CLASS when:
// - Share code among closely related classes
// - Need non-public members or instance variables
// - Need constructors or non-static/non-final fields
// - Want to provide a partial implementation

// Example: Good design
interface Sortable {
    int compareTo(Object o);
}

abstract class AbstractList implements Sortable {
    protected int size;
    
    abstract void add(Object item);
    
    int getSize() { return size; }
}

class MyArrayList extends AbstractList {
    @Override
    void add(Object item) { /* implementation */ }
    
    @Override
    public int compareTo(Object o) { /* implementation */ return 0; }
}
\`\`\`

### Interface Inheritance

\`\`\`java
interface A {
    void methodA();
}

interface B extends A {  // Interface extends interface
    void methodB();
}

interface C extends A, B {  // Interface can extend multiple interfaces
    void methodC();
}

class MyClass implements C {
    @Override
    public void methodA() { }
    @Override
    public void methodB() { }
    @Override
    public void methodC() { }
}
\`\`\`

### Marker Interfaces

Interfaces with no methods — used to "mark" a class with a capability:
- \`Serializable\` — object can be serialized
- \`Cloneable\` — object can be cloned
- \`Remote\` — object can be used in RMI

\`\`\`java
public class Student implements Serializable, Cloneable {
    // Marked as serializable and cloneable
}
\`\`\`

### Key Interview Points
- Interface methods are implicitly \`public abstract\` (before Java 8)
- Interface variables are implicitly \`public static final\`
- A class can implement multiple interfaces but extend only one class
- Java 8 added default and static methods to interfaces
- Java 9 added private methods to interfaces
- Functional interface = exactly one abstract method (for lambdas)
- \`@FunctionalInterface\` annotation is optional but recommended
- Diamond problem is resolved by requiring explicit override
`,
    exercises: [
      {
        title: 'Shape Interface',
        description: 'Create a Shape interface with area() and perimeter() methods. Create a Printable interface with printDetails(). Implement both in Circle and Rectangle classes.',
        starterCode: `interface Shape {
    double area();
    double perimeter();
}

interface Printable {
    void printDetails();
}

class Circle implements Shape, Printable {
    // Implement all methods
}

class Rectangle implements Shape, Printable {
    // Implement all methods
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Shape c = new Circle(7);
        Shape r = new Rectangle(5, 3);
        
        ((Printable) c).printDetails();
        ((Printable) r).printDetails();
    }
}`,
        testInput: '',
        expectedOutput: 'Circle - Radius: 7.0, Area: 153.94, Perimeter: 43.98\nRectangle - L: 5.0, W: 3.0, Area: 15.00, Perimeter: 16.00'
      },
      {
        title: 'Functional Interface with Lambda',
        description: 'Create a functional interface StringOperation with a method operate(String s). Use lambda expressions to implement: toUpperCase, reverse, and removeSpaces operations.',
        starterCode: `@FunctionalInterface
interface StringOperation {
    String operate(String s);
}

public class LambdaDemo {
    public static void main(String[] args) {
        // Define lambdas for each operation
        StringOperation toUpper = null;   // implement
        StringOperation reverse = null;   // implement
        StringOperation removeSpaces = null; // implement
        
        String test = "Hello World";
        System.out.println(toUpper.operate(test));
        System.out.println(reverse.operate(test));
        System.out.println(removeSpaces.operate(test));
    }
}`,
        testInput: '',
        expectedOutput: 'HELLO WORLD\ndlroW olleH\nHelloWorld'
      },
      {
        title: 'Default Method Conflict',
        description: 'Create two interfaces with the same default method. Implement a class that resolves the conflict by overriding the method and calling both interface defaults.',
        starterCode: `interface Logger {
    default void log(String msg) {
        System.out.println("[LOG] " + msg);
    }
}

interface Auditor {
    default void log(String msg) {
        System.out.println("[AUDIT] " + msg);
    }
}

class AppService implements Logger, Auditor {
    // Resolve the conflict
    
    public static void main(String[] args) {
        AppService app = new AppService();
        app.log("User logged in");
    }
}`,
        testInput: '',
        expectedOutput: '[LOG] User logged in\n[AUDIT] User logged in'
      }
    ],
    mcqs: [
      {
        question: 'What is the default access modifier for interface methods (before Java 8)?',
        options: ['private', 'protected', 'public abstract', 'default'],
        correctAnswer: 'public abstract',
        explanation: 'Interface methods are implicitly public and abstract. You cannot declare them as private or protected (before Java 9 which added private methods).'
      },
      {
        question: 'How many abstract methods can a functional interface have?',
        options: ['Zero', 'Exactly one', 'Multiple', 'At least one'],
        correctAnswer: 'Exactly one',
        explanation: 'A functional interface must have exactly one abstract method. It can have multiple default and static methods, but only one abstract method to be used with lambda expressions.'
      },
      {
        question: 'Can an interface extend another interface?',
        options: ['No', 'Yes, using implements', 'Yes, using extends', 'Only abstract interfaces'],
        correctAnswer: 'Yes, using extends',
        explanation: 'An interface extends another interface using the extends keyword (not implements). An interface can even extend multiple interfaces: interface C extends A, B { }'
      },
      {
        question: 'What was added to interfaces in Java 8?',
        options: ['Constructors', 'Default and static methods', 'Instance variables', 'Private fields'],
        correctAnswer: 'Default and static methods',
        explanation: 'Java 8 added default methods (with implementation) and static methods to interfaces. This allowed adding new methods to interfaces without breaking existing implementations.'
      },
      {
        question: 'Interface variables are implicitly:',
        options: ['private static final', 'public static final', 'protected static', 'public final'],
        correctAnswer: 'public static final',
        explanation: 'All variables declared in an interface are implicitly public, static, and final (constants). They must be initialized at declaration and cannot be changed.'
      },
      {
        question: 'What happens if a class implements two interfaces with the same default method?',
        options: ['Compilation error unless overridden', 'First interface method is used', 'Second interface method is used', 'Runtime error'],
        correctAnswer: 'Compilation error unless overridden',
        explanation: 'If two interfaces have the same default method, the implementing class MUST override it to resolve the ambiguity. It can call specific interface defaults using InterfaceName.super.method().'
      },
      {
        question: 'Which is a marker interface in Java?',
        options: ['Comparable', 'Runnable', 'Serializable', 'Iterable'],
        correctAnswer: 'Serializable',
        explanation: 'Serializable is a marker interface (no methods). It marks a class as capable of being serialized. Comparable has compareTo(), Runnable has run(), and Iterable has iterator().'
      }
    ]
  },

  // ==================== CHAPTER 9: EXCEPTION HANDLING ====================
  exceptions: {
    title: 'Exception Handling',
    notes: `## Exception Handling in Java

An exception is an **unwanted event** that disrupts the normal flow of a program. Java provides a robust mechanism to handle exceptions using try-catch-finally blocks.

### Exception Hierarchy

\`\`\`
java.lang.Object
  └── java.lang.Throwable
        ├── java.lang.Error (serious, unrecoverable)
        │     ├── OutOfMemoryError
        │     ├── StackOverflowError
        │     └── VirtualMachineError
        └── java.lang.Exception
              ├── IOException (checked)
              ├── SQLException (checked)
              ├── ClassNotFoundException (checked)
              └── RuntimeException (unchecked)
                    ├── NullPointerException
                    ├── ArrayIndexOutOfBoundsException
                    ├── ArithmeticException
                    ├── NumberFormatException
                    ├── ClassCastException
                    └── IllegalArgumentException
\`\`\`

### Checked vs Unchecked Exceptions

| Type | Checked | Unchecked |
|------|---------|-----------|
| Checked at | Compile time | Runtime |
| Must handle? | Yes (try-catch or throws) | No (optional) |
| Extends | Exception (not RuntimeException) | RuntimeException |
| Examples | IOException, SQLException | NullPointerException, ArithmeticException |
| Cause | External factors | Programming bugs |

### try-catch-finally

\`\`\`java
try {
    // Code that might throw exception
    int result = 10 / 0;
    System.out.println(result);
} catch (ArithmeticException e) {
    // Handle specific exception
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (Exception e) {
    // Handle general exception (must be after specific)
    System.out.println("Error: " + e.getMessage());
} finally {
    // ALWAYS executes (cleanup code)
    System.out.println("Finally block executed");
}
\`\`\`

### Multiple Catch Blocks

\`\`\`java
try {
    int[] arr = new int[5];
    arr[10] = 50;  // ArrayIndexOutOfBoundsException
} catch (ArithmeticException e) {
    System.out.println("Arithmetic error");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error");
}

// Multi-catch (Java 7+) - single block for multiple exceptions
try {
    // risky code
} catch (IOException | SQLException e) {
    System.out.println("IO or SQL error: " + e.getMessage());
}
\`\`\`

### throw and throws Keywords

\`\`\`java
// throw - explicitly throw an exception
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    this.age = age;
}

// throws - declare that method might throw exception
public void readFile(String path) throws IOException {
    FileReader fr = new FileReader(path);  // May throw FileNotFoundException
    BufferedReader br = new BufferedReader(fr);
    String line = br.readLine();  // May throw IOException
    br.close();
}

// Calling method that throws checked exception
public static void main(String[] args) {
    try {
        readFile("data.txt");
    } catch (IOException e) {
        System.out.println("File error: " + e.getMessage());
    }
}
\`\`\`

### Custom Exceptions

\`\`\`java
// Custom checked exception
public class InsufficientBalanceException extends Exception {
    private double amount;
    
    public InsufficientBalanceException(String message, double amount) {
        super(message);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Custom unchecked exception
public class InvalidAccountException extends RuntimeException {
    public InvalidAccountException(String message) {
        super(message);
    }
}

// Using custom exceptions
public class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Insufficient balance. Available: " + balance, amount
            );
        }
        balance -= amount;
    }
}
\`\`\`

### try-with-resources (Java 7+)

Automatically closes resources that implement \`AutoCloseable\` or \`Closeable\`.

\`\`\`java
// Old way (manual close in finally)
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("file.txt"));
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (br != null) {
        try { br.close(); } catch (IOException e) { }
    }
}

// New way (try-with-resources)
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}
// br is automatically closed!

// Multiple resources
try (FileInputStream fis = new FileInputStream("input.txt");
     FileOutputStream fos = new FileOutputStream("output.txt")) {
    // Use both streams
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

### Exception Propagation

\`\`\`java
public class PropagationDemo {
    static void method3() {
        int result = 10 / 0;  // ArithmeticException thrown here
    }
    
    static void method2() {
        method3();  // Exception propagates up
    }
    
    static void method1() {
        try {
            method2();  // Exception caught here
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        method1();
    }
}
// Unchecked exceptions propagate automatically up the call stack
// Checked exceptions must be declared with throws or caught
\`\`\`

### finally Block Behavior

\`\`\`java
// finally ALWAYS executes (except System.exit())
public static int test() {
    try {
        return 1;
    } finally {
        return 2;  // This overrides the try's return!
    }
}
// Returns 2 (finally overrides try's return - BAD PRACTICE)

// finally executes even after exception
try {
    throw new RuntimeException("Error!");
} finally {
    System.out.println("Still executes!");  // This prints
}
\`\`\`

### Key Interview Points
- \`finally\` always executes except when \`System.exit()\` is called or JVM crashes
- Checked exceptions MUST be handled (compile-time enforcement)
- Catch blocks must be ordered from specific to general
- \`throw\` is used to throw an exception; \`throws\` declares it in method signature
- Custom exceptions should extend Exception (checked) or RuntimeException (unchecked)
- try-with-resources requires AutoCloseable interface
- A method can throw multiple exceptions: \`throws IOException, SQLException\`
- \`finally\` block should NOT contain return statements (overrides try/catch returns)
- Error vs Exception: Errors are serious (OutOfMemory), Exceptions are recoverable
`,
    exercises: [
      {
        title: 'Custom Exception',
        description: 'Create a custom InvalidAgeException. Write a method validateAge(int age) that throws this exception if age is negative or greater than 150. Handle it in main.',
        starterCode: `// Define custom exception class
class InvalidAgeException extends Exception {
    // Constructor with message
}

public class AgeValidator {
    static void validateAge(int age) throws InvalidAgeException {
        // Throw InvalidAgeException for invalid ages
    }
    
    public static void main(String[] args) {
        int[] testAges = {25, -5, 200, 30};
        for (int age : testAges) {
            try {
                validateAge(age);
                System.out.println(age + " is valid");
            } catch (InvalidAgeException e) {
                System.out.println("Invalid: " + e.getMessage());
            }
        }
    }
}`,
        testInput: '',
        expectedOutput: '25 is valid\nInvalid: Age cannot be negative: -5\nInvalid: Age cannot exceed 150: 200\n30 is valid'
      },
      {
        title: 'Exception Handling Chain',
        description: 'Write a program that demonstrates exception propagation through multiple method calls. Method3 throws exception, Method2 propagates it, Method1 catches it.',
        starterCode: `public class ExceptionChain {
    static void method3(int num) {
        // Throw ArithmeticException if num is 0
        // Throw IllegalArgumentException if num is negative
    }
    
    static void method2(int num) {
        // Call method3 - let exception propagate
        method3(num);
    }
    
    static void method1(int num) {
        // Call method2 and handle exceptions
    }
    
    public static void main(String[] args) {
        method1(5);
        method1(0);
        method1(-3);
    }
}`,
        testInput: '',
        expectedOutput: 'Result: 2\nCaught ArithmeticException: Cannot divide by zero\nCaught IllegalArgumentException: Negative number: -3'
      },
      {
        title: 'Multi-catch and Finally',
        description: 'Write a program that demonstrates multi-catch blocks and finally. Parse an array of strings to integers, handling NumberFormatException and ArrayIndexOutOfBoundsException.',
        starterCode: `public class MultiCatchDemo {
    public static void main(String[] args) {
        String[] data = {"10", "abc", "30", "40", "50"};
        int sum = 0;
        
        for (int i = 0; i <= data.length; i++) { // Note: <= causes AIOOBE
            try {
                // Parse and add to sum
                
            } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
                // Handle both exceptions
                
            } finally {
                // Print current sum after each iteration
            }
        }
    }
}`,
        testInput: '',
        expectedOutput: 'Parsed: 10, Running sum: 10\nError: For input string: \"abc\", Running sum: 10\nParsed: 30, Running sum: 40\nParsed: 40, Running sum: 80\nParsed: 50, Running sum: 130\nError: Index 5 out of bounds for length 5, Running sum: 130'
      }
    ],
    mcqs: [
      {
        question: 'Which of the following is a checked exception?',
        options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IOException', 'ArithmeticException'],
        correctAnswer: 'IOException',
        explanation: 'IOException is a checked exception (extends Exception but not RuntimeException). It must be either caught or declared with throws. The others are unchecked (extend RuntimeException).'
      },
      {
        question: 'When does the finally block NOT execute?',
        options: ['When exception is thrown', 'When return is in try block', 'When System.exit() is called', 'When catch block has return'],
        correctAnswer: 'When System.exit() is called',
        explanation: 'The finally block always executes except when System.exit() is called or the JVM crashes. It executes even after return statements in try or catch blocks.'
      },
      {
        question: 'What is the difference between throw and throws?',
        options: ['No difference', 'throw creates exception, throws declares it', 'throw is for checked, throws for unchecked', 'throws creates exception, throw declares it'],
        correctAnswer: 'throw creates exception, throws declares it',
        explanation: '"throw" is used to explicitly throw an exception object. "throws" is used in method signature to declare that the method might throw certain exceptions.'
      },
      {
        question: 'What interface must a resource implement to be used in try-with-resources?',
        options: ['Closeable only', 'AutoCloseable', 'Serializable', 'Resource'],
        correctAnswer: 'AutoCloseable',
        explanation: 'Resources in try-with-resources must implement AutoCloseable (or its sub-interface Closeable). AutoCloseable has a single close() method that is called automatically.'
      },
      {
        question: 'Can we have try without catch?',
        options: ['No, catch is mandatory', 'Yes, with finally block', 'Yes, with throws declaration', 'No, both catch and finally are needed'],
        correctAnswer: 'Yes, with finally block',
        explanation: 'A try block can be followed by either catch, finally, or both. "try-finally" without catch is valid — the exception propagates but finally still executes.'
      },
      {
        question: 'What happens if an exception is thrown in a catch block?',
        options: ['Program terminates immediately', 'Finally still executes, then exception propagates', 'The exception is ignored', 'Compilation error'],
        correctAnswer: 'Finally still executes, then exception propagates',
        explanation: 'If an exception is thrown in a catch block, the finally block still executes first, then the new exception propagates up the call stack.'
      },
      {
        question: 'In multi-catch, can you catch both a parent and child exception?',
        options: ['Yes', 'No, compilation error', 'Only with separate catch blocks', 'Only for unchecked exceptions'],
        correctAnswer: 'No, compilation error',
        explanation: 'In a multi-catch block (catch(A | B e)), the exception types cannot have a parent-child relationship. Use separate catch blocks ordered from specific to general instead.'
      }
    ]
  },


  // ==================== CHAPTER 10: COLLECTIONS FRAMEWORK ====================
  collections: {
    title: 'Collections Framework',
    notes: `## Java Collections Framework

The Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes **interfaces**, **implementations**, and **algorithms**.

### Collections Hierarchy

\`\`\`
Iterable<E>
  └── Collection<E>
        ├── List<E> (ordered, allows duplicates)
        │     ├── ArrayList
        │     ├── LinkedList
        │     └── Vector → Stack
        ├── Set<E> (no duplicates)
        │     ├── HashSet
        │     ├── LinkedHashSet
        │     └── TreeSet (sorted)
        └── Queue<E>
              ├── LinkedList
              ├── PriorityQueue
              └── Deque → ArrayDeque

Map<K,V> (separate hierarchy, not Collection)
  ├── HashMap
  ├── LinkedHashMap
  ├── TreeMap (sorted by keys)
  └── Hashtable
\`\`\`

### ArrayList

Dynamic array implementation. Fast random access O(1), slow insertion/deletion O(n).

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;

ArrayList<String> list = new ArrayList<>();

// Adding elements
list.add("Apple");
list.add("Banana");
list.add(1, "Cherry");  // Insert at index 1

// Accessing
String item = list.get(0);       // "Apple"
int size = list.size();          // 3
boolean has = list.contains("Banana"); // true
int idx = list.indexOf("Cherry"); // 1

// Modifying
list.set(0, "Avocado");         // Replace at index
list.remove("Banana");          // Remove by object
list.remove(0);                 // Remove by index

// Iterating
for (String s : list) {
    System.out.println(s);
}

// Sorting
Collections.sort(list);          // Natural order
Collections.sort(list, Collections.reverseOrder()); // Reverse

// Converting
String[] arr = list.toArray(new String[0]);
List<String> fromArr = Arrays.asList("A", "B", "C");
\`\`\`

### LinkedList

Doubly-linked list. Fast insertion/deletion O(1), slow random access O(n).

\`\`\`java
import java.util.LinkedList;

LinkedList<Integer> ll = new LinkedList<>();
ll.add(10);
ll.addFirst(5);    // Add at beginning
ll.addLast(20);    // Add at end
ll.add(1, 15);     // Add at index

int first = ll.getFirst();  // 5
int last = ll.getLast();    // 20
ll.removeFirst();
ll.removeLast();

// LinkedList also implements Deque (double-ended queue)
ll.push(100);   // Stack push (addFirst)
ll.pop();       // Stack pop (removeFirst)
ll.peek();      // View first without removing
\`\`\`

### HashSet

Unordered, no duplicates, O(1) for add/remove/contains. Uses hashing.

\`\`\`java
import java.util.HashSet;

HashSet<String> set = new HashSet<>();
set.add("Java");
set.add("Python");
set.add("Java");    // Duplicate - ignored!
System.out.println(set.size()); // 2

set.contains("Java");  // true
set.remove("Python");

// Set operations
HashSet<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3, 4));
HashSet<Integer> b = new HashSet<>(Arrays.asList(3, 4, 5, 6));

// Union
HashSet<Integer> union = new HashSet<>(a);
union.addAll(b);  // {1, 2, 3, 4, 5, 6}

// Intersection
HashSet<Integer> intersection = new HashSet<>(a);
intersection.retainAll(b);  // {3, 4}

// Difference
HashSet<Integer> diff = new HashSet<>(a);
diff.removeAll(b);  // {1, 2}
\`\`\`

### TreeSet

Sorted set (natural ordering or custom Comparator). O(log n) operations.

\`\`\`java
import java.util.TreeSet;

TreeSet<Integer> ts = new TreeSet<>();
ts.add(50);
ts.add(20);
ts.add(80);
ts.add(10);
System.out.println(ts);  // [10, 20, 50, 80] - sorted!

ts.first();    // 10 (smallest)
ts.last();     // 80 (largest)
ts.lower(50);  // 20 (strictly less than)
ts.higher(50); // 80 (strictly greater than)
ts.floor(50);  // 50 (less than or equal)
ts.ceiling(50);// 50 (greater than or equal)
ts.subSet(20, 80); // [20, 50] (from inclusive, to exclusive)
\`\`\`

### HashMap

Key-value pairs, O(1) average for get/put. Unordered, allows one null key.

\`\`\`java
import java.util.HashMap;
import java.util.Map;

HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.put("Charlie", 92);

int score = map.get("Alice");        // 90
map.getOrDefault("Dave", 0);         // 0 (key not found)
map.containsKey("Bob");              // true
map.containsValue(85);               // true
map.remove("Charlie");
map.size();                          // 2

// Iterating
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

for (String key : map.keySet()) {
    System.out.println(key);
}

for (Integer value : map.values()) {
    System.out.println(value);
}

// putIfAbsent, compute, merge (Java 8+)
map.putIfAbsent("Dave", 88);
map.compute("Alice", (k, v) -> v + 5);  // Alice: 95
map.merge("Bob", 10, Integer::sum);      // Bob: 95
\`\`\`

### TreeMap

Sorted by keys (natural order or Comparator). O(log n) operations.

\`\`\`java
TreeMap<String, Integer> tm = new TreeMap<>();
tm.put("Banana", 2);
tm.put("Apple", 5);
tm.put("Cherry", 3);
System.out.println(tm); // {Apple=5, Banana=2, Cherry=3} - sorted by key

tm.firstKey();    // "Apple"
tm.lastKey();     // "Cherry"
tm.lowerKey("Banana");  // "Apple"
tm.higherKey("Banana"); // "Cherry"
\`\`\`

### Queue and PriorityQueue

\`\`\`java
import java.util.Queue;
import java.util.LinkedList;
import java.util.PriorityQueue;

// Queue (FIFO)
Queue<String> queue = new LinkedList<>();
queue.offer("First");   // Add to rear
queue.offer("Second");
queue.offer("Third");
queue.poll();           // Remove from front: "First"
queue.peek();           // View front: "Second"

// PriorityQueue (min-heap by default)
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
pq.poll();  // 10 (smallest first)
pq.poll();  // 20

// Max-heap
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
\`\`\`

### Iterator

\`\`\`java
import java.util.Iterator;

ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
Iterator<String> it = list.iterator();

while (it.hasNext()) {
    String s = it.next();
    if (s.equals("B")) {
        it.remove();  // Safe removal during iteration
    }
}
// list is now [A, C, D]
\`\`\`

### Comparable vs Comparator

\`\`\`java
// Comparable - natural ordering (implemented by the class itself)
class Student implements Comparable<Student> {
    String name;
    int marks;
    
    @Override
    public int compareTo(Student other) {
        return this.marks - other.marks; // Ascending by marks
    }
}

Collections.sort(students); // Uses compareTo

// Comparator - custom ordering (external)
Comparator<Student> byName = (s1, s2) -> s1.name.compareTo(s2.name);
Comparator<Student> byMarksDesc = (s1, s2) -> s2.marks - s1.marks;

Collections.sort(students, byName);
Collections.sort(students, byMarksDesc);

// Comparator chaining
students.sort(Comparator.comparing(Student::getMarks)
                        .thenComparing(Student::getName));
\`\`\`

### Key Interview Points
- ArrayList vs LinkedList: Random access vs frequent insertion/deletion
- HashSet uses hashCode() and equals() for uniqueness
- HashMap allows one null key; TreeMap does NOT allow null keys
- TreeSet/TreeMap maintain sorted order (O(log n) operations)
- Iterator.remove() is the only safe way to remove during iteration
- Comparable: natural ordering (compareTo); Comparator: custom ordering (compare)
- Collections.unmodifiableList() creates read-only view
- ConcurrentHashMap for thread-safe map operations
`,
    exercises: [
      {
        title: 'Student Grade System',
        description: 'Create a program using HashMap to store student names and grades. Implement methods to: add student, get grade, find highest scorer, and calculate average.',
        starterCode: `import java.util.*;

public class GradeSystem {
    static HashMap<String, Integer> grades = new HashMap<>();
    
    static void addStudent(String name, int grade) {
        // Add student to map
    }
    
    static String getHighestScorer() {
        // Find and return the student with highest grade
        return "";
    }
    
    static double getAverage() {
        // Calculate and return average grade
        return 0.0;
    }
    
    public static void main(String[] args) {
        addStudent("Alice", 92);
        addStudent("Bob", 85);
        addStudent("Charlie", 98);
        addStudent("Diana", 88);
        
        System.out.println("Highest: " + getHighestScorer());
        System.out.printf("Average: %.1f%n", getAverage());
    }
}`,
        testInput: '',
        expectedOutput: 'Highest: Charlie\nAverage: 90.8'
      },
      {
        title: 'Remove Duplicates',
        description: 'Write a program that removes duplicates from an ArrayList while preserving the original order. Use LinkedHashSet.',
        starterCode: `import java.util.*;

public class RemoveDuplicates {
    static List<Integer> removeDups(List<Integer> list) {
        // Remove duplicates while preserving order
        return null;
    }
    
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(4, 2, 7, 2, 4, 8, 7, 1, 8, 3)
        );
        System.out.println("Original: " + numbers);
        System.out.println("Unique: " + removeDups(numbers));
    }
}`,
        testInput: '',
        expectedOutput: 'Original: [4, 2, 7, 2, 4, 8, 7, 1, 8, 3]\nUnique: [4, 2, 7, 8, 1, 3]'
      },
      {
        title: 'Custom Sorting with Comparator',
        description: 'Create a list of Employee objects. Sort them by salary (descending), then by name (ascending) for same salary using Comparator.',
        starterCode: `import java.util.*;

class Employee {
    String name;
    double salary;
    
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return name + ":" + salary;
    }
}

public class CustomSort {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>(Arrays.asList(
            new Employee("Alice", 75000),
            new Employee("Bob", 85000),
            new Employee("Charlie", 75000),
            new Employee("Diana", 85000)
        ));
        
        // Sort by salary desc, then name asc
        
        System.out.println(employees);
    }
}`,
        testInput: '',
        expectedOutput: '[Bob:85000.0, Diana:85000.0, Alice:75000.0, Charlie:75000.0]'
      },
      {
        title: 'Word Frequency with TreeMap',
        description: 'Count word frequency in a sentence using TreeMap (alphabetically sorted). Print each word and its count.',
        starterCode: `import java.util.*;

public class WordCount {
    public static void main(String[] args) {
        String sentence = "java is great java is powerful and java is everywhere";
        
        // Use TreeMap to count word frequency (sorted alphabetically)
        TreeMap<String, Integer> wordCount = new TreeMap<>();
        
        // Split and count
        
        // Print results
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
        testInput: '',
        expectedOutput: 'and: 1\neverywhere: 1\ngreat: 1\nis: 3\njava: 3\npowerful: 1'
      }
    ],
    mcqs: [
      {
        question: 'Which collection does NOT allow duplicate elements?',
        options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
        correctAnswer: 'HashSet',
        explanation: 'Set implementations (HashSet, TreeSet, LinkedHashSet) do not allow duplicate elements. Lists (ArrayList, LinkedList, Vector) allow duplicates.'
      },
      {
        question: 'What is the time complexity of ArrayList.get(index)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'ArrayList uses a dynamic array internally, so random access by index is O(1). However, insertion/deletion in the middle is O(n) due to shifting elements.'
      },
      {
        question: 'Which Map implementation maintains insertion order?',
        options: ['HashMap', 'TreeMap', 'LinkedHashMap', 'Hashtable'],
        correctAnswer: 'LinkedHashMap',
        explanation: 'LinkedHashMap maintains insertion order using a doubly-linked list. HashMap has no order guarantee. TreeMap sorts by keys. Hashtable has no order guarantee.'
      },
      {
        question: 'What is the difference between Comparable and Comparator?',
        options: ['No difference', 'Comparable is in the class, Comparator is external', 'Comparable is for primitives only', 'Comparator cannot sort'],
        correctAnswer: 'Comparable is in the class, Comparator is external',
        explanation: 'Comparable is implemented by the class itself (natural ordering via compareTo). Comparator is a separate class/lambda that defines custom ordering (compare method).'
      },
      {
        question: 'How do you safely remove elements while iterating a collection?',
        options: ['list.remove(element)', 'Using for-each loop', 'Using Iterator.remove()', 'Using Collections.remove()'],
        correctAnswer: 'Using Iterator.remove()',
        explanation: 'Iterator.remove() is the only safe way to remove elements during iteration. Using list.remove() or for-each removal causes ConcurrentModificationException.'
      },
      {
        question: 'What does PriorityQueue use by default for ordering?',
        options: ['FIFO order', 'LIFO order', 'Natural ordering (min-heap)', 'Insertion order'],
        correctAnswer: 'Natural ordering (min-heap)',
        explanation: 'PriorityQueue uses natural ordering (min-heap) by default — smallest element has highest priority. Use Collections.reverseOrder() for max-heap behavior.'
      },
      {
        question: 'Can HashMap have null keys?',
        options: ['No', 'Yes, one null key', 'Yes, multiple null keys', 'Only if value is not null'],
        correctAnswer: 'Yes, one null key',
        explanation: 'HashMap allows one null key and multiple null values. TreeMap does NOT allow null keys (throws NullPointerException) because it needs to compare keys for sorting.'
      }
    ]
  },


  // ==================== CHAPTER 11: MULTITHREADING ====================
  multithreading: {
    title: 'Multithreading',
    notes: `## Multithreading in Java

Multithreading allows concurrent execution of two or more threads. A **thread** is a lightweight sub-process, the smallest unit of processing. Java has built-in support for multithreading.

### Thread Lifecycle (States)

\`\`\`
NEW → RUNNABLE → RUNNING → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED
\`\`\`

| State | Description |
|-------|-------------|
| NEW | Thread created but not started |
| RUNNABLE | Ready to run, waiting for CPU |
| RUNNING | Currently executing |
| BLOCKED | Waiting for monitor lock |
| WAITING | Waiting indefinitely (wait()) |
| TIMED_WAITING | Waiting for specified time (sleep()) |
| TERMINATED | Execution completed |

### Creating Threads - Method 1: Extending Thread Class

\`\`\`java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500); // Pause for 500ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Usage
MyThread t1 = new MyThread();
MyThread t2 = new MyThread();
t1.setName("Thread-A");
t2.setName("Thread-B");
t1.start();  // start() creates new thread and calls run()
t2.start();
// t1.run(); // WRONG! This runs in current thread, not new thread
\`\`\`

### Creating Threads - Method 2: Implementing Runnable

\`\`\`java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }
}

// Usage
Thread t1 = new Thread(new MyRunnable(), "Worker-1");
Thread t2 = new Thread(new MyRunnable(), "Worker-2");
t1.start();
t2.start();

// Using lambda (Java 8+)
Thread t3 = new Thread(() -> {
    System.out.println("Lambda thread running!");
});
t3.start();
\`\`\`

**Runnable vs Thread:**
- Runnable is preferred (can extend another class)
- Thread class approach limits inheritance
- Runnable separates task from thread mechanism

### Thread Methods

\`\`\`java
// Important Thread methods
t1.start();              // Start thread execution
t1.join();               // Wait for t1 to finish
t1.join(1000);           // Wait max 1000ms
Thread.sleep(500);       // Pause current thread
Thread.yield();          // Hint to scheduler to give up CPU
t1.isAlive();            // Check if thread is still running
t1.setPriority(Thread.MAX_PRIORITY); // 1-10, default 5
t1.setDaemon(true);      // Daemon thread (dies when main dies)
Thread.currentThread();  // Get reference to current thread
\`\`\`

### Synchronization

When multiple threads access shared resources, **race conditions** can occur. Use \`synchronized\` to ensure only one thread accesses critical section at a time.

\`\`\`java
class BankAccount {
    private int balance = 1000;
    
    // Synchronized method - locks on 'this' object
    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " withdrawing " + amount);
            balance -= amount;
            System.out.println("Remaining balance: " + balance);
        } else {
            System.out.println("Insufficient balance!");
        }
    }
    
    // Synchronized block - more granular control
    public void deposit(int amount) {
        synchronized (this) {
            balance += amount;
            System.out.println(Thread.currentThread().getName() + " deposited " + amount);
        }
    }
}
\`\`\`

### wait(), notify(), notifyAll()

Inter-thread communication. Must be called from synchronized context.

\`\`\`java
class SharedBuffer {
    private int data;
    private boolean hasData = false;
    
    public synchronized void produce(int value) throws InterruptedException {
        while (hasData) {
            wait();  // Release lock and wait
        }
        data = value;
        hasData = true;
        System.out.println("Produced: " + value);
        notify();  // Wake up waiting consumer
    }
    
    public synchronized int consume() throws InterruptedException {
        while (!hasData) {
            wait();  // Release lock and wait
        }
        hasData = false;
        System.out.println("Consumed: " + data);
        notify();  // Wake up waiting producer
        return data;
    }
}
\`\`\`

### ExecutorService (Thread Pool)

\`\`\`java
import java.util.concurrent.*;

// Fixed thread pool
ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit tasks
for (int i = 0; i < 10; i++) {
    final int taskId = i;
    executor.submit(() -> {
        System.out.println("Task " + taskId + " by " + Thread.currentThread().getName());
    });
}

// Shutdown
executor.shutdown();  // No new tasks, finish existing
executor.awaitTermination(5, TimeUnit.SECONDS);

// Other pool types
ExecutorService single = Executors.newSingleThreadExecutor();
ExecutorService cached = Executors.newCachedThreadPool();
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2);

// Future - get result from async task
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});
int result = future.get();  // Blocks until result is ready
\`\`\`

### Deadlock

\`\`\`java
// Deadlock example - two threads waiting for each other's locks
Object lock1 = new Object();
Object lock2 = new Object();

Thread t1 = new Thread(() -> {
    synchronized (lock1) {
        System.out.println("T1 holds lock1");
        try { Thread.sleep(100); } catch (Exception e) {}
        synchronized (lock2) {  // Waiting for lock2 (held by T2)
            System.out.println("T1 holds lock1 and lock2");
        }
    }
});

Thread t2 = new Thread(() -> {
    synchronized (lock2) {
        System.out.println("T2 holds lock2");
        try { Thread.sleep(100); } catch (Exception e) {}
        synchronized (lock1) {  // Waiting for lock1 (held by T1)
            System.out.println("T2 holds lock2 and lock1");
        }
    }
});
// DEADLOCK! Both threads wait forever
\`\`\`

**Avoiding Deadlock:**
- Always acquire locks in the same order
- Use timeout with tryLock()
- Avoid nested locks when possible
- Use java.util.concurrent utilities

### Key Interview Points
- \`start()\` creates new thread; \`run()\` executes in current thread
- Runnable is preferred over extending Thread (allows extending other classes)
- synchronized ensures mutual exclusion (only one thread at a time)
- wait/notify must be called from synchronized block
- Daemon threads die when all non-daemon threads finish
- Thread.sleep() does NOT release the lock
- wait() releases the lock; notify() wakes up one waiting thread
- ExecutorService manages thread pools efficiently
- Deadlock: circular dependency on locks
`,
    exercises: [
      {
        title: 'Producer-Consumer Problem',
        description: 'Implement the classic Producer-Consumer problem using wait() and notify(). Producer adds items to a shared buffer (max size 5), Consumer removes them.',
        starterCode: `import java.util.LinkedList;

class Buffer {
    private LinkedList<Integer> list = new LinkedList<>();
    private int capacity = 5;
    
    public synchronized void produce(int item) throws InterruptedException {
        // Wait if buffer is full, then add item and notify
    }
    
    public synchronized int consume() throws InterruptedException {
        // Wait if buffer is empty, then remove item and notify
        return 0;
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        Buffer buffer = new Buffer();
        
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 10; i++) {
                try {
                    buffer.produce(i);
                    Thread.sleep(100);
                } catch (InterruptedException e) { }
            }
        });
        
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 10; i++) {
                try {
                    buffer.consume();
                    Thread.sleep(200);
                } catch (InterruptedException e) { }
            }
        });
        
        producer.start();
        consumer.start();
    }
}`,
        testInput: '',
        expectedOutput: 'Produced: 1\nProduced: 2\nConsumed: 1\nProduced: 3\nConsumed: 2\n...'
      },
      {
        title: 'Thread-Safe Counter',
        description: 'Create a thread-safe counter class using synchronized. Launch 5 threads that each increment the counter 1000 times. Verify final count is 5000.',
        starterCode: `public class SafeCounter {
    private int count = 0;
    
    // Synchronized increment method
    
    // Get count method
    
    public static void main(String[] args) throws InterruptedException {
        SafeCounter counter = new SafeCounter();
        Thread[] threads = new Thread[5];
        
        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    counter.increment();
                }
            });
            threads[i].start();
        }
        
        // Wait for all threads to finish
        for (Thread t : threads) {
            t.join();
        }
        
        System.out.println("Final count: " + counter.getCount());
    }
}`,
        testInput: '',
        expectedOutput: 'Final count: 5000'
      },
      {
        title: 'ExecutorService Task Runner',
        description: 'Use ExecutorService with a fixed thread pool of 3 to execute 6 tasks. Each task should print its ID and the thread executing it.',
        starterCode: `import java.util.concurrent.*;

public class TaskRunner {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 1; i <= 6; i++) {
            final int taskId = i;
            // Submit task to executor
        }
        
        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("All tasks completed!");
    }
}`,
        testInput: '',
        expectedOutput: 'Task 1 executed by pool-1-thread-1\nTask 2 executed by pool-1-thread-2\nTask 3 executed by pool-1-thread-3\nTask 4 executed by pool-1-thread-1\nTask 5 executed by pool-1-thread-2\nTask 6 executed by pool-1-thread-3\nAll tasks completed!'
      }
    ],
    mcqs: [
      {
        question: 'What is the difference between start() and run() in Thread?',
        options: ['No difference', 'start() creates new thread, run() executes in current thread', 'run() creates new thread, start() executes in current', 'Both create new threads'],
        correctAnswer: 'start() creates new thread, run() executes in current thread',
        explanation: 'start() creates a new thread and then calls run() in that new thread. Calling run() directly executes the code in the current thread without creating a new one.'
      },
      {
        question: 'Which method releases the lock held by a thread?',
        options: ['sleep()', 'yield()', 'wait()', 'join()'],
        correctAnswer: 'wait()',
        explanation: 'wait() releases the lock and puts the thread in WAITING state. sleep() pauses the thread but does NOT release the lock. yield() gives up CPU but keeps the lock.'
      },
      {
        question: 'What is a daemon thread?',
        options: ['A high-priority thread', 'A thread that runs forever', 'A background thread that dies when all non-daemon threads finish', 'A thread that cannot be interrupted'],
        correctAnswer: 'A background thread that dies when all non-daemon threads finish',
        explanation: 'Daemon threads are background service threads (like garbage collector). They are terminated by JVM when all non-daemon (user) threads have finished execution.'
      },
      {
        question: 'What causes a deadlock?',
        options: ['Too many threads', 'Circular dependency on locks', 'Using synchronized keyword', 'Thread starvation'],
        correctAnswer: 'Circular dependency on locks',
        explanation: 'Deadlock occurs when two or more threads are blocked forever, each waiting for a lock held by the other. It requires circular dependency in lock acquisition order.'
      },
      {
        question: 'Which is the preferred way to create a thread in Java?',
        options: ['Extending Thread class', 'Implementing Runnable interface', 'Using Timer class', 'Using Process class'],
        correctAnswer: 'Implementing Runnable interface',
        explanation: 'Implementing Runnable is preferred because: 1) Java supports single inheritance, so extending Thread prevents extending other classes. 2) It separates the task from the thread mechanism.'
      },
      {
        question: 'What does ExecutorService.shutdown() do?',
        options: ['Immediately kills all threads', 'Prevents new tasks and waits for existing to complete', 'Pauses all threads', 'Restarts the thread pool'],
        correctAnswer: 'Prevents new tasks and waits for existing to complete',
        explanation: 'shutdown() initiates orderly shutdown: no new tasks are accepted, but previously submitted tasks continue to execute. Use shutdownNow() for immediate termination attempt.'
      }
    ]
  },


  // ==================== CHAPTER 12: DSA IN JAVA ====================
  'java-dsa': {
    title: 'DSA in Java',
    notes: `## Data Structures & Algorithms in Java

Understanding DSA implementation in Java is crucial for coding interviews. This chapter covers implementing fundamental data structures from scratch and common sorting algorithms.

### Stack Implementation

\`\`\`java
class Stack {
    private int[] arr;
    private int top;
    private int capacity;
    
    public Stack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    
    public void push(int item) {
        if (isFull()) {
            throw new RuntimeException("Stack Overflow");
        }
        arr[++top] = item;
    }
    
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return arr[top--];
    }
    
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return arr[top];
    }
    
    public boolean isEmpty() { return top == -1; }
    public boolean isFull() { return top == capacity - 1; }
    public int size() { return top + 1; }
}
\`\`\`

### Queue Implementation

\`\`\`java
class Queue {
    private int[] arr;
    private int front, rear, size, capacity;
    
    public Queue(int capacity) {
        this.capacity = capacity;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    public void enqueue(int item) {
        if (isFull()) throw new RuntimeException("Queue Full");
        rear = (rear + 1) % capacity;  // Circular
        arr[rear] = item;
        size++;
    }
    
    public int dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue Empty");
        int item = arr[front];
        front = (front + 1) % capacity;  // Circular
        size--;
        return item;
    }
    
    public int peek() {
        if (isEmpty()) throw new RuntimeException("Queue Empty");
        return arr[front];
    }
    
    public boolean isEmpty() { return size == 0; }
    public boolean isFull() { return size == capacity; }
}
\`\`\`

### Linked List Implementation

\`\`\`java
class LinkedList {
    class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node head;
    private int size;
    
    public void addFirst(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    public void addLast(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
    
    public void deleteByValue(int data) {
        if (head == null) return;
        if (head.data == data) {
            head = head.next;
            size--;
            return;
        }
        Node current = head;
        while (current.next != null && current.next.data != data) {
            current = current.next;
        }
        if (current.next != null) {
            current.next = current.next.next;
            size--;
        }
    }
    
    public void reverse() {
        Node prev = null, current = head, next = null;
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
    
    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}
\`\`\`

### Binary Tree Implementation

\`\`\`java
class BinaryTree {
    class Node {
        int data;
        Node left, right;
        Node(int data) {
            this.data = data;
            left = right = null;
        }
    }
    
    Node root;
    
    // Insert in BST
    Node insert(Node root, int data) {
        if (root == null) return new Node(data);
        if (data < root.data)
            root.left = insert(root.left, data);
        else if (data > root.data)
            root.right = insert(root.right, data);
        return root;
    }
    
    // Inorder traversal (Left, Root, Right) - gives sorted order
    void inorder(Node root) {
        if (root != null) {
            inorder(root.left);
            System.out.print(root.data + " ");
            inorder(root.right);
        }
    }
    
    // Preorder traversal (Root, Left, Right)
    void preorder(Node root) {
        if (root != null) {
            System.out.print(root.data + " ");
            preorder(root.left);
            preorder(root.right);
        }
    }
    
    // Postorder traversal (Left, Right, Root)
    void postorder(Node root) {
        if (root != null) {
            postorder(root.left);
            postorder(root.right);
            System.out.print(root.data + " ");
        }
    }
    
    // Search in BST
    boolean search(Node root, int key) {
        if (root == null) return false;
        if (root.data == key) return true;
        if (key < root.data) return search(root.left, key);
        return search(root.right, key);
    }
    
    // Height of tree
    int height(Node root) {
        if (root == null) return 0;
        return 1 + Math.max(height(root.left), height(root.right));
    }
}
\`\`\`

### Sorting Algorithms

\`\`\`java
// Bubble Sort - O(n²)
void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // Optimization: already sorted
    }
}

// Selection Sort - O(n²)
void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

// Insertion Sort - O(n²), good for nearly sorted
void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Merge Sort - O(n log n), stable
void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int[] L = new int[n1], R = new int[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Quick Sort - O(n log n) average, O(n²) worst
void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}
\`\`\`

### Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

### Key Interview Points
- Stack: LIFO (Last In First Out) — used for undo, expression evaluation, DFS
- Queue: FIFO (First In First Out) — used for BFS, scheduling, buffering
- LinkedList: Dynamic size, O(1) insertion at head, O(n) access
- BST: O(log n) search/insert/delete for balanced trees
- Merge Sort is stable and always O(n log n) but uses O(n) extra space
- Quick Sort is fastest in practice but O(n²) worst case (rare with good pivot)
- Inorder traversal of BST gives sorted output
- For interviews: know time/space complexity of all operations
`,
    exercises: [
      {
        title: 'Stack - Balanced Parentheses',
        description: 'Implement a method that checks if a string of parentheses (), {}, [] is balanced using a Stack.',
        starterCode: `import java.util.Stack;

public class BalancedParentheses {
    static boolean isBalanced(String expr) {
        Stack<Character> stack = new Stack<>();
        
        for (char ch : expr.toCharArray()) {
            // Push opening brackets
            // For closing brackets, check if matching opening exists
        }
        
        return stack.isEmpty();
    }
    
    public static void main(String[] args) {
        System.out.println(isBalanced("{[()]}")); // true
        System.out.println(isBalanced("{[(])}")); // false
        System.out.println(isBalanced("((()))")); // true
        System.out.println(isBalanced("({[}])"));  // false
    }
}`,
        testInput: '',
        expectedOutput: 'true\nfalse\ntrue\nfalse'
      },
      {
        title: 'LinkedList Reversal',
        description: 'Implement a singly linked list with addLast, display, and reverse methods. Demonstrate by creating a list, displaying it, reversing it, and displaying again.',
        starterCode: `public class LinkedListDemo {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; this.next = null; }
    }
    
    static Node head = null;
    
    static void addLast(int data) {
        // Add node at the end
    }
    
    static void display() {
        // Print: 1 -> 2 -> 3 -> null
    }
    
    static void reverse() {
        // Reverse the linked list iteratively
    }
    
    public static void main(String[] args) {
        addLast(1); addLast(2); addLast(3); addLast(4); addLast(5);
        System.out.print("Original: "); display();
        reverse();
        System.out.print("Reversed: "); display();
    }
}`,
        testInput: '',
        expectedOutput: 'Original: 1 -> 2 -> 3 -> 4 -> 5 -> null\nReversed: 5 -> 4 -> 3 -> 2 -> 1 -> null'
      },
      {
        title: 'Binary Search Tree',
        description: 'Implement a BST with insert, search, and inorder traversal. Insert values [50, 30, 70, 20, 40, 60, 80] and demonstrate all operations.',
        starterCode: `public class BSTDemo {
    static class Node {
        int data;
        Node left, right;
        Node(int data) { this.data = data; }
    }
    
    static Node insert(Node root, int data) {
        // Insert into BST
        return root;
    }
    
    static boolean search(Node root, int key) {
        // Search in BST
        return false;
    }
    
    static void inorder(Node root) {
        // Inorder traversal (sorted output)
    }
    
    public static void main(String[] args) {
        Node root = null;
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        for (int v : values) {
            root = insert(root, v);
        }
        
        System.out.print("Inorder: ");
        inorder(root);
        System.out.println();
        System.out.println("Search 40: " + search(root, 40));
        System.out.println("Search 45: " + search(root, 45));
    }
}`,
        testInput: '',
        expectedOutput: 'Inorder: 20 30 40 50 60 70 80\nSearch 40: true\nSearch 45: false'
      },
      {
        title: 'Sorting Comparison',
        description: 'Implement Bubble Sort and Merge Sort. Sort the same array with both and print the sorted results.',
        starterCode: `import java.util.Arrays;

public class SortingDemo {
    static void bubbleSort(int[] arr) {
        // Implement bubble sort
    }
    
    static void mergeSort(int[] arr, int left, int right) {
        // Implement merge sort
    }
    
    static void merge(int[] arr, int left, int mid, int right) {
        // Merge two sorted halves
    }
    
    public static void main(String[] args) {
        int[] arr1 = {64, 34, 25, 12, 22, 11, 90};
        int[] arr2 = arr1.clone();
        
        bubbleSort(arr1);
        System.out.println("Bubble Sort: " + Arrays.toString(arr1));
        
        mergeSort(arr2, 0, arr2.length - 1);
        System.out.println("Merge Sort: " + Arrays.toString(arr2));
    }
}`,
        testInput: '',
        expectedOutput: 'Bubble Sort: [11, 12, 22, 25, 34, 64, 90]\nMerge Sort: [11, 12, 22, 25, 34, 64, 90]'
      }
    ],
    mcqs: [
      {
        question: 'What is the time complexity of searching in a balanced BST?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        explanation: 'In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) time complexity. In worst case (skewed tree), it degrades to O(n).'
      },
      {
        question: 'Which sorting algorithm is stable and always O(n log n)?',
        options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
        correctAnswer: 'Merge Sort',
        explanation: 'Merge Sort is stable (preserves relative order of equal elements) and always runs in O(n log n) regardless of input. Quick Sort is O(n²) worst case and not stable.'
      },
      {
        question: 'What data structure is used for BFS traversal?',
        options: ['Stack', 'Queue', 'Array', 'Linked List'],
        correctAnswer: 'Queue',
        explanation: 'BFS (Breadth-First Search) uses a Queue (FIFO) to process nodes level by level. DFS (Depth-First Search) uses a Stack (or recursion which uses call stack).'
      },
      {
        question: 'What is the worst-case time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 'O(n²)',
        explanation: 'Quick Sort degrades to O(n²) when the pivot is always the smallest or largest element (already sorted array with first/last element as pivot). Average case is O(n log n).'
      },
      {
        question: 'Inorder traversal of a BST gives elements in which order?',
        options: ['Random order', 'Sorted ascending order', 'Sorted descending order', 'Level order'],
        correctAnswer: 'Sorted ascending order',
        explanation: 'Inorder traversal (Left, Root, Right) of a BST always produces elements in sorted ascending order. This is a key property of BSTs used in many interview questions.'
      },
      {
        question: 'What is the space complexity of Merge Sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'Merge Sort requires O(n) additional space for the temporary arrays used during merging. This is its main disadvantage compared to in-place algorithms like Quick Sort.'
      },
      {
        question: 'Which operation is O(1) in a Stack?',
        options: ['Search', 'Push', 'Access middle element', 'Sort'],
        correctAnswer: 'Push',
        explanation: 'Push (and Pop) operations in a Stack are O(1) as they only operate on the top element. Searching or accessing middle elements requires O(n) time.'
      }
    ]
  }
};


// Default chapter for unknown IDs
const defaultChapter: ChapterData = {
  title: 'Chapter Not Found',
  notes: `## Chapter Not Found

The requested chapter could not be found. Please select a valid chapter from the sidebar.

### Available Chapters:
1. **basics** - Java Basics (JDK, JRE, JVM, Hello World)
2. **data-types** - Data Types & Variables
3. **control-flow** - Control Flow Statements
4. **arrays** - Arrays & Strings
5. **oop** - OOP in Java
6. **inheritance** - Inheritance
7. **polymorphism** - Polymorphism
8. **interfaces** - Interfaces & Abstract Classes
9. **exceptions** - Exception Handling
10. **collections** - Collections Framework
11. **multithreading** - Multithreading
12. **java-dsa** - DSA in Java
`,
  exercises: [],
  mcqs: []
};

export function getJavaChapterData(chapterId: string): ChapterData {
  return javaChapters[chapterId] || defaultChapter;
}

export function getAllJavaChapterIds(): string[] {
  return Object.keys(javaChapters);
}

export function getJavaChapterList(): { id: string; title: string }[] {
  return Object.entries(javaChapters).map(([id, data]) => ({
    id,
    title: data.title
  }));
}

export default javaChapters;
