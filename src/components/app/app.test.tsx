import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import App from './app';

// Mock the API calls to prevent unhandled rejections
vi.mock('../../services/api', () => ({
  createAPI: () => ({
    get: vi.fn().mockResolvedValue({ data: { id: 1, email: 'test@test.com', token: 'token' } }),
    post: vi.fn().mockResolvedValue({ data: { id: 1, email: 'test@test.com', token: 'token' } }),
    delete: vi.fn().mockResolvedValue({})
  })
}));

// Create a modified version of App without BrowserRouter
const AppWithoutRouter = () => {
  // Extract the Routes component from App
  const app = App();
  // Return just the Routes part, not the BrowserRouter
  // Type assertion to avoid unsafe member access
  return (app as { props: { children: React.ReactNode } }).props.children;
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App Routing', () => {
  it('renders MainPage when navigating to /', () => {
    const store = mockStore({
      userProcess: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
      offersData: {
        city: {
          name: 'Paris',
          location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
        },
        offers: [],
        isOffersLoading: false,
        hasError: false,
        sortType: 'Popular',
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppWithoutRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();

    // Aniqroq selektor ishlatamiz
    const parisTab = screen.getByText('Paris', { selector: '.tabs__item--active span' });
    expect(parisTab).toBeInTheDocument();
  });

  it('renders LoginPage when navigating to /login', () => {
    const store = mockStore({
      userProcess: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
      offersData: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <AppWithoutRouter />
        </MemoryRouter>
      </Provider>
    );

    // Be more specific about which "Sign in" element we're looking for
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders NotFoundPage when navigating to non-existent route', () => {
    const store = mockStore({
      userProcess: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
      offersData: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <AppWithoutRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });

  it('redirects to login when accessing private route without auth', () => {
    const store = mockStore({
      userProcess: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
      offersData: {
        favorites: []
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <AppWithoutRouter />
        </MemoryRouter>
      </Provider>
    );

    // Be more specific about which "Sign in" element we're looking for
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });
});
