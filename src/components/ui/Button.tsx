'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Using interaction props from framer-motion
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
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
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 focus:ring-primary',
        secondary: 'bg-secondary text-white hover:bg-gray-800 focus:ring-secondary',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'hover:bg-gray-100 text-gray-700',
        premium: 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 focus:ring-primary border border-white/20',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl font-bold',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                clsx(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )
            )}
            {...props as any}
        >
            {children}
        </motion.button>
    );
}
