import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getBase } from './utils/base';

type SeoConfig = { title: string; description: string; canonicalPath: string };

const SEO_MAP: Record<string, SeoConfig> = {
  '/': {
    title: 'StrongHomes Cleaning | Northwest Indiana | Lake & Porter Counties',
    description:
      'Premium home cleaning across Lake County and Porter County: Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, Lowell. Vetted local crews in Northwest Indiana.',
    canonicalPath: '/',
  },
  '/services': {
    title: 'Cleaning Services | Lake & Porter County Homes | StrongHomes',
    description:
      'Standard, deep, and move-in/out cleaning for Lake County and Porter County including Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell.',
    canonicalPath: '/services',
  },
  '/services/standard': {
    title: 'Standard Cleaning | Hammond, Hobart, Merrillville, Crown Point, Valparaiso',
    description:
      'Recurring maintenance cleaning for Northwest Indiana homes in Lake County and Porter County. Reliable, detailed, and locally trusted.',
    canonicalPath: '/services/standard',
  },
  '/services/deep': {
    title: 'Deep Cleaning | Lake & Porter County Specialists',
    description:
      'Top-to-bottom deep cleaning for homes across Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell. Perfect for resets and seasonal refreshes.',
    canonicalPath: '/services/deep',
  },
  '/services/move-in-out': {
    title: 'Move-In / Move-Out Cleaning | Northwest Indiana',
    description:
      'White-glove move cleaning for Lake County and Porter County properties, covering Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell.',
    canonicalPath: '/services/move-in-out',
  },
  '/quote': {
    title: 'Get a Quote | StrongHomes Cleaning | Lake & Porter Counties',
    description:
      'Fast home cleaning estimates for Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, Lowell, and surrounding Lake & Porter County areas.',
    canonicalPath: '/quote',
  },
  '/contact': {
    title: 'Contact StrongHomes | Northwest Indiana Cleaning',
    description:
      'Reach StrongHomes Cleaning for Lake County and Porter County service questions. Serving Hammond, Hobart, Merrillville, Crown Point, Valparaiso, Schererville, St. John, and Lowell.',
    canonicalPath: '/contact',
  },
  '/privacy': {
    title: 'Privacy Policy | StrongHomes Cleaning',
    description: 'Privacy practices for StrongHomes Cleaning. How we handle estimate and contact information for Lake & Porter County customers.',
    canonicalPath: '/privacy',
  },
  '/terms': {
    title: 'Terms & Conditions | StrongHomes Cleaning',
    description: 'Service terms, scheduling, and cancellations for StrongHomes Cleaning in Lake & Porter Counties.',
    canonicalPath: '/terms',
  },
};

const buildCanonical = (canonicalPath: string) => {
  const base = getBase();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathWithoutTrailingSlash = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath.slice(1) : canonicalPath;
  const hashPath = cleanPath ? `#/${cleanPath}` : '#/';
  // Prefer origin + current path to respect subfolder hosting; fall back to base if origin unavailable.
  return origin
    ? `${origin}${pathWithoutTrailingSlash}${hashPath}`
    : `${base}${cleanPath}`;
};

export const SeoHead: React.FC<{ override?: Partial<SeoConfig> }> = ({ override }) => {
  const location = useLocation();
  const baseConfig = SEO_MAP[location.pathname] ?? SEO_MAP['/'];
  const config = { ...baseConfig, ...override };
  const canonicalUrl = buildCanonical(config.canonicalPath);
  const base = getBase();
  const keywords =
    'Northwest Indiana cleaning, Lake County cleaning, Porter County cleaning, Hammond cleaning, Hobart cleaning, Merrillville cleaning, Crown Point cleaning, Valparaiso cleaning, Schererville cleaning, St. John cleaning, Lowell cleaning, home cleaning';

  const ogImageUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${base}og-image.svg`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaningService',
    name: 'StrongHomes Cleaning',
    url: canonicalUrl,
    image: ogImageUrl,
    telephone: '(219) 615-9477',
    email: 'info@stronghomescleaning.com',
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Lake County, Indiana'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Porter County, Indiana'
      }
    ],
    knowsAbout: [
      'Standard Cleaning',
      'Deep Cleaning',
      'Move-In/Out Cleaning'
    ],
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '(219) 615-9477',
      email: 'info@stronghomescleaning.com',
      availableLanguage: 'en'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00'
    },
    description: config.description,
  };

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="StrongHomes Cleaning" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="StrongHomes Cleaning - Northwest Indiana Premium Home Cleaning Services" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
