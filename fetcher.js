import path from "path";

const fetcher = (req) => {
  const url = process.env.awsUri + req;
  console.log(`Fetching ${url}`);
  const tokenCookie = document.cookie;
  console.log(tokenCookie);
  return fetch(url, {
    method: "GET",
    headers: { "Session-Token": tokenCookie },
  }).then((res) => res.json());
};

export default fetcher;
