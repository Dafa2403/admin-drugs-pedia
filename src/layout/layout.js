import { Header, Navbar } from '../component';
import { Dashboard, DataObat, DataUsers, EditObat, EditUser, InputObat, Login } from '../view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Layout() {
  const isLogin = useSelector((state) => state.login);
  

  return (
    <Router>
      <div className="container-fluid p-0 bg-body" style={{ backgroundColor: '#f8f9fa', height: '100%' }}>
        {isLogin.isLogin ? (
          <div className="row">
            {/* Sidebar */}
            <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
              <div className="position-sticky">
                <Navbar />
              </div>
            </nav>

            {/* Main content */}
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-body" style={{ margin: 10, backgroundColor: '#ffffff' }}>
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
