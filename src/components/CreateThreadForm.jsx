import { motion } from 'framer-motion';
import { categories } from '../data/categories.js';

function CreateThreadForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Thread form submitted. This frontend is ready to connect to a future API.');
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
            Prepared for moderation
          </p>
          <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">Start a New Thread</h2>
          <p className="mt-5 text-sm leading-7 text-steel">
            The submission surface is frontend-only for now. It is visually ready for validation,
            uploads, and API integration when the backend team exposes the endpoint.
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
              <span className="mb-2 block text-sm font-semibold text-chrome">Thread title</span>
              <input className="field-shell" name="title" placeholder="e.g. Sensor anomaly in public clip" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Category</span>
              <select className="field-shell" name="category" defaultValue="">
                <option value="" disabled>
                  Select board
                </option>
                {categories.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-chrome">Image upload</span>
              <input className="field-shell file:mr-4 file:rounded file:border-0 file:bg-chrome file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-black" name="image" type="file" accept="image/*" />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-chrome">Description</span>
              <textarea
                className="field-shell min-h-36 resize-y"
                name="description"
                placeholder="Summarize the evidence, source context, and what you want the board to analyze."
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-chrome">Optional source link</span>
              <input className="field-shell" name="source" type="url" placeholder="https://..." />
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-md border border-chrome bg-chrome px-6 py-3 text-sm font-black text-black shadow-silver transition hover:bg-white"
          >
            Publish Thread
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default CreateThreadForm;
