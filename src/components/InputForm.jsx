import React, { useState } from 'react';
import Button from './Button';
import { MapPin, DollarSign, Sparkles, Utensils } from 'lucide-react';
import { clsx } from 'clsx';

const InputForm = ({ onSpin }) => {
    const [formData, setFormData] = useState({
        city: '',
        budget: '₦50,000',
        vibe: '',
        dietary: ''
    });

    const [errors, setErrors] = useState({});

    // budgetOptions removed in favor of slider

    const vibeOptions = [
        { value: 'Romantic', label: '🔥 Romantic' },
        { value: 'Adventurous', label: '🎉 Adventurous' },
        { value: 'Cozy', label: '☕ Cozy' },
        { value: 'Fancy', label: '✨ Fancy' },
        { value: 'Fun', label: '🎮 Fun' },
        { value: 'Chill', label: '🌙 Chill' },
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.city.trim() || formData.city.length < 2) {
            newErrors.city = 'Where are you headed?';
        }
        if (!formData.budget) {
            newErrors.budget = 'Pick a budget!';
        }
        if (!formData.vibe) {
            newErrors.vibe = 'What\'s the vibe?';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSpin(formData);
        } else {
            // Shake animation trigger could go here
        }
    };

    return (
        <div className="card-neubrutalist w-full max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* City Input */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 font-display font-bold text-xl">
                        <MapPin className="w-6 h-6" /> Where are you?
                    </label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="Enter your city (e.g., Seattle, Brooklyn)"
                        className={clsx(
                            "w-full h-12 px-4 border-4 border-black font-sans text-lg outline-none transition-all placeholder:text-gray-400 focus:shadow-brutal-sm",
                            errors.city ? "bg-red-50 border-red-500" : "bg-white"
                        )}
                    />
                    {errors.city && <p className="text-red-600 font-bold text-sm animate-pulse">{errors.city}</p>}
                </div>

                {/* Budget Selection */}
                <div className="space-y-4">
                    <label className="flex items-center gap-2 font-display font-bold text-xl">
                        <DollarSign className="w-6 h-6" /> What's your budget?
                    </label>

                    {/* Large Budget Display */}
                    <div className="bg-lime-green border-4 border-black p-4 text-center shadow-brutal-sm relative">
                        <p className="font-bold text-sm uppercase tracking-wider mb-1">Your Budget</p>
                        <p className="font-black font-display text-4xl md:text-5xl">{formData.budget}</p>
                    </div>

                    {/* Slider Section */}
                    <div className="px-1 py-2">
                        <input
                            type="range"
                            min="10000"
                            max="3000000"
                            step="5000"
                            value={parseInt(formData.budget.replace(/[^0-9]/g, '')) || 50000}
                            className="neobrutalist-range"
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                const formatted = `₦${val.toLocaleString()}`;
                                handleChange('budget', formatted);
                            }}
                        />
                        <div className="flex justify-between font-bold text-xs mt-1 text-gray-500 font-mono">
                            <span>₦10,000</span>
                            <span>₦3,000,000</span>
                        </div>
                    </div>

                    {/* Preset Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['50000', '100000', '250000', '500000'].map((amount) => {
                            const formattedAmount = `₦${parseInt(amount).toLocaleString()}`;
                            const isSelected = formData.budget === formattedAmount;

                            return (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => handleChange('budget', formattedAmount)}
                                    className={clsx(
                                        "py-2 px-1 border-4 border-black font-bold text-sm transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                                        isSelected ? "bg-electric-yellow" : "bg-white hover:bg-gray-50"
                                    )}
                                >
                                    {formattedAmount}
                                </button>
                            );
                        })}
                    </div>

                    {errors.budget && <p className="text-red-600 font-bold text-sm animate-pulse">{errors.budget}</p>}
                </div>

                {/* Vibe Selection */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 font-display font-bold text-xl">
                        <Sparkles className="w-6 h-6" /> Pick your vibe:
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {vibeOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleChange('vibe', option.value)}
                                className={clsx(
                                    "h-14 border-4 border-black font-bold transition-all text-lg flex items-center justify-center",
                                    formData.vibe === option.value
                                        ? "bg-bright-magenta text-white shadow-brutal-sm translate-x-[2px] translate-y-[2px]"
                                        : "bg-cream hover:bg-white"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    {errors.vibe && <p className="text-red-600 font-bold text-sm animate-pulse">{errors.vibe}</p>}
                </div>

                {/* Dietary Preferences */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 font-display font-bold text-xl">
                        <Utensils className="w-6 h-6" /> Dietary preferences? <span className="text-sm font-normal text-gray-500">(Optional)</span>
                    </label>
                    <select
                        value={formData.dietary}
                        onChange={(e) => handleChange('dietary', e.target.value)}
                        className="w-full h-12 px-4 border-4 border-black font-sans text-lg outline-none bg-white focus:shadow-brutal-sm appearance-none cursor-pointer"
                    >
                        <option value="">No restrictions</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Halal">Halal</option>
                        <option value="Kosher">Kosher</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className="w-full h-16 text-xl tracking-wide shadow-brutal hover:shadow-brutal-hover active:shadow-brutal-active"
                    >
                        🎰 Spin the Wheel!
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default InputForm;
