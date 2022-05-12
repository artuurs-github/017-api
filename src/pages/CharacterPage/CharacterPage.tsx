import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../models/CharacterModel';
import './CharacterPage.scss';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
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
      {character
      && (
        <div className="character">
          <img className="character__image" src={character.image} alt="character" />
          <div>
            Name:
            {' '}
            {character.name}
          </div>
          <div>
            Status:
            {' '}
            {character.status}
          </div>
          <div>
            Species:
            {' '}
            {character.species}
          </div>
          <div>
            Gender:
            {' '}
            {character.gender}
          </div>
          <div>
            Origin:
            {' '}
            {character.origin.name}
          </div>
          <div>
            Location:
            {' '}
            {character.location.name}
          </div>
        </div>
      )}
      {loading
      && (
      <div>
        <Loader />
      </div>
      )}
    </div>

  );
};

export default CharacterPage;
