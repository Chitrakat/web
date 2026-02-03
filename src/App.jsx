import { useState } from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import HomePage from './components/HomePage';
import WorkoutGenerator from './components/WorkoutGenerator';
import WorkoutPage from './components/WorkoutPage';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'generator':
        return <WorkoutGenerator onNavigate={handleNavigate} />;
      case 'workout':
        return <WorkoutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <WorkoutProvider>
      <div className="app">
        <main className="main-content">
          {renderCurrentView()}
        </main>
      </div>
    </WorkoutProvider>
  );
}

export default App
