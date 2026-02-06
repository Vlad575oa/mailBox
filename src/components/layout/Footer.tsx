'use client';

import { FaInstagram, FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer id="contact" className="bg-gray-950 text-white border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid gap-12 md:grid-cols-4 mb-16">
                    <div className="md:col-span-1">
                        <FadeIn>
                            <div className="text-2xl font-bold tracking-tighter text-white mb-6">
                                Ferrum<span className="text-primary">Decor</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {t('slogan')}
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                                    <FaInstagram size={18} />
                                </a>
                                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                                    <FaFacebook size={18} />
                                </a>
                                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                                    <FaPinterest size={18} />
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                    <div>
                        <FadeIn delay={0.1}>
                            <h4 className="font-bold text-lg mb-6 text-white">{t('links.shop')}</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('links.corten')}</a></li>
                                <li><a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('links.brass')}</a></li>
                                <li><a href="https://ferrumdecorstudio.shop/collections/mail-boxes" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('links.custom')}</a></li>
                            </ul>
                        </FadeIn>
                    </div>

                    <div>
                        <FadeIn delay={0.2}>
                            <h4 className="font-bold text-lg mb-6 text-white">{t('links.support')}</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#how-to-order" className="hover:text-primary transition-colors">{t('links.how_to')}</a></li>
                                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                                <li><a href="#contact" className="hover:text-primary transition-colors">{t('links.contact')}</a></li>
                            </ul>
                        </FadeIn>
                    </div>

                    <div>
                        <FadeIn delay={0.3}>
                            <h4 className="font-bold text-lg mb-6 text-white">{t('newsletter_title')}</h4>
                            <p className="text-gray-400 text-sm mb-4">
                                {t('newsletter_desc')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary w-full transition-all"
                                />
                                <button className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap">
                                    {t('subscribe')}
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <FadeIn delay={0.4} className="mt-12 pt-8 border-t border-white/10 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>© {new Date().getFullYear()} {t('rights')}</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-400">{t('links.terms')}</a>
                        <a href="#" className="hover:text-gray-400">{t('links.privacy')}</a>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
}
