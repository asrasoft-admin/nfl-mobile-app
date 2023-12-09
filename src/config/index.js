import _ from 'lodash';
// import {APP_ENV} from '@env';

import defaults from './stage';

// const APP_ENV = 'stage';
const APP_ENV = 'prod';

const envOverrides = require(`./${APP_ENV}`);
export default _.merge({}, defaults, envOverrides);
