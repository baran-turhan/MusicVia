import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigator from './components/navigator.js';
import Home from './pages/home.js';
import Albums from './pages/albums.js';
import Tracks from './pages/tracks.js';



function App() {
  return (
    <Router>
      <Navigator />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/tracks" element={<Tracks />} />
            </Routes>
        </Router>
  );
}

export default App;
