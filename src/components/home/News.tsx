'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown";

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title = 'News' }: NewsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        {/* <span className="text-xs text-neutral-700 mt-1 w-16 flex-shrink-0">{item.date}</span> */}
                        <span className="text-sm text-neutral-600 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 px-2 py-0.5 rounded font-medium flex-shrink-0">{item.date}</span>
                        <div  className="text-base text-neutral-700">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
    
}
