import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../AuthProvider';

export default function Login(props) {
  const
    { user, loginHandler } = useAuth(),
    navigate = useNavigate(),
    [loginInfo, setLoginInfo] = useState({ username: '', password: '' }),
    handleChangeLogin = (value, type) => {
      setLoginInfo({
        username: (type == 'username') ? value : loginInfo.username,
        password: (type == 'password') ? value : loginInfo.password
      })
    },
    handleLogin = () => {
      if (loginInfo.username != '' || loginInfo.password != '') {
        loginHandler(loginInfo.username, loginInfo.password)
          .then(res => {
            console.log('Hasil', res);
            if (res) {
              navigate('/');
            }
          })
      } else {
        alert('Mohon isi data anda')
      }
    }
    ;

  if (user) { navigate('/') }
  return (
    <div>
      <section>
        <h3>Login</h3>
        <input
          onChange={(e) => handleChangeLogin(e.target.value, 'username')}
          type={'text'}
          placeholder="username"
          value={loginInfo.username}
        />
        <input
          onChange={(e) => handleChangeLogin(e.target.value, 'password')}
          type={'text'}
          placeholder="password"
          value={loginInfo.password}
        />
        <button onClick={handleLogin}>login</button>
      </section>
    </div>
  )
}