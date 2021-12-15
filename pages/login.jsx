import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import useUser from "../hooks/user";

import Loading from "../components/Loading";

const Login = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, mutate } = useUser();

  const login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const body = { username, password };
    console.log(body);

    setLoading(true);

    const res = await fetch(process.env.awsUri + "/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(res);
    const sessionToken = await res.text();

    setLoading(false);
    console.log(sessionToken);
    if (sessionToken === "null") {
      setErrorMsg("Bad login!");

      return;
    }
    //document.cookie = `larissa=${sessionToken.replace(/\"/g, "")}`;
    cookie.set("larissa", sessionToken.replace(/\"/g, ""));
    //console.log(document.cookie);
    //console.log(cookie.get("larissa"));
    mutate({ username });
    router.push("/");
  };

  return (
    <div className="form-container">
      <div className="form">
        {loading ? (
          <Loading message="Logging in" />
        ) : (
          <>
            <div className="hbox--centered">
              <h4>Login</h4>
            </div>
            <form onSubmit={() => null}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="george"
                  id="username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="hbox--centered">
                <p className="text-danger">{errorMsg}</p>
              </div>

              <div className="hbox--centered">
                <button
                  type="button"
                  className="btn btn-primary form-button"
                  onClick={login}
                >
                  Login
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

export default Login;
