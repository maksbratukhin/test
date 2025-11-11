import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: 1,
  title: 'iPhone 15 Pro',
  description: 'The latest iPhone with A17 Pro chip, titanium design, and action button.',
  price: 999.99,
  rating: 4.8,
  stock: 50,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://via.placeholder.com/300x300/4A90E2/ffffff?text=iPhone+15+Pro',
  images: [
    'https://via.placeholder.com/300x300/4A90E2/ffffff?text=iPhone+15+Pro',
    'https://via.placeholder.com/300x300/7B68EE/ffffff?text=iPhone+Back',
  ],
  slug: 'iphone-15-pro',
};

export const VerticalLayout: Story = {
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const HorizontalLayout: Story = {
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'horizontal',
    showCategory: true,
    thumbnailCount: 2,
    titlePosition: 'bottom-left',
  },
};

export const WithCategory: Story = {
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'vertical',
    showCategory: true,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const TwoThumbnails: Story = {
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 2,
    titlePosition: 'top-right',
  },
};

export const TitleBottomLeft: Story = {
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'bottom-left',
  },
};

export const LowStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 3,
    },
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 0,
    },
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const HighRating: Story = {
  args: {
    product: {
      ...mockProduct,
      rating: 5.0,
    },
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const ProjectAStyle: Story = {
  name: 'Project A Configuration',
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'vertical',
    showCategory: false,
    thumbnailCount: 1,
    titlePosition: 'top-right',
  },
};

export const ProjectBStyle: Story = {
  name: 'Project B Configuration',
  args: {
    product: mockProduct,
    market: 'en',
    layout: 'horizontal',
    showCategory: true,
    thumbnailCount: 2,
    titlePosition: 'bottom-left',
  },
};
