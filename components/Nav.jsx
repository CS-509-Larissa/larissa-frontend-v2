import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "../hooks/user";

import { FaHome } from "react-icons/fa";

const Nav = (props) => {
  const { user, mutate, error } = useUser();
  const router = useRouter();

  return (
    <div className="navigation">
      <div className="nav-left">
        <Link href="/">Home</Link>
        {"     "}
        <Link href="/admin">Admin</Link>
      </div>
      <>
        {user ? (
          <div>
            Hello, {user.username}
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
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-secondary form-button"
              onClick={() => {
                router.push("/signup");
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
