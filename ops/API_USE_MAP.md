# API Strategy & Map

## Payment Provider: Stripe
- **Decision:** Stripe is preferred over Square.
- **Reasoning:** Superior hosted checkout experience ("Checkout Links") requiring zero PCI compliance on the client side. Better developer documentation for potential Node.js integration.
- **Implementation:**
    - **Lane A:** Use "Payment Links" (manual copy-paste in email or button).
    - **Lane B:** Use Stripe SDK for initializing Checkout Sessions.

## Form Handling
- **Lane A (Builder):** Native Hostinger Form Block (Email delivery).
- **Lane B (React):**
    - Option 1 (Node available): Custom Express Endpoint.
    - Option 2 (Static): Formspree or EmailJS.

## Scheduling
- **Strategy:** Embed-first. Do not build a custom calendar.
- **Tool:** Calendly (Free/Pro) or Cal.com.
- **Integration:** `iframe` on the `/book` page.

## Maps/Geocoding
- **Strategy:** Hardcoded Zip/City list for NWI.
- **Reasoning:** Google Maps API is expensive and overkill for a simple 2-county service area check.
