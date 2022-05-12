import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { User } from '../../models/UserModel';
import './Users.scss';

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const [dataError, setDataError] = useState<string>();
  const navigate = useNavigate();

  // const getUsers = () => {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then((response: AxiosResponse<User[]>) => {
  //     setUsers(response.data);
  //   })
  //     .catch((error) => { // ! Lai noķertu kļūdu pieprasījumā!
  //       console.log(error);
  //     })
  //     .finally(() => { // ! Lai kaut ko darītu, neatkarīgi no tā, vai dati iegūti, vai arī ne.
  //       console.log('Request finalized!');
  //     });
  // };

  // const getUsers = () => {
  //   try {
  //     axios.get('https://jsonplaceholder.typicode.com/users').then((response: AxiosResponse<User[]>) => {
  //       setUsers(response.data);
  //     });
  //   } catch (error) {
  //     console.log('Error!');
  //   } finally {
  //     console.log('Request finalized!');
  //   }
  // };

  const getUsers = async () => { // Sagaidīs, kamēr mainīgais būs pilns ar datiem, pirms setUsers utt.
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      // const qwerty = await...
      // const asdfgh = await...
      setUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setDataError('Nothing to show!');
        } else {
          setDataError(error.message);
        }
      } else {
        setDataError('Not AXIOS error!');
      }
    } finally {
      console.log('Request finalized!');
    }
  };

  useEffect(() => {
    getUsers().then(); // .then(), ja ESLint lamājas.
  }, []);

  return (
    <div className="users">
      <h1> Users! </h1>
      <div>
        {users && users.map(({ id, name /* username */ }) => (
          <div key={id}>
            <div>
              ID:
              {' '}
              {id}
            </div>
            <div>
              NAME:
              {' '}
              {name}
            </div>
            {/* <div>
              USERNAME:
              {' '}
              {username}
            </div> */}
            <button onClick={() => navigate(`/users/${id}`)}>
              Read more!
            </button>
          </div>
        ))}
      </div>
      {dataError && <span>{dataError}</span>}
    </div>
  );
};

export default Users;
