'use client';

import React from 'react';
import { BrandButton as SharedBrandButton } from '@product-portal/shared-components';
import { brandConfig } from '../lib/brand-config';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function BrandButton({ children, ...props }: BrandButtonProps) {
  return (
    <SharedBrandButton brandConfig={brandConfig} {...props}>
      {children}
    </SharedBrandButton>
  );
}
