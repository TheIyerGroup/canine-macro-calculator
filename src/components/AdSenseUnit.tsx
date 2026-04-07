'use client';

import React, { useEffect } from 'react';

export default function AdSenseUnit() {
    useEffect(() => {
        try {
            // @ts-expect-error - adsbygoogle is injected globally by the AdSense script
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            // Silently ignore errors (e.g., 'adsbygoogle.push() error: All ins elements... already have ads in them')
            // This prevents console clutter during Next.js Hot Module Replacement / Strict Mode
        }
    }, []);

    return (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-stone-50 border border-stone-200 border-dashed rounded-xl overflow-hidden p-2">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: '100%' }}
                data-ad-client="ca-pub-1497376185782088"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
