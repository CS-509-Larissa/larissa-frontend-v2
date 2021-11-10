import useSWR from "swr";
import fetcher from "../fetcher";

const useClassifications = () => {
  const { data, mutate } = useSWR("/classifications", fetcher);
  let classifications = null;

  try {
    classifications = JSON.parse(data);
  } catch (error) {
    classifications = null;
  }

  console.log(classifications);

  return { classifications, mutate };
};

export default useClassifications;
