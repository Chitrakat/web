import { useEffect, useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import WorkoutOptionsOverlay from './WorkoutOptionsOverlay';
import './WorkoutPage.css';

function WorkoutPage({ onNavigate }) {
  const { 
    workout,
    isActive,
    isPaused,
    timeRemaining,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    updateTime,
    stopWorkout,
    getCurrentZone,
    getNextZone,
    getTotalTimeRemaining,
  } = useWorkout();
  
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [heartRate, setHeartRate] = useState(0);

  // Mock heart rate generator
  useEffect(() => {
    const generateHeartRate = () => {
      if (!isActive || isPaused) {
        setHeartRate(Math.floor(Math.random() * 15) + 60); // Resting HR: 60-75
        return;
      }

      const currentZone = getCurrentZone();
      if (!currentZone) return;

      let baseHR = 120;
      
      // Adjust based on zone type
      if (currentZone.name.includes('Warm-up') || currentZone.name.includes('Cool-down')) {
        baseHR = 100;
      } else if (currentZone.name.includes('Recovery')) {
        baseHR = 110;
      } else if (currentZone.name.includes('Steady')) {
        baseHR = 140;
      } else if (currentZone.name.includes('Build')) {
        baseHR = 150;
      } else if (currentZone.name.includes('Push')) {
        baseHR = 170;
      }

      // Add some randomness
      const variation = Math.floor(Math.random() * 20) - 10;
      setHeartRate(Math.max(60, baseHR + variation));
    };

    const interval = setInterval(generateHeartRate, 2000);
    generateHeartRate(); // Initial call
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, getCurrentZone]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        updateTime();
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining, updateTime]);

  // Redirect if no workout
  useEffect(() => {
    if (!workout) {
      onNavigate('generator');
    }
  }, [workout, onNavigate]);

  if (!workout) {
    return null;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentZone = getCurrentZone();
  const nextZone = getNextZone();
  const totalTimeRemaining = getTotalTimeRemaining();
  const isWorkoutComplete = !isActive && timeRemaining === 0 && workout;

  const handlePauseResume = () => {
    if (isPaused) {
      resumeWorkout();
    } else if (isActive) {
      pauseWorkout();
    } else {
      startWorkout();
    }
  };

  const handleStop = () => {
    stopWorkout();
    onNavigate('generator');
  };

  if (isWorkoutComplete) {
    return (
      <div className="workout-page">
        <div className="workout-complete">
          <h1>🎉 Workout Complete!</h1>
          <p>Great job finishing your cycling workout!</p>
          <div className="complete-actions">
            <button className="primary-button" onClick={() => onNavigate('generator')}>
              Generate New Workout
            </button>
            <button className="secondary-button" onClick={() => onNavigate('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-page">
      {showOptionsOverlay && (
        <WorkoutOptionsOverlay
          onClose={() => setShowOptionsOverlay(false)}
          onStop={handleStop}
        />
      )}
      
      <div className="workout-container">
        <div className="workout-header">
          <button 
            className="options-button"
            onClick={() => setShowOptionsOverlay(true)}
          >
            ⋯
          </button>
        </div>

        <div className="current-zone-section">
          <div className="zone-label">Current Zone</div>
          <div className="zone-name">{currentZone?.name || 'Loading...'}</div>
          <div className="zone-time">
            <span className="time-remaining">{formatTime(timeRemaining)}</span>
            <span className="time-label">remaining</span>
          </div>
          <div className="zone-intensity">{currentZone?.intensity}</div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-value">{heartRate}</div>
            <div className="stat-label">BPM</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{formatTime(totalTimeRemaining)}</div>
            <div className="stat-label">Total Remaining</div>
          </div>
        </div>

        {nextZone && (
          <div className="next-zone-section">
            <div className="next-zone-label">Up Next</div>
            <div className="next-zone-name">{nextZone.name}</div>
            <div className="next-zone-duration">{nextZone.duration} minutes</div>
          </div>
        )}

        <div className="controls-section">
          <button 
            className={`pause-resume-button ${isPaused ? 'resume' : 'pause'}`}
            onClick={handlePauseResume}
          >
            {!isActive ? '▶ Start' : isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPage;