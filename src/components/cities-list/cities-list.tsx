import { CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/offers-data/offers-data.selectors';
import { setCity } from '../../store/offers-data/offers-data.slice';

function CitiesList(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city.name}>
            <a
              className={`locations__item-link tabs__item ${
                city.name === currentCity.name ? 'tabs__item--active' : ''
              }`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(setCity(city));
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
