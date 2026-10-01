'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';
import Image from 'next/image';

const universities = [
  { name: 'Tsinghua University', src: '/THUlogo.png', href: 'https://www.tsinghua.edu.cn/en/' },
  { name: 'University of California, Berkeley', src: '/UCBlogo.svg', href: 'https://www.berkeley.edu/' },
  { name: 'Central South University', src: '/CSUlogo.png', href: 'https://en.csu.edu.cn/' },
];

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer({ lastUpdated, lastUpdatedByLocale, defaultLocale = 'en' }: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="bg-neutral-50/50 dark:bg-neutral-900/50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-6 py-6 mb-6 sm:gap-12" aria-label="Universities">
          {universities.map((university) => (
            <a
              key={university.name}
              href={university.href}
              target="_blank"
              rel="noopener noreferrer"
              title={university.name}
              className="shrink-0 rounded-full transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image src={university.src} alt={university.name} width={112} height={112} className="h-18 w-18 object-contain sm:h-28 sm:w-28" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600" />
          <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            Last updated: {resolvedLastUpdated}
          </span>
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600" />
        </div>
        <p className="text-xs text-neutral-400 text-center">
          <a href="https://github.com/xyjoey/PRISM" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            {messages.footer.builtWithPrism}
          </a>
        </p>
      </div>
    </footer>
  );
}
