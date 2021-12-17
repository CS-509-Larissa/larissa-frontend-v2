import useActivity from "../hooks/activity";
import Tree from "../components/Tree";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useUserList from "../hooks/userList";
import Loading from "../components/Loading";

const Admin = () => {
  const { activity } = useActivity();
  const { users, mutate: mutateUserList } = useUserList();

  //console.log(activity);

  const deleteUser = async (username) => {
    console.log(`Deleting ${username}`);

    const tokenCookie = document.cookie;
    const res = await fetch(process.env.awsUri + `/users/${username}`, {
      method: "DELETE",
      headers: { "Session-Token": tokenCookie },
    });

    console.log(await res.text());

    mutateUserList();
  };

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
                {users ? (
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.username}>
                          <td style={{ minWidth: "200px" }}> {u.username}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteUser(u.username)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Loading message="Loading user list" />
                )}
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
                  <Loading message="Loading user activity" />
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
