import { render, screen } from '@testing-library/react';
import { Review } from '../../types/review';
import ReviewsList from './reviews-list';

describe('ReviewsList Component', () => {
  const mockReviews: Review[] = [
    {
      id: '1',
      comment: 'Great place!',
      date: '2023-10-05T13:38:44.635Z',
      rating: 4,
      user: {
        name: 'John Doe',
        avatarUrl: 'avatar.jpg',
        isPro: false
      }
    },
    {
      id: '2',
      comment: 'Awesome location!',
      date: '2023-09-05T10:38:44.635Z',
      rating: 5,
      user: {
        name: 'Jane Smith',
        avatarUrl: 'avatar2.jpg',
        isPro: true
      }
    }
  ];

  it('renders reviews title with correct count', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders all reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Awesome location!')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders "No reviews yet" when reviews array is empty', () => {
    render(<ReviewsList reviews={[]} />);

    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });

  it('handles null reviews gracefully', () => {
    render(<ReviewsList reviews={null as unknown as Review[]} />);

    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });
});
