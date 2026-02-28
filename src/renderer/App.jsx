import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.jpeg';

function App() {
  const [selectedModel, setSelectedModel] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(true);
  const progressIntervalRef = useRef(null);

  const models = ['C8130/35', 'C-8145/55', 'C8170', 'B-8145/55', 'B-8170', 'C-8230/35', 'C-45/55', 'C-8270', 'B-8245/55', 'B-8270'];
  const PROGRAMMING_DURATION = 8000; // 5 seconds in milliseconds
  const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms

  const startProgramming = () => {
    if (!selectedModel) return;

    setIsRunning(true);
    setStatusText('Programming...');
    setProgress(0);
    setIsRefreshDisabled(true);

    const startTime = Date.now();
    const totalUpdates = PROGRAMMING_DURATION / PROGRESS_UPDATE_INTERVAL;

    progressIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / PROGRAMMING_DURATION) * 100, 100);

      setProgress(newProgress);

      if (elapsedTime >= PROGRAMMING_DURATION) {
        clearInterval(progressIntervalRef.current);
        setProgress(100);
        setStatusText('Completed');
        setIsRunning(false);
        setIsRefreshDisabled(false);
      }
    }, PROGRESS_UPDATE_INTERVAL);
  };

  const handleRefresh = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setSelectedModel('');
    setProgress(0);
    setStatusText('');
    setIsRunning(false);
    setIsRefreshDisabled(true);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app-wrapper">
      <div className="container">
        {/* Branded Header */}
        <div className="branded-header">
          <div className="header-logo-section">
            <img src={logo} alt="SR Logo" className="sr-logo" />
            <div className="header-text">
              <h1 className="brand-title">ALTALINK RESET TOOL</h1>
              <p className="brand-tagline">Professional Meter Reset Solutions</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span className="feature-text">Fast & Reliable</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span className="feature-text">81XX Series Compatible</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <span className="feature-text">Professional Support</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="card">
          <div className="form-group">
            <label className="form-label">Select Meter Model</label>
            <select
              className="form-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isRunning}
            >
              <option value="">-- Select Models --</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="progress-section">
            {statusText && (
              <div className="progress-text">{statusText}</div>
            )}
            {progress > 0 && (
              <>
                <div className="progress-bar-segmented">
                  {[...Array(20)].map((_, index) => (
                    <div
                      key={index}
                      className={`progress-segment ${
                        (index + 1) * 5 <= progress ? 'filled' : ''
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="progress-stats">
                  <span className="progress-percentage-text">
                    {Math.round(progress)}%
                  </span>
                  <span className="progress-time">
                    {progress === 100 ? '✓ Complete' : 'Processing...'}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="button-group">
            <button
              className="button button-start"
              onClick={startProgramming}
              disabled={isRunning || !selectedModel}
            >
              Start Reset
            </button>
            <button
              className="button button-refresh"
              onClick={handleRefresh}
              disabled={isRefreshDisabled}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="contact-footer">
          <div className="footer-brand">
            <h3 className="footer-company-name">SR ENTERPRISES</h3>
            <p className="footer-tagline">Your Trusted Partner for Meter Reset Solutions</p>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-content">
            <div className="footer-item">
              <span className="footer-label">📞 Phone</span>
              <a href="tel:+919595211662" className="footer-link">+91 9595211662</a>
            </div>
            <div className="footer-item">
              <span className="footer-label">📍 Location</span>
              <p className="footer-value">Nagpur, India</p>
            </div>
            <div className="footer-item">
              <span className="footer-label">⏰ Support</span>
              <p className="footer-value">24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
