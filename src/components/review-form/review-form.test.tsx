import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { vi } from 'vitest';
import ReviewForm from './review-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Мокаем postReview
vi.mock('../../store/offers-data/offers-data.slice', () => ({
  postReview: () => ({
    type: 'offers/postReview/pending',
    payload: undefined,
    meta: {
      arg: {
        offerId: '1',
        comment: 'This is a great place to stay! I really enjoyed my time here. Would recommend.',
        rating: 5
      }
    }
  }),
  unwrap: vi.fn()
}));

describe('ReviewForm Component', () => {
  it('should submit form with correct data', () => {
    const store = mockStore({
      offersData: {
        isReviewSubmitting: false
      }
    });

    // Мокаем dispatch, чтобы он возвращал объект с unwrap методом
    store.dispatch = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({})
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    // Заполняем форму с достаточным количеством символов (минимум 50)
    fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
      target: { value: 'This is a great place to stay! I really enjoyed my time here. Would recommend.' }
    });

    // Выбираем рейтинг, кликая на input, а не на label
    const ratingInput = screen.getByDisplayValue('5');
    fireEvent.click(ratingInput);

    // Проверяем, что кнопка теперь активна
    expect(screen.getByText('Submit')).not.toBeDisabled();

    // Отправляем форму через кнопку Submit
    fireEvent.click(screen.getByText('Submit'));

    // Проверяем, что dispatch был вызван
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    const store = mockStore({
      offersData: {
        isReviewSubmitting: false
      }
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    // Проверяем, что кнопка отправки изначально отключена
    expect(screen.getByText('Submit')).toBeDisabled();

    // Заполняем комментарий с достаточным количеством символов
    fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
      target: { value: 'This is a great place to stay! I really enjoyed my time here. Would recommend.' }
    });

    // Кнопка все еще должна быть отключена (нет рейтинга)
    expect(screen.getByText('Submit')).toBeDisabled();

    // Выбираем рейтинг, кликая на input
    const ratingInput = screen.getByDisplayValue('5');
    fireEvent.click(ratingInput);

    // Проверяем, что кнопка теперь активна
    expect(screen.getByText('Submit')).not.toBeDisabled();
  });

  it('should show loading state when submitting', () => {
    const store = mockStore({
      offersData: {
        isReviewSubmitting: true
      }
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    // Проверяем, что форма находится в состоянии загрузки
    expect(screen.getByText('Submit')).toBeDisabled();
  });
});
