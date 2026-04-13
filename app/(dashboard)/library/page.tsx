"use client";
import { useSelector } from "react-redux";
import BookSection from "../../../components/for-you/BookSection";
import LoginPrompt from "../../../components/shared/LoginPrompt";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import SkeletonBookSection from "../../../components/skeleton/SkeletonBookSection";

function Library() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    async function getLibraryBooks() {
      if (!user) {
        setSavedBooks([]);
        setFinishedBooks([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true)

      const ref = collection(db, "customers", user.uid, "library");
      const snapshot = await getDocs(ref);
      const books = snapshot.docs.map((doc) => doc.data());

      setSavedBooks(books.filter((book) => book.isSaved));
      setFinishedBooks(books.filter((book) => book.isFinished));
      setIsLoading(false)
    }
    getLibraryBooks();
  }, [user]);

  if (isLoading) {
  return (
    <div id="library">
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <SkeletonBookSection title="Saved Books" subTitle={""} />
            <SkeletonBookSection title="Finished" subTitle={""} />
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div id="library">
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            {!user ? (
              <LoginPrompt />
            ) : (
              <>
                <BookSection
                  title="Saved Books"
                  subTitle={`${savedBooks.length} items`}
                  books={savedBooks}
                />

                {savedBooks.length === 0 && (
                  <div className="finished__books--block-wrapper">
                    <div className="finished__books--title">
                      Save your favorite books!
                    </div>
                    <div className="finished__books--subtitle">
                      When you save a book, it will appear here.
                    </div>
                  </div>
                )}

                <BookSection
                  title="Finished"
                  subTitle={`${finishedBooks.length} items`}
                  books={finishedBooks}
                />

                {finishedBooks.length === 0 && (
                  <div className="finished__books--block-wrapper">
                    <div className="finished__books--title">
                      Done and dusted!
                    </div>
                    <div className="finished__books--subtitle">
                      When you finish a book, you can find it here later.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
