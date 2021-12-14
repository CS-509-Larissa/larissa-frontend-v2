import useActivity from "../hooks/activity";
import Tree from "../components/Tree";

const Admin = () => {
  const { activity } = useActivity();

  console.log(activity);

  return (
    <div className="hbox">
      <Tree />
      <div>
        <h1>User Activity</h1>
        {activity ? (
          <table className="table">
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
      </div>
    </div>
  );
};

export default Admin;
