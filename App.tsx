
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './components/auth/LandingPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import Dashboard from './components/dashboard/Dashboard';

export enum AuthState {
  Landing,
  Login,
  Signup,
  Authenticated
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Landing);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('quizcraft_session') || 'null');
      if (session && session.loggedIn) {
        setAuthState(AuthState.Authenticated);
      }
    } catch (err) {
      console.error("Failed to parse session data", err);
      // Fallback to landing if session data is corrupt
      setAuthState(AuthState.Landing);
    }
  }, []);


  const renderContent = () => {
    switch (authState) {
      case AuthState.Landing:
        return <LandingPage setAuthState={setAuthState} />;
      case AuthState.Login:
        return <LoginPage setAuthState={setAuthState} />;
      case AuthState.Signup:
        return <SignupPage setAuthState={setAuthState} />;
      case AuthState.Authenticated:
        return <Dashboard setAuthState={setAuthState} />;
      default:
        return <LandingPage setAuthState={setAuthState} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans antialiased">
        {renderContent()}
      </div>
    </ThemeProvider>
  );
};

export default App;
