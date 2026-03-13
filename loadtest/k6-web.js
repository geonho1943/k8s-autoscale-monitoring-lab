import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '40s', target: 400 },
    { duration: '40s', target: 600 },
    { duration: '20s', target: 600 },
  ],
};

export default function () {
  http.get(`http://localhost:8080/?t=${__VU}-${__ITER}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  sleep(0.2);
}
