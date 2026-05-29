import CategoryCard from './CategoryCard.jsx';
import { categories } from '../data/categories.js';

function Categories() {
  return (
    <section id="cases" className="relative px-4 py-24 sm:px-6">
      <div id="gallery" className="absolute -top-24" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
              Classified-style indexes
            </p>
            <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">Discussion Boards</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-steel">
            Organized boards for public-source evidence, technical review, archives, and open
            discussion.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
