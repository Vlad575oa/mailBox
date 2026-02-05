'use client';

import { FaShieldAlt, FaFeather, FaHammer, FaRecycle } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function Benefits() {
    const t = useTranslations('Benefits');

    const features = [
        {
            icon: FaHammer,
            title: t('items.artisan.title'),
            description: t('items.artisan.description')
        },
        {
            icon: FaShieldAlt,
            title: t('items.element.title'),
            description: t('items.element.description')
        },
        {
            icon: FaRecycle,
            title: t('items.sustainable.title'),
            description: t('items.sustainable.description')
        },
        {
            icon: FaFeather,
            title: t('items.aesthetic.title'),
            description: t('items.aesthetic.description')
        }
    ];

    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-20">
                    <FadeIn>
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t('title_start')} <span className="text-primary">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={0.1 * index} direction="up" className="h-full">
                            <div className="group h-full p-8 rounded-[2rem] bg-gray-50 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2">
                                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white shadow-sm text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
