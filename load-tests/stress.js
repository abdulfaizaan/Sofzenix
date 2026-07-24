import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 }, // ramp up to 200 users
    { duration: '5m', target: 200 }, // stay at 200 for 5 mins
    { duration: '2m', target: 0 },   // ramp down to 0 users
  ],
};

export default function () {
  const res = http.get('http://localhost:3000');
  sleep(1);
}
