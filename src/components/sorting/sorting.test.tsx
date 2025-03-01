import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SortType } from '../../const';
import Sorting from './sorting';

const mockStore = configureMockStore();

describe('Sorting Component', () => {
  it('renders with correct active sort type', () => {
    const store = mockStore({
      offersData: {
        sortType: SortType.Popular
      }
    });

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    // Check that the active sort type is displayed in the sorting type span
    const sortingTypeElement = screen.getByText(SortType.Popular, { selector: '.places__sorting-type' });
    expect(sortingTypeElement).toBeInTheDocument();

    // All sort options should be in the document
    Object.values(SortType).forEach((sortType) => {
      // Use getAllByText to handle multiple elements with the same text
      const elements = screen.getAllByText(sortType);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('applies active class to current sort type', () => {
    const store = mockStore({
      offersData: {
        sortType: SortType.PriceAsc
      }
    });

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    // Find all list items
    const listItems = screen.getAllByRole('listitem');

    // Find the active one
    const activeOption = listItems.find((item) =>
      item.textContent === SortType.PriceAsc &&
            item.classList.contains('places__option--active')
    );

    expect(activeOption).toBeTruthy();
    expect(activeOption).toHaveClass('places__option--active');

    // Find a non-active one
    const popularOption = listItems.find((item) =>
      item.textContent === SortType.Popular
    );

    expect(popularOption).toBeTruthy();
    expect(popularOption).not.toHaveClass('places__option--active');
  });
});
