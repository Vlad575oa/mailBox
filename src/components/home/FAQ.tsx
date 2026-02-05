'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function FAQ() {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: t('items.shipping.question'),
            answer: t('items.shipping.answer')
        },
        {
            question: t('items.production.question'),
            answer: t('items.production.answer')
        },
        {
            question: t('items.corten.question'),
            answer: t('items.corten.answer')
        },
        {
            question: t('items.customization.question'),
            answer: t('items.customization.answer')
        }
    ];

    return (
        <section id="faq" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t('title_start')} <span className="text-primary">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.05} fullWidth>
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white border-primary/20 shadow-lg' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                                >
                                    <span className="font-bold text-lg text-gray-900 pr-8">{faq.question}</span>
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-primary transition-transform flex-shrink-0" />
                                    ) : (
                                        <FaChevronDown className="text-gray-400 transition-transform flex-shrink-0" />
                                    )}
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
