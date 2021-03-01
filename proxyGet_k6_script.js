import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    one_request: {
      executor: 'constant-arrival-rate',
      exec: 'one_request',
      rate: 1,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1,
      maxVUs: 1,
    },
    ten_requests: {
      executor: 'constant-arrival-rate',
      exec: 'ten_requests',
      rate: 10,
      timeUnit: '1s',
      startTime: '60s',
      duration: '60s',
      preAllocatedVUs: 10,
      maxVUs: 10,
    },
    hundred_requests: {
      executor: 'constant-arrival-rate',
      exec: 'hundred_requests',
      rate: 100,
      timeUnit: '1s',
      startTime: '120s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 100,
    },
    four_hundreds_requests: {
      executor: 'constant-arrival-rate',
      exec: 'four_hundreds_requests',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      startTime: '180s',
      duration: '60s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export function one_request() {
  let id = 9000000 + __VU;
  http.get(`http://localhost:3000/api/items/${id}/reviews`,
    { tags: { my_custom_tag: 'one_request' } });
}
export function ten_requests() {
  let id = 9000000 + __VU;
  http.get(`http://localhost:3000/api/items/${id}/reviews`,
    { tags: { my_custom_tag: 'ten_requests' } });
}
export function hundred_requests() {
  let id = 9000000 + __VU;
  http.get(`http://localhost:3000/api/items/${id}/reviews`,
    { tags: { my_custom_tag: 'hundred_requests' } });
}
export function four_hundreds_requests() {
  let id = 9000000 + __VU;
  http.get(`http://localhost:3000/api/items/${id}/reviews`,
    { tags: { my_custom_tag: 'thousand_requests' } });
}
