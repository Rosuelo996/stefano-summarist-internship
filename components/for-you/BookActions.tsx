"use client";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiBookOpenLine,
  RiMicLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type Props = {
  book: any;
};

function BookActions({ book }: Props) {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  useEffect(() => {
    async function checkIfSaved() {
      if (!user) {
        setIsSaved(false);
        return;
      }

      const bookRef = doc(
        db,
        "customers",
        user.uid,
        "library",
        String(book.id),
      );
      const bookSnapshot = await getDoc(bookRef);

      setIsSaved(bookSnapshot.exists() && bookSnapshot.data().isSaved);
    }
    checkIfSaved();
  }, [user, book.id]);

  useEffect(() => {
  async function getSubscription() {
    if (!user) {
      setSubscription(null);
      setIsLoadingSubscription(false);
      return;
    }

    setIsLoadingSubscription(true);

    const ref = collection(db, "customers", user.uid, "subscriptions");
    const snapshot = await getDocs(ref);

    const activeSub = snapshot.docs.find((doc) => {
      const data = doc.data();
      return data.status === "active" || data.status === "trialing";
    });

    if (activeSub) {
      setSubscription(activeSub.data());
    } else {
      setSubscription(null);
    }

    setIsLoadingSubscription(false);
  }

  getSubscription();
}, [user]);

  const hasPremiumAccess =
    subscription &&
    (subscription.status === "active" || subscription.status === "trialing");

  function handleRead() {
    console.log("user:", user?.email);
console.log("subscription:", subscription);
console.log("status:", subscription?.status);
console.log("plan id:", subscription?.items?.[0]?.plan?.id);
console.log("hasPremiumAccess:", hasPremiumAccess);
  if (!user) {
    dispatch(openModal());
    return;
  }

  if (isLoadingSubscription) {
    return;
  }

  if (book.subscriptionRequired && !hasPremiumAccess) {
    router.push("/choose-plan");
    return;
  }

  router.push(`/player/${book.id}`);
}

  function handleListen() {
  if (!user) {
    dispatch(openModal());
    return;
  }

  if (isLoadingSubscription) {
    return;
  }

  if (book.subscriptionRequired && !hasPremiumAccess) {
    router.push("/choose-plan");
    return;
  }

  router.push(`/player/${book.id}`);
}

  async function handleSave() {
    if (!user) {
      dispatch(openModal());
      return;
    }

    const bookRef = doc(db, "customers", user.uid, "library", String(book.id));
    const bookSnapshot = await getDoc(bookRef);

    if (isSaved) {
      await updateDoc(bookRef, {
        isSaved: false,
      });
      setIsSaved(false);
    } else {
      if (bookSnapshot.exists()) {
        await updateDoc(bookRef, {
          isSaved: true,
        });
      } else {
        await setDoc(bookRef, {
          id: book.id,
          title: book.title,
          author: book.author,
          subTitle: book.subTitle,
          imageLink: book.imageLink,
          audioLink: book.audioLink,
          averageRating: book.averageRating,
          subscriptionRequired: book.subscriptionRequired,
          isSaved: true,
          isFinished: false,
        });
      }

      setIsSaved(true);
    }
  }

  return (
    <>
      <div className="book-details__btn-wrapper">
        <button className="book-details__btn" onClick={handleRead}>
          <div className="book-details__btn-icon">
            <RiBookOpenLine size={24} />
          </div>
          <div className="book-details__btn-text">Read</div>
        </button>
        <button className="book-details__btn" onClick={handleListen}>
          <div className="book-details__btn-icon">
            <RiMicLine size={24} />
          </div>
          <div className="book-details__btn-text">Listen</div>
        </button>
      </div>

      <div className="book-details__bookmark" onClick={handleSave}>
        <div className="book-details__bookmark-icon">
          {isSaved ? (
            <RiBookmarkFill size={24} />
          ) : (
            <RiBookmarkLine size={24} />
          )}
        </div>
        <div className="book-details__bookmark-text">
          {isSaved ? "Saved in My Library" : "Add title to My Library"}
        </div>
      </div>
    </>
  );
}

export default BookActions;
