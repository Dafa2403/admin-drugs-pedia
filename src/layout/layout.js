import { Header, Navbar } from "../component";
import { Dashboard, DataObat, DataUsers, EditObat, EditUser, InputObat, Login } from "../view";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Layout() {
  const isLogin = useSelector((state) => state.login)
  
  return (
    <div
      className="container-fluid"
      style={{ margin: 0, padding: 0, overflowX: "hidden" }}
    >
      {isLogin.isLogin ? 
        <Router>
          <div className="row">
            <div className="col-3"> 
                  <Navbar />
            </div>
            <div className="col" style={{ margin: 10 }}>
              <Header />
              <div style={{marginTop: 50}}>
                  <Routes>
                    <Route exact path="/" element={<Dashboard/>}/>
                    <Route exact path="/Input" element={<InputObat/>}/>
                    <Route exact path="/DataObat" element={<DataObat/>}/>
                    <Route exact path="/DataUsers" element={<DataUsers/>}/>
                    <Route exact path="/editObat" element={<EditObat/>}/>
                    <Route exact path="/editUser" element={<EditUser/>}/>
                  </Routes>

              </div>
            </div>
          </div>
        </Router>
      :
        <Router>
          <Routes>
            <Route path="*" element={<Login/>}/>
          </Routes>
        </Router>
      }
      
    </div>
  );
}

export default Layout;
