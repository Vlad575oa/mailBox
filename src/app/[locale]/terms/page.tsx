import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/ui/FadeIn';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TermsOfService' });

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
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.online_store.title')}</h2>
                            <p>{t('sections.online_store.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.general.title')}</h2>
                            <p>{t('sections.general.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.accuracy.title')}</h2>
                            <p>{t('sections.accuracy.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.modifications.title')}</h2>
                            <p>{t('sections.modifications.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.products.title')}</h2>
                            <p>{t('sections.products.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.billing.title')}</h2>
                            <p>{t('sections.billing.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.tools.title')}</h2>
                            <p>{t('sections.tools.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.third_party.title')}</h2>
                            <p>{t('sections.third_party.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.comments.title')}</h2>
                            <p>{t('sections.comments.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.personal_info.title')}</h2>
                            <p>{t('sections.personal_info.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.errors.title')}</h2>
                            <p>{t('sections.errors.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.prohibited.title')}</h2>
                            <p>{t('sections.prohibited.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.disclaimer.title')}</h2>
                            <p>{t('sections.disclaimer.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.indemnification.title')}</h2>
                            <p>{t('sections.indemnification.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.severability.title')}</h2>
                            <p>{t('sections.severability.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.termination.title')}</h2>
                            <p>{t('sections.termination.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.agreement.title')}</h2>
                            <p>{t('sections.agreement.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.law.title')}</h2>
                            <p>{t('sections.law.content')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.changes.title')}</h2>
                            <p>{t('sections.changes.content')}</p>
                        </section>

                        <section className="bg-white/5 p-8 rounded-lg border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">{t('sections.contact_info.title')}</h2>
                            <p className="mb-0">{t('sections.contact_info.content')}</p>
                        </section>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
