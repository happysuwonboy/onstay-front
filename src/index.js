import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { FindStay } from './pages/FindStay';
import { AccDetail } from './pages/AccDetail';
import { RoomDetail } from './pages/RoomDetail';
import { AccGallery } from './pages/AccGallery';
import { NewStay } from './pages/NewStay';
import { Notice } from './pages/Notice';
import { NoticeDetail } from './pages/NoticeDetail';
import { Reservation } from './pages/Reservation';
import { Join } from './pages/Join';
import { Login } from './pages/Login';
import { FindId } from './pages/FindId';
import { FindPw } from './pages/FindPw';
import { NotFound } from './pages/NotFound';
import { MyPage } from './pages/MyPage';
import { AdminPage } from './pages/AdminPage';
import { CookiesProvider } from 'react-cookie';
import NoAccess from './pages/NoAccess';
import FindIdResult from './pages/FindIdResult';
import FindPwReset from './pages/FindPwReset';
import { LoginProvider } from './global/LoginContext';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <NotFound/>,
    children : [
      {path : '/',  element : <Home/>, index : true},
      {path : '/findstay', element : <FindStay/>},
      {path : '/findstay/acc/:accid', element : <AccDetail/>},
      {path : '/findstay/acc/gallery/:accid', element : <AccGallery/>},  
      {path : '/findstay/room/:roomid', element : <RoomDetail/>},
      {path : '/newstay', element : <NewStay/>},
      {path : '/notice', element : <Notice/>},
      {path : '/notice/:noticeid/:page', element : <NoticeDetail/>},
      {path : '/reservation/:roomid', element : <Reservation/>},
      {path : '/join', element : <Join/>},
      {path : '/login', element : <Login/>},
      {path : '/find/id', element : <FindId/>},
      {path : '/find/pw', element : <FindPw/>},
      {path : '/mypage', element : <MyPage/>},
      {path : '/adminpage', element : <AdminPage/>},
      {path : '/find/id/result', element : <FindIdResult/> },
      {path : '/find/pw/reset', element : <FindPwReset/>}
    ]
  },
  {
    path : '/noaccess',
    element : <NoAccess/>
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LoginProvider>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </LoginProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
