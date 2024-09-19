import './App.css'
import { BrowserRouter,Routes,Route, json } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import StudentPage from './components/studentslanding';
import React, {useState, useEffect } from "react";
import PrivateRoute from './components/PrivateRoute.jsx';
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignupPage'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar'
import EventSection from './components/EventSection.jsx';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const [Role, setRole] = useState(0);

  const [username, setusername] = useState(localStorage.jwtToken);
  const checkAuthenticated = async () => {
    setusername(localStorage.jwtToken);
    const body = { username};
    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/auth/test", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await res.json();
      setRole(parseRes.position);
      console.log(Role);
      if(parseRes){
        setIsAuthenticated(1);
      }
      else{
        setIsAuthenticated(0);
      }
      // parseRes === 1 ? setIsAuthenticated(1) :  setIsAuthenticated(0);
      // console.log(parseRes);
    
    } catch (err) {
      console.error(err.message);
    }
    // if(localStorage.jwtToken){
    //   console.log("KEY FOUND!");
    //   setIsAuthenticated(1);
    // }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
      <Routes>
      {/* element={
              <>isAuthenticated == 1 ? (
                <Home/>
              ) : (
                <>{<Navbar/> <SignUpPage/>}</>
              )</>
            } */}

          {/* <Route path='/landing' element={<LandingPage/>}/>
          <Route path = '/student' element={<StudentPage/>}/> */}
          <Route path="/"
            element={
              isAuthenticated == 1 ? (
                Role=="Alumini"?<LandingPage/>:<StudentPage/>
              ) : (
                <><Navbar/><SignUpPage/><Footer/></>
                // <LandingPage/>
                
              )
            }
          />
          <Route path="/sign-in"
            element={
              isAuthenticated == 1 ? (
                Role=="Alumini"?<LandingPage/>:<StudentPage/>
              ) : (
                <><Navbar/><LoginPage/><Footer/></>
              )
            }
          />
        {/* <Route path='/' element = {<><Navbar/> <SignUpPage/></>}/>
        <Route path='/sign-in' element = {<><Navbar/> <LoginPage/></>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App