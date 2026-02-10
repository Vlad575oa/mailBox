'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState, useTransition } from 'react';
import { FaCheck } from 'react-icons/fa';

export function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'uk', label: 'Українська', flag: '🇺🇦' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'it', label: 'Italiano', flag: '🇮🇹' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
    ];

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-3 md:px-3 md:py-2 text-lg font-medium transition-all text-white hover:text-gradient-gold active:scale-95 min-h-[48px] md:min-h-0`}
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <span className="text-2xl md:text-xl">{currentLanguage.flag}</span>
                <span className="uppercase text-base md:text-lg">{locale}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black/20 md:bg-transparent"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 md:w-44 rounded-2xl md:rounded-lg bg-white shadow-2xl border border-gray-100 py-2 z-20 max-h-[70vh] overflow-y-auto">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => onSelectChange(lang.code)}
                                disabled={isPending || locale === lang.code}
                                className={`w-full flex items-center justify-between gap-3 px-5 py-4 md:py-3 text-base md:text-sm hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[56px] md:min-h-0 ${locale === lang.code
                                        ? 'font-bold text-primary bg-gray-50'
                                        : 'text-gray-700'
                                    }`}
                                aria-current={locale === lang.code ? 'true' : 'false'}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl md:text-xl">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </div>
                                {locale === lang.code && (
                                    <FaCheck className="text-primary text-sm" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
