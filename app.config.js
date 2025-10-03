require('dotenv').config();


module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_KEY: process.env.API_KEY,
  },
});


