# Payments Strategy

## Phase 1: Lead Gen Only (No Payments)
- Focus is entirely on capturing the lead.
- Pricing is "Estimate".
- No payment collection on website. Payment collected on-site or via invoice later.

## Phase 2: Deposits (Optional High Trust)
- Require $25-$50 deposit to lock in a time slot.
- **Technology:** Stripe Hosted Checkout.
- **Flow:**
    1. User submits Quote Request.
    2. Admin calls/emails to confirm price and time.
    3. Admin sends Stripe Payment Link manually.

## Phase 3: Automated Booking (Advanced)
- User selects service -> Price calculated -> User pays deposit -> Calendar slot booked.
- **Requirement:** Standardized pricing model (e.g., $X/bed + $Y/bath).
- **Risk:** If pricing is wrong, money is lost.
- **Recommendation:** Stick to Phase 2 until volume is high.

## Security
- **NEVER** collect credit card numbers directly in React forms.
- **ALWAYS** redirect to `checkout.stripe.com` or similar.
