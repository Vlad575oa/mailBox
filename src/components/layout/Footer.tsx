'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer id="contact" className="bg-gray-950 text-white border-t border-white/5 pt-12 pb-8">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid gap-12 md:grid-cols-2 mb-12">
                    <div className="md:col-span-1">
                        <FadeIn>
                            <div className="text-2xl font-bold tracking-tighter text-white mb-6">
                                Ferrum<span className="text-gradient-gold">Decor</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {t('slogan')}
                            </p>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/ferrumdecorstudio?igsh=MW15enhuYzVoOW1kNQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all text-gray-400 group/icon">
                                    <FaInstagram size={18} className="group-hover/icon:scale-110 transition-transform" />
                                </a>
                                <a href="https://ru.pinterest.com/kushpick0173/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all text-gray-400 group/icon">
                                    <FaPinterest size={18} className="group-hover/icon:scale-110 transition-transform" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="md:justify-self-end">
                        <FadeIn delay={0.2}>
                            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-widest">{t('links.support')}</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="/#faq" className="hover:text-[#C5A059] transition-colors">FAQ</a></li>
                                <li><Link href="/contact" className="hover:text-[#C5A059] transition-colors">{t('links.contact')}</Link></li>
                            </ul>
                        </FadeIn>
                    </div>
                </div>

                <FadeIn delay={0.4} className="mt-8 pt-6 border-t border-white/10 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>© {new Date().getFullYear()} {t('rights')}</div>

                    <div className="flex items-center gap-2 order-3 md:order-2">
                        <span className="text-gray-600 text-xs">{t('developed_by')}</span>
                        <a href="https://t.me/Vlad557" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/developer">
                            <Image
                                src="/images/Logo_Vlad.webp"
                                alt="Developer Logo"
                                width={24}
                                height={24}
                                className="rounded-full transition-all duration-300 brightness-0 invert-[0.3] group-hover/developer:invert group-hover/developer:brightness-100"
                            />
                        </a>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-gray-400">{t('links.terms')}</Link>
                        <Link href="/privacy" className="hover:text-gray-400">{t('links.privacy')}</Link>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
}
