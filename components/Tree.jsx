import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import TreeView from "react-treeview";
import useClassifications from "../hooks/classifications";
import useUser from "../hooks/user";

import { Dropdown } from "react-bootstrap";

const ClassificationTree = (props) => {
  return (
    <TreeView
      nodeLabel={
        <b>
          <Link href={`/classification/${props.classification.id}`}>
            {props.classification.name}
          </Link>
        </b>
      }
      defaultCollapsed={false}
      key={props.classification.id}
    >
      {props.classification.subClassifications.map((node, i) => (
        <ClassificationTree classification={node} key={node.id} />
      ))}
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
        <Dropdown style={{ margin: "5px" }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Add New
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/add/classification">
              Classification
            </Dropdown.Item>
            <Dropdown.Item href="/add/algorithm">Algorithm</Dropdown.Item>
            <Dropdown.Item>Benchmark</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
