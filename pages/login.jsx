import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import cookie from "js-cookie";

const Login = (props) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate } = useSWRConfig();

  const login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const body = { username, password };
    console.log(body);

    const res = await fetch(process.env.awsUri + "/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(res);
    const sessionToken = await res.text();
    console.log(sessionToken);
    if (sessionToken === "null") {
      setErrorMsg("Bad login!");

      return;
    }
    //document.cookie = `larissa=${sessionToken.replace(/\"/g, "")}`;
    cookie.set("larissa", sessionToken.replace(/\"/g, ""));
    console.log(document.cookie);
    console.log(cookie.get("larissa"));
    mutate("/me", { username });
    router.push("/");
  };

  return (
    <div className="centered-page">
      <div className="form-container">
        <div className="centered-hbox">
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
          <p className="text-danger">{errorMsg}</p>
          <div className="button-row">
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
      </div>
    </div>
  );
};

export default Login;
