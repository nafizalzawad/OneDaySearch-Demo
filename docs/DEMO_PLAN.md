# OneDaySearch — Product Architecture, UX Wireframes & Demo Plan
*Visual-Only Clickable Marketplace Prototype for MD, VA, and DC Title Search Reports*

---

## 1. Executive Summary & Product Vision
**OneDaySearch** is a fast, transparent marketplace for title search reports across Maryland, Virginia, and the District of Columbia. Customers submit a residential or commercial property address, pay a transparent flat rate, and our automated assignment engine immediately routes the order to an available, pre-vetted independent abstractor.

### Core Value Propositions
- **Extreme Speed & Reliability**: Deterministic SLA calculated strictly in Eastern Time (ET) via `computeDueTime()`.
- **Zero Account Friction**: Public guest checkout; tracking via persistent tokenized URLs and SMS links.
- **Strict Marketplace Neutrality**: Strict algorithmic matching (no customer bias or provider cherry-picking).
- **Absolute Regulatory & Identity Separation**:
  - **Customer surface**: Never sees provider names, provider pay, internal SLA margins, E&O policy documents, routing mechanics, or internal tool names.
  - **Provider surface**: Never sees customer identities, personal names, phone numbers, or emails.
  - **No Title Insurance Confusion**: Clear statutory disclaimers stating that reports are abstract searches, not title insurance policies or legal opinions.

---

## 2. Complete Sitemap & URL Routing Structure

```
onedaysearch.example/
├── (Customer Site - Clean Public Shell)
│   ├── /                           # S1: Google-style minimal search home & address entry
│   ├── /check                      # S2: Address coverage validation (inline or transition)
│   ├── /details                    # S3: Property details, user role & contact info
│   ├── /speed                      # S4: Turnaround tier selection (24h, 12h, 6h)
│   ├── /pay                        # S5: Payment & statutory abstractor disclaimer
│   ├── /order/:token               # S6/S7/S8: Dynamic Order Status, Report Preview & Q&A Thread
│   ├── /track                      # Track an existing order via OD# & email/phone
│   ├── /how-it-works               # Transparent marketplace process breakdown
│   ├── /pricing                    # Flat-rate pricing structure & speed tiers
│   ├── /coverage                   # 24 MD jurisdictions, DC, and Northern/Central VA counties
│   ├── /not-title-insurance        # Statutory legal clarification & abstractor E&O explanation
│   └── /brand                      # Interactive Brand Identity, Logos, Favicon & Token Specs
│
├── /provider                       # (Provider Portal - Private Shell)
│   ├── /provider/login             # Abstractor sign-in / magic link
│   ├── /provider/onboarding        # E&O insurance verification & county coverage setup
│   ├── /provider/dashboard         # Active queue, capacity toggles, daily earnings & metrics
│   ├── /provider/orders/:orderId   # Abstractor workbench (order details, timer, dropzone, delivery)
│   ├── /provider/questions         # Anonymous customer question inbox
│   └── /provider/earnings          # Historical payouts, 1099 tracking & completed orders
│
└── /admin                          # (Admin Console - Internal Operations Shell)
    ├── /admin/orders               # Live marketplace order board with late-risk indicators
    ├── /admin/alerts               # Real-time incident feed (timeouts, decline spikes, SLA risks)
    ├── /admin/providers            # Abstractor roster, credentials, E&O expirations & status
    ├── /admin/config               # SLA hours, tier pricing, dispatch timeouts & buffer times
    └── /admin/audit                # Immutable audit log of assignments, handoffs & deliveries
```

---

## 3. The Three User Flows

