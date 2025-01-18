/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withPWA from "next-pwa";

export default withPWA({
  disable: false,
  dest: "public", // destination directory for the PWA files
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})({
  images: {
    remotePatterns: [
      {
        hostname: "*.saavncdn.com",
      },
      {
        hostname: "www.jiosaavn.com",
        protocol: "https",
      },
    ],
  },
});
