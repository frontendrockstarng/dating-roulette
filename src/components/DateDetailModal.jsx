import React from 'react';
import { clsx } from 'clsx';
import Button from './Button';

const DateDetailModal = ({ datePlan, onClose, onSpinAgain }) => {
    if (!datePlan) return null;

    // handleViewPhotos removed as we now have per-activity photo links

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-black shadow-brutal-lg animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="sticky top-0 bg-electric-yellow border-b-4 border-black p-4 flex justify-between items-start z-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase leading-none">
                            {datePlan.title}
                        </h2>
                        <p className="font-bold text-lg mt-1">{datePlan.totalCost} ~ {datePlan.vibe}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-8">

                    {/* Info Block */}
                    <div className="bg-blue-100 border-2 border-black p-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div>
                                <p className="font-bold uppercase text-xs text-gray-500 mb-1">Main Location Info</p>
                                <p className="font-bold text-lg">{datePlan.address || 'Address not available'}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold uppercase text-xs text-gray-500 mb-1">Contact / Social</p>
                                <p className="font-medium text-blue-600">{datePlan.contact_hint || 'IG: @check_location'}</p>
                            </div>
                        </div>
                        {datePlan.highlight_review && (
                            <div className="mt-4 pt-4 border-t-2 border-black/10 italic text-gray-700">
                                "💬 {datePlan.highlight_review}"
                            </div>
                        )}
                    </div>

                    {/* Activities Timeline */}
                    <div>
                        <h3 className="font-black text-xl uppercase mb-4 border-b-4 border-black inline-block">The Plan</h3>
                        <div className="space-y-6 relative pl-4 border-l-4 border-black/20">
                            {datePlan.activities.map((item, i) => (
                                <div key={i} className="relative pl-6">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[26px] top-1 w-4 h-4 bg-hot-pink border-2 border-black rounded-full" />

                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                        <span className="font-black text-lg bg-black text-white px-2 py-0.5 min-w-[80px] text-center">{item.time}</span>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-black text-xl">{item.activity}</span>
                                                <button
                                                    onClick={() => {
                                                        const query = `${item.activity} ${datePlan.location || 'Lagos'} photos`;
                                                        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank');
                                                    }}
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200"
                                                    title="View photos on Google"
                                                >
                                                    <span>📷</span> Photos
                                                </button>
                                            </div>
                                            <span className="text-sm font-bold text-gray-500 block">({item.cost})</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-800 leading-relaxed border-l-2 border-black pl-3 py-1 bg-gray-50">
                                        {item.details}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    {datePlan.proTip && (
                        <div className="bg-purple-100 border-2 border-black p-4 flex gap-4 items-start">
                            <span className="text-2xl">💡</span>
                            <div>
                                <h4 className="font-black uppercase text-sm mb-1">Pro Tip</h4>
                                <p className="font-medium">{datePlan.proTip}</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-4 pt-4">
                        <Button
                            variant="primary"
                            onClick={() => alert('Saved to favorites! (Simulated)')}
                        >
                            ❤️ Save This Plan
                        </Button>
                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-100 border-t-4 border-black p-4 flex justify-between items-center text-sm font-bold">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black underline"
                    >
                        Back to options
                    </button>
                    <button
                        onClick={onSpinAgain}
                        className="text-hot-pink hover:text-black uppercase"
                    >
                        Spin Again ↻
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateDetailModal;
