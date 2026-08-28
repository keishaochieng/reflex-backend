const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send('Reflex backend is running');
});

// Create a new delivery request
app.post('/api/deliveries', (req, res) => {
  const { retailer_id, customer_name, customer_phone, address, item_description } = req.body;
  const created_at = new Date().toISOString();

  const sql = `INSERT INTO DeliveryRequest 
    (retailer_id, customer_name, customer_phone, address, item_description, current_status, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, 'Pending', ?, ?)`;

  db.run(sql, [retailer_id, customer_name, customer_phone, address, item_description, created_at, created_at], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Delivery request created' });
  });
});

// List all delivery requests
app.get('/api/deliveries', (req, res) => {
  db.all('SELECT * FROM DeliveryRequest', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
// Assign a rider to a delivery request
app.patch('/api/deliveries/:id/assign', (req, res) => {
  const { rider_id } = req.body;
  const updated_at = new Date().toISOString();

  const sql = `UPDATE DeliveryRequest 
    SET assigned_rider_id = ?, current_status = 'Assigned', updated_at = ? 
    WHERE id = ?`;

 db.run(sql, [rider_id, updated_at, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });

    db.run(
      `INSERT INTO StatusEvent (delivery_id, status, timestamp, updated_by) VALUES (?, ?, ?, ?)`,
      [req.params.id, 'Assigned', updated_at, rider_id]
    );

    res.json({ message: 'Rider assigned successfully' });
  });
}); 

// Update delivery status
app.patch('/api/deliveries/:id/status', (req, res) => {
  const { status } = req.body;
  const updated_at = new Date().toISOString();

  const sql = `UPDATE DeliveryRequest SET current_status = ?, updated_at = ? WHERE id = ?`;

 db.run(sql, [status, updated_at, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });

    db.run(
      `INSERT INTO StatusEvent (delivery_id, status, timestamp) VALUES (?, ?, ?)`,
      [req.params.id, status, updated_at]
    );

    res.json({ message: 'Status updated successfully' });
  });
}); 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});