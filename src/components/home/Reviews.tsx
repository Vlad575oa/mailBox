'use client';

import { FaStar } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function Reviews() {
    const t = useTranslations('Reviews');

    const reviews = [
        {
            name: 'Sarah M.',
            location: 'California, US',
            text: t('items.0.text'),
            rating: 5
        },
        {
            name: 'James L.',
            location: 'London, UK',
            text: t('items.1.text'),
            rating: 5
        },
        {
            name: 'Emily R.',
            location: 'Sydney, AU',
            text: t('items.2.text'),
            rating: 5
        }
    ];

    return (
        <section id="reviews" className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-20">
                    <FadeIn>
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            {t('title_start')} <span className="text-primary">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <FadeIn key={i} delay={0.1 * i} className="h-full">
                            <div className="h-full bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-primary/50 transition-colors">
                                <div className="flex gap-1 text-primary mb-6">
                                    {[...Array(review.rating)].map((_, mapIndex) => (
                                        <FaStar key={mapIndex} className="h-5 w-5" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-8 text-lg min-h-[80px]">
                                    &quot;{review.text}&quot;
                                </p>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-lg">{review.name}</span>
                                    <span className="text-sm text-gray-500">{review.location}</span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