### Flow A: Customer Ordering & Tracking (Main Polish Surface)
```
[S1: Search Home] ──(Select Address)──> [S2: Coverage Check]
                                               │
             ┌─────────────────────────────────┴─────────────────────────────────┐
             ▼ (In Coverage)                                                     ▼ (Out of Coverage)
    [S3: Order Details]                                                 [Waitlist Capture Modal]
             │
             ▼
    [S4: Speed Selection] ──(If 12h/6h unavailable, auto-bypass)──┐
             │                                                   │
             ▼                                                   │
    [S5: Checkout & Statutory E&O Agreement] <───────────────────┘
             │ (Instant Tokenized Creation)
             ▼
    [S6: Live Order Status (/order/:token)]
             │
             ├── Stage 1: Matching
             ├── Stage 2: Assigned (Shows countdown timer; NO provider info)
             ├── Stage 3: In Progress (Abstractor at courthouse/online records)
             ├── Stage 4: Ready (S7: PDF Report Preview & Download)
             ├── Stage 5: Questions Open (S8: 48h Encrypted Q&A Thread)
             └── Stage 6: Closed
```

### Flow B: Provider (Abstractor) Workflow
```
[Sign In] ──> [Onboarding / E&O Upload] ──> [Provider Dashboard]
                                                    │
                                                    ├── Set Capacity & Rush Slots
                                                    ├── Receive Dispatched Offer Modal (Countdown ring)
                                                    │     ├── Decline -> Re-queued in Admin
                                                    │     └── Accept -> Assigned to Workbench
                                                    ▼
                                            [Order Workbench]
                                                    │
                                                    ├── View Property & Scope (NO customer info)
                                                    ├── Courthouse/Record Search
                                                    ├── Drag-and-drop Completed PDF Report
                                                    └── Mark Delivered -> Customer S6 flips to Ready
```

### Flow C: Internal Operations & Admin Surveillance
```
[Admin Order Board] ──> Filter by SLA Risk (Normal, Approaching SLA, Late Risk)
        │
        ├── [Alerts Feed] -> Instant resolution for unaccepted offers & expiring E&O
        ├── [Abstractor Roster] -> Verify E&O certificates, pause inactive abstractors
        └── [Marketplace Config] -> Adjust tier surge pricing, cutoff times & capacity rules
```

---

## 4. Low-Fidelity ASCII Wireframes

### S1: Customer Home ("The Google Screen")
```
+-----------------------------------------------------------------------------------+
|  [Logo A: Clock/Roof] OneDaySearch                              [Track an order]  |
|                                                                                   |
|                                                                                   |
|                                                                                   |
|                                [Logo A Icon (48px)]                               |
|                                   OneDaySearch                                    |
|                                                                                   |
|             +-------------------------------------------------------+             |
|             | (Q) 10400 Fernwood Rd, Bethesda, MD 20817     [Search]|             |
|             +-------------------------------------------------------+             |
|                                                                                   |
|                     From $229  ·  Search report in 24 hours                       |
|                                                                                   |
|                                                                                   |
|                                                                                   |
| How it works   ·   Pricing   ·   Coverage   ·   Terms   ·   Privacy   ·   Support |
+-----------------------------------------------------------------------------------+
```

### S3: Property & Contact Details
```
+-----------------------------------------------------------------------------------+
|  [Logo] OneDaySearch                                            [Track an order]  |
|                                                                                   |
|                [1. Address] === [2. Details] --- [3. Speed] --- [4. Pay]          |
|                                                                                   |
|                         +-----------------------------------+                     |
|                         |       Property & Order Info       |                     |
|                         |                                   |                     |
|                         | Address:                          |                     |
|                         | 10400 Fernwood Rd, Bethesda, MD   |                     |
|                         |                                   |                     |
|                         | Property Type:                    |                     |
|                         | [ Single Family Home          v ] |                     |
|                         |                                   |                     |
|                         | I am a:                           |                     |
|                         | (o) Buyer  ( ) Seller  ( ) Agent  |                     |
|                         | ( ) Lender ( ) Title Co / Other   |                     |
|                         |                                   |                     |
|                         | Full Name:                        |                     |
|                         | [ Jane Doe                      ] |                     |
|                         |                                   |                     |
|                         | Email Address:                    |                     |
|                         | [ jane@example.com              ] |                     |
|                         |                                   |                     |
|                         | Mobile Number:                    |                     |
|                         | [ (301) 555-0192                ] |                     |
|                         |                                   |                     |
|                         | [x] Send order status via SMS     |                     |
|                         |                                   |                     |
|                         | [     Continue to Speed Tier    ] |                     |
|                         +-----------------------------------+                     |
+-----------------------------------------------------------------------------------+
```

