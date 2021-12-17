import useSWR from "swr";
import fetcher from "../fetcher";

const useAlgorithm = (id) => {
  const { data, mutate } = useSWR(`/algorithms/${id}`, fetcher);
  let algorithm = null;

  console.log(data);
  try {
    algorithm = JSON.parse(data);
  } catch (error) {
    algorithm = null;
  }

  console.log(algorithm);

  return { algorithm, mutate };
};

export default useAlgorithm;
