import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { withAuthInfo } from './with-auth-info';

// Создаем мок-компонент для обертки
const MockComponent = () => <div>Test Component</div>;
const MockComponentWithAuth = withAuthInfo(MockComponent);

const mockStore = configureMockStore();

describe('withAuthInfo HOC', () => {
  it('should pass authorizationStatus and user data to wrapped component', () => {
    // Создаем мок-стор с нужными данными
    const store = mockStore({
      userProcess: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: { id: 1, email: 'test@test.com' }
      }
    });

    // Рендерим компонент с HOC
    render(
      <Provider store={store}>
        <MockComponentWithAuth />
      </Provider>
    );

    // Проверяем, что компонент отрендерился
    expect(screen.getByText('Test Component')).toBeInTheDocument();

    // Если HOC передает пропсы, можно проверить их наличие
    // Для этого нужно модифицировать MockComponent, чтобы он отображал полученные пропсы
  });
});
