import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrandProductCard } from '../components/BrandProductCard';
import { BrandButton } from '../components/BrandButton';
import { Product } from '@product-portal/types';
import { brandConfig } from '../lib/brand-config';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  category: 'test',
  thumbnail: 'https://example.com/image.jpg',
  images: [],
  slug: 'test-product',
};

describe('Brand Customization - Project A', () => {
  describe('BrandProductCard', () => {
    it('renders with vertical layout (Project A specific)', () => {
      const { container } = render(<BrandProductCard product={mockProduct} market="en" />);
      const card = container.querySelector('.flex-col');
      expect(card).toBeInTheDocument();
    });

    it('uses Project A primary color', () => {
      render(<BrandProductCard product={mockProduct} market="en" />);
      const title = screen.getByText('Test Product');
      expect(title).toHaveStyle({ color: brandConfig.primaryColor });
    });

    it('does not show category tags for Project A', () => {
      const productWithCategory = { ...mockProduct, category: 'test, category' };
      render(<BrandProductCard product={productWithCategory} market="en" />);
      expect(screen.queryByText('test')).not.toBeInTheDocument();
    });

    it('shows only one thumbnail for Project A', () => {
      const productWithImages = {
        ...mockProduct,
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      };
      const { container } = render(<BrandProductCard product={productWithImages} market="en" />);
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(1);
    });
  });

  describe('BrandButton', () => {
    it('renders with Project A green color', () => {
      render(<BrandButton>Test Button</BrandButton>);
      const button = screen.getByText('Test Button');
      expect(button).toHaveStyle({ backgroundColor: brandConfig.primaryColor });
    });

    it('logs Project A message on click', () => {
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
      render(<BrandButton>Test Button</BrandButton>);

      const button = screen.getByText('Test Button');
      button.click();

      expect(consoleLogMock).toHaveBeenCalledWith('[Brand Action] Hello from Green Project');
      consoleLogMock.mockRestore();
    });
  });
});
