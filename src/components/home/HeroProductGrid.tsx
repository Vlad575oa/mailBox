import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';
import { getShimmerPlaceholder } from '@/lib/image-utils';

const products = productsData.slice(0, 16).map((item) => ({
    id: item.id,
    name: item.title,
    image: item.image,
}));

export function HeroProductGrid() {
    return (
        <div className="opacity-100">
            <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#C5A059]/20 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />

                <div className="relative bg-transparent sm:bg-white/50 backdrop-blur-sm rounded-none sm:rounded-2xl shadow-none sm:shadow-xl p-0 sm:p-3 border-0 sm:border border-white/50">
                    {/* Desktop: 4x4 Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {products.map((product, index) => (
                            <Link
                                key={product.id}
                                href={`/catalog?id=${product.id}`}
                                className="group block relative aspect-square overflow-hidden rounded-lg bg-[#F2F0EB] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority={index < 4}
                                    loading={index < 4 ? 'eager' : 'lazy'}
                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 15vw"
                                    quality={60}
                                    placeholder="blur"
                                    blurDataURL={getShimmerPlaceholder(100, 100)}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
