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
        outline: 'border border-white/30 text-white hover:border-white hover:bg-white/5 backdrop-blur-sm',
        ghost: 'text-gray-400 hover:text-white',
        premium: 'bg-[#D4AF37] text-black hover:bg-[#F3E5AB]',
        gold: 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] border border-[#F3E5AB]/50',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs uppercase',
        md: 'px-6 py-3 text-sm uppercase',
        lg: 'px-8 py-4 text-base uppercase',
        xl: 'px-10 py-5 text-lg uppercase font-bold tracking-widest',
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
