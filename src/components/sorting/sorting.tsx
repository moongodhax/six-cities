import { useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSort } from '../../store/offers-data/offers-data.selectors';
import { setSort } from '../../store/offers-data/offers-data.slice';

function Sorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const activeSort = useAppSelector(getSort);
  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${
              type === activeSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => {
              dispatch(setSort(type));
              setIsOpened(false);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
