# API Evidence

## 1. Postcode Lookup API

**Endpoint:**  
POST /api/postcode/lookup

**Purpose:**  
Verify that a valid postcode returns a list of addresses as per API contract.

---

### Request

```json
{
  "postcode": "SW1A 1AA"
}


⸻

Expected Result
	•	HTTP status: 200 OK
	•	Response contains:
	•	postcode field
	•	addresses array
	•	Each address includes:
	•	id
	•	line1
	•	city

⸻

Actual Result
	•	HTTP status: 200 OK
	•	Response returned 12 addresses
	•	Each address object includes required fields (id, line1, city)

⸻

Result

Pass

⸻

Evidence:

![Postcode Lookup API](image.png)

---

## 2. Waste Types API

**Endpoint:**  
POST /api/waste-types

**Purpose:**  
Verify that waste type selection is correctly processed and API responds as expected.

---

### Request

```json
{
  "heavyWaste": true,
  "plasterboard": false,
  "plasterboardOption": null
}


⸻

Expected Result
	•	HTTP status: 200 OK
	•	Response contains:
	•	ok field with value true

⸻

Actual Result
	•	HTTP status: 200 OK
	•	Response returned { "ok": true }

⸻

Result

Pass

⸻

Evidence:

![Waste Types API](image-1.png)

---

## 3. Skip List API

**Endpoint:**  
GET /api/skips?postcode=SW1A1AA&heavyWaste=true

**Purpose:**  
Verify that skip options are returned correctly based on postcode and waste type selection.

---

### Request

```text
GET /api/skips?postcode=SW1A1AA&heavyWaste=true


⸻

Expected Result
	•	HTTP status: 200 OK
	•	Response contains:
	•	skips array
	•	Each skip includes:
	•	size
	•	price
	•	disabled

⸻

Actual Result
	•	HTTP status: 200 OK
	•	Response returned multiple skip options
	•	Each skip object includes size, price, and disabled fields
	•	Disabled skip options are present as expected

⸻

Result

Pass

⸻

Evidence:

![Skip List API](image-2.png)


---

## 4. Booking Confirmation API

**Endpoint:**  
POST /api/booking/confirm

**Purpose:**  
Verify that booking confirmation succeeds and returns a booking reference as per API contract.

---

### Request

```json
{
  "postcode": "SW1A 1AA",
  "addressId": "addr_1",
  "heavyWaste": true,
  "plasterboard": false,
  "skipSize": "4-yard",
  "price": 120
}


⸻

Expected Result
	•	HTTP status: 200 OK
	•	Response contains:
	•	status
	•	bookingId

⸻

Actual Result
	•	HTTP status: 200 OK
	•	Response returned a successful booking confirmation with status and bookingId

⸻

Result

Pass

⸻

Evidence:

![Booking Confirmation API](image-3.png)

