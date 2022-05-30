import React, { useState } from 'react';
import FetchData from './data/FetchData';
import PropTypes from 'prop-types';

const authContext = React.createContext();

function useAuth()  { 
  const [user, setUser] = useState(window.localStorage.getItem('user'));
  const loginHandler = async (username, pass) => {
    const userData = await FetchData.fakeAuth(username, pass);
    if(userData.length > 0) {
      console.log('login', userData[0])
      window.localStorage.setItem('user', userData[0].user);
      setUser(userData[0].user);
    } else {
      alert('Akun tidak ditemukan');
      return Promise.resolve(false);
    }
  }
  const logoutHandler = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  return {
    user,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
  };
};

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node
};