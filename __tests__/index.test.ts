import { describe, it, expect } from 'bun:test';
import { makeServer } from '../src/server';

describe('happy path', () => {
  it('should pass', () => {
    const server = makeServer({ port: 0 });
    return fetch(`http://localhost:${server.port}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.headers.get('x-foo')).toBe('bar');
        return res.text();
      })
      .then((body) => {
        expect(body).toBe("Bun, y'all!");
      });
  });
});

describe('unhappy path', () => {
  it('error endpoint should throw', () => {
    const server = makeServer({ port: 0 });
    return fetch(`http://localhost:${server.port}/error`).then((res) => {
      expect(res.status).toBe(500);
    });
  });
});
