import React, { useState } from "react";
import axios from "axios";
import useApi from "./apicalls";
import '../styles/albumutils.css';

const AddAlbumForm = () => {
    const { artists, media_types, genres } = useApi();
    const [showForm, setShowForm] = useState(false);

    // Album stateleri
    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [artistName, setArtistName] = useState("");

    // New tracks state
    const [newTracks, setNewTracks] = useState([]);

    const addNewTrackRow = () => {
        setNewTracks([...newTracks, { id: Date.now(), name: "", mediaTypeId: "", genreId: "", composer: "", duration: "", price: "" }]);
    };

    const removeTrackRow = (index) => {
        const updatedTracks = newTracks.filter((_, i) => i !== index);
        setNewTracks(updatedTracks);
    };

    const handleTrackChange = (index, field, value) => {
        const updatedTracks = [...newTracks];
        updatedTracks[index][field] = value;
        setNewTracks(updatedTracks);
    };

    const submitTrack = async (track, albumId) => {
        try {
            const response = await axios.post("http://localhost:3001/track", {
                name: track.name,
                album_id: albumId,
                media_type_id: track.mediaTypeId,
                genre_id: track.genreId,
                composer: track.composer || null,
                duration: track.duration,
                price: track.price,
            });
            console.log(`Track added successfully: ${response.data.track_id}`);
        } catch (err) {
            console.error("Error adding track:", err);
        }
    };

    // album submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create album
            const albumResponse = await axios.post("http://localhost:3001/album", {
                title,
                artist_id: artistId || null,
                artist_name: artistName || null,
            });

            const newAlbumId = albumResponse.data.album_id;
            console.log("Album created with ID:", newAlbumId);

            // Submit all tracks
            if (newTracks.length > 0) {
                for (const track of newTracks) {
                    await submitTrack(track, newAlbumId);
                }
            }

            alert("Album and tracks added successfully");
            setTitle("");
            setArtistId(null);
            setArtistName("");
            setNewTracks([]);
            setShowForm(false);
        } catch (err) {
            console.error("Error adding album:", err);
            alert("Error adding album");
        }
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} className="buton">
                {showForm ? "Close Form" : "Add New Album"}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                    <h3>Add New Album</h3>
                    <label>
                        Title (max 220 chars):
                        <input
                            type="text"
                            maxLength="220"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Artist:
                        <select
                            value={artistId || ""}
                            onChange={(e) => setArtistId(e.target.value)}
                            disabled={artistName}
                        >
                            <option value="">Unknown Artist</option>
                            {artists.map((artist) => (
                                <option key={artist.artist_id} value={artist.artist_id}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Or Add New Artist:
                        <input
                            type="text"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            disabled={artistId}
                        />
                    </label>
                    <br />

                    <h4>Add Tracks</h4>
                    {newTracks.map((track, index) => (
                        <div key={track.id} style={{ marginBottom: "15px", border: "1px solid #ddd", padding: "10px" }}>
                            <label>
                                Track Name:
                                <input
                                    type="text"
                                    value={track.name}
                                    onChange={(e) => handleTrackChange(index, "name", e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Media Type:
                                <select
                                    value={track.mediaTypeId}
                                    onChange={(e) => handleTrackChange(index, "mediaTypeId", e.target.value)}
                                    required
                                >
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
                                <select
                                    value={track.genreId}
                                    onChange={(e) => handleTrackChange(index, "genreId", e.target.value)}
                                    required
                                >
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
                                Composer:
                                <input
                                    type="text"
                                    value={track.composer}
                                    onChange={(e) => handleTrackChange(index, "composer", e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Duration (seconds):
                                <input
                                    type="number"
                                    value={track.duration}
                                    onChange={(e) => handleTrackChange(index, "duration", e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Price (USD):
                                <input
                                    type="number"
                                    step="0.01"
                                    value={track.price}
                                    onChange={(e) => handleTrackChange(index, "price", e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <button type="button" onClick={() => removeTrackRow(index)}>
                                - Remove Track
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewTrackRow}>
                        + Add New Track
                    </button>
                    <br />
                    <button type="submit" className="submit-buton">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddAlbumForm;
