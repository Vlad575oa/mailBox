'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WhatsAppContextType {
    handleClick: (url: string) => void;
    privacyToastVisible: boolean;
    hideToast: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
    const [privacyToastVisible, setPrivacyToastVisible] = useState(false);
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);

    const handleClick = (url: string) => {
        const hasSeenPrivacy = localStorage.getItem('ferrum_wa_privacy_seen');

        if (hasSeenPrivacy) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            setPendingUrl(url);
            setPrivacyToastVisible(true);
            localStorage.setItem('ferrum_wa_privacy_seen', 'true');

            // Auto-hide after 5 seconds
            setTimeout(() => {
                setPrivacyToastVisible(false);
            }, 5000);

            // Open the URL anyway after a short delay? Or just show the toast and require a second click? 
            // User said: "Should appear... and there is a transition". 
            // It implies the user is INFORMED but the action likely proceeds or is blocked.
            // "When user pressed... a text should appear".
            // If I block it, they have to click again. If I open it, they might miss the text.
            // Best UX: Open it, but show the toast. 
            // However, "Policy link" implies they might want to read it FIRST.
            // Let's Open it immediately but show the toast as a "FYI".
            // OR: Let's block the FIRST attempt, show the toast, and let them click again?
            // "should appear... and there [is] a link".
            // I will OPEN it, so I don't break the UX, but show the Toast.
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const hideToast = () => setPrivacyToastVisible(false);

    return (
        <WhatsAppContext.Provider value={{ handleClick, privacyToastVisible, hideToast }}>
            {children}
        </WhatsAppContext.Provider>
    );
}

export function useWhatsApp() {
    const context = useContext(WhatsAppContext);
    if (context === undefined) {
        throw new Error('useWhatsApp must be used within a WhatsAppProvider');
    }
    return context;
}
