import React from "react";
import {Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar";
import {Homepage} from "./components/homepage";
import {Menu} from "./components/menu";
import {Login} from "./components/login";
import {Signup} from "./components/signup";
import {Book} from "./components/book";
import {Profile} from "./components/profile";

export function getUserID(){
  const rememberMe = localStorage.getItem("rememberMe") === true;
  if(rememberMe)
    return (localStorage.getItem("userID"));
  else
    return (sessionStorage.getItem("userID"));
}
export function logOut(){
  const rememberMe = localStorage.getItem("rememberMe") === true;
  if(rememberMe)
    localStorage.removeItem("userID");
  else
    sessionStorage.removeItem("userID");
  window.location.href='/';
}

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Navbar page="homepage"/>}>
          <Route element={<Homepage/>}/>
        </Route>
        <Route path="/menu" element={<Navbar page="menu"/>}>
          <Route element={<Menu/>}/>
        </Route>
        <Route path="/login" element={<Navbar page="login"/>}>
          <Route element={<Login/>}/>
        </Route>
        <Route path="/signup" element={<Navbar page="signup"/>}>
          <Route element={<Signup/>}/>
        </Route>
        <Route path="/reservation" element={<Navbar page="reservation"/>}>
          <Route element={<Book/>}/>
        </Route>
        <Route path="/profile" element={<Navbar page="profile"/>}>
          <Route element={<Profile/>}/>
        </Route>
        <Route path="*" element={<Navbar/>}/>
      </Routes>
    </div>
  );
}

export default App;
