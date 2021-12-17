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
import useActivity from "../../hooks/activity";
import { resolveShowConfigPath } from "@babel/core/lib/config/files";
import { mutate } from "swr";

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
      mutateAlgorithm();
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(fileElement.files[0]);
  };

  const addInstance = async () => {
    console.log(`Adding problem instance for algorihtm ${id}`);

    const fileElement = document.getElementById("instanceFile");
    if (fileElement.files.length === 0) {
      console.log("No file selected, aborting");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      console.log(event.target.result);

      const file = event.target.result;

      const name = document.getElementById("instanceName").value;

      //const name = uuidv4();
      const algo_id = id;

      const body = { file, name, algo_id };
      console.log(body);

      const res = await fetch(process.env.awsUri + "/instances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(await res.text());
      mutateAlgorithm();
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(fileElement.files[0]);
  };

  const deleteImplementation = async (implementation) => {
    console.log(`Deleting implementation ${implementation}`);

    const res = await fetch(
      process.env.awsUri + `/implementation/${implementation}`,
      {
        method: "DELETE",
        headers: { "Session-Token": document.cookie },
      }
    );

    console.log(await res.text());
    mutateAlgorithm();
  };

  const deleteInstance = async (instance) => {
    console.log(`Deleting instance ${instance}`);

    const res = await fetch(process.env.awsUri + `/instances/${instance}`, {
      method: "DELETE",
      headers: { "Session-Token": document.cookie },
    });

    console.log(await res.text());
    mutateAlgorithm();
  };

  const deleteBenchmark = async (benchmark) => {
    console.log(`Deleting benchmark ${benchmark}`);

    const res = await fetch(process.env.awsUri + `/benchmarks/${benchmark}`, {
      method: "DELETE",
      //headers: { "Session-Token": document.cookie },
    });

    console.log(await res.text());
    mutateAlgorithm();
  };

  const addBenchmark = async () => {
    const CPU = document.getElementById("benchmarkCpu").value;
    const CPUSpeed_hz = document.getElementById("benchmarkCpuSpeed").value;
    const L1Cache_kb = document.getElementById("benchmarkL1").value;
    const L2Cache_kb = document.getElementById("benchmarkL2").value;
    const L3Cache_kb = document.getElementById("benchmarkL3").value;
    const sockets = document.getElementById("benchmarkSockets").value;
    const cores = document.getElementById("benchmarkCores").value;
    const logicalProcessors = document.getElementById(
      "benchmarkProcessors"
    ).value;
    const time = document.getElementById("benchmarkTime").value;

    const algo_id = id;

    const impl_id = document.getElementById("benchmarkImplementation").value;
    const problem_id = document.getElementById("benchmarkInstance").value;

    const body = {
      CPU,
      CPUSpeed_hz,
      L1Cache_kb,
      L2Cache_kb,
      L3Cache_kb,
      sockets,
      cores,
      logicalProcessors,
      time,
      algo_id,
      impl_id,
      problem_id,
    };

    console.log(body);

    const res = await fetch(process.env.awsUri + `/benchmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(await res.text());

    mutateAlgorithm();
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
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Language</th>
                          <th scope="col">S3 Link</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {algorithm.implementations.map((i) => (
                          <tr key={i.file}>
                            <td>{i.language}</td>
                            <td>
                              <a href={i.file}>{i.file}</a>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteImplementation(i.id)}
                                disabled={user === null}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                  <h2>Problem Instances</h2>
                  {algorithm.instances.length === 0 ? (
                    <p>
                      <i>No problem instances found</i>
                    </p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">S3 Link</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {algorithm.instances.map((i) => (
                          <tr key={i.file}>
                            <td>{i.name}</td>
                            <td>
                              <a href={i.file}>{i.file}</a>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteInstance(i.id)}
                                disabled={user === null}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  <div>
                    <hr />
                    <h4>Add Problem Instance</h4>
                    <div className="hbox">
                      <b>Name: </b>
                      <input
                        className="form-control"
                        type="text"
                        id="instanceName"
                        placeholder="Best Case"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>

                    <input
                      style={{ marginTop: "10px" }}
                      className="form-control"
                      type="file"
                      disabled={user === null}
                      id="instanceFile"
                    />

                    <button
                      className="btn btn-warning"
                      style={{ marginTop: "10px" }}
                      disabled={user === null}
                      onClick={() => addInstance()}
                    >
                      Add Instance
                    </button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <h4>Benchmarks</h4>
                  {algorithm.benchmarks.length === 0 ? (
                    <i>No benchmarks found</i>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Instance</th>
                          <th scope="col">Implementation</th>
                          <th scope="col">Time</th>
                          <th scope="col">CPU</th>
                          <th scope="col">Speed (Hz)</th>
                          <th scope="col">L1 (kb)</th>
                          <th scope="col">L2 (kb)</th>
                          <th scope="col">L3 (kb)</th>
                          <th scope="col">Cores</th>
                          <th scope="col">Processors</th>
                          <th scope="col">Sockets</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {algorithm.benchmarks.map((b) => (
                          <tr key={b.id}>
                            <td>{b.instance}</td>
                            <td>{b.implementation}</td>
                            <td>{b.time}</td>
                            <td>{b.CPU}</td>
                            <td>{b.CPUSpeed_hz}</td>
                            <td>{b.L1Cache_kb}</td>
                            <td>{b.L2Cache_kb}</td>
                            <td>{b.L3Cache_kb}</td>
                            <td>{b.cores}</td>
                            <td>{b.logicalProcessors}</td>
                            <td>{b.sockets}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteBenchmark(b.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <hr />
                  <h4>Add Benchmark</h4>
                  <div className="hbox">
                    <b className="benchmark-label">Implementation: </b>
                    <select
                      className="form-select"
                      style={{ marginLeft: "5px" }}
                      id="benchmarkImplementation"
                    >
                      {algorithm.implementations.map((i) => (
                        <option value={i.id} key={i.id}>
                          {i.language}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">Problem Instance: </b>
                    <select
                      className="form-select"
                      style={{ marginLeft: "5px" }}
                      id="benchmarkInstance"
                    >
                      {algorithm.instances.map((i) => (
                        <option value={i.id} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">CPU: </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Intel i9"
                      id="benchmarkCpu"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">CPU Speed (hZ): </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="20"
                      id="benchmarkCpuSpeed"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">L1 Size (kb): </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="10"
                      id="benchmarkL1"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">L2 Size (kb): </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="20"
                      id="benchmarkL2"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">L3 Size (kb): </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="40"
                      id="benchmarkL3"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">Sockets: </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1"
                      id="benchmarkSockets"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">Cores: </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="4"
                      id="benchmarkCores"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">Logical Processors: </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="3"
                      id="benchmarkProcessors"
                    />
                  </div>
                  <div className="hbox">
                    <b className="benchmark-label">Time (s): </b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.4"
                      id="benchmarkTime"
                    />
                  </div>
                  <button className="btn btn-warning" onClick={addBenchmark}>
                    Add Benchmark
                  </button>
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
