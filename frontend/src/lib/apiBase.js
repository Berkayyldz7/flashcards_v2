
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const fromEnv = process.env.REACT_APP_API_BASE;

let API_BASE;

if (isDev) {
  if (fromEnv) {
    API_BASE = fromEnv; // ör: http://192.168.1.44:5001
  } else {
    const host = window.location.hostname; // 192.168.1.44 ya da localhost
    API_BASE = `http://${host}:5001`;
  }
} else {
  // PROD: aynı origin altında /api (Nginx proxy)
  API_BASE = `${window.location.origin}/api`;
}

export { API_BASE };
