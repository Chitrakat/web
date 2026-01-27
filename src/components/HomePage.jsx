import './HomePage.css';

function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Cycling Workout Generator</h1>
        <p className="hero-subtitle">
          Generate personalized cycling workouts based on your time and fitness level.
        </p>
        
        <div className="cta-section">
          <button 
            className="primary-button"
            onClick={() => onNavigate('generator')}
          >
            Generate Workout
          </button>
          <p className="cta-description">
            Create a structured cycling workout with multiple training zones
          </p>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🕒 Time-based</h3>
            <p>Choose from 15, 30, 45, or 60-minute workouts</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Difficulty Levels</h3>
            <p>Easy, Moderate, or Challenging intensity</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Zone Training</h3>
            <p>Structured zones: Warm-up, Steady, Push, Recovery</p>
          </div>
          <div className="feature-card">
            <h3>📊 Live Tracking</h3>
            <p>Real-time zone display and heart rate monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;