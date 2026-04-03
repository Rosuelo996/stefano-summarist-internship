import React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { IoSearchOutline } from 'react-icons/io5'

type Props = {
    setIsSidebarOpen: (state: boolean) => void;
}
function Search({setIsSidebarOpen}: Props) {
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
                />
                <div className="search__icon">
                  <IoSearchOutline size={24} color="#03314b" />
                </div>
              </div>
            </div>
            <div 
            className="sidebar__toggle--btn"
            onClick={() => {
              setIsSidebarOpen(true)}
            }
            >
              <HiOutlineMenu size={24} color="#03314b" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Search