// swagger/servers.js

import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const basePath = process.env.BASE_PATH || "api";
const versionsApi = process.env.VERSIONS_API
  ? process.env.VERSIONS_API.split(",")
  : ["v1"];

const servers = [
  {
    url: `${baseUrl}/${basePath}/${versionsApi}`,
    description: "URL Server",
    variables: {
      basePath: {
        enum: [basePath],
        default: basePath,
      },
      versionApi: {
        enum: versionsApi,
        default: versionsApi[0],
      },
    },
  },
];

export default servers;
