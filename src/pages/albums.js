import React, { useState } from 'react';
import useApi from '../utilities/apicalls.js';
import AddAlbumForm from '../utilities/albumutils..js';
import '../styles/albums.css'

const Albums = () => {
  const { albums, artists, tracks, genres} = useApi();
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const getArtistName = (artistID) => {
    const artist = artists.find((a) => a.artist_id === artistID);
    return artist ? artist.name : 'Unknown Artist';
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.genre_id === genreId);
    return genre ? genre.name : 'Unknown Genre';
  };

  const getTracksForAlbum = (albumId) => {
    return tracks.filter((track) => track.album_id === albumId);
  };
  const handleAlbumSelect = (albumId) => {
    setSelectedAlbumId(albumId);
    const album = albums.find((a) => a.album_id === albumId);
    if (album) {
      setSelectedArtistId(album.artist_id);
    }
  };

  return (
    <div className='general'>
      <h1>Albums List</h1>
      <div>
            <AddAlbumForm />
        </div>
      {selectedAlbumId ? (
        <div>
          <button onClick={() => setSelectedAlbumId(null)} className='show-all'>
            Back to All Albums
          </button>
          <h2>Tracks in Album: <br/>
          {albums.find((a) => a.album_id === selectedAlbumId)?.title} <br/><br/>
          From: {getArtistName(selectedArtistId)}</h2>
          <table border="1" className='tablo'>
            <thead>
              <tr>
                <th>Track Name</th>
                <th>Composer</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {getTracksForAlbum(selectedAlbumId).map((track) => (
                <tr key={track.track_id}>
                  <td>{track.name}</td>
                  <td>{track.composer || 'Unknown Composer'}</td>
                  <td>{getGenreName(track.genre_id)}</td>
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
      ) : (
        <table border="1" className='tablo'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.album_id}>
                <td>
                  <button onClick={() => handleAlbumSelect(album.album_id)} className='albumler'>
                    {album.title}
                  </button>
                </td>
                <td>{getArtistName(album.artist_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Albums;
