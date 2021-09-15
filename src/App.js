import React from "react";
import {Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar";
import {Homepage} from "./components/homepage";
import {Menu} from "./components/menu";
import {Login} from "./components/login";
import {Signup} from "./components/signup";

let loginStatus = false;

export function isLoggedIn(){
  return loginStatus===true;
}
export function logIn(){
  loginStatus = true;
}
export function logOut(){
  loginStatus = false;
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
      </Routes>
    </div>
  );
}
export default App;
