import { Hero } from '@/components/home/Hero';
import { Benefits } from '@/components/home/Benefits';
import { Catalog } from '@/components/home/Catalog';
import { HowToOrder } from '@/components/home/HowToOrder';
import { Reviews } from '@/components/home/Reviews';
import { FAQ } from '@/components/home/FAQ';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Benefits />
      <Catalog />
      <HowToOrder />
      <Reviews />
      <FAQ />
    </div>
  );
}
