'use client';

import { motion } from 'framer-motion';
import { CardItem, CardPageConfig } from '@/types/page';

function ServiceSections({ items }: { items: CardItem[] }) {
    return (
        <div className="space-y-7">
            {items.map((item) => (
                <section key={item.title} className="border-t border-neutral-200 pt-5">
                    <h2 className="mb-2 text-lg font-semibold text-accent">{item.title}</h2>
                    <ul className="divide-y divide-neutral-100">
                        {item.list?.map((entry) => (
                            <li key={`${entry.name}-${entry.date}`} className="grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                                <span className="text-sm leading-6 tabular-nums text-neutral-500">
                                    {entry.date?.split(', ').map((date, index, dates) => (
                                        <span key={date} className="inline-block whitespace-nowrap">
                                            {date}{index < dates.length - 1 ? ',\u00a0' : ''}
                                        </span>
                                    ))}
                                </span>
                                <span className="min-w-0 whitespace-pre-line text-base leading-6 text-neutral-700">{entry.name}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

function AwardsTimeline({ items }: { items: CardItem[] }) {
    const groups = new Map<string, CardItem[]>();
    items.forEach((item) => {
        const year = item.date || 'Other';
        groups.set(year, [...(groups.get(year) || []), item]);
    });

    return (
        <div className="space-y-6">
            {[...groups.entries()].sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true })).map(([year, awards]) => (
                <section key={year} className="grid gap-3 border-t border-neutral-200 pt-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-6">
                    <h2 className="text-xl font-serif font-bold text-accent">{year}</h2>
                    <ul className="min-w-0 divide-y divide-neutral-100">
                        {awards.map((award) => (
                            <li key={award.title} className="py-4 first:pt-0 last:pb-0">
                                <h3 className="text-base font-semibold leading-6 text-primary">{award.title}</h3>
                                {award.subtitle && <p className="mt-1 text-sm leading-6 text-neutral-500">{award.subtitle}</p>}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl`}>
                        {config.description}
                    </p>
                )}
            </div>

            {config.layout === 'grouped' ? (
                <ServiceSections items={config.items} />
            ) : config.layout === 'timeline' ? (
                <AwardsTimeline items={config.items} />
            ) : (
            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 relative`}
                    >
                        {item.date && (
                            <span className="absolute top-3 right-3 bg-accent text-white text-xs sm:text-sm font-bold px-2 py-0.5 rounded-md shadow-sm">
                                {item.date}
                            </span>
                        )}
                        <div className="mb-1">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} text-accent font-medium mb-1 font-semibold pr-16`}>{item.title}</h3>
                        </div>
                        {item.subtitle && (
                            <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>{item.subtitle}</p>
                        )}
                        {/* {item.content && (
                            <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                {item.content}
                            </p>
                        )} */}
                        
                        {item.list && item.list.length > 0 && (
                            <ul className="space-y-4 mt-4">
                                {item.list.map((listItem, i) => (
                                    <li key={i} className="flex items-start gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3 last:border-0 last:pb-0">
                                        
                                        {listItem.date && (
                                            <div>
                                                <span className="text-base text-neutral-700 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded ">
                                                    {listItem.date}
                                                </span>
                                            </div>
                                        )}

                                        {/* <span className={`${embedded ? "text-sm" : "text-base"} text-primary whitespace-pre-line leading-loose`}>
                                            {listItem.name}
                                        </span> */}
                                        <div className="flex flex-col gap-2 pt-0.5">
                                            {listItem.name.split('\n').map((line, lineIndex) => (
                                                <span 
                                                    key={lineIndex} 
                                                    className={`${embedded ? "text-sm" : "text-base"} text-neutral-700 dark:text-neutral-600 font-medium leading-snug`}
                                                >
                                                    {line}
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )} */}
                    </motion.div>
                ))}
            </div>
            )}
        </motion.div>
    );
}
