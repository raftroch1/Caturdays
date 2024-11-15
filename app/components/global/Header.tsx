import {Link} from '@remix-run/react';
import {useState, type ReactNode} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';

interface HeaderProps {
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  cart: Promise<any>;
  publicStoreDomain: string;
  children?: ReactNode;
}

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {shop, menu} = header;

  const renderMenuItems = () => {
    if (menu?.items?.length) {
      return menu.items.map((item) => (
        <Link
          key={item.id}
          to={item.url || '#'}
          className="nav-link"
        >
          {item.title}
        </Link>
      ));
    }

    return (
      <>
        <Link to="/collections" className="nav-link">
          Shop
        </Link>
        <Link to="/collections/purr-fect-basics" className="nav-link">
          Purr-fect Basics
        </Link>
        <Link to="/collections/meow-velous-dresses" className="nav-link">
          Meow-velous Dresses
        </Link>
      </>
    );
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <span role="img" aria-label="cat">🐱</span>
          <h1 className="logo-text">
            {shop.name || 'Caturdays'}
          </h1>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="desktop-nav">
          {renderMenuItems()}
        </nav>

        {/* Cart and Menu Button */}
        <div className="cart-menu-container">
          <Link to="/cart" className="cart-link">
            <span role="img" aria-label="shopping bag">🛍️</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-button"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {renderMenuItems()}
        </div>
      )}
    </header>
  );
}
