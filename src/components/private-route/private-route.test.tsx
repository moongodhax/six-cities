import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import PrivateRoute from './private-route';

describe('PrivateRoute Component', () => {
  it('should render children when user is authorized', () => {
    const store = configureMockStore()({
      userProcess: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={
              <PrivateRoute>
                <div>Private Content</div>
              </PrivateRoute>
            }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что отображается приватный контент
    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    const store = configureMockStore()({
      userProcess: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/private" element={
              <PrivateRoute>
                <div>Private Content</div>
              </PrivateRoute>
            }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что произошел редирект на страницу логина
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
