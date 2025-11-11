'use client';

import React from 'react';
import { Button } from '@product-portal/shared-components';
import { brandConfig } from '../lib/brand-config';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function BrandButton({ children, onClick, fullWidth, ...props }: BrandButtonProps) {
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
