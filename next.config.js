/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "static.saavncdn.com",
      },
      {
        hostname: "c.saavncdn.com",
      },
      {
        hostname: "www.jiosaavn.com",
        protocol: "https",
      },
    ],
  },
};

export default config;