### S4: Speed Selection ("Need it sooner?")
```
+-----------------------------------------------------------------------------------+
|  [Logo] OneDaySearch                                                              |
|                                                                                   |
|                [1. Address] === [2. Details] === [3. Speed] --- [4. Pay]          |
|                                                                                   |
|                                  Need it sooner?                                  |
|            Guaranteed turnaround delivered strictly by Eastern Time SLA           |
|                                                                                   |
|    +-------------------------+ +-------------------------+ +-------------------+  |
|    | (o) Standard 24 Hours   | | ( ) Express 12 Hours    | | ( ) Rush 6 Hours  |  |
|    |                         | |                         | |                   |  |
|    | $229                    | | $249                    | | $299              |  |
|    | Guaranteed due by:      | | Guaranteed due by:      | | Guaranteed due:   |  |
|    | Thu, Nov 5 · 3:42 PM ET | | Thu, Nov 5 · 3:42 AM ET | | Tonight 9:42 PM ET|  |
|    |                         | |                         | |                   |  |
|    | Most popular for escrow | | Ideal for tight closing | | Same-day urgent   |  |
|    +-------------------------+ +-------------------------+ +-------------------+  |
|                                                                                   |
|                                [ Continue to Payment ]                            |
+-----------------------------------------------------------------------------------+
```

### S5: Payment & Statutory Disclaimer
```
+-----------------------------------------------------------------------------------+
|  [Logo] OneDaySearch                                                              |
|                                                                                   |
|                [1. Address] === [2. Details] === [3. Speed] === [4. Pay]          |
|                                                                                   |
|    +---------------------------------+  +-------------------------------------+   |
|    | Order Summary                   |  | Payment Details                     |   |
|    | 10400 Fernwood Rd, Bethesda, MD |  | [ Apple Pay ] (Visual Mock)         |   |
|    | Residential Single Family       |  | ----------------- OR -------------  |   |
|    | 24-Hour Turnaround SLA          |  | Card Number: [ 4242 •••• •••• 4242] |   |
|    | Guaranteed: Thu 3:42 PM ET      |  | Exp: [ 12/28 ]   CVC: [ 382 ]       |   |
|    |                                 |  |                                     |   |
|    | Search Fee:             $229.00 |  | [x] I agree to the Terms.           |   |
|    | Total Due:              $229.00 |  | I understand an independent         |   |
|    |                                 |  | abstractor prepares my report, that |   |
|    | [DEMO MODE - No Real Charge]    |  | it is not title insurance or legal  |   |
|    +---------------------------------+  | advice, and that the abstractor's   |   |
|                                         | E&O policy stands behind its        |   |
|                                         | contents.                           |   |
|                                         |                                     |   |
|                                         | [ Pay $229.00 & Start My Search ]   |   |
|                                         +-------------------------------------+   |
+-----------------------------------------------------------------------------------+
```

