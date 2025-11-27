import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';
import { GraduationCap, Loader2 } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, role);
      if (success) {
        navigate('/dashboard');
      } else {
        // Fallback for demo: if generic login failed, check if they are trying to access the specific demo accounts
        // If exact match fails, just show error.
        // BUT, to make the demo usable, I'll update AuthContext to accept 'demo' logic, OR
        // I will pre-fill the form with suggestions.
        setError('Invalid credentials. Try using the demo accounts listed below.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (r: UserRole, e: string) => {
    setRole(r);
    setEmail(e);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <Link to="/" className="inline-flex justify-center">
             <GraduationCap className="h-12 w-12 text-primary-600" />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Alumni Advantage System</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-center space-x-4 mb-6">
            {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(UserRole[r])}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  role === UserRole[r]
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {UserRole[r].charAt(0) + UserRole[r].slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t pt-6">
           <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials (Click to fill):</p>
           <div className="flex flex-col space-y-2 text-xs">
              <button onClick={() => fillDemo(UserRole.ADMIN, 'admin@sdm.edu')} className="text-primary-600 hover:underline">Admin: admin@sdm.edu</button>
              <button onClick={() => fillDemo(UserRole.ALUMNI, 'suhail@alum.sdm.edu')} className="text-primary-600 hover:underline">Alumni: suhail@alum.sdm.edu</button>
              <button onClick={() => fillDemo(UserRole.STUDENT, 'samarth@student.sdm.edu')} className="text-primary-600 hover:underline">Student: samarth@student.sdm.edu</button>
           </div>
        </div>
      </div>
    </div>
  );
};