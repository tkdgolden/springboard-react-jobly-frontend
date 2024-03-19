import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from './UserContext';
import React, { useContext } from 'react';

/**
 * displays nav bar with valid routes based on whether the user is logged in or not
 * @returns component
 */
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  }

  if (user !== "null" && user !== null) {
    return (
      <div>
        <Navbar expand="md">
          <NavLink to="/" className="navbar-brand">
            React Jobly
          </NavLink>
  
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <button onClick={logout}>Log Out {user}</button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          React Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/login">Log In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;