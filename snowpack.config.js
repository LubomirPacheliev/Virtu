module.exports = {
  mount: {
    './frontend/src': '/',
    './frontend/public': '/'
  },
  plugins: [
    '@snowpack/plugin-react-refresh'
  ],
  devOptions: {
    port: 4000
  }
};
