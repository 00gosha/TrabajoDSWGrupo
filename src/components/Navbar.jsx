import { motion } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: 'Inicio', href: '#home' },
  { label: 'Casos', href: '#cases' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Discusiones', href: '#discussions' },
  { label: 'Crear hilo', href: '#create-thread' },
  { label: 'Acerca', href: '#about' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -22, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav className="liquid-glass chrome-border mx-auto max-w-7xl rounded-lg px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3" aria-label="Inicio de UAPBoard">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-chrome/50 bg-white/[0.08] text-sm font-black tracking-[0.16em] text-chrome shadow-silver">
              UAP
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.24em] text-chrome/90 sm:inline">
              UAPBoard
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-steel transition hover:text-chrome"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#login"
              className="rounded-md border border-chrome/40 bg-chrome px-4 py-2 text-sm font-semibold text-black shadow-silver transition hover:bg-white hover:shadow-[0_0_46px_rgba(232,237,242,0.32)]"
            >
              Ingresar
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="grid h-10 w-10 place-items-center rounded-md border border-chrome/25 bg-white/[0.04] text-chrome transition hover:border-chrome/60 lg:hidden"
              aria-label="Abrir menu de navegacion"
              aria-expanded={isOpen}
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="mt-4 grid gap-2 border-t border-chrome/15 pt-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-steel transition hover:bg-white/[0.06] hover:text-chrome"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

export default Navbar;
