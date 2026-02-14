'use client';

import { ReactNode, useEffect } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window;

        if (isMobile) return;

        // Dynamically import Lenis to reduce initial bundle size
        const initSmoothScroll = async () => {
            const { default: Lenis } = await import('lenis');

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            const frameId = requestAnimationFrame(raf);

            return () => {
                cancelAnimationFrame(frameId);
                lenis.destroy();
            };
        };

        const cleanupPromise = initSmoothScroll();

        return () => {
            cleanupPromise.then(cleanup => cleanup && cleanup());
        };
    }, []);

    return <>{children}</>;
}
