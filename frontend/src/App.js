import React from "react";
import {Routes, Route} from "react-router-dom";
import {Navbar} from "./navbar/component/Navbar";
import {Homepage} from "./component/Homepage";
import {Menu} from "./menu/component/Menu";
import {Book} from "./reservation/component/Book";
import {Discount} from "./discount/component/Discount";
import {Profile} from "./profile/component/Profile";
import {Login} from "./account/component/Login";
import {Signup} from "./account/component/SignUp";
import { FinancialFigure } from "./financial_figure/component/FinancialFigure";
import { AccountList } from "./account/component/staff_access/AccountList";

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
        <Route path="/discount" element={<Navbar page="discount"/>}>
          <Route element={<Discount/>}/>
        </Route>
        <Route path="/financialfigure" element={<Navbar page="financialfigure"/>}>
          <Route element={<FinancialFigure/>}/>
        </Route>
        <Route path="/profile" element={<Navbar page="profile"/>}>
          <Route element={<Profile/>}/>
        </Route>
        <Route path="/accountlist" element={<Navbar page="accountlist"/>}>
          <Route element={<AccountList/>}/>
        </Route>
        <Route path="*" element={<Navbar/>}/>
      </Routes>
    </div>
  );
}
export default App;
