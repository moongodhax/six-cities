import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { RATING_STARS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsReviewPosting } from '../../store/offers-data/offers-data.selectors';
import { postReview } from '../../store/offers-data/offers-data.slice';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getIsReviewPosting);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    void dispatch(
      postReview({
        offerId,
        comment: formData.comment,
        rating: formData.rating
      })
    ).then(() => {
      setFormData({ rating: 0, comment: '' });
    });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  rating: Number(evt.target.value)
                })}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) =>
          setFormData({ ...formData, comment: evt.target.value })}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            isSubmitting ||
            formData.rating === 0 ||
            formData.comment.length < 50
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
