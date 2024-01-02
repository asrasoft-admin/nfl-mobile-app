import _ from 'lodash';

import defaults from './stage';

const APP_ENV = 'stage';

const envOverrides = require(`./${APP_ENV}.js`);
export default _.merge({}, defaults, envOverrides);
