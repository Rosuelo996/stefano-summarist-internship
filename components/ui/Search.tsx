"use client";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import BookDuration from "../for-you/BookDuration";
import Link from "next/link";

type Props = {
  setIsSidebarOpen: (state: boolean) => void;
};
function Search({ setIsSidebarOpen }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function fetchBooks() {
      if (!debouncedSearch.trim()) {
        setBooks([]);
        return;
      }
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedSearch}`,
      );
      const data = await res.json();
      setBooks(data);
    }
    fetchBooks();
  }, [debouncedSearch]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="search__icon"
                onClick={() => {
                  if (!search) return;
                  setSearch("");
                  setDebouncedSearch("");
                  setBooks([]);
                }}
              >
                {search ? (
                  <IoClose size={20} color="#03314b" />
                ) : (
                  <IoSearchOutline size={20} color="#03314b" />
                )}
              </div>
            </div>
          </div>
          <div
            className="sidebar__toggle--btn"
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          >
            <HiOutlineMenu size={24} color="#03314b" />
          </div>
        </div>

        {books.length > 0 && (
          <div className="search__books--wrapper">
            {books.map((book) => (
              <Link
                href={`/book/${book.id}`}
                className="search__book--link"
                key={book.id}
                onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                  setBooks([]);
                }}
              >
                <audio src={book.audioLink}></audio>
                <figure
                  className="book__img--wrapper"
                  style={{ height: "80px", width: "80px", minWidth: "80px" }}
                >
                  <img src={book.imageLink} alt="" className="book__img" />
                </figure>
                <div>
                  <div className="search__book--title">{book.title}</div>
                  <div className="search__book--author">{book.author}</div>
                  <div className="search__book--duration">
                    <div className="recommended__book--details">
                      <FiClock size={16} />
                      <div className="recommended__book--details-text">
                        <BookDuration audioLink={book.audioLink} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {debouncedSearch && books.length === 0 && (
          <div className="search__books--wrapper">
            <div className="search__no-results">No books found</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
