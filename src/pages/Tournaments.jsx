import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/tournaments.css';

const tournaments = [
    {
        id: 1,
        game: 'bgmi',
        title: 'BGMI Pro League Season 1',
        date: '2025-08-10 17:00',
        prize: '₹10,00,000',
        entryFee: 'FREE',
        perKill: '₹5',
        teams: '64',
        format: 'Squad TPP',
        map: 'Erangel',
        status: 'Registration Open',
        teamSize: 4,
        type: 'Squad'
    },
    {
        id: 2,
        game: 'cod',
        title: 'COD Mobile Championship',
        date: '2025-08-12 15:00',
        prize: '₹5,00,000',
        entryFee: '₹100',
        perKill: '₹10',
        teams: '32',
        format: '5v5 TDM',
        map: 'Nuketown',
        status: 'Coming Soon',
        teamSize: 5,
        type: '5v5'
    },
    {
        id: 3,
        game: 'valorant',
        title: 'Valorant Premier League',
        date: '2025-07-15 18:00',
        prize: '₹15,00,000',
        entryFee: '₹200',
        perKill: '₹15',
        teams: '16',
        format: '5v5',
        map: 'Haven',
        status: 'Registration Open',
        teamSize: 5,
        type: '5v5'
    },
    {
        id: 4,
        game: 'coc',
        title: 'Clash of Clans World Cup',
        date: '2025-08-08 16:00',
        prize: '₹3,00,000',
        entryFee: '₹50',
        teams: '24',
        format: 'Clan Wars',
        map: 'Home Village',
        status: 'Coming Soon',
        teamSize: 1,
        type: 'Solo'
    }
];

