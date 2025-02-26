import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchFavorites } from '../../store/offers-data/offers-data.slice';
import { checkAuth } from '../../store/user-process/user-process.action';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import OfferPage from '../offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then((result) => {
        if (result) {
          dispatch(fetchFavorites());
        }
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
