import { motion } from 'framer-motion';

const stats = [
  { value: '120+', label: 'Threads' },
  { value: '3.4K', label: 'Comments' },
  { value: '850', label: 'Images Shared' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pt-36"
    >
      <div className="noise-layer absolute inset-0 opacity-35" />
      <div className="absolute left-1/2 top-20 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-chrome/10 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(170,180,190,0.08)_34%,transparent_70%)] blur-sm" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <span className="liquid-glass inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-chrome/90">
            Official UAP Discussion Platform
          </span>
          <h1 className="metal-text mt-7 max-w-4xl text-6xl font-black leading-none sm:text-7xl lg:text-8xl">
            Analyze the Unknown
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-lg">
            A modern discussion board dedicated to public UAP videos, images, and documents
            released by official U.S. government sources.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#discussions"
              className="rounded-md border border-chrome bg-chrome px-6 py-3 text-center text-sm font-bold text-black shadow-silver transition hover:bg-white"
            >
              Explore Threads
            </a>
            <a
              href="#gallery"
              className="liquid-glass rounded-md px-6 py-3 text-center text-sm font-bold text-chrome transition hover:border-chrome/60 hover:shadow-silver"
            >
              View Gallery
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.85, ease: 'easeOut' }}
          className="relative mx-auto aspect-square w-full max-w-[34rem]"
          aria-hidden="true"
        >
          <div className="absolute inset-10 rounded-full border border-chrome/15" />
          <div className="absolute inset-20 rounded-full border border-dashed border-chrome/20" />
          <div className="absolute left-1/2 top-1/2 h-28 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-chrome/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(130,138,146,0.08)_52%,rgba(255,255,255,0.18))] shadow-[0_0_90px_rgba(232,237,242,0.28)]" />
          <div className="absolute left-1/2 top-1/2 h-7 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 blur-sm" />
          <div className="absolute left-1/2 top-[58%] h-40 w-52 -translate-x-1/2 rounded-full bg-chrome/10 blur-3xl" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-4 sm:grid-cols-3 lg:col-span-2"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="liquid-glass chrome-border rounded-lg p-5"
            >
              <p className="metal-text text-3xl font-black">{stat.value}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-steel">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
