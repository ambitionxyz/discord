const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = withNextIntl({
  ...nextConfig,
  reactStrictMode: true,
  transpilePackages: ["ui"],
});
