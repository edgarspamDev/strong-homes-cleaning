# API Contract

*Base URL:* `/api/v1` (or Third-party Endpoint)

## 1. Leads
### POST `/api/lead`
Captures "Quick Quote" or Contact Form submissions.
**Body:**
```json
{
  "name": "Jane Doe",
  "phone": "219-555-0199",
  "email": "jane@example.com",
  "message": "Looking for deep clean.",
  "honeypot": "" // Must be empty
}
```

## 2. Quote Intake
### POST `/api/quote_intake`
Full funnel submission.
**Body:**
```json
{
  "location": { "zip": "46321", "city": "Munster" },
  "serviceType": "deep_clean",
  "property": { "beds": 3, "baths": 2, "sqft_range": "1500-2000" },
  "frequency": "one_time",
  "contact": { ... }
}
```

## 3. Location Validation
### POST `/api/validate_area`
**Body:** `{ "zip": "46321" }`
**Response:** `{ "serviced": true, "city": "Munster" }`

## 4. Payments (Stripe)
### POST `/api/stripe/create_checkout_session`
Creates a hosted checkout page for deposits.
**Body:**
```json
{
  "serviceId": "deposit_50",
  "customerEmail": "jane@example.com"
}
```
**Response:** `{ "url": "https://checkout.stripe.com/c/pay/..." }`

### POST `/api/webhooks/stripe`
Handles `checkout.session.completed` events to update internal DB/Sheets.

## 5. Text-to-Speech (Optional)
### POST `/api/tts`
**Body:** `{ "text": "Welcome to Strong Homes Cleaning" }`
**Response:** `{ "audioUrl": "..." }`
