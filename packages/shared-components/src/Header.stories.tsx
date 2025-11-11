import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

const projectAConfig = {
  name: 'ProjectA',
  primaryColor: '#22c55e',
  secondaryColor: '#16a34a',
  buttonVariant: 'primary' as const,
  alertMessage: 'Hello from Green Project!',
  productCardLayout: 'vertical' as const,
  showCategoryTags: false,
  thumbnailCount: 1,
  titlePosition: 'top-right' as const,
};

const projectBConfig = {
  name: 'ProjectB',
  primaryColor: '#ef4444',
  secondaryColor: '#dc2626',
  buttonVariant: 'primary' as const,
  alertMessage: 'Hello from Red Project!',
  productCardLayout: 'horizontal' as const,
  showCategoryTags: true,
  thumbnailCount: 2,
  titlePosition: 'bottom-left' as const,
};

export const ProjectAEnglish: Story = {
  args: {
    market: 'en',
    brandConfig: projectAConfig,
  },
};

export const ProjectACanadian: Story = {
  args: {
    market: 'ca',
    brandConfig: projectAConfig,
  },
};

export const ProjectBEnglish: Story = {
  args: {
    market: 'en',
    brandConfig: projectBConfig,
  },
};

export const ProjectBCanadian: Story = {
  args: {
    market: 'ca',
    brandConfig: projectBConfig,
  },
};
