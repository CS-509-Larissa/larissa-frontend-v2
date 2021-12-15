import React, { useState } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/user";

import cookie from "js-cookie";
import Loading from "../components/Loading";

const Signup = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, mutate } = useUser();

  const signup = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      //console.log("Passwords don't match");
      setErrorMsg("Passwords don't match!");
      return;
    }

    const body = { username, password };
    console.log(body);

    setLoading(true);

    const res = await fetch(process.env.awsUri + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);
    //console.log(res.status);

    const sessionToken = await res.text();

    setLoading(false);
    console.log(sessionToken);
    if (sessionToken === "null") {
      setErrorMsg("Username taken, or other error!");
      return;
    }
    cookie.set("larissa", sessionToken.replace(/\"/g, ""));
    //document.cookie = `larissa=${sessionToken.replace(/\"/g, "")}`;
    console.log(document.cookie);

    mutate({ username });
    router.push("/");
  };
  return (
    <div className="form-container">
      <div className="form">
        {loading ? (
          <Loading message="Signing up" />
        ) : (
          <>
            <div className="hbox--centered">
              <h4>Signup</h4>
            </div>
            <form onSubmit={() => null}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="jack"
                  id="username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                />
              </div>
              <div className="hbox--centered">
                <p className="text-danger">{errorMsg}</p>
              </div>

              <div className="hbox--centered">
                <button
                  type="button"
                  className="btn btn-primary form-button"
                  onClick={signup}
                >
                  Signup
                </button>
                <button
                  className="btn btn-secondary  form-button"
                  type="button"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
