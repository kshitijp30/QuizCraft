
import React, { useState } from 'react';
import { AuthState } from '../../App';
import { Icon } from '../ui/Icon';

interface SignupPageProps {
  setAuthState: (state: AuthState) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ setAuthState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('quizcraft_users') || '[]');
      const userExists = users.some((user: any) => user.email === email);

      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }
      
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem('quizcraft_users', JSON.stringify(users));

      setError('');
      console.log('Signing up with:', email);
      alert('Account created successfully! Please log in.');
      setAuthState(AuthState.Login);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-primary p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-900/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <div className="flex justify-center mb-4 cursor-pointer" onClick={() => setAuthState(AuthState.Landing)}>
            <Icon name="logo" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <button onClick={() => setAuthState(AuthState.Login)} className="font-medium text-brand-600 hover:text-brand-500">
              sign in to an existing account
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
