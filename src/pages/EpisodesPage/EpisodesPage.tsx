/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Episode } from '../../models/EpisodeModel';
import disableButton from '../../functions/disableButton';

import SearchInput from '../../components/SearchInput/SearchInput';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';

const EpisodesPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleEpisodes, setVisibleEpisodes] = useState<Episode[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const getEpisodes = async () => {
    try {
      setLoading(true);
      setFetchError(false);
      const response = await axios
        .get(`https://rickandmortyapi.com/api/episode?page=${currentPage}&${searchParams}`);
      setVisibleEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();
    disableButton(buttonPreviousRef, buttonNextRef, currentPage, totalPages);
  }, [currentPage, searchParams]);

  return (
    <div className="app-page-container">

      <SearchInput
        placeholder="Search episode by name..."
        handleChange={(event) => {
          setSearchParams({ name: event.target.value });
          setCurrentPage(1);
        }}
      />

      {loading && (
        <div className="app-flex-justify-center">
          <Loader />
        </div>
      )}

      {fetchError && (
        <ErrorMessage
          message="Sorry, something went wrong! Refresh the page or try again later!"
        />
      )}

      {visibleEpisodes?.length === 0
        ? (<ErrorMessage message="Nothing found!" />)
        : (
          <div className="app-flex-wrap-container">
            {visibleEpisodes && visibleEpisodes.map(({
              id, name, episode, air_date,
            }) => (
              <Card key={id}>
                <img
                  className="card__image"
                  src={`https://picsum.photos/150?random=${id}`}
                  alt={name}
                />
                <p className="card__info-18px">
                  {episode}
                </p>
                <p className="card__info-24px">
                  {name}
                </p>
                <p className="card__info-18px">
                  Air date:
                  <br />
                  {air_date}
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

export default EpisodesPage;
