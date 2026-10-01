'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
    recentCount?: number;
    showAll?: boolean;
}

export default function News({ items, title = 'News', recentCount = 5, showAll = false }: NewsProps) {
    const visibleItems = showAll ? items : items.slice(0, recentCount);
    const Heading = showAll ? 'h1' : 'h2';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <div className="mb-4 flex items-center justify-between gap-4">
                <Heading className={`${showAll ? 'text-4xl mb-4' : 'text-2xl'} font-serif font-bold text-primary`}>{title}</Heading>
                {!showAll && items.length > recentCount && (
                    <Link
                        href="/news"
                        className="shrink-0 rounded py-1 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                        View all →
                    </Link>
                )}
            </div>
            <ul className={showAll ? 'space-y-5' : 'space-y-3'}>
                {visibleItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <time dateTime={item.date} className="text-sm text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded font-medium flex-shrink-0">{item.date}</time>
                        <div className="min-w-0 text-[15px] leading-6 text-neutral-700">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
    
}
