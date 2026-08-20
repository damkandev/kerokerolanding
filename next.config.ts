import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "kerokero.cl",
          },
        ],
        destination: "https://www.kerokero.cl/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
