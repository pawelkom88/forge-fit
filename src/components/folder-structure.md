# Gym Application Folder Structure

```markdown
src/
├── app/
│   └── main.tsx              # Main app layout
├── pages/
│   ├── dashboard/
│   │   └── workout-day.page.tsx
│   ├── workouts/
│   │   ├── workout-day.page.tsx           # Workouts list
│   │   └── [id]/
│   │       └── workout-day.page.tsx       # Single workout view
│   ├── nutrition/
│   │   ├── workout-day.page.tsx           # Nutrition tracking
│   │   └── [date]/
│   │       └── workout-day.page.tsx       # Single day nutrition
│   └── profile/
│       └── workout-day.page.tsx           # User profile
├── features/
│   ├── workout/
│   │   ├── components/
│   │   │   ├── workout-form/
│   │   │   ├── exercise-selector/
│   │   │   └── set-logger/
│   │   ├── hooks/
│   │   │   ├── use-workout.ts
│   │   │   └── use-exercise-sets.ts
│   │   └── services/
│   │       └── workout.service.ts
│   ├── nutrition/
│   │   ├── components/
│   │   │   ├── meal-form/
│   │   │   ├── food-selector/
│   │   │   └── macro-summary/
│   │   ├── hooks/
│   │   │   └── use-nutrition.ts
│   │   └── services/
│   │       └── nutrition.service.ts
│   └── user/
│       ├── components/
│       │   ├── profile-form/
│       │   └── settings-form/
│       └── services/
│           └── user.service.ts
├── components/
│   ├── ui/
│   │   ├── button/
│   │   ├── input/
│   │   ├── select/
│   │   ├── card/
│   │   └── calendar/
│   ├── layout/
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   └── shared/
│       ├── loading-spinner/
│       ├── error-boundary/
│       └── empty-state/
├── hooks/
│   ├── use-auth.ts
│   ├── use-media-query.ts
│   └── use-local-storage.ts
├── context/
│   ├── auth-context.tsx
│   └── theme-context.tsx
├── services/
│   ├── firebase/
│   │   ├── config.ts
│   │   └── db.ts
│   ├── auth/
│   │   └── auth.service.ts
│   └── utils/
│       ├── date.ts
│       └── validation.ts
└── types/
    ├── workout.types.ts
    ├── nutrition.types.ts
    └── user.types.ts
```
