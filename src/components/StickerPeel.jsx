import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './StickerPeel.css';

gsap.registerPlugin(Draggable);

const StickerPeel = ({
    imageSrc,
    rotate = 30,
    peelBackHoverPct = 30,
    peelBackActivePct = 40,
    peelEasing = 'power3.out',
    peelHoverEasing = 'power2.out',
    width = 200,
    shadowIntensity = 0.6,
    lightingIntensity = 0.1,
    initialPosition = 'center',
    peelDirection = 0,
    className = '',
    exclusionRef = null,
    exclusionPadding = 20
}) => {
    const containerRef = useRef(null);
    const dragTargetRef = useRef(null);
    const pointLightRef = useRef(null);
    const pointLightFlippedRef = useRef(null);
    const draggableInstanceRef = useRef(null);

    const defaultPadding = 10;

    useEffect(() => {
        const target = dragTargetRef.current;
        if (!target) return;

        let startX = 0,
            startY = 0;

        if (initialPosition === 'center') {
            return;
        }

        if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {
            startX = initialPosition.x;
            startY = initialPosition.y;
        }

        gsap.set(target, { x: startX, y: startY });
    }, [initialPosition]);

    useEffect(() => {
        const target = dragTargetRef.current;
        const boundsEl = target.parentNode;

        // Helper function to check collision with exclusion zone
        const checkCollision = () => {
            if (!exclusionRef?.current) return null;

            const stickerRect = target.getBoundingClientRect();
            const exclusionRect = exclusionRef.current.getBoundingClientRect();
            const padding = exclusionPadding;

            // Expand exclusion zone by padding
            const excludeLeft = exclusionRect.left - padding;
            const excludeRight = exclusionRect.right + padding;
            const excludeTop = exclusionRect.top - padding;
            const excludeBottom = exclusionRect.bottom + padding;

            // Check if sticker overlaps with exclusion zone
            const overlapsX = stickerRect.right > excludeLeft && stickerRect.left < excludeRight;
            const overlapsY = stickerRect.bottom > excludeTop && stickerRect.top < excludeBottom;

            if (overlapsX && overlapsY) {
                // Calculate center points
                const stickerCenterX = stickerRect.left + stickerRect.width / 2;
                const stickerCenterY = stickerRect.top + stickerRect.height / 2;
                const exclusionCenterX = exclusionRect.left + exclusionRect.width / 2;
                const exclusionCenterY = exclusionRect.top + exclusionRect.height / 2;

                // Calculate push direction
                const dx = stickerCenterX - exclusionCenterX;
                const dy = stickerCenterY - exclusionCenterY;

                // Calculate how much to push based on overlap
                let pushX = 0;
                let pushY = 0;

                if (Math.abs(dx) > Math.abs(dy)) {
                    // Push horizontally
                    if (dx > 0) {
                        pushX = excludeRight - stickerRect.left;
                    } else {
                        pushX = excludeLeft - stickerRect.right;
                    }
                } else {
                    // Push vertically
                    if (dy > 0) {
                        pushY = excludeBottom - stickerRect.top;
                    } else {
                        pushY = excludeTop - stickerRect.bottom;
                    }
                }

                return { pushX, pushY };
            }

            return null;
        };

        draggableInstanceRef.current = Draggable.create(target, {
            type: 'x,y',
            bounds: boundsEl,
            inertia: true,
            onDrag() {
                const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
                gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });
            },
            onDragEnd() {
                const rotationEase = 'power2.out';
                const duration = 0.8;
                gsap.to(target, { rotation: 0, duration, ease: rotationEase });

                // Check collision after drag ends and push away if needed
                const collision = checkCollision();
                if (collision) {
                    const currentX = gsap.getProperty(target, 'x');
                    const currentY = gsap.getProperty(target, 'y');
                    gsap.to(target, {
                        x: currentX + collision.pushX,
                        y: currentY + collision.pushY,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            }
        })[0];

        // Helper to apply collision push
        const applyCollisionPush = () => {
            const collision = checkCollision();
            if (collision) {
                const currentX = gsap.getProperty(target, 'x');
                const currentY = gsap.getProperty(target, 'y');
                gsap.to(target, {
                    x: currentX + collision.pushX,
                    y: currentY + collision.pushY,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        };

        // Check collision on initial load (with small delay to ensure layout is ready)
        const initialCheckTimeout = setTimeout(() => {
            applyCollisionPush();
        }, 100);

        const handleResize = () => {
            if (draggableInstanceRef.current) {
                draggableInstanceRef.current.update();

                const currentX = gsap.getProperty(target, 'x');
                const currentY = gsap.getProperty(target, 'y');

                const boundsRect = boundsEl.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();

                const maxX = boundsRect.width - targetRect.width;
                const maxY = boundsRect.height - targetRect.height;

                const newX = Math.max(0, Math.min(currentX, maxX));
                const newY = Math.max(0, Math.min(currentY, maxY));

                if (newX !== currentX || newY !== currentY) {
                    gsap.to(target, {
                        x: newX,
                        y: newY,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: applyCollisionPush
                    });
                } else {
                    // Still check collision even if bounds didn't change
                    applyCollisionPush();
                }
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            clearTimeout(initialCheckTimeout);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            if (draggableInstanceRef.current) {
                draggableInstanceRef.current.kill();
            }
        };
    }, [exclusionRef, exclusionPadding]);

    useEffect(() => {
        const updateLight = e => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(pointLightRef.current, { attr: { x, y } });

            const normalizedAngle = Math.abs(peelDirection % 360);
            if (normalizedAngle !== 180) {
                gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
            } else {
                gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', updateLight);
            return () => container.removeEventListener('mousemove', updateLight);
        }
    }, [peelDirection]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = () => {
            container.classList.add('touch-active');
        };

        const handleTouchEnd = () => {
            container.classList.remove('touch-active');
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, []);

    const cssVars = useMemo(
        () => ({
            '--sticker-rotate': `${rotate}deg`,
            '--sticker-p': `${defaultPadding}px`,
            '--sticker-peelback-hover': `${peelBackHoverPct}%`,
            '--sticker-peelback-active': `${peelBackActivePct}%`,
            '--sticker-peel-easing': peelEasing,
            '--sticker-peel-hover-easing': peelHoverEasing,
            '--sticker-width': `${width}px`,
            '--sticker-shadow-opacity': shadowIntensity,
            '--sticker-lighting-constant': lightingIntensity,
            '--peel-direction': `${peelDirection}deg`
        }),
        [
            rotate,
            peelBackHoverPct,
            peelBackActivePct,
            peelEasing,
            peelHoverEasing,
            width,
            shadowIntensity,
            lightingIntensity,
            peelDirection
        ]
    );

    return (
        <div className={`draggable ${className}`} ref={dragTargetRef} style={cssVars}>
            <svg width="0" height="0">
                <defs>
                    <filter id="pointLight">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feSpecularLighting
                            result="spec"
                            in="blur"
                            specularExponent="100"
                            specularConstant={lightingIntensity}
                            lightingColor="white"
                        >
                            <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
                        </feSpecularLighting>
                        <feComposite in="spec" in2="SourceGraphic" result="lit" />
                        <feComposite in="lit" in2="SourceAlpha" operator="in" />
                    </filter>

                    <filter id="pointLightFlipped">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feSpecularLighting
                            result="spec"
                            in="blur"
                            specularExponent="100"
                            specularConstant={lightingIntensity * 7}
                            lightingColor="white"
                        >
                            <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
                        </feSpecularLighting>
                        <feComposite in="spec" in2="SourceGraphic" result="lit" />
                        <feComposite in="lit" in2="SourceAlpha" operator="in" />
                    </filter>

                    <filter id="dropShadow">
                        <feDropShadow
                            dx="2"
                            dy="4"
                            stdDeviation={3 * shadowIntensity}
                            floodColor="black"
                            floodOpacity={shadowIntensity}
                        />
                    </filter>

                    <filter id="expandAndFill">
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
                        <feFlood floodColor="rgb(179,179,179)" result="flood" />
                        <feComposite operator="in" in="flood" in2="shape" />
                    </filter>
                </defs>
            </svg>

            <div className="sticker-container" ref={containerRef}>
                <div className="sticker-main">
                    <div className="sticker-lighting">
                        <img
                            src={imageSrc}
                            alt=""
                            className="sticker-image"
                            draggable="false"
                            onContextMenu={e => e.preventDefault()}
                        />
                    </div>
                </div>

                <div className="flap">
                    <div className="flap-lighting">
                        <img
                            src={imageSrc}
                            alt=""
                            className="flap-image"
                            draggable="false"
                            onContextMenu={e => e.preventDefault()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickerPeel;
