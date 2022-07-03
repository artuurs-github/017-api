import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Character } from '../../models/CharacterModel';
import disableButton from '../../functions/disableButton';

import SearchInput from '../../components/SearchInput/SearchInput';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';
import './CharactersPage.scss';

const CharactersPage = () => {
  const buttonPreviousRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);

  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const navigate = useNavigate();
  const filterOptions = ['Alive', 'Dead', 'Unknown'];

  const getCharacters = async () => {
    const nameParams = nameFilter === '' ? '' : `&name=${nameFilter}`;
    try {
      setLoading(true);
      setFetchError(false);
      const response = await axios
        .get(`https://rickandmortyapi.com/api/character?page=${currentPage}&${searchParams}${nameParams}`);
      setVisibleCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
    disableButton(buttonPreviousRef, buttonNextRef, currentPage, totalPages);
  }, [currentPage, searchParams, nameFilter]);

  return (
    <div className="app-page-container">

      <SearchInput
        placeholder="Search character by name..."
        handleChange={(event) => {
          setNameFilter(event.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="characters-filters-container">
        <button
          className="app-button"
          onClick={() => {
            setSearchParams('');
            setCurrentPage(1);
          }}
        >
          All
        </button>

        {filterOptions.map((option) => (
          <button
            key={filterOptions.indexOf(option)}
            className="app-button"
            onClick={() => {
              setSearchParams({ status: option });
              setCurrentPage(1);
            }}
          >
            {option}
          </button>
        ))}
      </div>

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

      {visibleCharacters?.length === 0
        ? (<ErrorMessage message="Nothing found!" />)
        : (
          <div className="app-flex-wrap-container">
            {visibleCharacters && visibleCharacters.map(({
              id, name, image, status,
            }) => (
              <Card key={id}>
                <img
                  className="card__image"
                  src={image}
                  alt={name}
                />
                <p className="card__info-24px">
                  {name}
                </p>
                <p className="card__info-18px">
                  Status:
                  {' '}
                  {status}
                </p>
                <button
                  className="app-button"
                  onClick={() => navigate(`/characters/${id}`)}
                >
                  Read more!
                </button>
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

export default CharactersPage;
