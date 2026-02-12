import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/FadeIn';
import { FaInstagram, FaPinterest } from 'react-icons/fa';

export default function ContactPage() {
    const t = useTranslations('Contact');

    return (
        <main className="min-h-screen bg-[#09090b] text-white pt-32 pb-20">
            <FadeIn>
                <div className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight text-white mb-16 text-center">
                        {t('title')} <span className="text-gradient-gold font-serif italic">Ferrum Decor Studio</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 text-white">
                        <div className="space-y-8 bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm group hover:border-[#C5A059]/30 transition-all duration-500">
                            <div>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-[0.2em] text-[#C5A059]">{t('production_label')}</h3>
                                <p className="text-2xl font-light">{t('production_value')}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-[0.2em] text-[#C5A059]">{t('phone_label')}</h3>
                                <a href={`tel:${t('phone_value').replace(/\s/g, '')}`} className="text-2xl font-light hover:text-[#C5A059] transition-colors duration-300">
                                    {t('phone_value')}
                                </a>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-[0.2em] text-[#C5A059]">{t('email_label')}</h3>
                                <a href={`mailto:${t('email_value')}`} className="text-2xl font-light hover:text-[#C5A059] transition-colors duration-300 break-all">
                                    {t('email_value')}
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm flex-1 group hover:border-[#C5A059]/30 transition-all duration-500">
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-[0.2em] text-[#C5A059]">{t('geo_label')}</h3>
                                <p className="text-xl font-light leading-relaxed mb-8">{t('geo_value')}</p>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-[0.2em] text-[#C5A059]">{t('delivery_label')}</h3>
                                <p className="text-xl font-light leading-relaxed">{t('delivery_value')}</p>
                            </div>

                            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm group hover:border-[#C5A059]/30 transition-all duration-500">
                                <h3 className="text-sm font-bold mb-6 uppercase tracking-[0.2em] text-[#C5A059]">{t('social_label')}</h3>
                                <div className="flex gap-6">
                                    <a
                                        href={t('instagram_url')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 transition-all duration-300 group/icon"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram className="text-2xl group-hover/icon:text-[#C5A059] transition-colors" />
                                    </a>
                                    <a
                                        href={t('pinterest_url')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 transition-all duration-300 group/icon"
                                        aria-label="Pinterest"
                                    >
                                        <FaPinterest className="text-2xl group-hover/icon:text-[#C5A059] transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                        <p className="text-xl text-white/80 font-light">
                            {t('shop_notice')} <a href="https://ferrumdecorstudio.shop/" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] font-medium hover:underline">ferrumdecorstudio.shop</a>
                        </p>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C5A059]/5 blur-[120px] rounded-full opacity-50" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#BF953F]/5 blur-[120px] rounded-full opacity-50" />
                </div>
            </FadeIn>
        </main>
    );
}
