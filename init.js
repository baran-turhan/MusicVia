const app = require('./api');
const client = require('./base');

client.connect()
  .then(() => {
    console.log("Connected to database");
    app.listen(3001, () => console.log("Server running on port 3001"));
  })
  .catch(err => console.error("Database connection error:", err));