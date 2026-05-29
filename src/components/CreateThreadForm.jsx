import { motion } from 'framer-motion';
import { useState } from 'react';
import { categories } from '../data/categories.js';

function CreateThreadForm({ onThreadCreated }) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const savedUser = JSON.parse(localStorage.getItem('uap-user') || 'null');

    formData.set('author', savedUser?.usuario || savedUser?.nombre || 'Anonimo');

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo publicar el hilo.');
      }

      form.reset();
      setSelectedFileName('');
      setStatus({ type: 'success', message: data.message });
      onThreadCreated?.(data.hilo);
      document.querySelector('#discussions')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="create-thread" className="relative px-4 py-24 sm:px-6">
      <div id="files" className="absolute -top-24" />
      <div id="about" className="absolute top-1/2" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
            Preparado para moderacion
          </p>
          <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">Crear un nuevo hilo</h2>
          <p className="mt-5 text-sm leading-7 text-steel">
            Publica una pregunta, evidencia o analisis. El hilo quedara guardado en la base de
            datos y aparecera en la seccion de ultimos hilos.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="liquid-glass chrome-border rounded-lg p-5 sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-chrome">Titulo del hilo</span>
              <input className="field-shell" name="title" placeholder="Ej. Anomalia de sensor en un video publico" required />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Categoria</span>
              <select className="field-shell" name="category" defaultValue="" required>
                <option value="" disabled>
                  Selecciona un tablero
                </option>
                {categories.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Subir foto o video</span>
              <input
                className="field-shell file:mr-4 file:rounded file:border-0 file:bg-chrome file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-black"
                name="media"
                type="file"
                accept="image/*,video/*"
                onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name || '')}
              />
              {selectedFileName && (
                <span className="mt-2 block text-xs text-steel">Archivo seleccionado: {selectedFileName}</span>
              )}
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-chrome">Descripcion</span>
              <textarea
                className="field-shell min-h-36 resize-y"
                name="description"
                placeholder="Resume la evidencia, el contexto de la fuente y lo que quieres que el foro analice."
                required
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-chrome">Enlace de fuente opcional</span>
              <input className="field-shell" name="source" type="url" placeholder="https://..." />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full rounded-md border border-chrome bg-chrome px-6 py-3 text-sm font-black text-black shadow-silver transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Publicando...' : 'Publicar hilo'}
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded-md border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-chrome/30 bg-chrome/10 text-chrome'
                  : 'border-red-400/40 bg-red-500/10 text-red-100'
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default CreateThreadForm;
