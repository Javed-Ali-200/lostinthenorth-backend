import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="header">
      <NavLink to="/" className="logo">lostInTheNorth</NavLink>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/">home</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/package">package</NavLink>
        <NavLink to="/book">book</NavLink>
      </nav>

      <Menu 
        size={25} 
        id="menu-btn" 
        className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      />
    </section>
  );
};

export default Header;