
# API Documentation

This documentation provides details on the API endpoints for managing tracks, albums, artists, media types, and genres in a music-related database.

---

## Base URL

```
http://localhost:3001
```

---

## Endpoints

### **1. Get All Tracks**
- **Endpoint:** `/track`
- **Method:** `GET`
- **Description:** Fetches all tracks from the database.
- **Response:**
  - **200 OK:** Returns an array of track objects.
  - **500 Internal Server Error:** If there is a server error during the fetch.

#### Example Request:
```http
GET /track
```

#### Example Response:
```json
[
  {
    "track_id": 1,
    "name": "Track Name",
    "album_id": 1,
    "media_type_id": 1,
    "genre_id": 1,
    "composer": "Composer Name",
    "milliseconds": 215000,
    "bytes": 1024000,
    "unit_price": 0.99
  }
]
```

---

### **2. Add a Track**
- **Endpoint:** `/track`
- **Method:** `POST`
- **Description:** Adds a new track to the database.
- **Request Body:** JSON object with track details.
  - **name** (string, required): Name of the track.
  - **album_id** (integer, optional): ID of the album.
  - **media_type_id** (integer, required): ID of the media type.
  - **genre_id** (integer, required): ID of the genre.
  - **composer** (string, optional): Name of the composer.
  - **duration** (integer, required): Duration in seconds.
  - **price** (float, required): Unit price of the track.

- **Response:**
  - **200 OK:** Returns a success message, new track ID, and random bytes value.
  - **500 Internal Server Error:** If there is an error during insertion.

#### Example Request:
```http
POST /track
Content-Type: application/json

{
  "name": "New Track",
  "album_id": 2,
  "media_type_id": 1,
  "genre_id": 3,
  "composer": "John Doe",
  "duration": 240,
  "price": 1.29
}
```

#### Example Response:
```json
{
  "message": "Track added successfully",
  "track_id": 101,
  "bytes": 1920000
}
```

---

### **3. Get All Albums**
- **Endpoint:** `/album`
- **Method:** `GET`
- **Description:** Fetches all albums from the database.
- **Response:**
  - **200 OK:** Returns an array of album objects.
  - **500 Internal Server Error:** If there is a server error during the fetch.

#### Example Request:
```http
GET /album
```

#### Example Response:
```json
[
  {
    "album_id": 1,
    "title": "Album Title",
    "artist_id": 1
  }
]
```

---

### **4. Add an Album**
- **Endpoint:** `/album`
- **Method:** `POST`
- **Description:** Adds a new album to the database. If `artist_id` is not provided, a new artist can be added using `artist_name`.
- **Request Body:** JSON object with album details.
  - **title** (string, required): Title of the album.
  - **artist_id** (integer, optional): ID of the artist.
  - **artist_name** (string, optional): Name of the artist (required if `artist_id` is not provided).

- **Response:**
  - **200 OK:** Returns a success message and new album ID.
  - **500 Internal Server Error:** If there is an error during insertion.

#### Example Request:
```http
POST /album
Content-Type: application/json

{
  "title": "New Album",
  "artist_name": "New Artist"
}
```

#### Example Response:
```json
{
  "message": "Album added successfully",
  "album_id": 55
}
```

---

### **5. Get All Artists**
- **Endpoint:** `/artist`
- **Method:** `GET`
- **Description:** Fetches all artists from the database.
- **Response:**
  - **200 OK:** Returns an array of artist objects.
  - **500 Internal Server Error:** If there is a server error during the fetch.

#### Example Request:
```http
GET /artist
```

#### Example Response:
```json
[
  {
    "artist_id": 1,
    "name": "Artist Name"
  }
]
```

---

### **6. Get All Media Types**
- **Endpoint:** `/media_type`
- **Method:** `GET`
- **Description:** Fetches all media types from the database.
- **Response:**
  - **200 OK:** Returns an array of media type objects.
  - **500 Internal Server Error:** If there is a server error during the fetch.

#### Example Request:
```http
GET /media_type
```

#### Example Response:
```json
[
  {
    "media_type_id": 1,
    "name": "Media Type Name"
  }
]
```

---

### **7. Get All Genres**
- **Endpoint:** `/genre`
- **Method:** `GET`
- **Description:** Fetches all genres from the database.
- **Response:**
  - **200 OK:** Returns an array of genre objects.
  - **500 Internal Server Error:** If there is a server error during the fetch.

#### Example Request:
```http
GET /genre
```

#### Example Response:
```json
[
  {
    "genre_id": 1,
    "name": "Genre Name"
  }
]
```

---

## Error Handling
- **500 Internal Server Error:** All endpoints log errors on the server side and return the error message to the client for debugging.

---

## Database Connection Management
- Database connections are closed when the server exits.

## Notes
- Ensure the database is set up correctly with tables for `track`, `album`, `artist`, `media_type`, and `genre`.
- Required fields must be validated on the client-side to avoid errors during insertion.
