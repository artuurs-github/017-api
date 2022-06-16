import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Character } from '../../models/CharacterModel';
// import styles from './CharactersPage.module.scss';
import './CharactersPage.scss';

const CharactersPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<string>();
  const [nameFilter, setNameFilter] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');

  const navigate = useNavigate();

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

  const getCharacters = async () => {
    const nameParams = nameFilter === '' ? '' : `&name=${nameFilter}`;
    try {
      const response = await axios
        .get(`https://rickandmortyapi.com/api/character?page=${currentPage}&${searchParams}${nameParams}`);
      setVisibleCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.log('ERROR!');
    } finally {
      console.log('REQUEST FINALIZED!');
    }
  };

  useEffect(() => {
    getCharacters();
    console.log(currentPage, totalPages);
  }, [searchParams, nameFilter, currentPage]);

  useEffect(() => {
    if (buttonPreviousRef.current && buttonNextRef.current) {
      const buttonPrevious = buttonPreviousRef.current;
      const buttonNext = buttonNextRef.current;
      if (currentPage === 1) {
        buttonPrevious.classList.add('off');
      } else {
        buttonPrevious.classList.remove('off');
      }

      if (currentPage === Number(totalPages)) {
        buttonNext.classList.add('off');
      } else {
        buttonNext.classList.remove('off');
      }
    }
  }, [currentPage]);

  return (
    <div className="characters">
      <div className="input-container">
        <input
          className="characters__input"
          type="text"
          placeholder="Search character by name..."
          onChange={(event) => {
            setNameFilter(event.target.value);
            setCurrentPage(1);
          }}
        // onChange={(event) => { setSearchParams({ name: event.target.value }); }}
        />
      </div>

      <div className="characters__options">
        <div className="options__buttons">
          <button
            className="character-card__button"
            onClick={() => {
              setSearchParams('');
              setCurrentPage(1);
            }}
          >
            All
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setSearchParams({ status: 'alive' });
              setCurrentPage(1);
            }}
          >
            Alive
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setSearchParams({ status: 'dead' });
              setCurrentPage(1);
            }}
          >
            Dead
          </button>
          <button
            className="character-card__button"
            onClick={() => {
              setSearchParams({ status: 'unknown' });
              setCurrentPage(1);
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

export default CharactersPage;
