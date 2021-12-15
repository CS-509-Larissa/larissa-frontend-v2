import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "../hooks/user";

const Nav = (props) => {
  const { user, mutate, error } = useUser();
  const router = useRouter();

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="hbox">
          <div className="nav-link" onClick={() => router.push("/")}>
            Home
          </div>
          <div className="nav-link" onClick={() => router.push("/admin")}>
            Admin
          </div>
        </div>

        {user ? (
          <div className="hbox">
            <div className="nav-welcome">Hello, {user.username}</div>
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
          <div className="hbox">
            <button
              className="btn btn-primary form-button nav-button"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-secondary form-button nav-button"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
