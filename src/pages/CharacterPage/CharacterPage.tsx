import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../models/CharacterModel';
import Loader from '../../components/Loader/Loader';
import './CharacterPage.scss';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacter = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCharacter().then();
    }
  }, []);

  return (
    <div>
      {loading && (
        <Loader />
      )}

      {character && (
        <div className="character-card">
          <img className="this-character-card__image" src={character.image} alt="character" />
          <p>
            Name:
            {' '}
            {character.name}
          </p>
          <p>
            Status:
            {' '}
            {character.status}
          </p>
          <p>
            Species:
            {' '}
            {character.species}
          </p>
          <p>
            Gender:
            {' '}
            {character.gender}
          </p>
          <p>
            Origin:
            {' '}
            {character.origin.name}
          </p>
          <p>
            Location:
            {' '}
            {character.location.name}
          </p>
        </div>
      )}
    </div>

  );
};

export default CharacterPage;
