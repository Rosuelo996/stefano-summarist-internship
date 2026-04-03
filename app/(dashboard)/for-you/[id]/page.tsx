import {
  RiStarLine,
  RiTimeLine,
  RiMicLine,
  RiLightbulbLine,
  RiBookmarkLine,
} from "react-icons/ri";
import BookActions from "../../../../components/for-you/BookActions";


async function BookPage({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );
  const book = await res.json();
  console.log(book);

  return (
    <div id="book-details">
      <div className="row">
        <div className="container">
          <div className="book-details__wrapper">
            <div className="book-details">
              <div className="book-details__title">{book.title}</div>
              <div className="book-details__author">{book.author}</div>
              <div className="book-details__subtitle">
                {book.subTitle}
              </div>

              <div className="book-details__content">
                <div className="book-details__description-wrapper">
                  <div className="book-details__description">
                    <div className="book-details__icon">
                      <RiStarLine size={24} />
                    </div>
                    <div className="book-details__overall-rating">
                      {book.averageRating}&nbsp;
                    </div>
                    <div className="book-details__total-rating">
                      ({book.totalRating}&nbsp;ratings)
                    </div>
                  </div>
                  <div className="book-details__description">
                    <div className="book-details__icon">
                      <RiTimeLine size={24} />
                    </div>
                    <div className="book-details__duration">04:52</div>
                  </div>
                  <div className="book-details__description">
                    <div className="book-details__icon">
                      <RiMicLine size={24} />
                    </div>
                    <div className="book-details-type">{book.type}</div>
                  </div>
                  <div className="book-details__description">
                    <div className="book-details__icon">
                      <RiLightbulbLine size={24} />
                    </div>
                    <div className="book-details__key-ideas">{book.keyIdeas} Key Ideas</div>
                  </div>
                </div>
              </div>

              <BookActions book={book}/>

              <div className="book-details__bookmark">
                <div className="book-details__bookmark-icon">
                  <RiBookmarkLine size={24} />
                </div>
                <div className="book-details__bookmark-text">
                  Add title to My Library
                </div>
              </div>

              <h2 className="book-details__secondary-title">
                What&apos;s it about?
              </h2>
              <div className="book-details__tags-wrapper">
                <div className="book-details__tag">{book.tags[0]}</div>
                <div className="book-details__tag">{book.tags[1]}</div>
              </div>
              <div className="book-details__book-description">
                {book.bookDescription}
              </div>

              <h2 className="book-details__secondary-title">
                About the author
              </h2>
              <div className="book-details__author-description">
                {book.authorDescription}
              </div>
            </div>
            <div className="book-details__img-container">
              <figure className="book-details__img-wrapper">
                <img
                  className="book-details__img"
                  src={book.imageLink}
                  alt=""
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
