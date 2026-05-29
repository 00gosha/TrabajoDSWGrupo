import { motion } from 'framer-motion';
import { useState } from 'react';

const accessStats = [
  { label: 'Verified members', value: '2.1K' },
  { label: 'Open cases', value: '48' },
  { label: 'Review queue', value: '12' },
];

function Login() {
  const [authMode, setAuthMode] = useState('login');
  const [rememberSession, setRememberSession] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      usuario: formData.get('usuario'),
      password: formData.get('password'),
    };

    if (authMode === 'register') {
      payload.nombre = formData.get('nombre');
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`/api/auth/${authMode === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo completar la solicitud.');
      }

      if (rememberSession) {
        localStorage.setItem('uap-user', JSON.stringify(data.usuario));
      } else {
        localStorage.removeItem('uap-user');
      }

      setStatus({ type: 'success', message: data.message });
      event.currentTarget.reset();
      setRememberSession(true);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="login" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="noise-layer absolute inset-0 opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chrome/30 to-transparent" />
      <div className="absolute bottom-10 right-[-10rem] h-80 w-80 rounded-full border border-chrome/10 bg-chrome/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
            Member access
          </p>
          <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">User Login</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-steel">
            Access your account to follow investigations, save evidence threads, and continue
            moderated discussions from your profile.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-xl">
            {accessStats.map((stat) => (
              <div key={stat.label} className="liquid-glass rounded-lg p-4">
                <p className="metal-text text-2xl font-black">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-steel">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="liquid-glass chrome-border rounded-lg p-5 sm:p-7"
        >
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-steel">
                Secure session
              </p>
              <h3 className="mt-2 text-2xl font-black text-chrome">
                {authMode === 'login' ? 'Sign in' : 'Create account'}
              </h3>
            </div>
            <div className="grid grid-cols-2 rounded-md border border-chrome/20 bg-white/[0.04] p-1 text-sm font-semibold">
              <button
                type="button"
                aria-pressed={authMode === 'login'}
                onClick={() => {
                  setAuthMode('login');
                  setStatus({ type: '', message: '' });
                }}
                className={`rounded px-3 py-2 transition ${
                  authMode === 'login' ? 'bg-chrome text-black' : 'text-steel hover:text-chrome'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                aria-pressed={authMode === 'register'}
                onClick={() => {
                  setAuthMode('register');
                  setStatus({ type: '', message: '' });
                }}
                className={`rounded px-3 py-2 transition ${
                  authMode === 'register' ? 'bg-chrome text-black' : 'text-steel hover:text-chrome'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            {authMode === 'register' && (
              <label>
                <span className="mb-2 block text-sm font-semibold text-chrome">Full name</span>
                <input
                  className="field-shell"
                  name="nombre"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>
            )}

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Email or username</span>
              <input
                className="field-shell"
                name="usuario"
                autoComplete="username"
                placeholder="admin, user, or name@example.com"
                required
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Password</span>
              <input
                className="field-shell"
                name="password"
                type="password"
                autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                placeholder={authMode === 'login' ? 'Enter your password' : 'Minimum 6 characters'}
                required
              />
            </label>

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 text-steel">
                <input
                  checked={rememberSession}
                  className="h-4 w-4 rounded border-chrome/30 bg-white/[0.04] accent-chrome"
                  name="remember"
                  type="checkbox"
                  onChange={(event) => setRememberSession(event.target.checked)}
                />
                Remember session
              </label>

              <a href="#login" className="font-semibold text-chrome transition hover:text-white">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-md border border-chrome bg-chrome px-6 py-3 text-sm font-black text-black shadow-silver transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Processing...' : authMode === 'login' ? 'Enter Board' : 'Create User'}
            </button>

            {status.message && (
              <p
                className={`rounded-md border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-chrome/30 bg-chrome/10 text-chrome'
                    : 'border-red-400/40 bg-red-500/10 text-red-100'
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Login;
