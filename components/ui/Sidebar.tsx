"use client";
import { signOut } from "firebase/auth";
import {
  HiOutlineBookmark,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlinePencil,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import { openModal } from "../../redux/modalSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setFontSize } from "../../redux/playerSlice";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (state: boolean) => void;
};

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const fontSize = useSelector((state: any) => state.player.fontSize)

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar--opened" : ""}`}>
      <div className="sidebar__logo">
        <Link href={"/"}>
        <img src="/logo.png" alt="" />
        </Link>
        
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <Link
            href="/for-you"
            className="sidebar__link--wrapper"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <div
              className={`sidebar__link--line ${pathname === "/for-you" ? "active--tab" : ""}`}
            ></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlineHome size={24} />
            </div>
            <div className="sidebar__link--text">For you</div>
          </Link>
          <Link
            href="/library"
            className="sidebar__link--wrapper"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <div
              className={`sidebar__link--line ${pathname === "/library" ? "active--tab" : ""}`}
            ></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlineBookmark size={24} />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </Link>
          <a className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlinePencil size={24} />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </a>
          <a className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <IoSearchOutline size={24} />
            </div>
            <div className="sidebar__link--text">Search</div>
          </a>

          {pathname.includes("/player") && (
            <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
            <div 
            className={`sidebar__font--size-icon ${fontSize === 16 ? "sidebar__font--size-icon--active" : ""}`}
            onClick={() => dispatch(setFontSize(16))}>
              <svg className="sidebar__font--size-icon-small" viewBox="0 0 24 24" width="16" height="16">
                <text x="0" y="18" fontSize="14">
                  Aa
                </text>
              </svg>
            </div>

            <div 
            className={`sidebar__font--size-icon ${fontSize === 18 ? "sidebar__font--size-icon--active" : ""}`}
            onClick={() => dispatch(setFontSize(18))}>
              <svg className="sidebar__font--size-icon-medium" viewBox="0 0 24 24" width="18" height="18">
                <text x="0" y="18" fontSize="16">
                  Aa
                </text>
              </svg>
            </div>

            <div 
            className={`sidebar__font--size-icon ${fontSize === 22 ? "sidebar__font--size-icon--active" : ""}`}
            onClick={() => dispatch(setFontSize(22))}>
              <svg className="sidebar__font--size-icon-large" viewBox="0 0 24 24" width="20" height="20">
                <text x="0" y="18" fontSize="18">
                  Aa
                </text>
              </svg>
            </div>

            <div 
            className={`sidebar__font--size-icon ${fontSize === 26 ? "sidebar__font--size-icon--active" : ""}`}
            onClick={() => dispatch(setFontSize(26))}>
              <svg className="sidebar__font--size-icon-xlarge" viewBox="0 0 24 24" width="22" height="22">
                <text x="0" y="18" fontSize="20">
                  Aa
                </text>
              </svg>
            </div>
          </div>
          )}
        </div>

        <div className="sidebar__bottom">
          <Link
            href="/settings"
            className="sidebar__link--wrapper"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <div
              className={`sidebar__link--line ${pathname === "/settings" ? "active--tab" : ""}`}
            ></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlineCog size={24} />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <a className="sidebar__link--wrapper sidebar__link--not-allowed">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlineQuestionMarkCircle size={24} />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </a>
          <a
            className="sidebar__link--wrapper"
            onClick={() => {
              setIsSidebarOpen(false);
              if (user) {
                signOut(auth);
              } else {
                dispatch(openModal());
              }
            }}
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <HiOutlineLogout size={24} />
            </div>
            <div className="sidebar__link--text">
              {user ? "Logout" : "Login"}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
