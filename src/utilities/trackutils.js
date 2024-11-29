import React, { useState } from 'react';
import axios from 'axios';
import useApi from './apicalls';
import '../styles/trackutils.css'

const AddNewTrack = () => {
    const { albums, media_types, genres } = useApi();
    const [showForm, setShowForm] = useState(false);

    // Track bilgileri için state
    const [name, setName] = useState('');
    const [albumId, setAlbumId] = useState(0); // Default olarak "Unknown Album"
    const [mediaTypeId, setMediaTypeId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [composer, setComposer] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/track', {
                name,
                album_id: albumId,
                media_type_id: mediaTypeId,
                genre_id: genreId,
                composer,
                duration,
                price,
            });

            alert(response.data.message);
            setName('');
            setAlbumId(0);
            setMediaTypeId('');
            setGenreId('');
            setComposer('');
            setDuration('');
            setPrice('');
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert('Error adding track');
        }
    };

    return (
        <div>
            <button className='buton' onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add New Track'}
            </button>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className='form'>
                    <h3>Add New Track</h3>
                    <label>
                        Track Name (max 220 chars):
                        <input
                            type="text"
                            maxLength="220"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Album:
                        <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
                            <option value={0}>Unknown Album</option>
                            {albums.map((album) => (
                                <option key={album.album_id} value={album.album_id}>
                                    {album.title}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Media Type:
                        <select value={mediaTypeId} onChange={(e) => setMediaTypeId(e.target.value)} required>
                            <option value="">Select Media Type</option>
                            {media_types.map((type) => (
                                <option key={type.media_type_id} value={type.media_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Genre:
                        <select value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
                            <option value="">Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre.genre_id} value={genre.genre_id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Composer (max 220 chars):
                        <input
                            type="text"
                            maxLength="220"
                            value={composer}
                            onChange={(e) => setComposer(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Duration (seconds):
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Price (USD):
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button className='submit-buton' type="submit">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddNewTrack;
