import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const BasicModal: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('[Modal] Close clicked'),
    title: 'Basic Modal',
    children: <p>This is a basic modal with some content.</p>,
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('[Modal] Close clicked'),
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal contains longer content that might require scrolling.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('[Modal] Close clicked'),
    title: 'Sign Up Form',
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    ),
  },
};

export const InteractiveModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Interactive Modal">
        <p>Click the X button or click outside to close this modal.</p>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Close from inside
        </button>
      </Modal>
    </div>
  );
};
