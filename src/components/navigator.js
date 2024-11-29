import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navigator.css'

const Navigator = () => {
  return (
    <nav>
      <ul className='navigator'>
        <li>
          <Link to="./" className='link'>
            Home
          </Link>
        </li>
        <li>
          <Link to="./tracks" className='link'>
            Tracks
          </Link>
        </li>
        <li>
          <Link to="./albums" className='link'>
            Albums
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigator;
