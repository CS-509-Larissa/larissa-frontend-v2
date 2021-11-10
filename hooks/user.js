import useSWR from "swr";
import fetcher from "../fetcher";

const useUser = () => {
  const { data, mutate } = useSWR("/me", fetcher);
  let user = null;

  try {
    user = JSON.parse(data);
    console.log(`Logged in as ${user.username}`);
  } catch (error) {
    user = null;
  }

  return { user, mutate };
};

export default useUser;
