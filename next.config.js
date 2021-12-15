const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    awsUri: "https://1z0jj6ss12.execute-api.us-east-1.amazonaws.com/Stage1",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "scss")],
  },
};
