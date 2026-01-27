import { createContext, useContext, useReducer } from 'react';

const WorkoutContext = createContext();

// Workout state reducer
const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return {
        ...state,
        workout: action.payload,
        currentZoneIndex: 0,
        isPaused: false,
        isActive: false,
        timeRemaining: action.payload[0]?.duration * 60 || 0,
      };
    case 'START_WORKOUT':
      return {
        ...state,
        isActive: true,
        isPaused: false,
      };
    case 'PAUSE_WORKOUT':
      return {
        ...state,
        isPaused: true,
      };
    case 'RESUME_WORKOUT':
      return {
        ...state,
        isPaused: false,
      };
    case 'UPDATE_TIME':
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
      if (newTimeRemaining === 0 && state.currentZoneIndex < state.workout.length - 1) {
        // Move to next zone
        const nextZoneIndex = state.currentZoneIndex + 1;
        const nextZone = state.workout[nextZoneIndex];
        return {
          ...state,
          currentZoneIndex: nextZoneIndex,
          timeRemaining: nextZone.duration * 60,
        };
      } else if (newTimeRemaining === 0 && state.currentZoneIndex === state.workout.length - 1) {
        // Workout complete
        return {
          ...state,
          timeRemaining: 0,
          isActive: false,
          isPaused: false,
        };
      }
      return {
        ...state,
        timeRemaining: newTimeRemaining,
      };
    case 'SKIP_ZONE':
      if (state.currentZoneIndex < state.workout.length - 1) {
        const nextZoneIndex = state.currentZoneIndex + 1;
        const nextZone = state.workout[nextZoneIndex];
        return {
          ...state,
          currentZoneIndex: nextZoneIndex,
          timeRemaining: nextZone.duration * 60,
        };
      }
      return state;
    case 'STOP_WORKOUT':
      return {
        ...state,
        workout: null,
        currentZoneIndex: 0,
        isActive: false,
        isPaused: false,
        timeRemaining: 0,
      };
    default:
      return state;
  }
};

const initialState = {
  workout: null,
  currentZoneIndex: 0,
  isActive: false,
  isPaused: false,
  timeRemaining: 0,
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Helper functions
  const setWorkout = (workout) => {
    dispatch({ type: 'SET_WORKOUT', payload: workout });
  };

  const startWorkout = () => {
    dispatch({ type: 'START_WORKOUT' });
  };

  const pauseWorkout = () => {
    dispatch({ type: 'PAUSE_WORKOUT' });
  };

  const resumeWorkout = () => {
    dispatch({ type: 'RESUME_WORKOUT' });
  };

  const updateTime = () => {
    dispatch({ type: 'UPDATE_TIME' });
  };

  const skipZone = () => {
    dispatch({ type: 'SKIP_ZONE' });
  };

  const stopWorkout = () => {
    dispatch({ type: 'STOP_WORKOUT' });
  };

  const getCurrentZone = () => {
    return state.workout ? state.workout[state.currentZoneIndex] : null;
  };

  const getNextZone = () => {
    return state.workout && state.currentZoneIndex < state.workout.length - 1 
      ? state.workout[state.currentZoneIndex + 1] 
      : null;
  };

  const getTotalTimeRemaining = () => {
    if (!state.workout) return 0;
    
    // Current zone time remaining + all remaining zones
    let totalTime = state.timeRemaining;
    for (let i = state.currentZoneIndex + 1; i < state.workout.length; i++) {
      totalTime += state.workout[i].duration * 60;
    }
    return totalTime;
  };

  const value = {
    ...state,
    setWorkout,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    updateTime,
    skipZone,
    stopWorkout,
    getCurrentZone,
    getNextZone,
    getTotalTimeRemaining,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};