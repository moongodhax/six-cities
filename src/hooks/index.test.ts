import { renderHook } from '@testing-library/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { vi, Mock } from 'vitest';
import { State } from '../types/state';
import { useAppDispatch, useAppSelector } from './index';

// Мокаем useDispatch и useSelector
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('Custom hooks', () => {
  it('useAppSelector should be a typed version of useSelector', () => {
    // Проверяем, что useAppSelector - это типизированная версия useSelector
    expect(useAppSelector).toBeDefined();
    expect(useAppSelector).toEqual(useSelector as TypedUseSelectorHook<State>);
  });

  it('useAppDispatch should return the result of useDispatch', () => {
    // Мокаем возвращаемое значение useDispatch
    const mockDispatch = vi.fn();

    // Отключаем проверки ESLint для следующих строк
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const mockUseDispatch = useDispatch as Mock;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mockUseDispatch.mockReturnValue(mockDispatch);

    // Рендерим хук
    const { result } = renderHook(() => useAppDispatch());

    // Проверяем, что результат - это то, что вернул useDispatch
    expect(result.current).toBe(mockDispatch);
  });
});
