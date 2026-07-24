import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // fast ramp-up to a high point
    { duration: '1m', target: 100 },  // stay at high point
    { duration: '10s', target: 0 },   // quick ramp-down
  ],
};

export default function () {
  const res = http.get('http://localhost:3000');
  sleep(1);
}
