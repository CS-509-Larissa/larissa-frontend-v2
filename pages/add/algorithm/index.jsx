import React from "react";
import { useHistory } from "react-router";
import useClassifications from "../../../hooks/classifications";
import aws from "../../../aws.json";
import { mutate } from "swr";
import path from "path";

const AddAlgorithm = (props) => {
  const { classifications } = useClassifications();
  const history = useHistory();

  const addAlgorithm = async () => {
    console.log("Adding algorithm");
    const name = document.getElementById("name").value;
    const classification = document.getElementById("classification").value;

    const body = { name, classification };
    console.log(body);

    const res = await fetch(path.join(aws.uri, "/classifications/algorithms"), {
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
          <h4>Add Algorithm</h4>
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
            <label>Classification</label>
            <select
              className="form-select"
              id="classification"
              aria-label="Default select example"
            >
              {classifications === null ? (
                <></>
              ) : (
                classifications.map((classification) => {
                  return (
                    <option value={classification.id}>
                      {classification.name}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <div className="button-row">
            <button
              type="button"
              className="btn btn-primary form-button"
              onClick={addAlgorithm}
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

export default AddAlgorithm;
