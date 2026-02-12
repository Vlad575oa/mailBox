export const sendGTMEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event: eventName,
            ...eventParams,
        });
    } else {
        console.warn(`GTM Not Initialized: ${eventName}`, eventParams);
    }
};
