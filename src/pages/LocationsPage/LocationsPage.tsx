import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Location } from '../../models/LocationModel';
import './LocationsPage.scss';
import Loader from '../../components/Loader/Loader';

const LocationsPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleLocations, setVisibleLocations] = useState<Location[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [loading, setLoading] = useState(false);

  const handlePagePrevious = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const getLocations = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(`https://rickandmortyapi.com/api/location?page=${currentPage}&${searchParams}`);
      setVisibleLocations(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.log('ERROR!');
    } finally {
      setLoading(false);
      console.log('REQUEST FINALIZED!');
    }
  };

  useEffect(() => {
    getLocations();
  }, [searchParams, currentPage]);

  useEffect(() => {
    if (buttonPreviousRef.current) {
      const buttonPrevious = buttonPreviousRef.current;
      if (currentPage === 1) {
        buttonPrevious.classList.add('off');
      } else {
        buttonPrevious.classList.remove('off');
      }
    }

    if (buttonNextRef.current) {
      const buttonNext = buttonNextRef.current;
      if (currentPage === Number(totalPages)) {
        buttonNext.classList.add('off');
      } else {
        buttonNext.classList.remove('off');
      }
    }
  }, [currentPage]);

  return (
    <div className="locations">
      <div className="input-container">
        <input
          className="locations__input"
          type="text"
          placeholder="Search location by name..."
          onChange={(event) => {
            setSearchParams({ name: event.target.value });
            setCurrentPage(1);
          }}
        />
      </div>

      {loading
        && (
          <div>
            <Loader />
          </div>
        )}

      {visibleLocations?.length === 0
        ? (
          <div className="options__count"> Nothing found! </div>
        )
        : (

          <div className="locations-container">
            {visibleLocations && visibleLocations.map(({
              id, name, type, dimension,
            }) => (
              <div className="locations-card" key={id}>
                <div className="locations-card__name">
                  Name:
                  <br />
                  {name}
                </div>
                <div className="locations-card__type">
                  Type:
                  <br />
                  {type}
                </div>
                <div className="locations-card__dimension">
                  Dimension:
                  <br />
                  {dimension}
                </div>
              </div>
            ))}
          </div>
        )}
      <div className="load-more">
        <button
          className="load-more__button"
          onClick={() => handlePagePrevious()}
          ref={buttonPreviousRef}
        >
          {'<'}
        </button>
        <div className="load-more__page">{currentPage}</div>
        <button
          className="load-more__button"
          onClick={() => handlePageNext()}
          ref={buttonNextRef}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default LocationsPage;
