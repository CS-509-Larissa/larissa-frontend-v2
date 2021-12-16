import { useRouter } from "next/router";
import React, { useState } from "react";
import Tree from "../../components/Tree";

import useAlgorithm from "../../hooks/algorithm";
import useUser from "../../hooks/user";

import { v4 as uuidv4 } from "uuid";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loading from "../../components/Loading";
import useClassifications from "../../hooks/classifications";
import flattenClassifications from "../../util/flattenClassifications";

const AlgorithmView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  const [isReclassifying, setIsReclassifying] = useState(false);

  const { classifications, mutate: mutateClassifications } =
    useClassifications();
  const { algorithm, mutate: mutateAlgorithm } = useAlgorithm(id);
  //console.log(algorithm);

  const reclassify = async () => {
    const tokenCookie = document.cookie;
    const classificationId = document.getElementById("newClassification").value;

    const body = { algoID: algorithm.id, newClassification: classificationId };
    console.log(body);
    setIsReclassifying(true);

    const res = await fetch(
      process.env.awsUri + `/algorithms/${algorithm.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-Token": tokenCookie,
        },
        body: JSON.stringify(body),
      }
    );
    console.log(await res.text());
    setIsReclassifying(false);
    mutateClassifications();
    mutateAlgorithm();
  };

  const deleteAlgorithm = async () => {
    const tokenCookie = document.cookie;
    console.log(`Deleting algorithm ${id}`);
    const res = await fetch(process.env.awsUri + `/algorithms/${id}`, {
      method: "DELETE",
      headers: {
        "Session-Token": tokenCookie,
      },
    });
    console.log(await res.text());
    mutateClassifications();
    router.push("/");
  };

  const addImplementation = async () => {
    console.log(`Adding implementation for algorihtm ${id}`);

    const fileElement = document.getElementById("file");
    if (fileElement.files.length === 0) {
      console.log("No file selected, aborting");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      console.log(event.target.result);

      const file = event.target.result;

      const language = document.getElementById("language").value;

      const name = uuidv4();
      const algo_id = id;

      const body = { file, name, algo_id, language };
      console.log(body);

      const res = await fetch(process.env.awsUri + "/implementation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      mutate();
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(fileElement.files[0]);
  };

  return (
    <>
      <Tree />
      <div className="main-container">
        <div className="main">
          {algorithm ? (
            <div className="main-view">
              <h1>{algorithm.name}</h1>
              <p>
                <b>Algorithm ID: </b> {algorithm.id}
              </p>
              <p>
                <b>Classification ID: </b> {algorithm.classification}
              </p>

              <Tabs>
                <TabList>
                  <Tab>Implementations</Tab>
                  <Tab>Problem Instances</Tab>
                  <Tab>Benchmarks</Tab>
                  <Tab>Advanced</Tab>
                </TabList>

                <TabPanel>
                  <h2>Implementations</h2>
                  {algorithm.implementations.length === 0 ? (
                    <p>
                      <i>No implementations found</i>
                    </p>
                  ) : (
                    <ul>
                      {algorithm.implementations.map((imp, i) => {
                        return (
                          <li key={i} style={{ marginTop: "10px" }}>
                            <a href={imp}>{imp}</a>
                            <button
                              className="btn btn-danger"
                              style={{ marginLeft: "10px" }}
                              disabled
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <div>
                    <hr />
                    <h4>Add Implementation</h4>
                    <div className="hbox">
                      <b>Language: </b>
                      <input
                        className="form-control"
                        type="text"
                        id="language"
                        placeholder="java"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>

                    <input
                      style={{ marginTop: "10px" }}
                      className="form-control"
                      type="file"
                      disabled={user === null}
                      id="file"
                    />

                    <button
                      className="btn btn-warning"
                      style={{ marginTop: "10px" }}
                      disabled={user === null}
                      onClick={addImplementation}
                    >
                      Add Implementation
                    </button>
                  </div>
                </TabPanel>
                <TabPanel>
                  {/* GETALGORITHM NEEDS TO RETURN INSTANCES NOW*/}

                  <h2>Problem Instances</h2>
                  <div>
                    <hr />
                    <h4>Add Problem Instance</h4>
                    <div className="hbox">
                      <b>Name: </b>
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        placeholder="Best Case"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>

                    <input
                      style={{ marginTop: "10px" }}
                      className="form-control"
                      type="file"
                      disabled={user === null}
                      id="file"
                    />

                    <button
                      className="btn btn-warning"
                      style={{ marginTop: "10px" }}
                      disabled={user === null}
                      onClick={() => {}}
                    >
                      Add Instance
                    </button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h1>Benchmarks</h1>
                </TabPanel>
                <TabPanel>
                  {isReclassifying ? (
                    <Loading message="Reclassifying" />
                  ) : (
                    <div className="vbox">
                      <div className="hbox" style={{ margin: "5px" }}>
                        <button
                          className="btn btn-warning mx-auto"
                          style={{ marginRight: "5px" }}
                          onClick={reclassify}
                          disabled={user === null}
                        >
                          Reclassify
                        </button>
                        <select
                          className="form-select"
                          style={{ marginLeft: "5px" }}
                          id="newClassification"
                        >
                          {classifications ? (
                            flattenClassifications(classifications).map((c) => (
                              <option
                                key={c.id}
                                value={c.id}
                                disabled={c.id === algorithm.classification}
                              >
                                {c.name}
                              </option>
                            ))
                          ) : (
                            <></>
                          )}
                        </select>
                      </div>
                      <div style={{ margin: "5px" }}>
                        <button
                          className="btn btn-danger"
                          onClick={deleteAlgorithm}
                          disabled={user === null}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </TabPanel>
              </Tabs>
            </div>
          ) : (
            <Loading message={`Loading algorithm ${id}`} />
          )}
        </div>
      </div>
    </>
  );
};

export default AlgorithmView;
