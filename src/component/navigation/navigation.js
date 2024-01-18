import React from 'react';
import './styles.css';
import * as MdIcons from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../redux/actions/loginSlice';
import axios from '../../api/axios';

function Sidebar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useSelector((state) => state.profile.isProfile);
  const show = useSelector((state) => state.show);


  const handleLogout = () => {
    dispatch(handleLogin(false));
  };

  return (
    <div className='side' style={!show.show || props.windowSize[0] <= 767? {width: '5vw'} : {width: '16vw'}}>
      {!show.show || props.windowSize[0] <= 767 ? 
        <>
          <div className="list-group" style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <MdIcons.MdDashboard size={20} />
            </Link>
            <Link to="/Input" className={location.pathname === '/Input' ? 'active' : ''}>
              <MdIcons.MdInput size={20} />
            </Link>
            <Link to="/DataObat" className={location.pathname === '/DataObat' ? 'active' : ''}>
              <MdIcons.MdMedication size={20} />
            </Link>
            <Link to="/DataUsers" className={location.pathname === '/DataUsers' ? 'active' : ''}>
              <MdIcons.MdOutlineSupervisorAccount size={20} />
            </Link>
          </div>
          <footer className="sidebar-footer">
            <button onClick={handleLogout} className="btn btn-danger btn-lg btn-block" style={{width: 50}}>
              <MdIcons.MdLogout size={20} />
            </button>
          </footer>
        </>
        :
        <>
          <div className="sidebar-profile">
            <img
              src={`http://localhost:8080/upload/profile/${profile.imgProfile}` || 'https://via.placeholder.com/150'}
              alt="profile"
              className="profile-picture"
            />
            <h3>{profile.name}</h3>
          </div>
          <div className="list-group">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <MdIcons.MdDashboard size={20} /> Dashboard
            </Link>
            <Link to="/Input" className={location.pathname === '/Input' ? 'active' : ''}>
              <MdIcons.MdInput size={20} /> Input Data Obat
            </Link>
            <Link to="/DataObat" className={location.pathname === '/DataObat' ? 'active' : ''}>
              <MdIcons.MdMedication size={20} /> Data Obat
            </Link>
            <Link to="/DataUsers" className={location.pathname === '/DataUsers' ? 'active' : ''}>
              <MdIcons.MdOutlineSupervisorAccount size={20} /> Data Users
            </Link>
          </div>
          <footer className="sidebar-footer">
            <button onClick={handleLogout} className="btn btn-danger btn-lg btn-block">
              Logout
            </button>
          </footer>
        </>
      }

    </div>
  );
}

export default Sidebar;
