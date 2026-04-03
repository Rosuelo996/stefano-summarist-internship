"use client";
import { RiBookOpenLine, RiMicLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import { useRouter } from "next/navigation";

type Props = {
    book: any
}

function BookActions({book}: Props) {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter()

  function handleRead() {
    if (!user) {
      dispatch(openModal());
      return
    }
    if (book.subscriptionRequired) {
        router.push("/choose-plan")
    }

    else {
        router.push(`/player/${book.id}`)
    }
  

  }
  function handleListen() {
    if (!user) {
      dispatch(openModal());
      return
    }
    if (book.subscriptionRequired) {
        router.push("/choose-plan")
    }
    else {
        router.push(`/player/${book.id}`)
    }
  }


  return (
    <div className="book-details__btn-wrapper">
      <button className="book-details__btn" onClick={handleRead}>
        <div className="book-details__btn-icon">
          <RiBookOpenLine size={24} />
        </div>
        <div className="book-details__btn-text">
          Read
        </div>
      </button>
      <button className="book-details__btn" onClick={handleListen}>
        <div className="book-details__btn-icon">
          <RiMicLine size={24} />
        </div>
        <div className="book-details__btn-text">Listen</div>
      </button>
    </div>
  );
}

export default BookActions;
