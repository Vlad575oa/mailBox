'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/FadeIn';

export default function PrivacyPolicyPage() {
    const t = useTranslations('PrivacyPolicy');

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 mb-12">{t('last_updated')}</p>

                    <div className="prose prose-invert prose-lg max-w-none space-y-12 text-gray-300">
                        <p className="text-lg leading-relaxed">{t('intro')}</p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.changes.title')}</h2>
                            <p>{t('sections.changes.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.collection.title')}</h2>
                            <p>{t('sections.collection.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.types.title')}</h2>
                            <p>{t('sections.types.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.direct_info.title')}</h2>
                            <p>{t('sections.direct_info.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.usage_info.title')}</h2>
                            <p>{t('sections.usage_info.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.third_party_info.title')}</h2>
                            <p>{t('sections.third_party_info.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.usage_purpose.title')}</h2>
                            <p>{t('sections.usage_purpose.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.cookies.title')}</h2>
                            <p>{t('sections.cookies.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.disclosure.title')}</h2>
                            <p>{t('sections.disclosure.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.children.title')}</h2>
                            <p>{t('sections.children.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.security.title')}</h2>
                            <p>{t('sections.security.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.rights.title')}</h2>
                            <p>{t('sections.rights.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.whatsapp.title')}</h2>
                            <p>{t('sections.whatsapp.content')}</p>
                            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:text-[#C5A059]/80 underline transition-colors">
                                {t('sections.whatsapp.link_text')}
                            </a>
                        </section>

                        <section className="bg-white/5 p-8 rounded-lg border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.contact.title')}</h2>
                            <p className="mb-0">{t('sections.contact.content')}</p>
                        </section>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
