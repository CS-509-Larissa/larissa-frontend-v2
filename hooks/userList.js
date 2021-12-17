import useSWR from "swr";
import fetcher from "../fetcher";

const useUserList = () => {
  const { data, mutate } = useSWR("/users", fetcher);
  let users = null;

  console.log(data);

  try {
    users = JSON.parse(data);
  } catch (error) {
    users = null;
  }

  console.log("users: ");
  console.log(users);
  return { users, mutate };
};

export default useUserList;
