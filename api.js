const express = require('express');
const client = require('./base.js');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// getting all tracks
app.get('/track', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM track`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching Error");
    }
});

// adding a track
app.post('/track', async (req, res) => {
    const { name, album_id, media_type_id, genre_id, composer, duration, price } = req.body;

    try {
        // Yeni track ID'sini belirle
        const trackResult = await client.query(`SELECT MAX(track_id) as max_id FROM track`);
        const maxTrackId = trackResult.rows[0].max_id || 0; // Eğer NULL ise 0 olarak kabul et
        const newTrackId = maxTrackId + 1;

        // 0 ile 30.000.000 arasında rastgele bir değer üret
        const randomBytes = Math.floor(Math.random() * 2000000 +1); // 0 ile 20.000.000 dahil

        // Track ekleme sorgusu
        const insertQuery = `
            INSERT INTO track (track_id, name, album_id, media_type_id, genre_id, composer, milliseconds, bytes, unit_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

        // Sorguyu çalıştır
        await client.query(insertQuery, [
            newTrackId,
            name,
            album_id || null, // Albüm ID verilmemişse Unknown album
            media_type_id,
            genre_id,
            composer || null, // Composer verilmemişse null
            duration * 1000, // Saniyeyi milisaniyeye çevir
            randomBytes, // Rastgele byte değeri
            price,
        ]);

        res.json({ message: 'Track added successfully', track_id: newTrackId, bytes: randomBytes });
    } catch (err) {
        console.error("Error inserting track:", err); // Hatanın detayını loglar
        res.status(500).send("Error adding track: " + err.message); // Hata mesajını client'a gönderir
    }    
});


// getting all albums
app.get('/album', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM album`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching Error");
    }
});

// adding an album
app.post('/album', async (req, res) => {
    const { title, artist_id, artist_name } = req.body;

    try {
        // Yeni albüm ID'sini belirle
        const albumResult = await client.query(`SELECT MAX(album_id) as max_id FROM album`);
        const maxAlbumId = albumResult.rows[0]?.max_id ?? 0; // Eğer NULL ise 0 kabul et
        const newAlbumId = maxAlbumId + 1;

        let finalArtistId = artist_id;

        // Eğer artist_id gönderilmemişse ve artist_name mevcutsa, yeni bir sanatçı oluştur
        if (!artist_id && artist_name) {
            const artistResult = await client.query(`SELECT MAX(artist_id) as max_id FROM artist`);
            const maxArtistId = artistResult.rows[0]?.max_id ?? 0;
            const newArtistId = maxArtistId + 1;

            await client.query(`INSERT INTO artist (artist_id, name) VALUES ($1, $2)`, [
                newArtistId,
                artist_name,
            ]);
            console.log("New artist added with ID:", newArtistId);

            finalArtistId = newArtistId;
        }

        // Albümü oluştur
        console.log("Adding new album with ID:", newAlbumId);
        await client.query(
            `INSERT INTO album (album_id, title, artist_id) VALUES ($1, $2, $3)`,
            [newAlbumId, title, finalArtistId]
        );
        console.log("Album added successfully");

        // Başarıyla albüm oluşturulduğu bilgisini döndür
        res.json({ message: 'Album added successfully', album_id: newAlbumId });
    } catch (err) {
        console.error("Error adding album:", err);
        res.status(500).send("Error adding album: " + err.message);
    }
});



app.get('/artist', async (req,res) => {
    try {
        const result = await client.query(`SELECT * FROM artist`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching Error");
    }
});

app.get('/media_type', async (req,res) => {
    try {
        const result = await client.query(`SELECT * FROM media_type`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching Error");
    }
});

app.get('/genre', async (req,res) => {
    try {
        const result = await client.query(`SELECT * FROM genre`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching Error");
    }
});


module.exports = app;
process.on('exit', () => {
    client.end();
    console.log("Database connection closed.");
});