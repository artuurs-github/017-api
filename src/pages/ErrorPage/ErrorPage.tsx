import './ErrorPage.scss';
import { useRef } from 'react';
import ErrorImg from './ErrorImg.png';

const ErrorPage = () => {
  const divElementRef = useRef<HTMLDivElement | null>(null);
  const imgElementRef = useRef<HTMLImageElement | null>(null);
  const errorButtonHandler = () => {
    if (divElementRef.current && imgElementRef.current) {
      const divElement = divElementRef.current;
      const imgElement = imgElementRef.current;
      divElement.classList.add('hidden');
      imgElement.classList.remove('hidden');
    }
  };

  return (

    <div className="error">
      <h1 className="error__error"> 404 :/ </h1>
      <div className="error__wrapper" ref={divElementRef}>
        <button
          className="error__button"
          onClick={errorButtonHandler}
        >
          Back to Characters page!
        </button>
      </div>
      <img
        className="error__img hidden"
        ref={imgElementRef}
        src={ErrorImg}
        alt="404"
      />

    </div>

  );
};

export default ErrorPage;
