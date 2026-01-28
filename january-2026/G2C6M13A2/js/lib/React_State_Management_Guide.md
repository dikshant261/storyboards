# React State Management Guide

## Table of Contents
1. [Introduction](#introduction)
2. [useState Hook](#usestate-hook)
3. [Context API](#context-api)
4. [Implementation in This Project](#implementation-in-this-project)
5. [Setting Up State Management in a New Project](#setting-up-state-management-in-a-new-project)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)

## Introduction

React state management is crucial for building dynamic, interactive applications. This guide covers the core concepts of React state management, focusing on `useState` and Context API, and demonstrates how they're implemented in our math learning application.

## useState Hook

### What is useState?

`useState` is a React Hook that allows functional components to have state variables. It returns an array with two elements:
- The current state value
- A function to update the state

### Basic Syntax

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### When to Use useState

- **Local component state**: Data that only affects a single component
- **Form inputs**: Managing input values, validation states
- **UI state**: Toggle visibility, loading states, error messages
- **Simple calculations**: Counters, timers, basic data manipulation

### Examples from Our Project

```javascript
// AppStateProvider.js - Managing page state
const [currentPage, setCurrentPage] = useState(1);
const [appUpdateTrigger, setAppUpdateTrigger] = useState(0);

// MathLearningAppContent.js - Managing page configuration readiness
const [pageConfigReady, setPageConfigReady] = useState(false);

// Managing UI feedback
const [feedbackText, setFeedbackText] = useState({
  content: '',
  backgroundColor: '',
  color: '',
  border: '',
  visible: false
});
```

## Context API

### What is Context API?

Context API is React's built-in solution for sharing data across multiple components without prop drilling. It allows you to create a global state that can be accessed by any component in the component tree.

### When to Use Context

- **Global state**: Data needed by multiple components
- **Theme management**: Dark/light mode, language settings
- **User authentication**: User data, login status
- **App-wide settings**: Configuration, preferences
- **Avoiding prop drilling**: When passing props through many levels

### Basic Context Setup

```javascript
// 1. Create Context
const MyContext = React.createContext();

// 2. Create Provider Component
function MyProvider({ children }) {
  const [state, setState] = useState(initialValue);
  
  const value = {
    state,
    setState,
    // other functions
  };
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Create Custom Hook
function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

// 4. Use in Components
function MyComponent() {
  const { state, setState } = useMyContext();
  // component logic
}
```

## Implementation in This Project

### Project Structure

Our math learning application uses a sophisticated state management system with multiple contexts and hooks:

```
js/
├── math-applet.js          # Main app with AppStateProvider
├── components/
│   └── division-state-context.js  # Division-specific context
└── data.js                 # Internationalization data
```

### 1. AppStateProvider Context

**Location**: `js/math-applet.js`

**Purpose**: Manages global application state including page navigation, UI feedback, and page configuration.

```javascript
// Context Creation
const AppStateContext = React.createContext();

// Provider Component
const AppStateProvider = ({ children }) => {
  // Core state
  const [currentPage, setCurrentPage] = useState(1);
  const [appUpdateTrigger, setAppUpdateTrigger] = useState(0);
  const [pageConfigReady, setPageConfigReady] = useState(false);
  
  // UI state
  const [screenSize, setScreenSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  
  const [feedbackText, setFeedbackText] = useState({
    content: '',
    backgroundColor: '',
    color: '',
    border: '',
    visible: false
  });
  
  // Computed values
  const availablePages = useMemo(() => {
    const pages = getAvailablePages();
    return pages;
  }, [pageConfigReady, appUpdateTrigger]);
  
  // Actions
  const forceUpdate = useCallback(() => {
    setAppUpdateTrigger(prev => prev + 1);
  }, []);
  
  const markPageConfigReady = useCallback(() => {
    setPageConfigReady(true);
  }, []);
  
  // Context value
  const contextValue = useMemo(() => ({
    // State
    currentPage,
    availablePages,
    totalPages: availablePages.length,
    screenSize,
    feedbackText,
    tileStyles,
    appUpdateTrigger,
    pageConfigReady,
    
    // Actions
    setCurrentPage,
    setScreenSize,
    setFeedbackText,
    setTileStyles,
    forceUpdate,
    navigateToPage,
    resetAllPageStates,
    updateTileStyle,
    clearTileStyle,
    updateFeedbackText,
    clearFeedbackText,
    markPageConfigReady
  }), [
    currentPage, availablePages, totalPages, screenSize,
    feedbackText, tileStyles, appUpdateTrigger, pageConfigReady,
    forceUpdate, navigateToPage, resetAllPageStates,
    updateTileStyle, clearTileStyle, updateFeedbackText, clearFeedbackText,
    markPageConfigReady
  ]);
  
  return React.createElement(AppStateContext.Provider, {
    value: contextValue
  }, children);
};

// Custom Hook
const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};
```

### 2. Division State Context

**Location**: `js/components/division-state-context.js`

**Purpose**: Manages division-specific state for mathematical operations.

```javascript
// Context Creation
const DivisionStateContext = React.createContext();

// Provider Component
const DivisionStateProvider = ({ children }) => {
  const [divisionState, setDivisionState] = useState({
    currentQuestion: null,
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false
  });
  
  // Context value with actions
  const contextValue = useMemo(() => ({
    divisionState,
    setDivisionState,
    resetDivisionState: () => setDivisionState(initialState),
    // other division-specific functions
  }), [divisionState]);
  
  return React.createElement(DivisionStateContext.Provider, {
    value: contextValue
  }, children);
};
```

### 3. State Management Patterns Used

#### A. State Lifting
```javascript
// Child component updates parent state
const CustomElementsContainer = ({ currentPage, totalPages, appUpdateTrigger }) => {
  const { navigateToPage, pageConfigReady } = useAppState();
  // Component uses shared state
};
```

#### B. Computed State with useMemo
```javascript
// Expensive calculations are memoized
const availablePages = useMemo(() => {
  const pages = getAvailablePages();
  console.log('🔍 [AppStateProvider] Recalculating available pages:', pages);
  return pages;
}, [pageConfigReady, appUpdateTrigger]);
```

#### C. Callback Optimization with useCallback
```javascript
// Functions are memoized to prevent unnecessary re-renders
const markPageConfigReady = useCallback(() => {
  console.log('🔄 [AppStateProvider] Marking page configuration as ready');
  setPageConfigReady(true);
}, []);
```

#### D. Global State Exposure
```javascript
// Functions exposed globally for external access
useEffect(() => {
  window.markPageConfigReady = markPageConfigReady;
  window.forceAppUpdate = forceUpdate;
  return () => {
    delete window.markPageConfigReady;
    delete window.forceAppUpdate;
  };
}, [markPageConfigReady, forceUpdate]);
```

## Setting Up State Management in a New Project

### Step 1: Project Setup

```bash
# Create new React project
npx create-react-app my-app
cd my-app

# Install additional dependencies (if needed)
npm install
```

### Step 2: Create Context Structure

```javascript
// src/contexts/AppContext.js
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State declarations
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  
  // Computed values
  const isAuthenticated = useMemo(() => !!user, [user]);
  
  // Actions
  const login = useCallback((userData) => {
    setUser(userData);
    setLoading(false);
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
  }, []);
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  // Context value
  const value = useMemo(() => ({
    // State
    user,
    theme,
    loading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    toggleTheme,
    setLoading
  }), [user, theme, loading, isAuthenticated, login, logout, toggleTheme]);
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

### Step 3: Wrap Your App

```javascript
// src/App.js
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import MyComponent from './components/MyComponent';

function App() {
  return (
    <AppProvider>
      <MyComponent />
    </AppProvider>
  );
}

export default App;
```

### Step 4: Use in Components

```javascript
// src/components/MyComponent.js
import React from 'react';
import { useApp } from '../contexts/AppContext';

const MyComponent = () => {
  const { user, theme, login, toggleTheme } = useApp();
  
  return (
    <div className={`app ${theme}`}>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login({ name: 'John' })}>
          Login
        </button>
      )}
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default MyComponent;
```

## Best Practices

### 1. State Structure
```javascript
// ✅ Good: Flat, specific state
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ❌ Avoid: Nested, complex state
const [state, setState] = useState({
  user: null,
  loading: false,
  error: null,
  // ... many more properties
});
```

### 2. Context Optimization
```javascript
// ✅ Good: Memoized context value
const contextValue = useMemo(() => ({
  state,
  actions
}), [state, actions]);

// ❌ Avoid: New object on every render
const contextValue = {
  state,
  actions
};
```

### 3. Custom Hooks
```javascript
// ✅ Good: Extract logic into custom hooks
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};
```

### 4. Error Boundaries
```javascript
// Wrap context providers with error boundaries
<ErrorBoundary>
  <AppProvider>
    <MyComponent />
  </AppProvider>
</ErrorBoundary>
```

## Common Patterns

### 1. Provider Composition
```javascript
// Multiple providers can be composed
<ThemeProvider>
  <AuthProvider>
    <AppProvider>
      <MyApp />
    </AppProvider>
  </AuthProvider>
</ThemeProvider>
```

### 2. State Reducers
```javascript
// For complex state logic, use useReducer
const [state, dispatch] = useReducer(reducer, initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
```

### 3. Context Splitting
```javascript
// Split contexts by domain
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();
```

### 4. State Persistence
```javascript
// Persist state to localStorage
const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState];
};
```

## Conclusion

React state management with `useState` and Context API provides a powerful foundation for building complex applications. The key is to:

1. **Start simple** with `useState` for local state
2. **Use Context** when you need to share state across components
3. **Optimize** with `useMemo` and `useCallback`
4. **Structure** your state logically and keep it flat
5. **Test** your state management thoroughly

This approach allows for scalable, maintainable applications while keeping the learning curve manageable for developers of all levels.
