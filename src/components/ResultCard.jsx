import React from 'react';
import Button from './Button';
import { Share2, RotateCcw, Save } from 'lucide-react';
import { shareDate } from '../utils/share';
import { saveDateIdea } from '../utils/localStorage';

const ResultCard = ({ data, onSpinAgain, onShareSuccess, onSaveSuccess }) => {
    if (!data) return null;

    const handleShare = async () => {
        const result = await shareDate(data);
        if (result.success) onShareSuccess(result.method);
    };

    const handleSave = () => {
        const saved = saveDateIdea(data);
        if (saved) onSaveSuccess();
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 result-enter">
            <div className="bg-cream border-6 border-black shadow-brutal-lg p-6 md:p-8 relative">
                {/* Header */}
                <div className="bg-hot-pink/10 border-b-4 border-black p-4 -mx-6 -mt-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-2">
                        🎰 {data.title}
                    </h2>
                    <p className="font-bold text-gray-700 font-display">
                        📍 {data.location} | 💰 {data.budget} (~${data.totalCost})
                    </p>
                </div>

                {/* Activities */}
                <div className="space-y-6">
                    {data.activities.map((item, index) => (
                        <div key={index} className="bg-white border-3 border-black shadow-[4px_4px_0px_#00D4FF] p-4">
                            <div className="flex items-baseline justify-between mb-1">
                                <span className="font-bold font-display text-lg text-bright-magenta">
                                    ⏰ {item.time}
                                </span>
                                <span className="font-bold text-sm bg-black text-white px-2 py-0.5 rounded-none">
                                    ACTIVITY {index + 1}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{item.activity}</h3>
                            {item.cost && (
                                <p className="font-bold text-green-700 mb-2">
                                    💸 Est: {item.cost}
                                </p>
                            )}
                            <p className="text-gray-700 leading-relaxed border-l-4 border-electric-yellow pl-3 mb-3">
                                {item.details}
                            </p>
                            <a
                                href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(item.activity + ' ' + data.location + ' ' + 'photos')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm font-bold text-blue-600 hover:text-blue-800 underline hover:no-underline"
                            >
                                📸 View Photos
                            </a>
                        </div>
                    ))}
                </div>

                {/* Pro Tip */}
                <div className="mt-8 bg-electric-yellow/20 border-t-4 border-black pt-4 pb-2">
                    <p className="font-medium text-lg flex gap-2">
                        <span>✨</span>
                        <span><span className="font-bold">Pro Tip:</span> {data.proTip}</span>
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Button onClick={onSpinAgain} className="flex-1 bg-electric-yellow text-black border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-hover">
                        <RotateCcw className="w-4 h-4 mr-2" /> Spin Again
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-sky-blue text-black border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-hover">
                        <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button onClick={handleShare} className="flex-1 bg-coral text-white border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-hover">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
