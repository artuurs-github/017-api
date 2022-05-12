/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Episode } from '../../models/EpisodeModel'; // ! ŠO!
import './EpisodesPage.scss';

const EpisodesPage = () => {
  const [visibleEpisodes, setVisibleEpisodes] = useState<Episode[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  let response: any = [];

  const getEpisodes = async () => {
    try {
      const tempResponse = await axios.get(`https://rickandmortyapi.com/api/episode?page=${currentPage}`);
      response = [...response, ...tempResponse.data.results];
      if (tempResponse.data.info.next) {
        setCurrentPage(currentPage + 1);
      } else {
        console.log('All requests finalized');
      }
      if (inputValue === '') {
        setVisibleEpisodes(response);
      } else {
        setVisibleEpisodes(response.filter((episode: any) => episode.name
          .toLowerCase()
          .includes(inputValue.toLowerCase())));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setErrorMessage('Nothing to show!');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('Not AXIOS error!');
      }
    } finally {
      console.log('Request finalized!');
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [inputValue, currentPage]);

  return (
    <div className="episodes">
      <div className="input-container">
        <input
          className="episodes__input"
          type="text"
          placeholder="Search episode by name..."
          onChange={(event) => { setInputValue(event.target.value); }}
        />
      </div>

      <div className="episodes__options">
        <div className="options__count">
          {visibleEpisodes?.length}
          {' '}
          episodes found
        </div>
      </div>

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
    </div>
  );
};

export default EpisodesPage;
