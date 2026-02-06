'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useTransition } from 'react';
import { FaGlobe } from 'react-icons/fa';

export function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ru', label: 'Русский' },
        { code: 'uk', label: 'Українська' },
        { code: 'de', label: 'Deutsch' },
        { code: 'fr', label: 'Français' },
        { code: 'it', label: 'Italiano' },
        { code: 'ja', label: '日本語' },
    ];

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            // Replace the locale in the pathname
            // /en/about -> /ru/about
            const segments = pathname.split('/');
            segments[1] = nextLocale;
            router.replace(segments.join('/'));
        });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors ${isScrolled ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'
                    }`}
            >
                <FaGlobe />
                <span className="uppercase">{locale}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-xl border border-gray-100 py-2 z-20">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => onSelectChange(lang.code)}
                                disabled={isPending}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${locale === lang.code ? 'font-bold text-primary' : 'text-gray-700'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
