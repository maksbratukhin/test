'use client';

import React from 'react';
import { Button } from './Button';
import { BrandConfig } from '@product-portal/types';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  brandConfig: BrandConfig;
}

export function BrandButton({
  children,
  onClick,
  fullWidth,
  brandConfig,
  ...props
}: BrandButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`[Brand Action] ${brandConfig.alertMessage}`);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      variant={brandConfig.buttonVariant}
      backgroundColor={brandConfig.primaryColor}
      onClick={handleClick}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Button>
  );
}
