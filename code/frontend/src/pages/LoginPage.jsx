import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Glasses,
  Lock,
  User,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Key,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  
  // Login & Register state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Forgot Password / Username recovery state
  const [recoveryIdentifier, setRecoveryIdentifier] = useState('');
  const [foundAccount, setFoundAccount] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login, loginAsGuest, register, lookupAccount, resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/explore';

  const resetFormState = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setFoundAccount(null);
    setRecoveryIdentifier('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const switchMode = (mode) => {
    resetFormState();
    setAuthMode(mode);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await register({ username, password, name, email });
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Registration error. Try again.');
    }
  };

  const handleLookupAccount = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await lookupAccount(recoveryIdentifier);
      setFoundAccount(res);
      setSuccessMsg(`Account found! Your registered username is: ${res.username}`);
    } catch (err) {
      setErrorMsg(err.message || 'No account found matching this email or username.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      await resetPassword(foundAccount.email || recoveryIdentifier, newPassword, true);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to reset password. Please try again.');
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0f1422] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 mx-auto mb-3">
            {authMode === 'forgot' ? (
              <Key className="w-6 h-6 text-white" />
            ) : (
              <Glasses className="w-6 h-6 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {authMode === 'login' && 'Welcome to VR Everywhere'}
            {authMode === 'register' && 'Create Explorer Account'}
            {authMode === 'forgot' && 'Account Recovery'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login' && 'Sign in to access your virtual travel history and saved sites'}
            {authMode === 'register' && 'Register to save custom favorites and log your VR tours'}
            {authMode === 'forgot' && 'Recover your username or set a new password'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>{successMsg}</div>
          </div>
        )}

        {/* -------------------- MODE 1: LOGIN -------------------- */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-xs font-medium text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex justify-end pt-1.5">
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline transition-colors cursor-pointer"
                >
                  Forgot password or username?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* -------------------- MODE 2: REGISTER -------------------- */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Traveler"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-username" className="block text-xs font-medium text-slate-300 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="reg-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="reg-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password (min. 6 characters)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register Account'}
            </button>
          </form>
        )}

        {/* -------------------- MODE 3: FORGOT PASSWORD / USERNAME -------------------- */}
        {authMode === 'forgot' && (
          <div className="space-y-4">
            {!foundAccount ? (
              <form onSubmit={handleLookupAccount} className="space-y-4">
                <div>
                  <label htmlFor="recovery-id" className="block text-xs font-medium text-slate-300 mb-1">
                    Registered Email Address or Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="recovery-id"
                      type="text"
                      required
                      value={recoveryIdentifier}
                      onChange={(e) => setRecoveryIdentifier(e.target.value)}
                      placeholder="e.g. traveler@vreverywhere.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    We'll find your account, retrieve your username, and allow you to set a new password.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Find My Account'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Account Details</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1 pl-1">
                    <p>
                      <span className="text-slate-400">Username: </span>
                      <strong className="text-white bg-cyan-900/60 px-2 py-0.5 rounded-md font-mono text-cyan-300">
                        {foundAccount.username}
                      </strong>
                    </p>
                    <p><span className="text-slate-400">Email: </span><span className="text-slate-200">{foundAccount.email}</span></p>
                  </div>
                </div>

                <div>
                  <label htmlFor="new-pw" className="block text-xs font-medium text-slate-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="new-pw"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min. 6 characters)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-pw" className="block text-xs font-medium text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="confirm-pw"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'Updating Password...' : 'Reset Password & Sign In'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Navigation Options */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center space-y-2.5">
          {authMode !== 'login' && (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          )}

          {authMode === 'login' && (
            <>
              <button
                type="button"
                onClick={handleGuest}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Continue as Guest Explorer</span>
              </button>

              <button
                type="button"
                onClick={() => switchMode('register')}
                className="text-xs text-cyan-400 hover:underline block mx-auto pt-1"
              >
                Don't have an account yet? Register
              </button>
            </>
          )}

          {authMode === 'register' && (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="text-xs text-cyan-400 hover:underline block mx-auto pt-1"
            >
              Already have an account? Sign In
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
