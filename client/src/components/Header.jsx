import ThemeToggleButton from '@/components/ThemeToggleButton';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[var(--primary-bg)] text-[var(--primary-text)] shadow-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-serif tracking-wide text-[var(--primary-text)]">
          Rich Zenzi Art
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="hover:text-[var(--accent-text)] transition-colors duration-300">| Home |</a>
          <a href="#about" className="hover:text-[var(--accent-text)] transition-colors duration-300">| About |</a>
          <a href="#gallery" className="hover:text-[var(--accent-text)] transition-colors duration-300">| Gallery |</a>
          <a href="#catalogue" className="hover:text-[var(--accent-text)] transition-colors duration-300">| Catalogue |</a>
          <a href="#commissions" className="hover:text-[var(--accent-text)] transition-colors duration-300">| Commissions |</a>
          <a href="#contact" className="hover:text-[var(--accent-text)] transition-colors duration-300">| Contact |</a>
        </nav>

        {/* Theme Toggle Button */}
        <div className="ml-4">
          <ThemeToggleButton />
        </div>

      </div>
    </header>
  );
};

export default Header;
