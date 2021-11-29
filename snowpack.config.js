module.exports = {
  mount: {
    './frontend/src': '/',
    './frontend/public': '/'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-sass'
  ],
  devOptions: {
    port: 4000
  }
};
