import React from "react";
import { IoIosMenu } from "react-icons/io";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavigation } from "../../redux/actions/toggleSlice";


function Header() {
  const dispatch = useDispatch()
  const show = useSelector((state) => state.show)

  return (
    <div className="Header">
      <div
        onClick={() => dispatch(toggleNavigation(!show.show))}
        style={{borderBottom: '1px solid', cursor: 'pointer'}}
      >
        <IoIosMenu size={40} />
      </div>
    </div>
  );
}

export default Header;
