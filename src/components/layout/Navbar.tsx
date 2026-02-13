import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { NavbarBackground } from './NavbarBackground';
import { WhatsAppAction } from './WhatsAppAction';

export async function Navbar() {
    const t = await getTranslations('Navbar');
    const tWA = await getTranslations('WhatsApp');

    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const isCatalogPage = pathname.includes('/catalog');

    const navItems = [
        { id: 'catalog', label: t('catalog'), href: '/catalog' },
        { id: 'about', label: t('about'), href: '/about' },
        { id: 'features', label: t('features'), href: '/features' },
        { id: 'faq', label: t('faq'), href: '/#faq' },
        { id: 'contact', label: t('contact'), href: '/contact' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full h-20">
            <NavbarBackground isCatalogPage={isCatalogPage} />

            <div className="w-full flex h-20 items-center justify-between px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-medium tracking-widest text-white">
                            FERRUM<span className="font-bold text-gradient-gold ml-1">DECOR</span>
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="hidden md:block relative text-lg font-medium tracking-wide transition-colors duration-300 group text-white hover:text-gradient-gold"
                    >
                        {t('home')}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <nav className="flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="relative text-lg font-medium tracking-wide transition-colors duration-300 group text-white hover:text-gradient-gold"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="h-6 w-px bg-white/10"></div>

                    <div className="flex items-center gap-6">
                        <WhatsAppAction
                            tooltip={tWA('tooltip')}
                            privacyLabel={tWA('privacy_link')}
                            greeting={tWA('greeting')}
                            placement="desktop"
                        />
                        <LanguageSwitcher isScrolled={true} />
                    </div>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <WhatsAppAction
                        tooltip={tWA('tooltip')}
                        privacyLabel={tWA('privacy_link')}
                        greeting={tWA('greeting')}
                        placement="mobile"
                    />
                    <LanguageSwitcher isScrolled={true} />
                    <MobileMenu homeText={t('home')} navItems={navItems} />
                </div>
            </div>
        </header>
    );
}