const Tournaments = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString(undefined, options);
    };

    const getTimeRemaining = (dateString) => {
        const now = new Date();
        const endTime = new Date(dateString);
        const timeRemaining = endTime - now;
        
        if (timeRemaining <= 0) {
            return 'Registration Closed';
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
            return `${days} days ${hours} hrs remaining`;
        } else if (hours > 0) {
            return `${hours} hrs ${minutes} mins remaining`;
        } else {
            return `${minutes} minutes remaining`;
        }
    };

    const getRegisteredTeamsCount = (tournamentId) => {
        return registeredPlayers.filter(player => player.tournamentId === tournamentId).length;
    };

    const handleFilterClick = (game) => {
        setActiveFilter(game);
    };

    const handleRegisterClick = (tournament) => {
        setSelectedTournament(tournament);
        setShowRegistrationModal(true);
    };

    const handleLeaderboardClick = (tournament) => {
        setSelectedTournament(tournament);
        setShowLeaderboardModal(true);
    };

    const handleRegistrationSuccess = (formData) => {
        // Add new registration to the list
        setRegisteredPlayers(prev => [...prev, {
            ...formData,
            tournamentId: selectedTournament.id,
            id: Date.now(),
            points: 0,
            kills: 0
        }]);
        setShowRegistrationModal(false);
    };

    const filteredTournaments = tournaments.filter(tournament => 
        activeFilter === 'all' || tournament.game === activeFilter
    );

    return (
        <div className="tournaments-section">
            <h2>Upcoming Tournaments</h2>
            <div className="tournament-filters">
                <button 
                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('all')}
                >
                    All Games
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'bgmi' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('bgmi')}
                >
                    BGMI
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'cod' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('cod')}
                >
                    Call of Duty
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'valorant' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('valorant')}
                >
                    Valorant
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'coc' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('coc')}
                >
                    Clash of Clans
                </button>
            </div>

            <div className="tournaments-grid">
                {filteredTournaments.map(tournament => {
                    const registeredCount = getRegisteredTeamsCount(tournament.id);
                    const totalSpots = parseInt(tournament.teams);
                    const spotsLeft = totalSpots - registeredCount;
                    const progressPercentage = (registeredCount / totalSpots) * 100;
                    const timeRemaining = getTimeRemaining(tournament.date);
                    const isRegistrationClosed = timeRemaining === 'Registration Closed';

                    return (
                        <div key={tournament.id} className="tournament-card" data-game={tournament.game}>
                            <div className="tournament-header">
                                <img src={`/images/${tournament.game}.jpeg`} alt={tournament.game.toUpperCase()} className="game-logo" />
                                <div className="tournament-title">
                                    <h3>{tournament.title}</h3>
                                    <p className="tournament-time">{formatDateTime(tournament.date)}</p>
                                    <p className={`registration-timer ${isRegistrationClosed ? 'closed' : ''}`}>
                                        {timeRemaining}
                                    </p>
                                </div>
                            </div>
                            <div className="tournament-info">
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Prize Pool</span>
                                        <span className="value">{tournament.prize}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Teams</span>
                                        <span className="value">{registeredCount}/{totalSpots}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Format</span>
                                        <span className="value">{tournament.format}</span>
                                    </div>
                                </div>
                                <div className="tournament-details">
                                    <div className="details-row">
                                        <div className="detail-item">
                                            <span className="label">Entry Fee</span>
                                            <span className="value">{tournament.entryFee}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Map</span>
                                            <span className="value">{tournament.map}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Duration</span>
                                            <span className="value">3 Days</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="spots-progress">
                                    <div className="spots-text">
                                        {spotsLeft > 0 ? 
                                            <span>{spotsLeft} Spots Left</span> : 
                                            <span>Tournament Full</span>
                                        }
                                        <span>{registeredCount}/{totalSpots}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                </div>
                                <div className="tournament-actions">
                                    <button 
                                        className="register-btn"
                                        onClick={() => handleRegisterClick(tournament)}
                                        disabled={isRegistrationClosed || spotsLeft === 0}
                                    >
                                        {isRegistrationClosed ? 'Registration Closed' : 
                                         spotsLeft === 0 ? 'Tournament Full' : 'Register Now'}
                                    </button>
                                    <button 
                                        className="leaderboard-btn"
                                        onClick={() => handleLeaderboardClick(tournament)}
                                    >
                                        View Leaderboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && selectedTournament && (
                <RegistrationForm 
                    tournament={selectedTournament} 
                    onClose={() => setShowRegistrationModal(false)}
                    onSuccess={handleRegistrationSuccess}
                />
            )}

            {/* Leaderboard Modal */}
            {showLeaderboardModal && selectedTournament && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setShowLeaderboardModal(false)}>&times;</span>
                        <h2>{selectedTournament.title} Leaderboard</h2>
                        <div className="leaderboard">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Team Name</th>
                                        <th>Player Name</th>
                                        <th>In-Game Name</th>
                                        <th>Points</th>
                                        <th>Kills</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredPlayers
                                        .filter(player => player.tournamentId === selectedTournament.id)
                                        .map((player, index) => (
                                            <tr key={player.id}>
                                                <td>{index + 1}</td>
                                                <td>{player.teamName}</td>
                                                <td>{player.playerName}</td>
                                                <td>{player.playerInGameName}</td>
                                                <td>{player.points}</td>
                                                <td>{player.kills}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const RegistrationForm = ({ tournament, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        teamName: '',
        players: Array(tournament.teamSize).fill({
            name: '',
            email: '',
            inGameName: '',
            phone: ''
        })
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlayerChange = (index, field, value) => {
        const newPlayers = [...formData.players];
        newPlayers[index] = {
            ...newPlayers[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            players: newPlayers
        }));
    };

    const handleTeamNameChange = (e) => {
        setFormData(prev => ({
            ...prev,
            teamName: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Validate form data
            if (!formData.teamName) {
                throw new Error('Team name is required');
            }

            // Validate all players
            formData.players.forEach((player, index) => {
                if (!player.name || !player.email || !player.inGameName || !player.phone) {
                    throw new Error(`Please fill in all details for Player ${index + 1}`);
                }
            });

            // Simulate successful registration
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Call onSuccess with form data
            onSuccess(formData);
            
            // Show success message
            alert('Registration successful! We will contact you soon.');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>×</button>
                <h2>Register for {tournament.name}</h2>
                <p className="team-size-info">Team Size: {tournament.teamSize}v{tournament.teamSize}</p>
                {error && <div className="error-message">{error}</div>}
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Team Name *</label>
                        <input
                            type="text"
                            value={formData.teamName}
                            onChange={handleTeamNameChange}
                            className="form-input"
                            placeholder="Enter your team name"
                            required
                        />
                    </div>

                    <div className="players-section">
                        <h3>Players Information</h3>
                        {formData.players.map((player, index) => (
                            <div key={index} className="player-form">
                                <h4>Player {index + 1}</h4>
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                                        className="form-input"
                                        placeholder="Enter player name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={player.email}
                                        onChange={(e) => handlePlayerChange(index, 'email', e.target.value)}
                                        className="form-input"
                                        placeholder="Enter player email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>In-Game Name *</label>
                                    <input
                                        type="text"
                                        value={player.inGameName}
                                        onChange={(e) => handlePlayerChange(index, 'inGameName', e.target.value)}
                                        className="form-input"
                                        placeholder="Enter in-game name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        value={player.phone}
                                        onChange={(e) => handlePlayerChange(index, 'phone', e.target.value)}
                                        className="form-input"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Tournaments; 