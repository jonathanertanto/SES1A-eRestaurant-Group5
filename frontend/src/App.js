import React from "react";
import {Routes, Route} from "react-router-dom";
import {Navbar} from "./view/navbar";
import {Homepage} from "./view/homepage";
import {Menu} from "./view/menu";
import {Login} from "./view/login";
import {Signup} from "./view/signup";
import {Book} from "./view/book";
import {Profile} from "./view/profile";

export const getUserID = _ => {
  const rememberMe = localStorage.getItem("rememberMe");
  if(rememberMe === "true")
    return (localStorage.getItem("userID"));
  else
    return (sessionStorage.getItem("userID"));
}
export const logOut = _ => {
  const rememberMe = localStorage.getItem("rememberMe");
  if(rememberMe === "true")
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
