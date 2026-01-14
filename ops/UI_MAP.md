# UI MAP: Strong Homes Cleaning

## 1. GLOBAL COMPONENTS
- **Navbar**: Sticky. Mobile-first.
  - Links: Home, Services, Contact.
  - CTA: "Get Quote" (Green Pill).
  - Phone: Click-to-call.
- **Footer**:
  - Col 1: Brand/Trust.
  - Col 2: Service Areas (Cities).
  - Col 3: Services List.
  - Col 4: Contact/Hours.

## 2. HOME PAGE ( / )
- **Hero Section**
  - Component: `HeroVideo` (Background).
  - Content: H1 Headline, Subhead, 2 Buttons (Quote, Call).
- **Trust Bar**
  - Component: `FeatureRow`.
  - Content: 3 Icons (Vetted Teams, Satisfaction, Reliable).
- **Services Preview**
  - Component: `ServiceGrid`.
  - Content: 3 Cards (Standard, Deep, Move-Out).
- **Process**
  - Component: `StepProcess`.
  - Content: "How it works" in 3 steps.
- **Lead Magnet**
  - Component: `CtaBand`.
  - Content: "Ready to reclaim your weekend?"

## 3. QUOTE PAGE ( /quote )
- **Wizard Layout**
  - Component: `MultiStepForm`.
  - Step 1: `ZipCheck` (Gating).
  - Step 2: `ServiceSelect` (Cards).
  - Step 3: `HomeDetails` (Sliders/Inputs).
  - Step 4: `ContactForm` (Inputs).
  - Success: `ConfirmationView`.

## 4. SERVICES PAGE ( /services )
- **Header**: Simple text header.
- **Details**: Full descriptions of inclusions/exclusions.
- **Commercial**: Brief mention (if offered).

## 5. CONTACT PAGE ( /contact )
- **Layout**: Split Screen (Info Left, Form Right).
- **Map**: Static image or embed.
