import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavorite } from '../../store/offers-data/offers-data.slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  className?: string;
  width?: number;
  height?: number;
};

function FavoriteButtonComponent({
  offerId,
  isFavorite,
  className = '',
  width = 18,
  height = 19
}: FavoriteButtonProps): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFavoriteClick = (evt: React.MouseEvent) => {
    evt.preventDefault();

    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(
      toggleFavorite({
        offerId,
        status: isFavorite ? 0 : 1
      })
    ).unwrap()
      .catch(() => {
        // Handle error silently
      });
  };

  const buttonClassName = `${className} ${
    isFavorite ? `${className}--active` : ''
  } button`;

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg
        className={`${className.split('__')[0]}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

const FavoriteButton = memo(FavoriteButtonComponent);

export default FavoriteButton;
