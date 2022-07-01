import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import Logo from '../../assets/images/logo.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img className="home__logo" src={Logo} alt="logo" />
      <h3 className="home__h3"> DATABASE </h3>
      <div className="home__buttons">
        <button className="home__button" onClick={() => navigate('/characters')}> Search characters </button>
        <button className="home__button" onClick={() => navigate('/episodes')}> Search Episodes </button>
        <button className="home__button" onClick={() => navigate('/locations')}> Search Locations </button>
      </div>
    </div>
  );
};

export default HomePage;
