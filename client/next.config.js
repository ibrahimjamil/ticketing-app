
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: '/app/:path*',
				destination: '/app',
      },
    ]
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin({ ...process.env }));
    return config;
  }
})