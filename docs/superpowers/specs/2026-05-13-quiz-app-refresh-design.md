# Quiz App Complete Refresh Design

## Overview
Complete overhaul of the Quiz app with @mighty_s/ui-dev components, new features, and expanded subjects.

## UI/UX Changes

### Components from @mighty_s/ui-dev
- **Header**: Logo + navigation (Home, About)
- **Button**: Primary, ghost, accent variants
- **Card**: Subject selection, question display
- **IconCard**: Subject categories on home page with icons

### Page Designs

#### Home Page
- Hero section with app title
- Grid of IconCards for subject categories
- Each card shows subject name + icon

#### Quiz Page
- Clean question Card with:
  - Question number + total
  - Timer (60s per question)
  - Progress bar
  - Streak counter
  - Question text
  - Answer options (A/B/C/D style)
- Navigation: Previous/Next buttons
- Bottom toolbar: Hint, Skip options

#### Results Page
- Score display (percentage + points)
- Performance message based on score
- Question review (correct/incorrect with explanations)
- "Play Again" button

## Features

### Gamification
- **Streak tracking**: Consecutive correct answers counter
- **Points system**:
  - Correct answer: 10 points
  - Time bonus: +1-5 points based on time remaining
  - Hint used: -3 points
  - Skip: 0 points
- **Hint system**: Remove one wrong answer (costs 3 points)
- **Skip question**: Mark as unanswered, move to next

### Sound Effects
- Correct answer: positive sound
- Incorrect answer: negative sound
- Timer warning (last 10 seconds)
- Quiz complete: celebration sound

### Progress Tracking
- Save quiz progress to localStorage
- Restore on page refresh
- Show completion percentage

## Expanded Subjects

### Keep Existing
- HTML
- CSS
- JavaScript
- React

### Add New
- Node.js (5 questions per difficulty)
- Python Basics (5 questions per difficulty)
- General Knowledge (5 questions per difficulty)
- Science (5 questions per difficulty)

Each subject has 3 difficulty levels: easy, medium, hard

## Color Theme

- **Base**: Dark mode (gray-900 to gray-800 gradient)
- **Accent**: Use @mighty_s/ui-dev accent colors
- **Primary buttons**: Accent color
- **Success**: Green for correct answers
- **Error**: Red for incorrect answers
- **Warning**: Yellow for timer warnings

## Technical Implementation

### State Management
- React useState for all local state
- localStorage for progress persistence

### Animations
- Framer Motion for page transitions
- Button hover/tap effects
- Progress bar animations

### Routing
- React Router for navigation
- Routes: /, /quiz, /results, /* (404)

## Acceptance Criteria

1. All pages use @mighty_s/ui-dev components
2. Streak and points display during quiz
3. Sound effects play on actions
4. Hint removes one wrong answer
5. Progress saves to localStorage
6. 8 subject categories available
7. 3 difficulty levels per subject
8. Results show score + review
9. Responsive design works on mobile
10. Consistent UI with other @mighty_s/ui-dev apps