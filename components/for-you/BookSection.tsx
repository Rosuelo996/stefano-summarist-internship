import BookDuration from "./BookDuration";
import Link from "next/link";
import { FiClock, FiStar } from "react-icons/fi";
import BookImage from "./BookImage";

type Props = {
  title: string;
  subTitle: string;
  books: any[];
};

function BookSection({ title, subTitle, books }: Props) {
  return (
    <div id="book-section">
      <div className="for-you__title">{title}</div>
      <div className="for-you__subtitle">{subTitle}</div>
      <div className="for-you__books">
        {books.map((book) => (
          <Link
            href={`/book/${book.id}`}
            className="for-you__books-link"
            key={book.id}
          >
            {book.subscriptionRequired && (
              <div className="book__pill book__pill--subscription-required">
                Premium
              </div>
            )}
            <audio>{book.audioLink}</audio>
            <figure className="book__img--wrapper">
              <BookImage
                src={book.imageLink}
                alt={book.title}
                className="book__img"
                skeletonClassName="book__img--skeleton"
              />
            </figure>
            <div className="book__title">{book.title}</div>
            <div className="book__author">{book.author}</div>
            <div className="book__subtitle">{book.subTitle}</div>
            <div className="book__details-wrapper">
              <div className="book__details">
                <div className="book__details-icon">
                  <FiClock size={16} />
                </div>
                <div className="book__details-text">
                  <BookDuration audioLink={book.audioLink} />
                </div>
              </div>
              <div className="book__details">
                <div className="book__details-icon">
                  <FiStar size={16} />
                </div>
                <div className="book__details-text">{book.averageRating}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookSection;
