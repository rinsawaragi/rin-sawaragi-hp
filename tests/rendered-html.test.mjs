import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Rin Sawaragi one-page site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Rin Sawaragi \| Composer \/ Arranger<\/title>/i);
  assert.match(html, /Rin Sawaragi/);
  assert.match(html, /Services &amp; Pricing/);
  assert.match(html, /Production Flow/);
  assert.match(html, /Contact Form/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.equal(
    html.match(/youtube-nocookie\.com\/embed\/JrSxgBxpuaI/g)?.length,
    2,
  );
});

test("keeps replaceable content in a single data definition", async () => {
  const [page, layout, client, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<SiteClient \/>/);
  assert.match(layout, /siteData\.assets\.ogImage/);
  assert.match(client, /siteData\.packages\.map/);
  assert.match(client, /siteData\.options\.map/);
  assert.match(client, /siteData\.works\.map/);
  assert.equal(data.match(/youtubeId: "JrSxgBxpuaI"/g)?.length, 2);
  assert.equal(data.match(/title: "destructive instinct"/g)?.length, 2);
  assert.match(
    data,
    /worksPlaylist:\s*"https:\/\/www\.youtube\.com\/playlist\?list=PLRrpTfiKh0qY"/,
  );
  assert.match(data, /deliveryTime: "約2〜4週間"/);
  assert.doesNotMatch(client, /Profile|About|NEWS|Coming Soon/);
});
