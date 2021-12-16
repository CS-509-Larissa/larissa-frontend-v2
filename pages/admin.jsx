import useActivity from "../hooks/activity";
import Tree from "../components/Tree";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Admin = () => {
  const { activity } = useActivity();

  console.log(activity);

  return (
    <>
      <Tree />
      <div className="main-container">
        <div className="main">
          <div className="main-view">
            <h1>Administrator Access</h1>
            <Tabs>
              <TabList>
                <Tab>Users</Tab>
                <Tab>Activity</Tab>
              </TabList>

              <TabPanel>
                <h1>User List</h1>
              </TabPanel>

              <TabPanel>
                {activity ? (
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Time</th>
                        <th scope="col">User</th>
                        <th scope="col">Event Type</th>
                        <th scope="col">Entity Type</th>
                        <th scope="col">ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.map((a) => (
                        <tr key={a.event_id}>
                          <td>{a.timestamp}</td>
                          <td>{a.username}</td>
                          <td>{a.event_type}</td>
                          <td>{a.entity_type}</td>
                          <td>{a.event_id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <i>Loading</i>
                )}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
