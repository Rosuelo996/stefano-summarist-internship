import Skeleton from "../../../../components/skeleton/Skeleton";

export default function Loading() {
  return (
    <div id="book-details">
      <div className="row">
        <div className="container">
          <div className="book-details__wrapper">
            <div className="book-details">
              <Skeleton className="book-details__title-skeleton" />
              <Skeleton className="book-details__author-skeleton" />
              <Skeleton className="book-details__subtitle-skeleton" />

              <div className="book-details__content">
                <Skeleton className="book-details__text-block-skeleton" />
              </div>

              <div className="book-details__btn-wrapper">
                <Skeleton className="book-details__button-skeleton" />
                <Skeleton className="book-details__button-skeleton" />
              </div>

              <Skeleton className="book-details__bookmark-skeleton" />

              <div className="book-details__secondary-title">
                What&apos;s it about?
              </div>

              <div className="book-details__tags-wrapper">
                <Skeleton className="book-details__tag-skeleton" />
                <Skeleton className="book-details__tag-skeleton" />
              </div>

              <Skeleton className="book-details__paragraph-skeleton" />

              <div className="book-details__secondary-title">
                About the author
              </div>

              <Skeleton className="book-details__paragraph-skeleton" />
            </div>

            <div className="book-details__img-container">
              <figure className="book-details__img-wrapper">
                <Skeleton className="book-details__img-skeleton" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}