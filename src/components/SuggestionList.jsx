import React from 'react';
import { clsx } from 'clsx';

const SuggestionList = ({ suggestions, onSelect }) => {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-8 uppercase">
                Choose Your Vibe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestions.map((option, index) => (
                    <div
                        key={index}
                        className="bg-white border-4 border-black p-6 flex flex-col justify-between hover:shadow-brutal-lg transition-all duration-200 cursor-pointer"
                        onClick={() => onSelect(option)}
                    >
                        <div>
                            <div className="bg-electric-yellow border-2 border-black inline-block px-3 py-1 font-bold text-sm mb-4">
                                OPTION {index + 1}
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-2 leading-tight">
                                {option.title}
                            </h3>
                            <p className="text-gray-600 font-medium mb-4 italic">
                                "{option.vibe}"
                            </p>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center border-t-2 border-black pt-4">
                                <span className="font-bold text-lg">{option.totalCost}</span>
                                <button
                                    className="bg-hot-pink text-white px-4 py-2 font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                                >
                                    view plan &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestionList;
