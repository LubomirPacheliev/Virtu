// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

module.exports = {
  mount: {
    src: '/frontend',
    public: {url: '/frontend', static: true}
  },
  plugins: [
    '@snowpack/plugin-react-refresh'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
