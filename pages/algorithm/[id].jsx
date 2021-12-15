import { useRouter } from "next/router";
import React from "react";
import Tree from "../../components/Tree";

import useAlgorithm from "../../hooks/algorithm";
import useUser from "../../hooks/user";

import { v4 as uuidv4 } from "uuid";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loading from "../../components/Loading";

const AlgorithmView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  const { algorithm, mutate } = useAlgorithm(id);
  //console.log(algorithm);

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
    mutate("/classifications");
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

      const name = uuidv4();
      const algo_id = id;

      const body = { file, name, algo_id };
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
                    <input
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
                      Upload Implementation
                    </button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h2>Problem Instances</h2>
                  <div>
                    <button disabled className="btn btn-warning">
                      Add Instance
                    </button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    <button
                      className="btn btn-danger mx-auto"
                      onClick={deleteAlgorithm}
                    >
                      Delete
                    </button>
                  </div>
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
