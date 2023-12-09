/*
const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://greyboolean-donable.netlify.app'
    : 'http://localhost:5173';
*/
const clientUrl =
  process.env.NODE_ENV === 'production' ? 'https://donable.onrender.com' : 'http://localhost:5173';

exports.CLIENT_BASE_URL = clientUrl;
