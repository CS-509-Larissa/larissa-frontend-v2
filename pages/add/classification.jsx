import path from "path";
import React from "react";
import { useHistory } from "react-router";
import { mutate } from "swr";
import aws from "../../aws.json";

const AddClassification = (props) => {
  const history = useHistory();

  const addClassification = async () => {
    const name = document.getElementById("name").value;

    const body = { name };
    console.log(body);

    const res = await fetch(path.join(aws.uri, "/classifications"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    mutate("/classifications");
    history.push("/");
  };
  return (
    <div className="centered-page">
      <div className="form-container">
        <div className="centered-hbox">
          <h4>Add Classification</h4>
        </div>
        <form onsubmit="return false">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Uniform Cost Search"
              id="name"
            />
          </div>
          <div className="form-group">
            <label>Parent</label>
            <p>Only top-level classifications supported at this time</p>
            <select disabled className="form-select"></select>
          </div>

          <div className="button-row">
            <button
              type="button"
              className="btn btn-primary form-button"
              onClick={addClassification}
            >
              Submit
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

export default AddClassification;
