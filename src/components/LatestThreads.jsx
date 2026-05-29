import { useEffect, useState } from 'react';
import ThreadCard from './ThreadCard.jsx';
import ThreadDetail from './ThreadDetail.jsx';
import { threads } from '../data/threads.js';

function LatestThreads({ refreshKey, selectedCategory, selectedThread, onClearCategory, onOpenThread }) {
  const [threadList, setThreadList] = useState(threads);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadThreads() {
      setStatus('Cargando hilos...');

      try {
        const params = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
        const response = await fetch(`/api/threads${params}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'No se pudieron cargar los hilos.');
        }

        if (isMounted) {
          setThreadList(data.hilos);
          setStatus('');
        }
      } catch (error) {
        if (isMounted) {
          setThreadList(threads);
          setStatus('No se pudo conectar con la API. Mostrando hilos de ejemplo.');
        }
      }
    }

    loadThreads();

    return () => {
      isMounted = false;
    };
  }, [refreshKey, selectedCategory]);

  return (
    <section id="discussions" className="relative px-4 py-24 sm:px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chrome/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
              Vista previa del foro
            </p>
            <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">
              {selectedCategory ? selectedCategory : 'Ultimos hilos'}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-steel">
            {selectedCategory
              ? 'Estos son los hilos publicados dentro del tablero seleccionado.'
              : 'Revisa los hilos publicados por la comunidad. Los nuevos hilos aparecen aqui despues de publicarlos.'}
          </p>
        </div>

        {selectedCategory && (
          <button
            type="button"
            onClick={onClearCategory}
            className="mb-5 rounded-md border border-chrome/35 px-4 py-2 text-sm font-semibold text-chrome transition hover:border-chrome hover:bg-chrome hover:text-black"
          >
            Ver todos los hilos
          </button>
        )}

        {status && (
          <p className="mb-5 rounded-md border border-chrome/20 bg-white/[0.04] px-4 py-3 text-sm text-steel">
            {status}
          </p>
        )}

        <div className="grid gap-5">
          {threadList.map((thread, index) => (
            <ThreadCard
              key={thread.id || thread.title}
              thread={thread}
              index={index}
              onOpen={(threadToOpen) => {
                onOpenThread(threadToOpen);
                setTimeout(() => {
                  document.querySelector('#thread-detail')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
            />
          ))}
        </div>

        {!threadList.length && !status && (
          <p className="rounded-md border border-chrome/20 bg-white/[0.04] px-4 py-3 text-sm text-steel">
            Todavia no hay hilos en esta categoria.
          </p>
        )}

        <ThreadDetail thread={selectedThread} onClose={() => onOpenThread(null)} />
      </div>
    </section>
  );
}

export default LatestThreads;
