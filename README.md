# OneDaySearch — Visual-Only Title Search Marketplace Demo

A production-quality visual-only clickable demonstration of **OneDaySearch**, an automated title search report marketplace for Maryland, Virginia, and Washington DC.

---

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# OR build and run the static production preview
npm run build
npm run preview
```
Visit `http://localhost:5173` or `http://localhost:4173`.

---

## Surfaces & Key URLs

### Surface A: Customer Experience (Guest Checkout, No Account)
- **Home ("The Google Screen")**: `/` (S1 & S2 Address autocomplete & coverage check)
- **Property & Contact Details**: `/details` (S3 max 520px card)
- **Speed Selection**: `/speed` (S4: 24h, 12h, 6h tiers tied to central ET clock)
- **Payment & Authorization**: `/pay` (S5: Apple Pay, card mock, statutory disclaimer)
- **Live Order Status**: `/order/d9f82a17c4b03e89` (S6: Countdown, S7: Mock PDF abstract report, S8: 48h Q&A thread)
- **Track an Order**: `/track`
- **Statutory Notice**: `/not-title-insurance`
- **How It Works**: `/how-it-works`
- **Pricing**: `/pricing`
- **Coverage**: `/coverage`
- **Brand Specs & Identity**: `/brand`

### Surface B: Provider Portal (Private Abstractor Shell)
- **Dashboard**: `/provider` (Daily capacity meter, rush stepper, new offer modal)
- **Workbench**: `/provider/orders/OD-48213` (Internal deadline SLA, PDF dropzone, notes)
- **Clarification Inbox**: `/provider/questions`
- **Earnings & 1099**: `/provider/earnings`
- **E&O Credentials**: `/provider/onboarding`
- **Sign In**: `/provider/login`

### Surface C: Internal Admin Console
- **Live Order Board**: `/admin` (Late-risk chips, full customer/provider ops matrix)
- **Alerts Feed**: `/admin/alerts` (30-min timeouts, declining abstractors, E&O expirations)
- **Abstractor Roster**: `/admin/providers` (E&O compliance tracking)
- **Marketplace Configuration**: `/admin/config` (Tier prices, offer timeouts, cutoff hours)
- **Chronological Audit Log**: `/admin/audit`

---

## Demo Floating Dock Controls

A collapsible control dock is pinned to the bottom-left corner (press key **`D`** to toggle visibility, or add `?demo=off` to the URL).

Controls:
1. **Surface Switcher**: Jump instantly between `Customer`, `Provider`, and `Admin`.
2. **Logo Direction Switcher**: Toggle between Direction A (Clock Under Roofline), Direction B (Magnifier with House), and Direction C (Bold 1 with Roof Slope).
3. **Theme Switcher**: Compare **Clean Light (Default Google feel)** vs. **Navy Brand**.
4. **Speed Availability Toggles**: Turn 12-hour and 6-hour options on/off, or toggle after-hours mode (advances search start to next business day 9:00 AM ET).
5. **Order Stage Jumper**: Fast-forward order `OD-48213` through `Matching`, `Assigned`, `In Progress`, `Ready`, `Questions`, and `Closed`.
6. **Simulate SMS Dispatch**: Toggles real-time SMS notification bubbles on each stage transition.

---

## Architectural Guardrails & Hard Separation
- **Customer surface**: Never exposes abstractor names, provider payouts, internal buffer deadlines, or routing metrics.
- **Provider surface**: Never exposes customer names, personal phone numbers, or email addresses.
- **Statutory Clarity**: Prominently clarifies that title search reports are certified title abstracts and not title insurance policies or legal advice.
- **Color & Contrast Rules**: Zero amber text on light backgrounds. Primary buttons combine Amber `#F2A33A` background with Navy `#0B1B33` text for AAA compliance.
- **Deterministic SLA**: All turnaround commitments are computed strictly in Eastern Time (ET) through `computeDueTime(tier, now, isAfterHours)`.
