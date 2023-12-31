"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import LoginImg from "../../../public/images/login.png";
import Image from "next/image";
import { openModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import LibrarySkeleton from "@/components/UI/LibrarySkeleton";
import { Book } from "@/typings";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import BookRow from "@/components/For-You/BookRow";

function Library() {
  const dispatch = useAppDispatch();

  const uid = useAppSelector(state => state.user.uid)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const [myLibrary, setMyLibrary] = useState<Book[] | DocumentData[]>();
  const [myFinishedLibrary, setMyFinishedLibrary] = useState<
    Book[] | DocumentData[]
  >();
  // const [loading, setLoading] = useState<boolean | null>(true);
  const loading = useAppSelector((state) => state.auth.authLoading)

  useEffect(() => {
    function fetchList() {
      if (isAuth) {
        // setLoading(true);
        onSnapshot(
          collection(db, "users", uid, "myLibrary"),
          (snapshot) => {
            setMyLibrary(snapshot.docs.map((book) => book.data()));
          }
        );
        onSnapshot(
          collection(db, "users", uid, "myFinishedLibrary"),
          (snapshot) => {
            setMyFinishedLibrary(snapshot.docs.map((book) => book.data()));
          }
        );
      }
      // setLoading(false);
      
    }
    fetchList();
  }, [isAuth]);

  return (
    <div className="row">
      <div className="container">
        {loading ? (
          <LibrarySkeleton />
        ) : (
          <>
            {isAuth ? (
              <>
                <div className="library__title">Saved Books</div>
                {myLibrary && myLibrary.length !== 0 ? (
                  <>
                    <div className="library__subtitle">
                      {myLibrary.length}{" "}
                      {myLibrary.length === 1 ? "item" : "items"}
                    </div>
                    <BookRow data={myLibrary} />
                  </>
                ) : (
                  <>
                    <div className="library__subtitle">0 items</div>
                    <div className="library__empty-row">
                      <div className="empty__title">
                        Save your favourite books!
                      </div>
                      <div className="empty__description">
                        When you save a book, it will appear here
                      </div>
                    </div>
                  </>
                )}

                <div className="library__title">Finished Books</div>
                {myFinishedLibrary && myFinishedLibrary.length !== 0 ? (
                  <>
                    <div className="library__subtitle">
                      {myFinishedLibrary.length}{" "}
                      {myFinishedLibrary.length === 1 ? "item" : "items"}
                    </div>
                    <BookRow data={myFinishedLibrary} />
                  </>
                ) : (
                  <>
                    <div className="library__subtitle">0 items</div>
                    <div className="library__empty-row">
                      <div className="empty__title">Done and dusted!</div>
                      <div className="empty__description">
                        When you finish a book, you can find it here later.
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="settings__login">
                  <figure className="settings__img--wrapper">
                    <Image
                      src={LoginImg}
                      alt="login"
                      className="settings__img"
                    />
                  </figure>
                  <div className="settings__login--title">
                    Login to your account to see your library.
                  </div>
                  <button
                    className="btn settings__login--btn"
                    onClick={() => dispatch(openModal())}
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Library;
