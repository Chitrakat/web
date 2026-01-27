import { useEffect, useRef } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import './WorkoutOptionsOverlay.css';

function WorkoutOptionsOverlay({ onClose, onStop }) {
  const { skipZone, getCurrentZone, getNextZone } = useWorkout();
  const overlayRef = useRef(null);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const currentZone = getCurrentZone();
  const nextZone = getNextZone();

  const handleSkipZone = () => {
    if (nextZone) {
      skipZone();
      onClose();
    }
  };

  const handleStopWorkout = () => {
    onStop();
    onClose();
  };

  return (
    <div className="workout-options-overlay">
      <div className="overlay-backdrop" />
      <div className="overlay-content" ref={overlayRef}>
        <div className="overlay-header">
          <h3>Workout Options</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="overlay-body">
          <div className="option-item">
            <button 
              className="option-button skip-button"
              onClick={handleSkipZone}
              disabled={!nextZone}
            >
              <span className="option-icon">⏭</span>
              <div className="option-text">
                <div className="option-title">Skip Current Zone</div>
                {nextZone ? (
                  <div className="option-description">Move to {nextZone.name}</div>
                ) : (
                  <div className="option-description">No more zones</div>
                )}
              </div>
            </button>
          </div>

          <div className="option-item">
            <button 
              className="option-button stop-button"
              onClick={handleStopWorkout}
            >
              <span className="option-icon">⏹</span>
              <div className="option-text">
                <div className="option-title">Stop Workout</div>
                <div className="option-description">End workout and return to generator</div>
              </div>
            </button>
          </div>
        </div>

        <div className="overlay-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutOptionsOverlay;