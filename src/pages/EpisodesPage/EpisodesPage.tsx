/* eslint-disable camelcase */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Episode } from '../../models/EpisodeModel';
import './EpisodesPage.scss';
import Loader from '../../components/Loader/Loader';

const EpisodesPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleEpisodes, setVisibleEpisodes] = useState<Episode[]>();
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

  const getEpisodes = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(`https://rickandmortyapi.com/api/episode?page=${currentPage}&${searchParams}`);
      setVisibleEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.log('ERROR!');
    } finally {
      setLoading(false);
      console.log('REQUEST FINALIZED!');
    }
  };

  useEffect(() => {
    getEpisodes();
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
    <div className="episodes">
      <div className="input-container">
        <input
          className="episodes__input"
          type="text"
          placeholder="Search episode by name..."
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

      {visibleEpisodes?.length === 0
        ? (
          <div className="options__count"> Nothing found! </div>
        )
        : (

          <div className="episodes-container">
            {visibleEpisodes && visibleEpisodes.map(({
              id, name, episode, air_date,
            }) => (
              <div className="episode-card" key={id}>
                <div className="episode-card__episode">
                  {episode}
                </div>
                <div className="episode-card__name">
                  {name}
                </div>
                <div className="episode-card__air-date">
                  Air date:
                  <br />
                  {air_date}
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

export default EpisodesPage;
