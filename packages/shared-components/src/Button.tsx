import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  backgroundColor?: string;
  textColor?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  backgroundColor,
  textColor = '#ffffff',
  children,
  fullWidth = false,
  className,
  style,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'px-4 py-2 rounded font-medium transition-all hover:opacity-90 disabled:opacity-50';
  const widthStyles = fullWidth ? 'w-full' : '';
  const variantStyles = variant === 'primary' ? 'shadow-md' : 'border border-gray-300';

  return (
    <button
      className={clsx(baseStyles, widthStyles, variantStyles, className)}
      style={{
        backgroundColor,
        color: textColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
