import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { User } from '../../models/UserModel';
import './SingleUser.scss';

const SingleUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser().then();
    }
  }, []);

  return (
    <div className="singleuser">
      {user
      && (
      <div>
        Username:
        {' '}
        {user.username}
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

export default SingleUser;
