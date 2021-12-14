import useSWR from "swr";
import fetcher from "../fetcher";
import flattenClassifications from "../util/flattenClassifications";

const useClassifications = () => {
  const { data, mutate } = useSWR("/classifications", fetcher);
  let classifications = null;

  try {
    classifications = JSON.parse(data);
  } catch (error) {
    classifications = null;
  }

  //console.log(classifications);
  //if (classifications) console.log(flattenClassifications(classifications));

  /*
  const testTree = [
    {
      name: "Top",
      subClassifications: [{ name: "bottom1" }, { name: "bottom2" }],
    },
  ];
  console.log(flattenClassifications(testTree));
  */

  return { classifications, mutate };
};

export default useClassifications;
