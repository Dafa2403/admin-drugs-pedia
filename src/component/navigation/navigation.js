import React, { useEffect } from "react";
import "./styles.css";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '../../redux/actions/loginSlice'
import axios from "../../api/axios";

function Sidebar() {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile.isProfile)
  const location = useSelector((state) => state.locate.locateHere)
  console.log("🚀 ~ file: navigation.js:14 ~ Sidebar ~ location:", location)

  const handleLogout = () =>{
      dispatch(handleLogin(false))
  }

  return (
    <div className="side ">
      <div className="sidebar-profile">
        <img
          src="https://via.placeholder.com/150"
          alt="logo"
          className="profile-picture"
        />
        <h3>{profile.name}</h3>
      </div>
      <div className="list-group list-group-flush ">
        <Link to='/' className={location === 'dashboard' ? 
          'list-group-item list-group-item-action active' 
          :
          'list-group-item list-group-item-action'
        }>
          <MdIcons.MdDashboard/> Dashboard
        </Link>
        <Link to='/Input' className={location === 'input' ? 
          'list-group-item list-group-item-action active' 
          :
          'list-group-item list-group-item-action'
        }>
          <MdIcons.MdInput/> Input Data Obat
        </Link>
        <Link to="/DataObat" className={location === 'data' ? 
          'list-group-item list-group-item-action active' 
          :
          'list-group-item list-group-item-action'
        }>
          <MdIcons.MdMedication/>Data Obat
        </Link>
        <Link to="/DataUsers" className={location === 'users' ? 
          'list-group-item list-group-item-action active' 
          :
          'list-group-item list-group-item-action'
        }>
          <MdIcons.MdOutlineSupervisorAccount/> Data Users
        </Link>
      </div>
      <footer className="sidebar-footer">
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <button onClick={() => handleLogout()} type="button" class="btn btn-danger btn-lg btn-block">
            Logout
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Sidebar;
