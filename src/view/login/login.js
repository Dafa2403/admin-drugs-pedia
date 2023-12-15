import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../../redux/actions/loginSlice'
import { accessToken } from '../../redux/actions/access'
import { handleProfile } from '../../redux/actions/profile'
import axios from '../../api/axios'

function Login() {
    const [username, setUsername] = useState('')
    const [pswd, setPswd] = useState('')
    const [sesi, setSesi] = useState()


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{

        try {
            const res = await axios.post(
                "/auth/api/login",
                JSON.stringify({ username, password : pswd}),
                {
                    headers: {
                        "Content-Type" : "application/json",
                        withCredentials: true
                    }
                }
            );
            setUsername("")
            setPswd("")
            console.log("🚀 ~ file: login.js:34 ~ handleSubmit ~ res:", res)
            
            if(res.data.success) {
                const Token = res.data.token
                dispatch(accessToken(Token))
                dispatch(handleProfile(res.data))
                localStorage.setItem("isLogin", true);
                dispatch(handleLogin(true))
                navigate("/")
            }else {
                localStorage.setItem("isLogin", false);
                console.log('error')
            }
        } catch (err){
            console.log('error')
        }
    }

  return (
    <div style={{background: '#45B3E6', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '40%', height: '60vh', background: '#F9F9F9', borderRadius: 8, padding: 50}}>
            <div style={{width: '100%', marginBottom: 15, display: 'flex', justifyContent: 'center' }}>
                <h4>Login</h4>
            </div>
            <div style={{border: '1px solid #CBCBCB', height: '90%', borderRadius: 8, padding: 10}}>
                <div >
                    <div className='mb-3'>
                        <h6 class="form-label">Username</h6>
                        <input type="text" 
                            class="form-control" id="username" 
                            placeholder='Masukan username..' 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <h6 class="form-label">Password</h6>
                        <input type="password" 
                            class="form-control" id="password" 
                            placeholder='Masukan password..'
                            onChange={(e) => setPswd(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                        <button onClick={() => handleSubmit()} class="btn btn-primary" style={{width: '90%'}}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login