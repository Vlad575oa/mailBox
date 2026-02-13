import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaPinterest, FaWhatsapp, FaEtsy } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';

import { AnalyticsLink } from '@/components/ui/AnalyticsLink';

export async function Footer() {
    const t = await getTranslations('Footer');
    const tWA = await getTranslations('WhatsApp');

    const etsyUrl = "https://www.etsy.com/shop/FerrumDecorStudio?section_id=38776685";
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-gray-950 text-white border-t border-white/5 pt-8 pb-6 md:pt-12 md:pb-8">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid gap-12 md:grid-cols-2 mb-12">
                    <div className="md:col-span-1">
                        <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
                            <div className="text-2xl font-bold tracking-tighter text-white mb-6">
                                Ferrum<span className="text-gradient-gold">Decor</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {t('slogan')}
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {t('shop_notice')} <AnalyticsLink href="https://ferrumdecorstudio.shop/" target="_blank" rel="noopener noreferrer" event="ferrum_shop_footer" className="text-[#C5A059] hover:underline">ferrumdecorstudio.shop</AnalyticsLink>
                            </p>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/ferrumdecorstudio?igsh=MW15enhuYzVoOW1kNQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all text-gray-400 group/icon">
                                    <FaInstagram size={18} className="group-hover/icon:scale-110 transition-transform" />
                                </a>
                                <a href="https://ru.pinterest.com/kushpick0173/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all text-gray-400 group/icon">
                                    <FaPinterest size={18} className="group-hover/icon:scale-110 transition-transform" />
                                </a>
                                <AnalyticsLink href={etsyUrl} target="_blank" rel="noopener noreferrer" event="etsy_footer_icon" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D45305] hover:text-white transition-all text-gray-400 group/icon">
                                    <FaEtsy size={18} className="group-hover/icon:scale-110 transition-transform" />
                                </AnalyticsLink>
                                <div className="relative group/icon">
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-light tracking-wide shadow-xl opacity-0 translate-y-4 invisible transition-all duration-500 delay-[3000ms] group-hover/icon:opacity-100 group-hover/icon:translate-y-0 group-hover/icon:delay-0 group-hover/icon:visible w-64 text-center z-50 pointer-events-none group-hover/icon:pointer-events-auto">
                                        {tWA('tooltip')} <Link href="/privacy" className="underline hover:text-white font-medium transition-colors">{tWA('privacy_link')}</Link>
                                    </div>
                                    <AnalyticsLink href={`https://wa.me/380673814404?text=${encodeURIComponent(tWA('greeting'))}`} target="_blank" rel="noopener noreferrer" event="whatsapp_footer_icon" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-gray-400">
                                        <FaWhatsapp size={18} className="group-hover/icon:scale-110 transition-transform" />
                                    </AnalyticsLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:justify-self-end">
                        <div className="animate-[fadeIn_0.5s_ease-out_0.2s_forwards] opacity-0">
                            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-widest">{t('links.support')}</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="/#faq" className="hover:text-[#C5A059] transition-colors">FAQ</a></li>
                                <li><AnalyticsLink href={etsyUrl} target="_blank" rel="noopener noreferrer" event="etsy_footer_links" className="hover:text-[#C5A059] transition-colors">{t('links.etsy')}</AnalyticsLink></li>
                                <li><Link href="/contact" className="hover:text-[#C5A059] transition-colors">{t('links.contact')}</Link></li>
                                <li><a href="tel:+380673814404" className="hover:text-[#C5A059] transition-colors">+380 67 381 44 04</a></li>
                                <li><a href="mailto:ferrumdecorstudio@icloud.com" className="hover:text-[#C5A059] transition-colors">ferrumdecorstudio@icloud.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-600 text-sm animate-[fadeIn_0.5s_ease-out_0.4s_forwards] opacity-0">
                    {/* Mobile Layout */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {/* Copyright & Developer */}
                        <div className="space-y-2">
                            <div className="text-gray-500 text-xs">© {currentYear} {t('rights')}</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-gray-600 text-[10px]">{t('developed_by')}</span>
                                <a
                                    href="https://t.me/Vlad557"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 group/developer transition-transform active:scale-95"
                                >
                                    <Image
                                        src="/images/Logo_Vlad.webp"
                                        alt="Developer Logo"
                                        width={24}
                                        height={24}
                                        className="rounded-full opacity-40 group-hover/developer:opacity-100 transition-opacity"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* Links - Mobile - Horizontal Arrangement */}
                        <div className="flex items-center justify-center gap-6 mt-2">
                            <Link
                                href="/terms"
                                className="text-gray-500 hover:text-gray-300 active:text-[#C5A059] text-xs transition-colors"
                            >
                                {t('links.terms')}
                            </Link>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <Link
                                href="/privacy"
                                className="text-gray-500 hover:text-gray-300 active:text-[#C5A059] text-xs transition-colors"
                            >
                                {t('links.privacy')}
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex md:flex-row justify-between items-center gap-4">
                        <div>© {currentYear} {t('rights')}</div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs">{t('developed_by')}</span>
                            <a
                                href="https://t.me/Vlad557"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 group/developer"
                            >
                                <Image
                                    src="/images/Logo_Vlad.webp"
                                    alt="Developer Logo"
                                    width={28}
                                    height={28}
                                    className="rounded-full transition-all duration-300 opacity-30 hover:opacity-100 group-hover/developer:scale-110"
                                />
                            </a>
                        </div>

                        <div className="flex gap-6">
                            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">{t('links.terms')}</Link>
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">{t('links.privacy')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
