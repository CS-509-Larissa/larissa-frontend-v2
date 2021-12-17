import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import TreeView from "react-treeview";
import useClassifications from "../hooks/classifications";
import useUser from "../hooks/user";

import { Dropdown } from "react-bootstrap";
import Loading from "./Loading";

const ClassificationTree = (props) => {
  const router = useRouter();
  return (
    <TreeView
      nodeLabel={
        <span
          className="classification-link"
          onClick={() =>
            router.push(`/classification/${props.classification.id}`)
          }
        >
          {props.classification.name}
        </span>
      }
      defaultCollapsed={false}
      key={props.classification.id}
    >
      {props.classification.subClassifications.map((node, i) => (
        <ClassificationTree classification={node} key={node.id} />
      ))}
      <div className="vbox">
        {props.classification.algorithms.map((node, i) => (
          <span
            className="algorithm-link"
            onClick={() => router.push(`/algorithm/${node.id}`)}
            key={node.id}
          >
            {node.name}
          </span>
        ))}
      </div>
    </TreeView>
  );
};

/*

        */
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
    <div className="tree-container">
      <div className="tree">
        <div style={{ marginBottom: "5px" }}>
          <Dropdown disabled={user === null}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Add New
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/add/classification">
                Classification
              </Dropdown.Item>
              <Dropdown.Item href="/add/algorithm">Algorithm</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {classifications === null ? (
          <Loading message="Loading ontology" />
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
    </div>
  );
};

export default Tree;
