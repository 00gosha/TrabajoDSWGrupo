import ThreadCard from './ThreadCard.jsx';
import { threads } from '../data/threads.js';

function LatestThreads() {
  return (
    <section id="discussions" className="relative px-4 py-24 sm:px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chrome/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
              Live board preview
            </p>
            <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">Latest Threads</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-steel">
            Mock discussion cards prepared for API data once the backend is available.
          </p>
        </div>

        <div className="grid gap-5">
          {threads.map((thread, index) => (
            <ThreadCard key={thread.title} thread={thread} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestThreads;
