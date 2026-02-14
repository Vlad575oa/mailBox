import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { HeroCTA } from './HeroCTA';
import { HeroProductGrid } from './HeroProductGrid';

export async function Hero() {
    const t = await getTranslations('Hero');
    const tWA = await getTranslations('WhatsApp');

    return (
        <>
            <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#09090b] flex items-center py-20 lg:py-24">

                {/* Background Image - Art Direction using picture to avoid double loading */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#09090b]/50 z-[2]" />

                    <picture>
                        <source media="(max-width: 767px)" srcSet="/images/bg_hero_mobile.webp" />
                        <Image
                            src="/images/hero-bg-modern.webp"
                            alt="Premium Mailbox"
                            fill
                            priority
                            fetchPriority="high"
                            quality={70}
                            className="object-cover"
                            sizes="100vw"
                        />
                    </picture>
                </div>

                <div className="w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">

                        {/* LEFT SIDE: Compact 4x4 Catalog Grid (Shown only on Desktop via CSS) */}
                        <div className="hidden lg:block lg:col-span-12 xl:col-span-5 order-2 lg:order-1 px-[5px] lg:pl-[160px] lg:pr-0">
                            <HeroProductGrid />
                        </div>

                        {/* RIGHT SIDE: Main Content */}
                        <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 text-center lg:text-left pl-0 lg:pl-40 pr-6">

                            <div>
                                <h1 className="text-[38px] md:text-[50px] lg:text-[62px] font-thin tracking-tight text-white mb-8 leading-[1.1]">
                                    {t('title_start')} <br />
                                    <span className="font-serif italic text-gradient-gold">
                                        {t('title_end')}
                                    </span>
                                </h1>
                            </div>

                            <div>
                                <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed mb-10 text-balance">
                                    {t('description')}
                                </p>
                            </div>

                            {/* Stats */}
                            <div>
                                <div className="flex items-center justify-center lg:justify-start gap-12 opacity-80 mb-12 text-white">
                                    <div className="flex flex-col items-center lg:items-start gap-1">
                                        <div className="text-3xl font-serif">{t('stats.exp_value')}</div>
                                        <div className="text-[11px] uppercase tracking-wider text-white/50">{t('stats.exp_label')}</div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/10" />
                                    <div className="flex flex-col items-center lg:items-start gap-1">
                                        <div className="text-3xl font-serif">{t('stats.shipping_value')}</div>
                                        <div className="text-[11px] uppercase tracking-wider text-white/50">{t('stats.shipping_label')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* New Features List */}
                            <div>
                                <div className="space-y-8 mb-12 text-left pl-6 md:pl-0">
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-1">{t('new_features.materials_title')}</h3>
                                        <p className="text-white/70 font-light text-base">{t('new_features.materials_desc')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-1">{t('new_features.customization_title')}</h3>
                                        <p className="text-white/70 font-light text-base">{t('new_features.customization_desc')}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-1">{t('new_features.durability_title')}</h3>
                                        <p className="text-white/70 font-light text-base">{t('new_features.durability_desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <HeroCTA
                                    ctaLine1={t('cta_hero_line1')}
                                    ctaLine2={t('cta_hero_line2')}
                                    whatsappGreeting={tWA('greeting')}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>
            </section>

            {/* Mobile Grid Section */}
            <section className="bg-[#09090b] px-4 pb-16 pt-0 lg:hidden font-sans">
                <HeroProductGrid />
            </section>
        </>
    );
}
