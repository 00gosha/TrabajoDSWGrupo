function Footer() {
  const links = ['Privacy', 'Rules', 'Categories', 'Contact'];

  return (
    <footer className="border-t border-chrome/15 bg-black px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="metal-text text-2xl font-black">UAPBoard</p>
          <p className="mt-2 text-sm text-steel">
            Frontend concept for a public UAP discussion platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-steel">
          {links.map((link) => (
            <a key={link} href="#" className="transition hover:text-chrome">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
