"use client"

import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../redux/modalSlice"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase"



function Navbar() {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.user)

  return (
     <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login"
          onClick={() => {
            if (user) {
              signOut(auth)
            } else {
             dispatch(openModal())
            }
          }}
          >
            {user ? "Logout" : "Login"}</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar