import CategoryCard from './CategoryCard.jsx';
import { categories } from '../data/categories.js';

function Categories({ selectedCategory, onSelectCategory }) {
  return (
    <section id="cases" className="relative px-4 py-24 sm:px-6">
      <div id="gallery" className="absolute -top-24" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-steel">
              Indices estilo clasificado
            </p>
            <h2 className="metal-text mt-3 text-4xl font-black sm:text-5xl">Tableros de discusion</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-steel">
            Espacios organizados para evidencia de fuentes publicas, revision tecnica, archivos y
            debate abierto.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              isSelected={selectedCategory === category.title}
              onSelect={(categoryTitle) => {
                onSelectCategory(categoryTitle);
                document.querySelector('#discussions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
