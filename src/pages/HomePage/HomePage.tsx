import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import Logo from './logo.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img className="home__logo" src={Logo} alt="logo" />
      {/* <h1 className="home__h1"> Rick and Morty </h1> */}
      <h3 className="home__h3"> API BASED DATABASE </h3>
      <div className="home__buttons">
        <button className="home__button" onClick={() => navigate('/characters')}> Search characters </button>
        <button className="home__button" onClick={() => navigate('/episodes')}> Search Episodes </button>
        <button className="home__button" onClick={() => navigate('/locations')}> Search Locations </button>
      </div>
    </div>
  );
};

export default HomePage;
