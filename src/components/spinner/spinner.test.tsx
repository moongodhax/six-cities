import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner Component', () => {
  it('renders loading text', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders spinner animation', () => {
    render(<Spinner />);

    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });
});
