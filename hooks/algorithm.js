import useSWR from "swr";
import fetcher from "../fetcher";

const useAlgorithm = (id) => {
  const { data, mutate } = useSWR(`/classifications/algorithms/${id}`, fetcher);
  let algorithm = null;

  console.log(data);
  try {
    algorithm = JSON.parse(data);
  } catch (error) {
    algorithm = null;
  }

  return { algorithm, mutate };
};

export default useAlgorithm;
