import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { Product } from '@product-portal/types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  category: 'test, category',
  thumbnail: 'https://example.com/image.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  slug: 'test-product',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('★ 4.5')).toBeInTheDocument();
  });

  it('applies vertical layout by default', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('flex-col');
  });

  it('applies horizontal layout when specified', () => {
    const { container } = render(<ProductCard product={mockProduct} layout="horizontal" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('flex-row');
  });

  it('shows category tags when enabled', () => {
    render(<ProductCard product={mockProduct} showCategoryTags={true} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('category')).toBeInTheDocument();
  });

  it('does not show category tags when disabled', () => {
    render(<ProductCard product={mockProduct} showCategoryTags={false} />);

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  it('renders multiple thumbnails when specified', () => {
    const { container } = render(<ProductCard product={mockProduct} thumbnailCount={2} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(2);
  });

  it('calls onCardClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ProductCard product={mockProduct} onCardClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });

  it('applies custom primary color', () => {
    render(<ProductCard product={mockProduct} primaryColor="#ff0000" />);

    const title = screen.getByText('Test Product');
    expect(title).toHaveStyle({ color: '#ff0000' });
  });

  it('shows low stock warning', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(<ProductCard product={lowStockProduct} />);

    expect(screen.getByText('Only 5 left in stock!')).toBeInTheDocument();
  });
});
