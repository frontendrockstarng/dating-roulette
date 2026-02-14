import React from 'react';

const Header = () => {
    return (
        <header className="w-full bg-hot-pink border-b-6 border-black shadow-brutal-lg mb-8 relative z-10">
            <div className="container mx-auto px-4 h-24 md:h-32 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left">
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-md">
                        🎰 Date Night Roulette
                    </h1>
                    <p className="text-white font-bold text-sm md:text-lg mt-1 font-display tracking-wide">
                        Spin for your perfect night out
                    </p>
                </div>

                {/* Optional: Add Saved Dates link or other nav items here */}
            </div>
        </header>
    );
};

export default Header;
