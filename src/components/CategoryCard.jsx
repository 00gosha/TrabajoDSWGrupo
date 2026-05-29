import { motion } from 'framer-motion';

function CategoryCard({ category, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="liquid-glass chrome-border group rounded-lg p-6 transition hover:border-chrome/60 hover:shadow-silver"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-chrome/30 bg-white/[0.05] text-xl text-chrome shadow-insetSilver">
          {category.icon}
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-transparent via-chrome/60 to-transparent opacity-50 transition group-hover:opacity-100" />
      </div>
      <h3 className="text-xl font-bold text-chrome">{category.title}</h3>
      <p className="mt-3 min-h-20 text-sm leading-6 text-steel">{category.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-chrome/15 bg-white/[0.04] px-3 py-1 text-xs text-chrome/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default CategoryCard;
