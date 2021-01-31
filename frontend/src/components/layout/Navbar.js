import React, { useContext } from "react";
/* import React Router Link */
import { Link } from "react-router-dom";

/* import auth context */

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link to="/" className="navbar-brand" href="#">
          Pictures Buy
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-2">
            {isAuthenticated ? null : (
              <Link to="/register">
                <button className="btn btn-success">sign up</button>
              </Link>
            )}
            {user != null ? (
              <h6 className="align-baseline" style={{ color: "#fff" }}>
                welcome {user.name}
              </h6>
            ) : null}
          </li>
          <li className="nav-item">
            {user != null && (
              <button
                className="btn btn-danger"
                style={{ color: "#fff" }}
                onClick={onLogout}
              >
                log out
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
