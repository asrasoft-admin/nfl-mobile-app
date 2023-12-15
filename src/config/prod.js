import {
  PROD_AXIOS_INSTANCE_URL,
  PROD_BASE_URL,
  PROD_S3_REGION,
  PROD_S3_ACCESS_KEY_ID,
  PROD_S3_SECRET_ACCESS_KEY,
  PROD_S3_BUCKET,
} from '@env';

module.exports = {
  env: 'prod',
  baseURL: {
    AXIOS_INSTANCE_URL: PROD_AXIOS_INSTANCE_URL,
    BASE_URL: PROD_BASE_URL,
  },
  S3_URL: {
    PROD_S3_REGION: PROD_S3_REGION,
    PROD_S3_ACCESS_KEY_ID: PROD_S3_ACCESS_KEY_ID,
    PROD_S3_SECRET_ACCESS_KEY: PROD_S3_SECRET_ACCESS_KEY,
    PROD_S3_BUCKET: PROD_S3_BUCKET,
  },
  featureFlags: {
    ShowNflLogo: true,
    syncDataFeature: true,
    otpByPassFeature: true,
    showQuantityInDealFeature: false,
  },
};
