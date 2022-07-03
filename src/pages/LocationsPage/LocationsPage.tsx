import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { Location } from '../../models/LocationModel';
import disableButton from '../../functions/disableButton';

import SearchInput from '../../components/SearchInput/SearchInput';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';

const LocationsPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleLocations, setVisibleLocations] = useState<Location[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const getLocations = async () => {
    try {
      setLoading(true);
      setFetchError(false);
      const response = await axios
        .get(`https://rickandmortyapi.com/api/location?page=${currentPage}&${searchParams}`);
      setVisibleLocations(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
    disableButton(buttonPreviousRef, buttonNextRef, currentPage, totalPages);
  }, [currentPage, searchParams]);

  return (
    <div className="app-page-container">

      <SearchInput
        placeholder="Search location by name..."
        handleChange={(event) => {
          setSearchParams({ name: event.target.value });
          setCurrentPage(1);
        }}
      />

      {loading && (
        <div>
          <Loader />
        </div>
      )}

      {fetchError && (
        <ErrorMessage
          message="Sorry, something went wrong! Refresh the page or try again later!"
        />
      )}

      {visibleLocations?.length === 0
        ? (<ErrorMessage message="Nothing found!" />)
        : (
          <div className="app-flex-wrap-container">
            {visibleLocations && visibleLocations.map(({
              id, name, type, dimension,
            }) => (
              <Card key={id}>
                <img
                  className="card__image"
                  src={`https://picsum.photos/150?random=${id}&blur=10`}
                  alt={name}
                />
                <p className="card__info-24px">
                  {name}
                </p>
                <p className="card__info-18px">
                  Type:
                  {' '}
                  {type}
                </p>
                <p className="card__info-18px">
                  Dimension:
                  <br />
                  {dimension}
                </p>
              </Card>
            ))}
          </div>
        )}

      <div className="app-pagination-container">
        <button
          className="app-pagination__button"
          onClick={() => setCurrentPage(currentPage - 1)}
          ref={buttonPreviousRef}
        >
          {'<'}
        </button>

        <div className="app-pagination__page">
          {currentPage}
        </div>

        <button
          className="app-pagination__button"
          onClick={() => setCurrentPage(currentPage + 1)}
          ref={buttonNextRef}
        >
          {'>'}
        </button>
      </div>

    </div>
  );
};

export default LocationsPage;
