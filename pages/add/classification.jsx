import React from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import useClassifications from "../../hooks/classifications";
import flattenClassifications from "../../util/flattenClassifications";

const AddClassification = (props) => {
  const router = useRouter();
  const { classifications } = useClassifications();

  const addClassification = async () => {
    const name = document.getElementById("name").value;
    const parent = document.getElementById("parent").value;

    const body = { name, parent };
    console.log(body);

    const tokenCookie = document.cookie;
    const res = await fetch(process.env.awsUri + "/classifications", {
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
    <div className="form-container">
      <div className="form">
        <div className="hbox--centered">
          <h4>Add Classification</h4>
        </div>
        <form onSubmit={() => null}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Algorithms"
              id="name"
            />
          </div>
          <div className="form-group">
            <label>Parent</label>
            <select className="form-select" id="parent">
              {classifications ? (
                [
                  <option value="none" key="0">
                    None
                  </option>,
                ].concat(
                  flattenClassifications(classifications).map((c) => {
                    return (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    );
                  })
                )
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="hbox--centered">
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
