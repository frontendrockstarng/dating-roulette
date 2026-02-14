import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { triggerConfetti } from '../utils/confetti'; // We'll implement this next

const SlotMachine = ({ isSpinning, onFinished, resultReady }) => {
    const [reels, setReels] = useState([0, 0, 0]); // Index of the symbol to show
    const [stopping, setStopping] = useState([false, false, false]); // State for each reel stopping

    const reel1 = ['🍽️ Dining', '🎭 Entertainment', '🎨 Creative', '🎮 Gaming', '🎵 Music'];
    const reel2 = ['❤️ Romance', '⭐ Exciting', '🔥 Passionate', '✨ Magical', '🎊 Celebration'];
    const reel3 = ['🌅 Sunrise', '🌆 Afternoon', '🌃 Evening', '🌙 Late Night', '⏰ All Day'];

    useEffect(() => {
        if (isSpinning) {
            // Reset state when spinning starts
            setStopping([false, false, false]);

            // Randomize results upfront (visual only here)
            const targetReels = [
                Math.floor(Math.random() * reel1.length),
                Math.floor(Math.random() * reel2.length),
                Math.floor(Math.random() * reel3.length)
            ];
            setReels(targetReels);
        }
    }, [isSpinning]);

    // Handle stopping sequence when result is ready
    useEffect(() => {
        if (isSpinning && resultReady) {
            const timers = [];

            // Start stopping sequence immediately when result is ready
            // Reel 1 stop
            timers.push(setTimeout(() => {
                setStopping(prev => [true, prev[1], prev[2]]);
            }, 0));

            // Reel 2 stop (500ms after reel 1)
            timers.push(setTimeout(() => {
                setStopping(prev => [true, true, prev[2]]);
            }, 500));

            // Reel 3 stop (500ms after reel 2)
            timers.push(setTimeout(() => {
                setStopping([true, true, true]);
                triggerConfetti();
                // Brief pause before transitioning to result to let user see "stopped" state
                setTimeout(() => {
                    if (onFinished) onFinished();
                }, 500);
            }, 1000));

            return () => timers.forEach(clearTimeout);
        }
    }, [isSpinning, resultReady, onFinished]);

    const renderReel = (symbols, index) => {
        const isReelStopping = stopping[index];
        const targetSymbolIndex = reels[index];

        return (
            <div className="relative w-24 md:w-32 h-32 bg-white border-4 border-black overflow-hidden flex items-center justify-center">
                {/* The "blurred" moving strip */}
                <div className={clsx(
                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500",
                    isSpinning && !isReelStopping ? "animate-[spinFast_0.2s_linear_infinite]" : "transform-none"
                )}>
                    {isSpinning && !isReelStopping ? (
                        // Blurry repeated symbols for motion effect
                        <div className="flex flex-col gap-8 opacity-50 blur-sm">
                            {symbols.map((s, i) => <div key={i} className="text-4xl">{s.split(' ')[0]}</div>)}
                            {symbols.map((s, i) => <div key={`dup-${i}`} className="text-4xl">{s.split(' ')[0]}</div>)}
                        </div>
                    ) : (
                        // Static stopped symbol
                        <div className="text-5xl md:text-6xl animate-[stopBounce_0.4s_ease-out]">
                            {symbols[targetSymbolIndex].split(' ')[0]}
                        </div>
                    )}
                </div>

                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
            </div>
        );
    };

    if (!isSpinning && !stopping[0]) {
        // Initial Static State (before first spin)
        return (
            <div className="flex justify-center gap-2 md:gap-4 p-4 bg-electric-yellow border-6 border-black shadow-brutal-lg max-w-md mx-auto">
                {renderReel(reel1, 0)}
                {renderReel(reel2, 1)}
                {renderReel(reel3, 2)}
            </div>
        );
    }

    return (
        <div className="flex justify-center gap-2 md:gap-4 p-4 bg-electric-yellow border-6 border-black shadow-brutal-lg max-w-md mx-auto">
            {renderReel(reel1, 0)}
            {renderReel(reel2, 1)}
            {renderReel(reel3, 2)}
        </div>
    );
};

export default SlotMachine;
