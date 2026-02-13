type GTMEvent = {
    event: string;
    [key: string]: any;
};

export const sendGTMEvent = (event: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event,
            ...data,
        });
    }
};

export const trackWhatsAppClick = (location: string) => {
    sendGTMEvent('whatsapp_click', {
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp',
        location: location
    });
};

export const trackEtsyClick = (location: string) => {
    sendGTMEvent('etsy_click', {
        event_category: 'Outbound',
        event_action: 'Click',
        event_label: 'Etsy Shop',
        location: location
    });
};

export const trackFerrumShopClick = (location: string) => {
    sendGTMEvent('ferrum_shop_click', {
        event_category: 'Outbound',
        event_action: 'Click',
        event_label: 'Ferrum Decor Shop',
        location: location
    });
};
