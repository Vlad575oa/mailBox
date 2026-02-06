import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { ProductBento } from '@/components/home/ProductBento';
import { Reviews } from '@/components/home/Reviews';
import { FAQ } from '@/components/home/FAQ';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#F9F9F7]">
      <Hero />
      <BrandStory />
      <Reviews />
      <FAQ />
    </div>
  );
}
