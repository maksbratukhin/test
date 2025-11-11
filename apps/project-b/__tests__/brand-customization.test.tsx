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
  category: 'test,category,tags',
  thumbnail: 'https://example.com/image.jpg',
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  slug: 'test-product',
};

describe('Brand Customization - Project B', () => {
  describe('BrandProductCard', () => {
    it('renders with horizontal layout (Project B specific)', () => {
      const { container } = render(<BrandProductCard product={mockProduct} market="en" />);
      const card = container.querySelector('.flex-row');
      expect(card).toBeInTheDocument();
    });

    it('uses Project B primary color', () => {
      render(<BrandProductCard product={mockProduct} market="en" />);
      const title = screen.getByText('Test Product');
      expect(title).toHaveStyle({ color: brandConfig.primaryColor });
    });

    it('shows category tags for Project B', () => {
      render(<BrandProductCard product={mockProduct} market="en" />);
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('category')).toBeInTheDocument();
    });

    it('shows two thumbnails for Project B', () => {
      const { container } = render(<BrandProductCard product={mockProduct} market="en" />);
      const images = container.querySelectorAll('img');
      expect(images.length).toBe(2);
    });
  });

  describe('BrandButton', () => {
    it('renders with Project B red color', () => {
      render(<BrandButton>Test Button</BrandButton>);
      const button = screen.getByText('Test Button');
      expect(button).toHaveStyle({ backgroundColor: brandConfig.primaryColor });
    });

    it('logs Project B message on click', () => {
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
      render(<BrandButton>Test Button</BrandButton>);

      const button = screen.getByText('Test Button');
      button.click();

      expect(consoleLogMock).toHaveBeenCalledWith('[Brand Action] Hello from Red Project');
      consoleLogMock.mockRestore();
    });
  });
});
