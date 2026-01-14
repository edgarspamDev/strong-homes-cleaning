/**
 * Centralized business configuration
 * Update these values in one place to change them across the entire site
 */
export const BUSINESS = {
  name: 'StrongHomes Cleaning',
  phoneDisplay: '(219) 615-9477',
  phoneHref: 'tel:2196159477',
  email: 'info@stronghomescleaning.com',
  emailHref: 'mailto:info@stronghomescleaning.com',
  hours: 'Mon-Sat: 8am-6pm',
  serviceArea: 'Lake & Porter Counties, IN',
  // FormSubmit.co endpoint - sends directly to business email
  formSubmitUrl: 'https://formsubmit.co/ajax/info@stronghomescleaning.com',
} as const;

export const LINKS = {
  bookingUrl: import.meta.env.VITE_CALENDLY_URL ?? 'https://calendly.com/hello-stronghomescleaning/cleaning-booking',
  calendlyBooking: 'https://calendly.com/hello-stronghomescleaning/cleaning-booking',
  calendlyPopupUrl: 'https://calendly.com/hello-stronghomescleaning/cleaning-booking?hide_event_type_details=1&hide_gdpr_banner=1&text_color=111111&primary_color=c9a24a',
  contactFormspreeId: import.meta.env.VITE_FORMSPREE_CONTACT_ID ?? '',
  quoteFormspreeId: import.meta.env.VITE_FORMSPREE_QUOTE_ID ?? '',
} as const;

export function getFormspreeUrl(formId: string | undefined): string | null {
  return formId ? `https://formspree.io/f/${formId}` : null;
}

export const FORM = {
  minFillMs: 700, // Anti-bot friction: minimum time before form can submit
} as const;

export const SERVICE_CITIES = [
  'Hammond',
  'Hobart',
  'Merrillville',
  'Crown Point',
  'Valparaiso',
  'Schererville',
  'St. John',
  'Lowell',
] as const;
