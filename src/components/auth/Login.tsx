import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Moon, Sun, ArrowRight, Github } from 'lucide-react';
import vizlyLogo from 'figma:asset/96bf4512efe4ad439d153f2c27b017ec43a256da.png';

interface LoginProps {
  onLogin: () => void;
  onNavigateToSignUp: () => void;
  onNavigateToForgot: () => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

export default function Login({ onLogin, onNavigateToSignUp, onNavigateToForgot, darkMode, onToggleDarkMode }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username.trim()) newErrors.username = 'Required';
    if (!password.trim()) newErrors.password = 'Required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fcfcfd] dark:bg-[#050505] transition-colors duration-700 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Modern Theme Switcher */}
      <button
        onClick={() => onToggleDarkMode(!darkMode)}
        className="fixed top-8 right-8 z-50 p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all group"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform" />
        )}
      </button>

      <div className="w-full max-w-[460px] z-10">
        <div className="bg-white/70 dark:bg-zinc-950/40 backdrop-blur-3xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.7)] p-10 border border-white dark:border-white/10 dark:border-t-white/20">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-[28px] flex items-center justify-center shadow-2xl dark:shadow-none border border-slate-100 dark:border-zinc-800 mb-6 group transition-transform hover:rotate-3">
              <img src={vizlyLogo} alt="Vizly" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium">Continue your journey with Vizly</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">Email Address</label>
                {errors.username && <span className="text-[11px] font-bold text-red-500 uppercase">{errors.username}</span>}
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({ ...errors, username: undefined });
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/50 dark:bg-white/[0.03] border-2 border-transparent focus:border-blue-500/20 dark:focus:border-blue-500/40 focus:bg-white dark:focus:bg-zinc-900 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:focus:ring-blue-500/10 text-slate-900 dark:text-zinc-100 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-700 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">Password</label>
                {errors.password && <span className="text-[11px] font-bold text-red-500 uppercase">{errors.password}</span>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-100/50 dark:bg-white/[0.03] border-2 border-transparent focus:border-blue-500/20 dark:focus:border-blue-500/40 focus:bg-white dark:focus:bg-zinc-900 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:focus:ring-blue-500/10 text-slate-900 dark:text-zinc-100 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-700 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-3 cursor-pointer group/check">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer appearance-none w-6 h-6 border-2 border-slate-200 dark:border-white/10 rounded-lg checked:bg-blue-600 dark:checked:bg-blue-500 transition-all cursor-pointer"
                  />
                  <ArrowRight className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 group-hover/check:text-slate-900 dark:group-hover/check:text-zinc-200 transition-colors">Keep me signed in</span>
              </label>
              <button
                type="button"
                onClick={onNavigateToForgot}
                className="text-sm font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
              >
                Forgot?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-[20px] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl dark:shadow-white/5"
            >
              <span className="relative flex items-center justify-center gap-2">
                Sign In to Dashboard <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-zinc-600">Fast Connect</span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-bold text-slate-700 dark:text-zinc-300 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-bold text-slate-700 dark:text-zinc-300 text-sm">
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                GitHub
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-semibold text-slate-500 dark:text-zinc-500">
            New here?{' '}
            <button
              onClick={onNavigateToSignUp}
              className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}