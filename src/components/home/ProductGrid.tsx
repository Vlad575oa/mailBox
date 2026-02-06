'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// Real Products from Book1.xlsx with product-1.jpg to product-16.jpg images
const products = [
    {
        id: 1,
        name: 'Corten Steel Lord of the Rings',
        price: '$359',
        image: '/images/product-1.jpg',
        colSpan: 'md:col-span-2',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-lord-of-the-rings-inspired-corten-postbox-unique-personalized-mail-box'
    },
    {
        id: 2,
        name: 'Custom Order Joe Edition',
        price: '$1,525',
        image: '/images/product-2.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-order-for-joe-custom-wall-mount-corten-steel-mailbox'
    },
    {
        id: 3,
        name: 'Modern Personalizable Corten',
        price: '$359',
        image: '/images/product-3.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-4'
    },
    {
        id: 4,
        name: 'Modern Colored Black Metal',
        price: '$359',
        image: '/images/product-4.jpg',
        colSpan: 'md:col-span-2',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-mailbox-modern-colored-black-metal-postbox-unique-personalized-mail-box-copy-1'
    },

    {
        id: 5,
        name: 'Pure Brass 100% Letter Box',
        price: '$949',
        image: '/images/product-5.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-mailbox-modern-wall-mount-100-brass-letter-box-unique-personalized-post-box-copy'
    },
    {
        id: 6,
        name: 'Brass Personalized Letter Box',
        price: '$949',
        image: '/images/product-6.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-letter-box-modern-wall-mount-brass-mailbox-unique-personalized-post-box-copy'
    },
    {
        id: 7,
        name: 'Corten Steel Modern Series',
        price: '$949',
        image: '/images/product-7.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-3'
    },

    {
        id: 8,
        name: 'Corten Steel Personalizable V2',
        price: '$359',
        image: '/images/product-8.jpg',
        colSpan: 'md:col-span-2',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-2'
    },
    {
        id: 9,
        name: 'Corten Steel Premium',
        price: '$399',
        image: '/images/product-9.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy-1'
    },

    {
        id: 10,
        name: 'Black Metal Modern Postbox',
        price: '$359',
        image: '/images/product-10.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-mailbox-modern-colored-black-metal-postbox-unique-personalized-mail-box-copy'
    },
    {
        id: 11,
        name: 'Corten Wall Mount Classic',
        price: '$229',
        image: '/images/product-11.jpg',
        colSpan: 'md:col-span-2',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box-copy'
    },

    {
        id: 12,
        name: 'Corten Steel Designer Edition',
        price: '$395',
        image: '/images/product-12.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-modern-personalizable-corten-postbox-unique-personalized-mail-box'
    },
    {
        id: 13,
        name: 'Merbau Wood Wall Mount',
        price: '$395',
        image: '/images/product-13.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/merbau-wall-mount-personalized-mailbox-copy'
    },
    {
        id: 14,
        name: 'Pure Brass Signature',
        price: '$395',
        image: '/images/product-14.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/pure-brass-personalized-mailbox-copy'
    },

    {
        id: 15,
        name: 'Brass Personalized Luxury',
        price: '$949',
        image: '/images/product-15.jpg',
        colSpan: 'md:col-span-1',
        url: 'https://ferrumdecorstudio.shop/products/bespoke-custom-built-wall-mount-cor-ten-steel-mailbox-copy'
    },
    {
        id: 16,
        name: 'Corten Personalized Wall Mount',
        price: '$445',
        image: '/images/product-16.jpg',
        colSpan: 'md:col-span-2',
        url: 'https://ferrumdecorstudio.shop/products/custom-wall-mount-cor-ten-steel-mailbox-copy'
    },
];

export function ProductGrid() {
    const t = useTranslations('ProductGrid');

    return (
        <section id="catalog" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-thin text-[#1A1A1A] mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-[#666666] max-w-lg mb-4 font-light">
                            {t('description')}
                        </p>
                        <div className="h-[1px] w-full bg-[#1A1A1A]/10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.6 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`group relative overflow-hidden rounded-sm bg-[#F9F9F7] ${product.colSpan}`}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <h3 className="text-2xl font-light text-white mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-white/80 italic font-serif mb-6">{product.price}</p>

                                <a href={product.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="gold" className="w-full">
                                        {t('buy_btn')}
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
