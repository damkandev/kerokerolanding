'use client';

import { useEffect, useRef } from 'react';

export default function PlyrVideo({ videoId }) {
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        // Dynamically load Plyr CSS
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.plyr.io/3.7.8/plyr.css';
        document.head.appendChild(linkElement);

        // Dynamically load Plyr JS
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://cdn.plyr.io/3.7.8/plyr.polyfilled.js';
        scriptElement.async = true;

        scriptElement.onload = () => {
            if (containerRef.current && window.Plyr) {
                playerRef.current = new window.Plyr(containerRef.current, {
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                });
            }
        };

        document.body.appendChild(scriptElement);

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
            document.head.removeChild(linkElement);
            document.body.removeChild(scriptElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="plyr__video-embed"
            data-plyr-provider="youtube"
            data-plyr-embed-id={videoId}
        />
    );
}
