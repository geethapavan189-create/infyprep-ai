// Complete Aptitude Data - Formulas, Shortcuts, Questions

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  shortcut?: string;
}

interface TopicContent {
  description: string;
  formulas: string[];
  shortcuts: string[];
  examples: { question: string; solution: string; answer: string }[];
}

const topicContents: Record<string, TopicContent> = {
  'number-system': {
    description: 'Master number system concepts including HCF, LCM, divisibility rules, remainders, and unit digit cyclicity.',
    formulas: [
      'HCF × LCM = Product of two numbers',
      'Sum of first n natural numbers = n(n+1)/2',
      'Sum of squares = n(n+1)(2n+1)/6',
      'Sum of cubes = [n(n+1)/2]²',
      'Number of factors of N = (a+1)(b+1)... where N = p^a × q^b...',
      'Divisibility by 3: sum of digits divisible by 3',
      'Divisibility by 11: difference of alternate digit sums = 0 or multiple of 11',
      'Euler totient φ(n) = n × (1-1/p1)(1-1/p2)...',
    ],
    shortcuts: [
      'Unit digit cyclicity: 2→{2,4,8,6}, 3→{3,9,7,1}, 7→{7,9,3,1}, 8→{8,4,2,6}. Divide power by 4 to find position.',
      'To find remainder of large powers: use Fermat\'s little theorem. a^(p-1) mod p = 1 for prime p.',
      'HCF of fractions = HCF of numerators / LCM of denominators',
      'LCM of fractions = LCM of numerators / HCF of denominators',
      'If a number leaves remainder r when divided by n, it can be written as nk + r.',
      'Last two digits of any number ending in 1: multiply last two digits of base by power.',
    ],
    examples: [
      { question: 'Find the unit digit of 7^123', solution: 'Cyclicity of 7 is {7,9,3,1} with period 4. 123 mod 4 = 3. Third in cycle = 3.', answer: '3' },
      { question: 'Find HCF of 36 and 48', solution: '36 = 2²×3², 48 = 2⁴×3. HCF = 2²×3 = 12', answer: '12' },
      { question: 'How many factors does 120 have?', solution: '120 = 2³×3×5. Factors = (3+1)(1+1)(1+1) = 16', answer: '16' },
    ],
  },
  'percentages': {
    description: 'Learn percentage calculations, successive changes, and applications in elections, population, and more.',
    formulas: [
      'Percentage = (Value/Total) × 100',
      'X% of Y = Y% of X',
      'Successive change: a + b + ab/100',
      'If A is x% more than B, B is (x/(100+x))×100 % less than A',
      'Population after n years = P(1 + r/100)^n',
      'If price increases by x%, consumption must decrease by (x/(100+x))×100% to keep expenditure same',
    ],
    shortcuts: [
      'Successive increase of a% and b%: Net = a + b + ab/100',
      'Successive increase and decrease: Net = a - b - ab/100 (if decrease is b%)',
      'Fraction to % shortcuts: 1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/8=12.5%',
      'If a value becomes n times, percentage increase = (n-1)×100%',
      'To find x% of a number quickly: 10% = move decimal left, 5% = half of 10%, 1% = move decimal 2 places left',
    ],
    examples: [
      { question: 'Price increases by 20% then decreases by 20%. Net change?', solution: 'Net = 20 + (-20) + (20×-20)/100 = 0 - 4 = -4%', answer: '-4% (decrease)' },
      { question: 'A is 25% more than B. B is what % less than A?', solution: 'B is less by (25/125)×100 = 20%', answer: '20% less' },
    ],
  },
  'profit-and-loss': {
    description: 'Master profit, loss, discount, markup calculations with shortcut methods for Infosys aptitude.',
    formulas: [
      'Profit = SP - CP, Loss = CP - SP',
      'Profit% = (Profit/CP) × 100',
      'SP = CP × (100 + Profit%)/100',
      'CP = SP × 100/(100 + Profit%)',
      'Discount% = (Discount/MP) × 100',
      'SP = MP × (100 - Discount%)/100',
      'If markup = m% and discount = d%, Profit% = m - d - md/100',
      'Dishonest dealer profit% = (Error/True value) × 100',
    ],
    shortcuts: [
      'If SP of x articles = CP of y articles, Profit% = ((y-x)/x) × 100',
      'Two articles sold at same SP, one at a% profit and other at a% loss: Always a loss of a²/100 %',
      'Successive discounts of a% and b% = Single discount of (a + b - ab/100)%',
      'If a trader uses false weight: Profit% = (True weight - False weight)/False weight × 100',
    ],
    examples: [
      { question: 'CP=800, SP=920. Find profit%', solution: 'Profit = 920-800 = 120. Profit% = (120/800)×100 = 15%', answer: '15%' },
      { question: 'Markup 40%, discount 20%. Profit%?', solution: 'Let CP=100. MP=140. SP=140×0.8=112. Profit=12%', answer: '12%' },
    ],
  },
  'time-and-work': {
    description: 'Solve time and work problems using LCM method, efficiency concepts, and pipe problems.',
    formulas: [
      'If A does work in n days, A\'s 1 day work = 1/n',
      'Combined: 1/A + 1/B = 1/Total',
      'If A is x% more efficient than B: Time_B/Time_A = (100+x)/100',
      'Pipe filling: 1/A + 1/B - 1/C (C is leak)',
      'If A works for d1 days and B for d2 days: d1/A + d2/B = 1',
      'Wages ratio = Efficiency ratio = Work done ratio',
    ],
    shortcuts: [
      'LCM Method: Take LCM of days as total work. Per day work = LCM/individual days.',
      'If A and B together take T days, and A alone takes A days: B alone = (A×T)/(A-T) days',
      'Alternate day problems: Find 2-day combined work, multiply by number of pairs.',
      'If efficiency ratio is a:b, time ratio is b:a',
    ],
    examples: [
      { question: 'A:10 days, B:15 days. Together?', solution: 'LCM(10,15)=30 units. A=3/day, B=2/day. Together=5/day. Time=30/5=6 days', answer: '6 days' },
      { question: 'A is 50% more efficient than B. B takes 12 days. A takes?', solution: 'A time = B time × 100/150 = 12 × 2/3 = 8 days', answer: '8 days' },
    ],
  },
  'ratio-proportion': {
    description: 'Learn ratio, proportion, variation, and partnership problems with quick solving techniques.',
    formulas: [
      'If A:B = a:b, then A = ax/(a+b) of total, B = bx/(a+b) of total',
      'Compound ratio of a:b and c:d = ac:bd',
      'If A:B = a:b and B:C = c:d, then A:B:C = ac:bc:bd',
      'Mean proportional of a and b = √(ab)',
      'Third proportional to a,b = b²/a',
      'Partnership: Profit share ∝ Capital × Time',
    ],
    shortcuts: [
      'To make B common in A:B and B:C, multiply to make B same (use LCM).',
      'If ratio is a:b and difference is d, then values are ad/(a-b) and bd/(a-b)',
      'Mixture problems: Use alligation (criss-cross) method for quick answers.',
    ],
    examples: [
      { question: 'A:B=2:3, B:C=4:5. Find A:B:C', solution: 'Make B common: A:B=8:12, B:C=12:15. A:B:C=8:12:15', answer: '8:12:15' },
      { question: 'Divide 1200 in ratio 2:3:5', solution: 'Total parts=10. Shares: 240, 360, 600', answer: '240, 360, 600' },
    ],
  },
  'probability': {
    description: 'Master probability concepts for cards, dice, balls, and conditional probability problems.',
    formulas: [
      'P(E) = Favorable outcomes / Total outcomes',
      'P(A∪B) = P(A) + P(B) - P(A∩B)',
      'P(A∩B) = P(A) × P(B) [if independent]',
      'P(A|B) = P(A∩B) / P(B)',
      'P(at least one) = 1 - P(none)',
      'P(exactly one of A,B) = P(A) + P(B) - 2P(A∩B)',
    ],
    shortcuts: [
      'Two dice sum probabilities: P(sum=7)=6/36=1/6 (highest), P(sum=2 or 12)=1/36 (lowest)',
      'Cards: 52 total, 4 suits of 13 each. Face cards=12, Aces=4.',
      'For "at least" problems, use complement: P(at least 1) = 1 - P(0)',
      'Odds in favor a:b means P = a/(a+b)',
    ],
    examples: [
      { question: 'Two dice thrown. P(sum=7)?', solution: 'Favorable: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1)=6. Total=36. P=6/36=1/6', answer: '1/6' },
      { question: 'Bag: 5R, 3B, 2G. P(not green)?', solution: 'P(not green) = 1 - P(green) = 1 - 2/10 = 8/10 = 4/5', answer: '4/5' },
    ],
  },
  'simple-interest': {
    description: 'Simple interest calculations, doubling/tripling time, and mixed investment problems.',
    formulas: [
      'SI = P × R × T / 100',
      'Amount = P + SI = P(1 + RT/100)',
      'If sum doubles in T years: R = 100/T',
      'If sum becomes n times in T years: R = (n-1)×100/T',
      'If rates are R1, R2, R3 for T1, T2, T3 years: Total SI = P(R1T1 + R2T2 + R3T3)/100',
    ],
    shortcuts: [
      'Sum doubles → R×T = 100. Sum triples → R×T = 200.',
      'If difference of SI for two different times = D, then P = D×100/(R×ΔT)',
      'Equal installments: Each = (P × 100) / [n×100 + R×n(n-1)/2]',
    ],
    examples: [
      { question: 'SI on ₹5000 at 8% for 3 years?', solution: 'SI = 5000×8×3/100 = ₹1200', answer: '₹1200' },
      { question: 'Sum doubles in 8 years. Rate?', solution: 'R = 100/T = 100/8 = 12.5%', answer: '12.5%' },
    ],
  },
  'compound-interest': {
    description: 'Compound interest, CI vs SI difference, and half-yearly/quarterly compounding.',
    formulas: [
      'A = P(1 + R/100)^n',
      'CI = A - P = P[(1 + R/100)^n - 1]',
      'CI - SI for 2 years = P(R/100)²',
      'CI - SI for 3 years = P(R/100)²(3 + R/100)',
      'Half-yearly: A = P(1 + R/200)^(2n)',
      'Quarterly: A = P(1 + R/400)^(4n)',
    ],
    shortcuts: [
      'For 2 years: CI = 2×SI_1year + SI on SI of 1st year',
      'CI-SI for 2 years = SI for 1 year × R/100',
      'If CI for 2nd year - CI for 1st year = D, then P = D×(100/R)²',
      'Amount ratio for successive years: (100+R)/100',
    ],
    examples: [
      { question: 'CI on ₹10000 at 10% for 2 years?', solution: 'A = 10000(1.1)² = 12100. CI = 12100-10000 = ₹2100', answer: '₹2100' },
      { question: 'CI-SI on ₹8000 for 2 years at 5%?', solution: 'Diff = P(R/100)² = 8000×(0.05)² = 8000×0.0025 = ₹20', answer: '₹20' },
    ],
  },
};

