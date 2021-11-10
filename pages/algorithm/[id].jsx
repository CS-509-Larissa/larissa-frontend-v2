import { useRouter } from "next/router";
import React from "react";
import Tree from "../../components/Tree";

import useAlgorithm from "../../hooks/algorithm";
import useUser from "../../hooks/user";

const AlgorithmView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  const { algorithm } = useAlgorithm(id);
  console.log(algorithm);

  return (
    <div className="hbox">
      <Tree />
      {algorithm === null ? (
        <i>Loading algorithm {id}</i>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
        >
          <h1>{algorithm.name}</h1>
          <p>
            <b>Algorithm ID: </b> {algorithm.id}
          </p>
          <p>
            <b>Classification ID: </b> {algorithm.classification}
          </p>
          <h2>Implementations</h2>
          <p>
            <i>No implementations found</i>
          </p>
          <div>
            <input
              className="form-control"
              type="file"
              disabled={user === null}
            />

            <button
              className="btn btn-warning"
              style={{ marginTop: "10px" }}
              disabled={user === null}
            >
              Upload Implementation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmView;