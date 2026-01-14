export const BUSINESS = {
  name: 'Strong Homes Cleaning',
  phoneDisplay: '(219) 615-9477',
  phoneHref: 'tel:2196159477',
  email: 'info@stronghomescleaning.com',
  hours: 'Mon-Sat: 8am-6pm',
  serviceArea: 'Lake & Porter Counties, Indiana',
};

export const LINKS = {
  bookingUrl: import.meta.env.VITE_CALENDLY_URL ?? '',
  contactFormspreeId: import.meta.env.VITE_FORMSPREE_CONTACT_ID ?? '',
  quoteFormspreeId: import.meta.env.VITE_FORMSPREE_QUOTE_ID ?? '',
};

export const FORM = {
  minFillMs: 700,
};

export function getFormspreeUrl(formId: string | undefined) {
  return formId ? `https://formspree.io/f/${formId}` : null;
}
