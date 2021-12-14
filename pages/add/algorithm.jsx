import React from "react";
import { useRouter } from "next/router";
import useClassifications from "../../hooks/classifications";
import flattenClassifications from "../../util/flattenClassifications";
import { mutate } from "swr";

const AddAlgorithm = (props) => {
  const { classifications } = useClassifications();
  const router = useRouter();

  const addAlgorithm = async () => {
    console.log("Adding algorithm");
    const name = document.getElementById("name").value;
    const classification = document.getElementById("classification").value;

    const body = { name, classification };
    console.log(body);

    const tokenCookie = document.cookie;
    const res = await fetch(process.env.awsUri + "/algorithms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Session-Token": tokenCookie,
      },
      body: JSON.stringify(body),
    });
    mutate("/classifications");
    router.push("/");
  };

  return (
    <div className="centered-page">
      <div className="form-container">
        <div className="centered-hbox">
          <h4>Add Algorithm</h4>
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
            <label>Classification</label>
            <select
              className="form-select"
              id="classification"
              aria-label="Default select example"
            >
              {classifications === null ? (
                <></>
              ) : (
                flattenClassifications(classifications).map((c) => {
                  return (
                    <option value={c.id} key={c.id}>
                      {c.name}
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

export default AddAlgorithm;
