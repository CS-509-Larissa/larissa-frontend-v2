import useSWR from "swr";
import fetcher from "../fetcher";

const useActivity = () => {
  const { data, mutate } = useSWR(`/activity`, fetcher);
  let activity = null;

  //console.log(data);
  try {
    activity = JSON.parse(data);
  } catch (error) {
    activity = null;
  }

  return { activity, mutate };
};

export default useActivity;
