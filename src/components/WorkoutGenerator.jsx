import { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import './WorkoutGenerator.css';

// Workout generation logic
const generateWorkout = (timeMinutes, difficulty) => {
  const workoutPlans = {
    15: {
      easy: [
        { name: 'Warm-up', duration: 3, intensity: 'Easy pace, light resistance' },
        { name: 'Steady', duration: 8, intensity: 'Moderate pace, comfortable' },
        { name: 'Cool-down', duration: 4, intensity: 'Easy pace, low resistance' },
      ],
      moderate: [
        { name: 'Warm-up', duration: 2, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 4, intensity: 'Gradually increase pace' },
        { name: 'Push', duration: 6, intensity: 'High intensity, strong resistance' },
        { name: 'Cool-down', duration: 3, intensity: 'Easy pace, low resistance' },
      ],
      challenging: [
        { name: 'Warm-up', duration: 2, intensity: 'Easy pace, light resistance' },
        { name: 'Push', duration: 3, intensity: 'Very high intensity' },
        { name: 'Recovery', duration: 2, intensity: 'Light pace, low resistance' },
        { name: 'Push', duration: 4, intensity: 'Maximum effort' },
        { name: 'Push', duration: 2, intensity: 'Sprint intervals' },
        { name: 'Cool-down', duration: 2, intensity: 'Easy pace, low resistance' },
      ],
    },
    30: {
      easy: [
        { name: 'Warm-up', duration: 5, intensity: 'Easy pace, light resistance' },
        { name: 'Steady', duration: 18, intensity: 'Moderate pace, comfortable' },
        { name: 'Cool-down', duration: 7, intensity: 'Easy pace, low resistance' },
      ],
      moderate: [
        { name: 'Warm-up', duration: 4, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 6, intensity: 'Gradually increase pace' },
        { name: 'Push', duration: 8, intensity: 'High intensity, strong resistance' },
        { name: 'Recovery', duration: 4, intensity: 'Light pace, moderate resistance' },
        { name: 'Push', duration: 5, intensity: 'High intensity finish' },
        { name: 'Cool-down', duration: 3, intensity: 'Easy pace, low resistance' },
      ],
      challenging: [
        { name: 'Warm-up', duration: 3, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 4, intensity: 'Gradually increase pace' },
        { name: 'Push', duration: 5, intensity: 'High intensity' },
        { name: 'Recovery', duration: 3, intensity: 'Active recovery' },
        { name: 'Push', duration: 6, intensity: 'Very high intensity' },
        { name: 'Recovery', duration: 2, intensity: 'Light pace' },
        { name: 'Push', duration: 4, intensity: 'Maximum effort intervals' },
        { name: 'Cool-down', duration: 3, intensity: 'Easy pace, low resistance' },
      ],
    },
    45: {
      easy: [
        { name: 'Warm-up', duration: 6, intensity: 'Easy pace, light resistance' },
        { name: 'Steady', duration: 30, intensity: 'Moderate pace, comfortable' },
        { name: 'Cool-down', duration: 9, intensity: 'Easy pace, low resistance' },
      ],
      moderate: [
        { name: 'Warm-up', duration: 5, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 8, intensity: 'Gradually increase pace' },
        { name: 'Steady', duration: 12, intensity: 'Moderate-high intensity' },
        { name: 'Recovery', duration: 5, intensity: 'Active recovery' },
        { name: 'Push', duration: 10, intensity: 'High intensity' },
        { name: 'Cool-down', duration: 5, intensity: 'Easy pace, low resistance' },
      ],
      challenging: [
        { name: 'Warm-up', duration: 4, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 6, intensity: 'Gradually increase pace' },
        { name: 'Push', duration: 8, intensity: 'High intensity' },
        { name: 'Recovery', duration: 4, intensity: 'Active recovery' },
        { name: 'Push', duration: 8, intensity: 'Very high intensity' },
        { name: 'Recovery', duration: 3, intensity: 'Light pace' },
        { name: 'Push', duration: 8, intensity: 'Maximum effort' },
        { name: 'Cool-down', duration: 4, intensity: 'Easy pace, low resistance' },
      ],
    },
    60: {
      easy: [
        { name: 'Warm-up', duration: 8, intensity: 'Easy pace, light resistance' },
        { name: 'Steady', duration: 42, intensity: 'Moderate pace, comfortable' },
        { name: 'Cool-down', duration: 10, intensity: 'Easy pace, low resistance' },
      ],
      moderate: [
        { name: 'Warm-up', duration: 6, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 10, intensity: 'Gradually increase pace' },
        { name: 'Steady', duration: 20, intensity: 'Moderate-high intensity' },
        { name: 'Recovery', duration: 6, intensity: 'Active recovery' },
        { name: 'Push', duration: 12, intensity: 'High intensity' },
        { name: 'Cool-down', duration: 6, intensity: 'Easy pace, low resistance' },
      ],
      challenging: [
        { name: 'Warm-up', duration: 5, intensity: 'Easy pace, light resistance' },
        { name: 'Build', duration: 8, intensity: 'Gradually increase pace' },
        { name: 'Push', duration: 10, intensity: 'High intensity' },
        { name: 'Recovery', duration: 5, intensity: 'Active recovery' },
        { name: 'Push', duration: 12, intensity: 'Very high intensity' },
        { name: 'Recovery', duration: 4, intensity: 'Light pace' },
        { name: 'Push', duration: 10, intensity: 'Maximum effort' },
        { name: 'Recovery', duration: 2, intensity: 'Active recovery' },
        { name: 'Push', duration: 6, intensity: 'Sprint finish' },
        { name: 'Cool-down', duration: 4, intensity: 'Easy pace, low resistance' },
      ],
    },
  };

  return workoutPlans[timeMinutes][difficulty] || [];
};

function WorkoutGenerator({ onNavigate }) {
  const { setWorkout } = useWorkout();
  const [selectedTime, setSelectedTime] = useState(30);
  const [selectedDifficulty, setSelectedDifficulty] = useState('moderate');
  const [generatedWorkout, setGeneratedWorkout] = useState(null);

  const timeOptions = [15, 30, 45, 60];
  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Light intensity, perfect for recovery days' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced workout with steady effort' },
    { value: 'challenging', label: 'Challenging', description: 'High intensity with multiple push zones' },
  ];

  const handleGenerate = () => {
    const workout = generateWorkout(selectedTime, selectedDifficulty);
    setGeneratedWorkout(workout);
  };

  const handleStartWorkout = () => {
    if (generatedWorkout) {
      setWorkout(generatedWorkout);
      onNavigate('workout');
    }
  };

  return (
    <div className="workout-generator">
      <div className="generator-container">
        <h1>Generate Your Workout</h1>
        
        <div className="input-section">
          <div className="input-group">
            <label>Workout Duration</label>
            <div className="time-options">
              {timeOptions.map(time => (
                <button
                  key={time}
                  className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time} min
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Difficulty Level</label>
            <div className="difficulty-options">
              {difficultyOptions.map(option => (
                <button
                  key={option.value}
                  className={`difficulty-option ${selectedDifficulty === option.value ? 'selected' : ''}`}
                  onClick={() => setSelectedDifficulty(option.value)}
                >
                  <div className="difficulty-label">{option.label}</div>
                  <div className="difficulty-description">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button className="generate-button" onClick={handleGenerate}>
            Generate Workout
          </button>
        </div>

        {generatedWorkout && (
          <div className="workout-preview">
            <h2>Your Workout Plan</h2>
            <div className="workout-summary">
              <span className="summary-item">Duration: {selectedTime} minutes</span>
              <span className="summary-item">Difficulty: {selectedDifficulty}</span>
              <span className="summary-item">Zones: {generatedWorkout.length}</span>
            </div>
            
            <div className="zones-list">
              {generatedWorkout.map((zone, index) => (
                <div key={index} className="zone-card">
                  <div className="zone-header">
                    <span className="zone-number">{index + 1}</span>
                    <span className="zone-name">{zone.name}</span>
                    <span className="zone-duration">{zone.duration} min</span>
                  </div>
                  <div className="zone-intensity">{zone.intensity}</div>
                </div>
              ))}
            </div>

            <button className="start-workout-button" onClick={handleStartWorkout}>
              Start Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutGenerator;