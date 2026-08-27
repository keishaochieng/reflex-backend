const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reflex.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Retailer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    created_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Rider (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    availability TEXT,
    current_lat REAL,
    current_lng REAL,
    created_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS DeliveryRequest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    retailer_id INTEGER,
    customer_name TEXT,
    customer_phone TEXT,
    address TEXT,
    item_description TEXT,
    notes TEXT,
    current_status TEXT DEFAULT 'Pending',
    assigned_rider_id INTEGER,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (retailer_id) REFERENCES Retailer(id),
    FOREIGN KEY (assigned_rider_id) REFERENCES Rider(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS StatusEvent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    delivery_id INTEGER,
    status TEXT,
    timestamp TEXT,
    updated_by INTEGER,
    FOREIGN KEY (delivery_id) REFERENCES DeliveryRequest(id)
  )`);

  console.log('All tables created successfully');
});

module.exports = db;