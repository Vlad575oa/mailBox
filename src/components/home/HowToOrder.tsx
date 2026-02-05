'use client';

import { FaMousePointer, FaPaintBrush, FaShippingFast } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function HowToOrder() {
    const t = useTranslations('HowToOrder');

    const steps = [
        {
            icon: FaMousePointer,
            title: t('step1_title'),
            description: t('step1_desc'),
            step: '01'
        },
        {
            icon: FaPaintBrush,
            title: t('step2_title'),
            description: t('step2_desc'),
            step: '02'
        },
        {
            icon: FaShippingFast,
            title: t('step3_title'),
            description: t('step3_desc'),
            step: '03'
        }
    ];

    return (
        <section id="how-to-order" className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-20">
                    <FadeIn>
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t('title')}
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="relative grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
                    {/* Connecting line for desktop */}
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gray-100 hidden md:block -z-10" />

                    {steps.map((item, index) => (
                        <FadeIn key={index} delay={index * 0.2}>
                            <div className="bg-white p-4">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-white border border-gray-100 shadow-xl mb-8 transform transition-transform hover:scale-110 hover:border-primary/20">
                                        <item.icon className="h-10 w-10 text-primary" />
                                        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-4 border-white">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed px-4">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
