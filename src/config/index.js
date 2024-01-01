import _ from 'lodash';

import defaults from './stage';

const APP_ENV = 'prod';

const envOverrides = require(`./${APP_ENV}.js`);
console.log('mm', _.merge({}, defaults, envOverrides));
export default _.merge({}, defaults, envOverrides);
