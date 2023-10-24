import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const locales = ['en', 'tr'] as const;

// Here we can define pathnames for each locale and each page 
// that should be internationalized in that locale 
export const pathnames = {
  '/': '/',
  '/hakkimizda': {
    en: '/about',
    tr: '/hakkimizda',
  },
  '/egitimler': {
    en: '/courses',
    tr: '/egitimler',
  },
  '/blogs': {
    en: '/',
    tr: '/blogs',
  },
  '/iletisim': {
    en: '/contact',
    tr: '/iletisim',
  },
  '/abut': {
    en: '/abut',
    tr: '/abuta',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, pathnames });