### S6/S7/S8: Order Status, Report Preview & Q&A
```
+-----------------------------------------------------------------------------------+
|  [Logo] OneDaySearch                 Order OD-48213           [Need Support?]     |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |  Order Progress: [=====================>                  ] (In Progress)   |  |
|  |  (x) Submitted  ->  (x) Assigned  ->  (*) In Progress  ->  ( ) Ready        |  |
|  |                                                                             |  |
|  |  Estimated Delivery: Tomorrow at 3:42 PM ET (14h 22m remaining)            |  |
|  |  Assigned to certified licensed county abstractor                          |  |
|  |  (Provider identity protected under marketplace privacy protocol)          |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +----------------------------------------+ +----------------------------------+  |
|  | S7: Search Report Summary              | | S8: Order Clarifications (48h)   |  |
|  | [PDF Preview Thumbnail]                | | Secure channel with abstractor   |  |
|  | - Chain of Title (30-year search)      | | "Messages stay on OneDaySearch"  |  |
|  | - Open Deeds of Trust: 1 identified    | |                                  |  |
|  | - Tax Liens / Judgments: Clear         | | [Abstractor]: Search complete,   |  |
|  | - Easements: Utility ROW recorded      | | please verify parcel boundary.   |  |
|  |                                        | |                                  |  |
|  | [ Download Official Report (PDF) ]    | | [Type your message here...   ]   |  |
|  +----------------------------------------+ +----------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### Provider Portal: Dashboard & Offer Modal
```
+-----------------------------------------------------------------------------------+
|  OneDaySearch [PROVIDER]    Status: [ Online (Accepting) v ]    Balance: $1,420.00|
|                                                                                   |
|  Daily Capacity: [ 3 / 5 Orders ]      Rush Slots Available: [-] 2 [+]            |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | NEW ORDER OFFER DISPATCHED                           Timer: ( 00:44 remaining) |
|  | Property: 4500 East West Hwy, Bethesda, MD (Montgomery County)              |
|  | Scope: Full 40-Year Search | Tier: 12-Hour Rush                             |
|  | Internal Abstractor Due: Today 6:00 PM ET                                   |
|  | Abstractor Payout: $165.00                                                  |
|  | [Note: Customer contact info shielded per marketplace policy]               |
|  |                                                                             |
|  |                 [ Decline Offer ]       [ Accept Order ($165) ]             |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### Admin Console: Live Operational Board
```
+-----------------------------------------------------------------------------------+
|  OneDaySearch [ADMIN]      Active: 28  |  Rush: 6  |  At-Risk: 1  |  Providers: 14 |
|                                                                                   |
|  [Orders]    [Alerts (2)]    [Abstractors]    [Pricing & SLA]    [Audit Log]      |
|                                                                                   |
|  Order ID    Property / County        Tier    Internal SLA   Status     Late Risk |
|  OD-48213    10400 Fernwood Rd, Montg 24h     Thu 1:00 PM    In Progress [LOW]    |
|  OD-48214    812 7th St NW, DC        6h Rush Wed 7:30 PM    Assigned    [MED]    |
|  OD-48215    1200 S Hayes St, Arlingt 12h    Thu 11:00 AM   Unassigned  [HIGH] ! |
+-----------------------------------------------------------------------------------+
```

---

## 5. Component Inventory
1. **Brand & Shell Components**:
   - `Logo`: Hand-drawn geometric SVGs for Directions A, B, C; horizontal, stacked, icon-only variants.
   - `Header`: Customer ultra-clean header vs Provider badge header vs Admin dark header.
   - `Footer`: Subtle copyright, regulatory abstract disclaimer, and quick links.
   - `ThemeToggle`: Switcher supporting "Clean Light" (default Google style) and "Navy Brand".
2. **Customer Flow Components**:
   - `AddressSearchBar`: Hero pill input with dropdown autocomplete for DC/MD/VA samples.
   - `CoverageBadge`: Visual coverage confirmation & waitlist modal for unsupported regions.
   - `StepIndicator`: 4-stage slim horizontal progress bar.
   - `TierCard`: Speed option card with guaranteed ET due time, price, and availability logic.
   - `StatutoryAgreement`: Explicit checkbox for non-insurance disclosure and abstractor E&O.
   - `OrderCountdown`: JetBrains Mono countdown clock tied to dynamic ET target.
   - `ReportCard`: Mock interactive PDF first-page viewer with legal search sections.
   - `MessageThread`: 48-hour two-way masked messaging component.
3. **Provider Portal Components**:
   - `ProviderHeader`: Capacity meters, rush steppers, and online availability toggle.
   - `OfferModal`: Dispatch overlay with countdown ring and payout rate.
   - `AbstractorWorkbench`: Upload dropzone, courthouse reference notes, and delivery trigger.
4. **Admin Console Components**:
   - `MetricsBar`: Systemwide throughput, SLA health, and capacity stats.
   - `OrderTable`: Sortable order matrix with real-time status chips and late risk flags.
   - `AlertsFeed`: Real-time operational incident feed.
   - `ConfigPanel`: Market pricing, county dispatch thresholds, and SLA parameters.
