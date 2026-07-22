'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

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
        <div className="flex items-center gap-4 mb-2">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600" />
          <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {resolvedLastUpdated}
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
