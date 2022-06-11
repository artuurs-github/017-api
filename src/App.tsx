import './App.scss';
import {
  BrowserRouter as Router, Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import EpisodesPage from './pages/EpisodesPage/EpisodesPage';
import LocationsPage from './pages/LocationsPage/LocationsPage';

const App = () => (
  <div className="wrapper">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </div>
);

export default App;
