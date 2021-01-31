import React, { useContext, useEffect, useState } from "react";
/* import React Router Link */
import { Link } from "react-router-dom";
import "./login.css";

/* import auth context */

import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  };

  return (
    <div className="text-center mt-5">
      <form className="form-signin" onSubmit={submitForm}>
        {error && (
          <div className="alert alert-danger " role="alert">
            {error.map((error, i) => (
              <p className=" mb-0" key={i}>
                {error.msg}
              </p>
            ))}
          </div>
        )}

        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control  mb-2"
          placeholder="Email address"
          name="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-4"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button className="btn btn-lg btn-success btn-block" type="submit">
          Sign in
        </button>
        <hr />
        <div>
          no account ? sign up <Link to="/register">here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
