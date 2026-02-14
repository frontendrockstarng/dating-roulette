import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'btn-neubrutalist inline-flex items-center justify-center font-bold transition-all';

    const variants = {
        primary: 'bg-hot-pink text-white border-black [--shadow-color:theme(colors.electric-yellow)]',
        secondary: 'bg-electric-yellow text-black border-black [--shadow-color:theme(colors.hot-pink)]',
        outline: 'bg-cream text-black border-black [--shadow-color:theme(colors.black)]',
    };

    const sizes = {
        sm: 'h-10 px-6 text-sm',
        md: 'h-12 px-8 text-base',
        lg: 'h-14 px-10 text-lg',
    };

    return (
        <button
            type={type}
            className={twMerge(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
