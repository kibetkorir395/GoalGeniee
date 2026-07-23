import Logo from '../../assets/logo.png';
import './Navbar.scss';
import { NavLink } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { ThemeContext } from '../../ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { DarkMode, LightMode, Menu, Close } from '@mui/icons-material';

const Navbar1 = () => {
    const { currentUser } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={menuOpen ? "menu-open" : ""}>
            <NavLink to="/" className='logo' onClick={closeMenu}>
                <img src={Logo} alt='goalgenie_logo' />
                <span className="brand">Goal Genie</span>
            </NavLink>
            <nav className={menuOpen ? "open" : ""}>
                <NavLink to="/" title='predictions' onClick={closeMenu} end>Home</NavLink>
                <NavLink to="/about" title='about-us' onClick={closeMenu}>About</NavLink>
                <div className="btn-wrapper">
                    {currentUser ?
                        <NavLink className="btn" onClick={() => { handleLogout(); closeMenu(); }} title='signout'>Logout</NavLink> :
                        <NavLink className="btn" to="/login" onClick={closeMenu} title='signout'>Log In</NavLink>}
                </div>
            </nav>
            <div className="actions">
                <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
                    {theme === 'dark' ? <LightMode /> : <DarkMode />}
                </button>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <Close /> : <Menu />}
                </button>
            </div>
        </header>
    );
}

export default Navbar1;
