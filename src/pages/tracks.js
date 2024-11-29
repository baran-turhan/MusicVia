import React, { useState } from 'react';
import useApi from '../utilities/apicalls';
import AddTrackForm from '../utilities/trackutils';
import '../styles/tracks.css';

const Tracks = () => {
  const { tracks, albums, genres, artists } = useApi();

  // Stateler
  const [filter, setFilter] = useState({
    albumId: null, 
    genreId: '',
    minPrice: '',
    maxPrice: '',
    minLength: '',
    maxLength: '',
  });

  const getArtistName = (artistID) => {
    const artist = artists.find((a) => a.artist_id === artistID);
    return artist ? artist.name : 'Unknown Artist';
  };

  const getAlbumName = (albumId) => {
    const album = albums.find((a) => a.album_id === albumId);
    return album ? album.title : 'Unknown Album';
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.genre_id === genreId);
    return genre ? genre.name : 'Unknown Genre';
  };

  // Form'dan Değer Alımı
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  // Filtreler
  const filteredTracks = tracks.filter((track) => {
    const matchesAlbum = filter.albumId ? track.album_id === filter.albumId : true;
    const matchesGenre = filter.genreId ? track.genre_id === parseInt(filter.genreId) : true;

    const matchesPrice =
      (!filter.minPrice || track.unit_price >= parseFloat(filter.minPrice)) &&
      (!filter.maxPrice || track.unit_price <= parseFloat(filter.maxPrice));

    const matchesLength =
      (!filter.minLength || track.milliseconds / 1000 >= parseInt(filter.minLength)) &&
      (!filter.maxLength || track.milliseconds / 1000 <= parseInt(filter.maxLength));

    return matchesAlbum && matchesGenre && matchesPrice && matchesLength;
  });

  const resetFilters = () => {
    setFilter({
      albumId: null,
      genreId: '',
      minPrice: '',
      maxPrice: '',
      minLength: '',
      maxLength: '',
    });
  };

  return (
    <div className='general'>
      <h1>Tracks List</h1>

      <div>
        <AddTrackForm />
      </div>

      {/* Filtreleme Formu */}
      <div style={{ marginBottom: '20px', display: 'grid', justifyContent: 'center' }}>
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <h3>Filter Tracks</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Genre:</label>
            <select
              name="genreId"
              value={filter.genreId}
              onChange={handleInputChange}
              style={{ padding: '5px' }}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.genre_id} value={genre.genre_id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={filter.minPrice}
              onChange={handleInputChange}
              step="0.01"
              style={{ padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handleInputChange}
              step="0.01"
              style={{ padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Min Length (seconds):</label>
            <input
              type="number"
              name="minLength"
              value={filter.minLength}
              onChange={handleInputChange}
              style={{ padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Max Length (seconds):</label>
            <input
              type="number"
              name="maxLength"
              value={filter.maxLength}
              onChange={handleInputChange}
              style={{ padding: '5px' }}
            />
          </div>

          <button
            className='show-all'
            onClick={resetFilters}
          >
            Show All Tracks
          </button>
        </form>
      </div>

      {/* Tablo */}
      <table border="1" className='tablo'>
        <thead>
          <tr>
            <th>Track</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Composer</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredTracks.map((track) => (
            <tr key={track.track_id}>
              <td>{track.name}</td>
              <td>
                {/* Albüm Tıklanabilir */}
                <button
                  className='albumler'
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      albumId: track.album_id,
                      genreId: '',
                    }))
                  }
                >
                  {getAlbumName(track.album_id)}
                </button>
              </td>
              <td>{getArtistName(albums.find((a) => a.album_id === track.album_id)?.artist_id)}</td>
              <td>{track.composer || 'Unknown composer'}</td>
              <td>
                {/* Genre Tıklanabilir */}
                <button
                  className='genreler'
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      genreId: track.genre_id.toString(),
                      albumId: null,
                    }))
                  }
                >
                  {getGenreName(track.genre_id)}
                </button>
              </td>
              <td>
                {Math.floor(track.milliseconds / 60000)}:
                {String(Math.floor((track.milliseconds % 60000) / 1000)).padStart(2, '0')}
              </td>
              <td>${track.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tracks;
