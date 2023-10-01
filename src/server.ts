import figlet from 'figlet';

export function makeServer({ port = 3000, hostname = 'localhost' } = {}) {
  const development = process.env.NODE_ENV !== 'production';

  console.log(`Running in ${development ? 'dev' : 'prod'} mode`);

  const server = Bun.serve({
    hostname,
    port,
    development,
    fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === '/fancy') {
        const body = figlet.textSync("Bun, y'all!");
        return new Response(body, { headers: { 'x-foo': 'bar' } });
      }
      if (url.pathname === '/error') {
        throw new Error('oh no');
      }

      return new Response("Bun, y'all!", { headers: { 'x-foo': 'bar' } });
    },
  });

  console.log(`listening on http://localhost:${server.port} ...`);
  return server;
}
