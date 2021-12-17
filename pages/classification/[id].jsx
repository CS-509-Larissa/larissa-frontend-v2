import { useRouter } from "next/router";
import Tree from "../../components/Tree";
import useClassifications from "../../hooks/classifications";
import flattenClassifications from "../../util/flattenClassifications";
import Link from "next/link";
import { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//import "react-tabs/style/react-tabs.scss";
import Loading from "../../components/Loading";

const Classification = () => {
  const router = useRouter();
  const { classifications, mutate } = useClassifications();
  const { id } = router.query;

  const [isMerging, setIsMerging] = useState(false);

  const classification = classifications
    ? flattenClassifications(classifications).find((c) => c.id === id)
    : null;

  const mergeClassification = async () => {
    const otherClassification = document.getElementById(
      "mergeClassification"
    ).value;
    console.log(`Merging ${id} and ${otherClassification}`);
    setIsMerging(true);
    const res = await fetch(
      process.env.awsUri +
        `/classifications/${id}?secondId=${otherClassification}`,
      {
        method: "POST",
        headers: { "Session-Token": document.cookie },
      }
    );

    console.log(await res.text());
    setIsMerging(false);

    mutate();
  };

  const deleteClassification = async () => {
    const tokenCookie = document.cookie;

    console.log(`Requesting to delete classification ${id}`);
    const res = await fetch(process.env.awsUri + `/classifications/${id}`, {
      method: "DELETE",
      headers: {
        "Session-Token": tokenCookie,
      },
    });

    console.log(await res.text());
    mutate();
    router.push("/");
  };

  return (
    <>
      <Tree />
      <div className="main-container">
        <div className="main">
          {classification ? (
            <div className="main-view">
              <h1>{classification.name}</h1>
              <p>
                <b>Classification ID: </b> {classification.id}
              </p>
              <Tabs>
                <TabList>
                  <Tab>Algorithms</Tab>
                  <Tab>SubClassifications</Tab>
                  <Tab>Advanced</Tab>
                </TabList>

                <TabPanel>
                  {classification.algorithms.length === 0 ? (
                    <i>None yet</i>
                  ) : (
                    <ul>
                      {classification.algorithms.map((a) => (
                        <li key={a.id}>
                          <Link href={`/algorithm/${a.id}`}>{a.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabPanel>
                <TabPanel>
                  {classification.subClassifications.length === 0 ? (
                    <i>None yet</i>
                  ) : (
                    <ul>
                      {classification.subClassifications.map((a) => (
                        <li key={a.id}>
                          <Link href={`/classification/${a.id}`}>{a.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabPanel>
                <TabPanel>
                  {isMerging ? (
                    <Loading message="Merging classification" />
                  ) : (
                    <>
                      <div className="hbox" style={{ margin: "5px" }}>
                        <button
                          className="btn btn-warning"
                          onClick={mergeClassification}
                        >
                          Merge
                        </button>
                        <select
                          className="form-select"
                          id="mergeClassification"
                        >
                          {flattenClassifications(classifications)
                            .filter(
                              (c) =>
                                c.parent === classification.parent &&
                                c.id !== classification.id
                            )
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div style={{ padding: "5px" }}>
                        <button
                          className="btn btn-danger"
                          onClick={deleteClassification}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </TabPanel>
              </Tabs>
            </div>
          ) : (
            <Loading message={`Loading classification ${id}`} />
          )}
        </div>
      </div>
    </>
  );
};

export default Classification;
