import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { vu } from 'k6/execution';

const serviceUrl = __ENV.SERVICE_URL;
const numUsers = __ENV.NUM_USERS;
const payload = JSON.stringify({

});
const bearerToken = __ENV.TOKEN
const params = {
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://xxx.com',
    'Referer': 'https://xxx.com/',
    'appcode': 'appcode',
    'client-Session-Id': 'load-test-client-',
    'subscriptionid': '37f92c6752f7a803ec1c30c47ba5ab3d',
    'widget-Id': 'load-test-widget-',
    'Authorization': `Bearer ${bearerToken}`
  },
};
// Execution context variables
// export let options: Options = {
//   vus: 1,
//   duration: '10s'
// };

export const options = {
  scenarios: {
    'fifo': {
      executor: 'per-vu-iterations',
      vus: numUsers,
      iterations: 1,
      maxDuration: '1200s',
    },
  },
};

export default () => {
  while (true) {
    const testInstanceId = vu.idInTest - 1;
    console.log(testInstanceId);
    console.log(serviceUrl);
    params.headers['client-Session-Id'] = `load-test-client-${testInstanceId}`;
    params.headers['widget-Id'] = `load-test-widget-${testInstanceId}`;
    const res = http.post(serviceUrl, payload, params);
    console.log(res.status_text);
    console.log(res.body);
    console.log(res.status);
    if (res.status === 200) {
      break;
    }
  }
};
