import useSWR from "swr";
import fetcher from "../fetcher";

const useUser = () => {
  const { data, mutate } = useSWR("/me", fetcher);
  let user = null;

  try {
    user = JSON.parse(data);
  } catch (error) {
    user = null;
  }

  return { user, mutate };
};

export default useUser;
