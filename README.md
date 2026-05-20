# InfyPrep AI - Infosys Placement Preparation Platform

A complete AI-powered preparation platform for Infosys placements, HackWithInfy, InfyTQ, aptitude, reasoning, and coding interviews.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (installed via `brew install node`)
- Firebase project (free tier works)
- Judge0 API key (from RapidAPI - free tier available)
- OpenAI API key (optional, for AI assistant)

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "infyprep-ai"
3. Enable **Authentication** → Sign-in methods → Email/Password + Google
4. Enable **Firestore Database** → Start in test mode
5. Go to Project Settings → Service Accounts → Generate new private key
6. Go to Project Settings → General → Your apps → Add web app → Copy config

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your Firebase and API keys in .env
npm install   # Already done
npm run dev   # Start development server on port 5000
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local
# Fill in your Firebase web config in .env.local
npm install   # Already done
npm run dev   # Start Next.js on port 3000
```

### 4. Seed Database (Optional)
```bash
cd backend
npm run seed  # Populates Firestore with questions
```

## 📁 Project Structure

```
infos/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express server
│   │   ├── config/firebase.js # Firebase Admin SDK
│   │   ├── middleware/auth.js  # Token verification
│   │   ├── routes/
│   │   │   ├── auth.js        # User registration/profile
│   │   │   ├── questions.js   # Question CRUD & submission
│   │   │   ├── code.js        # Code execution (Judge0)
│   │   │   ├── tests.js       # Mock test system
│   │   │   ├── progress.js    # Analytics & progress
│   │   │   ├── admin.js       # Admin panel APIs
│   │   │   ├── ai.js          # AI assistant (OpenAI)
│   │   │   └── leaderboard.js # Rankings
│   │   └── data/              # Seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── login/         # Authentication
│   │   │   ├── dashboard/     # User analytics
│   │   │   ├── aptitude/      # Aptitude module
│   │   │   ├── reasoning/     # Reasoning module
│   │   │   ├── coding/        # Coding platform + playground
│   │   │   ├── python/        # Python learning
│   │   │   ├── java/          # Java learning
│   │   │   ├── dsa/           # DSA topics
│   │   │   ├── mock-tests/    # Timed mock tests
│   │   │   ├── pyq/           # Previous year questions
│   │   │   ├── ai-assistant/  # AI chat
│   │   │   ├── leaderboard/   # Rankings
│   │   │   ├── admin/         # Admin panel
│   │   │   ├── profile/       # User profile
│   │   │   └── bookmarks/     # Saved questions
│   │   ├── components/        # Shared components
│   │   ├── lib/               # Firebase, API client
│   │   ├── store/             # Zustand state
│   │   └── data/              # Local question data
│   └── package.json
└── README.md
```

## ✨ Features

### Authentication
- Email/Password signup & login
- Google OAuth
- Password reset
- Session persistence
- Route protection

### Aptitude Module (16 topics, 1000+ questions)
- Number System, Percentages, Profit & Loss
- Time & Work, Ratio, Probability, SI/CI
- Each topic: Theory + Formulas + Shortcuts + Practice + Quiz

### Reasoning Module (10 topics)
- Coding Decoding, Blood Relations, Seating Arrangement
- Number Series, Syllogisms, Direction Sense
- Tips, patterns, and step-by-step solutions

### Coding Platform
- Monaco Editor (VS Code editor)
- Multi-language: Python, Java, C++, JavaScript
- Judge0 API integration for code execution
- Test case validation
- Problem difficulty levels

### Python & Java Learning
- Beginner to Advanced chapters
- Interactive code editor per chapter
- MCQs and exercises
- Notes with syntax examples

### DSA Module
- 12 topics from Arrays to Dynamic Programming
- Visual explanations and complexity analysis
- Practice problems per topic

### Mock Tests
- Timed tests with auto-submit
- Section-wise analysis
- Topic-wise performance breakdown
- Question review after submission

### AI Assistant
- Chat interface for doubt solving
- Formula explanations
- Coding hints
- Interview tips
- Resume ATS scoring

### Analytics Dashboard
- XP tracking and streaks
- Topic mastery charts
- Accuracy trends
- Weak area identification

### Gamification
- XP points for correct answers
- Daily streaks
- Leaderboard rankings
- Badges system

### Admin Panel
- Add/edit/delete questions
- Create mock tests
- User management
- Platform statistics

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| Data Fetching | Axios, React Query |
| Code Editor | Monaco Editor |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Code Execution | Judge0 API |
| AI | OpenAI GPT-3.5 |

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npx vercel
```

### Backend (Firebase/Railway/Render)
Deploy the Express backend to any Node.js hosting service.

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
JUDGE0_API_KEY=
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
OPENAI_API_KEY=
```

### Frontend (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
