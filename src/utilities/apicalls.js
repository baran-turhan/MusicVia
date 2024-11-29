import { useEffect, useState } from 'react';
import axios from 'axios';

const useApi = () => {
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [media_types, setMedia] = useState([]);
    const [genres, setGenre] = useState([]);
    
    useEffect(() => {
      axios.get('http://localhost:3001/album')
        .then((response) => {
          setAlbums(response.data);
        })
        .catch((error) => {
          console.error('Album API çağrısında bir hata oluştu:', error);
        });
    }, []);
  
    useEffect(() => {
      axios.get('http://localhost:3001/track')
        .then((response) => {
          setTracks(response.data);
        })
        .catch((error) => {
          console.error('Track API çağrısında bir hata oluştu:', error);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/artist')
          .then((response) => {
            setArtists(response.data);
          })
          .catch((error) => {
            console.error('Track API çağrısında bir hata oluştu:', error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost:3001/media_type')
          .then((response) => {
            setMedia(response.data);
          })
          .catch((error) => {
            console.error('Track API çağrısında bir hata oluştu:', error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost:3001/genre')
          .then((response) => {
            setGenre(response.data);
          })
          .catch((error) => {
            console.error('Track API çağrısında bir hata oluştu:', error);
          });
      }, []);
  
    return { albums, tracks, artists, media_types, genres };
  };
  export default useApi;