5. **Interactive Demo Floating Dock**:
   - Collapsible dock (bottom-left, toggled with key `D` or query `?demo=off`).
   - Logo direction selector (A, B, C).
   - Theme switcher (Clean Light vs Navy Brand).
   - Capacity / Speed toggles (12-hour available, 6-hour available, After-hours mode).
   - Order stage jumper (Jump directly to Matching, Assigned, In-Progress, Ready, Q&A, Closed).
   - Live SMS Preview popup toggle.
   - Surface Switcher (Customer / Provider / Admin).

---

## 6. Design Tokens & Styling Rules

```css
:root {
  /* Brand Core */
  --color-navy: #0B1B33;       /* High-contrast primary headers, dark accents */
  --color-amber: #F2A33A;      /* STRICT SINGLE PRIMARY ACTION & highlights */
  --color-amber-pale: #FDEBD0; /* Soft callouts & subtle emphasis */
  --color-page: #F4F6FA;       /* Soothing neutral page background */
  --color-muted: #4F5F78;      /* Body copy, subtitles, secondary metadata */
  --color-success: #17824F;    /* Verified status, on-time SLA */
  --color-white: #FFFFFF;      /* Clean card and surface canvas */
  --color-border: #E3E8F0;     /* Crisp, subtle 1px dividers */
  --color-card-bg: #FFFFFF;
  --color-card-border: #E3E8F0;
  
  /* Typography */
  --font-sans: 'Hanken Grotesk', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace; /* STRICTLY for order #, countdowns & prices */

  /* Radii & Shadows */
  --radius-card: 12px;
  --radius-pill: 9999px;
  --shadow-soft: 0 4px 20px -2px rgba(11, 27, 51, 0.05);
  --shadow-hover: 0 8px 30px -4px rgba(11, 27, 51, 0.08);
}
```

### Contrast & Usability Guardrails
- **Amber Text Rule**: `#F2A33A` text is **strictly prohibited on white or light backgrounds**. Primary amber buttons use `#0B1B33` (Navy) text for AAA contrast.
- **Grid**: Strict 8px layout rhythm (`p-2`, `p-4`, `p-6`, `p-8`).
- **Focus Rings**: Amber 2px offset ring (`focus:ring-2 focus:ring-[#F2A33A] focus:ring-offset-2`).
- **Motion**: Respects `prefers-reduced-motion` with 150ms transitions.

---

## 7. Demo Controls Specification
Located in a floating pill in the bottom-left corner (collapsible via keyboard shortcut `D` or `?demo=off`).
1. **Logo Selector**: Direction A (Clock Under Roofline), Direction B (Magnifier with House), Direction C (Bold "1" with Roof Slope).
2. **Theme Switcher**: Clean Light (Default Google feel) vs. Navy Brand (Dark navy header and card accents).
3. **Turnaround SLA Flags**:
   - `allow12h`: Toggle 12-hour turnaround ($249).
   - `allow6h`: Toggle 6-hour same-day rush ($299).
   - `isAfterHours`: Toggle past-cutoff mode (advances start to next business day 9:00 AM ET).
4. **Order State Quick-Jumper**: Immediately sets S6 status to:
   - `MATCHING` -> `ASSIGNED` -> `IN_PROGRESS` -> `READY` -> `QUESTIONS` -> `CLOSED`.
5. **SMS Notification Simulator**: Toggles a mock phone notification bubble showing exact SMS dispatch text.
6. **Surface Switcher**: Fast navigation between `Customer Experience`, `Provider Portal`, and `Admin Console`.

---

## 8. Verification & QA Matrix
- [x] S1 Home screen stripped of clutter (no cards, no hero photos, no fake counters).
- [x] Speed screen (S4) conditionally rendered only when demo flags allow.
- [x] Complete isolation: Provider names omitted on customer views; customer info omitted on provider views.
- [x] Eastern Time calculation centralized in `computeDueTime()`.
- [x] Responsive layout verified at 375px (mobile), 768px (tablet), and 1280px (desktop).
