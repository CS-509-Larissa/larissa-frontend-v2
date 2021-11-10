import React from "react";
import { Link, useHistory } from "react-router-dom";
import useUser from "../hooks/user";

const Nav = (props) => {
  const { user, mutate, error } = useUser();
  const history = useHistory();

  return (
    <div className="navigation">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <>
        {user ? (
          <div>
            Hello, {user.username}{" "}
            <button
              className="btn btn-danger"
              onClick={() => {
                document.cookie = "larissa=badcookielol";
                mutate();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-primary form-button"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-secondary form-button"
              onClick={() => {
                history.push("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Nav;
