export function HeroSkeleton() {
    return (
        <section className="relative min-h-[90vh] w-full bg-[#09090b] animate-pulse">
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10 py-32">
                <div className="max-w-3xl">
                    <div className="h-20 w-3/4 bg-white/5 rounded-lg mb-8" />
                    <div className="h-6 w-full bg-white/5 rounded-lg mb-4" />
                    <div className="h-6 w-5/6 bg-white/5 rounded-lg mb-12" />
                    <div className="h-14 w-64 bg-white/5 rounded-full" />
                </div>
            </div>
        </section>
    );
}
