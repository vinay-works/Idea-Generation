import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import AddIdea from './AddIdea';
import Browse from './Browse';
import Vote from './Vote';
import Votings from './Votings';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addidea" element={<AddIdea />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/votings" element={<Votings />} />
    </Routes>
  )
}

export default App;
