import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError('Failed to load profile information');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>
            <div className="profile-content">
                <div className="profile-avatar">
                    <div className="avatar">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Username</label>
                        <span>{user?.name || 'Not available'}</span>
                    </div>
                    <div className="info-item">
                        <label>Email</label>
                        <span>{user?.email || 'Not available'}</span>
                    </div>
                    <div className="info-item">
                        <label>Member Since</label>
                        <span>
                            {user?.createdAt 
                                ? new Date(user.createdAt).toLocaleDateString() 
                                : 'Not available'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="profile-stats">
                <div className="stat-card">
                    <h3>Tournaments Joined</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Wins</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Rank</h3>
                    <p>Newbie</p>
                </div>
            </div>
            <div className="profile-actions">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default Profile; 