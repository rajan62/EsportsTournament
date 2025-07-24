import { Link } from 'react-router-dom';
import '../styles/pages/home.css';

const Home = () => {
  const games = [
    {
      id: 1,
      name: 'BGMI',
      image: 'public/images/bgmi.jpeg',
      description: 'Battle Royale mobile game with intense action and strategy.',
      tournaments: 12
    },
    {
      id: 2,
      name: 'Call of Duty',
      image: 'public/images/cod.webp',
      description: 'First-person shooter with various game modes and maps.',
      tournaments: 8
    },
    {
      id: 3,
      name: 'Valorant',
      image: '/images/valorant.jpg',
      description: 'Tactical shooter with unique agent abilities and team play.',
      tournaments: 15
    },
    {
      id: 4,
      name: 'Clash of Clans',
      image: 'public/images/coc.jpeg',
      description: 'Strategy game with base building and clan wars.',
      tournaments: 10
    }
  ];

  const features = [
    {
      title: 'Easy Registration',
      description: 'Quick and simple tournament registration process',
      icon: 'fas fa-user-plus'
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant notifications about your matches',
      icon: 'fas fa-bell'
    },
    {
      title: 'Global Community',
      description: 'Connect with players from around the world',
      icon: 'fas fa-globe'
    },
    {
      title: 'Secure Platform',
      description: 'Safe and fair gaming environment',
      icon: 'fas fa-shield-alt'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Tournament Platform</h1>
          <p>Join exciting tournaments and compete with the best players</p>
          <Link to="/tournaments" className="cta-button">View Tournaments</Link>
        </div>
      </section>

      <section className="games-section">
        <h2>Popular Games</h2>
        <div className="games-grid">
          {games.map(game => (
            <Link to={`/tournaments?game=${game.name.toLowerCase()}`} key={game.id} className="game-card">
              <div className="game-image">
                <img src={game.image} alt={game.name} />
              </div>
              <div className="game-info">
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                {/* <span className="tournament-count">{game.tournaments} Tournaments</span> */}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 