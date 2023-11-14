import http_proxy from "http-proxy";
import { HttpProxyAgent } from "http-proxy-agent";
import axios from "axios";

/**
 * Retrieve the connectivity token
 * @param {string} token_url Token URL
 * @param {object} options Axios options
 */
async function get_connectivity_token(token_url, options) {
  try {
    const response = await axios({
      method: "POST",
      url: token_url,
      data: new URLSearchParams(options),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.data.access_token)
      throw new Error("Could not retrieve connectivity access token!");
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}
export default function ({ log, middlewareUtil, options, resources }) {
  const routing = options.configuration;
  const proxy_url = `http://${routing.proxy.host}:${routing.proxy.port}`;
  const agent = new HttpProxyAgent(proxy_url);
  const proxy = http_proxy.createProxyServer({ agent: agent });
  const data = {
    client_id: routing.connectivity.clientId,
    client_secret: routing.connectivity.clientSecret,
    grant_type: "client_credentials",
  };
  return async function (req, res, next) {
    const route = routing.backend.find((route) => req.url.includes(route.path));

    if (route) {
      try {
        const user = Buffer.from(
          `${route.auth.username}:${route.auth.password}`
        ).toString("base64");
        const token = get_connectivity_token(
          routing.connectivity.tokenUrl,
          data
        );
        req.headers.Authorization = `Basic ${user}`;
        req.headers["Proxy-Authorization"] = `Bearer ${token}`;
        req.headers["SAP-Connectivity-SCC-Location_ID"] = route.ccID;
        req.headers["host"] = route.target;

        proxy.web(req, res, {
          target: `http://${route.target}`,
          toProxy: true,
        });
      } catch (error) {
        throw error;
      }
    } else {
      next();
    }
  };
}
