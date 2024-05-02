import  './Navbar.css'
import {  NavLink } from 'react-router-dom';


const Navbar = ({ toggleSidebar , isAuthenticated, handleLogout  }) => {



  return (
    <div className="navbar">
      <h2 className="logo">BAU ASP</h2>

      <button id="toggle-btn" className="toggler" onClick={toggleSidebar}>
        &#9776;
      </button>

      <div className="links">
        <ul>
          <li>
            <NavLink exact to="/home" activeClassName="active">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/" activeClassName="active">
             FormPage
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/users" activeClassName="active">
              Users
            </NavLink>
          </li>

          
         
    
             
        </ul>
      </div>
    </div>
  );
};

export default Navbar


