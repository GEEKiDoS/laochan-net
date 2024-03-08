import dotenv from 'dotenv';
dotenv.config();

class Config {
  get port() {
    return process.env.PORT ? parseInt(process.env.PORT) : 10573;
  }

  get selfUrl() {
    return process.env.SELF_URL ?? 'http://127.0.0.1:10573';
  }

  get ntpUrl() {
    return process.env.NTP_URL ?? 'ntp://pool.ntp.org';
  }

  get mongoUrl() {
    return process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017';
  }

  get dbName() {
    return process.env.DB_NAME ?? 'laochan-net';
  }

  get isDev() {
    return process.env.NODE_ENV !== 'production';
  }
}

export const config = new Config();
export default config;
