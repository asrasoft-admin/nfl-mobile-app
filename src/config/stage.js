import {
  STAGE_AXIOS_INSTANCE_URL,
  STAGE_BASE_URL,
  STAGE_CLOUDINARY_URL,
  STAGE_CLOUDINARY_DATA_STR,
} from '@env';

module.exports = {
  env: 'stage',
  baseURL: {
    AXIOS_INSTANCE_URL: STAGE_AXIOS_INSTANCE_URL,
    BASE_URL: STAGE_BASE_URL,
  },
  cloudinaryURL: {
    STAGE_CLOUDINARY_URL: STAGE_CLOUDINARY_URL,
    STAGE_CLOUDINARY_DATA_STR: STAGE_CLOUDINARY_DATA_STR,
  },
  featureFlags: {
    ShowNflLogo: false,
    syncDataFeature: false,
    otpByPassFeature: true,
    showQuantityInDealFeature: true,
  },
};
