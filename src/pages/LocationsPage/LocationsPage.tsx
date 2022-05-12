import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Location } from '../../models/LocationModel';
import './LocationsPage.scss';

const LocationsPage = () => {
  const [visibleLocations, setVisibleLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const getLocations = async () => {
    try {
      const tempResponse1 = await axios.get('https://rickandmortyapi.com/api/location?page=1');
      const tempResponse2 = await axios.get('https://rickandmortyapi.com/api/location?page=2');
      const tempResponse3 = await axios.get('https://rickandmortyapi.com/api/location?page=3');
      const tempResponse4 = await axios.get('https://rickandmortyapi.com/api/location?page=4');
      const tempResponse5 = await axios.get('https://rickandmortyapi.com/api/location?page=5');
      const tempResponse6 = await axios.get('https://rickandmortyapi.com/api/location?page=6');
      const tempResponse7 = await axios.get('https://rickandmortyapi.com/api/location?page=7');
      const response = [
        ...tempResponse1.data.results,
        ...tempResponse2.data.results,
        ...tempResponse3.data.results,
        ...tempResponse4.data.results,
        ...tempResponse5.data.results,
        ...tempResponse6.data.results,
        ...tempResponse7.data.results,
      ];
      if (inputValue === '') {
        setVisibleLocations(response);
      } else {
        setVisibleLocations(response.filter((location: any) => location.name
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
    getLocations().then();
  }, [inputValue]);

  return (
    <div className="locations">
      <div className="input-container">
        <input
          className="locations__input"
          type="text"
          placeholder="Search location by name..."
          onChange={(event) => { setInputValue(event.target.value); }}
        />
      </div>

      <div className="locations__options">
        <div className="options__count">
          {visibleLocations?.length}
          {' '}
          locations found
        </div>
      </div>

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
    </div>
  );
};

export default LocationsPage;
