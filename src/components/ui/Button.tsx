'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium' | 'gold';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth,
    className,
    ...props
}: ButtonProps) {
    const baseStyles = 'relative inline-flex items-center justify-center font-medium tracking-wide transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';

    const variants = {
        primary: 'bg-white text-black hover:bg-gray-200',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
        outline: 'border border-white/20 text-white hover:border-white hover:bg-white/5 backdrop-blur-sm',
        ghost: 'text-gray-400 hover:text-white',
        premium: 'bg-[#C5A059] text-black hover:bg-[#FCF6BA]',
        gold: 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] border border-[#FCF6BA]/50',
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-xs uppercase',
        md: 'px-6 py-2.5 text-sm uppercase',
        lg: 'px-8 py-6 text-base uppercase',
        xl: 'px-10 py-8 text-lg uppercase font-bold tracking-widest',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                clsx(
                    baseStyles,
                    variant === 'outline' ? 'rounded-none' : 'rounded-full', // Square for outline, round for others? Or consistent? Let's go consistent rounded-full for luxury
                    'rounded-full',
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )
            )}
            {...props as any}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
