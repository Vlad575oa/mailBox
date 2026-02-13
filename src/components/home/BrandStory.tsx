import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getShimmerPlaceholder } from '@/lib/image-utils';

export async function BrandStory() {
    const t = await getTranslations('ProductBento');

    return (
        <section id="brand-story" className="py-32 overflow-hidden bg-white relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                    {/* LEFT: Text & Details */}
                    <div className="order-1 md:order-1 space-y-10">
                        <div className="opacity-0 translate-x-[-20px] animate-[fadeIn_0.8s_ease-out_forwards]">
                            <h2 className="text-4xl md:text-6xl font-thin tracking-tight text-[#1A1A1A] mb-8">
                                {t('title')}
                            </h2>
                            <p className="text-2xl text-[#666666] leading-relaxed font-light mb-10">
                                {t('text')}
                            </p>

                            {/* Staggered Details List */}
                            <ul className="space-y-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 text-lg text-[#1A1A1A] opacity-0 translate-x-[-10px] animate-[fadeIn_0.6s_ease-out_forwards]"
                                        style={{ animationDelay: `${0.2 + (i * 0.15)}s` }}
                                    >
                                        <span className="w-12 h-[1px] bg-[#B89E72]"></span>
                                        {t(`details.${i}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Detail Image */}
                    <div className="order-2 md:order-2 relative opacity-0 translate-x-[20px] animate-[fadeIn_0.8s_ease-out_forwards]">
                        <div className="relative z-10">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl shadow-[#B89E72]/10">
                                <Image
                                    src="/images/brand-story-detail.webp"
                                    alt="Precision Engineering"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    placeholder="blur"
                                    blurDataURL={getShimmerPlaceholder(600, 800)}
                                />
                                <div className="absolute inset-0 bg-[#B89E72]/5 mix-blend-overlay" />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#F9F9F7] border border-[#B89E72]/20 z-0 -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}
