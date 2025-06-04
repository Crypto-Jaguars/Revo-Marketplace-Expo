import React from 'react';
import { render } from '@testing-library/react-native';
import { MultiStepCheckout } from '../../../app/components/checkout';

const mockCartItems = [
  {
    id: '1',
    name: 'Test Item',
    price: 10.99,
    quantity: 1,
  },
];

describe('MultiStepCheckout', () => {
  const defaultProps = {
    cartItems: mockCartItems,
    onClose: jest.fn(),
    onOrderComplete: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<MultiStepCheckout {...defaultProps} />);
    expect(getByText('Checkout')).toBeTruthy();
  });

  it('displays step indicator', () => {
    const { getByText } = render(<MultiStepCheckout {...defaultProps} />);
    expect(getByText('Shipping')).toBeTruthy();
    expect(getByText('Payment')).toBeTruthy();
    expect(getByText('Review')).toBeTruthy();
  });
});