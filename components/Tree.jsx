import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import TreeView from "react-treeview";
import useClassifications from "../hooks/classifications";
import useUser from "../hooks/user";

const ClassificationTree = (props) => {
  return (
    <TreeView
      nodeLabel={<b>{props.classification.name}</b>}
      defaultCollapsed={false}
      key={props.classification.id}
    >
      {props.classification.algorithms.map((node, i) => (
        <div className="info" key={node.id}>
          <Link href={`/algorithm/${node.id}`}>{node.name}</Link>
        </div>
      ))}
    </TreeView>
  );
};

const Tree = (props) => {
  const { user } = useUser();
  const router = useRouter();
  const { classifications } = useClassifications();
  /*
  const dummyData = [
    {
      name: "Matrix Operations",
      algorithms: [],
      subClassifications: [
        {
          name: "Unary",
          subClassifications: [],
          algorithms: [{ name: "Transpose", implementations: [], id: "90138" }],
        },
        {
          name: "Binary",
          subClassifications: [],
          algorithms: [
            {
              name: "Addition",
              implementations: [],
              id: "1212",
            },
            { name: "Multiplication", implementations: [], id: "01" },
          ],
        },
      ],
    },
    {
      name: "Search Algorithms",
      algorithms: [
        { name: "A*", implementations: [], id: "1903" },
        { name: "Djikstra", implementations: [], id: "64748" },
      ],
      subClassifications: [],
    },
  ];
  */
  return (
    <div className="treeview-container">
      <div className="hbox">
        <button
          className="btn btn-primary"
          style={{ margin: "2px" }}
          onClick={() => {
            router.push("/add/classification");
          }}
          disabled={user === null}
        >
          Add Classification
        </button>
        <button
          className="btn btn-success"
          style={{ margin: "2px" }}
          onClick={() => {
            router.push("/add/algorithm");
          }}
          disabled={user === null}
        >
          Add Algorithm
        </button>
      </div>
      {classifications === null ? (
        <div>Loading ontology</div>
      ) : (
        classifications.map((node, i) => (
          <ClassificationTree
            classification={node}
            tree={node.id}
            key={node.id}
          />
        ))
      )}
    </div>
  );
};

export default Tree;