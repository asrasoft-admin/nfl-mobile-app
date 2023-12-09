import _ from 'lodash';

import defaults from './stage';

const APP_ENV = 'prod';

const envOverrides = require(`./${APP_ENV}`);
export default _.merge({}, defaults, envOverrides);
