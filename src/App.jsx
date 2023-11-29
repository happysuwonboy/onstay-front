import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useEffect, useState } from 'react';
import { getCookie } from './util/cookie.js'
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(getCookie('auth_access_token'));

  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      setAccessToken(getCookie('auth_access_token'))
    }, 20 * 60 * 60 * 1000)
    return () => clearInterval(checkTokenInterval)
  }, []) // 20분 주기로 액세스 토큰 값의 변화 여부를 체크 (보통의 경우 만료 체크)

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/member/tokenCheck',
      method: 'get',
      withCredentials: true
    })
      .then(res => {
        localStorage.setItem('user_info', JSON.stringify(res.data.userInfo))
        console.log('access token Refreshed');
      })
      .catch(err => {
        localStorage.removeItem('user_info')
        console.log('token expired');
      })
  }, [accessToken]) // 액세스 토큰의 값이 변하면 (보통 만료되면) 토큰 체크 api를 호출

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
