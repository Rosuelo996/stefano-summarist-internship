import Link from "next/link";
import { IoPlay } from "react-icons/io5";
import BookImage from "./BookImage";

type Props = {
  book: any;
};
function Selected({ book }: Props) {
  return (
    <div id="selected">
      <div className="for-you__title">Selected just for you</div>
      <audio></audio>
      <Link href={`/book/${book.id}`} className="selected__book">
        <div className="selected__book--subtitle">{book.subTitle}</div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure className="book__img--wrapper-selected">
            <BookImage
              src={book.imageLink}
              alt={book.title}
              className="book__img"
              skeletonClassName="book__img-skeleton"
            />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">{book.title}</div>
            <div className="selected__book--author">{book.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <IoPlay size={24} color="white" />
              </div>
              <div className="selected__book--duration">3 mins 23 secs</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Selected;
