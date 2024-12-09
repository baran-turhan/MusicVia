import React from 'react';
import '../styles/home.css';
import logo from '../assets/plak-foto.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <p>
            Welcome to musicVia.<br/> Next-gen music experience.<br/>
          </p>
          <a
            className="github-link"
            href="https://github.com/baran-turhan/Project-One"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to my GitHub repo. evet
          </a>
        <br/> 
        <Link to="/albums">
            <button className="album-button">Albums</button>
        </Link>
        <br />
        <Link to="/tracks">
            <button className="tracks-button">Tracks</button>
        </Link>
        </header>

      </div>
      
    );
};

export default Home;
