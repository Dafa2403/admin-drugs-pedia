import { Header, Navbar } from '../component';
import { Dashboard, DataObat, DataUsers, EditObat, EditUser, InputObat, Login } from '../view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.css'
import { useEffect, useRef, useState } from 'react';

function Layout() {
  const isLogin = useSelector((state) => state.login);
  const show = useSelector((state) => state.show);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Router>
      <div className="container-fluid p-0 bg-body" style={{ backgroundColor: '#f8f9fa', height: '100%' }}>
        {isLogin.isLogin ? (
          <div className="row">
            {/* Sidebar */}
            <nav className="col-md-3 col-lg-2 d-md-block bg-light">
              <div className="position-sticky">
                <Navbar windowSize={windowSize}/>
              </div>
            </nav>

            {/* Main content */}
            <div className={!show.show ? "col-md-9 ms-sm-auto col-lg-11 px-md-4 bg-body animation" : windowSize[0] <= 767 ? "col-md-9 ms-sm-5 col-lg-10 px-md-2 bg-body animation" : "col-md-9 ms-sm-auto col-lg-10 px-md-2 bg-body animation"} style={{ margin: 10, backgroundColor: '#ffffff' }}>
              <Header />
              <div style={{ marginTop: 50 }}>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/Input" element={<InputObat />} />
                  <Route exact path="/DataObat" element={<DataObat />} />
                  <Route exact path="/DataUsers" element={<DataUsers />} />
                  <Route exact path="/editObat" element={<EditObat />} />
                  <Route exact path="/editUser" element={<EditUser />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default Layout;
