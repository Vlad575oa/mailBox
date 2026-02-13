import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/FadeIn';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    const baseUrl = 'https://ferrummail.com';
    const canonicalUrl = `${baseUrl}/${locale}/about`;

    const languages = {} as Record<string, string>;
    routing.locales.forEach(loc => {
        languages[loc] = `${baseUrl}/${loc}/about`;
    });

    const title = `${t('title_start')} ${t('title_end')} | FerrumDecor`;
    const description = `${t('intro')} ${t('specialization')}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ...languages,
                'x-default': `${baseUrl}/de/about`
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'FerrumDecor',
            images: [
                {
                    url: `${baseUrl}/images/product-10.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'About FerrumDecor',
                }
            ],
            locale: locale === 'de' ? 'de_DE' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${baseUrl}/images/product-10.jpg`],
        }
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <main className="min-h-screen bg-[#09090b] text-white pt-32 pb-20">
            <div className="container mx-auto px-6">
                <Breadcrumbs locale={locale} />
                <FadeIn delay={0.2}>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight mb-8 leading-[1.1]">
                            {t('title_start')} <span className="text-gradient-gold font-serif italic">{t('title_end')}</span>
                        </h1>
                    </div>
                </FadeIn>

                <div className="max-w-5xl mx-auto">
                    <FadeIn delay={0.3}>
                        <section className="relative p-10 md:p-14 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-12 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 space-y-8 text-lg md:text-xl font-light leading-relaxed text-white/80">
                                <p className="first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:text-[#C5A059] first-letter:mr-3 first-letter:float-left">
                                    {t('intro')}
                                </p>
                                <p>{t('specialization')}</p>
                            </div>
                        </section>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <FadeIn delay={0.4}>
                            <section className="h-full p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A059]/30 transition-all duration-500 group">
                                <h3 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-[#C5A059] group-hover:text-gradient-gold transition-colors">
                                    {t('philosophy_title')}
                                </h3>
                                <p className="text-lg font-light leading-relaxed text-white/70">
                                    {t('philosophy_text')}
                                </p>
                            </section>
                        </FadeIn>

                        <FadeIn delay={0.5}>
                            <section className="h-full p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A059]/30 transition-all duration-500 group">
                                <h3 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-[#C5A059] group-hover:text-gradient-gold transition-colors">
                                    {t('products_title')}
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        t('products_list.mailboxes'),
                                        t('products_list.hatches'),
                                        t('products_list.vents')
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-lg font-light text-white/70">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.6}>
                        <section className="p-10 md:p-14 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-12 group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="grid md:grid-cols-2 gap-12 relative z-10">
                                <div>
                                    <h3 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-[#C5A059]">
                                        {t('approach_title')}
                                    </h3>
                                    <div className="space-y-6 text-lg font-light leading-relaxed text-white/70">
                                        <p>{t('approach_text')}</p>
                                        <p>{t('quality_text')}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-[#C5A059]/5 border border-[#C5A059]/10">
                                    <h3 className="text-xl font-serif italic text-gradient-gold mb-4">
                                        {t('global_title')}
                                    </h3>
                                    <p className="text-lg font-light text-white/60">
                                        {t('global_text')}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeIn>
                </div>

                {/* Decorative background elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C5A059]/5 blur-[120px] rounded-full opacity-50" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#BF953F]/5 blur-[120px] rounded-full opacity-50" />
                </div>
            </div>
        </main>
    );
}
