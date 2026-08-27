# Reflex API Documentation

Base URL: `http://localhost:3000`

---

## Create a Delivery Request
**POST** `/api/deliveries`

Creates a new delivery request.

**Request body (JSON):**
```json
{
  "retailer_id": 1,
  "customer_name": "Keisha Ochieng",
  "customer_phone": "0700000000",
  "address": "Ongata Rongai",
  "item_description": "Phone charger"
}
```

**Response (success, 201):**
```json
{
  "id": 1,
  "message": "Delivery request created"
}
```

---

## List All Delivery Requests
**GET** `/api/deliveries`

Returns all delivery requests in the system.

**Response (200):**
```json
[
  {
    "id": 1,
    "retailer_id": 1,
    "customer_name": "Keisha Ochieng",
    "customer_phone": "0700000000",
    "address": "Ongata Rongai",
    "item_description": "Phone charger",
    "current_status": "Pending",
    "assigned_rider_id": null,
    "created_at": "2026-08-27T10:00:00.000Z",
    "updated_at": "2026-08-27T10:00:00.000Z"
  }
]
```

---

## Assign a Rider to a Delivery
**PATCH** `/api/deliveries/:id/assign`

Assigns a rider to a specific delivery request. `:id` is the delivery's ID in the URL.

**Request body (JSON):**
```json
{
  "rider_id": 1
}
```

**Response (200):**
```json
{
  "message": "Rider assigned successfully"
}
```

---

## Update Delivery Status
**PATCH** `/api/deliveries/:id/status`

Updates the status of a delivery request. `:id` is the delivery's ID in the URL.

**Request body (JSON):**
```json
{
  "status": "Picked Up"
}
```
Valid status values: `Pending`, `Assigned`, `Picked Up`, `Delivered`

**Response (200):**
```json
{
  "message": "Status updated successfully"
}
```

---

## List All Riders
**GET** `/api/riders`

Returns all riders in the system.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Kamau",
    "phone": "0712345678",
    "availability": "available",
    "current_lat": null,
    "current_lng": null,
    "created_at": "2026-08-27T09:00:00.000Z"
  }
]
```

---

## Known Limitations
- No authentication/role checks are currently enforced on any endpoint
- No input validation on required fields
- Rider assignment does not check for existing assignment conflicts (no concurrency protection)