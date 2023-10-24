# Setup

```bash
yarn create next-app
```

# Add next-intl

- https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components

```bash
yarn add next-intl@3.0.0-beta.19
```

- Structuring Your Pages

```
├── messages (1)
│   ├── en.json
│   └── ...
├── i18n.ts (2)
├── next.config.js (3)
└── src
  ├── middleware.ts (4)
  ├── navigation.ts (5)
  └──app
    └── [locale]
      ├── layout.tsx (6)
      └── page.tsx (7)
```

- in messages add for example (en, tr):

```json
{
  "Index": {
    "title": "Home Page!"
  },
  "Navbar": {
    "main": "Go Back To Main Page"
    // ...
  }
}
```

```json
{
  "Index": {
    "title": "Ana Sayfa!"
  },
  "Navbar": {
    "main": "Ana Sayfaya Geri Dön"
    // ...
  }
}
```

- in i18n.ts

```ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

- update next.config.js ( example images {})

```js
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["images.pexels.com"] },
};

module.exports = withNextIntl(nextConfig);
```

- create src/middleware.ts

```ts
import createMiddleware from "next-intl/middleware";
import { locales, pathnames } from "./navigation";

export default createMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

- create navigation.ts

```ts
import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const locales = ['en', 'tr'] as const;

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
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
```

- update layout.tsx ( for example )

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { Navigation } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = useLocale();
  const messages = useMessages();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- For typescript add in root global.d.ts

```ts
type Messages = typeof import("./messages/en.json");
type IntlMessages = Messages;
```

- las thing, Language Switcher Component

```tsx
"use client";
import { usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (event: any) => {
    const locale = event.target.value;

    const cleanedPathName = pathName.startsWith("/")
      ? pathName
      : "/" + pathName;

    router.push(`/${cleanedPathName}`, {
      locale,
    });
  };

  return (
    <select onChange={handleLanguageChange} defaultValue={locale}>
      <option value="tr">Turkish</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSwitcher;
```
