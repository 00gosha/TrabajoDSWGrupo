import { motion } from 'framer-motion';
import { useState } from 'react';

const accessStats = [
  { label: 'Verified members', value: '2.1K' },
  { label: 'Open cases', value: '48' },
  { label: 'Review queue', value: '12' },
];

function Login() {
  const [rememberSession, setRememberSession] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login submitted. This frontend is ready to connect to an auth API.');
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
              <h3 className="mt-2 text-2xl font-black text-chrome">Sign in</h3>
            </div>
            <a href="#create-thread" className="text-sm font-semibold text-chrome transition hover:text-white">
              Request access
            </a>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Email address</span>
              <input
                className="field-shell"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Password</span>
              <input
                className="field-shell"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
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
              className="mt-2 rounded-md border border-chrome bg-chrome px-6 py-3 text-sm font-black text-black shadow-silver transition hover:bg-white"
            >
              Enter Board
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Login;
