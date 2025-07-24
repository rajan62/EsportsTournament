import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/layout.css';

const Layout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="app-container">
            <header className="header">
                <nav className="nav">
                    <Link to="/" className="logo">Tournament Platform</Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/tournaments">Tournaments</Link>
                        {isAuthenticated && <Link to="/profile">Profile</Link>}
                        <Link to="/contact">Contact</Link>
                        <div className="auth-buttons">
                            {isAuthenticated ? (
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            ) : (
                                <Link to="/login" className="login-btn">Login</Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <Link to="/">Home</Link>
                        <Link to="/tournaments">Tournaments</Link>
                        {isAuthenticated && <Link to="/profile">Profile</Link>}
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="footer-section">
                        <h3>Games</h3>
                        <Link to="/tournaments?game=bgmi">BGMI</Link>
                        <Link to="/tournaments?game=cod">Call of Duty</Link>
                        <Link to="/tournaments?game=valorant">Valorant</Link>
                        <Link to="/tournaments?game=coc">Clash of Clans</Link>
                    </div>
                    <div className="footer-section">
                        <h3>Connect With Us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-discord"></i></a>
                        </div>
                    </div>
                </div>
                <p className="copyright">&copy; 2025 Tournament Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout; 