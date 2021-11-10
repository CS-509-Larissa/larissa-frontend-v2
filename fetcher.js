import path from "path";

import aws from "./aws.json";

const fetcher = (req) => {
  const url = path.join(aws.uri, req);
  console.log(`Fetching ${url}`);
  const tokenCookie = document.cookie;
  console.log(tokenCookie);
  return fetch(url, {
    method: "GET",
    headers: { "Session-Token": tokenCookie },
  }).then((res) => res.json());
};

export default fetcher;
