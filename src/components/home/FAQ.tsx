import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { FAQClient } from './FAQClient';

export async function FAQ() {
    const t = await getTranslations('FAQ');

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
        },
        {
            question: t('items.brand.question'),
            answer: t('items.brand.answer')
        },
        {
            question: t('items.history.question'),
            answer: t('items.history.answer')
        }
    ];

    return (
        <section id="faq" className="relative py-24 bg-gray-50">
            <Image
                src="/images/backFAQ.webp"
                alt="FAQ Background"
                fill
                className="object-cover opacity-60"
                quality={90}
                sizes="100vw"
            />
            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        {t('title_start')} <span className="text-[#C5A059]">{t('title_end')}</span>
                    </h2>
                </div>

                <FAQClient faqs={faqs} />

                <div className="text-center mt-12">
                    <p className="mt-4 text-xl text-black max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                    <p className="mt-4 text-sm text-black">
                        {t('main_shop_note')} <a href="https://ferrumdecorstudio.shop/" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline">ferrumdecorstudio.shop</a>
                    </p>
                </div>

                {/* FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: faqs.map(faq => ({
                                '@type': 'Question',
                                name: faq.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: faq.answer
                                }
                            }))
                        })
                    }}
                />
            </div>
        </section>
    );
}
