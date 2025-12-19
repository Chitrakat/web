import { useEffect } from 'react';
import Header from './Header';

function App() {
  useEffect(() => {
    // Wait for all libraries to be loaded before initializing
    const initializeApp = () => {
      if (window.p5 && window.Hydra && window.H) {
        // Initialize Hydra
        if (!window.hydra) {
          const hydra = new window.Hydra({
            detectAudio: false,
            enableStreamCapture: false
          });
          window.hydra = hydra;
        }

        // Load the landing.js script only after everything is ready
        const script = document.createElement('script');
        script.src = '/src/landing.js';
        script.type = 'text/javascript';
        script.onload = () => {
          console.log('Landing script loaded successfully');
        };
        script.onerror = (error) => {
          console.error('Error loading landing script:', error);
        };
        document.head.appendChild(script);
      } else {
        // Retry after a short delay
        setTimeout(initializeApp, 100);
      }
    };

    // Start initialization
    initializeApp();

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="/src/landing.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* P5 canvas will be created by the landing.js script */}
      </div>
    </>
  );
}

export default App
