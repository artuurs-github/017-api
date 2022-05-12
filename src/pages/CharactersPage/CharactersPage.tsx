import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Character } from '../../models/CharacterModel';
import './CharactersPage.scss';

const CharactersPage = () => {
  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const navigate = useNavigate();

  const getCharacters = async () => {
    try {
      const tempResponse1 = await axios.get(`https://rickandmortyapi.com/api/character?page=1&${activeFilter}`);
      const tempResponse2 = await axios.get(`https://rickandmortyapi.com/api/character?page=2&${activeFilter}`);
      const tempResponse3 = await axios.get(`https://rickandmortyapi.com/api/character?page=3&${activeFilter}`);
      const tempResponse4 = await axios.get(`https://rickandmortyapi.com/api/character?page=4&${activeFilter}`);
      const tempResponse5 = await axios.get(`https://rickandmortyapi.com/api/character?page=5&${activeFilter}`);
      const response = [
        ...tempResponse1.data.results,
        ...tempResponse2.data.results,
        ...tempResponse3.data.results,
        ...tempResponse4.data.results,
        ...tempResponse5.data.results,
      ];
      if (inputValue === '') {
        setVisibleCharacters(response);
      } else {
        setVisibleCharacters(response.filter((character: any) => character.name
          .toLowerCase()
          .includes(inputValue.toLowerCase())));
      }
      console.log(response);
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
    getCharacters();
  }, [activeFilter, inputValue]);

  return (
    <div className="characters">
      <div className="input-container">
        <input
          className="characters__input"
          type="text"
          placeholder="Search character by name..."
          onChange={(event) => { setInputValue(event.target.value); }}
        />
      </div>

      <div className="characters__options">
        <div className="options__count">
          {visibleCharacters?.length}
          {' '}
          characters found
        </div>
        <div className="options__buttons">
          <button
            className="character-card__button"
            onClick={() => {
              setActiveFilter('');
            }}
          >
            All
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setActiveFilter('status=alive');
            }}
          >
            Alive
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setActiveFilter('status=dead');
            }}
          >
            Dead
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setActiveFilter('status=unknown');
            }}
          >
            Unknown
          </button>

        </div>
      </div>

      {visibleCharacters?.length === 0
        ? (
          <div className="count"> Nothing found! </div>
        )
        : (

          <div className="characters-container">
            {visibleCharacters && visibleCharacters.map(({
              id, name, image, status,
            }) => (
              <div className="character-card" key={id}>
                <div>
                  <img className="character-card__image" src={image} alt="character" />
                </div>
                <div className="character-card__name">
                  <span className="character-card__name">{name}</span>
                  <br />
                  <span className="character-card__status">
                    Status:
                    {' '}
                    {status}
                  </span>
                </div>
                <div>
                  <button
                    className="character-card__button"
                    onClick={() => navigate(`/characters/${id}`)}
                  >
                    Read more!
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default CharactersPage;
