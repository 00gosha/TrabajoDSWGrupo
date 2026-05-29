import { motion } from 'framer-motion';

function ThreadCard({ thread, index, onOpen }) {
  const hasMedia = Boolean(thread.mediaUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.07, duration: 0.58, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="liquid-glass chrome-border grid gap-5 rounded-lg p-5 md:grid-cols-[12rem_1fr]"
    >
      <div className="relative min-h-44 overflow-hidden rounded-md border border-chrome/20 bg-black">
        {hasMedia && thread.mediaType === 'image' ? (
          <img className="h-full min-h-44 w-full object-cover" src={thread.mediaUrl} alt={thread.title} />
        ) : hasMedia && thread.mediaType === 'video' ? (
          <video className="h-full min-h-44 w-full object-cover" src={thread.mediaUrl} muted />
        ) : (
          <>
            <div className="noise-layer absolute inset-0 opacity-60" />
            <div className="absolute inset-x-6 top-8 h-16 rounded-full border border-chrome/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.04))] shadow-silver" />
          </>
        )}
        <div className="absolute bottom-4 left-4 rounded border border-chrome/20 bg-black/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-chrome">
          {thread.mediaType === 'video' ? 'VIDEO' : thread.mediaType === 'image' ? 'FOTO' : thread.thumbnail}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-steel">
          <span>{thread.category}</span>
          <span className="h-1 w-1 rounded-full bg-chrome/60" />
          <span>{thread.date}</span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-chrome">{thread.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-steel">{thread.preview}</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-chrome/80">
            {thread.comments} comentarios
            {thread.author ? ` - Publicado por ${thread.author}` : ''}
          </span>
          <button
            type="button"
            onClick={() => onOpen(thread)}
            className="rounded-md border border-chrome/35 px-4 py-2 text-sm font-semibold text-chrome transition hover:border-chrome hover:bg-chrome hover:text-black hover:shadow-silver"
          >
            Abrir hilo
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ThreadCard;
