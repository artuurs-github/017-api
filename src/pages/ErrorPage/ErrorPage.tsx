import './ErrorPage.scss';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (

    <div className="error-page-container">
      <h1 className="error__error-text"> 404 :/ </h1>
      <div className="error__wrapper">
        <button
          className="error__button"
          onClick={() => navigate('/')}
        >
          Back to Homepage!
        </button>
      </div>

    </div>

  );
};

export default ErrorPage;
