import { FaShieldAlt, FaFeather, FaHammer, FaRecycle, FaGlobe, FaTruck, FaUserEdit, FaDraftingCompass } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Image from 'next/image';

export function Benefits() {
    const t = useTranslations('Benefits');

    const features = [
        {
            key: 'production',
            icon: FaHammer,
            title: t('items.production.title'),
            description: t('items.production.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        },
        {
            key: 'design',
            icon: FaDraftingCompass,
            title: t('items.design.title'),
            description: t('items.design.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        },
        {
            key: 'materials',
            icon: FaRecycle,
            title: t('items.materials.title'),
            description: t('items.materials.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        },
        {
            key: 'durability',
            icon: FaShieldAlt,
            title: t('items.durability.title'),
            description: t('items.durability.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        },
        {
            key: 'personalization',
            icon: FaUserEdit,
            title: t('items.personalization.title'),
            description: t('items.personalization.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null // Icon focused
        },
        {
            key: 'international',
            icon: FaGlobe,
            title: t('items.international.title'),
            description: t('items.international.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        },
        {
            key: 'delivery',
            icon: FaTruck,
            title: t('items.delivery.title'),
            description: t('items.delivery.description'),
            className: "md:col-span-1 md:row-span-1",
            image: null
        }
    ];

    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-16 max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-2 block">{t('badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-[#1A1A1A] mb-6">
                            {t('title_start')} <span className="font-serif italic text-gradient-gold">{t('title_end')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-xl text-[#666666] font-light leading-relaxed max-w-2xl mx-auto mb-12">
                            {t('subtitle')}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] mb-24">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={0.1 * index} className={clsx("h-full relative group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-all duration-300 p-8 flex flex-col justify-between", feature.className)}>
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 bg-[#C5A059]/10 text-[#C5A059]">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-wide text-[#1A1A1A]">
                                    {feature.title}
                                </h3>
                                <p className="font-light leading-relaxed text-sm text-[#666666]">
                                    {feature.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn>
                    <div className="bg-[#F9F9F7] rounded-3xl p-8 md:p-16 text-center">
                        <h3 className="text-3xl font-thin tracking-tight text-[#1A1A1A] mb-6">
                            {t('mission.title')}
                        </h3>
                        <p className="text-xl text-[#666666] font-light leading-relaxed max-w-3xl mx-auto mb-12">
                            {t('mission.text')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {['quality', 'design', 'reliability', 'individual', 'service'].map((value) => (
                                <div key={value} className="flex items-center gap-2 text-[#1A1A1A] font-medium">
                                    <span className="text-[#C5A059]">✔</span> {t(`values.${value}`)}
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
