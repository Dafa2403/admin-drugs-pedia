import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../redux/actions/loginSlice';
import { accessToken } from '../../redux/actions/access';
import { handleProfile } from '../../redux/actions/profile';
import axios from '../../api/axios';
import { CAlert } from '@coreui/react';

function Login() {
  const [username, setUsername] = useState('');
  const [pswd, setPswd] = useState('');
  const [info, setInfo] = useState('');
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        '/auth/api/login',
        JSON.stringify({ username, password: pswd }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUsername('');
      setPswd('');

      if (res.data.success) {
        const Token = res.data.token;
        dispatch(accessToken(Token));
        dispatch(handleProfile(res.data));
        localStorage.setItem('isLogin', true);
        dispatch(handleLogin(true));
        setInfo('');
        navigate('/');
      } else {
        localStorage.setItem('isLogin', false);
        setVisible(false);
        setInfo('Username atau Password salah');
      }
    } catch (err) {
      console.error('error', err);
      setVisible(false);
      setInfo('Login Error');
    }
  };

  return (
    <div
      style={{
        background: '#45B3E6',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '80%',
          maxWidth: '400px',
          minHeight: '20vh',
          background: '#F9F9F9',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <div style={{ width: '100%', marginBottom: '15px', textAlign: 'center' }}>
          <h4>Login</h4>
        </div>
        <div
          style={{
            border: '1px solid #CBCBCB',
            minHeight: '70%',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password..."
                onChange={(e) => setPswd(e.target.value)}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit
            </button>
          </div>
        </div>
        <CAlert color="warning" visible={!visible} style={{ marginTop: '20px' }}>
          {info}
        </CAlert>
      </form>
    </div>
  );
}

export default Login;
