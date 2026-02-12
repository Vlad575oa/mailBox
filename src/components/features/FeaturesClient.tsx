'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/FadeIn';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
    FaGem,
    FaUserCheck,
    FaDraftingCompass,
    FaShieldAlt,
    FaHandPaper,
    FaRocket,
    FaGlobeAmericas
} from 'react-icons/fa';

const iconMap = {
    materials: FaGem,
    personalization: FaUserCheck,
    design: FaDraftingCompass,
    security: FaShieldAlt,
    craftsmanship: FaHandPaper,
    speed: FaRocket,
    shipping: FaGlobeAmericas
};

export default function FeaturesClient({ locale }: { locale: string }) {
    const t = useTranslations('FeaturesPage');

    const featureKeys = [
        'materials',
        'personalization',
        'design',
        'security',
        'craftsmanship',
        'speed',
        'shipping'
    ];

    return (
        <main className="min-h-screen bg-[#09090b] text-white pt-32 pb-20">
            <div className="container mx-auto px-6">
                <Breadcrumbs locale={locale} />
                <FadeIn delay={0.2}>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight mb-8 leading-[1.1]">
                            <span className="text-gradient-gold font-serif italic">
                                {t('title')}
                            </span>
                        </h1>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureKeys.map((key, index) => {
                        const Icon = iconMap[key as keyof typeof iconMap];
                        return (
                            <FadeIn key={key} delay={0.1 * index}>
                                <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A059]/30 transition-all duration-500 h-full">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#BF953F] to-[#B38728] flex items-center justify-center mb-6 shadow-lg shadow-[#C5A059]/20 group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="text-black text-2xl" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-4 group-hover:text-gradient-gold transition-colors duration-300">
                                            {t(`items.${key}.title`)}
                                        </h3>

                                        <p className="text-white/60 font-light leading-relaxed">
                                            {t(`items.${key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* Decorative background elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C5A059]/5 blur-[120px] rounded-full opacity-50" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#BF953F]/5 blur-[120px] rounded-full opacity-50" />
                </div>
            </div>
        </main>
    );
}
