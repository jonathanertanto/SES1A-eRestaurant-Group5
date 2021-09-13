import React from "react";
//import { NavbarToggler,Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";
import * as NavbarProperties from "react-bootstrap";
/*

export default props => {
    return (
        <div className = "header">
<nav className="navbar">
<NavbarProperties.Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <NavbarProperties.Container>
  <NavbarProperties.Navbar.Brand className = "nav-brand">Le Bistrot de Andre</NavbarProperties.Navbar.Brand>
  <NavbarProperties.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <NavbarProperties.Navbar.Collapse id="responsive-navbar-nav">
    <NavbarProperties.Nav className="me-auto">
     

        <NavbarProperties.NavDropdown.Divider />
      
   
    </NavbarProperties.Nav>
    <NavbarProperties.Nav>

      <NavbarProperties.Nav.Link href="#deets">
        Menu
       </NavbarProperties.Nav.Link>

      <NavbarProperties.Nav.Link 
            onClick={_ =>{
                props.setPage(1);
                }}>
        Book a Table
        </NavbarProperties.Nav.Link>

      <NavbarProperties.Nav.Link eventKey={2} href="#memes">
        Sign in
      </NavbarProperties.Nav.Link>

    </NavbarProperties.Nav>
  </NavbarProperties.Navbar.Collapse>
  </NavbarProperties.Container>
</NavbarProperties.Navbar>
</nav>
        </div>
        );
    };
    

    /*

*/
    export default props => {
      return (
          <div>

        <nav className="navbar">

            <div className="navbar-container">
                <NavbarProperties.Nav.Link to="/" className="navbar-logo">
                    ECO drvin
                </NavbarProperties.Nav.Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavbarProperties.Nav.Link to="/" className="nav-links">
                            Home
                        </NavbarProperties.Nav.Link>
                    </li>
                    <li className="nav-item">
                        <NavbarProperties.Nav.Link to="/" className="nav-links">
                            About
                        </NavbarProperties.Nav.Link>
                    </li>
                    <li className="nav-item">
                        <NavbarProperties.Nav.Link to="/" className="nav-links">
                            Pricing
                        </NavbarProperties.Nav.Link>
                    </li>
                    <li className="nav-item">
                        <NavbarProperties.Nav.Link to="/" className="nav-links">
                            Sign up
                        </NavbarProperties.Nav.Link>
                    </li>
                </ul>
            </div>
        </nav>
    


        </div>
        );
    };
    