// Default content for topics not yet fully defined
const defaultContent: TopicContent = {
  description: 'Practice questions and learn concepts for this topic.',
  formulas: ['Key formulas will be displayed here'],
  shortcuts: ['Important shortcuts and tricks for quick solving'],
  examples: [{ question: 'Example question', solution: 'Step by step solution', answer: 'Answer' }],
};

const topicQuestions: Record<string, Question[]> = {
  'number-system': [
    { id: 'ns1', question: 'What is the remainder when 2^31 is divided by 5?', options: ['1', '2', '3', '4'], correctAnswer: '3', explanation: 'Powers of 2 mod 5 cycle: 2,4,3,1 (period 4). 31 mod 4 = 3. Third in cycle = 3.', difficulty: 'medium', shortcut: 'Find cyclicity of remainders, use modular arithmetic.' },
    { id: 'ns2', question: 'How many numbers between 1 and 100 are divisible by both 3 and 5?', options: ['5', '6', '7', '8'], correctAnswer: '6', explanation: 'LCM(3,5)=15. Numbers: 15,30,45,60,75,90 = 6.', difficulty: 'easy', shortcut: 'Divisible by both = divisible by LCM.' },
    { id: 'ns3', question: 'The sum of first 50 natural numbers is:', options: ['1275', '1250', '1300', '1225'], correctAnswer: '1275', explanation: 'n(n+1)/2 = 50×51/2 = 1275', difficulty: 'easy', shortcut: 'Formula: n(n+1)/2' },
    { id: 'ns4', question: 'What is the unit digit of 7^95?', options: ['1', '3', '7', '9'], correctAnswer: '3', explanation: 'Cyclicity of 7: 7,9,3,1 (period 4). 95 mod 4 = 3. Third = 3.', difficulty: 'medium', shortcut: 'Unit digit cyclicity of 7 is {7,9,3,1}.' },
    { id: 'ns5', question: 'HCF of 36, 48, and 60 is:', options: ['6', '12', '18', '24'], correctAnswer: '12', explanation: '36=2²×3², 48=2⁴×3, 60=2²×3×5. HCF=2²×3=12', difficulty: 'easy', shortcut: 'Take minimum power of common primes.' },
    { id: 'ns6', question: 'LCM of 12, 15, and 20 is:', options: ['60', '120', '180', '240'], correctAnswer: '60', explanation: '12=2²×3, 15=3×5, 20=2²×5. LCM=2²×3×5=60', difficulty: 'easy', shortcut: 'Take maximum power of all primes.' },
    { id: 'ns7', question: 'How many prime numbers between 50 and 100?', options: ['8', '10', '12', '15'], correctAnswer: '10', explanation: 'Primes: 53,59,61,67,71,73,79,83,89,97 = 10', difficulty: 'medium' },
    { id: 'ns8', question: 'If N = 2³ × 3² × 5, how many factors does N have?', options: ['18', '24', '20', '16'], correctAnswer: '24', explanation: 'Factors = (3+1)(2+1)(1+1) = 4×3×2 = 24', difficulty: 'medium', shortcut: 'Number of factors = product of (power+1) for each prime.' },
    { id: 'ns9', question: 'The largest 4-digit number divisible by 88 is:', options: ['9944', '9956', '9988', '9768'], correctAnswer: '9944', explanation: '9999 ÷ 88 = 113.6. So 113 × 88 = 9944.', difficulty: 'medium' },
    { id: 'ns10', question: 'What is the remainder when 17^23 is divided by 16?', options: ['0', '1', '15', '2'], correctAnswer: '1', explanation: '17 = 16+1. So 17^23 mod 16 = 1^23 mod 16 = 1.', difficulty: 'hard', shortcut: 'If base = divisor+1, remainder is always 1.' },
  ],
  'percentages': [
    { id: 'pct1', question: 'If price increases by 20% then decreases by 20%, net change is:', options: ['0%', '-4%', '+4%', '-2%'], correctAnswer: '-4%', explanation: 'Net = 20+(-20)+(20×-20)/100 = -4%', difficulty: 'easy', shortcut: 'Successive change: a+b+ab/100' },
    { id: 'pct2', question: 'A number increased by 25%. To restore, decrease by:', options: ['20%', '25%', '30%', '15%'], correctAnswer: '20%', explanation: 'Decrease = (25/125)×100 = 20%', difficulty: 'easy', shortcut: 'Restore decrease = x/(100+x) × 100' },
    { id: 'pct3', question: 'If 30% of A = 40% of B, then A:B is:', options: ['3:4', '4:3', '2:3', '3:2'], correctAnswer: '4:3', explanation: '0.3A = 0.4B → A/B = 4/3', difficulty: 'easy' },
    { id: 'pct4', question: 'In election, A got 60% and won by 4000 votes. Total votes:', options: ['20000', '15000', '25000', '10000'], correctAnswer: '20000', explanation: 'Difference = 20% of total = 4000. Total = 20000', difficulty: 'medium' },
    { id: 'pct5', question: 'Population grows 10% annually. After 2 years from 10000:', options: ['12000', '12100', '11000', '11500'], correctAnswer: '12100', explanation: '10000 × (1.1)² = 12100', difficulty: 'medium', shortcut: 'Compound growth: P(1+r/100)^n' },
    { id: 'pct6', question: 'If A earns 20% more than B, B earns what % less than A?', options: ['16.67%', '20%', '25%', '15%'], correctAnswer: '16.67%', explanation: 'Less% = (20/120)×100 = 16.67%', difficulty: 'medium' },
    { id: 'pct7', question: '40% of a number is 240. The number is:', options: ['600', '500', '960', '400'], correctAnswer: '600', explanation: 'Number = 240/0.4 = 600', difficulty: 'easy' },
    { id: 'pct8', question: 'Two successive discounts of 20% and 10% equal single discount of:', options: ['28%', '30%', '25%', '27%'], correctAnswer: '28%', explanation: 'Net = 20+10-(20×10)/100 = 28%', difficulty: 'medium', shortcut: 'Successive discounts: a+b-ab/100' },
  ],
  'profit-and-loss': [
    { id: 'pl1', question: 'Article bought for ₹800, sold for ₹920. Profit%:', options: ['12%', '15%', '18%', '20%'], correctAnswer: '15%', explanation: 'Profit=120. Profit%=(120/800)×100=15%', difficulty: 'easy' },
    { id: 'pl2', question: 'Markup 40%, discount 20%. Profit%:', options: ['10%', '12%', '15%', '20%'], correctAnswer: '12%', explanation: 'CP=100, MP=140, SP=112. Profit=12%', difficulty: 'medium', shortcut: 'Profit% = m-d-md/100 = 40-20-800/100 = 12%' },
    { id: 'pl3', question: 'By selling 12 articles, gain = CP of 4 articles. Profit%:', options: ['25%', '33.33%', '30%', '40%'], correctAnswer: '33.33%', explanation: 'Profit%=(4/12)×100=33.33%', difficulty: 'medium', shortcut: 'Gain of x articles on selling y: Profit%=(x/y)×100' },
    { id: 'pl4', question: 'Two items sold at ₹1000 each. One at 25% profit, other 25% loss. Net:', options: ['No P/L', '6.25% loss', '6.25% profit', '5% loss'], correctAnswer: '6.25% loss', explanation: 'Same SP, equal P&L% → Always loss = x²/100 = 625/100 = 6.25%', difficulty: 'hard', shortcut: 'Same SP + equal profit & loss % = Always loss of x²/100%' },
    { id: 'pl5', question: 'CP of 5 articles = SP of 4 articles. Profit%:', options: ['20%', '25%', '30%', '15%'], correctAnswer: '25%', explanation: '5CP=4SP. SP/CP=5/4. Profit%=25%', difficulty: 'easy' },
  ],
  'time-and-work': [
    { id: 'tw1', question: 'A:10 days, B:15 days. Together they finish in:', options: ['5 days', '6 days', '7 days', '8 days'], correctAnswer: '6 days', explanation: 'LCM=30. A=3/day, B=2/day. Together=5/day. Time=30/5=6', difficulty: 'easy', shortcut: 'LCM method is fastest.' },
    { id: 'tw2', question: 'A:12 days. B is 50% more efficient. B finishes in:', options: ['6', '8', '9', '10'], correctAnswer: '8', explanation: 'B time = 12×100/150 = 8 days', difficulty: 'medium' },
    { id: 'tw3', question: 'A+B:8 days, A alone:12 days. B alone:', options: ['20', '24', '16', '18'], correctAnswer: '24', explanation: '1/B = 1/8-1/12 = 1/24. B=24 days', difficulty: 'easy' },
    { id: 'tw4', question: 'A pipe fills tank in 6 hrs, another empties in 8 hrs. Both open, tank fills in:', options: ['24 hrs', '20 hrs', '12 hrs', '18 hrs'], correctAnswer: '24 hrs', explanation: 'Net rate = 1/6-1/8 = 1/24. Time = 24 hrs', difficulty: 'medium' },
    { id: 'tw5', question: '20 men finish work in 10 days. 25 men finish in:', options: ['6', '8', '12', '15'], correctAnswer: '8', explanation: 'Men×Days = constant. 20×10 = 25×D. D=8', difficulty: 'easy', shortcut: 'M1×D1 = M2×D2 (constant work)' },
  ],
  'ratio-proportion': [
    { id: 'rat1', question: 'A:B=2:3, B:C=4:5. A:B:C is:', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], correctAnswer: '8:12:15', explanation: 'Make B common: A:B=8:12, B:C=12:15. A:B:C=8:12:15', difficulty: 'easy', shortcut: 'Make common term equal using LCM.' },
    { id: 'rat2', question: 'Divide ₹1200 in ratio 2:3:5. C gets:', options: ['₹400', '₹500', '₹600', '₹700'], correctAnswer: '₹600', explanation: 'C = (5/10)×1200 = ₹600', difficulty: 'easy' },
    { id: 'rat3', question: 'Ratio 3:5. Each increased by 10, new ratio 5:7. Numbers:', options: ['15,25', '12,20', '9,15', '6,10'], correctAnswer: '15,25', explanation: '(3x+10)/(5x+10)=5/7. 21x+70=25x+50. x=5. Numbers:15,25', difficulty: 'medium' },
    { id: 'rat4', question: 'Mean proportional of 4 and 9 is:', options: ['5', '6', '6.5', '7'], correctAnswer: '6', explanation: 'Mean proportional = √(4×9) = √36 = 6', difficulty: 'easy' },
  ],
  'probability': [
    { id: 'prob1', question: 'Two dice thrown. P(sum=7):', options: ['1/6', '5/36', '7/36', '1/9'], correctAnswer: '1/6', explanation: 'Favorable: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1)=6. P=6/36=1/6', difficulty: 'easy' },
    { id: 'prob2', question: 'Bag: 5R, 3B, 2G. P(blue):', options: ['3/10', '1/3', '3/8', '1/5'], correctAnswer: '3/10', explanation: 'Total=10. P(blue)=3/10', difficulty: 'easy' },
    { id: 'prob3', question: 'From 52 cards, P(king or heart):', options: ['4/13', '17/52', '16/52', '5/13'], correctAnswer: '4/13', explanation: 'P=4/52+13/52-1/52=16/52=4/13', difficulty: 'medium', shortcut: 'P(A∪B) = P(A)+P(B)-P(A∩B)' },
    { id: 'prob4', question: 'A coin tossed 3 times. P(at least one head):', options: ['7/8', '3/4', '1/2', '5/8'], correctAnswer: '7/8', explanation: 'P(at least 1H) = 1-P(no H) = 1-(1/2)³ = 1-1/8 = 7/8', difficulty: 'medium', shortcut: 'P(at least one) = 1 - P(none)' },
  ],
  'simple-interest': [
    { id: 'si1', question: 'SI on ₹5000 at 8% for 3 years:', options: ['₹1000', '₹1200', '₹1500', '₹800'], correctAnswer: '₹1200', explanation: 'SI=5000×8×3/100=₹1200', difficulty: 'easy' },
    { id: 'si2', question: 'Sum doubles in 8 years at SI. Rate:', options: ['10%', '12.5%', '15%', '8%'], correctAnswer: '12.5%', explanation: 'R=100/T=100/8=12.5%', difficulty: 'medium', shortcut: 'Doubles: R=100/T' },
    { id: 'si3', question: 'SI on a sum for 4 years at 5% is ₹400. The sum is:', options: ['₹2000', '₹2500', '₹1500', '₹3000'], correctAnswer: '₹2000', explanation: 'P=SI×100/(R×T)=400×100/(5×4)=₹2000', difficulty: 'easy' },
  ],
  'compound-interest': [
    { id: 'ci1', question: 'CI on ₹10000 at 10% for 2 years:', options: ['₹2000', '₹2100', '₹2200', '₹1900'], correctAnswer: '₹2100', explanation: 'A=10000(1.1)²=12100. CI=₹2100', difficulty: 'easy' },
    { id: 'ci2', question: 'CI-SI on ₹8000 for 2 years at 5%:', options: ['₹20', '₹25', '₹30', '₹15'], correctAnswer: '₹20', explanation: 'Diff=P(R/100)²=8000×0.0025=₹20', difficulty: 'medium', shortcut: 'CI-SI for 2 years = P(R/100)²' },
    { id: 'ci3', question: 'A sum becomes ₹4840 in 2 years at 10% CI. The sum is:', options: ['₹4000', '₹3800', '₹4200', '₹3600'], correctAnswer: '₹4000', explanation: 'P=4840/(1.1)²=4840/1.21=₹4000', difficulty: 'medium' },
  ],
};

export function getTopicContent(topic: string): TopicContent {
  return topicContents[topic] || defaultContent;
}

export function getTopicQuestions(topic: string): Question[] {
  return topicQuestions[topic] || [];
}
