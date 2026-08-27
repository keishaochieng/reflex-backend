const db = require('./db');

db.run(
  `INSERT INTO Rider (name, phone, availability, created_at) VALUES (?, ?, ?, ?)`,
  ['Jane Doe', '0712345678', 'available', new Date().toISOString()],
  function(err) {
    if (err) return console.error(err);
    console.log('Rider created with ID:', this.lastID);
  }
);