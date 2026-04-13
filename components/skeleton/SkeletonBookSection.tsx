import Skeleton from "./Skeleton";

type Props = {
  title: string;
  subTitle: string;
};

function SkeletonBookSection({ title, subTitle }: Props) {
  const skeletonArray = [...Array(5)];

  return (
    <div id="book-section">
      <div className="for-you__title">
        {title}
      </div>

      <div className="for-you__subtitle">
        {subTitle}
      </div>

      <div className="for-you__books">
        {skeletonArray.map((_, index) => (
          <div className="for-you__books-link" key={index}>
            <div className="book__img--wrapper">
              <Skeleton className="book__img-skeleton" />
            </div>

            <div className="book__title">
              <Skeleton className="book__title-skeleton" />
            </div>

            <div className="book__author">
              <Skeleton className="book__author-skeleton" />
            </div>

            <div className="book__subtitle">
              <Skeleton className="book__subtitle-skeleton" />
            </div>

            <div className="book__details-wrapper">
              <div className="book__details">
                <Skeleton className="book__details-text-skeleton" />
              </div>

              <div className="book__details">
                <Skeleton className="book__details-text-skeleton short" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonBookSection;