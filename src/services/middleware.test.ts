import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../const';
import { redirectToRoute } from '../store/action';
import { redirect } from './middleware';

const middlewares = [redirect];
const mockStore = configureMockStore(middlewares);

describe('Middleware', () => {
  it('should redirect to specified route', () => {
    const store = mockStore();

    // Мокаем window.location.assign
    const mockAssign = vi.fn();
    vi.stubGlobal('location', { assign: mockAssign });

    // Диспатчим действие для редиректа
    store.dispatch(redirectToRoute(AppRoute.Login));

    // Проверяем, что был вызван метод assign с правильным URL
    expect(mockAssign).toHaveBeenCalledWith(AppRoute.Login);
  });
});
