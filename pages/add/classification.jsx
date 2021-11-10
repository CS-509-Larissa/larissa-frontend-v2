import path from "path";
import React from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const AddClassification = (props) => {
  const router = useRouter();

  const addClassification = async () => {
    const name = document.getElementById("name").value;

    const body = { name };
    console.log(body);

    const res = await fetch(path.join(process.env.awsUri, "/classifications"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    mutate("/classifications");
    router.push("/");
  };
  return (
    <div className="centered-page">
      <div className="form-container">
        <div className="centered-hbox">
          <h4>Add Classification</h4>
        </div>
        <form onSubmit={() => null}>
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
            <p>
              <i>Only top-level classifications supported at this time</i>
            </p>
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

export default AddClassification;
