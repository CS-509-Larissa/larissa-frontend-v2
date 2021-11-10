import React, { useState } from "react";
import path from "path";
import aws from "../../aws.json";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";

const Signup = (props) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");

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

    const res = await fetch(path.join(aws.uri, "/users"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);
    //console.log(res.status);

    const sessionToken = await res.text();
    console.log(sessionToken);
    if (sessionToken === "null") {
      setErrorMsg("Username taken, or other error!");
      return;
    }
    document.cookie = `larissa=${sessionToken.replace(/\"/g, "")};`;
    console.log(document.cookie);

    mutate("/me");
    history.push("/");
  };
  return (
    <div className="centered-page">
      <div className="form-container">
        <div className="centered-hbox">
          <h4>Signup</h4>
        </div>
        <form onsubmit="return false">
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
          <p className="text-danger">{errorMsg}</p>
          <div className="button-row">
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
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
