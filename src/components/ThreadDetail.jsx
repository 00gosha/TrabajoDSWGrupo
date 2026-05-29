import { motion } from 'framer-motion';

function getSourceMediaType(source) {
  if (!source) {
    return '';
  }

  const cleanSource = source.split('?')[0].toLowerCase();

  if (/\.(png|jpg|jpeg|gif|webp|avif)$/.test(cleanSource)) {
    return 'image';
  }

  if (/\.(mp4|webm|ogg|mov)$/.test(cleanSource)) {
    return 'video';
  }

  return 'page';
}

function getEmbeddableSource(source) {
  if (!source) {
    return '';
  }

  try {
    const url = new URL(source);
    const dvidsVideoMatch = url.pathname.match(/^\/video\/(\d+)/);

    if (url.hostname.includes('dvidshub.net') && dvidsVideoMatch) {
      return `${url.origin}/video/embed/${dvidsVideoMatch[1]}`;
    }

    const youtubeId = url.hostname.includes('youtu.be')
      ? url.pathname.slice(1)
      : url.searchParams.get('v');

    if (url.hostname.includes('youtube.com') && youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }

    if (url.hostname.includes('youtu.be') && youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
  } catch {
    return source;
  }

  return source;
}

function ThreadDetail({ thread, onClose }) {
  if (!thread) {
    return null;
  }

  const sourceMediaType = getSourceMediaType(thread.source);
  const embeddableSource = getEmbeddableSource(thread.source);

  return (
    <motion.article
      id="thread-detail"
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="liquid-glass chrome-border mt-8 scroll-mt-32 rounded-lg p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 border-b border-chrome/15 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-steel">
            {thread.category} - {thread.date}
          </p>
          <h3 className="mt-3 text-3xl font-black text-chrome">{thread.title}</h3>
          <p className="mt-2 text-sm text-steel">Publicado por {thread.author || 'Anonimo'}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-chrome/30 px-4 py-2 text-sm font-semibold text-chrome transition hover:bg-chrome hover:text-black"
        >
          Cerrar
        </button>
      </div>

      {thread.mediaUrl && (
        <div className="mt-6 overflow-hidden rounded-lg border border-chrome/20 bg-black">
          {thread.mediaType === 'video' ? (
            <video className="max-h-[34rem] w-full object-contain" src={thread.mediaUrl} controls />
          ) : (
            <img className="max-h-[34rem] w-full object-contain" src={thread.mediaUrl} alt={thread.title} />
          )}
        </div>
      )}

      {!thread.mediaUrl && thread.source && (
        <div className="mt-6 overflow-hidden rounded-lg border border-chrome/20 bg-black">
          {sourceMediaType === 'image' ? (
            <img className="max-h-[34rem] w-full object-contain" src={thread.source} alt={thread.title} />
          ) : sourceMediaType === 'video' ? (
            <video className="max-h-[34rem] w-full object-contain" src={thread.source} controls />
          ) : (
            <iframe
              className="h-[28rem] w-full bg-black"
              src={embeddableSource}
              title={thread.title}
              loading="lazy"
              allow="fullscreen; picture-in-picture"
            />
          )}
        </div>
      )}

      <p className="mt-6 whitespace-pre-line text-sm leading-7 text-steel">{thread.preview}</p>

      {thread.source && (
        <a
          href={thread.source}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-md border border-chrome/35 px-4 py-2 text-sm font-semibold text-chrome transition hover:border-chrome hover:bg-chrome hover:text-black hover:shadow-silver"
        >
          Ver fuente original
        </a>
      )}
    </motion.article>
  );
}

export default ThreadDetail;
