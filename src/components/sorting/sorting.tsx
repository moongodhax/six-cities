import { useState } from 'react';
import { SortType } from '../../const';

type SortingProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function Sorting({ currentSort, onSortChange }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${sortType === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              onSortChange(sortType);
              setIsOpened(false);
            }}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
